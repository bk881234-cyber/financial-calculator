import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconPercent, IconCalendar, IconBarChart, IconHome } from '../Icons';

const INCOME_PRESETS = [
  { label: '4천만', value: 40_000_000 },
  { label: '5천만', value: 50_000_000 },
  { label: '6천만', value: 60_000_000 },
  { label: '8천만', value: 80_000_000 },
  { label: '1억', value: 100_000_000 },
];

export default function DsrLimitCalculator() {
  const { dsr, setDsrInput, calcDsrResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = dsr.result;

  const dsrBarWidth = r ? Math.min(r.newDsr, 100) : 0;
  const dsrColor = r
    ? r.newDsr > 50 ? '#DC2626' : r.newDsr > 40 ? '#F59E0B' : '#14B8A6'
    : '#14B8A6';

  return (
    <div>
      <div className="glass-card input-section">
        {/* 연소득 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              연소득 (세전)
              <Tooltip text="근로소득, 사업소득 등 DSR 산정에 반영되는 연간 총 소득입니다." />
            </label>
            <span className="input-hint">{formatKRWShort(dsr.annualIncome)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {INCOME_PRESETS.map(({ label, value }) => (
              <button key={value}
                className={`preset-btn ${Number(dsr.annualIncome) === value ? 'active' : ''}`}
                onClick={() => setDsrInput('annualIncome', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={dsr.annualIncome}
              onChange={(e) => setDsrInput('annualIncome', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 기존 대출 연간 원리금 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconHome size={16} /></span>
              기존 대출 연간 원리금
              <Tooltip text="이미 보유 중인 모든 대출(주담대, 신용대출, 학자금 등)의 연간 원금+이자 상환액 합계입니다." />
            </label>
            <span className="input-hint">{formatKRWShort(dsr.existingAnnualRepay)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[0, 600, 1200, 2400].map((v) => (
              <button key={v}
                className={`preset-btn ${Number(dsr.existingAnnualRepay) === v * 10000 ? 'active' : ''}`}
                onClick={() => setDsrInput('existingAnnualRepay', v * 10000)}
              >{v === 0 ? '없음' : `${v}만`}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={dsr.existingAnnualRepay}
              onChange={(e) => setDsrInput('existingAnnualRepay', e.target.value)} />
            <span className="input-suffix">원/년</span>
          </div>
        </div>

        <div className="input-grid-2">
          {/* 신규 대출 금리 */}
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconPercent size={16} /></span>
                신규 대출 금리
                <Tooltip text="신청하려는 대출 상품의 연 이자율입니다." />
              </label>
              <span className="input-hint">{dsr.newLoanRate}%</span>
            </div>
            <div className="preset-group" style={{ marginBottom: 10 }}>
              {[3.5, 4.0, 4.5, 5.0].map((v) => (
                <button key={v}
                  className={`preset-btn ${Number(dsr.newLoanRate) === v ? 'active' : ''}`}
                  onClick={() => setDsrInput('newLoanRate', v)}
                >{v}%</button>
              ))}
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={dsr.newLoanRate}
                onChange={(e) => setDsrInput('newLoanRate', e.target.value)} />
              <span className="input-suffix">%</span>
            </div>
          </div>

          {/* 대출 기간 */}
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconCalendar size={16} /></span>
                대출 기간
              </label>
              <span className="input-hint">{dsr.newLoanMonths / 12}년</span>
            </div>
            <div className="preset-group" style={{ marginBottom: 10 }}>
              {[120, 180, 240, 360].map((v) => (
                <button key={v}
                  className={`preset-btn ${Number(dsr.newLoanMonths) === v ? 'active' : ''}`}
                  onClick={() => setDsrInput('newLoanMonths', v)}
                >{v / 12}년</button>
              ))}
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={dsr.newLoanMonths}
                onChange={(e) => setDsrInput('newLoanMonths', e.target.value)} />
              <span className="input-suffix">개월</span>
            </div>
          </div>
        </div>

        {/* DSR 한도 선택 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconBarChart size={16} /></span>
              DSR 한도
              <Tooltip text="은행권(1금융권)은 40%, 제2금융권은 50% DSR 한도가 적용됩니다." />
            </label>
          </div>
          <div className="method-group">
            {[
              { label: '은행권 (40%)', value: 40 },
              { label: '2금융권 (50%)', value: 50 },
            ].map(({ label, value }) => (
              <button key={value}
                className={`method-btn ${Number(dsr.dsrLimit) === value ? 'active' : ''}`}
                onClick={() => setDsrInput('dsrLimit', value)}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcDsrResult}>대출 한도 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero">
            <div className="result-hero-badge">DSR {dsr.dsrLimit}% 기준 최대 대출 한도</div>
            <div className="result-hero-value">{formatKRWShort(r.maxLoanAmount)}</div>
            <div className="result-hero-sub">
              월 상환 가능액 {formatKRW(r.maxMonthlyNewRepay)}원 · 현재 DSR {r.currentDsr}%
            </div>
          </div>

          {/* DSR 게이지 */}
          <div className="glass-card" style={{ padding: '20px', marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>DSR 비율</span>
              <span style={{ fontSize: 16, fontWeight: 900, color: dsrColor }}>{r.newDsr}%</span>
            </div>
            <div className="gauge-track">
              <div className="gauge-fill" style={{
                width: `${dsrBarWidth}%`,
                background: dsrColor,
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: '#94A3B8' }}>
              <span>0%</span>
              <span style={{ color: '#14B8A6', fontWeight: 700 }}>{dsr.dsrLimit}% 한도</span>
              <span>100%</span>
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">최대 대출 가능액</div>
              <div className="result-card-value c-blue">{formatKRW(r.maxLoanAmount)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCalendar size={20} /></div>
              <div className="result-card-label">월 최대 상환액</div>
              <div className="result-card-value">{formatKRW(r.maxMonthlyNewRepay)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">현재 DSR</div>
              <div className="result-card-value">{r.currentDsr}%</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">대출 후 DSR</div>
              <div className={`result-card-value ${r.newDsr > 40 ? 'c-red' : ''}`}>{r.newDsr}%</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="DSR대출한도계산결과" />

                    <InfoGuide title="📐 대출한도와 DSR(총부채원리금상환비율) 완전 정복">
            <h4>1. DSR (Debt Service Ratio) 이란 무엇인가요?</h4>
            <p>DSR(총부채원리금상환비율)은 차주(돈을 빌리는 사람)가 가진 <strong>'모든 대출금의 1년 치 이자와 원금 상환액'이 '연소득'의 몇 %를 차지하는지</strong> 나타내는 지표입니다. 현재 대한민국의 은행권 DSR 규제 한도는 40%입니다. 즉 내 연소득이 5천만 원이라면, 1년에 갚아야 할 모든 대출(주담대, 마이너스통장, 자동차할부 등) 원금과 이자의 합계가 2천만 원을 절대 넘지 못하도록 법으로 막아둔 것입니다.</p>
            <h4>2. 대출 한도를 최대로 영끌하려면? 기간 늘리기가 답!</h4>
            <p>연봉이 당장 오르지 않는데 주택담보대출 한도를 더 늘리고 싶다면 방법은 하나입니다. <strong>대출 상환 기간(만기)을 최대한 길게 늘리는 것 (예: 20년 → 30년 → 40년)</strong>입니다. 만기가 길어지면 연간 내야 하는 원리금 상환액이 줄어들기 때문에 DSR의 여유 공간(캡파)이 생깁니다. 다만 50년 만기 대출의 경우 정책적 제한(취급 중단 등)이 있을 수 있으니 은행과 개별 확인해야 합니다.</p>
            <h4>3. 마이너스 통장(한도대출), 쓰지 않아도 DSR은 깎아먹는다</h4>
            <p>보통 "마이너스 통장 개설해놓고 쓰진 않았으니 대출 한도 영향 없겠지?"라고 착각합니다. 하지만 금융권에서는 신청해둔 마통 한도 전체를 대출로 간주해 DSR을 선차감해 버립니다. 은행들이 <strong>통상 5년 할부로 나눈 값을 연 원리금 상환액으로 계산</strong>하기 때문에, 당장 돈을 안 쓴다 해도 새로운 주담대나 전세자금 대출 한도에 치명적인 타격을 줍니다. 주택 대출 전 불필요한 마퉁은 꼭 해지하세요.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
