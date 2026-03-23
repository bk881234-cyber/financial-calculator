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

          <InfoGuide title="🤝 부동산 중개수수료 핵심 상식">
            <h4>1. 중개수수료는 법정 상한 이하로 협의 가능</h4>
            <p>표시된 금액은 <strong>법에서 정한 최대 한도</strong>이며, 실제 중개보수는 중개사와 협의해 낮출 수 있습니다. "상한 요율로 해주세요"라고 하면 안 되고, 무조건 낮춰달라고 요청하는 게 세입자의 권리입니다.</p>
            <h4>2. 부가세(VAT) 주의!</h4>
            <p>일반과세 공인중개사(연 매출 8,000만원 이상)는 중개보수의 10%를 VAT로 추가 청구할 수 있습니다. 계약 전 <strong>"VAT 포함인가요?"</strong>를 반드시 확인하세요.</p>
            <h4>3. 임대인·임차인 각각 부담</h4>
            <p>중개수수료는 <strong>집주인과 세입자가 각각 중개사에게 별도로 지급</strong>합니다. 즉, 계산된 금액을 집주인이 내고 세입자가 또 내는 구조입니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
