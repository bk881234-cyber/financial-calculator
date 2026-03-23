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
      <InfoGuide title="💡 코인·해외주식 양도소득세 계산기 100% 활용 가이드">
                  <h4>1. 해외주식 매도 후 납부할 세금을 쉽고 빠르게 계산해 보세요</h4>
                  <p>해외주식 양도소득세 계산기로 나스닥, S&P 종목 등을 팔아 돈을 벌었을 때 다음 해 5월에 낼 세금을 쉽고 빠르게 계산해 보세요. 국세청 양도소득세 과세표준(지방세 포함 22% 단일세율) 기준에 따라 납부할 세무 세액을 사전에 계산해볼 수 있도록 구성되어 있습니다.</p>
                  <h4>2. 250만 원 기본공제와 손익통산 기능</h4>
                  <p>양도소득세는 1년(1.1~12.31) 동안의 수익 총합과 손실 총합을 더한 순수익에서 <strong>매년 기본공제 250만 원</strong>을 빼고 남은 금액에 대해서만 22% 세금을 매깁니다. 이 계산기를 활용해 연말 전에 손실 난 종목을 팔아 이익을 상쇄시키는 '택스 로스 하베스팅(현실적인 절세매도법)' 금액을 역산해 보세요.</p>
                </InfoGuide>


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
        </div>
      )}
    </div>
  );
}
