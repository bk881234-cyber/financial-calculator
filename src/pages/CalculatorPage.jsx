import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

/* ── 아이콘 (인라인 SVG) ── */
function IconArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── 계산기 페이지 래퍼 ── */
export default function CalculatorPage({ title, seoTitle, seoDescription, seoKeywords, seoSchema, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  useSEO({
    title: seoTitle || title,
    description: seoDescription,
    keywords: seoKeywords,
    schemaMarkup: seoSchema,
    urlPath: location.pathname
  });

  function handleCopyLink() {
    const url = window.location.origin + location.pathname;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // fallback: select the URL via prompt
      window.prompt('아래 URL을 복사하세요:', url);
    });
  }

  return (
    <div className="calc-page">
      {/* ── 계산기 페이지 헤더 ── */}
      <header className="calc-page-header">
        <button
          className="calc-page-back"
          onClick={() => navigate('/')}
          aria-label="홈으로"
        >
          <IconArrowLeft />
        </button>

        <h1 className="calc-page-title">{title}</h1>

        <button
          className={`calc-page-copy${copied ? ' calc-page-copy--done' : ''}`}
          onClick={handleCopyLink}
          aria-label="링크 복사"
        >
          {copied ? <IconCheck /> : <IconLink />}
          <span>{copied ? '복사됨!' : '링크 복사'}</span>
        </button>
      </header>

      {/* ── 계산기 본문 ── */}
      <main className="main-content">
        {children}
      </main>

      {/* ── 푸터 ── */}
      <footer className="app-footer">
        계산 결과는 참고용이며 실제 금융상품과 차이가 있을 수 있습니다.
      </footer>
    </div>
  );
}
