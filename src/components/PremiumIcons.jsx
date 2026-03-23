
const defaultProps = { size: 44, };

/* ─────────────────────────────────────────
   💼 직장인·급여 — Blue #3B82F6 theme
───────────────────────────────────────── */

/* 연봉 실수령액 */
export function PIconNetPay({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: briefcase */}
      <rect x="5" y="15" width="26" height="20" rx="4" fill="#3B82F6"/>
      <path d="M13 15v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" fill="#2563EB"/>
      {/* foreground: dollar circle */}
      <circle cx="30" cy="30" r="11" fill="#DBEAFE" opacity="0.95"/>
      <text x="30" y="35" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1D4ED8">₩</text>
    </svg>
  );
}

/* 퇴직금 */
export function PIconSeverance({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: calendar */}
      <rect x="4" y="10" width="26" height="24" rx="4" fill="#3B82F6"/>
      <rect x="4" y="10" width="26" height="8" rx="4" fill="#2563EB"/>
      <rect x="11" y="5" width="4" height="10" rx="2" fill="#1E40AF"/>
      <rect x="21" y="5" width="4" height="10" rx="2" fill="#1E40AF"/>
      {/* foreground: checkmark badge */}
      <circle cx="31" cy="31" r="11" fill="#EFF6FF" opacity="0.95"/>
      <path d="M25 31l4 4 7-8" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* 실업급여 */
export function PIconUnemployment({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: person */}
      <circle cx="16" cy="12" r="7" fill="#3B82F6"/>
      <path d="M4 35c0-8 6-13 12-13s12 5 12 13" fill="#2563EB"/>
      {/* foreground: shield */}
      <path d="M22 20 L38 24 L38 34 C38 39 30 42 30 42 C30 42 22 39 22 34 Z" fill="#DBEAFE" opacity="0.95"/>
      <path d="M27 32l3 3 5-6" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* 주휴수당 */
export function PIconPartTime({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: clock */}
      <circle cx="18" cy="20" r="15" fill="#3B82F6"/>
      <circle cx="18" cy="20" r="10" fill="#2563EB"/>
      <path d="M18 13v8l5 3" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
      {/* foreground: coin stack */}
      <ellipse cx="31" cy="34" rx="10" ry="5" fill="#EFF6FF" opacity="0.95"/>
      <ellipse cx="31" cy="30" rx="10" ry="5" fill="#DBEAFE" opacity="0.95"/>
      <ellipse cx="31" cy="26" rx="10" ry="5" fill="#BFDBFE" opacity="0.95"/>
    </svg>
  );
}

/* 연말정산 */
export function PIconYearEndTax({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: document */}
      <rect x="5" y="4" width="24" height="30" rx="4" fill="#3B82F6"/>
      <rect x="9" y="10" width="16" height="2.5" rx="1.25" fill="#93C5FD"/>
      <rect x="9" y="15" width="12" height="2.5" rx="1.25" fill="#93C5FD"/>
      <rect x="9" y="20" width="14" height="2.5" rx="1.25" fill="#93C5FD"/>
      {/* foreground: refund arrow */}
      <circle cx="30" cy="30" r="12" fill="#EFF6FF" opacity="0.95"/>
      <path d="M24 30 Q30 22 36 30" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M33 27l3 3-3 3" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────
   🏠 부동산·대출 — Teal #14B8A6 theme
───────────────────────────────────────── */

/* 대출 이자 */
export function PIconLoan({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: house */}
      <path d="M5 22L18 8l13 14v17H5z" fill="#0D9488"/>
      <rect x="12" y="27" width="12" height="12" rx="2" fill="#0F766E"/>
      {/* foreground: piggy bank / coin */}
      <circle cx="30" cy="17" r="12" fill="#CCFBF1" opacity="0.95"/>
      <text x="30" y="22" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0D9488">%</text>
    </svg>
  );
}

/* DSR 한도 */
export function PIconDsrLimit({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: bar chart */}
      <rect x="5" y="28" width="7" height="12" rx="2" fill="#0D9488"/>
      <rect x="15" y="18" width="7" height="22" rx="2" fill="#14B8A6"/>
      <rect x="25" y="10" width="7" height="30" rx="2" fill="#0D9488"/>
      {/* foreground: gauge */}
      <circle cx="33" cy="16" r="10" fill="#CCFBF1" opacity="0.95"/>
      <path d="M33 22 A6 6 0 0 1 27 16" stroke="#0D9488" strokeWidth="2" fill="none"/>
      <path d="M33 22 A6 6 0 0 0 39 16" stroke="#5EEAD4" strokeWidth="2" fill="none"/>
      <line x1="33" y1="16" x2="29" y2="13" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* 전월세 전환 */
export function PIconRentConversion({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: building (전세) */}
      <rect x="3" y="14" width="22" height="26" rx="3" fill="#0D9488"/>
      <rect x="7" y="18" width="5" height="5" rx="1" fill="#5EEAD4"/>
      <rect x="15" y="18" width="5" height="5" rx="1" fill="#5EEAD4"/>
      <rect x="7" y="26" width="5" height="5" rx="1" fill="#5EEAD4"/>
      <path d="M3 14 L14 5 L25 14" fill="#0F766E"/>
      {/* foreground: arrow + building (월세) */}
      <rect x="22" y="22" width="20" height="18" rx="3" fill="#CCFBF1" opacity="0.97"/>
      <path d="M15 20 L28 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M25 17 L28 20 L25 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* 중개수수료 */
export function PIconBrokerageFee({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: handshake key */}
      <circle cx="15" cy="18" r="12" fill="#0D9488"/>
      <circle cx="15" cy="18" r="6" fill="#0F766E"/>
      <rect x="20" y="17" width="14" height="3" rx="1.5" fill="#0D9488"/>
      <rect x="30" y="17" width="3" height="6" rx="1.5" fill="#0D9488"/>
      {/* foreground: receipt */}
      <rect x="22" y="24" width="18" height="16" rx="3" fill="#CCFBF1" opacity="0.95"/>
      <rect x="25" y="28" width="12" height="2" rx="1" fill="#0D9488" opacity="0.5"/>
      <rect x="25" y="32" width="9" height="2" rx="1" fill="#0D9488" opacity="0.5"/>
    </svg>
  );
}

/* 취득세·양도세 */
export function PIconPropertyTax({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: city hall */}
      <rect x="4" y="18" width="28" height="22" rx="2" fill="#0D9488"/>
      <rect x="4" y="18" width="28" height="5" rx="2" fill="#0F766E"/>
      <rect x="16" y="8" width="4" height="12" rx="1" fill="#0D9488"/>
      <rect x="8" y="13" width="20" height="4" rx="1" fill="#0F766E"/>
      <rect x="10" y="25" width="5" height="7" rx="1" fill="#5EEAD4"/>
      <rect x="19" y="25" width="5" height="7" rx="1" fill="#5EEAD4"/>
      {/* foreground: tax badge */}
      <circle cx="32" cy="14" r="11" fill="#CCFBF1" opacity="0.95"/>
      <text x="32" y="19" textAnchor="middle" fontSize="11" fontWeight="900" fill="#0D9488">세</text>
    </svg>
  );
}

/* ─────────────────────────────────────────
   🏢 세금·사업 — Purple #8B5CF6 theme
───────────────────────────────────────── */

/* 프리랜서 3.3% */
export function PIconFreelancer33({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: laptop */}
      <rect x="4" y="10" width="28" height="20" rx="3" fill="#7C3AED"/>
      <rect x="7" y="13" width="22" height="14" rx="1" fill="#5B21B6"/>
      <rect x="2" y="30" width="32" height="4" rx="2" fill="#6D28D9"/>
      {/* foreground: 3.3% badge */}
      <circle cx="32" cy="17" r="11" fill="#EDE9FE" opacity="0.96"/>
      <text x="32" y="21" textAnchor="middle" fontSize="9" fontWeight="900" fill="#6D28D9">3.3%</text>
    </svg>
  );
}

