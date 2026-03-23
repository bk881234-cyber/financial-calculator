import React from 'react';

// 공통 프롭스
const defaultProps = {
  size: 42,
  color: 'currentColor',
};

/* ── 직장인·급여 (Blue) ── */
export function PIconNetPay({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 15H16C14.3431 15 13 13.6569 13 12C13 10.3431 14.3431 9 16 9H21V15H18Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16.5" cy="12" r="1.5" fill={color}/>
    </svg>
  );
}

export function PIconSeverance({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="12" height="16" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 4V3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 10H15M9 14H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconUnemployment({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 21V11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M19 21V11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 21V11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 21V11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 3L2 10H22L12 3Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconPartTime({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 7V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconYearEndTax({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16V12M12 16V8M16 16V14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── 부동산·대출 (Teal) ── */
export function PIconLoan({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7H22L12 2Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 7V21M20 7V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 11V17M12 11V17M16 11V17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 21H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconDsrLimit({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 18V12L16 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="2" fill={color} stroke={color} strokeWidth="1.5"/>
      <path d="M3 12H5M19 12H21M12 3V5M12 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function PIconRentConversion({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9L12 2L21 9V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V9Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 14L8 12M8 12L10 10M8 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 18L16 16M16 16L14 14M16 16H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconBrokerageFee({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12L11 14L21 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="15" r="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8.5 13.5L16 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function PIconPropertyTax({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22H20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="6" y="8" width="12" height="14" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2L6 8H18L12 2Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 12H14M10 16H14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ── 세금·사업 (Purple) ── */
export function PIconFreelancer33({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="16" height="11" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 20H22L20 16H4L2 20Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconGlobalIncome({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13H8M16 17H8M10 9H8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function PIconVat({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 14H15M9 10H15M6 4V20L8.5 18.5L11 20L13.5 18.5L16 20L18.5 18.5L21 20V4L18.5 5.5L16 4L13.5 5.5L11 4L8.5 5.5L6 4Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── 자산증식·투자 (Green) ── */
export function PIconStockAverage({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3V21H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14L11 10L14 13L20 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 12V7H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14" cy="13" r="2" fill={color} />
      <circle cx="7" cy="14" r="2" fill={color} fillOpacity="0.5" />
    </svg>
  );
}

export function PIconSavings({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="16" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 10V11M12 13V14M10 12H11M13 12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 8H21M3 16H21" stroke={color} strokeWidth="1.5" strokeOpacity="0.5"/>
    </svg>
  );
}

export function PIconCompound({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12C12 12 10 3 6 3C4 3 2 5 2 7C2 11 12 12 12 12Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12C12 12 14 3 18 3C20 3 22 5 22 7C22 11 12 12 12 12Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconDividendTax({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 12A10 10 0 0 0 12 2V12H22Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PIconCapitalGains({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 8H14C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12H10V8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 12H14.5C15.8807 12 17 13.1193 17 14.5C17 15.8807 15.8807 17 14.5 17H10V12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 6V8M14 6V8M11 17V19M14 17V19" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ── 추가 계산기 ── */
export function PIconProfitMargin({ size = defaultProps.size, color = defaultProps.color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20Z" fill={color} stroke={color} strokeWidth="1.5"/>
      <path d="M20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" fill={color} stroke={color} strokeWidth="1.5"/>
      <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16 9.68 16H19.4C19.8693 16 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 10L13 12M15 8L11 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
