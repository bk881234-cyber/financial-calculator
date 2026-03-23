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

          <InfoGuide title="🧾 부가세, 사업자라면 반드시 알아야 할 것">
            <h4>1. 부가세는 내 돈이 아니다!</h4>
            <p>부가세(VAT)는 소비자가 부담하는 세금이고, 사업자는 이를 <strong>잠시 보관했다가 국가에 납부</strong>하는 역할입니다. 매출에서 받은 부가세(매출세액)에서 내가 거래처에 낸 부가세(매입세액)를 빼고 남은 금액을 신고·납부합니다.</p>
            <h4>2. 세금계산서를 꼭 받아야 하는 이유</h4>
            <p>거래처에서 물건이나 서비스를 구매할 때 세금계산서를 받으면, 그 금액의 10%를 매입세액으로 공제받을 수 있습니다. <strong>세금계산서를 받지 않으면 이 공제가 불가능</strong>하므로, 반드시 발급 요청하세요.</p>
            <h4>3. 간이과세자 기준과 장단점</h4>
            <p>연 매출 8,000만원 미만이면 간이과세자로, 매출의 업종별 부가가치율에 10%만 납부합니다. 세금 부담이 가볍지만 <strong>세금계산서 발급이 불가</strong>하여 B2B 거래가 불리합니다. 성장 단계에 맞게 전환 시기를 검토하세요.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
