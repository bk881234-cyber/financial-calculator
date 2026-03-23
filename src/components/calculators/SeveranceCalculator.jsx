import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconCalendar, IconDollarSign, IconBriefcase, IconBarChart } from '../Icons';

export default function SeveranceCalculator() {
  const { severance, setSeveranceInput, calcSeveranceResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = severance.result;

  return (
    <div>
      <div className="glass-card input-section">
        {/* 입사일 / 퇴사일 */}
        <div className="input-grid-2">
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconCalendar size={16} /></span>
                입사일
              </label>
            </div>
            <div className="input-wrap">
              <input
                type="date"
                className="input-field"
                value={severance.startDate}
                onChange={(e) => setSeveranceInput('startDate', e.target.value)}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconCalendar size={16} /></span>
                퇴사일
              </label>
            </div>
            <div className="input-wrap">
              <input
                type="date"
                className="input-field"
                value={severance.endDate}
                onChange={(e) => setSeveranceInput('endDate', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 최근 3개월 기본급 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              퇴직 전 3개월 기본급 합계
              <Tooltip text="퇴사 직전 3개월 동안 받은 기본급의 합계입니다. 식대·교통비 등 비과세 항목은 제외합니다." />
            </label>
            <span className="input-hint">{formatKRWShort(severance.last3MonthPay)}</span>
          </div>
          <div className="input-wrap">
            <input
              type="number"
              className="input-field"
              value={severance.last3MonthPay}
              onChange={(e) => setSeveranceInput('last3MonthPay', e.target.value)}
            />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 연간 상여금 / 연차수당 */}
        <div className="input-grid-2">
          <div className="input-row" style={{ marginBottom: 0 }}>
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconBriefcase size={16} /></span>
                연간 상여금
                <Tooltip text="지난 1년간 받은 상여금(보너스) 총액입니다. 3/12를 평균임금 계산에 포함합니다." />
              </label>
            </div>
            <div className="input-wrap">
              <input
                type="number"
                className="input-field"
                value={severance.annualBonus}
                onChange={(e) => setSeveranceInput('annualBonus', e.target.value)}
              />
              <span className="input-suffix">원</span>
            </div>
          </div>
          <div className="input-row" style={{ marginBottom: 0 }}>
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconDollarSign size={16} /></span>
                연간 연차수당
                <Tooltip text="지난 1년간 사용하지 못해 돈으로 받은 연차수당 총액입니다." />
              </label>
            </div>
            <div className="input-wrap">
              <input
                type="number"
                className="input-field"
                value={severance.annualLeave}
                onChange={(e) => setSeveranceInput('annualLeave', e.target.value)}
              />
              <span className="input-suffix">원</span>
            </div>
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcSeveranceResult}>퇴직금 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero">
            <div className="result-hero-badge">퇴직금 실수령액 (세후)</div>
            <div className="result-hero-value">{formatKRW(r.netSeverance)}<sup>원</sup></div>
            <div className="result-hero-sub">
              재직 {r.years}년 ({r.totalDays.toLocaleString()}일) · 1일 평균임금 {formatKRW(r.dailyAvgPay)}원
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">퇴직금 총액 (세전)</div>
              <div className="result-card-value c-blue">{formatKRW(r.severancePay)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">퇴직소득세</div>
              <div className="result-card-value c-red">-{formatKRW(r.incomeTax)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">지방소득세</div>
              <div className="result-card-value c-red">-{formatKRW(r.localTax)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">근속 연수</div>
              <div className="result-card-value">{r.workYears}년</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="퇴직금계산결과" />

          <InfoGuide title="📋 퇴직금, 꼭 알아야 할 핵심 상식">
            <h4>1. 퇴직금 지급 조건</h4>
            <p>퇴직금은 <strong>1주 15시간 이상, 1년 이상 근무</strong>한 모든 근로자에게 법적으로 지급 의무가 있습니다. 계약직·아르바이트도 동일하게 적용됩니다. 만약 회사가 지급을 거부하면 노동청에 신고할 수 있습니다.</p>
            <h4>2. 퇴직소득세를 0원으로 줄이는 방법 (IRP)</h4>
            <p>퇴직금을 <strong>IRP(개인형퇴직연금) 계좌</strong>로 직접 이체받으면 퇴직소득세 납부를 연금 수령 시점까지 이연(미룰 수 있음)할 수 있습니다. 이 경우 퇴직소득세의 <strong>30~40% 절세 효과</strong>가 있습니다. 55세 이후 연금으로 받으면 더욱 절세됩니다.</p>
            <h4>3. 평균임금 vs 통상임금</h4>
            <p>퇴직금 계산은 <strong>평균임금</strong>(퇴직 전 3개월 실제로 받은 금액 기준)을 사용합니다. 이것이 통상임금보다 낮을 경우 통상임금을 사용해야 합니다. 성과급을 연초에 한꺼번에 받았다면 실제 평균임금과 차이가 날 수 있으니 전문가 확인을 권장합니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
