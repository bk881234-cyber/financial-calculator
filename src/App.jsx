import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';

// 💼 직장인·급여
import SalaryCalculator from './components/calculators/SalaryCalculator';
import SeveranceCalculator from './components/calculators/SeveranceCalculator';
import UnemploymentCalculator from './components/calculators/UnemploymentCalculator';
import PartTimeCalculator from './components/calculators/PartTimeCalculator';
import YearEndTaxCalculator from './components/calculators/YearEndTaxCalculator';

// 🏠 부동산·대출
import LoanCalculator from './components/calculators/LoanCalculator';
import DsrLimitCalculator from './components/calculators/DsrLimitCalculator';
import RentConversionCalculator from './components/calculators/RentConversionCalculator';
import BrokerageFeeCalculator from './components/calculators/BrokerageFeeCalculator';
import PropertyTaxCalculator from './components/calculators/PropertyTaxCalculator';

// 🏢 세금·사업
import FreelancerCalculator from './components/calculators/FreelancerCalculator';
import GlobalIncomeCalculator from './components/calculators/GlobalIncomeCalculator';
import VatCalculator from './components/calculators/VatCalculator';

// 📈 자산증식·투자
import StockCalculator from './components/calculators/StockCalculator';
import SavingsCalculator from './components/calculators/SavingsCalculator';
import CompoundCalculator from './components/calculators/CompoundCalculator';
import DividendTaxCalculator from './components/calculators/DividendTaxCalculator';
import CapitalGainsCalculator from './components/calculators/CapitalGainsCalculator';

