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

          <InfoGuide title="⏰ 주휴수당과 알바 급여 핵심 상식">
            <h4>1. 주휴수당이란?</h4>
            <p>주 15시간 이상 근무하고 계약한 날 모두 개근하면 <strong>유급 주휴일 1일치 임금</strong>을 받을 수 있습니다. 즉, 주 40시간 기준 8시간분의 시급을 추가로 받는 것입니다. 고용주가 주지 않으면 신고 가능합니다.</p>
            <h4>2. 근로계약서는 반드시 작성!</h4>
            <p>근로계약서 미작성 시 <strong>고용주는 500만원 이하 벌금</strong>을 받습니다. 구두 계약보다는 서면 계약이 나중에 분쟁 시 유리합니다. 알바몬, 알바천국 등에서도 전자 계약서를 제공합니다.</p>
            <h4>3. 4대보험 vs 3.3% 선택</h4>
            <p>3개월 이상 꾸준히 일한다면 <strong>4대보험 가입</strong>이 유리합니다. 나중에 실업급여도 받을 수 있고, 국민연금·건강보험도 쌓입니다. 단기 일용직이나 투잡이라면 3.3% 원천징수가 간편합니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
