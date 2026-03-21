/**
 * ============================================================
 *  생활 금융 계산기 - 수학 공식 유틸리티
 *  외부 API 없이 순수 JavaScript 자체 연산만으로 작동합니다.
 * ============================================================
 */

// ─────────────────────────────────────────────
//  1. 대출 이자 계산기
//  지원 상환 방식: 원리금균등 / 원금균등 / 만기일시
// ─────────────────────────────────────────────

/**
 * 원리금균등상환 (Equal Payment Method)
 * 매월 동일한 금액을 납부. 원금+이자 합계가 일정.
 * PMT = P * r * (1+r)^n / ((1+r)^n - 1)
 *
 * @param {number} principal  대출 원금 (원)
 * @param {number} annualRate 연 이자율 (%)
 * @param {number} months     대출 기간 (개월)
 * @returns {{ schedule: Array, totalPayment: number, totalInterest: number }}
 */
export function calcLoanEqualPayment(principal, annualRate, months) {
  const r = annualRate / 100 / 12; // 월 이자율
  const n = months;

  let monthlyPayment;
  if (r === 0) {
    monthlyPayment = principal / n;
  } else {
    const factor = Math.pow(1 + r, n);
    monthlyPayment = (principal * r * factor) / (factor - 1);
  }

  const schedule = [];
  let balance = principal;

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const principalPart = monthlyPayment - interest;
    balance -= principalPart;

    schedule.push({
      month: i,
      payment: Math.round(monthlyPayment),
      principal: Math.round(principalPart),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    });
  }

  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - principal;

  return {
    schedule,
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principal,
  };
}

/**
 * 원금균등상환 (Equal Principal Method)
 * 매월 동일한 원금을 납부. 이자는 잔액에 비례하여 감소.
 * 월 원금 = P / n
 * 월 이자 = 남은 잔액 * r
 */
export function calcLoanEqualPrincipal(principal, annualRate, months) {
  const r = annualRate / 100 / 12;
  const n = months;
  const monthlyPrincipal = principal / n;

  const schedule = [];
  let balance = principal;
  let totalInterest = 0;

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const payment = monthlyPrincipal + interest;
    balance -= monthlyPrincipal;
    totalInterest += interest;

    schedule.push({
      month: i,
      payment: Math.round(payment),
      principal: Math.round(monthlyPrincipal),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    });
  }

  return {
    schedule,
    firstMonthPayment: Math.round(monthlyPrincipal + (principal * r)),
    lastMonthPayment: Math.round(monthlyPrincipal + (monthlyPrincipal * r)),
    totalPayment: Math.round(principal + totalInterest),
    totalInterest: Math.round(totalInterest),
    principal,
  };
}

/**
 * 만기일시상환 (Bullet Repayment)
 * 매월 이자만 납부하고 만기에 원금 일시 상환.
 * 월 이자 = P * r
 */
export function calcLoanBullet(principal, annualRate, months) {
  const r = annualRate / 100 / 12;
  const n = months;
  const monthlyInterest = principal * r;
  const totalInterest = monthlyInterest * n;

  const schedule = [];
  for (let i = 1; i <= n; i++) {
    const isLast = i === n;
    schedule.push({
      month: i,
      payment: Math.round(isLast ? monthlyInterest + principal : monthlyInterest),
      principal: isLast ? principal : 0,
      interest: Math.round(monthlyInterest),
      balance: isLast ? 0 : principal,
    });
  }

  return {
    schedule,
    monthlyPayment: Math.round(monthlyInterest),
    totalPayment: Math.round(totalInterest + principal),
    totalInterest: Math.round(totalInterest),
    principal,
  };
}

/** 통합 대출 계산 진입점 */
export function calcLoan(principal, annualRate, months, method) {
  switch (method) {
    case 'equalPayment':  return calcLoanEqualPayment(principal, annualRate, months);
    case 'equalPrincipal': return calcLoanEqualPrincipal(principal, annualRate, months);
    case 'bullet':        return calcLoanBullet(principal, annualRate, months);
    default: return calcLoanEqualPayment(principal, annualRate, months);
  }
}


// ─────────────────────────────────────────────
//  2. 복리 수익률 계산기
//  공식: 복리 미래 가치 + 정기 적립금의 미래 가치 합산
// ─────────────────────────────────────────────

/**
 * FV = P*(1+r)^n + PMT*((1+r)^n - 1)/r
 * r = 월 이자율, n = 총 개월 수
 *
 * @param {number} initialAmount  초기 원금
 * @param {number} monthlyAmount  월 적립금
 * @param {number} annualRate     목표 연 수익률 (%)
 * @param {number} years          투자 기간 (년)
 */
