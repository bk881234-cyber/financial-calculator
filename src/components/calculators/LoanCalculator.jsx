import { useRef } from 'react';
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
} from 'recharts';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import {
  IconCoin, IconPercent, IconCalendar,
  IconHome, IconBarChart, IconDollarSign,
} from '../Icons';

const METHODS = [
  { id: 'equalPayment',   label: '원리금균등' },
  { id: 'equalPrincipal', label: '원금균등' },
  { id: 'bullet',         label: '만기일시' },
];

const PERIOD_OPTIONS = [
  { months: 12,  label: '1년' },
  { months: 36,  label: '3년' },
  { months: 60,  label: '5년' },
  { months: 120, label: '10년' },
  { months: 240, label: '20년' },
  { months: 360, label: '30년' },
];

const DONUT_COLORS = ['#3B82F6', '#2DD4BF'];

export default function LoanCalculator() {
  const { loan, setLoanInput, calcLoanResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const result = loan.result;

  const pieData = result
    ? [
        { name: '대출 원금', value: result.principal },
        { name: '총 이자',   value: result.totalInterest },
      ]
    : [];

  const interestRatio = result
    ? ((result.totalInterest / result.totalPayment) * 100).toFixed(1)
    : 0;

  const monthlyLabel = result
    ? (loan.method === 'equalPrincipal'
        ? `${formatKRW(result.firstMonthPayment)}원 (첫 달)`
        : `${formatKRW(result.monthlyPayment)}원`)
    : '-';

  return (
    <div>
      <div className="method-group">
        {METHODS.map((m) => (
          <button
            key={m.id}
            className={`method-btn ${loan.method === m.id ? 'active' : ''}`}
            onClick={() => setLoanInput('method', m.id)}
          >
            {m.label}
          </button>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '8px' }}>
          <Tooltip text="가장 이자가 적은 방식은 '원금균등', 매월 똑같은 돈을 내는 방식은 '원리금균등' 입니다." />
        </div>
      </div>

      <div className="glass-card input-section">

        {/* 대출 원금 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              대출 원금
            </label>
            <span className="input-hint">{formatKRWShort(loan.principal)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[[5000,'5천만'], [10000,'1억'], [20000,'2억'], [30000,'3억'], [50000,'5억']].map(([v, lbl]) => {
              const val = v * 10000;
              return (
                <button key={v}
                  className={`preset-btn ${Number(loan.principal) === val ? 'active' : ''}`}
                  onClick={() => setLoanInput('principal', val)}
                >{lbl}</button>
              );
            })}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={loan.principal}
              onChange={(e) => setLoanInput('principal', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        <div className="flow-arrow">
          <div className="flow-arrow-icon"><IconPercent size={14} /></div>
        </div>

        {/* 연 이자율 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconPercent size={16} /></span>
              연 이자율
              <Tooltip text="은행에서 고지한 연간 이자율(%)입니다. 우대금리가 있다면 모두 적용된 '최종 금리'를 입력하세요." />
            </label>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[3, 3.5, 4, 4.5, 5, 6].map((r) => (
              <button key={r}
                className={`preset-btn ${Number(loan.annualRate) === r ? 'active' : ''}`}
                onClick={() => setLoanInput('annualRate', r)}
              >{r}%</button>
            ))}
          </div>
          <div className="input-wrap">
            <input type="number" className="input-field" value={loan.annualRate}
              step="0.1" onChange={(e) => setLoanInput('annualRate', e.target.value)} />
            <span className="input-suffix">%</span>
          </div>
        </div>

        <div className="flow-arrow">
          <div className="flow-arrow-icon"><IconCalendar size={14} /></div>
        </div>

        {/* 대출 기간 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCalendar size={16} /></span>
              대출 기간
            </label>
          </div>
          <div className="preset-group">
            {PERIOD_OPTIONS.map(({ months, label }) => (
              <button key={months}
                className={`preset-btn ${Number(loan.months) === months ? 'active' : ''}`}
                onClick={() => setLoanInput('months', months)}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcLoanResult}>이자 계산하기</button>

      {result && (
        <div className="result-section" ref={resultRef}>

          <div className="result-hero">
            <div className="result-hero-badge">
              {METHODS.find(m => m.id === loan.method)?.label} 기준
            </div>
            <div className="result-hero-value">
              {monthlyLabel}<sup>/월</sup>
            </div>
            <div className="result-hero-sub">
              총 납입액 {formatKRWShort(result.totalPayment)} · 이자 비율 {interestRatio}%
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconHome size={20} /></div>
              <div className="result-card-label">대출 원금</div>
              <div className="result-card-value c-blue">{formatKRWShort(result.principal)}</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">총 이자</div>
              <div className="result-card-value c-red">{formatKRWShort(result.totalInterest)}</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">이자 비율</div>
              <div className="result-card-value c-red">{interestRatio}%</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCalendar size={20} /></div>
              <div className="result-card-label">대출 기간</div>
              <div className="result-card-value">{loan.months / 12}년</div>
            </div>
          </div>

          <div className="chart-wrap">
            <div className="chart-title">원금 대비 이자 비율</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData} cx="50%" cy="50%"
                  innerRadius={60} outerRadius={88}
                  paddingAngle={3} dataKey="value"
                  startAngle={90} endAngle={-270}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={DONUT_COLORS[i]} stroke="none"
                      style={{ filter: `drop-shadow(0 0 6px ${DONUT_COLORS[i]}66)` }}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(v) => `${formatKRW(v)}원`}
                  contentStyle={{ borderRadius: 12, fontSize: 14, border: '1px solid rgba(59,130,246,0.2)' }}
                />
                <Legend
                  iconType="circle" iconSize={10}
                  formatter={(v) => <span style={{ fontSize: 14, fontWeight: 700 }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', marginTop: -6 }}>
              <span className="badge badge-red">이자 {interestRatio}%</span>
              {' '}
              <span className="badge badge-blue">원금 {(100 - interestRatio).toFixed(1)}%</span>
            </div>
          </div>

          <div className="chart-wrap">
            <div className="chart-title">회차별 상환 내역 (첫 12회)</div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>회차</th><th>납입금</th><th>원금</th><th>이자</th><th>잔액</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0, 12).map((row) => (
                    <tr key={row.month}>
                      <td><span className="badge badge-blue">{row.month}</span></td>
                      <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                        {formatKRW(row.payment)}
                      </td>
                      <td style={{ color: 'var(--blue-600)' }}>{formatKRW(row.principal)}</td>
                      <td style={{ color: '#DC2626' }}>{formatKRW(row.interest)}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{formatKRW(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="대출이자계산결과" />

          <InfoGuide title="💡 대출 이자 계산기 100% 활용 가이드">
            <h4>1. 매월 갚아야 할 이자금, 쉽고 빠르게 계산해 보세요</h4>
            <p>대출 이자 계산기로 주택담보대출이나 전세자금대출의 매월 상환액을 쉽고 빠르게 계산해 보세요. 은행권의 원리금균등, 원금균등, 만기일시상환 등 상환 방식 기준에 따라 총 대출 이자와 월별 납부액을 사전에 계산해볼 수 있도록 구성되어 있습니다.</p>
            <h4>2. 상환 방식 비교로 이자 부담 줄이기</h4>
            <p>가장 대중적인 '원리금균등'은 매달 내는 돈이 일정해 예산 관리가 편하고, '원금균등'은 매달 내는 돈은 점차 줄어들면서 전체 납부하는 총 이자가 가장 적다는 장점이 있습니다. 내 자금 상황에 맞는 방식을 선택해 월 납입 한도를 꼼꼼히 체크해 보세요.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
