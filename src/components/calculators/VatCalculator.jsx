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

                    <InfoGuide title="🧾 사업자 부가가치세(VAT) 절세의 시작, 이 세 가지는 명심하세요">
            <h4>1. 일반과세자 vs 간이과세자 — 당신에게 가장 유리한 옷은?</h4>
            <p>사업자등록 시 간이과세자(직전년도 공급대가 1억 400만 원 미만)를 고집해야 세금을 거의 안 낸다고 믿는 이들이 많습니다. 맞습니다, 매출세액이 대폭 낮아집니다. 하지만 만약 초기 인테리어비, 값비싼 커피머신, 컴퓨터 집기 등 수천만 원의 <strong>'초기 투자금세금계산서'</strong>를 발급받았다면, <strong>오직 일반과세자만이 매입세액 전부를 부가세 환급 통장으로 수백~수천만 원 직접 돌려받을 수 있습니다.</strong> 간이과세자는 기계처럼 환급이 불가능하므로 초기 투자비 수준에 따라 치밀하게 세팅하세요.</p>
            <h4>2. 신용카드 등 매출세액 공제를 놓치지 않고 계신가요?</h4>
            <p>음식점, 카페, 소매업종의 사장님이라면 절대 간과해서는 안 될 조항입니다. 현금 대신 <strong>우리가 신용카드 밴(VAN)단말기로 긁은 매출 또는 현금영수증을 발행해 준 모든 결제건수</strong> 금액의 무려 1.3%를 1년에 1천만 원 한도까지 세액에서 아예 깎아버려 주는 부가세법상 최상의 특혜 공제입니다. 매번 부가세 신고서 한 줄을 썼느냐 아니냐로 인해 납부세액이 기를 쓰고 낮아질 수 있는 기회를 놓치지 마세요.</p>
            <h4>3. 제발, 핸드폰 요금과 각종 전기/가스 고지서를 사업자 번호로 바꾸세요.</h4>
            <p>사소해 보이지만 나중에 치명적인 부가세 매입 증빙들이 됩니다. 매월 꼬박꼬박 내는 <strong>통신사 요금, 인터넷망비, 관리비에 딸린 한전 전기요금, 도시가스 대금</strong> 등은 모두 부가세 10%가 얹혀서 나가는 금액입니다. 국번없이 114나 한국전력 콜센터로 전화 한 통 걸어서 "제 명의 영수증을 사업자등록번호로 끊히는 세금계산서로 바꿔주세요" 요청 한 번만 해두면 매년 수십만 원의 부가가치세를 정기적으로 절세받습니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
