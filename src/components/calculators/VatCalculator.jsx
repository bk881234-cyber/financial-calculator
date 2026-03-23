import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconPercent, IconDollarSign, IconBarChart } from '../Icons';

// 간이과세 업종별 부가가치율
const VAT_RATE_PRESETS = [
  { label: '소매업 (15%)', value: 15 },
  { label: '음식점 (15%)', value: 15 },
  { label: '제조업 (20%)', value: 20 },
  { label: '숙박업 (25%)', value: 25 },
  { label: '건설·운수 (30%)', value: 30 },
  { label: '서비스 (40%)', value: 40 },
];

export default function VatCalculator() {
  const { vat, setVatInput, calcVatResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = vat.result;

  return (
    <div>
      <div className="glass-card input-section">
        {/* 과세 형태 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconBarChart size={16} /></span>
              과세 형태
              <Tooltip text="일반과세자: 연 매출 8,000만원 이상. 간이과세자: 연 매출 8,000만원 미만. 부동산 임대·과세유흥장소는 무조건 일반과세." />
            </label>
          </div>
          <div className="method-group">
            <button
              className={`method-btn ${vat.taxType === 'general' ? 'active' : ''}`}
              onClick={() => setVatInput('taxType', 'general')}
            >일반과세자</button>
            <button
              className={`method-btn ${vat.taxType === 'simplified' ? 'active' : ''}`}
              onClick={() => setVatInput('taxType', 'simplified')}
            >간이과세자</button>
          </div>
        </div>

        {/* 매출액 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              과세 매출액 (VAT 포함)
              <Tooltip text="부가세가 포함된 공급대가 총액입니다. 세금계산서 발행 기준입니다." />
            </label>
            <span className="input-hint">{formatKRWShort(vat.salesAmt)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={vat.salesAmt}
              onChange={(e) => setVatInput('salesAmt', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 매입 세금계산서 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconDollarSign size={16} /></span>
              매입 세금계산서 공급가액
              <Tooltip text="거래처로부터 받은 세금계산서의 공급가액(VAT 제외) 합계입니다. 이 금액의 10%가 매입세액으로 공제됩니다." />
            </label>
            <span className="input-hint">{formatKRWShort(vat.purchaseTax)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={vat.purchaseTax}
              onChange={(e) => setVatInput('purchaseTax', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 간이과세자: 업종별 부가가치율 */}
        {vat.taxType === 'simplified' && (
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconPercent size={16} /></span>
                업종별 부가가치율
                <Tooltip text="국세청이 업종별로 정한 부가가치율입니다. 간이과세자의 실제 납부세액 계산에 사용됩니다." />
              </label>
              <span className="input-hint">{vat.vatRatePct}%</span>
            </div>
            <div className="preset-group" style={{ marginBottom: 10 }}>
              {VAT_RATE_PRESETS.map(({ label, value }, i) => (
                <button key={i}
                  className={`preset-btn ${Number(vat.vatRatePct) === value ? 'active' : ''}`}
                  onClick={() => setVatInput('vatRatePct', value)}
                >{label}</button>
              ))}
            </div>
          </div>
        )}

        {/* 신용카드 발행 세액공제 */}
        <div className="toggle-row" style={{ marginBottom: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#475569' }}>
            신용카드 발행 세액공제 (1.3%)
            <Tooltip text="음식점, 소매 등 소비자 대상 업종의 개인사업자가 신용카드 매출이 있는 경우 매출액의 1.3%를 공제받을 수 있습니다. (연 500만원 한도)" />
          </span>
          <button
            className={`toggle-switch ${vat.cardCredit ? 'on' : 'off'}`}
            onClick={() => setVatInput('cardCredit', !vat.cardCredit)}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>

      <button className="calc-btn" onClick={calcVatResult}>부가가치세 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero">
            <div className="result-hero-badge">
              {r.taxType === 'general' ? '일반과세자' : '간이과세자'} 납부 세액
            </div>
            <div className="result-hero-value">{formatKRW(r.payableTax)}<sup>원</sup></div>
            <div className="result-hero-sub">
              {r.taxType === 'general'
                ? `매출세액 ${formatKRW(r.salesTax)}원 - 매입세액 ${formatKRW(r.inputTax)}원`
                : `과세표준 ${formatKRWShort(r.netSales)} × 부가가치율 ${r.vatRatePct}%`
              }
              {r.cardDeduct > 0 && ` - 카드공제 ${formatKRW(r.cardDeduct)}원`}
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">순 매출액 (공급가액)</div>
              <div className="result-card-value">{formatKRW(r.netSales)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">{r.taxType === 'general' ? '매출세액' : '납부세액 (전)'}</div>
              <div className="result-card-value c-red">{formatKRW(r.taxType === 'general' ? r.salesTax : r.vatPayable)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">{r.taxType === 'general' ? '매입세액 공제' : '매입세액 공제'}</div>
              <div className="result-card-value c-blue">-{formatKRW(r.taxType === 'general' ? r.inputTax : r.inputCredit)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">카드발행 공제</div>
              <div className="result-card-value c-blue">-{formatKRW(r.cardDeduct)}원</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="부가가치세계산결과" />

                    <InfoGuide title="💡 부가가치세(VAT) 계산기 100% 활용 가이드">
            <h4>1. 분기별 부가세 납부세액, 쉽고 빠르게 계산해 보세요</h4>
            <p>부가가치세 계산기로 개인사업자 사장님들이 이번 1월/7월에 납부해야 할 부가세를 쉽고 빠르게 계산해 보세요. 국세청 일반과세 및 간이과세 산출 방식 기준에 따라 다음 달 세금을 사전에 미리 대비하고 계산해볼 수 있도록 구성되어 있습니다.</p>
            <h4>2. 매입세금계산서와 신용카드 공제를 챙기세요</h4>
            <p>사업을 위해 사용한 매입세금계산서 총액을 꼼꼼히 입력하면, 그만큼 10%의 세액공제가 발생해 부가세가 확 줄어듭니다. 또한 음식점, 카페 등 소매업 사장님이라면 손님들이 결제한 신용카드/현금영수증 발행 금액의 1.3%를 추가 공제받는 '신용카드 등 발행세액공제' 토글 버튼을 활용해 보세요.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
