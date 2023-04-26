const navConfig = [
  {
    label: '핵심 정보',
    href: '/information',
    children: [
      { label: '건강기능식품이란?', href: '/health-functional-food' },
      { label: '안전한 건강기능식품 선택요령', href: '/guide' },
      { label: '쏙쏙 건강 정보', href: '/post', linked: ['/post-detail'] },
    ],
  },
  {
    label: '건강기능식품 검색',
    href: '/search',
    children: [
      { label: '제품 검색', href: '/product' },
      { label: '원료 검색', href: '/raw_material' },
      { label: '기능성 검색', href: '/functionality' },
      { label: '의약품 병용 섭취 정보', href: '/concomitant_use' },
    ],
  },
  {
    label: '위해 정보',
    href: '/riskinformation',
    children: [
      { label: '회수 판매 중지 제품 정보', href: '/domestic_food_danger' },
      { label: '해외직구 위해 식품 차단 정보', href: '/oversea_food_danger' },
      { label: '허위과대광고 현황', href: '/false_advertising' },
      { label: '이상사례 현황', href: '/adverse_events' },
    ],
  },
  {
    label: '건강 계산기',
    href: '/calculator',
    children: [
      { label: '건강기능식품 중복 섭취 확인', href: '/intake' },
      { label: 'BMI 계산기', href: '/bmi' },
      { label: '칼로리 사전', href: '/calorie_dictionary' },
      // { label: '운동 칼로리 계산기', href: '/13' },
    ],
  },
  {
    label: '알림마당',
    href: '/hsin',
    children: [
      { label: 'HS-IN소개', href: '/introduce' },
      { label: '공지사항', href: '/notices' },
      { label: '캠페인', href: '/campaign' },
      { label: '뉴스자료', href: '/news' },
    ],
  },
];

export const flattenNavConfig = navConfig.map(({href, children}) => {
  return children.map(({href: cHref}) => href + cHref);
});

export default navConfig;