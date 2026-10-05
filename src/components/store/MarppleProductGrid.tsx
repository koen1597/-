import React from 'react';
import { Heart, Star, ChevronDown, Search, X, Sparkles, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { LiveMockupPreview } from '../common/LiveMockupPreview';

export const MarppleProductGrid: React.FC = () => {
  const {
    products,
    activeCategory,
    activeSubCategory,
    activeColorFilter,
    activePriceFilter,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    bulkOnlyFilter,
    setBulkOnlyFilter,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    language,
  } = useApp();

  // Extract admin registered keywords
  const adminKeywords = Array.from(
    new Set(products.flatMap((p) => p.searchKeywords || []))
  );

  // Keyword and Multi-filter logic
  const filteredProducts = products.filter((p) => {
    // 1. Category Filter
    const matchesCategory =
      activeCategory === 'all' ||
      activeCategory === 'fangoods' ||
      p.categoryId === `cat-${activeCategory}` ||
      p.category.toLowerCase().replace(/\s+/g, '-').includes(activeCategory);

    // 2. Subcategory Filter
    let matchesSub = true;
    if (activeSubCategory !== 'all') {
      if (activeSubCategory === 'keyring') matchesSub = p.productType === 'key_ring' && p.slug.includes('keyring');
      else if (activeSubCategory === 'acrylic') matchesSub = p.slug.includes('acrylic') || p.slug.includes('stand');
      else if (activeSubCategory === 'photocard') matchesSub = p.slug.includes('photo');
      else if (activeSubCategory === 'mirror') matchesSub = p.productType === 'mirror';
      else if (activeSubCategory === 'phone') matchesSub = p.productType === 'phone_case';
      else if (activeSubCategory === 'doll') matchesSub = p.slug.includes('manju') || p.slug.includes('plush');
      else if (activeSubCategory === 'apparel') matchesSub = p.productType === 'apparel';
      else if (activeSubCategory === '1min') matchesSub = p.isFeatured === true;
    }

    // 3. Search Query matching (Matches Title, TitleKr, and Admin Search Keywords!)
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = p.title.toLowerCase().includes(q) || (p.titleKr && p.titleKr.toLowerCase().includes(q));
      const inKeywords = p.searchKeywords && p.searchKeywords.some((kw) => kw.toLowerCase().includes(q));
      const inDesc = p.description.toLowerCase().includes(q);
      const inMaterials = p.materials.some((m) => m.toLowerCase().includes(q));
      matchesSearch = inTitle || inKeywords || inDesc || inMaterials;
    }

    // 4. Color Filter
    let matchesColor = true;
    if (activeColorFilter !== 'all') {
      const colorOpt = p.customizationOptions.find((o) => o.type === 'color');
      if (colorOpt && colorOpt.options) {
        matchesColor = colorOpt.options.some((c) => c.value === activeColorFilter);
      }
    }

    // 5. Price Filter
    let matchesPrice = true;
    if (activePriceFilter === 'under5k') matchesPrice = p.price <= 5000;
    else if (activePriceFilter === '5kTo10k') matchesPrice = p.price > 5000 && p.price <= 10000;
    else if (activePriceFilter === '10kTo20k') matchesPrice = p.price > 10000 && p.price <= 20000;
    else if (activePriceFilter === 'over20k') matchesPrice = p.price > 20000;

    return matchesCategory && matchesSub && matchesSearch && matchesColor && matchesPrice;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'lowPrice') return a.price - b.price;
    if (sortOption === 'highPrice') return b.price - a.price;
    if (sortOption === 'popular') return b.reviewCount - a.reviewCount;
    if (sortOption === 'newest') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    return 0; // recommended
  });

  return (
    <div className="flex-1 space-y-4">
      {/* Active Search Query Notice Banner */}
      {searchQuery.trim() && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                <span>"<strong>{searchQuery}</strong>" 검색 결과</span>
                <span className="text-orange-600 font-black">({sortedProducts.length}건)</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">
                관리자가 등록한 상품명, 카테고리 및 실시간 검색 키워드 태그와 일치하는 상품입니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>검색어 초기화</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Header Bar (Matching MARPPLE Screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="text-xs text-stone-900 font-bold">
          총 <span className="text-orange-600 font-extrabold">{sortedProducts.length}</span>개의 상품
          {searchQuery && (
            <span className="text-stone-500 font-medium ml-2">
              (검색어: "<span className="text-stone-900 font-bold">{searchQuery}</span>")
            </span>
          )}
        </div>

        {/* Right Toggle & Sort Dropdown */}
        <div className="flex items-center gap-4 text-xs">
          {/* Toggle: 단체 판촉 상품만 보기 */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700 font-medium">
            <span>단체 판촉 상품만 보기</span>
            <button
              type="button"
              onClick={() => setBulkOnlyFilter(!bulkOnlyFilter)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                bulkOnlyFilter ? 'bg-orange-600' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                  bulkOnlyFilter ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </label>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="appearance-none bg-transparent pr-6 text-stone-800 font-bold cursor-pointer focus:outline-none"
            >
              <option value="recommended">추천순 ▾</option>
              <option value="popular">인기순</option>
              <option value="lowPrice">낮은 가격순</option>
              <option value="highPrice">높은 가격순</option>
              <option value="newest">신상품순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards Grid (Matching MARPPLE 4-Column Card Design) */}
      {sortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#FBFBFA] rounded-3xl border-2 border-dashed border-stone-300 p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              "{searchQuery}" 검색 조건과 일치하는 굿즈가 없습니다
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              관리자가 등록한 키워드로 검색해보세요! 아래 추천 검색어를 클릭하시면 바로 상품을 확인하실 수 있습니다.
            </p>
          </div>

          {/* Clickable suggested keyword chips */}
          <div className="pt-2 max-w-md mx-auto flex flex-wrap justify-center gap-1.5">
            {adminKeywords.slice(0, 10).map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => setSearchQuery(kw)}
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-orange-700 text-stone-700 rounded-lg text-xs font-bold border border-stone-200 transition-colors cursor-pointer"
              >
                #{kw}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>전체 상품 보러가기</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sortedProducts.map((product) => {
            const isFav = wishlist.includes(product.id);
            const title = language === 'kr' && product.titleKr ? product.titleKr : product.title;

            // Thumbnail mock configuration
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
                className="group flex flex-col justify-between cursor-pointer"
              >
                {/* 1. Image Container (Light Off-white Background + Badges + Heart) */}
                <div className="relative aspect-square w-full bg-[#F5F5F3] rounded-2xl overflow-hidden flex items-center justify-center p-3 border border-stone-200/80 group-hover:border-stone-400 transition-all duration-200">
                  {/* Top Left Badges (MARPPLE Style) */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none">
                    {product.badge && (
                      <span className="bg-orange-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        {language === 'kr' && product.badgeKr ? product.badgeKr : product.badge}
                      </span>
                    )}
                    {product.discountPercent && (
                      <span className="bg-[#EA580C] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        Sale
                      </span>
                    )}
                    {product.minQuantity && !product.badge && (
                      <span className="bg-white/90 text-stone-700 text-[11px] font-medium px-2 py-0.5 rounded-md shadow-xs border border-stone-200">
                        최소 주문수량 {product.minQuantity}개
                      </span>
                    )}
                  </div>

                  {/* Top Right Alternative Badge (e.g. 최소 주문수량 1개 when badge already exists) */}
                  {product.minQuantity && product.badge && (
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                      <span className="bg-white/90 text-stone-700 text-[10px] font-medium px-1.5 py-0.5 rounded border border-stone-200">
                        최소 주문 1개
                      </span>
                    </div>
                  )}

                  {/* Live Realistic Vector / Mockup Render */}
                  <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <LiveMockupPreview
                      productType={product.productType}
                      customization={mockConfig}
                      size="sm"
                      className="scale-95"
                    />
                  </div>

                  {/* Wishlist Heart Icon (Bottom Right of Image) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-stone-400 hover:text-red-500 hover:scale-110 transition-all cursor-pointer"
                    title="찜하기"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? 'text-red-500 fill-red-500' : 'text-stone-400'
                      }`}
                    />
                  </button>
                </div>

                {/* 2. Product Metadata (Title, Price, Discount, Rating) */}
                <div className="pt-3 pb-2 space-y-1">
                  {/* Title */}
                  <h4 className="text-sm font-bold text-stone-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {title}
                  </h4>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-stone-950 font-mono tracking-tight">
                      {product.price.toLocaleString()} 원
                    </span>
                  </div>

                  {/* Bulk Discount Subtitle (MARPPLE signature) */}
                  {product.bulkDiscount && (
                    <div className="text-[11px] font-medium">
                      <span className="text-orange-600 font-bold mr-1">
                        {product.bulkDiscount.split(' ')[0]}
                      </span>
                      <span className="text-stone-500">
                        {product.bulkDiscount.split(' ').slice(1).join(' ')}
                      </span>
                    </div>
                  )}

                  {/* Star Rating & Review Count */}
                  <div className="flex items-center gap-1 text-[11px] text-stone-500 pt-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-stone-800">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewCount.toLocaleString()})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
