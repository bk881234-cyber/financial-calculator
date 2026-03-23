import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import LoanCalculator from './components/calculators/LoanCalculator';
import CompoundCalculator from './components/calculators/CompoundCalculator';
import SalaryCalculator from './components/calculators/SalaryCalculator';
import SavingsCalculator from './components/calculators/SavingsCalculator';
import StockCalculator from './components/calculators/StockCalculator';
import FreelancerCalculator from './components/calculators/FreelancerCalculator';

export default function App() {
  return (
    <div className="app-wrapper">
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* 💼 직장인·급여 */}
          <Route
            path="/calc/salary/net-pay"
            element={
              <CalculatorPage 
                title="연봉·월급 실수령액 계산기"
                seoTitle="2024 최신 연봉/월급 실수령액 세금 계산기"
                seoDescription="내 연봉의 진짜 월 실수령액은 얼마일까? 연봉, 비과세액, 부양가족만 입력하면 4대보험과 근로소득세를 제외한 세후 월급을 즉시 정확하게 계산해 드립니다."
                seoKeywords="연봉계산기, 월급계산기, 실수령액, 4대보험계산기, 근로소득세, 세후월급, 실수령액표"
                seoSchema={{
                  "@type": "SoftwareApplication",
                  "name": "연봉·월급 실수령액 계산기",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "All",
                  "description": "연봉을 월 실수령액으로 변환하고 4대보험 및 근로소득세 세금을 계산하는 도구"
                }}
              >
                <SalaryCalculator />
              </CalculatorPage>
            }
          />

          {/* 🏠 부동산·대출 */}
          <Route
            path="/calc/real-estate/loan-interest"
            element={
              <CalculatorPage 
                title="대출 이자 계산기"
                seoTitle="대출 이자 계산기 | 원리금, 원금균등 월 상환액 비교"
                seoDescription="주택담보대출, 전세자금대출, 신용대출 이자 계산기. 원리금균등, 원금균등상환, 만기일시 방식에 따른 정확한 매월 갚을 금액과 총 이자를 확인하세요."
                seoKeywords="대출계산기, 대출이자계산기, 원리금균등, 원금균등, 대출이자율, 주담대, 전세대출계산"
                seoSchema={{
                  "@type": "SoftwareApplication",
                  "name": "대출 이자 계산기",
                  "applicationCategory": "FinanceApplication",
                  "operatingSystem": "All",
                  "description": "대출 상환 금액에 대한 월 납입액 및 총 발생 이자 계산"
                }}
              >
                <LoanCalculator />
              </CalculatorPage>
            }
          />

          {/* 🏢 세금·사업 */}
          <Route
            path="/calc/tax/freelancer-33"
            element={
              <CalculatorPage 
                title="프리랜서 3.3% 세금 계산기"
                seoTitle="프리랜서 알바 3.3% 세금 원천징수 실수령액 계산기"
                seoDescription="알바, 프리랜서, 크리에이터 등 3.3% 사업소득세 원천징수 전/후의 정확한 실수령액을 즉시 계산하고 5월 종합소득세 환급 꿀팁을 확인하세요."
                seoKeywords="3.3%세금계산기, 프리랜서세금, 알바세금, 알바실수령액, 종합소득세, 삼점삼, 원천징수계산기"
                seoSchema={{
                  "@type": "SoftwareApplication",
                  "name": "프리랜서 3.3% 세금 계산기",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "All",
                  "description": "사업소득 지급 시 발생하는 3.3% 원천징수 세액 및 실수령액 자동 계산기"
                }}
              >
                <FreelancerCalculator />
              </CalculatorPage>
            }
          />

          {/* 📈 자산증식·투자 */}
          <Route
            path="/calc/invest/compound"
            element={
              <CalculatorPage 
                title="복리 수익 계산기"
                seoTitle="복리 계산기 | 거치식, 적립식 이자 및 예적금 투자수익률(72법칙) 시뮬레이터"
                seoDescription="초기 종잣돈과 매월 납입하는 적립금, 연 평균 수익률을 입력하여 기간에 따른 폭발적인 복리의 마법을 차트 점진 시각화로 계산해보세요."
                seoKeywords="복리계산기, 이자계산기, 투자수익률, 72법칙, s&p500 수익률, 예적금, 종잣돈"
                seoSchema={{
                  "@type": "SoftwareApplication",
                  "name": "복리 수익 계산기",
                  "applicationCategory": "FinanceApplication",
                  "operatingSystem": "All",
                  "description": "적립식 예적금 및 주식 투자에 대한 장기 복리 수익률 그래프 시뮬레이터"
                }}
              >
                <CompoundCalculator />
              </CalculatorPage>
            }
          />
          <Route
            path="/calc/invest/savings"
            element={
              <CalculatorPage 
                title="예적금 만기 이자 계산기"
                seoTitle="단리, 월복리 예적금 만기 이자 (세금우대) 실효수익률 계산기"
                seoDescription="목돈 굴리는 정기예금, 매월 붓는 정기적금 만기 시 세후 수령액 비고 시뮬레이터입니다. 일반 과세(15.4%) 및 상호금융 세금우대(1.4%) 혜택을 바로 확인해보세요."
                seoKeywords="예금적금계산기, 이자계산기, 만기수령액, 세금우대, 비과세저축, 이자소득세, 예적금이자"
                seoSchema={{
                  "@type": "SoftwareApplication",
                  "name": "예·적금 만기 이자 계산기",
                  "applicationCategory": "FinanceApplication",
                  "operatingSystem": "All",
                  "description": "정기예금 및 적금 이율별 만기 실수령액 및 세금 차감 계산"
                }}
              >
                <SavingsCalculator />
              </CalculatorPage>
            }
          />
          <Route
            path="/calc/invest/stock-average"
            element={
              <CalculatorPage 
                title="주식 평균단가 계산기"
                seoTitle="주식 물타기 계산기 | 평균단가 평단 자동 계산"
                seoDescription="추가 매수(물타기) 시 정확한 주식 평균 매입 단가를 계산해주는 툴바. 분할 매수에 따른 총 보유수량, 투자금 증감, 평단 하락 시각화 시뮬레이션을 제공합니다."
                seoKeywords="물타기계산기, 주식평단가, 평균단가계산기, 코인평단, 평단가구하기, 주식계산기"
                seoSchema={{
                  "@type": "SoftwareApplication",
                  "name": "주식 평균단가 (물타기) 계산기",
                  "applicationCategory": "FinanceApplication",
                  "operatingSystem": "All",
                  "description": "추가 주식 매수(물타기) 시나리오에 따른 평균 단가 하락율 및 투자비중을 분석합니다."
                }}
              >
                <StockCalculator />
              </CalculatorPage>
            }
          />

          {/* 404 → 홈으로 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}