export function calcCompound(initialAmount, monthlyAmount, annualRate, years) {
  const r = annualRate / 100 / 12; // 월 이자율
  const n = years * 12;            // 총 개월

  const dataPoints = [];
  let totalContributions = initialAmount;
  let totalValue = initialAmount;

  for (let month = 1; month <= n; month++) {
    totalValue = totalValue * (1 + r) + monthlyAmount;
    totalContributions += monthlyAmount;

    // 연간 포인트만 기록 (차트용)
    if (month % 12 === 0) {
      dataPoints.push({
        year: month / 12,
        totalValue: Math.round(totalValue),
        contributions: Math.round(totalContributions),
        interest: Math.round(totalValue - totalContributions),
      });
    }
  }

  const totalInterest = totalValue - totalContributions;

  return {
    finalValue: Math.round(totalValue),
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(totalInterest),
    returnRate: totalContributions > 0
      ? ((totalInterest / totalContributions) * 100).toFixed(2)
      : '0.00',
    dataPoints,
  };
}


// ─────────────────────────────────────────────
//  3. 연봉 실수령액 계산기 (2024년 기준 한국 세법)
//  국민연금 4.5% / 건강보험 3.545% / 장기요양 12.95%*건강보험료
//  고용보험 0.9% / 소득세 간이세액표 기준 (근사치)
// ─────────────────────────────────────────────

/**
 * 소득세 간이세액표 근사 계산
 * 월 과세표준(원)을 기준으로 세율 구간 적용
 */
function calcIncomeTax(monthlyTaxableIncome, dependents) {
  // 부양가족 공제: 기본 공제 본인 포함 1인당 150,000원/월 (근사치)
  const dependentDeduction = Math.max(0, dependents) * 150000;
  const taxBase = Math.max(0, monthlyTaxableIncome - dependentDeduction);

  // 간이세액표 구간 (월 기준, 원)
  const brackets = [
    { limit: 1_060_000,  rate: 0,     fixed: 0 },
    { limit: 1_500_000,  rate: 0.06,  fixed: 0 },
    { limit: 3_000_000,  rate: 0.15,  fixed: 72_000 },
    { limit: 4_500_000,  rate: 0.24,  fixed: 522_000 },
    { limit: 8_800_000,  rate: 0.35,  fixed: 1_314_000 },
    { limit: 15_000_000, rate: 0.38,  fixed: 2_829_000 },
    { limit: 30_000_000, rate: 0.40,  fixed: 5_165_000 },
    { limit: 45_000_000, rate: 0.42,  fixed: 11_165_000 },
    { limit: Infinity,   rate: 0.45,  fixed: 17_465_000 },
  ];

  let tax = 0;
  let prev = 0;
  for (const bracket of brackets) {
    if (taxBase <= bracket.limit) {
      tax = (taxBase - prev) * bracket.rate + (prev > 0 ? brackets[brackets.indexOf(bracket) - 1]?.fixed ?? 0 : 0);
      break;
    }
    prev = bracket.limit;
  }

  // 단순 근사: 구간별 누진세 계산
  if (taxBase <= 1_060_000) tax = 0;
  else if (taxBase <= 1_500_000) tax = (taxBase - 1_060_000) * 0.06;
  else if (taxBase <= 3_000_000) tax = 26_400 + (taxBase - 1_500_000) * 0.15;
  else if (taxBase <= 4_500_000) tax = 251_400 + (taxBase - 3_000_000) * 0.24;
  else if (taxBase <= 8_800_000) tax = 611_400 + (taxBase - 4_500_000) * 0.35;
  else if (taxBase <= 15_000_000) tax = 2_116_400 + (taxBase - 8_800_000) * 0.38;
  else if (taxBase <= 30_000_000) tax = 4_472_400 + (taxBase - 15_000_000) * 0.40;
  else if (taxBase <= 45_000_000) tax = 10_472_400 + (taxBase - 30_000_000) * 0.42;
  else tax = 16_772_400 + (taxBase - 45_000_000) * 0.45;

  return Math.max(0, Math.round(tax));
}

/**
 * @param {number} annualSalary   계약 연봉 (원)
 * @param {number} nonTaxable     비과세액 (원, 월 기준 식대 20만원 등)
 * @param {number} dependents     부양가족 수 (본인 포함)
 */
export function calcSalary(annualSalary, nonTaxable, dependents) {
  const monthlySalary = annualSalary / 12;
  const monthlyTaxable = monthlySalary - nonTaxable; // 과세 표준 월급

  // 4대 보험 (2024년 기준)
  const nationalPension     = Math.round(monthlyTaxable * 0.045);       // 국민연금 4.5%
  const healthInsurance     = Math.round(monthlyTaxable * 0.03545);     // 건강보험 3.545%
  const longTermCare        = Math.round(healthInsurance * 0.1295);     // 장기요양보험 12.95%
  const employmentInsurance = Math.round(monthlyTaxable * 0.009);       // 고용보험 0.9%
  const incomeTax           = calcIncomeTax(monthlyTaxable, dependents);
  const localTax            = Math.round(incomeTax * 0.1);              // 지방소득세 10%

  const totalDeduction =
    nationalPension + healthInsurance + longTermCare +
    employmentInsurance + incomeTax + localTax;

  const netMonthly = Math.round(monthlySalary - totalDeduction);
  const netAnnual  = netMonthly * 12;

  return {
    grossMonthly:        Math.round(monthlySalary),
    netMonthly,
    netAnnual,
    deductions: {
      nationalPension,
      healthInsurance,
      longTermCare,
      employmentInsurance,
      incomeTax,
      localTax,
      total: totalDeduction,
    },
    deductionRate: ((totalDeduction / monthlySalary) * 100).toFixed(1),
  };
}


