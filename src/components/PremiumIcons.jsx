
/**
 * Premium Icons — Modern Line Back + White Glassmorphism Front
 * 
 * Design rule:
 *  - Back: thin stroke line art icon (1.5–2px, rounded, modern minimal)
 *  - Front: white solid shape overlapping bottom-right corner
 *  - Badge text / symbol: colored to match back (sky blue or green)
 * 
 * Colors: Sky #0EA5E9 | Green #22C55E
 */

const SKY = '#0EA5E9';
const GRN = '#22C55E';
const S = 44;

/* ────────────────────────────────────────────────
   💼 직장인·급여 — Sky Blue
──────────────────────────────────────────────── */

export function PIconNetPay({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line briefcase */}
      <rect x="5" y="14" width="24" height="20" rx="3" stroke={SKY} strokeWidth="1.8"/>
      <path d="M14 14v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" stroke={SKY} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="5" y1="22" x2="29" y2="22" stroke={SKY} strokeWidth="1.5" opacity="0.5"/>
      {/* Front: white badge */}
      <circle cx="32" cy="32" r="11" fill="white" opacity="0.95"/>
      <text x="32" y="36.5" textAnchor="middle" fontSize="11" fontWeight="900" fill={SKY}>₩</text>
    </svg>
  );
}

export function PIconSeverance({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line calendar */}
      <rect x="4" y="10" width="24" height="22" rx="3" stroke={SKY} strokeWidth="1.8"/>
      <line x1="4" y1="17" x2="28" y2="17" stroke={SKY} strokeWidth="1.5"/>
      <line x1="11" y1="5" x2="11" y2="14" stroke={SKY} strokeWidth="2" strokeLinecap="round"/>
      <line x1="21" y1="5" x2="21" y2="14" stroke={SKY} strokeWidth="2" strokeLinecap="round"/>
      <rect x="9" y="22" width="4" height="4" rx="1" fill={SKY} opacity="0.4"/>
      <rect x="16" y="22" width="4" height="4" rx="1" fill={SKY} opacity="0.4"/>
      {/* Front: white badge */}
      <circle cx="32" cy="31" r="11" fill="white" opacity="0.95"/>
      <path d="M27 31l4 4 6.5-7" stroke={GRN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconUnemployment({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line person */}
      <circle cx="15" cy="12" r="6.5" stroke={SKY} strokeWidth="1.8"/>
      <path d="M4 35c0-7.7 4.9-12 11-12s11 4.3 11 12" stroke={SKY} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Front: white shield */}
      <path d="M24 20 L39 24 L39 33 C39 38 31.5 42 31.5 42 C31.5 42 24 38 24 33 Z" fill="white" opacity="0.96"/>
      <path d="M28 32l3 3 5.5-6" stroke={GRN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconPartTime({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line clock */}
      <circle cx="17" cy="20" r="14" stroke={SKY} strokeWidth="1.8"/>
      <path d="M17 10v11l6 3.5" stroke={SKY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Front: white coin */}
      <circle cx="32" cy="32" r="11" fill="white" opacity="0.96"/>
      <circle cx="32" cy="32" r="7" stroke={GRN} strokeWidth="1.5"/>
      <text x="32" y="36" textAnchor="middle" fontSize="8" fontWeight="900" fill={GRN}>원/시</text>
    </svg>
  );
}

export function PIconYearEndTax({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line document */}
      <rect x="5" y="4" width="22" height="30" rx="3" stroke={SKY} strokeWidth="1.8"/>
      <line x1="9" y1="11" x2="23" y2="11" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="16" x2="20" y2="16" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="21" x2="22" y2="21" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="26" x2="17" y2="26" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Front: white badge with return arrow */}
      <circle cx="31" cy="31" r="12" fill="white" opacity="0.96"/>
      <path d="M26 31 Q31 24 37 31" stroke={GRN} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M34.5 28.5l2.5 2.5-2.5 2.5" stroke={GRN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ────────────────────────────────────────────────
   🏠 부동산·대출 — Sky Blue
──────────────────────────────────────────────── */

export function PIconLoan({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line house */}
      <path d="M5 21L17 8l12 13v14H5z" stroke={SKY} strokeWidth="1.8" strokeLinejoin="round"/>
      <rect x="12" y="25" width="10" height="10" rx="1.5" stroke={SKY} strokeWidth="1.5"/>
      {/* Front: white percent badge */}
      <circle cx="31" cy="17" r="12" fill="white" opacity="0.96"/>
      <text x="31" y="22" textAnchor="middle" fontSize="13" fontWeight="900" fill={SKY}>%</text>
    </svg>
  );
}

export function PIconDsrLimit({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line rising bars */}
      <rect x="4" y="28" width="7" height="12" rx="1.5" stroke={SKY} strokeWidth="1.5"/>
      <rect x="14" y="19" width="7" height="21" rx="1.5" stroke={SKY} strokeWidth="1.5"/>
      <rect x="24" y="10" width="7" height="30" rx="1.5" stroke={SKY} strokeWidth="1.5"/>
      {/* Front: white DSR badge */}
      <circle cx="33" cy="16" r="10" fill="white" opacity="0.96"/>
      <text x="33" y="20" textAnchor="middle" fontSize="8" fontWeight="900" fill={SKY}>DSR</text>
    </svg>
  );
}

