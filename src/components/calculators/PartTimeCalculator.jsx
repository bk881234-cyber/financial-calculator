import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconCalendar, IconDollarSign, IconBarChart, IconUsers } from '../Icons';

const WAGE_PRESETS = [
  { label: '최저임금', value: 9_860 },
  { label: '11,000', value: 11_000 },
  { label: '12,000', value: 12_000 },
  { label: '15,000', value: 15_000 },
];

export default function PartTimeCalculator() {
  const { partTime, setPartTimeInput, calcPartTimeResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = partTime.result;

  const MIN_WAGE = 9_860;

  return (
    <div>
      <div className="glass-card input-section">
        {/* 시급 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              시급
              <Tooltip text="2024년 최저시급은 9,860원입니다. 최저시급 미만은 근로기준법 위반입니다." />
            </label>
            <span className="input-hint" style={{ color: Number(partTime.hourlyWage) < MIN_WAGE ? '#DC2626' : undefined }}>
              {Number(partTime.hourlyWage) < MIN_WAGE ? '⚠️ 최저임금 미만' : formatKRW(partTime.hourlyWage) + '원'}
            </span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {WAGE_PRESETS.map(({ label, value }) => (
              <button key={value}
                className={`preset-btn ${Number(partTime.hourlyWage) === value ? 'active' : ''}`}
                onClick={() => setPartTimeInput('hourlyWage', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={partTime.hourlyWage}
              onChange={(e) => setPartTimeInput('hourlyWage', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 1일 근무시간 & 주 근무일수 */}
        <div className="input-grid-2">
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconCalendar size={16} /></span>
                1일 근무시간
              </label>
              <span className="input-hint">{partTime.dailyHours}시간</span>
            </div>
            <div className="preset-group" style={{ marginBottom: 10 }}>
              {[4, 5, 6, 7, 8].map((v) => (
                <button key={v}
                  className={`preset-btn ${Number(partTime.dailyHours) === v ? 'active' : ''}`}
                  onClick={() => setPartTimeInput('dailyHours', v)}
                >{v}h</button>
              ))}
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={partTime.dailyHours}
                onChange={(e) => setPartTimeInput('dailyHours', e.target.value)} />
              <span className="input-suffix">시간</span>
            </div>
          </div>
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconUsers size={16} /></span>
                주 근무일수
              </label>
              <span className="input-hint">{partTime.weeklyDays}일</span>
            </div>
            <div className="preset-group" style={{ marginBottom: 10 }}>
              {[3, 4, 5, 6].map((v) => (
                <button key={v}
                  className={`preset-btn ${Number(partTime.weeklyDays) === v ? 'active' : ''}`}
                  onClick={() => setPartTimeInput('weeklyDays', v)}
                >{v}일</button>
              ))}
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={partTime.weeklyDays}
                onChange={(e) => setPartTimeInput('weeklyDays', e.target.value)} />
              <span className="input-suffix">일</span>
            </div>
          </div>
        </div>

        {/* 세금 처리 방식 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconDollarSign size={16} /></span>
              세금 처리 방식
              <Tooltip text="3.3%: 프리랜서/일용직. 4대보험: 장기 고용. 없음: 비과세 소득(일용직 일당 15만원 이하 등)." />
            </label>
          </div>
          <div className="method-group">
            {[
              { key: 'none', label: '세금 없음' },
              { key: 'freelancer33', label: '3.3% 원천징수' },
              { key: 'insurance', label: '4대보험 가입' },
            ].map(({ key, label }) => (
              <button key={key}
                className={`method-btn ${partTime.taxType === key ? 'active' : ''}`}
                onClick={() => setPartTimeInput('taxType', key)}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcPartTimeResult}>알바 급여 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero">
            <div className="result-hero-badge">월 실수령액</div>
            <div className="result-hero-value">{formatKRW(r.netMonthly)}<sup>원</sup></div>
            <div className="result-hero-sub">
              주 {r.weeklyHours}시간 근무 · 주휴수당 {r.hasJuHyu ? formatKRW(r.juHyuPay) + '원 포함' : '미발생 (주 15시간 미만)'}
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconCalendar size={20} /></div>
              <div className="result-card-label">주급 (주휴수당 포함)</div>
              <div className="result-card-value c-blue">{formatKRW(r.weeklyPay)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">월급 (세전)</div>
              <div className="result-card-value">{formatKRW(r.grossMonthly)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">세금/보험 공제</div>
              <div className="result-card-value c-red">-{formatKRW(r.taxDeduction)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">연 환산 (세후)</div>
              <div className="result-card-value">{formatKRWShort(r.annualPay)}</div>
            </div>
          </div>

          {!r.isAboveMinWage && (
            <div className="tip-box" style={{ background: '#FEF2F2', borderColor: '#FECACA' }}>
              <div className="tip-title" style={{ color: '#DC2626' }}>⚠️ 최저임금 위반 주의</div>
              <p>입력한 시급({formatKRW(partTime.hourlyWage)}원)이 2024년 최저임금({formatKRW(r.minWage)}원)보다 낮습니다. 최저임금 위반은 3년 이하 징역 또는 2천만원 이하 벌금입니다.</p>
            </div>
          )}

          <ShareButton targetRef={resultRef} filename="알바급여계산결과" />

                    <InfoGuide title="⏰ 알바생도 챙기는 주휴수당과 세금 공제 (3.3% vs 4대보험) 가이드">
            <h4>1. 알바도 묻지도 따지지도 않고 주휴수당 챙기기</h4>
            <p><strong>1주일에 15시간 이상(휴게시간 제외) 개근</strong>한 알바생은 근로기준법 제55조에 따라 무조건 '유급휴일(주휴수당)'을 받을 권리가 있습니다. 상시 근로자가 1명인 편의점이라도, 근로계약서에 주휴수당 없음이라고 서명했더라도 무효입니다. 내가 일한 시급에 20%의 주급이 보너스로 붙는다고 생각하고 당당히 요구해야 합니다.</p>
            <h4>2. 알바비 세금 공제: 3.3% vs 4대보험, 뭐가 다를까?</h4>
            <p>알바 월급을 받을 때 급여 명세서를 보면 두 가지 경우가 있습니다. 첫째, <strong>3.3% 공제</strong>는 나를 근로자가 아닌 '개인사업자(프리랜서)'로 보고 원천징수하는 사업소득세입니다. 둘째, <strong>4대보험(약 9.3%) 공제</strong>는 주 15시간 이상 근무 시 의무 가입되는 근로자 소득입니다. 3.3%는 당장 떼이는 돈이 적지만 산재 보상, 실업급여 등을 받기 어렵다는 치명적인 단점이 있으니 자신의 계약 형태를 정확히 인지해야 합니다.</p>
            <h4>3. 5월 종합소득세 환급, 알바생 최대의 꿀팁</h4>
            <p>만약 알바비를 3.3% (사업소득세) 세금으로 떼이고 받았다면 <strong>다음 해 5월 종합소득세 신고 기간에 홈택스나 손택스 앱에 접속하여 신고</strong>하세요. 보통 대학생이나 단기 알바생은 소득이 일정 구간 이하라면 그동안 회사에 떼였던 3.3% 세금을 <strong>전액 100% 본인 계좌로 환급</strong>받을 수 있습니다. 국감이 주는 진짜 보너스이니 절대 잊지 마세요!</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
