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
      <InfoGuide title="💡 퇴직금 계산기 100% 활용 가이드">
        <h4>1. 나의 예상 퇴직금을 쉽고 빠르게 계산해 보세요</h4>
        <p>퇴직금 계산기로 이직이나 퇴사 시 받게 될 예상 퇴직금과 퇴직소득세를 쉽고 빠르게 계산해 보세요. 고용노동부 기준 '1일 평균임금' 산정 방식에 따라 법정 퇴직금을 사전에 계산해볼 수 있도록 편리하게 구성되어 있습니다.</p>
        <h4>2. IRP 계좌로 퇴직소득세 절세하기</h4>
        <p>수령 시 IRP(개인형퇴직연금) 계좌로 이체받으시면, 과세 이연 혜택을 받을 수 있어 매우 유리합니다. 퇴직 전 3개월 기본급 합계와 상여금·연차수당을 정확히 입력하면 더욱 정밀한 결과가 나옵니다.</p>
      </InfoGuide>

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
        </div>
      )}
    </div>
  );
}
