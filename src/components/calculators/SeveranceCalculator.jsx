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

                    <InfoGuide title="📋 퇴직금 실수령액 계산과 IRP 절세, 꼭 알아야 할 핵심 상식">
            <h4>1. 퇴직금 지급 조건의 정확한 이해</h4>
            <p>법정 퇴직금은 <strong>1주 15시간 이상, 계속 근로기간이 1년(365일) 이상</strong>인 모든 근로자(정규직, 계약직, 아르바이트 무관)에게 지급 의무가 발생합니다. 사업주가 이를 어길 시 근로기준법 위반으로 노동청(고용노동부) 진정을 통해 구제받을 수 있습니다. 단, 1년 미만 근무자나 초단시간 근로자는 법정 의무 지급 대상에서 제외됩니다.</p>
            <h4>2. 퇴직소득세 폭탄? IRP 계좌로 세금을 0원으로 (과세 이연 효과)</h4>
            <p>퇴직금을 일반 통장으로 수령하면 그 즉시 <strong>'퇴직소득세 및 지방소득세'</strong>가 원천징수되어 세금을 뗀 실수령액만 들어옵니다. 하지만 퇴직금을 <strong>개인형 퇴직연금(IRP) 계좌</strong>로 직접 이체받을 경우, 세금 징수가 연금 수령 시점(만 55세 이후)까지 미뤄지는 <strong>과세 이연(Tax Deferral) 혜택</strong>을 받습니다. 이를 통해 퇴직소득세의 30~40% 엄청난 절세가 가능하므로, 퇴직 전 반드시 은행/증권사에서 IRP 계좌를 개설해 사측에 제출하세요.</p>
            <h4>3. 내 퇴직금, '평균임금'과 '통상임금' 중 어떤 통계가 유리할까?</h4>
            <p>퇴직금 산정의 근거는 <strong>퇴직 전 3개월 동안 받은 임금의 총액을 그 기간의 총 일수로 나눈 '평균임금'</strong>입니다. 식대, 차량유지비 등도 평균임금 산정 시 포함하는 것이 원칙입니다. 다만 육아휴직이나 업무상 요양 등으로 쉬다가 퇴사하여 평균임금이 비정상적으로 낮아진 케이스라면, 근로기준법에 따라 기본급 중심의 <strong>'통상임금'</strong>으로 대체하여 근로자에게 더 유리한 금액으로 계산해야 합니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
