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

          <InfoGuide title="🏦 실업급여, 절대 놓치면 안 되는 핵심 정보">
            <h4>1. 실업급여를 받을 수 없는 경우</h4>
            <p><strong>자진 퇴사(자발적 이직)는 원칙적으로 실업급여를 받을 수 없습니다.</strong> 단, 사업장의 임금 체불, 직장 내 괴롭힘, 2시간 이상 통근 불가, 가족 돌봄 등 정당한 사유가 있는 경우에는 자진 퇴사도 수급이 가능합니다. 퇴사 전 반드시 고용센터에 확인하세요.</p>
            <h4>2. 실업급여 신청 방법과 기간</h4>
            <p>퇴직 후 <strong>12개월 이내</strong>에 신청해야 합니다. 이 기간이 지나면 소정급여일수가 남아 있어도 받을 수 없습니다. ① 이직확인서 수령 → ② 워크넷 구직 등록 → ③ 고용보험 홈페이지 수급자격 신청 → ④ 고용센터 방문 순서로 진행합니다.</p>
            <h4>3. 구직활동 의무와 지급 정지</h4>
            <p>실업급여는 <strong>적극적인 구직 활동</strong>을 전제로 지급됩니다. 2주마다 고용센터에 재취업활동 실적을 신고해야 하며, 정당한 이유 없이 구직 거부 시 지급이 정지될 수 있습니다. 부정수급 시 전액 반환 및 추가 제재가 있으니 주의하세요.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
