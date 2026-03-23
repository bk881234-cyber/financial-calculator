import { useRef } from 'react';
import useCalculatorStore from '../../store/calculatorStore';
import { formatKRW, formatKRWShort } from '../../utils/formulas';
import ShareButton from '../ui/ShareButton';
import NumberInput from '../ui/NumberInput';
import Tooltip from '../ui/Tooltip';
import InfoGuide from '../ui/InfoGuide';
import { IconCoin, IconDollarSign, IconBarChart } from '../Icons';

export default function FreelancerCalculator() {
  const { freelancer, setFreelancerInput, calcFreelancerResult } = useCalculatorStore();
  const resultRef = useRef(null);
  const r = freelancer.result;

  return (
    <div>
      <InfoGuide title="💡 프리랜서 3.3% 세금 계산기 100% 활용 가이드">
        <h4>1. 3.3% 뗀 진짜 실수령액, 쉽고 빠르게 계산해 보세요</h4>
        <p>프리랜서 계산기로 단기 알바나 외주 작업비, 크리에이터 수익 등을 받을 때 미리 떼이는 세금을 쉽고 빠르게 계산해 보세요. 국세청 사업소득 원천징수 규정(국세 3% + 지방세 0.3%) 기준에 따라 통장에 꽂히는 실수령액을 사전에 계산해볼 수 있도록 구성되어 있습니다.</p>
        <h4>2. 5월 종합소득세 신고 시 환급을 잊지 마세요</h4>
        <p>이렇게 3.3%가 원천징수된 금액은 나의 '기납부 세액'이 됩니다. 대학생이나 N잡러 등 연간 총 소득이 일정 수준 이하인 경우, 다음 해 5월 종합소득세 정기 신고 기간에 홈택스나 손택스(모바일)에 접속해 신고하면 미리 냈던 세금을 상당 부분 현금으로 돌려받을(환급) 수 있습니다.</p>
      </InfoGuide>

      <div className="glass-card input-section">
        <div className="input-row" style={{ marginBottom: 0 }}>
          <div className="input-label-row">
            <label className="input-label">
              <span className="input-icon"><IconCoin size={16} /></span>
              건당 수입 / 월급
              <Tooltip text="용역 대금, 알바비, 배달 수입 등 회사로부터 지급받기로 한 '세전 총액'을 입력하세요." />
            </label>
            <span className="input-hint">{formatKRWShort(freelancer.amount)}</span>
          </div>
          <div className="preset-group" style={{ marginBottom: 10 }}>
            {[[50, '50만'], [100, '100만'], [200, '200만'], [300, '300만'], [500, '500만']].map(([v, lbl]) => {
              const val = v * 10000;
              return (
                <button key={v}
                  className={`preset-btn ${Number(freelancer.amount) === val ? 'active' : ''}`}
                  onClick={() => setFreelancerInput('amount', val)}
                >{lbl}</button>
              );
            })}
          </div>
          <div className="input-wrap">
            <NumberInput className="input-field" value={freelancer.amount}
              onChange={(e) => setFreelancerInput('amount', e.target.value)} />
            <span className="input-suffix">원</span>
          </div>
        </div>
      </div>

      <button className="calc-btn" onClick={calcFreelancerResult}>3.3% 세금 계산하기</button>

      {r && (
        <div className="result-section" ref={resultRef}>
          <div className="result-hero">
            <div className="result-hero-badge">프리랜서(사업소득) 실수령액</div>
            <div className="result-hero-value">{formatKRW(r.netAmount)}<sup>원</sup></div>
            <div className="result-hero-sub">
              세전 수입 {formatKRWShort(r.amount)} · 세금 -{formatKRW(r.totalTax)}원
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">사업소득세 (3%)</div>
              <div className="result-card-value c-red">-{formatKRW(r.incomeTax)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconDollarSign size={20} /></div>
              <div className="result-card-label">지방소득세 (0.3%)</div>
              <div className="result-card-value c-red">-{formatKRW(r.localTax)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconBarChart size={20} /></div>
              <div className="result-card-label">총 공제 세금 (3.3%)</div>
              <div className="result-card-value c-red">-{formatKRW(r.totalTax)}원</div>
            </div>
            <div className="result-card">
              <div className="result-card-icon"><IconCoin size={20} /></div>
              <div className="result-card-label">실수령액</div>
              <div className="result-card-value c-blue">{formatKRW(r.netAmount)}원</div>
            </div>
          </div>

          <ShareButton targetRef={resultRef} filename="프리랜서세금계산결과" />
        </div>
      )}
    </div>
  );
}
