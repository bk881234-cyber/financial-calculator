import useCalculatorStore from './store/calculatorStore';
import Navigation from './components/Navigation';
import LoanCalculator from './components/calculators/LoanCalculator';
import CompoundCalculator from './components/calculators/CompoundCalculator';
import SalaryCalculator from './components/calculators/SalaryCalculator';
import SavingsCalculator from './components/calculators/SavingsCalculator';
import StockCalculator from './components/calculators/StockCalculator';

const TABS = {
  loan:     <LoanCalculator />,
  compound: <CompoundCalculator />,
  salary:   <SalaryCalculator />,
  savings:  <SavingsCalculator />,
  stock:    <StockCalculator />,
};

export default function App() {
  const activeTab = useCalculatorStore((s) => s.activeTab);

  return (
    <div className="app-wrapper">
      <div className="app-container">

        <header className="app-header">
          <div className="header-top">
            <img
              src="/vl_icon.png"
              alt="생활 금융 계산기 로고"
              className="header-logo-img"
            />
            <div style={{ flex: 1 }}>
              <h1 className="header-title">생활 금융 계산기</h1>
              <p className="header-meta">
                대출 이자·복리 수익·연봉 실수령·예적금 만기·주식 평균단가까지,
                일상의 금융 궁금증을 외부 연결 없이 즉시 계산하고 결과를 이미지로 저장·공유하세요.
              </p>
            </div>
          </div>
          <Navigation />
        </header>

        <main className="main-content">
          {TABS[activeTab]}
        </main>

        <footer className="app-footer">
          계산 결과는 참고용이며 실제 금융상품과 차이가 있을 수 있습니다.
        </footer>

      </div>
    </div>
  );
}