/* 마진율 판매가 */
export function PIconProfitMargin({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: shopping bag */}
      <path d="M8 18 L10 38 L34 38 L36 18 Z" fill="#7C3AED"/>
      <path d="M14 18 C14 11 30 11 30 18" stroke="#5B21B6" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* foreground: tag */}
      <rect x="24" y="8" width="18" height="22" rx="4" fill="#EDE9FE" opacity="0.96"/>
      <circle cx="30" cy="15" r="2.5" fill="#7C3AED"/>
      <path d="M28 22 L38 22M28 26 L35 26" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* 종합소득세 */
export function PIconGlobalIncome({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: tax document stack */}
      <rect x="3" y="10" width="24" height="30" rx="4" fill="#8B5CF6"/>
      <rect x="7" y="16" width="14" height="2.5" rx="1.25" fill="#C4B5FD"/>
      <rect x="7" y="21" width="10" height="2.5" rx="1.25" fill="#C4B5FD"/>
      <rect x="7" y="26" width="12" height="2.5" rx="1.25" fill="#C4B5FD"/>
      {/* background second doc */}
      <rect x="9" y="6" width="24" height="30" rx="4" fill="#7C3AED" opacity="0.7"/>
      {/* foreground: tax seal */}
      <circle cx="32" cy="30" r="11" fill="#EDE9FE" opacity="0.96"/>
      <text x="32" y="34" textAnchor="middle" fontSize="10" fontWeight="900" fill="#6D28D9">종소세</text>
    </svg>
  );
}

