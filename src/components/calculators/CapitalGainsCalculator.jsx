import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconBarChart, IconDollarSign, IconTrendUp, IconStock } from '../Icons';

export default function CapitalGainsCalculator() {
  const { capitalGains, setCapitalGainsInput, calcCapitalGainsResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = capitalGains.result;

  const profit = Number(capitalGains.sellTotal) - Number(capitalGains.buyTotal);

  return (
    <div>
      <div className="glass-card input-section">
        {/* 총 매수금액 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              총 매수금액 (취득가액)
              <Tooltip text="해외주식 또는 가상자산의 총 구매금액입니다. 수수료와 세금도 포함됩니다. 원화 환산 기준으로 입력하세요." />
            </label>
            <span className="input-hint">{formatKRWShort(capitalGains.buyTotal)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={capitalGains.buyTotal}
              onChange={(e) => setCapitalGainsInput('buyTotal', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 총 매도금액 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconTrendUp size={16} /></span>
              총 매도금액 (양도가액)
              <Tooltip text="해외주식 또는 가상자산의 총 판매금액입니다. 수수료 등을 제외한 실제 수령액입니다. 원화 환산 기준으로 입력하세요." />
            </label>
            <span className="input-hint">{formatKRWShort(capitalGains.sellTotal)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={capitalGains.sellTotal}
              onChange={(e) => setCapitalGainsInput('sellTotal', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>
      </div>

      {/* 수익 미리보기 */}
      {profit !== 0 && (
        <div className="glass-card" style={{ padding: '14px 18px', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>
              {profit >= 0 ? '📈 수익' : '📉 손실'}
            </span>
            <span style={{ fontSize: 18, fontWeight: 900, color: profit >= 0 ? '#059669' : '#DC2626' }}>
              {profit >= 0 ? '+' : ''}{formatKRW(profit)}원
            </span>
          </div>
          {profit > 0 && profit <= 2_500_000 && (
            <p style={{ fontSize: 13, color: '#059669', marginTop: 6, fontWeight: 600 }}>
              ✅ 기본공제(250만원) 이하 — 세금 없음!
            </p>
          )}
        </div>
      )}

      <button className="calc-btn" onClick={calcCapitalGainsResult}>양도소득세 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          {r.taxBase === 0 ? (
            <div className="result-hero" style={{ background: 'linear-gradient(145deg, #064E3B 0%, #065F46 55%, #047857 100%)' }}>
              <div className="result-hero-badge">🎉 납부세액 없음</div>
              <div className="result-hero-value">0<sup>원</sup></div>
              <div className="result-hero-sub">
                {r.profit <= 0
                  ? `손실 발생 (${formatKRW(Math.abs(r.profit))}원 손실)`
                  : `수익 ${formatKRW(r.profit)}원이 기본공제 250만원 이하`
                }
              </div>
            </div>
          ) : (
            <div className="result-hero">
              <div className="result-hero-badge">양도소득세 납부액 (22%)</div>
              <div className="result-hero-value">{formatKRW(r.totalTax)}<sup>원</sup></div>
              <div className="result-hero-sub">
                실효세율 {r.effectiveRate}% · 실수익 {formatKRWShort(r.netProfit)}
              </div>
            </div>
          )}

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconTrendUp size={20} /></div>
              <div className="result-card-label">총 수익 (양도차익)</div>
              <div className={`result-card-value ${r.profit >= 0 ? 'c-blue' : 'c-red'}`}>{formatKRW(r.profit)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">기본공제</div>
              <div className="result-card-value">-250만원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">양도소득세 (20%)</div>
              <div className="result-card-value c-red">{formatKRW(r.taxAmount)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">지방소득세 (2%)</div>
              <div className="result-card-value c-red">{formatKRW(r.localTax)}원</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="양도소득세계산결과" />

                    <InfoGuide title="🪙 해외주식·가상자산(코인) 22% 양도소득세 절세 실전 시크릿">
            <h4>1. 22%의 파괴력, 무조건 매년 '250만 원'의 기본 공제는 챙겨라</h4>
            <p>한국 주식 시장과 달리 나스닥이나 테슬라 등 <strong>해외주식을 매도하여 얻은 실수익 총합에 대해서는 매년 (1월 1일~12월 31일 기준) 22%의 살인적인 양도소득세</strong>를 국세청에 신고 납부해야 합니다. 하지만 단 하나의 자비가 있습니다. 바로 연간 통합하여 최초 수익분 <strong>'250만 원까지는 무조건 세금을 매기지 않는 기본공제'</strong> 제도입니다. 만약 당신이 10년을 장기 투자하겠다며 단 한 주도 팔지 않고 있다가 10년 뒤에 팔아 5,000만 원 수익을 낸다면 250만 원만 공제받고 (즉 4,750만 원에 대한 22%) 어마어마한 세금을 맞게 됩니다. 따라서 수익이 나고 있는 종목은 수수료를 물더라도 매년 연말 250만 원 어치의 수익만큼은 한 번씩 매도했다가 바로 당일 재매수해서 과세표준을 영구히 올려놓는 것이 최고의 세테크입니다.</p>
            <h4>2. Tax Loss Harvesting (손실 난 쓰레기 주식을 살릴 기회)</h4>
            <p>해외주식은 '이익'이 난 주식 매도 대금과, '손실'이 발생해 박살 난 주식 매도 대금을 합쳐서 1년 순수익(손실통산)을 매깁니다. 올 한 해 테슬라에서 1,000만 원의 큰 수익이 났는데 옆 계좌 펠로톤에서 -700만 원의 손실을 기록하며 팔지 못해 썩어가는 종목이 있다면 어떻게 해야 할까요? <strong>반드시 올해 12월 31일 미국장이 끝나버리기 3일 전 결제일 내에 펠로톤을 손절 매도</strong>하세요. 그러면 1천-7백= 총수익 300만 원이 되고, 거기서 정부 250만 원 공제가 들어가면 최종 양도세 신고액은 단돈 50만 원에 22%를 곱한 11만 원에 불과하게 됩니다. 이것이 월가 투자자들이 연말 무조건 손실 확정을 하는 '택스 로스 하베스팅(조세 기회 매도법)'의 위력입니다.</p>
            <h4>3. 가상자산 (코인 시장)의 과세 이슈와 양도세 대기 현황</h4>
            <p>비트코인 등 암호화폐에 대한 양도세 22% 부과 정책은 정부 당국의 법안 유예 조치에 따라 시행 시기가 거듭 유동적으로 밀리고 있는 상태(현재 2025년 또는 2027년 연기 등 국회 조정 상태)입니다. 다행히 시행 이전 매도 건에 대해서는 모두 합법적인 완전 무과세 수익을 남깁니다. 다만 향후 과세법안이 최종 공표될 시 해외 거래소로의 이동이나 디파이(Defi) 스테이킹 자산 이자 등은 해외금융계좌 상시 보고법 등과 연계돼 강도 높은 추적을 받을 수 있으므로 원화 마켓 자금 흐름 관리에 심혈을 기울여야 합니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