// ─────────────────────────────────────────────
//  4. 예적금 만기 계산기
//  예금(거치식): FV = P * (1 + r)^n
//  적금(적립식): FV = PMT * Σ(1+r)^k  (k=1~n) = PMT*(1+r)*((1+r)^n-1)/r
// ─────────────────────────────────────────────

/**
 * @param {number} amount       원금 or 월 납입금
 * @param {number} annualRate   연 이자율 (%)
 * @param {number} months       기간 (개월)
 * @param {string} type         'deposit'(예금) | 'savings'(적금)
 * @param {boolean} taxFree     세금우대 여부 (세율 1.4% vs 일반 15.4%)
 */
export function calcSavings(amount, annualRate, months, type, taxFree) {
  const r = annualRate / 100 / 12;
  const taxRate = taxFree ? 0.014 : 0.154; // 세금우대 1.4%, 일반 15.4%

  let principal, rawInterest, dataPoints = [];

  if (type === 'deposit') {
    // 거치식 예금: 복리 적용
    principal = amount;
    const fv = amount * Math.pow(1 + r, months);
    rawInterest = fv - amount;

    for (let m = 1; m <= months; m++) {
      const value = amount * Math.pow(1 + r, m);
      if (m % Math.max(1, Math.floor(months / 12)) === 0 || m === months) {
        dataPoints.push({
          month: m,
          principal: amount,
          interest: Math.round(value - amount),
          total: Math.round(value),
        });
      }
    }
  } else {
    // 적립식 적금: 단리 적용 (한국 시중은행 표준)
    principal = amount * months;
    rawInterest = 0;
    let cumulative = 0;

    for (let m = 1; m <= months; m++) {
      const remainingMonths = months - m + 1; // 이 회차가 받을 이자 개월 수
      const interest = amount * r * remainingMonths;
      rawInterest += interest;
      cumulative += amount;

      if (m % Math.max(1, Math.floor(months / 12)) === 0 || m === months) {
        dataPoints.push({
          month: m,
          principal: cumulative,
          interest: Math.round(rawInterest - (rawInterest * taxRate)),
          total: Math.round(cumulative + rawInterest * (1 - taxRate)),
        });
      }
    }
  }

  const tax = Math.round(rawInterest * taxRate);
  const netInterest = Math.round(rawInterest - tax);
  const finalAmount = Math.round(principal + netInterest);

  return {
    principal: Math.round(principal),
    rawInterest: Math.round(rawInterest),
    tax,
    netInterest,
    finalAmount,
    effectiveRate: (principal > 0
      ? ((netInterest / principal) * (12 / months) * 100)
      : 0).toFixed(2),
    dataPoints,
  };
}


// ─────────────────────────────────────────────
//  5. 주식 물타기 (평균단가) 계산기
//  평균 단가 = 총 투자금 / 총 수량
// ─────────────────────────────────────────────

/**
 * @param {Array<{price: number, quantity: number}>} entries  매수 내역 배열
 */
export function calcStockAverage(entries) {
  const validEntries = entries.filter(e => e.price > 0 && e.quantity > 0);
  if (validEntries.length === 0) return null;

  const totalCost = validEntries.reduce((sum, e) => sum + e.price * e.quantity, 0);
  const totalQty  = validEntries.reduce((sum, e) => sum + e.quantity, 0);
  const avgPrice  = totalCost / totalQty;

  const first = validEntries[0];
  const priceDropPercent = first.price > 0
    ? ((first.price - avgPrice) / first.price * 100)
    : 0;

  return {
    avgPrice:         Math.round(avgPrice * 10) / 10,
    totalQty,
    totalCost:        Math.round(totalCost),
    originalPrice:    first.price,
    priceDropPercent: Math.round(priceDropPercent * 10) / 10,
    entries:          validEntries.map((e, i) => ({
      index: i + 1,
      price: e.price,
      quantity: e.quantity,
      amount: e.price * e.quantity,
      weight: ((e.price * e.quantity / totalCost) * 100).toFixed(1),
    })),
  };
}


// ─────────────────────────────────────────────
//  공통 유틸리티
// ─────────────────────────────────────────────

/** 숫자를 한국식 금액 포맷으로 변환 (예: 1,234,567) */
export function formatKRW(num) {
  if (num === null || num === undefined) return '-';
  return Math.round(num).toLocaleString('ko-KR');
}

/** 원 단위 약식 표기 (예: 1억 2,345만 원) */
export function formatKRWShort(num) {
  if (!num) return '0원';
  const eok = Math.floor(num / 100_000_000);
  const man = Math.floor((num % 100_000_000) / 10_000);
  let result = '';
  if (eok > 0) result += `${eok}억 `;
  if (man > 0) result += `${man.toLocaleString()}만 `;
  const remainder = num % 10_000;
  if (remainder > 0 && eok === 0) result += `${remainder.toLocaleString()}`;
  return result.trim() + '원';
}
