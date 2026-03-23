import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import {
  IconCoin, IconPercent, IconPackage, IconTrendUp,
  IconBarChart, IconTag
} from '../Icons';

export default function ProfitMarginCalculator() {
  const { margin, setMarginInput, calcMarginResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = margin.result;

  return (
    <div>
      <InfoGuide title="💡 마진율 및 적정 판매가 가이드">
                  <h4>1. 왜 내가 생각한 것보다 덜 남을까요?</h4>
                  <p>초보 사장님들이 많이 하는 실수! 판매가에 단순히 30%를 곱해서 마진을 계산하지만, <strong>마켓 수수료와 부가세는 고객이 결제한 '최종 판매가'를 기준</strong>으로 떼입니다. 이 계산기를 이용해 "내가 원하는 목표 수익"을 달성하기 위한 진짜 '적정 판매가'를 역산해 보세요.</p>
                  <h4>2. 부가세 누락 주의</h4>
                  <p>일반과세자라면 판매가에 10% 부가세가 포함되어 있다고 국세청은 간주합니다. 즉, 물건을 하나 팔 때마다 그 돈의 1/11은 내 돈이 아니라 나중에 부가세로 토해내야 할 세금입니다. 계산기에서 '부가세 10% 부과'를 켜서 안전하게 계산하세요.</p>
                </InfoGuide>


      <div className="glass-card input-section">

        {/* 매입 원가 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconPackage size={16} /></span>
              상품 매입 원가
            </label>
            <span className="input-hint">{formatKRWShort(margin.cost)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={margin.cost}
              onChange={(e) => setMarginInput('cost', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 기타 비용 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              포장비 / 배송비 등 (건당)
            </label>
            <span className="input-hint">{formatKRWShort(margin.shippingCost)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={margin.shippingCost}
              onChange={(e) => setMarginInput('shippingCost', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 목표 마진율 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconTrendUp size={16} /></span>
              목표 마진율
              <Tooltip text="판매가(공급가액 기준) 대비 남기고 싶은 순수익의 비율입니다." />
            </label>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[10, 20, 30, 40, 50].map((rate) => (
              <button key={rate}
                className={`preset-btn ${Number(margin.targetMarginRate) === rate ? 'active' : ''}`}
                onClick={() => setMarginInput('targetMarginRate', rate)}
              >{rate}%</button>
            ))}
          </div>
          <div className="input-wrap">
            <input type="number" className="input-field" value={margin.targetMarginRate}
              step="1" onChange={(e) => setMarginInput('targetMarginRate', e.target.value)} />
            <span className="input-suffix">%</span>
          </div>
        </div>

        {/* 마켓 수수료율 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconPercent size={16} /></span>
              마켓 결제 수수료율
              <Tooltip text="스마트스토어, 쿠팡 등 오픈마켓에서 떼어가는 수수료율입니다. (보통 최종 결제금액 기준)" />
            </label>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[[3, '스마트스토어(약3%)'], [10, '일반마켓(약10%)'], [15, '높은수수료(15%)']].map(([rate, label]) => (
              <button key={rate}
                className={`preset-btn ${Number(margin.feeRate) === rate ? 'active' : ''}`}
                onClick={() => setMarginInput('feeRate', rate)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <input type="number" className="input-field" value={margin.feeRate}
              step="0.1" onChange={(e) => setMarginInput('feeRate', e.target.value)} />
            <span className="input-suffix">%</span>
          </div>
        </div>

        {/* 부가세 적용 토글 */}
        <div className="toggle-row">
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              부가세(VAT) 10% 부과
              <Tooltip text="일반과세자는 판매가에 10% 부가세를 붙여 팔고 나중에 세무서에 냅니다. 면세/영세 사업자라면 꺼주세요." />
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>
              {margin.applyVat ? '판매가에 10% 부가세 포함 (일반과세)' : '부가세 제외 (면세사업자)'}
            </div>
          </div>
          <button
            className={`toggle-switch ${margin.applyVat ? 'on' : 'off'}`}
            onClick={() => setMarginInput('applyVat', !margin.applyVat)}
          >
            <div className="toggle-knob" />
          </button>
        </div>
      </div>

      <button className="calc-btn" onClick={calcMarginResult}>적정 판매가 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero" style={{ background: 'linear-gradient(145deg, #1E293B 0%, #312E81 55%, #4C1D95 100%)' }}>
            <div className="result-hero-badge">
              추천 판매가 (고객 결제액)
            </div>
            <div className="result-hero-value">{formatKRW(r.finalSellingPrice)}원</div>
            <div className="result-hero-sub">
              이 가격에 팔면 <strong>{formatKRW(r.netProfit)}원</strong>이 남습니다.
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconTag size={20} /></div>
              <div className="result-card-label">공급가액 (판매가)</div>
              <div className="result-card-value">{formatKRW(r.sellingPriceExVat)}원</div>
            </div>
            {margin.applyVat && (
              <div className="result-card">
                <div className="result-card-icon"><IconBarChart size={20} /></div>
                <div className="result-card-label">예상 부가세 (VAT)</div>
                <div className="result-card-value c-red">-{formatKRW(r.vat)}원</div>
              </div>
            )}
            <div className="result-card">
              <div className="result-card-icon"><IconPercent size={20} /></div>
              <div className="result-card-label">수수료 (마켓)</div>
              <div className="result-card-value c-red">-{formatKRW(r.fee)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">총 원가 (매입+배송)</div>
              <div className="result-card-value c-blue">-{formatKRW(r.cost)}원</div>
            </div>
          </div>

          <div className="chart-wrap">
            <div className="chart-title">결제 대금 분배 구조 (1건 당)</div>
            <div style={{ padding: '10px 0', fontSize: '15px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E2E8F0' }}>
                <span>💰 고객 최종 결제액</span>
                <strong style={{ color: 'var(--text-primary)' }}>{formatKRW(r.finalSellingPrice)}원</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E2E8F0' }}>
                <span>➖ 마켓 수수료</span>
                <span className="c-red">-{formatKRW(r.fee)}원</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E2E8F0' }}>
                <span>➖ 총 원가 (포장/배송 등)</span>
                <span className="c-blue">-{formatKRW(r.cost)}원</span>
              </div>
              {margin.applyVat && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #E2E8F0' }}>
                  <span>➖ 부가세 (나중에 낼 세금)</span>
                  <span className="c-red">-{formatKRW(r.vat)}원</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 4px', fontWeight: '800', fontSize: '17px' }}>
                <span>✅ 내 주머니에 남는 순수익</span>
                <strong className="c-teal">{formatKRW(r.netProfit)}원 ({r.actualMarginRate}%)</strong>
              </div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="마진율_판매가_계산결과" />
        </div>
      )}
    </div>
  );
}
