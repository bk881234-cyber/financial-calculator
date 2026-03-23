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

          <InfoGuide title="💼 프리랜서 3.3% 세금과 5월 종합소득세">
            <h4>1. 왜 3.3%를 뗄까요?</h4>
            <p>프리랜서, 알바, 크리에이터 등 고용관계 없이 독립적으로 일하고 돈을 받을 때 이를 <strong>'사업소득'</strong>으로 분류합니다. 국가는 소득이 있는 곳에 세금을 매기기 위해 돈을 주는 사람(회사)이 수입의 3%(사업소득세)와 0.3%(지방소득세) 합계 <strong>3.3%를 미리 떼고 지급</strong>하도록 법으로 정해두었습니다. 이를 '원천징수'라고 합니다.</p>
            <h4>2. 5월 종합소득세 신고는 필수!</h4>
            <p>3.3% 떼인 세금은 국가에 일단 "가불"로 낸 세금입니다. <strong>다음 해 5월</strong> 종합소득세 신고를 통해 지난 1년간의 진짜 총 수입과 쓴 돈(경비)을 정산해야 합니다. 만약 내가 내야 할 진짜 세금이 미리 낸 3.3% 세금 합계보다 적다면, <strong>세금을 환급(계좌로 돌려받음)</strong> 받을 수 있습니다. (반대로 수입이 엄청 많은 경우 더 내야 할 수도 있습니다.)</p>
            <h4>3. 종합소득세 환급금 높이는 꿀팁</h4>
            <p>프리랜서는 경비(지출) 입증이 생명입니다. 일과 관련된 교통비, 식대가 헷갈리지 않도록 <strong>사업용 신용카드</strong>를 홈택스에 등록해 두고 모아서 쓰는 것이 좋습니다. 장부를 쓰면 추계신고(나라에서 정한 비율로 경비 임의 인정)보다 훨씬 유리해져 엄청난 환급액을 기대할 수 있습니다.</p>
          </InfoGuide>
        </div>
      )}
    </div>
  );
}
