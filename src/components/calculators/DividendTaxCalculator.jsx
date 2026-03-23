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
      <InfoGuide title="💡 배당금·금융소득 종합과세 계산기 100% 활용 가이드">
                  <h4>1. 내년 5월 종합과세 대상이 될지, 쉽고 빠르게 계산해 보세요</h4>
                  <p>배당소득세 계산기로 예적금 이자와 주식 배당금이 많을 때 부과되는 세금 폭탄의 유무를 쉽고 빠르게 시뮬레이션해 보세요. 국세청 '금융소득 종합과세(연 2,000만 원 초과분)' 합산 체계 기준에 따라, 내 소득이 타 소득과 합쳐졌을 때의 추가 세금을 사전에 계산해볼 수 있도록 구성되어 있습니다.</p>
                  <h4>2. 2,000만 원을 경계로 ISA 계좌 활용하기</h4>
                  <p>본인의 근로/사업소득과 금융소득 발생 예상 금액을 각각 입력해 보세요. 결과값에 부담스러운 추가 세금이 뜬다면, 국내주식 배당금을 전액 비과세 또는 저율 분리과세(9.9%) 처리해 주는 ISA(개인종합자산관리계좌) 안으로 자산을 옮겨 담아 세금을 회피하는 전략을 적극 추천합니다.</p>
                </InfoGuide>


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
        </div>
      )}
    </div>
  );
}
