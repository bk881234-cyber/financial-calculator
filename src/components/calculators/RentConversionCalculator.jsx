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

          <InfoGuide title="🔄 전월세 전환, 세입자가 꼭 알아야 할 것">
            <h4>1. 법정 전환율 초과는 위법!</h4>
            <p>주택임대차보호법에 따라 <strong>전월세 전환율 상한선은 기준금리 + 2%p</strong>입니다. 집주인이 이를 초과한 전환율을 적용하면 위법이며, 세입자는 초과분 반환 청구가 가능합니다.</p>
            <h4>2. 보증금 올리기 vs 월세로 내기 — 어느 쪽이 유리?</h4>
            <p>보증금을 높이면 매월 나가는 현금은 줄지만, 그 보증금을 은행에 예치할 경우 얻을 수 있는 이자 수익을 포기하는 셈입니다. 대출금리와 전환율, 보증금 투자 수익률을 종합적으로 비교하세요.</p>
            <h4>3. 임대인 동의 없이 전환 불가</h4>
            <p>임차인이 원한다고 임의로 보증금↔월세를 바꿀 수는 없습니다. 반드시 <strong>임대인의 동의를 받고 계약서를 재작성</strong>해야 하며, 확정일자와 전입신고도 갱신해야 합니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