export function PIconRentConversion({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line building */}
      <rect x="3" y="15" width="20" height="24" rx="2" stroke={SKY} strokeWidth="1.8"/>
      <path d="M3 15 L13 7 L23 15" stroke={SKY} strokeWidth="1.8" strokeLinejoin="round"/>
      <rect x="7" y="22" width="5" height="5" rx="1" stroke={SKY} strokeWidth="1.3"/>
      <rect x="14" y="22" width="5" height="5" rx="1" stroke={SKY} strokeWidth="1.3"/>
      {/* Front: white arrow badge */}
      <circle cx="32" cy="31" r="11" fill="white" opacity="0.96"/>
      <path d="M28 31h8" stroke={GRN} strokeWidth="2" strokeLinecap="round"/>
      <path d="M33 27l4 4-4 4" stroke={GRN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconBrokerageFee({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line key */}
      <circle cx="13" cy="18" r="9" stroke={SKY} strokeWidth="1.8"/>
      <line x1="20" y1="18" x2="38" y2="18" stroke={SKY} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="34" y1="18" x2="34" y2="24" stroke={SKY} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="29" y1="18" x2="29" y2="22" stroke={SKY} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Front: white receipt badge */}
      <circle cx="31" cy="31" r="11" fill="white" opacity="0.96"/>
      <line x1="26" y1="27" x2="36" y2="27" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="26" y1="31" x2="34" y2="31" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="26" y1="35" x2="31" y2="35" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function PIconPropertyTax({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line government building */}
      <rect x="4" y="19" width="26" height="20" rx="1.5" stroke={SKY} strokeWidth="1.8"/>
      <line x1="4" y1="24" x2="30" y2="24" stroke={SKY} strokeWidth="1.4"/>
      <rect x="17" y="9" width="4" height="12" rx="1" stroke={SKY} strokeWidth="1.5"/>
      <line x1="8" y1="14" x2="30" y2="14" stroke={SKY} strokeWidth="1.4"/>
      <rect x="9" y="28" width="5" height="7" rx="1" stroke={SKY} strokeWidth="1.3"/>
      <rect x="18" y="28" width="5" height="7" rx="1" stroke={SKY} strokeWidth="1.3"/>
      {/* Front: white badge */}
      <circle cx="32" cy="15" r="11" fill="white" opacity="0.96"/>
      <text x="32" y="19.5" textAnchor="middle" fontSize="10" fontWeight="900" fill={SKY}>세</text>
    </svg>
  );
}

/* ────────────────────────────────────────────────
   🏢 세금·사업 — Green
──────────────────────────────────────────────── */

export function PIconFreelancer33({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line laptop */}
      <rect x="4" y="10" width="26" height="18" rx="2.5" stroke={GRN} strokeWidth="1.8"/>
      <rect x="7" y="13" width="20" height="12" rx="1" stroke={GRN} strokeWidth="1.3"/>
      <path d="M2 28h30" stroke={GRN} strokeWidth="2" strokeLinecap="round"/>
      <path d="M13 28l-2 4h12l-2-4" stroke={GRN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Front: white 3.3% badge */}
      <circle cx="33" cy="17" r="11" fill="white" opacity="0.96"/>
      <text x="33" y="21" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={GRN}>3.3%</text>
    </svg>
  );
}

export function PIconProfitMargin({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line shopping bag */}
      <path d="M8 17 L10 38 L32 38 L34 17 Z" stroke={GRN} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 17 C14 10.5 28 10.5 28 17" stroke={GRN} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Front: white tag badge */}
      <circle cx="31" cy="15" r="12" fill="white" opacity="0.96"/>
      <circle cx="28" cy="12" r="2" fill={GRN}/>
      <line x1="26" y1="19" x2="35" y2="10" stroke={GRN} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function PIconGlobalIncome({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line document stack */}
      <rect x="7" y="8" width="20" height="26" rx="3" stroke={GRN} strokeWidth="1.8"/>
      <rect x="3" y="12" width="20" height="26" rx="3" stroke={GRN} strokeWidth="1.5" opacity="0.4"/>
      <line x1="11" y1="16" x2="23" y2="16" stroke={GRN} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="11" y1="21" x2="20" y2="21" stroke={GRN} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="11" y1="26" x2="22" y2="26" stroke={GRN} strokeWidth="1.4" strokeLinecap="round"/>
      {/* Front: white badge */}
      <circle cx="32" cy="31" r="12" fill="white" opacity="0.96"/>
      <text x="32" y="35" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={GRN}>종소세</text>
    </svg>
  );
}

