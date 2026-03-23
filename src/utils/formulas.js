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
//  6. 퇴직금 계산기 (2024년 근로기준법 기준)
// ─────────────────────────────────────────────

/**
 * @param {string} startDate  입사일 (YYYY-MM-DD)
 * @param {string} endDate    퇴사일 (YYYY-MM-DD)
 * @param {number} last3MonthPay  최근 3개월 기본급 합계 (원)
 * @param {number} annualBonus    연간 상여금 (원)
 * @param {number} annualLeave    연간 연차수당 (원)
 */
export function calcSeverance(startDate, endDate, last3MonthPay, annualBonus, annualLeave) {
  const start = new Date(startDate);
  const end   = new Date(endDate);
  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  const years = totalDays / 365;

  // 1일 평균임금 = (3개월 기본급 + 상여/12*3 + 연차/12*3) / 92일
  const bonusPart = (annualBonus / 12) * 3;
  const leavePart = (annualLeave / 12) * 3;
  const totalBase  = last3MonthPay + bonusPart + leavePart;
  const dailyAvgPay = totalBase / 92;

  // 퇴직금 = 1일 평균임금 × 30 × (재직일수 / 365)
  const severancePay = Math.round(dailyAvgPay * 30 * years);

  // 퇴직소득세 근사 계산
  const workYears = Math.max(1, Math.round(years));
  // 근속연수 공제
  let tenureDeduction = 0;
  if (workYears <= 5)       tenureDeduction = workYears * 1_000_000;
  else if (workYears <= 10) tenureDeduction = 5_000_000 + (workYears - 5) * 2_000_000;
  else if (workYears <= 20) tenureDeduction = 15_000_000 + (workYears - 10) * 2_500_000;
  else                      tenureDeduction = 40_000_000 + (workYears - 20) * 3_000_000;

  // 환산급여 = (퇴직금 - 근속연수공제) / 근속연수 × 12
  const netPay = Math.max(0, severancePay - tenureDeduction);
  const annualizedPay = (netPay / workYears) * 12;

  // 환산급여 공제
  let annualizedDeduction = 0;
  if (annualizedPay <= 8_000_000)        annualizedDeduction = annualizedPay;
  else if (annualizedPay <= 70_000_000)  annualizedDeduction = 8_000_000 + (annualizedPay - 8_000_000) * 0.6;
  else if (annualizedPay <= 100_000_000) annualizedDeduction = 45_200_000 + (annualizedPay - 70_000_000) * 0.55;
  else if (annualizedPay <= 300_000_000) annualizedDeduction = 61_700_000 + (annualizedPay - 100_000_000) * 0.45;
  else                                   annualizedDeduction = 151_700_000 + (annualizedPay - 300_000_000) * 0.35;

  // 과세표준
  const taxBase = Math.max(0, ((annualizedPay - annualizedDeduction) / 12) * workYears);

  // 세율 적용
  let taxAmount = 0;
  if (taxBase <= 14_000_000)       taxAmount = taxBase * 0.06;
  else if (taxBase <= 50_000_000)  taxAmount = 840_000 + (taxBase - 14_000_000) * 0.15;
  else if (taxBase <= 88_000_000)  taxAmount = 6_240_000 + (taxBase - 50_000_000) * 0.24;
  else if (taxBase <= 150_000_000) taxAmount = 15_360_000 + (taxBase - 88_000_000) * 0.35;
  else if (taxBase <= 300_000_000) taxAmount = 37_060_000 + (taxBase - 150_000_000) * 0.38;
  else if (taxBase <= 500_000_000) taxAmount = 94_060_000 + (taxBase - 300_000_000) * 0.40;
  else                             taxAmount = 174_060_000 + (taxBase - 500_000_000) * 0.42;

  const incomeTax  = Math.round(taxAmount);
  const localTax   = Math.round(incomeTax * 0.1);
  const totalTax   = incomeTax + localTax;
  const netSeverance = severancePay - totalTax;

  return {
    totalDays,
    years: Math.round(years * 10) / 10,
    workYears,
    dailyAvgPay: Math.round(dailyAvgPay),
    severancePay,
    incomeTax,
    localTax,
    totalTax,
    netSeverance: Math.max(0, netSeverance),
  };
}


