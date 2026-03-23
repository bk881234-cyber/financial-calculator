
/**
 * Premium Glassmorphism SVG Icons
 * Colors: Sky Blue (#0EA5E9 base, #BAE6FD light) & Green (#22C55E base, #BBF7D0 light)
 * Style: 2-layer overlapping semi-translucent shapes (glassmorphism on the shapes themselves)
 */

const S = 44; // default size

/* ── Glassmorphism shape helpers ─────────────────────────────────────────────
   bgColor  = solid base color (green or sky-blue)
   fgColor  = lighter semi-transparent overlay
   ─────────────────────────────────────────────────────────────────────────── */

/* ---- SKY BLUE palette ---- */
const SKY   = { solid: '#0EA5E9', glass: 'rgba(186,230,255,0.82)', mid: '#38BDF8' };
/* ---- GREEN palette -------- */
const GRN   = { solid: '#22C55E', glass: 'rgba(187,247,208,0.82)', mid: '#4ADE80' };

/* ── 💼 직장인·급여 ────────────────────────────────────────────────────── */

export function PIconNetPay({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: green document */}
      <rect x="4" y="8" width="22" height="28" rx="4" fill={GRN.solid}/>
      <rect x="8" y="14" width="14" height="2.5" rx="1.2" fill={GRN.glass}/>
      <rect x="8" y="19" width="10" height="2.5" rx="1.2" fill={GRN.glass}/>
      {/* Front: sky-blue coin circle overlapping */}
      <circle cx="30" cy="30" r="12" fill={SKY.solid} opacity="0.25"/>
      <circle cx="30" cy="30" r="12" fill={SKY.glass} style={{backdropFilter:'blur(4px)'}}/>
      <circle cx="30" cy="30" r="8" fill={SKY.solid} opacity="0.4"/>
      <text x="30" y="34.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="#0369A1">₩</text>
    </svg>
  );
}

export function PIconSeverance({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: green calendar */}
      <rect x="4" y="10" width="24" height="22" rx="4" fill={GRN.solid}/>
      <rect x="4" y="14" width="24" height="6" rx="0" fill={GRN.mid} opacity="0.6"/>
      <rect x="11" y="5" width="4" height="10" rx="2" fill="#166534"/>
      <rect x="21" y="5" width="4" height="10" rx="2" fill="#166534"/>
      {/* Front: sky-blue badge */}
      <circle cx="30" cy="30" r="12" fill={SKY.solid} opacity="0.22"/>
      <circle cx="30" cy="30" r="12" fill={SKY.glass}/>
      <path d="M24.5 30.5l4 4 7-8" stroke="#0369A1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconUnemployment({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: green person */}
      <circle cx="16" cy="12" r="7" fill={GRN.solid}/>
      <path d="M4 35c0-8 6-13 12-13s12 5 12 13" fill={GRN.mid}/>
      {/* Front: sky glass shield */}
      <path d="M23 20 L38 24 L38 34 C38 39 30.5 42 30.5 42 C30.5 42 23 39 23 34 Z" fill={SKY.solid} opacity="0.22"/>
      <path d="M23 20 L38 24 L38 34 C38 39 30.5 42 30.5 42 C30.5 42 23 39 23 34 Z" fill={SKY.glass}/>
      <path d="M27 32l3 3 5-6" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconPartTime({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: green clock */}
      <circle cx="18" cy="20" r="15" fill={GRN.solid}/>
      <circle cx="18" cy="20" r="10" fill={GRN.mid} opacity="0.55"/>
      <path d="M18 14v7l4 2.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      {/* Front: sky-blue coin stack */}
      <ellipse cx="32" cy="35" rx="11" ry="5" fill={SKY.glass}/>
      <ellipse cx="32" cy="31" rx="11" ry="5" fill={SKY.solid} opacity="0.3"/>
      <ellipse cx="32" cy="31" rx="11" ry="5" fill={SKY.glass}/>
      <ellipse cx="32" cy="27" rx="11" ry="5" fill={SKY.solid} opacity="0.4"/>
      <ellipse cx="32" cy="27" rx="11" ry="5" fill={SKY.glass}/>
    </svg>
  );
}

