/**
 * 포털 계산기 카테고리 & 항목 정의
 * available: true  → 실제 계산기 페이지로 이동
 * available: false → 준비중 표시
 */

export const CATEGORIES = [
  {
    id: 'salary',
    label: '직장인·급여',
    emoji: '💼',
    colorVar: 'blue',
    items: [
      {
        id: 'net-pay',
        title: '연봉·월급 실수령액',
        desc: '4대보험·소득세 공제 후 실제 수령액',
        path: '/calc/salary/net-pay',
        available: true,
        emoji: '💰',
      },
      {
        id: 'severance',
        title: '퇴직금',
        desc: '이직·퇴사 시 퇴직금 예상 금액',
        path: '/calc/salary/severance',
        available: true,
        emoji: '📋',
      },
      {
        id: 'unemployment',
        title: '실업급여 수급액',
        desc: '퇴직 후 실업급여 수령 가능 금액',
        path: '/calc/salary/unemployment',
        available: true,
        emoji: '🏦',
      },
      {
        id: 'part-time',
        title: '주휴수당·알바 급여',
        desc: '시급 기준 주휴수당 포함 급여',
        path: '/calc/salary/part-time',
        available: true,
        emoji: '⏰',
      },
      {
        id: 'year-end-tax',
        title: '연말정산 시뮬레이터',
        desc: '소득공제·세액공제 예상 환급액',
        path: '/calc/salary/year-end-tax',
        available: true,
        emoji: '📊',
      },
    ],
  },
  {
    id: 'real-estate',
    label: '부동산·대출',
    emoji: '🏠',
    colorVar: 'green',
    items: [
      {
        id: 'loan-interest',
        title: '대출 이자',
        desc: '원리금균등·원금균등·만기일시 상환',
        path: '/calc/real-estate/loan-interest',
        available: true,
        emoji: '🏦',
      },
      {
        id: 'dsr-limit',
        title: 'LTV / DSR 한도',
        desc: '내가 받을 수 있는 최대 대출 한도',
        path: '/calc/real-estate/dsr-limit',
        available: true,
        emoji: '📐',
      },
      {
        id: 'rent-conversion',
        title: '전월세 전환',
        desc: '보증금↔월세 전환율 계산',
        path: '/calc/real-estate/rent-conversion',
        available: true,
        emoji: '🔄',
      },
      {
        id: 'brokerage-fee',
        title: '부동산 중개수수료',
        desc: '매매·전세·월세 복비 자동 계산',
        path: '/calc/real-estate/brokerage-fee',
        available: true,
        emoji: '🤝',
      },
      {
        id: 'property-tax',
        title: '취득세·양도소득세',
        desc: '부동산 매매 시 세금 예상',
        path: '/calc/real-estate/property-tax',
        available: true,
        emoji: '🏛️',
      },
    ],
  },
  {
    id: 'tax',
    label: '세금·사업',
    emoji: '🏢',
    colorVar: 'blue',
    items: [
      {
        id: 'freelancer-33',
        title: '프리랜서 3.3% 소득',
        desc: '원천징수 후 실수령액 계산',
        path: '/calc/tax/freelancer-33',
        available: true,
        emoji: '💻',
      },
      {
        id: 'profit-margin',
        title: '마진율 및 적정 판매가',
        desc: '스마트스토어 등 쇼핑몰 판매 순수익 계산',
        path: '/calc/tax/profit-margin',
        available: true,
        emoji: '🛒',
      },
      {
        id: 'global-income',
        title: '종합소득세 예상',
        desc: 'N잡·사업소득 종합소득세 시뮬레이션',
        path: '/calc/tax/global-income',
        available: true,
        emoji: '📝',
      },
      {
        id: 'vat',
        title: '부가가치세(VAT)',
        desc: '개인사업자 부가세 예정·확정 신고',
        path: '/calc/tax/vat',
        available: true,
        emoji: '🧾',
      },
    ],
  },
  {
    id: 'invest',
    label: '자산증식·투자',
    emoji: '📈',
    colorVar: 'green',
    items: [
      {
        id: 'stock-average',
        title: '주식 평균단가 (물타기)',
        desc: '여러 번 매수 시 평균 단가 계산',
        path: '/calc/invest/stock-average',
        available: true,
        emoji: '📉',
      },
      {
        id: 'savings',
        title: '예·적금 만기 이자',
        desc: '세금 공제 후 실제 이자 수익',
        path: '/calc/invest/savings',
        available: true,
        emoji: '🏧',
      },
      {
        id: 'compound',
        title: '복리 수익 (목돈 모으기)',
        desc: '월 적립 + 복리로 목돈 형성',
        path: '/calc/invest/compound',
        available: true,
        emoji: '🌱',
      },
      {
        id: 'dividend-tax',
        title: '배당금·금융소득 종합과세',
        desc: '2천만 원 초과 시 종합과세 시뮬레이션',
        path: '/calc/invest/dividend-tax',
        available: true,
        emoji: '💹',
      },
      {
        id: 'capital-gains',
        title: '코인·해외주식 양도소득세',
        desc: '가상자산·해외주식 양도세 계산',
        path: '/calc/invest/capital-gains',
        available: true,
        emoji: '🪙',
      },
    ],
  },
];

/** 전체 계산기 flat 목록 (검색용) */
export const ALL_CALCULATORS = CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, categoryLabel: cat.label, categoryId: cat.id }))
);