export default function App() {
  return (
    <div className="app-wrapper">
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* ── 💼 직장인·급여 ── */}
          <Route path="/calc/salary/net-pay" element={
            <CalculatorPage title="연봉·월급 실수령액 계산기"
              seoTitle="2024 최신 연봉/월급 실수령액 세금 계산기"
              seoDescription="내 연봉의 진짜 월 실수령액은 얼마일까? 연봉, 비과세액, 부양가족만 입력하면 4대보험과 근로소득세를 제외한 세후 월급을 즉시 정확하게 계산해 드립니다."
              seoKeywords="연봉계산기, 월급계산기, 실수령액, 4대보험계산기, 근로소득세, 세후월급, 실수령액표">
              <SalaryCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/salary/severance" element={
            <CalculatorPage title="퇴직금 계산기"
              seoTitle="퇴직금 계산기 | 퇴직소득세까지 포함한 실수령액 자동 계산"
              seoDescription="입사일, 퇴사일, 최근 3개월 급여를 입력하면 법정 퇴직금과 퇴직소득세를 공제한 실수령액을 즉시 계산합니다. IRP 절세 팁도 확인하세요."
              seoKeywords="퇴직금계산기, 퇴직금계산, 퇴직소득세, IRP절세, 퇴직금실수령액, 평균임금계산">
              <SeveranceCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/salary/unemployment" element={
            <CalculatorPage title="실업급여 수급액 계산기"
              seoTitle="2024 실업급여(구직급여) 수급액 및 수급일수 계산기"
              seoDescription="나이, 고용보험 가입기간, 퇴직 전 월급을 입력하면 1일 구직급여액과 최대 수급일수, 총 수급 예상액을 즉시 계산합니다."
              seoKeywords="실업급여계산기, 구직급여, 실업급여수급액, 실업급여기간, 고용보험, 실업급여조건">
              <UnemploymentCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/salary/part-time" element={
            <CalculatorPage title="주휴수당·알바 급여 계산기"
              seoTitle="주휴수당 계산기 | 알바 시급으로 주급·월급 자동 계산"
              seoDescription="시급, 근무일수, 근무시간을 입력하면 주휴수당을 포함한 주급과 월급을 즉시 계산합니다. 3.3%, 4대보험 세금 공제도 선택 가능합니다."
              seoKeywords="주휴수당계산기, 알바계산기, 시급계산기, 알바월급계산, 최저임금2024, 주급계산">
              <PartTimeCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/salary/year-end-tax" element={
            <CalculatorPage title="연말정산 시뮬레이터"
              seoTitle="연말정산 환급액 계산기 | 신용카드·연금·의료비 공제 시뮬레이터"
              seoDescription="총급여, 신용·체크카드 사용액, 연금저축·IRP 납입액, 의료비를 입력하면 예상 환급액 또는 추가 납부액을 미리 계산합니다."
              seoKeywords="연말정산계산기, 환급액계산기, 신용카드공제, 연금저축세액공제, IRP공제, 의료비공제">
              <YearEndTaxCalculator />
            </CalculatorPage>
          } />

          {/* ── 🏠 부동산·대출 ── */}
          <Route path="/calc/real-estate/loan-interest" element={
            <CalculatorPage title="대출 이자 계산기"
              seoTitle="대출 이자 계산기 | 원리금, 원금균등 월 상환액 비교"
              seoDescription="주택담보대출, 전세자금대출, 신용대출 이자 계산기. 원리금균등, 원금균등상환, 만기일시 방식에 따른 정확한 매월 갚을 금액과 총 이자를 확인하세요."
              seoKeywords="대출계산기, 대출이자계산기, 원리금균등, 원금균등, 대출이자율, 주담대, 전세대출계산">
              <LoanCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/real-estate/dsr-limit" element={
            <CalculatorPage title="LTV / DSR 대출 한도 계산기"
              seoTitle="DSR 계산기 | 내 연봉으로 받을 수 있는 최대 대출 한도"
              seoDescription="연소득과 기존 대출 원리금을 입력하면 은행권 DSR 40% 기준으로 받을 수 있는 최대 대출 가능액을 즉시 계산합니다."
              seoKeywords="DSR계산기, LTV계산기, 대출한도계산기, 주택담보대출한도, DSR40%, 내집마련대출">
              <DsrLimitCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/real-estate/rent-conversion" element={
            <CalculatorPage title="전월세 전환 계산기"
              seoTitle="전월세 전환율 계산기 | 보증금↔월세 변환 자동 계산"
              seoDescription="보증금을 낮추면 월세가 얼마나 오를까? 전월세 전환율을 입력하면 변경 후 월세 또는 보증금을 즉시 계산합니다."
              seoKeywords="전월세전환계산기, 전세월세전환, 전환율계산기, 반전세계산, 보증금월세전환, 법정전환율">
              <RentConversionCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/real-estate/brokerage-fee" element={
            <CalculatorPage title="부동산 중개수수료 계산기"
              seoTitle="부동산 중개수수료(복비) 계산기 | 2021 개정 법정 요율 자동 적용"
              seoDescription="매매·전세·월세 거래금액과 유형을 선택하면 2021년 개정 기준 법정 최대 중개보수와 VAT를 즉시 계산합니다."
              seoKeywords="중개수수료계산기, 복비계산기, 부동산수수료, 법정중개보수, 매매수수료, 전세수수료">
              <BrokerageFeeCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/real-estate/property-tax" element={
            <CalculatorPage title="취득세 · 양도소득세 계산기"
              seoTitle="부동산 취득세 양도소득세 계산기 | 다주택자 중과세율 포함"
              seoDescription="주택 매입 시 취득세와 농특세, 매도 시 양도소득세를 자동 계산합니다. 주택 수와 조정대상지역 여부에 따른 중과세율도 반영됩니다."
              seoKeywords="취득세계산기, 양도소득세계산기, 다주택자세금, 장기보유특별공제, 부동산세금, 1가구1주택비과세">
              <PropertyTaxCalculator />
            </CalculatorPage>
          } />

          {/* ── 🏢 세금·사업 ── */}
          <Route path="/calc/tax/freelancer-33" element={
            <CalculatorPage title="프리랜서 3.3% 세금 계산기"
              seoTitle="프리랜서 알바 3.3% 세금 원천징수 실수령액 계산기"
              seoDescription="알바, 프리랜서, 크리에이터 등 3.3% 사업소득세 원천징수 전/후의 정확한 실수령액을 즉시 계산하고 5월 종합소득세 환급 꿀팁을 확인하세요."
              seoKeywords="3.3%세금계산기, 프리랜서세금, 알바세금, 알바실수령액, 종합소득세, 삼점삼, 원천징수계산기">
              <FreelancerCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/tax/global-income" element={
            <CalculatorPage title="종합소득세 예상 계산기"
              seoTitle="5월 종합소득세 예상 계산기 | 프리랜서·N잡러·개인사업자"
              seoDescription="연간 수입, 경비율, 기납부 세액을 입력하면 5월에 납부하거나 환급받을 종합소득세를 미리 시뮬레이션합니다."
              seoKeywords="종합소득세계산기, 종소세계산기, 프리랜서세금, 단순경비율, 사업소득세, N잡세금">
              <GlobalIncomeCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/tax/vat" element={
            <CalculatorPage title="부가가치세(VAT) 계산기"
              seoTitle="개인사업자 부가가치세(VAT) 납부액 계산기 | 일반·간이과세 모두 지원"
              seoDescription="일반과세자와 간이과세자 모두 지원합니다. 매출액과 매입세금계산서를 입력하면 이번 분기 납부해야 할 부가세를 즉시 계산합니다."
              seoKeywords="부가세계산기, VAT계산기, 매출세액, 매입세액, 간이과세자, 일반과세자, 사업자부가세">
              <VatCalculator />
            </CalculatorPage>
          } />

          {/* ── 📈 자산증식·투자 ── */}
          <Route path="/calc/invest/stock-average" element={
            <CalculatorPage title="주식 평균단가 (물타기) 계산기"
              seoTitle="주식 물타기 계산기 | 평균단가 평단 자동 계산"
              seoDescription="추가 매수(물타기) 시 정확한 주식 평균 매입 단가를 계산해주는 툴바. 분할 매수에 따른 총 보유수량, 투자금 증감, 평단 하락 시각화 시뮬레이션을 제공합니다."
              seoKeywords="물타기계산기, 주식평단가, 평균단가계산기, 코인평단, 평단가구하기, 주식계산기">
              <StockCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/invest/savings" element={
            <CalculatorPage title="예·적금 만기 이자 계산기"
              seoTitle="단리, 월복리 예적금 만기 이자 (세금우대) 실효수익률 계산기"
              seoDescription="목돈 굴리는 정기예금, 매월 붓는 정기적금 만기 시 세후 수령액 비교 시뮬레이터입니다. 일반 과세(15.4%) 및 상호금융 세금우대(1.4%) 혜택을 바로 확인해보세요."
              seoKeywords="예금적금계산기, 이자계산기, 만기수령액, 세금우대, 비과세저축, 이자소득세, 예적금이자">
              <SavingsCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/invest/compound" element={
            <CalculatorPage title="복리 수익 계산기"
              seoTitle="복리 계산기 | 거치식, 적립식 이자 및 예적금 투자수익률(72법칙) 시뮬레이터"
              seoDescription="초기 종잣돈과 매월 납입하는 적립금, 연 평균 수익률을 입력하여 기간에 따른 폭발적인 복리의 마법을 차트 점진 시각화로 계산해보세요."
              seoKeywords="복리계산기, 이자계산기, 투자수익률, 72법칙, s&p500 수익률, 예적금, 종잣돈">
              <CompoundCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/invest/dividend-tax" element={
            <CalculatorPage title="배당금·금융소득 종합과세 계산기"
              seoTitle="금융소득 종합과세 계산기 | 배당금 2천만원 초과 세금 시뮬레이션"
              seoDescription="이자·배당소득이 연 2,000만원을 초과하면 다른 소득과 합산 과세됩니다. 분리과세 vs 종합과세 비교와 절세 전략을 확인하세요."
              seoKeywords="금융소득종합과세, 배당소득세, 이자소득세, 2천만원기준, ISA절세, 배당주세금">
              <DividendTaxCalculator />
            </CalculatorPage>
          } />

          <Route path="/calc/invest/capital-gains" element={
            <CalculatorPage title="코인·해외주식 양도소득세 계산기"
              seoTitle="해외주식 가상화폐(코인) 양도소득세 22% 계산기"
              seoDescription="해외주식과 가상자산 매매차익에 대한 양도소득세를 계산합니다. 기본공제 250만원 적용 후 세율 22% 자동 계산. Tax Loss Harvesting 전략도 확인하세요."
              seoKeywords="해외주식양도세, 코인세금, 가상자산세금, 양도소득세계산기, 기본공제250만, 해외주식세금신고">
              <CapitalGainsCalculator />
            </CalculatorPage>
          } />

          {/* 404 → 홈으로 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}