// ─────────────────────────────────────────────
//  7. 실업급여 수급액 계산기 (2024년 기준)
// ─────────────────────────────────────────────

/**
 * @param {number} age          만 나이
 * @param {number} insuredMonths 고용보험 가입 기간 (개월)
 * @param {number} monthlyPay   퇴직 전 월 평균임금 (원)
 * @param {number} dailyHours   1일 소정근로시간 (기본 8시간)
 */
export function calcUnemployment(age, insuredMonths, monthlyPay, dailyHours = 8) {
  // 1일 평균임금
  const dailyAvg = monthlyPay / 30;

  // 구직급여일액 = 1일 평균임금 × 60%
  const rawDailyBenefit = dailyAvg * 0.6;

  // 상한액: 66,000원/일
  const upperLimit = 66_000;
  // 하한액: 2024년 최저임금 9,860원 × 80% × 소정근로시간
  const lowerLimit = Math.round(9_860 * 0.8 * dailyHours);

  const dailyBenefit = Math.round(Math.min(upperLimit, Math.max(lowerLimit, rawDailyBenefit)));

  // 소정급여일수 결정 (연령 × 가입기간)
  const isOver50 = age >= 50;
  let benefitDays = 120;
  if (insuredMonths < 12) {
    benefitDays = 120;
  } else if (insuredMonths < 36) {
    benefitDays = isOver50 ? 180 : 150;
  } else if (insuredMonths < 60) {
    benefitDays = isOver50 ? 210 : 180;
  } else if (insuredMonths < 120) {
    benefitDays = isOver50 ? 240 : 210;
  } else {
    benefitDays = isOver50 ? 270 : 240;
  }

  const totalBenefit = dailyBenefit * benefitDays;

  return {
    dailyAvg: Math.round(dailyAvg),
    dailyBenefit,
    benefitDays,
    totalBenefit,
    upperLimit,
    lowerLimit,
    isUpperCapped: rawDailyBenefit > upperLimit,
    isLowerCapped: rawDailyBenefit < lowerLimit,
  };
}


// ─────────────────────────────────────────────
//  8. 주휴수당 & 알바 급여 계산기
// ─────────────────────────────────────────────

/**
 * @param {number} hourlyWage     시급 (원)
 * @param {number} dailyHours     1일 근무시간
 * @param {number} weeklyDays     주 근무일수
 * @param {string} taxType        'none' | 'freelancer33' | 'insurance'
 */
export function calcPartTime(hourlyWage, dailyHours, weeklyDays, taxType) {
  const weeklyHours = dailyHours * weeklyDays;
  const MIN_WAGE_2024 = 9_860; // 2024년 최저임금

  // 주휴수당 (주 15시간 이상인 경우)
  const hasJuHyu = weeklyHours >= 15;
  const juHyuHours = hasJuHyu ? (weeklyHours / 40) * 8 : 0;
  const juHyuPay = Math.round(hourlyWage * juHyuHours);

  // 주급 = 일급 × 일수 + 주휴수당
  const weeklyPay = Math.round(hourlyWage * weeklyHours + juHyuPay);

  // 월급 (4.345주/월)
  const monthlyHours = weeklyHours * (365 / 12 / 7);
  const monthlyJuHyu = Math.round(juHyuHours * hourlyWage * (365 / 12 / 7));
  const grossMonthly = Math.round(hourlyWage * monthlyHours + monthlyJuHyu);

  // 세금 공제
  let taxDeduction = 0;
  let netMonthly = grossMonthly;
  if (taxType === 'freelancer33') {
    taxDeduction = Math.floor((grossMonthly * 0.033) / 10) * 10;
    netMonthly = grossMonthly - taxDeduction;
  } else if (taxType === 'insurance') {
    // 4대보험 근사 (국민연금 4.5%, 건강 3.545%, 고용 0.9%)
    taxDeduction = Math.round(grossMonthly * (0.045 + 0.03545 + 0.009));
    netMonthly = grossMonthly - taxDeduction;
  }

  return {
    weeklyHours,
    hasJuHyu,
    juHyuHours: Math.round(juHyuHours * 10) / 10,
    juHyuPay,
    weeklyPay,
    grossMonthly,
    taxDeduction,
    netMonthly,
    annualPay: netMonthly * 12,
    minWage: MIN_WAGE_2024,
    isAboveMinWage: hourlyWage >= MIN_WAGE_2024,
  };
}


