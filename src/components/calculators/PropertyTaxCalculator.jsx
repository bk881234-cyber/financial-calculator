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

                    <InfoGuide title="🏛️ 부동산 취득세 · 양도소득세 절세 및 비과세 가이드">
            <h4>1. 아파트 첫 취득의 허들: 취득세와 3총사</h4>
            <p>집을 살 때는 집값만 있는 것이 아닙니다. <strong>취득세, 지방교육세, 농어촌특별세</strong> 이 3대 세금이 매수 금액 비율에 따라 함께 따라옵니다. 생애 첫 구매 무주택자의 경우나 신혼부부에게는 주택 가격 조건에 한해 취득세를 최대 전액 200만 원까지 파격 감면해 주는 특별 정책이 연장 운영 중이므로 자격을 미리 확인하고 법무사 등기 전 정부청사나 관할 구청 세무과에 꼭 감면 신청서를 제출해야 합니다.</p>
            <h4>2. 양도소득세 폭탄을 피하는 마스터키! 1세대 1주택 비과세</h4>
            <p>집을 팔 때(양도) 남은 시세차익에 대해 가장 엄청난 파급력을 지닌 절세법입니다. <strong>1세대가 양도일 현재 1주택만을 보유하고, 그 주택의 보유 기간이 2년 이상(취득 당시 조정대상지역이었다면 2년 거주 요건 포함)</strong>을 완벽히 충족했다면 양도차익 얼마가 되었든 매도가액 12억 원까지는 양도소득세를 단 한 푼도 내지 않습니다 (12억 초과분은 비율만큼 과세).</p>
            <h4>3. 다주택자를 겨냥한 중과세율, 장기보유특별공제로 방어하기</h4>
            <p>다주택자의 징벌적 세금을 막기 위한 강력한 우산이 바로 <strong>장기보유특별공제(장특공)</strong>입니다. 집을 투기가 아니라 3년 이상 안정적으로 장기 보유하기만 하면 물가 상승을 반영하여 보유 기간에 따라 매년 2% (1주택자는 최대 80%)씩 양도차익 통 자체를 시원하게 깎아주는 마법의 법조항입니다. 다주택자는 보유 기간 차이 6개월에 세금이 몇천만 원 스윙치므로 매도 스케줄러 전략이 돋보여야 합니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
