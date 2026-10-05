import React, { useState } from 'react';
import {
  Store,
  Sparkles,
  ShoppingBag,
  Heart,
  Star,
  Users,
  ArrowRight,
  TrendingUp,
  Tag,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LiveMockupPreview } from '../common/LiveMockupPreview';
import { Product } from '../../types';

export const KojinShopPage: React.FC = () => {
  const {
    products,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    setCurrentPage,
    setIsChatDrawerOpen,
    language,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'horror' | 'cute' | 'street' | 'living'>('all');

  // Creator Brands Mockup Data
  const creatorShops = [
    {
      id: 'shop-gothic',
      name: '고딕 나이트메어 (Gothic Nightmare)',
      handle: '@gothic_skull_kr',
      banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=200&q=80',
      followers: '14.8K',
      category: 'horror',
      tagline: '고딕 스컬, 블러드 로즈, 뱀파이어 배트 & 다크 판타지 커스텀 굿즈',
      badge: '호러 1위 샵',
    },
    {
      id: 'shop-quokka',
      name: '달콤 딸기 토끼 & 쿼카 (Sweet Pets)',
      handle: '@sweet_bunny_quokka',
      banner: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      followers: '19.2K',
      category: 'cute',
      tagline: '보기만 해도 힐링되는 딸기 토끼, 퐁당 곰돌이, 카피바라 손거울 & 만쥬',
      badge: '귀여운 굿즈 1위',
    },
    {
      id: 'shop-neotokyo',
      name: '네오 도쿄 사이버 고스트 (Neo Tokyo Ghost)',
      handle: '@neotokyo_ghost',
      banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      followers: '9.4K',
      category: 'street',
      tagline: '사이버 네온 고스트 & 캣, Y2K 글리치 그래픽 폰케이스 & 패션 굿즈',
      badge: '트렌딩 샵',
    },
    {
      id: 'shop-pixel',
      name: '픽셀 크루 아카이브 (Pixel Crew Archive)',
      handle: '@pixel_archive_kr',
      banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      followers: '7.1K',
      category: 'living',
      tagline: '레트로 게임보이 감성 아크릴 디오라마 & 키링 전문 샵',
      badge: '신규 입점',
    },
  ];

  const filteredShops = activeTab === 'all'
    ? creatorShops
    : creatorShops.filter((s) => s.category === activeTab);

  return (
    <div className="bg-[#F8F7F2] min-h-screen pb-20">
      {/* 1. Page Header & Hero Banner */}
      <section className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white border-b-2 border-stone-800 py-12 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/30 border border-orange-500/40 text-orange-400 text-xs font-mono font-bold">
                <Store className="w-3.5 h-3.5" />
                <span>KOJIN 샵 (크리에이터 & 브랜드 굿즈 마켓)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white">
                크리에이터의 세계를 담은 굿즈 샵
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                마플샵처럼 재고 부담 없이 0원으로 샵을 열고, 주문 즉시 KOJIN 제작 관리팀이 1개부터 정밀 제작하여 고객에게 직배송합니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setIsChatDrawerOpen(true)}
                  className="px-5 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-black inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>크리에이터 샵 입점 & 개설 문의</span>
                </button>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="px-5 py-3 bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>나만의 커스텀 굿즈 만들기 →</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Pill Cards */}
            <div className="grid grid-cols-2 gap-3 sm:w-80">
              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-1">
                <span className="text-[10px] font-mono text-stone-400">입점 크리에이터</span>
                <div className="text-2xl font-black text-amber-400">1,240+</div>
                <p className="text-[10px] text-stone-400">일러스트 & 캐릭터 샵</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-1">
                <span className="text-[10px] font-mono text-stone-400">초기 제작비용</span>
                <div className="text-2xl font-black text-emerald-400">0 원</div>
                <p className="text-[10px] text-stone-400">무재고 자동 주문제작</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-1">
                <span className="text-[10px] font-mono text-stone-400">제작 & 품질 검수</span>
                <div className="text-base font-black text-white">KOJIN 관리자</div>
                <p className="text-[10px] text-stone-400">전문 랩 1:1 전담 검수</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-1">
                <span className="text-[10px] font-mono text-stone-400">최소 판매 수량</span>
                <div className="text-base font-black text-orange-400">1개부터 출고</div>
                <p className="text-[10px] text-stone-400">국내외 안심 직배송</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Filter Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-stone-200 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between overflow-x-auto scrollbar-none gap-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: '전체 샵' },
              { id: 'horror', label: '💀 호러 / 고딕' },
              { id: 'cute', label: '🐰 귀여운 / 힐링' },
              { id: 'street', label: '⚡ 사이버 & 스트릿' },
              { id: 'living', label: '🎮 레트로 & 키덜트' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-stone-500 font-mono hidden sm:inline">
            총 {filteredShops.length}개의 추천 샵
          </span>
        </div>
      </div>

      {/* 3. Featured Creator Shops Showcase */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-stone-900">
              인기 크리에이터 공식 입점 샵
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              각 크리에이터의 독창적인 디자인 굿즈를 둘러보고 원하는 문구나 옵션으로 커스텀 주문해보세요.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-2xl border-2 border-stone-200 hover:border-stone-900 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Banner */}
                <div className="h-28 w-full bg-stone-200 relative overflow-hidden">
                  <img
                    src={shop.banner}
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-stone-950/80 backdrop-blur-xs text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {shop.badge}
                  </span>
                </div>

                {/* Profile & Info */}
                <div className="p-4 pt-0 relative">
                  <div className="-mt-8 mb-3 flex items-end justify-between">
                    <img
                      src={shop.avatar}
                      alt={shop.name}
                      className="w-14 h-14 rounded-2xl border-2 border-white object-cover shadow-sm bg-white"
                    />
                    <div className="text-[11px] font-mono text-stone-500 font-bold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>{shop.followers}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-stone-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {shop.name}
                  </h3>
                  <div className="text-[11px] font-mono text-stone-400 mb-2">
                    {shop.handle}
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {shop.tagline}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="w-full py-2 bg-stone-100 group-hover:bg-stone-900 group-hover:text-white text-stone-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>굿즈 보러가기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Trending Goods Collection Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl sm:text-2xl font-display font-black text-stone-900">
                지금 KOJIN 샵에서 가장 사랑받는 굿즈
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              관리자가 정밀 검수하는 1위 상품들! 바로 클릭하여 나만의 문구로 커스텀할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 6).map((product) => {
            const isFav = wishlist.includes(product.id);
            const title = language === 'kr' && product.titleKr ? product.titleKr : product.title;

            const mockConfig = {
              character: product.slug.includes('cat')
                ? 'tiny_kitty'
                : product.slug.includes('quokka')
                ? 'happy_quokka'
                : product.slug.includes('capybara')
                ? 'yuzu_capybara'
                : product.slug.includes('phone')
                ? 'gothic_skull'
                : product.slug.includes('stand')
                ? 'gothic_skull'
                : 'fluffy_bunny',
              colorHex: product.slug.includes('acrylic')
                ? '#E0F2FE'
                : product.slug.includes('mirror')
                ? '#FEF08A'
                : product.slug.includes('hoodie')
                ? '#27272A'
                : '#18181B',
              monogram: language === 'kr' ? '코진' : 'KOJIN',
              text: 'KOJIN',
            };

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white p-3 rounded-2xl border border-stone-200 hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full bg-[#F5F5F3] rounded-xl overflow-hidden flex items-center justify-center p-3">
                    <span className="absolute top-2 left-2 z-10 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                      {product.badgeKr || '인기'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-stone-400 hover:text-red-500 cursor-pointer"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFav ? 'text-red-500 fill-red-500' : 'text-stone-400'
                        }`}
                      />
                    </button>
                    <LiveMockupPreview
                      productType={product.productType}
                      customization={mockConfig}
                      size="sm"
                      className="scale-95"
                    />
                  </div>

                  <div className="pt-3 space-y-1">
                    <div className="text-[10px] font-mono text-orange-600 font-bold">
                      제작 관리: 관리자
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {title}
                    </h4>
                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-sm font-black text-stone-950 font-mono">
                        {product.price.toLocaleString()}원
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-stone-500">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full py-1.5 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    커스텀 에디터 열기
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Creator Shop Opening Promotion Banner */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-amber-400 text-stone-950 border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-stone-950 text-amber-400 px-2 py-0.5 rounded">
              SELLER PROGRAM
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight leading-tight">
              당신의 일러스트와 캐릭터로 굿즈 샵을 열어보세요!
            </h3>
            <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed">
              디자인 파일만 업로드하면 KOJIN이 상품 목업 등록, 결제, 1개 단위 정밀 제작, 고객 배송까지 전 과정을 무료로 대행해 드립니다.
            </p>
          </div>
          <button
            onClick={() => setIsChatDrawerOpen(true)}
            className="px-6 py-4 bg-stone-950 hover:bg-stone-850 text-white rounded-2xl text-xs sm:text-sm font-black inline-flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
          >
            <Store className="w-4 h-4 text-amber-400" />
            <span>0원으로 굿즈 샵 신청하기</span>
          </button>
        </div>
      </section>
    </div>
  );
};
