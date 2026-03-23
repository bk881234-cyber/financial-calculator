/**
 * Zustand 상태 관리 스토어
 * 각 계산기의 입력값, 결과, 활성 탭을 전역으로 관리합니다.
 */
import { create } from 'zustand';
import {
  calcLoan,
  calcCompound,
  calcSalary,
  calcSavings,
  calcStockAverage,
  calcSeverance,
  calcUnemployment,
  calcPartTime,
  calcYearEndTax,
  calcDsrLimit,
  calcRentConversion,
  calcBrokerageFee,
  calcAcquisitionTax,
  calcCapitalTax,
  calcGlobalIncomeTax,
  calcVat,
  calcDividendTax,
  calcCapitalGainsTax,
} from '../utils/formulas';

const useCalculatorStore = create((set, get) => ({
  // ── 활성 탭 ──────────────────────────────────
  activeTab: 'loan',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // ─────────────────────────────────────────────
  //  1. 대출 이자
  // ─────────────────────────────────────────────
  loan: {
    principal: 300_000_000,
    annualRate: 4.5,
    months: 360,
    method: 'equalPayment',
    result: null,
  },
  setLoanInput: (field, value) =>
    set((state) => ({
      loan: { ...state.loan, [field]: value },
    })),
  calcLoanResult: () => {
    const { principal, annualRate, months, method } = get().loan;
    if (!principal || !annualRate || !months) return;
    const result = calcLoan(
      Number(principal),
      Number(annualRate),
      Number(months),
      method
    );
    set((state) => ({ loan: { ...state.loan, result } }));
  },

  // ─────────────────────────────────────────────
  //  2. 복리 수익률
  // ─────────────────────────────────────────────
  compound: {
    initialAmount: 10_000_000,
    monthlyAmount: 500_000,
    annualRate: 7,
    years: 20,
    result: null,
  },
  setCompoundInput: (field, value) =>
    set((state) => ({
      compound: { ...state.compound, [field]: value },
    })),
  calcCompoundResult: () => {
    const { initialAmount, monthlyAmount, annualRate, years } = get().compound;
    if (!annualRate || !years) return;
    const result = calcCompound(
      Number(initialAmount),
      Number(monthlyAmount),
      Number(annualRate),
      Number(years)
    );
    set((state) => ({ compound: { ...state.compound, result } }));
  },

  // ─────────────────────────────────────────────
  //  3. 연봉 실수령액
  // ─────────────────────────────────────────────
  salary: {
    annualSalary: 40_000_000,
    nonTaxable: 200_000,
    dependents: 1,
    result: null,
  },
  setSalaryInput: (field, value) =>
    set((state) => ({
      salary: { ...state.salary, [field]: value },
    })),
  calcSalaryResult: () => {
    const { annualSalary, nonTaxable, dependents } = get().salary;
    if (!annualSalary) return;
    const result = calcSalary(
      Number(annualSalary),
      Number(nonTaxable),
      Number(dependents)
    );
    set((state) => ({ salary: { ...state.salary, result } }));
  },

  // ─────────────────────────────────────────────
  //  4. 예적금 만기
  // ─────────────────────────────────────────────
  savings: {
    amount: 1_000_000,
    annualRate: 3.5,
    months: 12,
    type: 'savings',
    taxFree: false,
    result: null,
  },
  setSavingsInput: (field, value) =>
    set((state) => ({
      savings: { ...state.savings, [field]: value },
    })),
  calcSavingsResult: () => {
    const { amount, annualRate, months, type, taxFree } = get().savings;
    if (!amount || !annualRate || !months) return;
    const result = calcSavings(
      Number(amount),
      Number(annualRate),
      Number(months),
      type,
      taxFree
    );
    set((state) => ({ savings: { ...state.savings, result } }));
  },

  // ─────────────────────────────────────────────
  //  5. 주식 물타기
  // ─────────────────────────────────────────────
  stock: {
    entries: [
      { price: 50000, quantity: 100 },
      { price: 40000, quantity: 100 },
    ],
    result: null,
  },
  setStockEntry: (index, field, value) =>
    set((state) => {
      const entries = [...state.stock.entries];
      entries[index] = { ...entries[index], [field]: value };
      return { stock: { ...state.stock, entries } };
    }),
  addStockEntry: () =>
    set((state) => ({
      stock: {
        ...state.stock,
        entries: [...state.stock.entries, { price: 0, quantity: 0 }],
      },
    })),
  removeStockEntry: (index) =>
    set((state) => ({
      stock: {
        ...state.stock,
        entries: state.stock.entries.filter((_, i) => i !== index),
      },
    })),
  calcStockResult: () => {
    const { entries } = get().stock;
    const result = calcStockAverage(entries);
    set((state) => ({ stock: { ...state.stock, result } }));
  },

  // ─────────────────────────────────────────────
  //  6. 퇴직금
  // ─────────────────────────────────────────────
  severance: {
    startDate: '2020-01-01',
    endDate: '2024-12-31',
    last3MonthPay: 9_000_000,
    annualBonus: 0,
    annualLeave: 0,
    result: null,
  },
  setSeveranceInput: (field, value) =>
    set((state) => ({ severance: { ...state.severance, [field]: value } })),
  calcSeveranceResult: () => {
    const { startDate, endDate, last3MonthPay, annualBonus, annualLeave } = get().severance;
    if (!startDate || !endDate) return;
    const result = calcSeverance(startDate, endDate, Number(last3MonthPay), Number(annualBonus), Number(annualLeave));
    set((state) => ({ severance: { ...state.severance, result } }));
  },

  // ─────────────────────────────────────────────
  //  7. 실업급여
  // ─────────────────────────────────────────────
  unemployment: {
    age: 35,
    insuredMonths: 24,
    monthlyPay: 3_000_000,
    dailyHours: 8,
    result: null,
  },
  setUnemploymentInput: (field, value) =>
    set((state) => ({ unemployment: { ...state.unemployment, [field]: value } })),
  calcUnemploymentResult: () => {
    const { age, insuredMonths, monthlyPay, dailyHours } = get().unemployment;
    if (!monthlyPay) return;
    const result = calcUnemployment(Number(age), Number(insuredMonths), Number(monthlyPay), Number(dailyHours));
    set((state) => ({ unemployment: { ...state.unemployment, result } }));
  },

  // ─────────────────────────────────────────────
  //  8. 주휴수당·알바 급여
  // ─────────────────────────────────────────────
  partTime: {
    hourlyWage: 9_860,
    dailyHours: 8,
    weeklyDays: 5,
    taxType: 'none',
    result: null,
  },
  setPartTimeInput: (field, value) =>
    set((state) => ({ partTime: { ...state.partTime, [field]: value } })),
  calcPartTimeResult: () => {
    const { hourlyWage, dailyHours, weeklyDays, taxType } = get().partTime;
    if (!hourlyWage) return;
    const result = calcPartTime(Number(hourlyWage), Number(dailyHours), Number(weeklyDays), taxType);
    set((state) => ({ partTime: { ...state.partTime, result } }));
  },

  // ─────────────────────────────────────────────
  //  9. 연말정산
  // ─────────────────────────────────────────────
  yearEndTax: {
    grossPay: 40_000_000,
    creditCard: 10_000_000,
    debitCard: 5_000_000,
    pension: 0,
    irp: 0,
    medicalExpense: 0,
    result: null,
  },
  setYearEndTaxInput: (field, value) =>
    set((state) => ({ yearEndTax: { ...state.yearEndTax, [field]: value } })),
  calcYearEndTaxResult: () => {
    const { grossPay, creditCard, debitCard, pension, irp, medicalExpense } = get().yearEndTax;
    if (!grossPay) return;
    const result = calcYearEndTax(Number(grossPay), Number(creditCard), Number(debitCard), Number(pension), Number(irp), Number(medicalExpense));
    set((state) => ({ yearEndTax: { ...state.yearEndTax, result } }));
  },

  // ─────────────────────────────────────────────
  //  10. DSR 한도
  // ─────────────────────────────────────────────
  dsr: {
    annualIncome: 60_000_000,
    existingAnnualRepay: 0,
    newLoanRate: 4.5,
    newLoanMonths: 360,
    dsrLimit: 40,
    result: null,
  },
  setDsrInput: (field, value) =>
    set((state) => ({ dsr: { ...state.dsr, [field]: value } })),
  calcDsrResult: () => {
    const { annualIncome, existingAnnualRepay, newLoanRate, newLoanMonths, dsrLimit } = get().dsr;
    if (!annualIncome) return;
    const result = calcDsrLimit(Number(annualIncome), Number(existingAnnualRepay), Number(newLoanRate), Number(newLoanMonths), Number(dsrLimit));
    set((state) => ({ dsr: { ...state.dsr, result } }));
  },

  // ─────────────────────────────────────────────
  //  11. 전월세 전환
  // ─────────────────────────────────────────────
  rentConversion: {
    currentDeposit: 300_000_000,
    currentMonthly: 0,
    targetDeposit: 200_000_000,
    conversionRate: 5.5,
    result: null,
  },
  setRentConversionInput: (field, value) =>
    set((state) => ({ rentConversion: { ...state.rentConversion, [field]: value } })),
  calcRentConversionResult: () => {
    const { currentDeposit, currentMonthly, targetDeposit, conversionRate } = get().rentConversion;
    if (!currentDeposit) return;
    const result = calcRentConversion(Number(currentDeposit), Number(currentMonthly), Number(targetDeposit), Number(conversionRate));
    set((state) => ({ rentConversion: { ...state.rentConversion, result } }));
  },

  // ─────────────────────────────────────────────
  //  12. 부동산 중개수수료
  // ─────────────────────────────────────────────
  brokerage: {
    tradeType: 'buy',
    tradeAmount: 500_000_000,
    includeVat: false,
    result: null,
  },
  setBrokerageInput: (field, value) =>
    set((state) => ({ brokerage: { ...state.brokerage, [field]: value } })),
  calcBrokerageResult: () => {
    const { tradeType, tradeAmount, includeVat } = get().brokerage;
    if (!tradeAmount) return;
    const result = calcBrokerageFee(tradeType, Number(tradeAmount), includeVat);
    set((state) => ({ brokerage: { ...state.brokerage, result } }));
  },

  // ─────────────────────────────────────────────
  //  13. 취득세 / 양도소득세
  // ─────────────────────────────────────────────
  propertyTax: {
    calcMode: 'acquisition',  // 'acquisition' | 'transfer'
    price: 500_000_000,
    homeCount: 1,
    isAdjustedArea: false,
    acquisitionPrice: 300_000_000,
    holdingYears: 5,
    result: null,
  },
  setPropertyTaxInput: (field, value) =>
    set((state) => ({ propertyTax: { ...state.propertyTax, [field]: value } })),
  calcPropertyTaxResult: () => {
    const { calcMode, price, homeCount, isAdjustedArea, acquisitionPrice, holdingYears } = get().propertyTax;
    if (!price) return;
    let result;
    if (calcMode === 'acquisition') {
      result = { mode: 'acquisition', ...calcAcquisitionTax(Number(price), Number(homeCount), isAdjustedArea) };
    } else {
      result = { mode: 'transfer', ...calcCapitalTax(Number(acquisitionPrice), Number(price), Number(holdingYears), Number(homeCount), isAdjustedArea) };
    }
    set((state) => ({ propertyTax: { ...state.propertyTax, result } }));
  },

  // ─────────────────────────────────────────────
  //  14. 종합소득세
  // ─────────────────────────────────────────────
  globalIncome: {
    revenue: 30_000_000,
    expenseRate: 60,
    prepaidTax: 0,
    dependents: 1,
    result: null,
  },
  setGlobalIncomeInput: (field, value) =>
    set((state) => ({ globalIncome: { ...state.globalIncome, [field]: value } })),
  calcGlobalIncomeResult: () => {
    const { revenue, expenseRate, prepaidTax, dependents } = get().globalIncome;
    if (!revenue) return;
    const result = calcGlobalIncomeTax(Number(revenue), Number(expenseRate), Number(prepaidTax), Number(dependents));
    set((state) => ({ globalIncome: { ...state.globalIncome, result } }));
  },

  // ─────────────────────────────────────────────
  //  15. 부가가치세
  // ─────────────────────────────────────────────
  vat: {
    taxType: 'general',
    salesAmt: 55_000_000,
    purchaseTax: 20_000_000,
    vatRatePct: 15,
    cardCredit: false,
    result: null,
  },
  setVatInput: (field, value) =>
    set((state) => ({ vat: { ...state.vat, [field]: value } })),
  calcVatResult: () => {
    const { taxType, salesAmt, purchaseTax, vatRatePct, cardCredit } = get().vat;
    if (!salesAmt) return;
    const result = calcVat(taxType, Number(salesAmt), Number(purchaseTax), Number(vatRatePct), cardCredit);
    set((state) => ({ vat: { ...state.vat, result } }));
  },

  // ─────────────────────────────────────────────
  //  16. 배당금·금융소득 종합과세
  // ─────────────────────────────────────────────
  dividendTax: {
    otherIncome: 50_000_000,
    financialIncome: 25_000_000,
    result: null,
  },
  setDividendTaxInput: (field, value) =>
    set((state) => ({ dividendTax: { ...state.dividendTax, [field]: value } })),
  calcDividendTaxResult: () => {
    const { otherIncome, financialIncome } = get().dividendTax;
    if (!financialIncome) return;
    const result = calcDividendTax(Number(otherIncome), Number(financialIncome));
    set((state) => ({ dividendTax: { ...state.dividendTax, result } }));
  },

  // ─────────────────────────────────────────────
  //  17. 코인·해외주식 양도소득세
  // ─────────────────────────────────────────────
  capitalGains: {
    buyTotal: 10_000_000,
    sellTotal: 15_000_000,
    result: null,
  },
  setCapitalGainsInput: (field, value) =>
    set((state) => ({ capitalGains: { ...state.capitalGains, [field]: value } })),
  calcCapitalGainsResult: () => {
    const { buyTotal, sellTotal } = get().capitalGains;
    if (!sellTotal) return;
    const result = calcCapitalGainsTax(Number(buyTotal), Number(sellTotal));
    set((state) => ({ capitalGains: { ...state.capitalGains, result } }));
  },

  // ─────────────────────────────────────────────
  //  프리랜서 세금 (3.3%)
  // ─────────────────────────────────────────────
  freelancer: {
    amount: 1000000,
    result: null,
  },
  setFreelancerInput: (field, value) =>
    set((state) => ({
      freelancer: { ...state.freelancer, [field]: value },
    })),
  calcFreelancerResult: () => {
    const { amount } = get().freelancer;
    if (!amount) return;
    const amt = Number(amount);
    
    // 원단위 절사
    const incomeTax = Math.floor((amt * 0.03) / 10) * 10;
    const localTax = Math.floor((amt * 0.003) / 10) * 10;
    const totalTax = incomeTax + localTax;
    const netAmount = amt - totalTax;

    const result = {
      amount: amt,
      incomeTax,
      localTax,
      totalTax,
      netAmount,
    };
    set((state) => ({ freelancer: { ...state.freelancer, result } }));
  },
}));

export default useCalculatorStore;
