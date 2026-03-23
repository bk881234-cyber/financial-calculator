import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, ALL_CALCULATORS } from '../data/calculators';

import {
  PIconNetPay, PIconSeverance, PIconUnemployment, PIconPartTime, PIconYearEndTax,
  PIconLoan, PIconDsrLimit, PIconRentConversion, PIconBrokerageFee, PIconPropertyTax,
  PIconFreelancer33, PIconGlobalIncome, PIconVat, PIconProfitMargin,
  PIconStockAverage, PIconSavings, PIconCompound, PIconDividendTax, PIconCapitalGains
} from '../components/PremiumIcons';

const iconMap = {
  'net-pay': PIconNetPay,
  'severance': PIconSeverance,
  'unemployment': PIconUnemployment,
  'part-time': PIconPartTime,
  'year-end-tax': PIconYearEndTax,
  'loan-interest': PIconLoan,
  'dsr-limit': PIconDsrLimit,
  'rent-conversion': PIconRentConversion,
  'brokerage-fee': PIconBrokerageFee,
  'property-tax': PIconPropertyTax,
  'freelancer-33': PIconFreelancer33,
  'global-income': PIconGlobalIncome,
  'vat': PIconVat,
  'profit-margin': PIconProfitMargin,
  'stock-average': PIconStockAverage,
  'savings': PIconSavings,
  'compound': PIconCompound,
  'dividend-tax': PIconDividendTax,
  'capital-gains': PIconCapitalGains,
};

/* ── 검색 아이콘 (인라인 SVG) ── */
function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ── 개별 계산기 카드 ── */
function CalcCard({ item, categoryColorVar }) {
  const navigate = useNavigate();
  const IconComponent = iconMap[item.id];

  function handleClick() {
    if (item.available) navigate(item.path);
  }

  return (
    <button
      className={`portal-card${item.available ? ' portal-card--available' : ' portal-card--soon'}`}
      onClick={handleClick}
      disabled={!item.available}
      aria-label={item.title}
    >
      <span className={`portal-card-icon portal-card-icon--${categoryColorVar}`}>
        {IconComponent ? <IconComponent /> : item.emoji}
      </span>
      <span className="portal-card-body">
        <span className="portal-card-title">{item.title}</span>
        <span className="portal-card-desc">{item.desc}</span>
      </span>
      {item.available ? (
        <span className="portal-card-arrow">›</span>
      ) : (
        <span className="portal-card-badge">준비중</span>
      )}
    </button>
  );
}

/* ── 카테고리 섹션 ── */
function CategorySection({ category }) {
  return (
    <section className="portal-category">
      <div className="portal-category-header">
        <h2 className="portal-category-title">{category.label}</h2>
      </div>
      <div className="portal-card-grid">
        {category.items.map((item) => (
          <CalcCard key={item.id} item={item} categoryColorVar={category.colorVar} />
        ))}
      </div>
    </section>
  );
}

/* ── 포털 홈 페이지 ── */
export default function HomePage() {
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return CATEGORIES;
    const q = query.trim().toLowerCase();
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          cat.label.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  const totalCount = CATEGORIES.reduce((s, c) => s + c.items.length, 0);
  const availableCount = ALL_CALCULATORS.filter((c) => c.available).length;

  return (
    <div className="portal-home">
      {/* ── 홈 헤더 ── */}
      <header className="portal-home-header" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: '16px 0 0', display: 'flex', justifyContent: 'center' }}>
        <div className="portal-home-header-content" style={{ width: '100%', maxWidth: '800px', padding: '0 20px', background: 'transparent', border: 'none', boxShadow: 'none' }}>
          <div className="portal-home-header-inner">
            <img src="/vl_icon.png" alt="로고" className="portal-home-logo" />
            <div>
              <h1 className="portal-home-title" style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.8px' }}>생활 금융 계산기</h1>
              <p className="portal-home-subtitle">
                대출·세금·연봉·투자, 필요한 계산기를 바로 찾아보세요
              </p>
            </div>
          </div>

          {/* 검색창 */}
          <div className="portal-search-wrap">
            <span className="portal-search-icon"><IconSearch /></span>
            <input
              className="portal-search-input"
              type="text"
              placeholder="계산기 이름을 검색하세요 (예: 퇴직, 연말, DSR)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="portal-search-clear" onClick={() => setQuery('')}>✕</button>
            )}
          </div>
        </div>
      </header>

      {/* ── 카테고리 목록 ── */}
      <main className="portal-main">
        {filteredCategories.length === 0 ? (
          <div className="portal-empty">
            <p>"{query}"에 해당하는 계산기가 없습니다.</p>
            <button className="portal-empty-reset" onClick={() => setQuery('')}>
              전체 보기
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <CategorySection key={cat.id} category={cat} />
          ))
        )}
      </main>

      {/* ── 푸터 ── */}
      <footer className="app-footer">
        계산 결과는 참고용이며 실제 금융상품과 차이가 있을 수 있습니다.
      </footer>
    </div>
  );
}
