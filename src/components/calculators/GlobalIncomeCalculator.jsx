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

                    <InfoGuide title="📝 종합소득세 예상 시뮬레이션: N잡러, 프리랜서를 위한 절세 매뉴얼">
            <h4>1. 단순경비율 vs 장부 기장 (간편장부) — 무엇을 선택해야 무조건 돈을 아낄까?</h4>
            <p>홈택스 신고안내문에 적힌 <strong>'단순경비율'</strong>은 국세청이 업종별로 정해둔 "이 정도 퍼센트만큼은 네가 사업하려고 돈을 쓴 걸로 쳐주겠다"라는 최저선입니다. 하지만 당신의 실제 통신비, 주유비, 노트북 구매비, 식대, 커피 등의 <strong>진짜 지출(경비)</strong>을 모두 끌어모은 액수가 단순경비율 금액보다 현저히 크다면, 귀찮더라도 <strong>100% 장부 기장을 선택(간편장부)</strong>하여 실제 나간 돈으로 소득을 팍 깎는 편이 수십~수백만 원대 환급 차이를 만듭니다.</p>
            <h4>2. 숨만 쉬어도 인정받는 사업용 신용카드 등록의 위력</h4>
            <p>개인사업자 및 N잡러 프리랜서의 세무 신고 기초체력은 <strong>홈택스 사업용 신용카드 등록</strong>입니다. 쓰기 시작하기 전에 등록만 해두어도 1년 동안 자신이 결제한 수천 건 중 식대, 문구류, 비품 등이 전부 홈택스 컴퓨터 서버에 사업용 지출로 집계되며, 담당 세무사나 기장 대행 시 클릭 몇 번으로 매입 경비(비용)와 부가가치세 매입세액공제로 일괄 승인받을 수 있어 엄청난 증빙 시간 단축과 절세를 완성시켜줍니다.</p>
            <h4>3. 소득공제의 절대 강자: 노란우산공제 (소기업·소상공인 공제)</h4>
            <p>회사원은 연말정산을 하지만 프리랜서나 일반 사업자는 종소세 때 공제받을 무기가 거의 없습니다. 이때 유일무이한 합법적 슈퍼무기가 바로 <strong>노란우산공제</strong>입니다. 사업/사업소득자가 월 최대 100만 원 이내로 가입하면 <strong>1년에 최대 500만 원까지, 과세표준 구간 최상단 금액에서 직격으로 소득공제(소득을 없는 셈 침)</strong>를 해줍니다. 세율 15% 구간이더라도 매년 단숨에 75만 원의 세금을 즉각 절약하는 정부 보증 최고수익률 적금과도 같습니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
