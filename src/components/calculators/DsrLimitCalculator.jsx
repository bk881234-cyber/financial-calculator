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

          <InfoGuide title="📐 DSR·LTV 핵심 개념 완전 정복">
            <h4>1. DSR(총부채원리금상환비율)이란?</h4>
            <p>모든 대출의 연간 원금+이자 합계를 연소득으로 나눈 비율입니다. <strong>은행권 40%</strong>가 상한이므로, 연소득 6천만원이라면 연간 총 원리금 상환액이 2,400만원(월 200만원)을 넘을 수 없습니다.</p>
            <h4>2. LTV(주택담보대출비율)란?</h4>
            <p>주택 가격 대비 대출 가능 금액의 비율입니다. 조정대상지역 LTV는 6억 이하 70%, 6억~9억 60%, 9억 초과 50% 등이 적용됩니다(시기별 정책 변동 있음). DSR과 LTV 중 더 낮은 금액이 실제 대출 한도입니다.</p>
            <h4>3. DSR 제외 대출도 있다</h4>
            <p>전세자금대출(보증보험 가입 시), 학자금대출, 소액 신용대출(1,000만원 이하) 등은 DSR 산정에서 제외되거나 일부만 반영됩니다. 대출 전 은행에 정확히 확인하세요.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
