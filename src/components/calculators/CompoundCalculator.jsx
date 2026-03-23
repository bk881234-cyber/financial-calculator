import { useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
} from 'recharts';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
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
              <Tooltip text="현재 보유하고 있어 바로 투자/저축을 시작할 종잣돈(시드머니)입니다." />
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
              <Tooltip text="1년 동안 예상되는 투자 수익률입니다. S&P500 등 시장 대표 주가지수의 장기 평균은 보통 7% ~ 10% 수준입니다." />
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
                <RechartsTooltip
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

          <InfoGuide title="📈 복리의 마법과 투자 상식">
            <h4>1. 복리(Compound Interest)란?</h4>
            <p>수익이 기하급수적으로 불어나는 원리를 말합니다. 첫해에 발생한 이자가 이듬해의 원금에 합쳐져 <strong>'이자에 또 이자가 붙는 눈덩이 효과(Snowball Effect)'</strong>가 일어납니다. 시간이 오랫동안 누적될수록 자산 상승 곡선은 수직에 가깝게 폭발적으로 솟구치게 됩니다.</p>
            <h4>2. 단리와 복리의 차이</h4>
            <p>단리는 매년 <strong>최초의 원금</strong>에만 일정한 이자를 주는 방식이며, 복리는 <strong>전체 평가액(원금+이자)</strong>에 이자가 붙는 방식입니다. 예를 들어 5%로 20년을 투자할 때 단리면 자산이 단순히 2배가 되지만, 복리라면 자산이 약 <strong>2.65배</strong> 이상 증가합니다.</p>
            <h4>3. 투자의 핵심은 '시간'</h4>
            <p>그래프를 보면 10~15년 차부터 순수 투자 수익이 내가 넣은 납입 원금을 추월하는 골든크로스가 일어남을 알 수 있습니다. 단기간의 높은 수익률을 쫓는 것보다, <strong>하루라도 일찍 투자를 시작해서 시장에 오래 머무르는 것</strong>이 복리의 혜택을 온전히 누리는 최고의 전략입니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