export function PIconYearEndTax({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: green doc */}
      <rect x="4" y="4" width="22" height="30" rx="4" fill={GRN.solid}/>
      <rect x="8" y="10" width="14" height="2.5" rx="1.2" fill={GRN.glass}/>
      <rect x="8" y="15" width="10" height="2.5" rx="1.2" fill={GRN.glass}/>
      <rect x="8" y="20" width="12" height="2.5" rx="1.2" fill={GRN.glass}/>
      {/* Front: sky refund circle */}
      <circle cx="30" cy="30" r="12" fill={SKY.solid} opacity="0.22"/>
      <circle cx="30" cy="30" r="12" fill={SKY.glass}/>
      <path d="M25 30 Q30 23 36 30" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M33.5 27.5l2.5 2.5-2.5 2.5" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── 🏠 부동산·대출 ─────────────────────────────────────────────────────── */

export function PIconLoan({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky house */}
      <path d="M5 22L18 8l13 14v16H5z" fill={SKY.solid}/>
      <rect x="12" y="27" width="12" height="11" rx="2" fill="#075985"/>
      {/* Front: green % badge */}
      <circle cx="31" cy="17" r="12" fill={GRN.solid} opacity="0.22"/>
      <circle cx="31" cy="17" r="12" fill={GRN.glass}/>
      <text x="31" y="22" textAnchor="middle" fontSize="12" fontWeight="900" fill="#166534">%</text>
    </svg>
  );
}

export function PIconDsrLimit({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky bar chart */}
      <rect x="4" y="28" width="7" height="12" rx="2" fill={SKY.solid}/>
      <rect x="14" y="18" width="7" height="22" rx="2" fill={SKY.mid}/>
      <rect x="24" y="10" width="7" height="30" rx="2" fill={SKY.solid}/>
      {/* Front: green gauge */}
      <circle cx="33" cy="16" r="10" fill={GRN.solid} opacity="0.22"/>
      <circle cx="33" cy="16" r="10" fill={GRN.glass}/>
      <path d="M33 22 A6 6 0 0 1 27 16" stroke="#166534" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M33 22 A6 6 0 0 0 39 16" stroke={GRN.mid} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="33" y1="16" x2="29" y2="13" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function PIconRentConversion({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky building */}
      <rect x="3" y="14" width="20" height="26" rx="3" fill={SKY.solid}/>
      <path d="M3 14 L13 6 L23 14" fill="#075985"/>
      <rect x="7" y="19" width="5" height="5" rx="1" fill={SKY.glass}/>
      <rect x="14" y="19" width="5" height="5" rx="1" fill={SKY.glass}/>
      <rect x="7" y="27" width="5" height="5" rx="1" fill={SKY.glass}/>
      {/* Front: green arrow building */}
      <rect x="22" y="22" width="20" height="18" rx="3" fill={GRN.solid} opacity="0.22"/>
      <rect x="22" y="22" width="20" height="18" rx="3" fill={GRN.glass}/>
      <path d="M27 23.5 L35 23.5" stroke="#166534" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 21 L35 23.5 L32 26" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconBrokerageFee({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky circle key */}
      <circle cx="15" cy="18" r="12" fill={SKY.solid}/>
      <circle cx="15" cy="18" r="6" fill={SKY.mid} opacity="0.5"/>
      <rect x="24" y="17" width="14" height="3" rx="1.5" fill={SKY.solid}/>
      <rect x="34" y="17" width="3" height="6" rx="1.5" fill={SKY.solid}/>
      {/* Front: green receipt */}
      <rect x="22" y="24" width="18" height="15" rx="3" fill={GRN.solid} opacity="0.22"/>
      <rect x="22" y="24" width="18" height="15" rx="3" fill={GRN.glass}/>
      <rect x="25" y="28" width="12" height="2" rx="1" fill="#166534" opacity="0.5"/>
      <rect x="25" y="32" width="8" height="2" rx="1" fill="#166534" opacity="0.5"/>
    </svg>
  );
}

