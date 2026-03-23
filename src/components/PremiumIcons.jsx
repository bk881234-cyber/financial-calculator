/**
 * Material Symbols Outlined — wght 200 (thin), clean line icons
 * Requires: Google Material Symbols font in index.html
 */

const iconStyle = (color) => ({
  fontFamily: "'Material Symbols Outlined'",
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontSize: '28px',
  lineHeight: 1,
  letterSpacing: 'normal',
  textTransform: 'none',
  display: 'inline-block',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
  direction: 'ltr',
  WebkitFontFeatureSettings: "'liga'",
  WebkitFontSmoothing: 'antialiased',
  fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
  color,
  userSelect: 'none',
});

const SKY = '#0EA5E9';
const GRN = '#22C55E';

/* ── 💼 직장인·급여 ── */
export function PIconNetPay()       { return <span style={iconStyle(SKY)}>payments</span>; }
export function PIconSeverance()    { return <span style={iconStyle(SKY)}>event_available</span>; }
export function PIconUnemployment() { return <span style={iconStyle(SKY)}>support_agent</span>; }
export function PIconPartTime()     { return <span style={iconStyle(SKY)}>schedule</span>; }
export function PIconYearEndTax()   { return <span style={iconStyle(SKY)}>receipt_long</span>; }

/* ── 🏠 부동산·대출 ── */
export function PIconLoan()            { return <span style={iconStyle(SKY)}>home</span>; }
export function PIconDsrLimit()        { return <span style={iconStyle(SKY)}>monitoring</span>; }
export function PIconRentConversion()  { return <span style={iconStyle(SKY)}>swap_horiz</span>; }
export function PIconBrokerageFee()    { return <span style={iconStyle(SKY)}>key</span>; }
export function PIconPropertyTax()     { return <span style={iconStyle(SKY)}>account_balance</span>; }

/* ── 🏢 세금·사업 ── */
export function PIconFreelancer33()  { return <span style={iconStyle(GRN)}>laptop_mac</span>; }
export function PIconProfitMargin()  { return <span style={iconStyle(GRN)}>shopping_bag</span>; }
export function PIconGlobalIncome()  { return <span style={iconStyle(GRN)}>description</span>; }
export function PIconVat()           { return <span style={iconStyle(GRN)}>receipt</span>; }

/* ── 📈 자산·투자 ── */
export function PIconStockAverage()  { return <span style={iconStyle(SKY)}>candlestick_chart</span>; }
export function PIconSavings()       { return <span style={iconStyle(SKY)}>savings</span>; }
export function PIconCompound()      { return <span style={iconStyle(GRN)}>auto_graph</span>; }
export function PIconDividendTax()   { return <span style={iconStyle(GRN)}>pie_chart</span>; }
export function PIconCapitalGains()  { return <span style={iconStyle(GRN)}>public</span>; }