export function PIconVat({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line receipt */}
      <rect x="7" y="4" width="20" height="32" rx="2.5" stroke={GRN} strokeWidth="1.8"/>
      <path d="M7 36 Q10 33 13 36 Q16 33 19 36 Q22 33 27 36" stroke={GRN} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <line x1="11" y1="11" x2="23" y2="11" stroke={GRN} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="11" y1="16" x2="20" y2="16" stroke={GRN} strokeWidth="1.4" strokeLinecap="round"/>
      {/* Front: white VAT badge */}
      <circle cx="32" cy="16" r="12" fill="white" opacity="0.96"/>
      <text x="32" y="21" textAnchor="middle" fontSize="10" fontWeight="900" fill={GRN}>VAT</text>
    </svg>
  );
}

/* ────────────────────────────────────────────────
   📈 자산·투자 — alternating sky / green
──────────────────────────────────────────────── */

export function PIconStockAverage({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line candlestick */}
      <rect x="4" y="26" width="6" height="12" rx="1.5" stroke={SKY} strokeWidth="1.5"/>
      <line x1="7" y1="22" x2="7" y2="26" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="13" y="16" width="6" height="12" rx="1.5" stroke={SKY} strokeWidth="1.5"/>
      <line x1="16" y1="11" x2="16" y2="16" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="22" y="8" width="6" height="13" rx="1.5" stroke={SKY} strokeWidth="1.5"/>
      <line x1="25" y1="4" x2="25" y2="8" stroke={SKY} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Front: white line badge */}
      <circle cx="34" cy="32" r="10" fill="white" opacity="0.96"/>
      <path d="M29 34 L32 30 L35 33 L39 28" stroke={GRN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function PIconSavings({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line piggy bank */}
      <ellipse cx="18" cy="23" rx="13" ry="11.5" stroke={GRN} strokeWidth="1.8"/>
      <circle cx="27" cy="15" r="5" stroke={GRN} strokeWidth="1.5"/>
      <ellipse cx="9.5" cy="22" rx="2.5" ry="4" stroke={GRN} strokeWidth="1.5"/>
      <line x1="13" y1="33" x2="11" y2="38" stroke={GRN} strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="33" x2="20" y2="38" stroke={GRN} strokeWidth="2" strokeLinecap="round"/>
      <line x1="19" y1="15" x2="21" y2="13" stroke={GRN} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Front: white coin badge */}
      <circle cx="32" cy="32" r="11" fill="white" opacity="0.96"/>
      <circle cx="32" cy="32" r="7" stroke={GRN} strokeWidth="1.4"/>
      <text x="32" y="36" textAnchor="middle" fontSize="8.5" fontWeight="900" fill={GRN}>이자</text>
    </svg>
  );
}

export function PIconCompound({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line exponential curve chart */}
      <rect x="3" y="4" width="28" height="28" rx="3" stroke={GRN} strokeWidth="1.8"/>
      <path d="M6 30 C9 30 12 25 16 19 S24 9 30 7" stroke={GRN} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="9" cy="28" r="2" fill={GRN} opacity="0.5"/>
      <circle cx="16" cy="20" r="2" fill={GRN} opacity="0.5"/>
      <circle cx="26" cy="10" r="2" fill={GRN} opacity="0.5"/>
      {/* Front: white x2 badge */}
      <circle cx="33" cy="33" r="11" fill="white" opacity="0.96"/>
      <text x="33" y="38" textAnchor="middle" fontSize="12" fontWeight="900" fill={GRN}>×2</text>
    </svg>
  );
}

export function PIconDividendTax({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line pie chart */}
      <circle cx="17" cy="20" r="14" stroke={SKY} strokeWidth="1.8"/>
      <path d="M17 20 L17 6" stroke={SKY} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M17 20 L30 27" stroke={SKY} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M17 20 L4 27" stroke={SKY} strokeWidth="1.8" strokeLinecap="round" opacity="0.4"/>
      {/* Front: white arrow-up badge */}
      <circle cx="32" cy="32" r="11" fill="white" opacity="0.96"/>
      <path d="M28 36 L32 27 L36 36" stroke={GRN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="29.5" y1="33.5" x2="34.5" y2="33.5" stroke={GRN} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function PIconCapitalGains({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: thin line globe */}
      <circle cx="18" cy="20" r="14" stroke={SKY} strokeWidth="1.8"/>
      <ellipse cx="18" cy="20" rx="5.5" ry="14" stroke={SKY} strokeWidth="1.3"/>
      <line x1="4" y1="20" x2="32" y2="20" stroke={SKY} strokeWidth="1.3"/>
      <line x1="6" y1="13" x2="30" y2="13" stroke={SKY} strokeWidth="1" opacity="0.5"/>
      <line x1="6" y1="27" x2="30" y2="27" stroke={SKY} strokeWidth="1" opacity="0.5"/>
      {/* Front: white 22% badge */}
      <circle cx="32" cy="32" r="12" fill="white" opacity="0.96"/>
      <text x="32" y="37" textAnchor="middle" fontSize="9.5" fontWeight="900" fill={SKY}>22%</text>
    </svg>
  );
}
