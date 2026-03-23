import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconUsers, IconCalendar, IconBarChart, IconDollarSign } from '../Icons';

const AGE_PRESETS = [25, 30, 35, 40, 45, 50, 55];
const MONTH_PRESETS = [
  { label: '6개월', value: 6 },
  { label: '1년', value: 12 },
  { label: '2년', value: 24 },
  { label: '3년', value: 36 },
  { label: '5년', value: 60 },
  { label: '10년', value: 120 },
];

export default function UnemploymentCalculator() {
  const { unemployment, setUnemploymentInput, calcUnemploymentResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = unemployment.result;

  return (
    <div>
      <div className="glass-card input-section">
        {/* 만 나이 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconUsers size={16} /></span>
              만 나이
              <Tooltip text="만 50세를 기준으로 소정급여일수가 달라집니다. 생일이 지난 경우 +1 해주세요." />
            </label>
            <span className="input-hint">{unemployment.age}세</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {AGE_PRESETS.map((v) => (
              <button key={v}
                className={`preset-btn ${Number(unemployment.age) === v ? 'active' : ''}`}
                onClick={() => setUnemploymentInput('age', v)}
              >{v}세</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={unemployment.age}
              onChange={(e) => setUnemploymentInput('age', e.target.value)} />
            <span className="input-suffix">세</span>
          </div>
        </div>

        {/* 고용보험 가입 기간 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCalendar size={16} /></span>
              고용보험 가입 기간
              <Tooltip text="현 직장 + 이전 직장 고용보험 가입 기간의 합산이 가능합니다. 단, 이전 직장에서 실업급여를 받은 경우 그 이전 기간은 제외됩니다." />
            </label>
            <span className="input-hint">{unemployment.insuredMonths}개월</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {MONTH_PRESETS.map(({ label, value }) => (
              <button key={value}
                className={`preset-btn ${Number(unemployment.insuredMonths) === value ? 'active' : ''}`}
                onClick={() => setUnemploymentInput('insuredMonths', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={unemployment.insuredMonths}
              onChange={(e) => setUnemploymentInput('insuredMonths', e.target.value)} />
            <span className="input-suffix">개월</span>
          </div>
        </div>

        {/* 퇴직 전 월 평균임금 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              퇴직 전 월 평균임금
              <Tooltip text="퇴직 전 3개월간 받은 총 임금을 3으로 나눈 금액입니다. 세전 기준으로 입력하세요." />
            </label>
            <span className="input-hint">{formatKRWShort(unemployment.monthlyPay)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={unemployment.monthlyPay}
              onChange={(e) => setUnemploymentInput('monthlyPay', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcUnemploymentResult}>실업급여 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero">
            <div className="result-hero-badge">실업급여 총 수급 예상액</div>
            <div className="result-hero-value">{formatKRW(r.totalBenefit)}<sup>원</sup></div>
            <div className="result-hero-sub">
              1일 {formatKRW(r.dailyBenefit)}원 × {r.benefitDays}일
              {r.isUpperCapped && ' (1일 상한액 적용)'}
              {r.isLowerCapped && ' (하한액 적용)'}
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">1일 구직급여</div>
              <div className="result-card-value c-blue">{formatKRW(r.dailyBenefit)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCalendar size={20} /></div>
              <div className="result-card-label">소정급여일수</div>
              <div className="result-card-value">{r.benefitDays}일</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">1일 상한액</div>
              <div className="result-card-value">{formatKRW(r.upperLimit)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">1일 하한액</div>
              <div className="result-card-value">{formatKRW(r.lowerLimit)}원</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="실업급여계산결과" />

                    <InfoGuide title="🏦 2024 실업급여(구직급여) 수급 조건과 신청 방법">
            <h4>1. 실업급여 수급 자격 요건 파악하기</h4>
            <p>실업급여(정확한 명칭은 '구직급여')를 받기 위해서는 두 가지 조건을 반드시 충족해야 합니다. 첫째, <strong>이직일(퇴사일) 이전 18개월 동안 고용보험 가입 기간(피보험 단위 기간)이 합산 180일 이상</strong>이어야 합니다. 둘째, 자발적 퇴사가 아닌 <strong>'비자발적인 사유(계약만료, 권고사직, 회사 사정 등)'</strong>로 이직해야 합니다.</p>
            <h4>2. 상한액과 하한액의 비밀</h4>
            <p>실업급여는 "퇴직 전 3개월 1일 평균임금의 60%"로 계산하지만, 무한정 지급되지 않고 국가가 정한 상한액과 하한액의 통제를 받습니다. 2024년 기준 1일 상한액은 <strong>66,000원</strong>으로 고정되어 있으며, 하한액은 <strong>소정근로시간(일 8시간 기준 최저임금의 80%, 즉 63,104원)</strong>입니다. 즉, 월급이 아주 많아도 하루 66,000원을 넘지 않고, 아주 적어도 63,104원은 보장받는 구조입니다.</p>
            <h4>3. 자진퇴사 시에도 실업급여를 받을 수 있는 예외 조항</h4>
            <p>원칙적으로 자진퇴사는 수급 자격이 없지만, 예외적인 정당한 사유가 인정되면 수급이 가능합니다. 예를 들어 <strong>임금 체불 2개월 이상, 직장 내 괴롭힘 또는 성희롱, 통근 시간이 왕복 3시간 이상으로 길어진 사업장 이전, 부모님 병간호로 인한 30일 이상 휴직 거부</strong> 등 관할 고용센터가 객관적으로 인정할 수 있는 사유라면 당당히 구직급여를 신청할 수 있습니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
