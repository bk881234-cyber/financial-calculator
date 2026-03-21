import { useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import {
  IconCoin, IconPercent, IconCalendar, IconTrendUp,
  IconLock, IconBarChart,
} from '../Icons';

const MONTH_PRESETS = [
  { value: 6,  label: '6개월' },
  { value: 12, label: '1년' },
  { value: 24, label: '2년' },
  { value: 36, label: '3년' },
  { value: 60, label: '5년' },
];

const RATE_PRESETS = [2.0, 3.0, 3.5, 4.0, 5.0];

export default function SavingsCalculator() {
  const { savings, setSavingsInput, calcSavingsResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = savings.result;
  const isDeposit = savings.type === 'deposit';

  return (
    <div>
      <div className="method-group">
        <button
          className={`method-btn ${!isDeposit ? 'active' : ''}`}
          onClick={() => setSavingsInput('type', 'savings')}
        >
          정기 적금
        </button>
        <button
          className={`method-btn ${isDeposit ? 'active' : ''}`}
          onClick={() => setSavingsInput('type', 'deposit')}
        >
          정기 예금
        </button>
      </div>

      <div className="glass-card input-section">

        {/* 금액 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              {isDeposit ? '예치 원금' : '월 납입금'}
            </label>
            <span className="input-hint">{formatKRWShort(savings.amount)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[[10,'10만'], [30,'30만'], [100,'100만'], [500,'500만']].map(([v, lbl]) => {
              const val = v * 10000;
              return (
                <button key={v}
                  className={`preset-btn ${Number(savings.amount) === val ? 'active' : ''}`}
                  onClick={() => setSavingsInput('amount', val)}
                >{lbl}</button>
              );
            })}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={savings.amount}
              onChange={(e) => setSavingsInput('amount', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        <div className="flow-arrow">
          <div className="flow-arrow-icon"><IconPercent size={14} /></div>
        </div>

        {/* 이율 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconPercent size={16} /></span>
              연 이자율
            </label>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {RATE_PRESETS.map((rate) => (
              <button key={rate}
                className={`preset-btn ${Number(savings.annualRate) === rate ? 'active' : ''}`}
                onClick={() => setSavingsInput('annualRate', rate)}
              >{rate}%</button>
            ))}
          </div>
          <div className="input-wrap">
            <input type="number" className="input-field" value={savings.annualRate}
              step="0.1" onChange={(e) => setSavingsInput('annualRate', e.target.value)} />
            <span className="input-suffix">%</span>
          </div>
        </div>

        <div className="flow-arrow">
          <div className="flow-arrow-icon"><IconCalendar size={14} /></div>
        </div>

        {/* 기간 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCalendar size={16} /></span>
              기간
            </label>
          </div>
          <div className="preset-group">
            {MONTH_PRESETS.map(({ value, label }) => (
              <button key={value}
                className={`preset-btn ${Number(savings.months) === value ? 'active' : ''}`}
                onClick={() => setSavingsInput('months', value)}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* 세금우대 토글 */}
        <div className="toggle-row">
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
              세금 우대 적용
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>
              이자 세율: {savings.taxFree ? '1.4% (세금우대)' : '15.4% (일반)'}
            </div>
          </div>
          <button
            className={`toggle-switch ${savings.taxFree ? 'on' : 'off'}`}
            onClick={() => setSavingsInput('taxFree', !savings.taxFree)}
          >
            <div className="toggle-knob" />
          </button>
        </div>
      </div>

      <button className="calc-btn" onClick={calcSavingsResult}>만기 금액 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>

          <div className="result-hero">
            <div className="result-hero-badge">
              {isDeposit ? '정기예금' : '정기적금'} 만기 수령액
              {savings.taxFree && (
                <span style={{
                  marginLeft: 6, background: 'rgba(255,255,255,0.2)',
                  padding: '1px 8px', borderRadius: 12, fontSize: 11,
                }}>세금우대</span>
              )}
            </div>
            <div className="result-hero-value">{formatKRWShort(r.finalAmount)}</div>
            <div className="result-hero-sub">
              세전 이자 {formatKRW(r.rawInterest)}원 · 세금 -{formatKRW(r.tax)}원
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">납입 원금</div>
              <div className="result-card-value c-blue">{formatKRWShort(r.principal)}</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconTrendUp size={20} /></div>
              <div className="result-card-label">세후 이자</div>
              <div className="result-card-value c-teal">{formatKRW(r.netInterest)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">세금 공제</div>
              <div className="result-card-value c-red">-{formatKRW(r.tax)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconLock size={20} /></div>
              <div className="result-card-label">실효 금리</div>
              <div className="result-card-value c-teal">{r.effectiveRate}%</div>
            </div>
          </div>

          <div className="chart-wrap">
            <div className="chart-title">원금 및 이자 누적 추이</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={r.dataPoints}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gPrincipal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient id="gInterest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" /><stop offset="100%" stopColor="#0D9488" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
                <XAxis dataKey="month" tickFormatter={(v) => `${v}m`}
                  tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis tickFormatter={(v) => `${(v / 10_000).toFixed(0)}만`}
                  tick={{ fontSize: 11, fill: '#94A3B8' }} width={44} />
                <Tooltip formatter={(v, name) => [`${formatKRW(v)}원`, name]}
                  labelFormatter={(l) => `${l}개월차`}
                  contentStyle={{ borderRadius: 12, fontSize: 14 }} />
                <Legend iconType="square" iconSize={10}
                  formatter={(v) => <span style={{ fontSize: 13, fontWeight: 700 }}>{v}</span>} />
                <Bar dataKey="principal" name="원금" stackId="a" fill="url(#gPrincipal)" />
                <Bar dataKey="interest" name="이자" stackId="a" fill="url(#gInterest)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <ShareButton targetRef={resultRef} filename="예적금만기계산결과" />

          <div className="tip-box">
            <div className="tip-title">🏧 예적금 활용 꿀팁</div>
            <p>
              • 세금우대(ISA 계좌 등)를 활용하면 이자를 <strong>{formatKRW(r.tax)}원</strong> 더 받을 수 있어요.<br />
              • 금리가 높을 때 장기 정기예금으로 금리를 고정하는 전략이 효과적입니다.<br />
              • 적금은 만기 후 예금으로 굴리면 복리 효과를 극대화할 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
