import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconPercent, IconHome, IconBarChart, IconDollarSign } from '../Icons';

export default function RentConversionCalculator() {
  const { rentConversion, setRentConversionInput, calcRentConversionResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = rentConversion.result;

  return (
    <div>
      <div className="glass-card input-section">
        {/* 현재 보증금 / 현재 월세 */}
        <div className="input-grid-2">
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconHome size={16} /></span>
                현재 보증금
              </label>
              <span className="input-hint">{formatKRWShort(rentConversion.currentDeposit)}</span>
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={rentConversion.currentDeposit}
                onChange={(e) => setRentConversionInput('currentDeposit', e.target.value)} />
              <span className="input-suffix">원</span>
            </div>
          </div>
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconCoin size={16} /></span>
                현재 월세
                <Tooltip text="순수 전세라면 0원을 입력하세요. 반전세(보증부월세)라면 현재 월세액을 입력합니다." />
              </label>
              <span className="input-hint">{formatKRW(rentConversion.currentMonthly)}원</span>
            </div>
            <div className="preset-group" style={{ marginBottom: 10 }}>
              {[0, 30, 50, 80].map((v) => (
                <button key={v}
                  className={`preset-btn ${Number(rentConversion.currentMonthly) === v * 10000 ? 'active' : ''}`}
                  onClick={() => setRentConversionInput('currentMonthly', v * 10000)}
                >{v === 0 ? '전세' : `${v}만`}</button>
              ))}
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={rentConversion.currentMonthly}
                onChange={(e) => setRentConversionInput('currentMonthly', e.target.value)} />
              <span className="input-suffix">원</span>
            </div>
          </div>
        </div>

        {/* 변경 목표 보증금 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconHome size={16} /></span>
              변경 후 희망 보증금
              <Tooltip text="조정을 원하는 보증금입니다. 현재보다 낮으면 월세가 오르고, 높으면 월세가 내립니다." />
            </label>
            <span className="input-hint">{formatKRWShort(rentConversion.targetDeposit)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={rentConversion.targetDeposit}
              onChange={(e) => setRentConversionInput('targetDeposit', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 전환율 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconPercent size={16} /></span>
              전월세 전환율
              <Tooltip text="법정 전환율은 한국은행 기준금리 + 2%p입니다. 2024년 기준 약 5.5~6.5% 수준입니다. 집주인과 협의한 실제 전환율을 입력하세요." />
            </label>
            <span className="input-hint">{rentConversion.conversionRate}%</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[4.0, 5.0, 5.5, 6.0, 7.0].map((v) => (
              <button key={v}
                className={`preset-btn ${Number(rentConversion.conversionRate) === v ? 'active' : ''}`}
                onClick={() => setRentConversionInput('conversionRate', v)}
              >{v}%</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={rentConversion.conversionRate}
              onChange={(e) => setRentConversionInput('conversionRate', e.target.value)} />
            <span className="input-suffix">%</span>
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcRentConversionResult}>전환 후 금액 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero">
            <div className="result-hero-badge">변경 후 월세</div>
            <div className="result-hero-value">{formatKRW(r.newMonthly)}<sup>원/월</sup></div>
            <div className="result-hero-sub">
              보증금 {r.depositDiff >= 0 ? '-' : '+'}{formatKRWShort(Math.abs(r.depositDiff))} →
              월세 {r.monthlyDiff >= 0 ? '+' : ''}{formatKRW(r.monthlyDiff)}원 변동
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconHome size={20} /></div>
              <div className="result-card-label">변경 전 보증금</div>
              <div className="result-card-value">{formatKRWShort(r.currentDeposit)}</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconHome size={20} /></div>
              <div className="result-card-label">변경 후 보증금</div>
              <div className="result-card-value c-blue">{formatKRWShort(r.targetDeposit)}</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">연간 월세 비용</div>
              <div className="result-card-value">{formatKRWShort(r.annualRentCost)}</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">전세가 환산액</div>
              <div className="result-card-value">{formatKRWShort(r.jeonseEquivalent)}</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="전월세전환계산결과" />

                    <InfoGuide title="🔄 전월세 전환, 보증금과 월세 변환 시 임차인 필독 상식">
            <h4>1. 법정 전월세 전환율 상한선은 필수 보호 장치</h4>
            <p>임대인이 전세를 월세로, 혹은 반전세에서 월세 비율을 높이자고 요구할 때 부르는 게 값이 아닙니다. 주택임대차보호법에 의거 <strong>전월세 전환율 상한선은 기본적으로 '한국은행 기준금리 + 2.0%p'</strong>로 타이트하게 묶여있습니다. 집주인이 이 상한을 불법적으로 초과해 과도한 월세 전가를 시도하면 법적으로 무효이며, 차후 이 초과분을 반환 청구할 소송 권리도 있습니다.</p>
            <h4>2. 상한선은 '보증금을 월세로 바꿀 때'만 적용된다?</h4>
            <p>여명한 사실! 법정 전환율 규제는 임차인의 부담을 막기 위해 <strong>'보증금을 줄이고 기존 전세를 월세화 할 때'만 상한 캡으로 적용</strong>됩니다. 거꾸로 세입자가 원해서 보증금을 크게 높이고 월세를 낮출 때(월세의 보증금화)는 법으로 고정된 제한 비율이 없습니다. 이때는 해당 지역 상권의 평균 시장금 전환율(보통 전세자금대출 이자율 전후인 5~6% 선)에서 집주인과 원만히 개별 협의를 이끌어 내셔야 합니다.</p>
            <h4>3. 전세자금대출 금리 vs 월세 전환 이자 기회비용 비교</h4>
            <p>자금이 모자란다고 무작정 월세를 내기보단, <strong>시중은행 전세자금대출의 금리를 먼저 체크</strong>해 보세요. 만약 대출금리가 4% 초반인데, 보증금을 낮춰 대신 내야 하는 전환 월세 이자비용 환산액이 6%대라면 전세 대출을 받고 이자를 은행에 납부하는 것이 나에게 훨씬 유리한 금융 의사결정입니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