export function PIconPropertyTax({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky hall */}
      <rect x="4" y="18" width="28" height="22" rx="2" fill={SKY.solid}/>
      <rect x="4" y="18" width="28" height="6" rx="2" fill="#075985"/>
      <rect x="16" y="8" width="4" height="12" rx="1" fill={SKY.solid}/>
      <rect x="8" y="13" width="20" height="4" rx="1" fill="#075985"/>
      <rect x="10" y="25" width="5" height="7" rx="1" fill={SKY.glass}/>
      <rect x="19" y="25" width="5" height="7" rx="1" fill={SKY.glass}/>
      {/* Front: green tax badge */}
      <circle cx="32" cy="14" r="11" fill={GRN.solid} opacity="0.22"/>
      <circle cx="32" cy="14" r="11" fill={GRN.glass}/>
      <text x="32" y="19" textAnchor="middle" fontSize="10" fontWeight="900" fill="#166534">세</text>
    </svg>
  );
}

/* ── 🏢 세금·사업 ─────────────────────────────────────────────────────── */

export function PIconFreelancer33({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: green laptop */}
      <rect x="4" y="10" width="26" height="18" rx="3" fill={GRN.solid}/>
      <rect x="7" y="13" width="20" height="12" rx="1" fill={GRN.mid} opacity="0.5"/>
      <rect x="2" y="28" width="30" height="4" rx="2" fill="#166534"/>
      {/* Front: sky 3.3% badge */}
      <circle cx="32" cy="17" r="12" fill={SKY.solid} opacity="0.22"/>
      <circle cx="32" cy="17" r="12" fill={SKY.glass}/>
      <text x="32" y="21" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#0369A1">3.3%</text>
    </svg>
  );
}

export function PIconProfitMargin({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: green shopping bag */}
      <path d="M8 18 L10 38 L32 38 L34 18 Z" fill={GRN.solid}/>
      <path d="M14 18 C14 11 28 11 28 18" stroke="#166534" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Front: sky price tag */}
      <rect x="24" y="8" width="18" height="20" rx="4" fill={SKY.solid} opacity="0.22"/>
      <rect x="24" y="8" width="18" height="20" rx="4" fill={SKY.glass}/>
      <circle cx="30" cy="14" r="2" fill="#0369A1"/>
      <path d="M27.5 21 L36.5 21" stroke="#0369A1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function PIconGlobalIncome({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: green doc stack */}
      <rect x="3" y="10" width="22" height="28" rx="4" fill={GRN.solid}/>
      <rect x="7" y="15" width="14" height="2.5" rx="1.2" fill={GRN.glass}/>
      <rect x="7" y="20" width="10" height="2.5" rx="1.2" fill={GRN.glass}/>
      <rect x="7" y="25" width="12" height="2.5" rx="1.2" fill={GRN.glass}/>
      <rect x="8" y="6" width="22" height="28" rx="4" fill={GRN.mid} opacity="0.5"/>
      {/* Front: sky seal */}
      <circle cx="32" cy="30" r="12" fill={SKY.solid} opacity="0.22"/>
      <circle cx="32" cy="30" r="12" fill={SKY.glass}/>
      <text x="32" y="34" textAnchor="middle" fontSize="9" fontWeight="900" fill="#0369A1">종소세</text>
    </svg>
  );
}

export function PIconVat({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: green receipt */}
      <rect x="6" y="4" width="20" height="30" rx="3" fill={GRN.solid}/>
      <path d="M6 34 Q9 31 12 34 Q15 31 18 34 Q21 31 24 34 Q26 31 26 34 L26 38 L6 38Z" fill="#166534"/>
      <rect x="10" y="10" width="12" height="2" rx="1" fill={GRN.glass}/>
      <rect x="10" y="15" width="9" height="2" rx="1" fill={GRN.glass}/>
      {/* Front: sky VAT badge */}
      <circle cx="30" cy="16" r="13" fill={SKY.solid} opacity="0.22"/>
      <circle cx="30" cy="16" r="13" fill={SKY.glass}/>
      <text x="30" y="21" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0369A1">VAT</text>
    </svg>
  );
}

/* ── 📈 자산·투자 ─────────────────────────────────────────────────────── */

