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

                    <InfoGuide title="💹 배당금 부자들의 로망, 금융소득종합과세 완전 해부">
            <h4>1. 배당소득 '2,000만 원'의 마지노선, 무엇이 문제인가요?</h4>
            <p>주식과 예적금 자산이 두터운 자산가들의 경계선입니다. 대한민국의 세법상 내가 1년간 은행과 증권사로부터 받은 이자와 주식 배당금 수익 총합계액이 <strong>'딱 2,000만 원을 넘어가는 순간'</strong>, 그 초과된 금융소득은 기존의 15.4% 원천징수로 끝나지 않고 내 월급이나 프리랜서 수입 등 모든 타 종합소득과 합쳐져서 누진세율(최고 49.5%)의 거대한 폭탄으로 재계산되어 5월에 고지서가 날아오게 됩니다.</p>
            <h4>2. 금융소득합산을 완벽하게 빗겨나가는 방어구: ISA 계좌의 마법</h4>
            <p>국가가 권장하는 국민 비과세 만능통장 <strong>ISA (개인종합자산관리계좌)</strong> 안에 당신의 고배당(맥쿼리인프라, 은행주 등) 주식들을 모두 넣어서 굴려보세요. ISA 계좌 안에서 터진 배당수익금에 대해서는 전체 수익 200만 원(서민형은 400만 원)까지 0% 세금으로 무한 증식하며, 이를 초과한 이익이라도 겨우 9.9% 단일세율로 분리과세되어 과세당국과 금융소득종합과세 레이더에서 영원히 산정 제외됩니다.</p>
            <h4>3. 증빙을 통해 절세 전략을 모색하라 (건강보험료 상승 경계령!)</h4>
            <p>금융소득이 단순히 세무서의 소득세로 끝난다고 생각하면 순진한 오산입니다. 2천만 원 기준점은 곧장 국민건강보험공단과 연동되어 <strong>피부양자 자격을 즉시 박탈당하고 다음 달 지역가입자로 편입</strong>되는 연쇄 트리거를 발동시킵니다. 본인 명의로만 계좌를 불리기보다는, 무조건 배우자 또는 성인 자녀에게 안전하게 증여세 공제 한도 내(10년 합산 배우자 6억, 성년 5천만 원) 분산 증여하여 수익 귀속처 자체를 여러 갈래로 쪼개는 것이 고액 자산가의 필수 세팅입니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
