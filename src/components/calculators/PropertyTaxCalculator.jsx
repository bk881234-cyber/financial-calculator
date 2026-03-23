import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconCalendar, IconDollarSign, IconBarChart, IconHome } from '../Icons';

const PRICE_PRESETS = [
  { label: '3억', value: 300_000_000 },
  { label: '5억', value: 500_000_000 },
  { label: '9억', value: 900_000_000 },
  { label: '12억', value: 1_200_000_000 },
];

export default function PropertyTaxCalculator() {
  const { propertyTax, setPropertyTaxInput, calcPropertyTaxResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = propertyTax.result;

  return (
    <div>
      <InfoGuide title="💡 취득세 · 양도소득세 계산기 100% 활용 가이드">
                  <h4>1. 내 집 마련 세금, 쉽고 빠르게 계산해 보세요</h4>
                  <p>부동산 세금 계산기로 주택 매수 시의 취득세와 매도 시의 양도차익 소득세를 쉽고 빠르게 시뮬레이션해 보세요. 국세청 및 지방세법 다주택자 중과 기준에 따라 납부해야 할 세금을 사전에 대략적으로 계산해볼 수 있도록 구성되어 있습니다.</p>
                  <h4>2. 주택 수와 조정지역 여부를 확인하세요</h4>
                  <p>본인이 보유한 주택 수(무주택, 1주택, 2주택 이상)와 해당 부동산이 규제지역(조정대상지역 등)에 속하는지에 따라 취득세율과 양도소득세 중과 여부가 크게 변동됩니다. 1세대 1주택이라면 매도 시 12억 원까지 비과세 효과가 매우 크니 장기보유특별공제를 염두에 두고 계산해 보세요. 정확한 세액은 홈택스 시뮬레이션이나 세무사를 통해 최종 확인하시길 권장합니다.</p>
                </InfoGuide>


      <div className="glass-card input-section">
        {/* 계산 모드 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconHome size={16} /></span>
              세금 종류
            </label>
          </div>
          <div className="method-group">
            <button
              className={`method-btn ${propertyTax.calcMode === 'acquisition' ? 'active' : ''}`}
              onClick={() => setPropertyTaxInput('calcMode', 'acquisition')}
            >취득세 (살 때)</button>
            <button
              className={`method-btn ${propertyTax.calcMode === 'transfer' ? 'active' : ''}`}
              onClick={() => setPropertyTaxInput('calcMode', 'transfer')}
            >양도소득세 (팔 때)</button>
          </div>
        </div>

        {/* 주택 수 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconBarChart size={16} /></span>
              주택 수 (취득 후 기준)
              <Tooltip text="취득 후 본인 명의 전체 주택 수입니다. 다주택자는 조정대상지역 여부에 따라 세율이 크게 달라집니다." />
            </label>
          </div>
          <div className="method-group">
            {[1, 2, 3].map((v) => (
              <button key={v}
                className={`method-btn ${Number(propertyTax.homeCount) === v ? 'active' : ''}`}
                onClick={() => setPropertyTaxInput('homeCount', v)}
              >{v === 3 ? '3주택 이상' : `${v}주택`}</button>
            ))}
          </div>
        </div>

        {/* 조정대상지역 */}
        <div className="toggle-row">
          <span style={{ fontSize: 15, fontWeight: 700, color: '#475569' }}>
            조정대상지역
            <Tooltip text="서울 전역, 경기 일부 등 국토부 지정 조정대상지역 여부입니다. 다주택자의 경우 세율이 대폭 중과됩니다." />
          </span>
          <button
            className={`toggle-switch ${propertyTax.isAdjustedArea ? 'on' : 'off'}`}
            onClick={() => setPropertyTaxInput('isAdjustedArea', !propertyTax.isAdjustedArea)}
          >
            <span className="toggle-knob" />
          </button>
        </div>

        {/* 취득가 (양도세 모드) / 양도가 */}
        {propertyTax.calcMode === 'transfer' && (
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconCoin size={16} /></span>
                취득가액 (매입 당시)
              </label>
              <span className="input-hint">{formatKRWShort(propertyTax.acquisitionPrice)}</span>
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={propertyTax.acquisitionPrice}
                onChange={(e) => setPropertyTaxInput('acquisitionPrice', e.target.value)} />
              <span className="input-suffix">원</span>
            </div>
          </div>
        )}

        {/* 양도가 / 취득가 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconDollarSign size={16} /></span>
              {propertyTax.calcMode === 'acquisition' ? '취득가액 (매입가)' : '양도가액 (매도가)'}
            </label>
            <span className="input-hint">{formatKRWShort(propertyTax.price)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {PRICE_PRESETS.map(({ label, value }) => (
              <button key={value}
                className={`preset-btn ${Number(propertyTax.price) === value ? 'active' : ''}`}
                onClick={() => setPropertyTaxInput('price', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={propertyTax.price}
              onChange={(e) => setPropertyTaxInput('price', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 보유 기간 (양도세 모드) */}
        {propertyTax.calcMode === 'transfer' && (
          <div className="input-row" style={{ marginBottom: 0 }}>
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconCalendar size={16} /></span>
                보유 기간
                <Tooltip text="매입일부터 매도일까지의 보유 기간입니다. 2년 미만은 단기 양도세율(60~70%)이 적용됩니다." />
              </label>
              <span className="input-hint">{propertyTax.holdingYears}년</span>
            </div>
            <div className="preset-group" style={{ marginBottom: 10 }}>
              {[1, 2, 3, 5, 10].map((v) => (
                <button key={v}
                  className={`preset-btn ${Number(propertyTax.holdingYears) === v ? 'active' : ''}`}
                  onClick={() => setPropertyTaxInput('holdingYears', v)}
                >{v}년</button>
              ))}
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={propertyTax.holdingYears}
                onChange={(e) => setPropertyTaxInput('holdingYears', e.target.value)} />
              <span className="input-suffix">년</span>
            </div>
          </div>
        )}
      </div>

      <button className="calc-btn" onClick={calcPropertyTaxResult}>세금 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          {r.mode === 'acquisition' ? (
            <>
              <div className="result-hero">
                <div className="result-hero-badge">취득세 (총 납부액)</div>
                <div className="result-hero-value">{formatKRW(r.totalTax)}<sup>원</sup></div>
                <div className="result-hero-sub">
                  취득세율 {r.baseRate.toFixed(1)}% · 농특세·지방교육세 포함
                </div>
              </div>
              <div className="result-grid">
                <div className="result-card">
                  <div className="result-card-icon"><IconCoin size={20} /></div>
                  <div className="result-card-label">취득세 본세</div>
                  <div className="result-card-value c-red">{formatKRW(r.acquisitionTax)}원</div>
                </div>
                <div className="result-card">
                  <div className="result-card-icon"><IconDollarSign size={20} /></div>
                  <div className="result-card-label">농특세+지방교육세</div>
                  <div className="result-card-value c-red">{formatKRW(r.addTax)}원</div>
                </div>
                <div className="result-card">
                  <div className="result-card-icon"><IconBarChart size={20} /></div>
                  <div className="result-card-label">적용 세율</div>
                  <div className="result-card-value">{r.baseRate.toFixed(2)}%</div>
                </div>
                <div className="result-card">
                  <div className="result-card-icon"><IconHome size={20} /></div>
                  <div className="result-card-label">취득가액</div>
                  <div className="result-card-value">{formatKRWShort(r.price)}</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="result-hero">
                <div className="result-hero-badge">양도소득세 (총 납부액)</div>
                <div className="result-hero-value">{formatKRW(r.totalTax)}<sup>원</sup></div>
                <div className="result-hero-sub">
                  양도차익 {formatKRWShort(r.profit)} · 실수익 {formatKRWShort(r.netProfit)}
                </div>
              </div>
              <div className="result-grid">
                <div className="result-card">
                  <div className="result-card-icon"><IconCoin size={20} /></div>
                  <div className="result-card-label">양도차익</div>
                  <div className="result-card-value c-blue">{formatKRW(r.profit)}원</div>
                </div>
                <div className="result-card">
                  <div className="result-card-icon"><IconBarChart size={20} /></div>
                  <div className="result-card-label">장기보유특별공제</div>
                  <div className="result-card-value">{r.longTermDeduction}%</div>
                </div>
                <div className="result-card">
                  <div className="result-card-icon"><IconDollarSign size={20} /></div>
                  <div className="result-card-label">양도소득세+지방세</div>
                  <div className="result-card-value c-red">{formatKRW(r.totalTax)}원</div>
                </div>
                <div className="result-card">
                  <div className="result-card-icon"><IconCalendar size={20} /></div>
                  <div className="result-card-label">실제 수익</div>
                  <div className="result-card-value">{formatKRWShort(r.netProfit)}</div>
                </div>
              </div>
            </>
          )}

          <ShareButton targetRef={resultRef} filename="부동산세금계산결과" />
        </div>
      )}
    </div>
  );
}
