import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconPercent, IconDollarSign, IconBarChart, IconUsers } from '../Icons';

const REVENUE_PRESETS = [
  { label: '2천만', value: 20_000_000 },
  { label: '3천만', value: 30_000_000 },
  { label: '5천만', value: 50_000_000 },
  { label: '1억', value: 100_000_000 },
];

// 업종별 단순경비율 (주요 업종)
const EXPENSE_RATE_PRESETS = [
  { label: '서비스 (60%)', value: 60 },
  { label: '작가·강사 (64%)', value: 64 },
  { label: 'IT개발 (64%)', value: 64 },
  { label: '도소매 (87%)', value: 87 },
  { label: '음식점 (71%)', value: 71 },
];

export default function GlobalIncomeCalculator() {
  const { globalIncome, setGlobalIncomeInput, calcGlobalIncomeResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = globalIncome.result;

  return (
    <div>
      <InfoGuide title="💡 종합소득세 계산기 100% 활용 가이드">
                  <h4>1. 내년 5월에 낼 종합소득세, 쉽고 빠르게 계산해 보세요</h4>
                  <p>개인사업자, 프리랜서, N잡러라면 종합소득세 계산기로 내가 내야 할 세금이나 환급받을 금액을 쉽고 빠르게 예상해 보세요. 국세청 종합소득 과세표준 누진세율(6%~45%) 기준에 따라 세금을 사전에 시뮬레이션해볼 수 있도록 직관적으로 구성되어 있습니다.</p>
                  <h4>2. 업종별 경비율 코드를 확인해 보세요</h4>
                  <p>장부를 쓰지 않을 때 국세청이 인정해 주는 '초기 필요경비율(단순경비율)'을 입력해야 정확한 계산이 나옵니다. 사업소득의 본인 업종명과 구체적인 업종코드 및 단순경비율 수치는 <strong>국세청 홈택스의 [업종코드 조회] 메뉴</strong>에서 손쉽게 확인하실 수 있습니다.</p>
                </InfoGuide>


      <div className="glass-card input-section">
        {/* 총수입금액 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              연간 총수입금액
              <Tooltip text="프리랜서·사업자의 1년간 총 매출(수입) 금액입니다. 세전 기준으로 입력하세요." />
            </label>
            <span className="input-hint">{formatKRWShort(globalIncome.revenue)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {REVENUE_PRESETS.map(({ label, value }) => (
              <button key={value}
                className={`preset-btn ${Number(globalIncome.revenue) === value ? 'active' : ''}`}
                onClick={() => setGlobalIncomeInput('revenue', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={globalIncome.revenue}
              onChange={(e) => setGlobalIncomeInput('revenue', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 경비율 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconPercent size={16} /></span>
              필요경비율 (단순경비율)
              <Tooltip text="국세청이 업종별로 인정하는 경비 비율입니다. 실제 장부를 쓰지 않을 때 이 비율로 경비를 인정받습니다. 단순경비율 대상자는 전년도 수입금액이 기준에 미달한 경우입니다." />
            </label>
            <span className="input-hint">{globalIncome.expenseRate}%</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {EXPENSE_RATE_PRESETS.map(({ label, value }, i) => (
              <button key={i}
                className={`preset-btn ${Number(globalIncome.expenseRate) === value ? 'active' : ''}`}
                onClick={() => setGlobalIncomeInput('expenseRate', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={globalIncome.expenseRate}
              onChange={(e) => setGlobalIncomeInput('expenseRate', e.target.value)} />
            <span className="input-suffix">%</span>
          </div>
        </div>

        {/* 기납부 세액 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconDollarSign size={16} /></span>
              기납부 세액 (3.3% 원천징수 합계)
              <Tooltip text="이미 원천징수로 납부한 세금 합계입니다. 3.3% × 연간 총수입금액으로 근사할 수 있습니다." />
            </label>
            <span className="input-hint">{formatKRWShort(globalIncome.prepaidTax)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            <button
              className={`preset-btn ${Number(globalIncome.prepaidTax) === Math.round(Number(globalIncome.revenue) * 0.033) ? 'active' : ''}`}
              onClick={() => setGlobalIncomeInput('prepaidTax', Math.round(Number(globalIncome.revenue) * 0.033))}
            >3.3% 자동 계산</button>
            <button
              className={`preset-btn ${Number(globalIncome.prepaidTax) === 0 ? 'active' : ''}`}
              onClick={() => setGlobalIncomeInput('prepaidTax', 0)}
            >없음</button>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={globalIncome.prepaidTax}
              onChange={(e) => setGlobalIncomeInput('prepaidTax', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 부양가족 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconUsers size={16} /></span>
              부양가족 수 (본인 포함)
              <Tooltip text="1인당 150만원 기본공제가 적용됩니다. 배우자·자녀·부모님 등 소득요건을 충족한 부양가족을 포함하세요." />
            </label>
            <span className="input-hint">{globalIncome.dependents}명</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[1, 2, 3, 4].map((v) => (
              <button key={v}
                className={`preset-btn ${Number(globalIncome.dependents) === v ? 'active' : ''}`}
                onClick={() => setGlobalIncomeInput('dependents', v)}
              >{v}명</button>
            ))}
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcGlobalIncomeResult}>종합소득세 예상 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero" style={{
            background: r.netPayOrRefund >= 0
              ? 'linear-gradient(145deg, #064E3B 0%, #065F46 55%, #047857 100%)'
              : 'linear-gradient(145deg, #1E293B 0%, #334155 55%, #475569 100%)'
          }}>
            <div className="result-hero-badge">
              {r.netPayOrRefund >= 0 ? '🎉 예상 환급액' : '💸 5월 종소세 납부 예상액'}
            </div>
            <div className="result-hero-value">
              {Math.abs(r.netPayOrRefund) > 0 ? (r.netPayOrRefund >= 0 ? '' : '') : ''}
              {formatKRW(Math.abs(r.netPayOrRefund))}<sup>원</sup>
            </div>
            <div className="result-hero-sub">
              총 세금 {formatKRW(r.totalTax)}원 · 실효세율 {r.effectiveRate}%
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">소득금액</div>
              <div className="result-card-value">{formatKRW(r.incomeAmt)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">과세표준</div>
              <div className="result-card-value">{formatKRW(r.taxBase)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">종합소득세</div>
              <div className="result-card-value c-red">{formatKRW(r.taxAmount)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">지방소득세</div>
              <div className="result-card-value c-red">{formatKRW(r.localTax)}원</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="종합소득세계산결과" />
        </div>
      )}
    </div>
  );
}
