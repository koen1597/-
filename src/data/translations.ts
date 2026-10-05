export type Language = 'kr' | 'en';

export const TRANSLATIONS = {
  kr: {
    // Brand & Top Header
    brandName: 'KOJIN',
    brandTagline: '코진 (KOJIN) · 커스텀 굿즈 & 주문 제작 스튜디오',
    topBannerNotice: '귀여운 동물 캐릭터부터 고딕 호러 아트까지, 1개부터 내 마음대로 커스텀! 제작 전 1:1 디자인 시안 무료 확인.',
    leadTimeNotice: '제작 및 발송: 2~4영업일 소요',
    artisanCmsBtn: 'KOJIN 관리자 CMS',
    returnToStoreBtn: '고객 스토어로 돌아가기',
    trackOrder: '주문 실시간 배송조회',
    chatWithArtisan: '고객센터 / 1:1 상담 문의',
    bag: '장바구니',
    account: '내 계정',
    masterCmsMode: 'KOJIN 관리자 모드',

    // Nav Links
    navAll: '전체 굿즈',
    navPhoneCases: '캐릭터 폰케이스',
    navKeyHolders: '키링 & 키홀더',
    navMirrors: '동물 손거울',
    navApparel: '커스텀 의류',

    // Hero
    heroBadge: '나만의 맞춤 제작 스튜디오',
    heroTitle: '내가 좋아하는 캐릭터와 감성을 담은, 세상에 단 하나뿐인 커스텀 굿즈.',
    heroSubtitle: '귀여운 딸기 토끼·방긋 쿼카부터 스푸키한 고딕 스컬·사이버 고스트, 레트로 픽셀 아크릴 키홀더, 스트릿 자수 후드까지! 원하는 한글/영문 이니셜과 다채로운 테마를 담아보세요.',
    heroCtaPhoneCase: '인기 폰케이스 커스텀하기',
    heroCtaKeyHolders: '인기 키링 & 키홀더 둘러보기',
    heroCtaConsult: '고객센터 제작 상담하기',
    heroPreviewTitle: '실시간 인터랙티브 프리뷰',
    heroPreviewSub: '호러 & 큐트 실시간 테마 케이스',
    heroArtistStatus: 'KOJIN 제작 랩 및 고객센터 운영 중',
    heroPersonalizeBtn: '이 디자인 커스텀하기 →',

    // Hero Value props
    valueProof: '1:1 디지털 시안 확인 후 제작',
    valueDialogue: '제작 전 1:1 고객센터 상담 지원',
    valueSpeed: '주문 즉시 맞춤 제작 2~4일 내 출고',

    // Catalog & Filter
    catalogTitle: '플레이풀 커스텀 굿즈 셀렉션',
    catalogSubtitle: '원하는 아이템을 클릭해 캐릭터, 컬러, 한글/영문 문구, 홀로그램 마감을 자유롭게 조합해보세요.',
    showingCount: '총 {count}개의 커스텀 굿즈',
    freeEngravingNotice: '이니셜 각인 및 캐릭터 스티커 배치 무료',
    searchPlaceholder: '귀여운 토끼, 고딕 스컬, 유령, 곰돌이, 키링, 손거울 검색...',
    filterAll: '전체 굿즈',

    // Product Card
    personalizeAction: '나만의 디자인 만들기 →',
    craftDays: '일 소요',
    craftedBy: '제작팀',

    // Configurator / Detail Modal
    configuratorBadge: '인터랙티브 3D/2D 커스텀 스튜디오',
    livePreview: '실시간 프리뷰',
    realtimeRender: '실시간 그래픽 반영 중',
    liveSpecManifest: '선택된 커스텀 옵션:',
    askArtisan: '고객센터에 1:1 문의하기',
    tabConfigure: '옵션 커스텀 & 퍼스널라이즈',
    tabDetails: '소재 및 제작 스펙',
    addToBag: '장바구니 담기',
    craftGuarantee: '시안 불만족 시 100% 무료 수정 보장',

    // Customizer form labels
    labelDevice: '스마트폰 기종 선택',
    labelColor: '베이스 컬러 & 범퍼 색상',
    labelCharacter: '캐릭터 그래픽 & 테마 선택',
    labelMonogram: '각인 문구 / 닉네임 (한글·영문)',
    labelInscription: '서브 레터링 / 문구',
    labelFont: '폰트 스타일 (힙스터 / 픽셀 / 볼드 / 레트로)',
    labelFinish: '마감 텍스처 (오로라 홀로그램 / 매트 러버)',
    labelSize: '의류 사이즈',
    labelSpecialNotes: '제작 요청사항 (위치 조정, 선물 포장 등)',
    placeholderNotes: '예: 캐릭터를 살짝 위로 올려주시고 영문 폰트는 굵게 해주세요!',

    // Cart & Checkout
    cartTitle: '내 커스텀 굿즈 바구니',
    emptyCartTitle: '장바구니가 비어 있습니다',
    emptyCartSub: '귀여운 토끼 폰케이스, 고딕 스컬 키링, 동물 손거울을 만들어보세요!',
    browseGoods: '인기 굿즈 보러가기',
    proceedCheckout: '주문 및 안전 결제하기',
    complimentaryShipping: '무료 배송 (KOJIN 부담)',
    proofNotice: '결제 후 24시간 이내 1:1 시안을 전송하며, 고객님 승인 후 실제 제작에 들어갑니다.',
    estimatedTotal: '최종 결제 금액',

    // Checkout Modal
    checkoutTitle: '안전 결제 & 주문서 작성',
    stepContact: '1. 주문자 정보',
    stepShipping: '2. 배송지 입력',
    stepNotes: '3. 제작 요청사항',
    stepPayment: '4. 결제 수단 선택',
    payCard: '신용/체크카드',
    payKakao: '카카오페이 / 네이버페이',
    payEscrow: '에스크로 안심결제 (시안 승인 시 지급)',
    authorizeOrder: '주문 완료 및 제작 요청',
    processingOrder: 'KOJIN 제작팀으로 주문서 전송 중...',

    // Order Tracking
    trackerBadge: '실시간 제작 & 배송 조회',
    orderProgressTitle: '실시간 주문 제작 현황',
    switchOrder: '다른 주문 보기:',
    productionState: '현재 제작 단계',
    assignedMaker: '제작 및 품질 검수',
    logisticsCarrier: '배송 택배사 & 운송장',
    chatBtn: '고객센터 1:1 문의',
    actionRequiredProof: '확인 필요 · 디자인 시안 v',
    proofApprovedText: '시안 승인 완료됨',
    proofRevisionSentText: '수정 요청 전달됨',
    awaitingApprovalText: '고객님 시안 승인 대기 중',
    approveProofBtn: '시안 승인하고 제작 시작 요청하기',
    requestAdjustmentsBtn: '수정 요청하기',
    timelineTitle: '주문 제작 공정 타임라인',
    itemsInRun: '주문 제작 상품 목록',
    shippingRecipient: '수령인 및 배송 정보',

    // Messaging
    messagingTitle: 'KOJIN 고객센터 1:1 상담톡',
    messagePlaceholder: '제작 관련 문의사항 또는 요청을 남겨주세요...',
    sendBtn: '전송',
    trackProgressBtn: '배송 조회',
    reviewProofBtn: '시안 확인',
    quickAskProof: '시안 확인 문의',
    quickAskMaterial: '소재 및 내구성 문의',
    quickAskPlacement: '대량 주문 견적 문의',

    // Admin CMS
    adminTitle: 'KOJIN 주문 제작 관리 시스템 (CMS)',
    adminStaffBadge: 'KOJIN 스태프 전용',
    adminOverview: '제작 현황 대시보드',
    adminOrders: '주문 제작 파이프라인',
    adminMessages: '고객센터 문의 & 상담 관리',
    adminProducts: '상품 카탈로그 CMS',
    adminCategories: '카테고리 분류 CMS',
    futureAccessTitle: '관리자 접속 안내 (상단 버튼 삭제 후 접속 방법)',
    futureAccessNote: '나중에 상단 버튼을 삭제하셔도 브라우저 주소창에 #admin 입력, 키보드 Alt+A (또는 Ctrl+Shift+A), 또는 사이트 최하단 푸터의 자물쇠 링크를 통해 언제든지 이 관리자 화면에 접근하실 수 있습니다.',

    // Footer
    footerEthos: '호러·고딕 스컬부터 귀여운 동물 캐릭터까지, 다채로운 서브컬처 감성을 고품질로 완성하는 1개 커스텀 굿즈 스튜디오입니다.',
    footerCopyright: '© 2026 KOJIN. All rights reserved. Custom Made Goods Studio.',
    staffAccess: '스태프 전용 관리자',
  },

  en: {
    // Brand & Top Header
    brandName: 'KOJIN',
    brandTagline: 'KOJIN · Custom Made Goods & Print Studio',
    topBannerNotice: 'From cute kawaii animals to gothic horror art, custom made from just 1 piece with free 1:1 proof approval.',
    leadTimeNotice: 'Production dispatch: 2–4 business days',
    artisanCmsBtn: 'KOJIN Admin CMS',
    returnToStoreBtn: 'Return to Customer Store',
    trackOrder: 'Live Order Tracker',
    chatWithArtisan: 'Customer Support / 1:1 Inquiry',
    bag: 'Bag',
    account: 'Account',
    masterCmsMode: 'KOJIN Admin Mode',

    // Nav Links
    navAll: 'All Goods',
    navPhoneCases: 'Character Phone Cases',
    navKeyHolders: 'Key Rings & Holders',
    navMirrors: 'Cute Animal Mirrors',
    navApparel: 'Custom Streetwear',

    // Hero
    heroBadge: 'Custom Made Goods Studio',
    heroTitle: 'Goods made with the characters and themes you love, tailored just for you.',
    heroSubtitle: 'From strawberry bunny & quokka pocket mirrors to spooky gothic skulls, cyber ghosts, and embroidered hoodies. Personalize with your name and favorite theme.',
    heroCtaPhoneCase: 'Customize Phone Case',
    heroCtaKeyHolders: 'Explore Key Rings & Holders',
    heroCtaConsult: 'Inquire with Support',
    heroPreviewTitle: 'Live Interactive Preview',
    heroPreviewSub: 'Horror & Cute Live Preview',
    heroArtistStatus: 'KOJIN Production Lab & Support Online',
    heroPersonalizeBtn: 'Personalize This Model →',

    // Hero Value props
    valueProof: '1:1 Digital Proof Approval',
    valueDialogue: '1:1 Customer Support & Inquiries',
    valueSpeed: 'Custom Made & Dispatched in 2–4 Days',

    // Catalog & Filter
    catalogTitle: 'Playful Custom Goods Selection',
    catalogSubtitle: 'Click any base item to configure characters, colors, custom text/monograms, and holographic finishes.',
    showingCount: 'Showing {count} custom goods',
    freeEngravingNotice: 'Complimentary engraving and sticker placement included',
    searchPlaceholder: 'Search cute bunny, skull, ghost, bear, key rings, mirrors...',
    filterAll: 'All Goods',

    // Product Card
    personalizeAction: 'Customize Yours →',
    craftDays: 'd crafting',
    craftedBy: 'Team',

    // Configurator / Detail Modal
    configuratorBadge: 'Interactive Custom Configurator',
    livePreview: 'Live Mockup Preview',
    realtimeRender: 'Real-time rendering',
    liveSpecManifest: 'Selected Custom Specifications:',
    askArtisan: 'Ask Customer Support',
    tabConfigure: 'Configure & Personalize',
    tabDetails: 'Materials & Specifications',
    addToBag: 'Add to Bag',
    craftGuarantee: '100% Free proof revision guaranteed',

    // Customizer form labels
    labelDevice: 'Select Phone Model',
    labelColor: 'Base & Bumper Color',
    labelCharacter: 'Select Character / Graphic Theme',
    labelMonogram: 'Custom Monogram / Name',
    labelInscription: 'Sub-inscription / Motto',
    labelFont: 'Font Style (Street / Pixel / Bold / Retro)',
    labelFinish: 'Finish Texture (Aurora Hologram / Matte Rubber)',
    labelSize: 'Apparel Size',
    labelSpecialNotes: 'Production Instructions (Placement, gift packaging, etc.)',
    placeholderNotes: 'e.g. Please shift the character slightly up and use bold lettering!',

    // Cart & Checkout
    cartTitle: 'Your KOJIN Custom Bag',
    emptyCartTitle: 'Your bag is empty',
    emptyCartSub: 'Create a custom horror case, cute animal mirror, or acrylic keychain!',
    browseGoods: 'Browse Custom Goods',
    proceedCheckout: 'Proceed to Secure Checkout',
    complimentaryShipping: 'Complimentary Shipping (On Us)',
    proofNotice: 'Within 24h of purchase our team uploads a 1:1 design proof for your approval before production starts.',
    estimatedTotal: 'Estimated Total',

    // Checkout Modal
    checkoutTitle: 'Secure Checkout & Order Form',
    stepContact: '1. Contact & Customer Account',
    stepShipping: '2. Delivery Destination',
    stepNotes: '3. Special Instructions for Production',
    stepPayment: '4. Payment Method',
    payCard: 'Credit / Debit Card',
    payKakao: 'Mobile / Apple Pay',
    payEscrow: 'Secure Escrow (Released on proof approval)',
    authorizeOrder: 'Authorize Order & Place Request',
    processingOrder: 'Transmitting order to KOJIN production team...',

    // Order Tracking
    trackerBadge: 'Live Production Progress Tracker',
    orderProgressTitle: 'Real-Time Order Progress',
    switchOrder: 'Switch Order:',
    productionState: 'Current Production Phase',
    assignedMaker: 'Production & Inspection',
    logisticsCarrier: 'Carrier & Tracking',
    chatBtn: 'Customer Support Chat',
    actionRequiredProof: 'ACTION REQUIRED · DIGITAL PROOF v',
    proofApprovedText: 'Proof Approved by You',
    proofRevisionSentText: 'Revision Request Sent',
    awaitingApprovalText: 'Awaiting Your Approval',
    approveProofBtn: 'Approve Proof & Authorize Crafting',
    requestAdjustmentsBtn: 'Request Minor Adjustments',
    timelineTitle: 'Production Milestone Pipeline',
    itemsInRun: 'Items in this Production Run',
    shippingRecipient: 'Recipient & Shipping Details',

    // Messaging
    messagingTitle: 'KOJIN Customer Support Chat',
    messagePlaceholder: 'Type a message to customer support...',
    sendBtn: 'Send',
    trackProgressBtn: 'Track Progress',
    reviewProofBtn: 'Review Proof',
    quickAskProof: 'Request digital proof update',
    quickAskMaterial: 'Inquire about materials',
    quickAskPlacement: 'Bulk order discount inquiry',

    // Admin CMS
    adminTitle: 'KOJIN Production & Support CMS',
    adminStaffBadge: 'KOJIN Staff Console',
    adminOverview: 'Dashboard Overview',
    adminOrders: 'Production Orders Pipeline',
    adminMessages: 'Customer Support Desk',
    adminProducts: 'Product Catalog CMS',
    adminCategories: 'Category Taxonomy CMS',
    futureAccessTitle: 'Future Admin Access Notice (After removing top button)',
    futureAccessNote: 'Even if you remove the top button in the future, you can access this CMS anytime by typing #admin in the URL, pressing Alt+A (or Ctrl+Shift+A), or clicking the discreet lock icon in the footer.',

    // Footer
    footerEthos: 'An independent custom goods studio bringing gothic horror art, cute animal illustrations, and anime streetwear goods to life.',
    footerCopyright: '© 2026 KOJIN. All rights reserved. Custom Made Goods Studio.',
    staffAccess: 'Staff CMS Access',
  },
};
