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

                    <InfoGuide title="💡 주휴수당·알바 급여 계산기 100% 활용 가이드">
            <h4>1. 내 알바 월급과 주휴수당, 쉽고 빠르게 계산해 보세요</h4>
            <p>주휴수당 계산기로 아르바이트 예상 주급과 월급을 쉽고 빠르게 계산해 보세요. 근로기준법상 조건(1주 15시간 이상 근무 시)에 따라 지급되는 주휴수당을 포함한 최종 급여를 사전에 계산해볼 수 있도록 구성되어 있습니다.</p>
            <h4>2. 세금 떼는 방식 선택하기 (3.3% vs 4대보험)</h4>
            <p>사장님과 계약한 형태에 따라 세금 옵션을 선택해 보세요. 프리랜서 형태로 계약했다면 '3.3% 공제'를, 근로계약서상 4대보험 가입 조건이라면 '4대보험(9.3%) 공제'를 클릭하면 세금이 자동차감된 진짜 실수령 알바비를 확인할 수 있습니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
