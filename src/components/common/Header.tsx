import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Wrench,
  Menu,
  ChevronDown,
  Sparkles,
  Camera,
  MessageSquare,
  X,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    wishlist,
    appMode,
    setAppMode,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    setSelectedOrderId,
    setIsChatDrawerOpen,
    setSelectedProduct,
    products,
    language,
    setLanguage,
    currentPage,
    setCurrentPage,
    showToast,
    currentUser,
    logoutCustomer,
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Dynamically extract all unique search keywords registered by the admin across all products
  const adminRegisteredKeywords = Array.from(
    new Set(products.flatMap((p) => p.searchKeywords || []))
  );
  // Default fallback if no keywords yet
  const displayKeywords =
    adminRegisteredKeywords.length > 0
      ? adminRegisteredKeywords.slice(0, 12)
      : ['귀여운', '호러', '고딕', '스컬', '유령', '토끼', '키링', '손거울', '포토카드', '폰케이스', '만쥬', '후드티'];

  // Live product search preview while typing
  const liveMatchingProducts = searchQuery.trim()
    ? products
        .filter((p) => {
          const q = searchQuery.toLowerCase().trim();
          const inTitle =
            p.title.toLowerCase().includes(q) ||
            (p.titleKr && p.titleKr.toLowerCase().includes(q));
          const inKeywords =
            p.searchKeywords &&
            p.searchKeywords.some((kw) => kw.toLowerCase().includes(q));
          const inCategory =
            p.category.toLowerCase().includes(q) ||
            (p.categoryKr && p.categoryKr.toLowerCase().includes(q));
          return inTitle || inKeywords || inCategory;
        })
        .slice(0, 4)
    : [];

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const mainNavItems = [
    { id: 'all', label: '전체 상품', isAll: true },
    { id: 'apparel', label: '의류' },
    { id: 'fashion', label: '패션잡화' },
    { id: 'fangoods', label: '팬굿즈', isHot: true },
    { id: 'sticker', label: '스티커' },
    { id: 'paper', label: '지류' },
    { id: 'office', label: '문구/오피스' },
    { id: 'phone-cases', label: '스마트폰' },
    { id: 'mirrors', label: '리빙/거울' },
    { id: 'cushion', label: '쿠션/패브릭' },
    { id: 'sports', label: '스포츠' },
    { id: 'kids', label: '키즈' },
    { id: 'pet', label: '반려동물' },
    { id: 'digital', label: '디지털 가전' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
      {/* 1. Top Utility Bar */}
      <div className="border-b border-stone-100 bg-[#FAFAFA] text-[11px] text-stone-500 py-1.5 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Left Brand Siblings: KOJIN Custom vs KOJIN Shop */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-medium">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1 text-[11px] ${
                currentPage === 'home'
                  ? 'bg-stone-900 text-white font-black shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200'
              }`}
            >
              <span>KOJIN 커스텀</span>
              <span className="text-[10px] font-mono opacity-70 hidden sm:inline">(마플형 POD)</span>
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={() => setCurrentPage('shop')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1 text-[11px] ${
                currentPage === 'shop'
                  ? 'bg-orange-600 text-white font-black shadow-xs'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <span>KOJIN 샵</span>
              <span className="text-[10px] font-mono opacity-70 hidden sm:inline">(마플샵형)</span>
            </button>
          </div>

          {/* Right User & Locale Utilities */}
          <div className="flex items-center gap-2.5">
            {/* Customer Authentication Links */}
            {!currentUser ? (
              <div className="flex items-center gap-2 text-stone-700 font-bold">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="hover:text-orange-600 transition-colors cursor-pointer"
                >
                  로그인
                </button>
                <span className="text-stone-300">·</span>
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="text-orange-600 hover:text-orange-700 transition-colors cursor-pointer"
                >
                  회원가입
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="inline-flex items-center gap-1.5 font-bold text-stone-800 hover:text-orange-600 cursor-pointer"
                >
                  <span className="max-w-[100px] truncate">{currentUser.name}님</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 hidden sm:inline">
                    {currentUser.authProvider === 'google' ? 'Google' : '이메일'}
                  </span>
                </button>
                <span className="text-stone-300">·</span>
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="hover:text-stone-900 text-stone-600 cursor-pointer font-medium"
                >
                  마이페이지
                </button>
                <span className="text-stone-300">·</span>
                <button
                  onClick={logoutCustomer}
                  className="text-stone-400 hover:text-red-600 cursor-pointer text-[10px]"
                >
                  로그아웃
                </button>
              </div>
            )}

            <span className="text-stone-300">·</span>

            {/* Language Dropdown */}
            <div className="flex items-center gap-1 cursor-pointer hover:text-stone-900">
              <button
                onClick={() => setLanguage(language === 'kr' ? 'en' : 'kr')}
                className="font-medium inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>{language === 'kr' ? '한국어' : 'English'}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>
            </div>

            <span className="text-stone-300">·</span>
            <button
              onClick={() => setIsChatDrawerOpen(true)}
              className="hover:text-stone-900 cursor-pointer flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 text-orange-600" />
              <span>고객센터 / 1:1 상담</span>
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={() => {
                if (currentUser) {
                  setCurrentPage('profile');
                } else {
                  setCurrentPage('login');
                }
              }}
              className="hover:text-stone-900 cursor-pointer"
            >
              주문 배송조회
            </button>
            <span className="text-stone-300">·</span>

            {/* Secret / Retained Admin Switcher */}
            <button
              onClick={() => setAppMode(appMode === 'store' ? 'admin' : 'store')}
              className="px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-mono font-bold text-[10px] transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="관리자 CMS (단축키: Alt + A 또는 주소창 #admin)"
            >
              <Wrench className="w-3 h-3 text-orange-600" />
              <span>{appMode === 'store' ? 'KOJIN CMS' : '스토어'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Center Header Bar (Logo, Large Search Bar, User Icons) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Logo (KOJIN Bold Style) */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentPage('home');
              setActiveCategory('all');
              setSelectedOrderId(null);
            }}
            className="text-2xl sm:text-3xl font-black font-display tracking-tight text-stone-900 hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer"
          >
            <span className="tracking-tight font-black text-stone-950">KOJIN</span>
            <span className="text-[10px] font-mono font-bold text-white bg-orange-600 px-1.5 py-0.5 rounded-sm ml-1 tracking-wider uppercase">
              STUDIO
            </span>
          </button>
        </div>

        {/* Large Rounded Search Bar (Center) */}
        <div className="flex-1 max-w-xl relative">
          <div
            className={`relative flex items-center w-full bg-white border-2 rounded-full transition-all duration-200 ${
              isSearchFocused
                ? 'border-orange-600 shadow-md ring-2 ring-orange-100'
                : 'border-stone-300 hover:border-stone-400'
            }`}
          >
            <Search className="w-4 h-4 text-stone-500 ml-4 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="귀여운 동물, 고딕 호러, Y2K 등 원하는 테마 굿즈 검색"
              className="w-full pl-3 pr-9 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-stone-400 hover:text-stone-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search Tag Suggestions & Live Product Match (Shows when search is focused) */}
          {isSearchFocused && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 text-xs space-y-3 animate-fade-in">
              {/* 1. Admin Registered Keyword Chips */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-stone-400 font-bold mb-2">
                  <span className="flex items-center gap-1 text-stone-700">
                    <span className="text-orange-600 font-black">#</span>
                    <span>관리자 등록 추천 검색어</span>
                  </span>
                  <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-1.5 py-0.5 rounded">
                    실시간 매칭
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {displayKeywords.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearchQuery(kw);
                        setIsSearchFocused(false);
                      }}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-orange-500 hover:text-white text-stone-800 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      #{kw}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Live Matching Products Preview while typing */}
              {searchQuery.trim() && (
                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold">
                    <span>
                      "<strong>{searchQuery}</strong>" 실시간 추천 상품 ({liveMatchingProducts.length})
                    </span>
                    <span className="text-[10px] text-stone-400">클릭 시 바로 커스텀 에디터 열림</span>
                  </div>

                  {liveMatchingProducts.length === 0 ? (
                    <p className="text-stone-400 text-[11px] py-1">
                      일치하는 상품이 없습니다. 관리자가 등록한 키워드(#호러, #토끼, #스컬, #키링 등)를 검색해보세요!
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {liveMatchingProducts.map((p) => {
                        const title = language === 'kr' && p.titleKr ? p.titleKr : p.title;
                        const matchedKw = (p.searchKeywords || []).find((k) =>
                          k.toLowerCase().includes(searchQuery.toLowerCase().trim())
                        );

                        return (
                          <div
                            key={p.id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setSelectedProduct(p);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50 hover:bg-orange-50/70 border border-stone-200/70 hover:border-orange-300 transition-all cursor-pointer text-left"
                          >
                            <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs text-orange-600">
                              {p.badgeKr || '굿즈'}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h5 className="text-xs font-bold text-stone-900 truncate">
                                {title}
                              </h5>
                              <div className="flex items-center gap-1.5 text-[11px]">
                                <span className="font-mono font-bold text-stone-900">
                                  {p.price.toLocaleString()}원
                                </span>
                                {matchedKw && (
                                  <span className="text-[10px] text-orange-600 font-semibold bg-orange-100 px-1 rounded">
                                    #{matchedKw}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons & Utilities (1분컷 템플릿, 굿즈 제작 방법, 리뷰, 찜, 장바구니, 계정) */}
        <div className="flex items-center gap-5 text-xs font-medium text-stone-700 shrink-0">
          <button
            onClick={() => setCurrentPage('templates')}
            className={`hidden xl:flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-2.5 rounded-xl ${
              currentPage === 'templates'
                ? 'bg-amber-100 text-amber-950 font-black border border-amber-300'
                : 'hover:text-orange-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>1분컷 무료 템플릿</span>
          </button>

          <button
            onClick={() => setCurrentPage('templates')}
            className="hidden lg:flex items-center gap-1.5 hover:text-orange-600 transition-colors cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-stone-500" />
            <span>굿즈 제작 방법</span>
          </button>

          <button
            onClick={() => {
              const feat = products[0];
              if (feat) setSelectedProduct(feat);
              showToast('⭐ 실제 구매 고객 리뷰 평점 4.97점 (1,552건의 포토리뷰)', 'info');
            }}
            className="hidden sm:flex items-center gap-1.5 hover:text-orange-600 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-stone-500" />
            <span>리뷰 (4.9점)</span>
          </button>

          {/* Wishlist Heart Icon */}
          <button
            onClick={() => {
              if (wishlist.length > 0) {
                const firstWish = products.find((p) => wishlist.includes(p.id));
                if (firstWish) {
                  setSelectedProduct(firstWish);
                  showToast(`찜한 상품 '${firstWish.titleKr || firstWish.title}' 상세창을 열었습니다.`, 'info');
                } else {
                  showToast(`찜한 상품 ${wishlist.length}개가 보관되어 있습니다.`, 'info');
                }
              } else {
                showToast('아직 찜한 상품이 없습니다. 마음에 드는 상품의 하트를 눌러보세요! (♥)', 'info');
              }
            }}
            className="relative p-1 text-stone-700 hover:text-red-500 transition-colors cursor-pointer"
            title="찜한 상품"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1 text-stone-700 hover:text-orange-600 transition-colors cursor-pointer"
            title="장바구니"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Account */}
          {currentUser ? (
            <button
              onClick={() => setCurrentPage('profile')}
              className="relative p-0.5 rounded-full ring-2 ring-stone-800 hover:ring-orange-600 transition-all cursor-pointer overflow-hidden shrink-0"
              title={`${currentUser.name}님 마이페이지 & 주문 관리`}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage('login')}
              className="p-1 text-stone-700 hover:text-orange-600 transition-colors cursor-pointer"
              title="로그인 및 회원가입"
            >
              <User className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Horizontal Main Category Navigation Bar (MARPPLE Style) */}
      <div className="border-t border-stone-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto scrollbar-none text-xs font-bold text-stone-800">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Hamburger Button */}
            <button
              onClick={() => {
                setCurrentPage('home');
                setActiveCategory('all');
                setSelectedOrderId(null);
              }}
              className={`flex items-center gap-1.5 py-3 px-3 border-r border-stone-200 mr-1 cursor-pointer transition-colors ${
                activeCategory === 'all' && currentPage === 'home'
                  ? 'text-orange-600 font-black'
                  : 'text-stone-900 hover:text-orange-600 font-extrabold'
              }`}
            >
              <Menu className="w-4 h-4" />
              <span>전체 상품</span>
            </button>

            {mainNavItems.slice(1).map((item) => {
              const isActive = currentPage === 'home' && activeCategory === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage('home');
                    setActiveCategory(item.id);
                    setSelectedOrderId(null);
                  }}
                  className={`py-3 px-3 whitespace-nowrap transition-colors relative cursor-pointer ${
                    isActive
                      ? 'text-orange-600 font-black'
                      : 'text-stone-700 hover:text-stone-950 font-bold'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right B2B Specials */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-stone-600 shrink-0 pl-4 border-l border-stone-200">
            <button
              onClick={() => setCurrentPage('welcome-kit')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                currentPage === 'welcome-kit'
                  ? 'bg-stone-900 text-white font-black shadow-xs'
                  : 'hover:text-orange-600 text-stone-700 hover:bg-stone-100'
              }`}
            >
              기업/웰컴 키트
            </button>
            <button
              onClick={() => setCurrentPage('bulk-order')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                currentPage === 'bulk-order'
                  ? 'bg-orange-600 text-white font-black shadow-xs'
                  : 'hover:text-orange-600 text-stone-700 hover:bg-stone-100'
              }`}
            >
              대량 주문
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
