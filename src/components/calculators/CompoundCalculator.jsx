import { useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import {
  IconCoin, IconPercent, IconCalendar, IconTrendUp, IconBarChart,
} from '../Icons';

const RATE_PRESETS = [3, 5, 7, 10, 15];
const YEAR_PRESETS = [5, 10, 15, 20, 30];

export default function CompoundCalculator() {
  const { compound, setCompoundInput, calcCompoundResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = compound.result;

  return (
    <div>
      <div className="glass-card input-section">

        {/* 초기 원금 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              초기 원금
            </label>
            <span className="input-hint">{formatKRWShort(compound.initialAmount)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[[100, '100만'], [500, '500만'], [1000, '1000만'], [5000, '5000만']].map(([v, lbl]) => {
              const val = v * 10000;
              return (
                <button key={v}
                  className={`preset-btn ${Number(compound.initialAmount) === val ? 'active' : ''}`}
                  onClick={() => setCompoundInput('initialAmount', val)}
                >{lbl}</button>
              );
            })}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={compound.initialAmount}
              onChange={(e) => setCompoundInput('initialAmount', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        <div className="flow-arrow">
          <div className="flow-arrow-icon" style={{ fontSize: 15, fontWeight: 900, color: 'var(--teal-600)' }}>+</div>
        </div>

        {/* 월 적립금 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCalendar size={16} /></span>
              월 적립금
            </label>
            <span className="input-hint">{formatKRWShort(compound.monthlyAmount)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[[10,'10만'], [30,'30만'], [50,'50만'], [100,'100만']].map(([v, lbl]) => {
              const val = v * 10000;
              return (
                <button key={v}
                  className={`preset-btn ${Number(compound.monthlyAmount) === val ? 'active' : ''}`}
                  onClick={() => setCompoundInput('monthlyAmount', val)}
                >{lbl}</button>
              );
            })}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={compound.monthlyAmount}
              onChange={(e) => setCompoundInput('monthlyAmount', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        <div className="flow-arrow">
          <div className="flow-arrow-icon"><IconPercent size={14} /></div>
        </div>

        {/* 연 수익률 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconTrendUp size={16} /></span>
              목표 연 수익률
            </label>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {RATE_PRESETS.map((rate) => (
              <button key={rate}
                className={`preset-btn ${Number(compound.annualRate) === rate ? 'active' : ''}`}
                onClick={() => setCompoundInput('annualRate', rate)}
              >{rate}%</button>
            ))}
          </div>
          <div className="input-wrap">
            <input type="number" className="input-field" value={compound.annualRate}
              step="0.1" onChange={(e) => setCompoundInput('annualRate', e.target.value)} />
            <span className="input-suffix">%</span>
          </div>
        </div>

        <div className="flow-arrow">
          <div className="flow-arrow-icon"><IconCalendar size={14} /></div>
        </div>

        {/* 투자 기간 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCalendar size={16} /></span>
              투자 기간
            </label>
          </div>
          <div className="preset-group">
            {YEAR_PRESETS.map((y) => (
              <button key={y}
                className={`preset-btn ${Number(compound.years) === y ? 'active' : ''}`}
                onClick={() => setCompoundInput('years', y)}
              >{y}년</button>
            ))}
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcCompoundResult}>복리 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>

          <div className="result-hero">
            <div className="result-hero-badge">{compound.years}년 후 최종 평가액</div>
            <div className="result-hero-value">{formatKRWShort(r.finalValue)}</div>
            <div className="result-hero-sub">
              수익률 {r.returnRate}% · 이자 수익 {formatKRWShort(r.totalInterest)}
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">총 납입액</div>
              <div className="result-card-value c-blue">{formatKRWShort(r.totalContributions)}</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconTrendUp size={20} /></div>
              <div className="result-card-label">이자 수익</div>
              <div className="result-card-value c-teal">{formatKRWShort(r.totalInterest)}</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">수익률</div>
              <div className="result-card-value c-teal">{r.returnRate}%</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCalendar size={20} /></div>
              <div className="result-card-label">72법칙</div>
              <div className="result-card-value" style={{ fontSize: 15 }}>
                2배 ≈ {(72 / compound.annualRate).toFixed(1)}년
              </div>
            </div>
          </div>

          <div className="chart-wrap">
            <div className="chart-title">자산 성장 곡선</div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={r.dataPoints}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gContrib" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.09)" />
                <XAxis dataKey="year" tickFormatter={(v) => `${v}년`}
                  tick={{ fontSize: 13, fill: '#94A3B8' }} />
                <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}백만`}
                  tick={{ fontSize: 12, fill: '#94A3B8' }} width={56} />
                <Tooltip
                  formatter={(v, name) => [`${formatKRW(v)}원`, name]}
                  labelFormatter={(l) => `${l}년차`}
                  contentStyle={{ borderRadius: 12, fontSize: 14, border: '1px solid rgba(59,130,246,0.18)' }}
                />
                <Legend iconType="circle" iconSize={10}
                  formatter={(v) => <span style={{ fontSize: 13, fontWeight: 700 }}>{v}</span>} />
                <Area type="monotone" dataKey="totalValue" name="평가액"
                  stroke="#3B82F6" strokeWidth={2.5} fill="url(#gTotal)"
                  dot={false} activeDot={{ r: 6, fill: '#3B82F6', stroke: 'white', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="contributions" name="납입액"
                  stroke="#14B8A6" strokeWidth={2} fill="url(#gContrib)"
                  strokeDasharray="6 3" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <ShareButton targetRef={resultRef} filename="복리수익계산결과" />

          <div className="tip-box">
            <div className="tip-title">📈 복리의 마법</div>
            <p>
              • <strong>72의 법칙</strong>: 연 {compound.annualRate}% 수익률이면 원금이 2배 되는 데 약 {(72 / compound.annualRate).toFixed(1)}년 걸립니다.<br />
              • 월 적립금을 10만 원만 늘려도 {compound.years}년 후 수천만 원의 차이가 납니다.<br />
              • 복리는 <strong>시간이 핵심</strong>입니다. 1년이라도 빨리 시작하는 것이 최고의 전략입니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