/* 부가가치세 */
export function PIconVat({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: receipt */}
      <rect x="6" y="4" width="22" height="32" rx="3" fill="#7C3AED"/>
      <path d="M6 36 Q9 33 12 36 Q15 33 18 36 Q21 33 24 36 Q27 33 28 36 L28 39 L6 39Z" fill="#5B21B6"/>
      <rect x="10" y="10" width="14" height="2" rx="1" fill="#C4B5FD"/>
      <rect x="10" y="15" width="10" height="2" rx="1" fill="#C4B5FD"/>
      {/* foreground: VAT badge */}
      <circle cx="30" cy="16" r="12" fill="#EDE9FE" opacity="0.96"/>
      <text x="30" y="20" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#6D28D9">VAT</text>
    </svg>
  );
}

/* ─────────────────────────────────────────
   📈 자산·투자 — Orange/Amber theme
───────────────────────────────────────── */

/* 주식 물타기 */
export function PIconStockAverage({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: candlestick chart */}
      <rect x="5" y="26" width="6" height="14" rx="2" fill="#D97706"/>
      <rect x="7" y="20" width="2" height="6" fill="#D97706"/>
      <rect x="15" y="16" width="6" height="24" rx="2" fill="#F59E0B"/>
      <rect x="17" y="10" width="2" height="6" fill="#F59E0B"/>
      <rect x="25" y="8" width="6" height="32" rx="2" fill="#D97706"/>
      <rect x="27" y="4" width="2" height="4" fill="#D97706"/>
      {/* foreground: average line badge */}
      <rect x="20" y="4" width="22" height="16" rx="4" fill="#FEF3C7" opacity="0.96"/>
      <path d="M23 12 L27 9 L31 13 L35 8 L39 11" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

/* 예적금 */
export function PIconSavings({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: piggy bank */}
      <ellipse cx="18" cy="24" rx="14" ry="13" fill="#F59E0B"/>
      <circle cx="28" cy="16" r="5" fill="#D97706"/>
      <ellipse cx="10" cy="22" rx="3" ry="5" fill="#D97706"/>
      <rect x="13" y="34" width="5" height="6" rx="2" fill="#D97706"/>
      <rect x="20" y="34" width="5" height="6" rx="2" fill="#D97706"/>
      {/* foreground: coin */}
      <circle cx="32" cy="32" r="11" fill="#FEF3C7" opacity="0.96"/>
      <circle cx="32" cy="32" r="7" fill="#FDE68A" opacity="0.8"/>
      <text x="32" y="36" textAnchor="middle" fontSize="9" fontWeight="900" fill="#B45309">이자</text>
    </svg>
  );
}

/* 복리 수익 */
export function PIconCompound({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: upward curve */}
      <rect x="3" y="4" width="30" height="32" rx="4" fill="#F59E0B"/>
      <path d="M6 34 C10 34 14 28 18 22 S26 10 32 8" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* dots on curve */}
      <circle cx="10" cy="30" r="2.5" fill="white" opacity="0.8"/>
      <circle cx="18" cy="22" r="2.5" fill="white" opacity="0.8"/>
      <circle cx="28" cy="12" r="2.5" fill="white" opacity="0.8"/>
      {/* foreground: x2 multiplier */}
      <circle cx="32" cy="32" r="12" fill="#FEF3C7" opacity="0.96"/>
      <text x="32" y="37" textAnchor="middle" fontSize="12" fontWeight="900" fill="#B45309">×2</text>
    </svg>
  );
}

/* 배당세 */
export function PIconDividendTax({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: pie chart */}
      <circle cx="18" cy="20" r="15" fill="#D97706"/>
      <path d="M18 20 L18 5 A15 15 0 0 1 31 26 Z" fill="#F59E0B"/>
      <path d="M18 20 L31 26 A15 15 0 0 1 5 26 Z" fill="#B45309"/>
      {/* foreground: dividend arrow */}
      <circle cx="32" cy="32" r="12" fill="#FEF3C7" opacity="0.96"/>
      <path d="M28 36 L32 28 L36 36" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="29" y1="34" x2="35" y2="34" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* 코인·해외주식 양도세 */
export function PIconCapitalGains({ size = defaultProps.size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* background: globe / coin */}
      <circle cx="18" cy="20" r="15" fill="#F59E0B"/>
      <ellipse cx="18" cy="20" rx="6" ry="15" stroke="#FDE68A" strokeWidth="1.5" fill="none"/>
      <line x1="3" y1="20" x2="33" y2="20" stroke="#FDE68A" strokeWidth="1.5"/>
      <line x1="5" y1="13" x2="31" y2="13" stroke="#FDE68A" strokeWidth="1"/>
      <line x1="5" y1="27" x2="31" y2="27" stroke="#FDE68A" strokeWidth="1"/>
      {/* foreground: 22% tax badge */}
      <circle cx="32" cy="32" r="12" fill="#FEF3C7" opacity="0.96"/>
      <text x="32" y="36" textAnchor="middle" fontSize="9" fontWeight="900" fill="#B45309">22%</text>
    </svg>
  );
}
