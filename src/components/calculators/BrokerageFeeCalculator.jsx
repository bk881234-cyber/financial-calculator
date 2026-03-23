import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconBarChart, IconDollarSign, IconHome } from '../Icons';

const AMOUNT_PRESETS = [
  { label: '1억', value: 100_000_000 },
  { label: '3억', value: 300_000_000 },
  { label: '5억', value: 500_000_000 },
  { label: '9억', value: 900_000_000 },
  { label: '15억', value: 1_500_000_000 },
];

export default function BrokerageFeeCalculator() {
  const { brokerage, setBrokerageInput, calcBrokerageResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = brokerage.result;

  return (
    <div>
      <div className="glass-card input-section">
        {/* 거래 유형 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconHome size={16} /></span>
              거래 유형
              <Tooltip text="매매는 집을 사고팔 때, 전세는 전세 계약 시, 월세는 월세 계약 시 적용됩니다." />
            </label>
          </div>
          <div className="method-group">
            {[
              { key: 'buy', label: '매매' },
              { key: 'jeonse', label: '전세' },
              { key: 'monthly', label: '월세' },
            ].map(({ key, label }) => (
              <button key={key}
                className={`method-btn ${brokerage.tradeType === key ? 'active' : ''}`}
                onClick={() => setBrokerageInput('tradeType', key)}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* 거래 금액 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              거래 금액
              <Tooltip text={
                brokerage.tradeType === 'monthly'
                  ? '월세의 경우: 보증금 + (월세 × 100)으로 계산합니다. 예) 보증금 5천만 + 월세 50만 → 5천만 + 5천만 = 1억'
                  : '매매·전세 계약금액(실거래가)을 입력하세요.'
              } />
            </label>
            <span className="input-hint">{formatKRWShort(brokerage.tradeAmount)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {AMOUNT_PRESETS.map(({ label, value }) => (
              <button key={value}
                className={`preset-btn ${Number(brokerage.tradeAmount) === value ? 'active' : ''}`}
                onClick={() => setBrokerageInput('tradeAmount', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={brokerage.tradeAmount}
              onChange={(e) => setBrokerageInput('tradeAmount', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* VAT 포함 */}
        <div className="toggle-row" style={{ marginBottom: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#475569' }}>
            부가세(VAT 10%) 포함
            <Tooltip text="일반과세 공인중개사는 중개보수에 VAT 10%가 추가됩니다. 간이과세 공인중개사(소규모)는 부가세가 없을 수 있습니다." />
          </span>
          <button
            className={`toggle-switch ${brokerage.includeVat ? 'on' : 'off'}`}
            onClick={() => setBrokerageInput('includeVat', !brokerage.includeVat)}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>

      <button className="calc-btn" onClick={calcBrokerageResult}>중개수수료 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero">
            <div className="result-hero-badge">법정 최대 중개수수료</div>
            <div className="result-hero-value">{formatKRW(r.totalFee)}<sup>원</sup></div>
            <div className="result-hero-sub">
              상한 요율 {r.rate.toFixed(1)}%
              {r.ceiling ? ` · 한도액 ${formatKRW(r.ceiling)}원 적용` : ''}
              {brokerage.includeVat ? ` · VAT ${formatKRW(r.vatAmount)}원 포함` : ''}
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconHome size={20} /></div>
              <div className="result-card-label">거래 유형</div>
              <div className="result-card-value">
                {{ buy: '매매', jeonse: '전세', monthly: '월세' }[brokerage.tradeType]}
              </div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">법정 상한 요율</div>
              <div className="result-card-value">{r.rate.toFixed(2)}%</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">순 중개보수</div>
              <div className="result-card-value">{formatKRW(r.maxFee)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">VAT</div>
              <div className="result-card-value">{formatKRW(r.vatAmount)}원</div>
            </div>
          </div>

          <div className="tip-box">
            <div className="tip-title">💡 중개수수료 협의 팁</div>
            <p>법정 요율은 <strong>상한선</strong>입니다. 계약 전 협상을 통해 낮출 수 있습니다. 거래금액이 클수록, 비수기일수록 협상력이 높습니다.</p>
          </div>

          <ShareButton targetRef={resultRef} filename="중개수수료계산결과" />

                    <InfoGuide title="🤝 부동산 중개수수료(복비), 눈탱이 안 맞고 똑똑하게 내는 법">
            <h4>1. 중개보수는 결코 '고정 요율'이 아닙니다</h4>
            <p>중개소에서 "여긴 원래 0.5% 받아요"라고 말하더라도, 법정 요율표는 항상 <strong>'상한 요율'일 뿐(예: 0.4% ~ 최대 0.8% 이내에서 협의)</strong>입니다. 한도 내에서 상호 합의에 의해 결정되는 것이 원칙이므로, 집을 보러 가거나 계약을 올리기 전 가급적 <strong>가장 첫 단계에서 "수수료율을 얼마로 할 것인지"</strong>를 당당하게 중개사와 구두 또는 문자로 미리 합의하고 진행하는 것이 최선입니다.</p>
            <h4>2. 오피스텔 (주거용 vs 업무용) 중개수수료 구분법</h4>
            <p>오피스텔은 무조건 상한 요율(0.9%)이 아닙니다. 법 개정으로 인해 <strong>85제곱미터 이하이면서 상하수도 설비, 전용 입식 부엌 및 화장실</strong>을 갖춘 사실상의 '주거용 오피스텔'의 경우 매매/교환은 최고 0.5%, 임대차는 상한 0.4%의 저렴한 요율이 일괄 적용됩니다. 그 밖의 모든 업무용/상업용 오피스텔과 상가만이 0.9% 요율의 적용 대상임을 명심하세요.</p>
            <h4>3. 부가가치세 10% 추가 징수 요구, 정당할까?</h4>
            <p>중개수수료법에서는 부가가치세를 별도로 간주합니다. <strong>부동산 사무소가 '일반과세자'라면 합의된 수수료에 부가세 10%를 덧붙여 청구하는 것이 합법</strong>이며 당연히 현금영수증이나 세금계산서를 발행해 줍니다. 단, 연 매출이 영세한 <strong>'간이과세자'의 경우는 부가세 명목으로 고객에게 별도 세금을 요구할 수 없습니다</strong> (영수증에 공급가액만 청구). 따라서 복비 정산 전 관할 중개소가 일반인지 간이인지 사업자등록증을 살펴 현명하게 대응하세요.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
