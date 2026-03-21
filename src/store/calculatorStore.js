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
}));

export default useCalculatorStore;