// ─────────────────────────────────────────────
//  9. 연말정산 시뮬레이터 (2024년 귀속 기준)
// ─────────────────────────────────────────────

/**
 * @param {number} grossPay         총급여액 (원)
 * @param {number} creditCard       신용카드 사용액 (원)
 * @param {number} debitCard        체크카드+현금영수증 사용액 (원)
 * @param {number} pension          연금저축 납입액 (원)
 * @param {number} irp              IRP 추가 납입액 (원)
 * @param {number} medicalExpense   의료비 지출액 (원)
 */
export function calcYearEndTax(grossPay, creditCard, debitCard, pension, irp, medicalExpense) {
  // ① 근로소득 공제
  let incomeDeduction = 0;
  if (grossPay <= 5_000_000)          incomeDeduction = grossPay * 0.7;
  else if (grossPay <= 15_000_000)    incomeDeduction = 3_500_000 + (grossPay - 5_000_000) * 0.4;
  else if (grossPay <= 45_000_000)    incomeDeduction = 7_500_000 + (grossPay - 15_000_000) * 0.15;
  else if (grossPay <= 100_000_000)   incomeDeduction = 12_000_000 + (grossPay - 45_000_000) * 0.05;
  else                                 incomeDeduction = 14_750_000;
  incomeDeduction = Math.round(incomeDeduction);

  const grossIncomeAmt = grossPay - incomeDeduction; // 근로소득금액

  // ② 인적공제 (기본 본인 1인)
  const personalDeduction = 1_500_000;

  // ③ 신용카드 소득공제
  const threshold = grossPay * 0.25; // 최저사용금액(급여의 25%)
  const totalCardUse = creditCard + debitCard;
  let cardDeduction = 0;
  if (totalCardUse > threshold) {
    const over = totalCardUse - threshold;
    // 신용카드 초과분부터 공제: 체크카드를 먼저 채운 것으로 가정
    const debitOver = Math.min(over, debitCard);
    const creditOver = Math.max(0, over - debitCard);
    cardDeduction = Math.round(debitOver * 0.3 + creditOver * 0.15);
  }
  // 한도 적용
  let cardLimit = 3_000_000;
  if (grossPay > 120_000_000)      cardLimit = 2_000_000;
  else if (grossPay > 70_000_000)  cardLimit = 2_500_000;
  cardDeduction = Math.min(cardDeduction, cardLimit);

  // ④ 과세표준
  const totalDeductions = personalDeduction + cardDeduction;
  const taxBase = Math.max(0, grossIncomeAmt - totalDeductions);

  // ⑤ 산출세액
  let taxAmount = 0;
  if (taxBase <= 14_000_000)       taxAmount = taxBase * 0.06;
  else if (taxBase <= 50_000_000)  taxAmount = 840_000 + (taxBase - 14_000_000) * 0.15;
  else if (taxBase <= 88_000_000)  taxAmount = 6_240_000 + (taxBase - 50_000_000) * 0.24;
  else if (taxBase <= 150_000_000) taxAmount = 15_360_000 + (taxBase - 88_000_000) * 0.35;
  else if (taxBase <= 300_000_000) taxAmount = 37_060_000 + (taxBase - 150_000_000) * 0.38;
  else                             taxAmount = 94_060_000 + (taxBase - 300_000_000) * 0.40;
  taxAmount = Math.round(taxAmount);

  // ⑥ 근로소득세액공제
  let workTaxCredit = 0;
  if (taxAmount <= 550_000)       workTaxCredit = taxAmount * 0.55;
  else if (taxAmount <= 1_300_000) workTaxCredit = 302_500 + (taxAmount - 550_000) * 0.3;
  else                             workTaxCredit = 527_500 + (taxAmount - 1_300_000) * 0.0;
  workTaxCredit = Math.min(Math.round(workTaxCredit), 740_000);

  // ⑦ 연금저축·IRP 세액공제
  const totalPension = Math.min(pension, 6_000_000) + Math.min(irp, 9_000_000 - Math.min(pension, 6_000_000));
  const pensionCreditRate = grossPay <= 55_000_000 ? 0.165 : 0.132;
  const pensionCredit = Math.round(totalPension * pensionCreditRate);

  // ⑧ 의료비 세액공제 (급여의 3% 초과분 × 15%)
  const medThreshold = grossPay * 0.03;
  const medCredit = medicalExpense > medThreshold
    ? Math.round((medicalExpense - medThreshold) * 0.15)
    : 0;

  // ⑨ 결정세액
  const determinedTax = Math.max(0, taxAmount - workTaxCredit - pensionCredit - medCredit);
  const localTax = Math.round(determinedTax * 0.1);

  // ⑩ 기납부 세액 추정 (월별 원천징수 합계 ≈ 결정세액 × 1.0 로 근사 → 차이로 환급/납부 시뮬레이션)
  // 실제로는 근로자마다 다르므로 "예상 연간 원천징수 = 산출세액 - 근로세액공제" 로 근사
  const estimatedWithheld = Math.max(0, taxAmount - workTaxCredit);
  const finalTax = determinedTax + localTax;
  const finalWithheld = estimatedWithheld + Math.round(estimatedWithheld * 0.1);
  const refundOrPay = finalWithheld - finalTax;

  return {
    grossPay,
    incomeDeduction,
    grossIncomeAmt,
    cardDeduction,
    personalDeduction,
    totalDeductions,
    taxBase,
    taxAmount,
    workTaxCredit,
    pensionCredit,
    medCredit,
    determinedTax,
    localTax,
    finalTax,
    refundOrPay, // 양수 = 환급, 음수 = 추납
    pensionCreditRate,
  };
}


