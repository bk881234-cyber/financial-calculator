import { useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import {
  IconBriefcase, IconFood, IconUsers,
  IconShield, IconDollarSign, IconBarChart,
} from '../Icons';

const SALARY_PRESETS = [
  { label: '3천만', value: 30_000_000 },
  { label: '4천만', value: 40_000_000 },
  { label: '5천만', value: 50_000_000 },
  { label: '6천만', value: 60_000_000 },
  { label: '8천만', value: 80_000_000 },
  { label: '1억',   value: 100_000_000 },
];

const DEDUCTION_COLORS = ['#3B82F6','#0EA5E9','#14B8A6','#F59E0B','#EF4444','#F97316'];

export default function SalaryCalculator() {
  const { salary, setSalaryInput, calcSalaryResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = salary.result;

  const deductionData = r ? [
    { name: '국민연금',   value: r.deductions.nationalPension,     color: DEDUCTION_COLORS[0] },
    { name: '건강보험',   value: r.deductions.healthInsurance,     color: DEDUCTION_COLORS[1] },
    { name: '장기요양',   value: r.deductions.longTermCare,        color: DEDUCTION_COLORS[2] },
    { name: '고용보험',   value: r.deductions.employmentInsurance, color: DEDUCTION_COLORS[3] },
    { name: '소득세',     value: r.deductions.incomeTax,           color: DEDUCTION_COLORS[4] },
    { name: '지방소득세', value: r.deductions.localTax,            color: DEDUCTION_COLORS[5] },
  ] : [];

  return (
    <div>
      <InfoGuide title="💡 연봉 실수령액 계산기 100% 활용 가이드">
        <h4>1. 내 진짜 월급, 쉽고 빠르게 확인하세요</h4>
        <p>연봉 실수령액 계산기로 올해 나의 예상 세후 월급을 쉽고 빠르게 계산해 보세요. 최신 4대보험(국민연금, 건강보험, 고용보험) 요율과 근로소득세 간이세액표 기준에 따라 실수령액을 사전에 계산해볼 수 있도록 구성되어 있습니다.</p>
        <h4>2. 비과세액과 부양가족을 정확히 입력하세요</h4>
        <p>식대(월 최대 20만 원)나 차량유지비(월 최대 20만 원) 등 세금을 떼지 않는 '비과세 수당'을 정확히 입력하면 더욱 정밀한 결과가 나옵니다. 또한 부양가족 수와 20세 이하 자녀 수를 맞게 설정하시면 근로소득세가 줄어들어 실제 명세서와 가장 가까운 금액을 확인할 수 있습니다.</p>
      </InfoGuide>

      {/* 연봉 프리셋 */}
      <div style={{ marginBottom: 18 }}>
        <div className="preset-group">
          {SALARY_PRESETS.map((p) => (
            <button key={p.value}
              className={`preset-btn ${Number(salary.annualSalary) === p.value ? 'active' : ''}`}
              onClick={() => setSalaryInput('annualSalary', p.value)}
            >{p.label}</button>
          ))}
        </div>
      </div>

      <div className="glass-card input-section">

        {/* 계약 연봉 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconBriefcase size={16} /></span>
              계약 연봉
            </label>
            <span className="input-hint">{formatKRWShort(salary.annualSalary)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={salary.annualSalary}
              onChange={(e) => setSalaryInput('annualSalary', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        <div className="flow-arrow">
          <div className="flow-arrow-icon"><IconFood size={14} /></div>
        </div>

        {/* 월 비과세액 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconFood size={16} /></span>
              월 비과세액 (식대 등)
              <Tooltip text="식대(최대 20만원), 자가운전보조금(최대 20만원), 육아수당 등 세금을 전혀 떼지 않는 금액입니다. 비과세 액수가 클수록 내 실수령액이 늘어납니다." />
            </label>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[[0,'없음'], [100000,'10만'], [200000,'20만'], [300000,'30만']].map(([v, lbl]) => (
              <button key={v}
                className={`preset-btn ${Number(salary.nonTaxable) === v ? 'active' : ''}`}
                onClick={() => setSalaryInput('nonTaxable', v)}
              >{lbl}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={salary.nonTaxable}
              onChange={(e) => setSalaryInput('nonTaxable', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        <div className="flow-arrow">
          <div className="flow-arrow-icon"><IconUsers size={14} /></div>
        </div>

        {/* 부양가족 수 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconUsers size={16} /></span>
              부양가족 수 (본인 포함)
              <Tooltip text="기본 공제 대상자(본인, 배우자, 직계가족 중 연초과 소득 100만원 이하)의 수입니다. 많을수록 소득세 원천징수액이 줄어듭니다." />
            </label>
          </div>
          <div className="preset-group">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n}
                className={`preset-btn ${Number(salary.dependents) === n ? 'active' : ''}`}
                style={{ minWidth: 56 }}
                onClick={() => setSalaryInput('dependents', n)}
              >{n}명</button>
            ))}
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcSalaryResult}>실수령액 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>

          <div className="result-hero">
            <div className="result-hero-badge">월 실수령액</div>
            <div className="result-hero-value">
              {formatKRW(r.netMonthly)}<sup>원</sup>
            </div>
            <div className="result-hero-sub">
              연 실수령 {formatKRWShort(r.netAnnual)} · 공제율 {r.deductionRate}%
            </div>
          </div>

          {/* 세전 → 세후 비교 */}
          <div className="glass-card-glow" style={{ padding: '22px 20px', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8 }}>
                  세전 월급
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                  {formatKRW(r.grossMonthly)}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>원</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <div style={{
                  padding: '6px 12px',
                  background: 'var(--grad-primary)',
                  borderRadius: 12,
                  color: 'white',
                  fontSize: 13, fontWeight: 900,
                  boxShadow: 'var(--glow-sm)',
                }}>
                  -{r.deductionRate}%
                </div>
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                  <path d="M0 8h20M14 2l6 6-6 6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8 }}>
                  세후 실수령
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--teal-600)', letterSpacing: '-0.5px' }}>
                  {formatKRW(r.netMonthly)}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>원</div>
              </div>
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconShield size={20} /></div>
              <div className="result-card-label">국민연금</div>
              <div className="result-card-value c-blue" style={{ fontSize: 16 }}>
                -{formatKRW(r.deductions.nationalPension)}
              </div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconShield size={20} /></div>
              <div className="result-card-label">건강보험</div>
              <div className="result-card-value c-teal" style={{ fontSize: 16 }}>
                -{formatKRW(r.deductions.healthInsurance)}
              </div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">소득세</div>
              <div className="result-card-value c-red" style={{ fontSize: 16 }}>
                -{formatKRW(r.deductions.incomeTax)}
              </div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">총 공제액</div>
              <div className="result-card-value c-red" style={{ fontSize: 16 }}>
                -{formatKRW(r.deductions.total)}
              </div>
            </div>
          </div>

          <div className="chart-wrap">
            <div className="chart-title">급여 공제 내역</div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={deductionData} layout="vertical"
                margin={{ top: 0, right: 80, left: 10, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name"
                  tick={{ fontSize: 13, fill: 'var(--text-secondary)', fontWeight: 700 }} width={56} />
                <RechartsTooltip formatter={(v) => `${formatKRW(v)}원`}
                  contentStyle={{ borderRadius: 12, fontSize: 14 }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}
                  label={{
                    position: 'right',
                    formatter: (v) => `${formatKRW(v)}`,
                    fontSize: 12,
                    fill: 'var(--text-secondary)',
                    fontWeight: 700,
                  }}>
                  {deductionData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <ShareButton targetRef={resultRef} filename="연봉실수령계산결과" />
        </div>
      )}
    </div>
  );
}
