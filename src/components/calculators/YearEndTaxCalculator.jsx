import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconBarChart, IconDollarSign, IconBriefcase, IconSavings } from '../Icons';

const SALARY_PRESETS = [
  { label: '3천만', value: 30_000_000 },
  { label: '4천만', value: 40_000_000 },
  { label: '5천만', value: 50_000_000 },
  { label: '7천만', value: 70_000_000 },
  { label: '1억', value: 100_000_000 },
];

export default function YearEndTaxCalculator() {
  const { yearEndTax, setYearEndTaxInput, calcYearEndTaxResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = yearEndTax.result;

  return (
    <div>
      <div className="glass-card input-section">
        {/* 총급여액 */}
        <div className="input-row">
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconBriefcase size={16} /></span>
              총급여액 (연봉)
              <Tooltip text="세전 연봉 총액입니다. 비과세 항목(식대 월 20만원 등)을 제외한 과세 대상 급여 기준입니다." />
            </label>
            <span className="input-hint">{formatKRWShort(yearEndTax.grossPay)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {SALARY_PRESETS.map(({ label, value }) => (
              <button key={value}
                className={`preset-btn ${Number(yearEndTax.grossPay) === value ? 'active' : ''}`}
                onClick={() => setYearEndTaxInput('grossPay', value)}
              >{label}</button>
            ))}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={yearEndTax.grossPay}
              onChange={(e) => setYearEndTaxInput('grossPay', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>

        {/* 카드 사용액 */}
        <div className="input-grid-2">
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconCoin size={16} /></span>
                신용카드 사용액
                <Tooltip text="연간 신용카드 사용 총액입니다. 공제율 15% 적용." />
              </label>
              <span className="input-hint">{formatKRWShort(yearEndTax.creditCard)}</span>
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={yearEndTax.creditCard}
                onChange={(e) => setYearEndTaxInput('creditCard', e.target.value)} />
              <span className="input-suffix">원</span>
            </div>
          </div>
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconCoin size={16} /></span>
                체크카드·현금영수증
                <Tooltip text="체크카드와 현금영수증 사용액의 합계입니다. 신용카드보다 공제율(30%)이 2배 높습니다." />
              </label>
              <span className="input-hint">{formatKRWShort(yearEndTax.debitCard)}</span>
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={yearEndTax.debitCard}
                onChange={(e) => setYearEndTaxInput('debitCard', e.target.value)} />
              <span className="input-suffix">원</span>
            </div>
          </div>
        </div>

        {/* 연금저축 / IRP */}
        <div className="input-grid-2">
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconDollarSign size={16} /></span>
                연금저축 납입액
                <Tooltip text="연금저축펀드/보험 연간 납입액입니다. 최대 600만원까지 세액공제 대상입니다." />
              </label>
              <span className="input-hint">{formatKRWShort(yearEndTax.pension)}</span>
            </div>
            <div className="preset-group" style={{ marginBottom: 10 }}>
              {[0, 200, 400, 600].map((v) => (
                <button key={v}
                  className={`preset-btn ${Number(yearEndTax.pension) === v * 10000 ? 'active' : ''}`}
                  onClick={() => setYearEndTaxInput('pension', v * 10000)}
                >{v === 0 ? '없음' : `${v}만`}</button>
              ))}
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={yearEndTax.pension}
                onChange={(e) => setYearEndTaxInput('pension', e.target.value)} />
              <span className="input-suffix">원</span>
            </div>
          </div>
          <div className="input-row">
            <div className="input-label-row">
              <label className="input-label">
                <span className="input-icon"><IconDollarSign size={16} /></span>
                IRP 추가 납입액
                <Tooltip text="연금저축 포함 IRP까지 합산 연 900만원 한도로 세액공제 적용됩니다." />
              </label>
              <span className="input-hint">{formatKRWShort(yearEndTax.irp)}</span>
            </div>
            <div className="input-wrap">
              <NumberInput className="input-field" value={yearEndTax.irp}
                onChange={(e) => setYearEndTaxInput('irp', e.target.value)} />
              <span className="input-suffix">원</span>
            </div>
          </div>
        </div>

        {/* 의료비 */}
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconBarChart size={16} /></span>
              의료비 지출액 (연간)
              <Tooltip text="연간 의료비 지출 총액입니다. 급여의 3%를 초과한 금액에 대해 15%가 세액공제됩니다." />
            </label>
            <span className="input-hint">{formatKRWShort(yearEndTax.medicalExpense)}</span>
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={yearEndTax.medicalExpense}
              onChange={(e) => setYearEndTaxInput('medicalExpense', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcYearEndTaxResult}>연말정산 예상 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero" style={{
            background: r.refundOrPay >= 0
              ? 'linear-gradient(145deg, #064E3B 0%, #065F46 55%, #047857 100%)'
              : 'linear-gradient(145deg, #7F1D1D 0%, #991B1B 55%, #B91C1C 100%)'
          }}>
            <div className="result-hero-badge">
              {r.refundOrPay >= 0 ? '🎉 예상 환급액' : '💸 예상 추가 납부'}
            </div>
            <div className="result-hero-value">
              {r.refundOrPay >= 0 ? '' : '-'}{formatKRW(Math.abs(r.refundOrPay))}<sup>원</sup>
            </div>
            <div className="result-hero-sub">
              결정세액 {formatKRW(r.finalTax)}원 · 세액공제 총 {formatKRW(r.workTaxCredit + r.pensionCredit + r.medCredit)}원
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">신용카드 소득공제</div>
              <div className="result-card-value c-blue">-{formatKRW(r.cardDeduction)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">연금·IRP 세액공제</div>
              <div className="result-card-value c-blue">-{formatKRW(r.pensionCredit)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">과세표준</div>
              <div className="result-card-value">{formatKRW(r.taxBase)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">연금 공제율</div>
              <div className="result-card-value">{(r.pensionCreditRate * 100).toFixed(1)}%</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="연말정산계산결과" />

          <InfoGuide title="📊 13월의 월급 만드는 연말정산 전략">
            <h4>1. 신용카드보다 체크카드를 먼저!</h4>
            <p>카드 소득공제는 <strong>급여의 25% 초과분</strong>부터 시작됩니다. 연봉의 25%를 채우는 것은 신용카드로, 그 이후는 공제율이 2배 높은 <strong>체크카드(30%)</strong>로 결제하는 것이 황금 전략입니다.</p>
            <h4>2. 연금저축·IRP는 최강의 절세 수단</h4>
            <p>연금저축(최대 600만원) + IRP(추가 300만원) = 최대 <strong>900만원 × 13.2~16.5% = 최대 148만원 세액공제</strong>가 가능합니다. 총급여 5,500만원 이하면 16.5%의 높은 공제율을 적용받습니다. 이보다 확실한 투자 수익률은 없습니다.</p>
            <h4>3. 의료비 공제는 급여의 3%가 관건</h4>
            <p>의료비는 연간 <strong>총급여의 3% 초과분</strong>에 대해 15% 세액공제입니다. 가족 의료비를 한 사람 카드로 몰아서 결제하면 공제 혜택을 극대화할 수 있습니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