// ─────────────────────────────────────────────
//  10. LTV / DSR 한도 계산기
// ─────────────────────────────────────────────

/**
 * @param {number} annualIncome   연소득 (원)
 * @param {number} existingAnnualRepay 기존 대출 연간 원리금 상환액 (원)
 * @param {number} newLoanRate    신규 대출 연금리 (%)
 * @param {number} newLoanMonths  신규 대출 기간 (개월)
 * @param {number} dsrLimit       DSR 규제 한도 (%, 기본 40%)
 */
export function calcDsrLimit(annualIncome, existingAnnualRepay, newLoanRate, newLoanMonths, dsrLimit = 40) {
  const r = newLoanRate / 100 / 12;
  const n = newLoanMonths;

  // 허용 가능한 신규 연간 원리금
  const maxAnnualNewRepay = (annualIncome * dsrLimit / 100) - existingAnnualRepay;
  const maxMonthlyNewRepay = maxAnnualNewRepay / 12;

  // 원리금균등 역산: 대출금액 = 월납입액 / (r * (1+r)^n / ((1+r)^n - 1))
  let maxLoanAmount = 0;
  if (maxMonthlyNewRepay > 0 && r > 0 && n > 0) {
    const factor = Math.pow(1 + r, n);
    maxLoanAmount = Math.round(maxMonthlyNewRepay * (factor - 1) / (r * factor));
  } else if (maxMonthlyNewRepay > 0 && r === 0) {
    maxLoanAmount = Math.round(maxMonthlyNewRepay * n);
  }

  // 현재 DSR (기존 대출만)
  const currentDsr = annualIncome > 0
    ? Math.round((existingAnnualRepay / annualIncome) * 1000) / 10
    : 0;

  // 신규 추가 시 DSR
  const monthlyForBorrow = maxLoanAmount > 0
    ? Math.round(maxLoanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
    : 0;
  const newDsr = annualIncome > 0
    ? Math.round(((existingAnnualRepay + monthlyForBorrow * 12) / annualIncome) * 1000) / 10
    : 0;

  return {
    maxLoanAmount: Math.max(0, maxLoanAmount),
    maxMonthlyNewRepay: Math.max(0, Math.round(maxMonthlyNewRepay)),
    currentDsr,
    newDsr,
    dsrLimit,
    monthlyPayment: monthlyForBorrow,
  };
}


// ─────────────────────────────────────────────
//  11. 전월세 전환 계산기
// ─────────────────────────────────────────────

/**
 * @param {number} currentDeposit  현재 보증금 (원)
 * @param {number} currentMonthly  현재 월세 (원, 0이면 전세)
 * @param {number} targetDeposit   변경 목표 보증금 (원)
 * @param {number} conversionRate  전환율 (%, 법정기준 기준금리+2%)
 */
export function calcRentConversion(currentDeposit, currentMonthly, targetDeposit, conversionRate) {
  const depositDiff = currentDeposit - targetDeposit; // 양수: 보증금 낮춤 → 월세 오름

  // 월세 변동액 = 보증금 차이 × 전환율 / 12
  const monthlyDiff = Math.round((depositDiff * conversionRate / 100) / 12);
  const newMonthly = currentMonthly + monthlyDiff;

  // 전세 전환 보증금 = (현재 월세 + 월세 변동) → 전세가 0인 경우 현재 보증금과 월세로 전세가 환산
  const jeonseEquivalent = currentMonthly > 0
    ? Math.round(currentDeposit + (currentMonthly * 12 / (conversionRate / 100)))
    : currentDeposit;

  return {
    currentDeposit,
    currentMonthly,
    targetDeposit,
    depositDiff,
    monthlyDiff,
    newMonthly: Math.max(0, newMonthly),
    jeonseEquivalent,
    conversionRate,
    annualRentCost: Math.max(0, newMonthly) * 12,
    annualDepositCost: Math.round(targetDeposit * conversionRate / 100),
  };
}


// ─────────────────────────────────────────────
//  12. 부동산 중개수수료 계산기 (2021년 개정 기준)
// ─────────────────────────────────────────────

/**
 * @param {string} tradeType   'buy' | 'jeonse' | 'monthly'
 * @param {number} tradeAmount 거래금액 (원, 월세는 보증금+월세×100)
 * @param {boolean} includeVat VAT 포함 여부
 */
export function calcBrokerageFee(tradeType, tradeAmount, includeVat) {
  let rate = 0;
  let ceiling = Infinity;

  if (tradeType === 'buy') {
    if (tradeAmount < 50_000_000)        { rate = 0.006; ceiling = 250_000; }
    else if (tradeAmount < 200_000_000)  { rate = 0.005; ceiling = 800_000; }
    else if (tradeAmount < 900_000_000)  { rate = 0.004; }
    else if (tradeAmount < 1_200_000_000){ rate = 0.005; }
    else if (tradeAmount < 1_500_000_000){ rate = 0.006; }
    else                                  { rate = 0.007; }
  } else {
    // 전세/월세 공통
    if (tradeAmount < 50_000_000)        { rate = 0.005; ceiling = 200_000; }
    else if (tradeAmount < 100_000_000)  { rate = 0.004; ceiling = 300_000; }
    else if (tradeAmount < 300_000_000)  { rate = 0.003; }
    else if (tradeAmount < 600_000_000)  { rate = 0.004; }
    else                                  { rate = 0.005; }
  }

  const rawFee = tradeAmount * rate;
  const maxFee = Math.min(rawFee, ceiling);
  const vatAmount = includeVat ? Math.round(maxFee * 0.1) : 0;
  const totalFee = Math.round(maxFee + vatAmount);

  return {
    tradeAmount,
    rate: rate * 100,
    maxFee: Math.round(maxFee),
    vatAmount,
    totalFee,
    ceiling: ceiling === Infinity ? null : ceiling,
  };
}


// ─────────────────────────────────────────────
//  13. 부동산 취득세 / 양도소득세 계산기
// ─────────────────────────────────────────────

/**
 * 취득세 계산 (1주택자 기준, 2021년 이후)
 */
export function calcAcquisitionTax(price, homeCount, isAdjustedArea) {
  let baseRate = 0;
  if (homeCount === 1) {
    if (price <= 600_000_000)       baseRate = 0.01;
    else if (price <= 900_000_000)  baseRate = 0.01 + ((price - 600_000_000) / 300_000_000) * 0.02;
    else                             baseRate = 0.03;
  } else if (homeCount === 2) {
    baseRate = isAdjustedArea ? 0.08 : 0.03;
  } else {
    baseRate = isAdjustedArea ? 0.12 : 0.04;
  }

  const acquisitionTax = Math.round(price * baseRate);

  // 농어촌특별세 + 지방교육세
  let addTax = 0;
  if (baseRate <= 0.01)       addTax = Math.round(price * 0.001); // 지방교육세만
  else if (baseRate <= 0.03)  addTax = Math.round(price * (0.002 + 0.002));
  else if (baseRate <= 0.04)  addTax = Math.round(price * (0.002 + 0.004));
  else if (baseRate <= 0.08)  addTax = Math.round(price * (0.006 + 0.004));
  else                        addTax = Math.round(price * (0.01 + 0.004));

  const totalTax = acquisitionTax + addTax;

  return {
    price,
    baseRate: Math.round(baseRate * 10000) / 100,
    acquisitionTax,
    addTax,
    totalTax,
  };
}

/**
 * 양도소득세 계산 (라이트 버전)
 */
export function calcCapitalTax(acquisitionPrice, transferPrice, holdingYears, homeCount, isAdjustedArea) {
  const profit = transferPrice - acquisitionPrice;
  if (profit <= 0) return { profit: 0, taxBase: 0, taxAmount: 0, localTax: 0, totalTax: 0, rate: 0 };

  // 장기보유특별공제 (1주택 비과세 요건 제외)
  let longTermDeduction = 0;
  if (holdingYears >= 3 && homeCount === 1) {
    longTermDeduction = Math.min(holdingYears * 0.04, 0.40); // 최대 40%
  }

  // 기본공제 2,500,000원
  const basicDeduction = 2_500_000;
  const taxBase = Math.max(0, profit * (1 - longTermDeduction) - basicDeduction);

  // 보유기간에 따른 세율
  let rate = 0;
  if (holdingYears < 1)      rate = 0.70;
  else if (holdingYears < 2) rate = 0.60;
  else {
    // 누진세율
    if (taxBase <= 14_000_000)       rate = 0.06;
    else if (taxBase <= 50_000_000)  rate = 0.15;
    else if (taxBase <= 88_000_000)  rate = 0.24;
    else if (taxBase <= 150_000_000) rate = 0.35;
    else if (taxBase <= 300_000_000) rate = 0.38;
    else if (taxBase <= 500_000_000) rate = 0.40;
    else                             rate = 0.42;
  }

  // 다주택자 중과
  let surcharge = 0;
  if (isAdjustedArea && homeCount === 2) surcharge = 0.20;
  if (isAdjustedArea && homeCount >= 3)  surcharge = 0.30;

  const effectiveRate = Math.min(rate + surcharge, 0.75);

  let taxAmount = 0;
  if (holdingYears >= 2 && surcharge === 0) {
    // 누진세 계산
    if (taxBase <= 14_000_000)       taxAmount = taxBase * 0.06;
    else if (taxBase <= 50_000_000)  taxAmount = 840_000 + (taxBase - 14_000_000) * 0.15;
    else if (taxBase <= 88_000_000)  taxAmount = 6_240_000 + (taxBase - 50_000_000) * 0.24;
    else if (taxBase <= 150_000_000) taxAmount = 15_360_000 + (taxBase - 88_000_000) * 0.35;
    else if (taxBase <= 300_000_000) taxAmount = 37_060_000 + (taxBase - 150_000_000) * 0.38;
    else if (taxBase <= 500_000_000) taxAmount = 94_060_000 + (taxBase - 300_000_000) * 0.40;
    else                             taxAmount = 174_060_000 + (taxBase - 500_000_000) * 0.42;
  } else {
    taxAmount = taxBase * effectiveRate;
  }
  taxAmount = Math.round(taxAmount);

  const localTax = Math.round(taxAmount * 0.1);
  const totalTax = taxAmount + localTax;

  return {
    profit,
    longTermDeduction: Math.round(longTermDeduction * 100),
    taxBase,
    rate: Math.round(effectiveRate * 100),
    taxAmount,
    localTax,
    totalTax,
    netProfit: profit - totalTax,
  };
}


// ─────────────────────────────────────────────
//  14. 종합소득세 예상 계산기 (2024년 귀속)
// ─────────────────────────────────────────────

/**
 * @param {number} revenue        총수입금액 (원)
 * @param {number} expenseRate    경비율 (%, 직접 입력 or 단순경비율)
 * @param {number} prepaidTax     기납부 세액 (원, 3.3% 뗀 금액 합계)
 * @param {number} dependents     부양가족 수 (본인 포함)
 */
export function calcGlobalIncomeTax(revenue, expenseRate, prepaidTax, dependents) {
  const expense     = Math.round(revenue * expenseRate / 100);
  const incomeAmt   = revenue - expense;
  const personalDed = dependents * 1_500_000;
  const taxBase     = Math.max(0, incomeAmt - personalDed);

  let taxAmount = 0;
  if (taxBase <= 14_000_000)       taxAmount = taxBase * 0.06;
  else if (taxBase <= 50_000_000)  taxAmount = 840_000 + (taxBase - 14_000_000) * 0.15;
  else if (taxBase <= 88_000_000)  taxAmount = 6_240_000 + (taxBase - 50_000_000) * 0.24;
  else if (taxBase <= 150_000_000) taxAmount = 15_360_000 + (taxBase - 88_000_000) * 0.35;
  else if (taxBase <= 300_000_000) taxAmount = 37_060_000 + (taxBase - 150_000_000) * 0.38;
  else if (taxBase <= 500_000_000) taxAmount = 94_060_000 + (taxBase - 300_000_000) * 0.40;
  else                             taxAmount = 174_060_000 + (taxBase - 500_000_000) * 0.42;
  taxAmount = Math.round(taxAmount);

  const localTax   = Math.round(taxAmount * 0.1);
  const totalTax   = taxAmount + localTax;
  const netPayOrRefund = prepaidTax - totalTax; // 양수: 환급, 음수: 추납

  return {
    revenue,
    expense,
    incomeAmt,
    personalDed,
    taxBase,
    taxAmount,
    localTax,
    totalTax,
    prepaidTax,
    netPayOrRefund,
    effectiveRate: taxBase > 0 ? Math.round((taxAmount / taxBase) * 1000) / 10 : 0,
  };
}


// ─────────────────────────────────────────────
//  15. 부가가치세(VAT) 계산기
// ─────────────────────────────────────────────

/**
 * @param {string} taxType       'general' (일반과세) | 'simplified' (간이과세)
 * @param {number} salesAmt      매출액 (부가세 포함, 원)
 * @param {number} purchaseTax   매입세금계산서 합계 (원)
 * @param {number} vatRatePct    부가가치율 (간이과세자, %)
 * @param {boolean} cardCredit   신용카드 발행 세액공제 여부
 */
export function calcVat(taxType, salesAmt, purchaseTax, vatRatePct, cardCredit) {
  if (taxType === 'general') {
    const salesTax    = Math.round(salesAmt / 1.1 * 0.1);
    const inputTax    = Math.round(purchaseTax * 0.1);
    const cardDeduct  = cardCredit ? Math.min(Math.round(salesAmt / 1.1 * 0.013), 5_000_000) : 0;
    const payableTax  = Math.max(0, salesTax - inputTax - cardDeduct);
    return {
      taxType,
      salesAmt,
      salesTax,
      inputTax,
      cardDeduct,
      payableTax,
      netSales: Math.round(salesAmt / 1.1),
    };
  } else {
    // 간이과세
    const netSales    = Math.round(salesAmt / (1 + vatRatePct / 1000));
    const vatPayable  = Math.round(netSales * (vatRatePct / 100) * 0.1);
    const inputCredit = Math.round(purchaseTax * (vatRatePct / 100) * 0.1);
    const cardDeduct  = cardCredit ? Math.min(Math.round(netSales * 0.013), 5_000_000) : 0;
    const payableTax  = Math.max(0, vatPayable - inputCredit - cardDeduct);
    return {
      taxType,
      salesAmt,
      netSales,
      vatPayable,
      inputCredit,
      cardDeduct,
      payableTax,
      vatRatePct,
    };
  }
}


// ─────────────────────────────────────────────
//  16. 배당금·금융소득 종합과세 계산기
// ─────────────────────────────────────────────

/**
 * @param {number} otherIncome    근로·사업 등 타 종합소득 (원)
 * @param {number} financialIncome 금융소득(이자+배당) 합계 (원)
 */
export function calcDividendTax(otherIncome, financialIncome) {
  const THRESHOLD = 20_000_000;
  const separateRate = 0.154; // 분리과세 14% + 지방소득세 1.4% = 15.4%

  // 분리과세 세금
  const separateTax = Math.round(financialIncome * separateRate);

  if (financialIncome <= THRESHOLD) {
    return {
      financialIncome,
      separateTax,
      isCombined: false,
      combinedTax: separateTax,
      extraTax: 0,
      totalTax: separateTax,
      THRESHOLD,
    };
  }

  // 종합과세 (2천만 초과)
  const overAmount = financialIncome - THRESHOLD;
  const combinedBase = otherIncome + overAmount;

  function calcProgressiveTax(base) {
    if (base <= 14_000_000)       return base * 0.06;
    if (base <= 50_000_000)       return 840_000 + (base - 14_000_000) * 0.15;
    if (base <= 88_000_000)       return 6_240_000 + (base - 50_000_000) * 0.24;
    if (base <= 150_000_000)      return 15_360_000 + (base - 88_000_000) * 0.35;
    if (base <= 300_000_000)      return 37_060_000 + (base - 150_000_000) * 0.38;
    if (base <= 500_000_000)      return 94_060_000 + (base - 300_000_000) * 0.40;
    return 174_060_000 + (base - 500_000_000) * 0.42;
  }

  const taxOnOther = Math.round(calcProgressiveTax(otherIncome));
  const taxOnCombined = Math.round(calcProgressiveTax(combinedBase));
  const overTax = taxOnCombined - taxOnOther;

  // 분리과세 2천만에 대한 세금 + 초과분 종합과세 (비교과세)
  const separateOnThreshold = Math.round(THRESHOLD * 0.14); // 분리과세세액(지방소득세 제외)
  const combinedTax = Math.round((separateOnThreshold + overTax) * 1.1); // 지방소득세 포함

  // 최종: 분리과세 vs 종합과세 중 유리한 것
  const betterOption = combinedTax < separateTax ? 'combined' : 'separate';
  const totalTax = Math.min(separateTax, combinedTax);

  return {
    financialIncome,
    THRESHOLD,
    overAmount,
    separateTax,
    combinedTax,
    isCombined: true,
    betterOption,
    totalTax,
    extraTax: Math.max(0, combinedTax - separateTax),
    netDividend: financialIncome - totalTax,
  };
}


// ─────────────────────────────────────────────
//  17. 코인·해외주식 양도소득세 계산기
// ─────────────────────────────────────────────

/**
 * @param {number} buyTotal    총 매수금액 (원)
 * @param {number} sellTotal   총 매도금액 (원)
 */
export function calcCapitalGainsTax(buyTotal, sellTotal) {
  const profit = sellTotal - buyTotal;
  const BASIC_DEDUCTION = 2_500_000;

  if (profit <= 0) {
    return { profit, taxBase: 0, taxAmount: 0, localTax: 0, totalTax: 0, netProfit: profit };
  }

  const taxBase  = Math.max(0, profit - BASIC_DEDUCTION);
  const taxAmount  = Math.round(taxBase * 0.20);  // 기본세율 20%
  const localTax   = Math.round(taxAmount * 0.10); // 지방소득세 10%
  const totalTax   = taxAmount + localTax;         // 합계 22%
  const netProfit  = profit - totalTax;

  return {
    profit,
    BASIC_DEDUCTION,
    taxBase,
    taxAmount,
    localTax,
    totalTax,
    netProfit,
    effectiveRate: profit > 0 ? Math.round((totalTax / profit) * 1000) / 10 : 0,
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
