import { useEffect } from 'react';

export default function useSEO({ title, description, keywords, schemaMarkup, urlPath }) {
  useEffect(() => {
    // 1. Update Title
    const siteTitle = '생활 금융 계산기';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || `${fullTitle} - 쉽고 빠른 금융 계산 결과 확인하기`;

    // 3. Update Meta Keywords
    if (keywords) {
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (!metaKey) {
        metaKey = document.createElement('meta');
        metaKey.name = 'keywords';
        document.head.appendChild(metaKey);
      }
      metaKey.content = keywords;
    }

    // 4. Update JSON-LD Schema for SEO
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    const canonicalUrl = window.location.origin + (urlPath || window.location.pathname);
    
    // Default WebApplication Schema
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": fullTitle,
      "description": metaDesc.content,
      "url": canonicalUrl,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "KRW"
      }
    };

    // If specific schema is provided, merge it with the contextual wrapper
    const finalSchema = schemaMarkup ? {
      "@context": "https://schema.org",
      "@graph": [ defaultSchema, schemaMarkup ]
    } : defaultSchema;

    script.textContent = JSON.stringify(finalSchema);

    // Optional: Add/Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    return () => {
        // Cleanup title when navigating away
        document.title = siteTitle;
    };
  }, [title, description, keywords, schemaMarkup, urlPath]);
}
