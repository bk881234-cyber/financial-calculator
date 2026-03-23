import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconBarChart, IconDollarSign, IconTrendUp } from '../Icons';

const INCOME_PRESETS = [
  { label: '없음', value: 0 },
  { label: '4천만', value: 40_000_000 },
  { label: '6천만', value: 60_000_000 },
  { label: '1억', value: 100_000_000 },
];

const FINANCIAL_PRESETS = [
  { label: '1천만', value: 10_000_000 },
  { label: '2천만', value: 20_000_000 },
  { label: '3천만', value: 30_000_000 },
  { label: '5천만', value: 50_000_000 },
];

export default function DividendTaxCalculator() {
  const { dividendTax, setDividendTaxInput, calcDividendTaxResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = dividendTax.result;

  return (
    <div>
      <div className="glass-card input-section">
        {/* 타 소득 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              근로·사업 등 타 종합소득
              <Tooltip text="급여, 사업소득 등 금융소득 외 다른 종합소득 총액입니다. 금융소득이 2,000만원을 초과하면 이 소득과 합산하여 과세합니다." />
            </label>
            <span className="input-hint">{formatKRWShort(dividendTax.otherIncome)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {INCOME_PRESETS.map(({ label, value }) => (
              <button key={value}
                className={`preset-btn ${Number(dividendTax.otherIncome) === value ? 'active' : ''}`}
                onClick={() => setDividendTaxInput('otherIncome', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={dividendTax.otherIncome}
              onChange={(e) => setDividendTaxInput('otherIncome', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 금융소득 합계 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconTrendUp size={16} /></span>
              연간 금융소득 (이자 + 배당) 합계
              <Tooltip text="1년간 받은 이자소득과 배당소득의 합계입니다. 2,000만원 이하는 15.4% 분리과세로 종결되지만, 초과 시 다른 소득과 합산합니다." />
            </label>
            <span className="input-hint">{formatKRWShort(dividendTax.financialIncome)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {FINANCIAL_PRESETS.map(({ label, value }) => (
              <button key={value}
                className={`preset-btn ${Number(dividendTax.financialIncome) === value ? 'active' : ''}`}
                onClick={() => setDividendTaxInput('financialIncome', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={dividendTax.financialIncome}
              onChange={(e) => setDividendTaxInput('financialIncome', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcDividendTaxResult}>금융소득세 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero">
            <div className="result-hero-badge">
              {r.isCombined ? '종합과세 대상 (2천만원 초과)' : '분리과세 (2천만원 이하)'}
            </div>
            <div className="result-hero-value">{formatKRW(r.totalTax)}<sup>원</sup></div>
            <div className="result-hero-sub">
              {r.isCombined
                ? `분리과세 ${formatKRW(r.separateTax)}원 vs 종합과세 ${formatKRW(r.combinedTax)}원 → ${r.betterOption === 'separate' ? '분리과세 유리' : '종합과세 유리'}`
                : `분리과세 15.4% 적용`
              }
            </div>
          </div>

          {/* 2천만원 기준선 게이지 */}
          <div className="glass-card" style={{ padding: '20px', marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>금융소득</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: r.isCombined ? '#DC2626' : '#14B8A6' }}>
                {formatKRWShort(r.financialIncome)}
              </span>
            </div>
            <div className="gauge-track">
              <div className="gauge-fill" style={{
                width: `${Math.min((r.financialIncome / 50_000_000) * 100, 100)}%`,
                background: r.isCombined ? '#EF4444' : '#14B8A6',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: '#94A3B8' }}>
              <span>0</span>
              <span style={{ color: '#F59E0B', fontWeight: 700 }}>분리과세 한도 2천만원</span>
              <span>5천만원</span>
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">분리과세 세금 (15.4%)</div>
              <div className="result-card-value">{formatKRW(r.separateTax)}원</div>
            </div>
            {r.isCombined && (
              <>
                <div className="result-card">
                  <div className="result-card-icon"><IconDollarSign size={20} /></div>
                  <div className="result-card-label">종합과세 세금</div>
                  <div className="result-card-value">{formatKRW(r.combinedTax)}원</div>
                </div>
                <div className="result-card">
                  <div className="result-card-icon"><IconCoin size={20} /></div>
                  <div className="result-card-label">2천만 초과액</div>
                  <div className="result-card-value">{formatKRW(r.overAmount)}원</div>
                </div>
              </>
            )}
            <div className="result-card">
              <div className="result-card-icon"><IconTrendUp size={20} /></div>
              <div className="result-card-label">세후 금융소득</div>
              <div className="result-card-value c-blue">{formatKRW(r.financialIncome - r.totalTax)}원</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="금융소득세계산결과" />

          <InfoGuide title="💹 금융소득 2천만원의 벽 — 절세 전략">
            <h4>1. 금융소득 종합과세 기준선 2천만원</h4>
            <p>이자·배당소득이 <strong>연 2,000만원을 넘으면</strong> 초과분을 다른 소득(급여, 사업소득)과 합산해 최고 45%의 누진세율로 과세합니다. 직장인이라면 급여가 높을수록 불리합니다.</p>
            <h4>2. ISA 계좌로 금융소득 분리!</h4>
            <p>ISA(개인종합자산관리계좌)에서 발생한 이자·배당은 <strong>최대 400~1,000만원 비과세</strong>이며, 초과분도 9.9% 분리과세로 종결됩니다. 연 2,000만원 납입 한도로 종합과세 방어선을 구축하세요.</p>
            <h4>3. 연금저축펀드로 배당 수령 구조 만들기</h4>
            <p>배당주나 ETF를 연금저축펀드 내에서 운용하면, 배당수익이 과세 이연되며 55세 이후 연금으로 수령 시 낮은 연금소득세(3.3~5.5%)만 부담합니다. 세금이 30년 이상 복리로 더 굴러갑니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