export function PIconStockAverage({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky candles */}
      <rect x="4" y="26" width="6" height="14" rx="2" fill={SKY.mid}/>
      <rect x="13" y="16" width="6" height="24" rx="2" fill={SKY.solid}/>
      <rect x="22" y="8" width="6" height="32" rx="2" fill={SKY.mid}/>
      {/* Front: green chart line */}
      <rect x="20" y="4" width="22" height="16" rx="4" fill={GRN.solid} opacity="0.22"/>
      <rect x="20" y="4" width="22" height="16" rx="4" fill={GRN.glass}/>
      <path d="M23 12 L27 9 L31 13 L35 8 L39 11" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function PIconSavings({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky piggy */}
      <ellipse cx="18" cy="24" rx="13" ry="12" fill={SKY.solid}/>
      <circle cx="27" cy="16" r="5" fill={SKY.mid} opacity="0.6"/>
      <ellipse cx="10" cy="23" rx="3" ry="4.5" fill="#075985"/>
      <rect x="13" y="33" width="4" height="6" rx="2" fill="#0369A1"/>
      <rect x="20" y="33" width="4" height="6" rx="2" fill="#0369A1"/>
      {/* Front: green coin */}
      <circle cx="32" cy="32" r="11" fill={GRN.solid} opacity="0.22"/>
      <circle cx="32" cy="32" r="11" fill={GRN.glass}/>
      <circle cx="32" cy="32" r="6.5" fill={GRN.mid} opacity="0.5"/>
      <text x="32" y="36" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#166534">이자</text>
    </svg>
  );
}

export function PIconCompound({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky area chart */}
      <rect x="3" y="4" width="28" height="30" rx="4" fill={SKY.solid}/>
      <path d="M6 32 C10 32 14 26 18 20 S26 9 30 7L30 34L6 34Z" fill={SKY.mid} opacity="0.4"/>
      <path d="M6 32 C10 32 14 26 18 20 S26 9 30 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="10" cy="29" r="2.5" fill="white" opacity="0.75"/>
      <circle cx="18" cy="20" r="2.5" fill="white" opacity="0.75"/>
      <circle cx="27" cy="11" r="2.5" fill="white" opacity="0.75"/>
      {/* Front: green x2 badge */}
      <circle cx="32" cy="32" r="12" fill={GRN.solid} opacity="0.22"/>
      <circle cx="32" cy="32" r="12" fill={GRN.glass}/>
      <text x="32" y="37" textAnchor="middle" fontSize="12" fontWeight="900" fill="#166534">×2</text>
    </svg>
  );
}

export function PIconDividendTax({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky pie chart */}
      <circle cx="18" cy="20" r="15" fill={SKY.solid}/>
      <path d="M18 20 L18 5 A15 15 0 0 1 31 26 Z" fill={SKY.mid}/>
      <path d="M18 20 L31 26 A15 15 0 0 1 5 26 Z" fill="#075985"/>
      {/* Front: green dividend arrow */}
      <circle cx="32" cy="32" r="12" fill={GRN.solid} opacity="0.22"/>
      <circle cx="32" cy="32" r="12" fill={GRN.glass}/>
      <path d="M28 36 L32 28 L36 36" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="29.5" y1="34" x2="34.5" y2="34" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function PIconCapitalGains({ size = S }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Back: sky globe */}
      <circle cx="18" cy="20" r="15" fill={SKY.solid}/>
      <ellipse cx="18" cy="20" rx="6" ry="15" stroke={SKY.glass} strokeWidth="1.5" fill="none"/>
      <line x1="3" y1="20" x2="33" y2="20" stroke={SKY.glass} strokeWidth="1.5"/>
      <line x1="5" y1="13" x2="31" y2="13" stroke={SKY.glass} strokeWidth="1"/>
      <line x1="5" y1="27" x2="31" y2="27" stroke={SKY.glass} strokeWidth="1"/>
      {/* Front: green 22% */}
      <circle cx="32" cy="32" r="12" fill={GRN.solid} opacity="0.22"/>
      <circle cx="32" cy="32" r="12" fill={GRN.glass}/>
      <text x="32" y="36" textAnchor="middle" fontSize="9" fontWeight="900" fill="#166534">22%</text>
    </svg>
  );
}
