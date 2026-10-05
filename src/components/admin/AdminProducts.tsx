import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Tag,
  Search,
  Sliders,
  Sparkles,
  HelpCircle,
  Hash,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, ProductType } from '../../types';
import { LiveMockupPreview } from '../common/LiveMockupPreview';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, categories, showToast, language } = useApp();

  const [activeTab, setActiveTab] = useState<'catalog' | 'keywords'>('catalog');
  const [adminSearchFilter, setAdminSearchFilter] = useState('');
  const [selectedKeywordFilter, setSelectedKeywordFilter] = useState<string | null>(null);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [quickKeywordProductId, setQuickKeywordProductId] = useState<string | null>(null);
  const [quickKeywordInput, setQuickKeywordInput] = useState('');

  // Form State for Add / Edit Product
  const [formTitle, setFormTitle] = useState('');
  const [formTitleKr, setFormTitleKr] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0]?.name || 'Fan Goods');
  const [formPrice, setFormPrice] = useState('4500');
  const [formCompareAtPrice, setFormCompareAtPrice] = useState('6000');
  const [formLeadTimeDays, setFormLeadTimeDays] = useState('2');
  const [formProductType, setProductType] = useState<ProductType>('key_ring');
  const [formArtisanName, setFormArtisanName] = useState('관리자');
  const [formArtisanRole, setFormArtisanRole] = useState('KOJIN 제작 관리자');
  const [formBadgeKr, setFormBadgeKr] = useState('신규 등록');
  const [formBulkDiscount, setFormBulkDiscount] = useState('20% 100개 이상');
  const [formDescriptionKr, setFormDescriptionKr] = useState(
    '1개부터 제작 가능한 고품질 맞춤형 캐릭터 굿즈입니다.'
  );
  const [formKeywords, setFormKeywords] = useState<string[]>([
    '호러',
    '스컬',
    '귀여운',
    '토끼',
    '키링',
    '캐릭터',
  ]);
  const [newKeywordInput, setNewKeywordInput] = useState('');

  // Common quick-tag suggestions for admins
  const suggestedTags = [
    '호러',
    '스컬',
    '귀여운',
    '토끼',
    '키링',
    '아크릴키링',
    '손거울',
    '폰케이스',
    '포토카드',
    '아크릴스탠드',
    '만쥬',
    '인형',
    '후드티',
    '고딕',
    '유령',
    '고양이',
    '쿼카',
    '선물',
    '캐릭터',
    '자유형',
    '홀로그램',
    '1개제작',
  ];

  // Open modal for Creating a Product
  const handleOpenAddModal = () => {
    setFormTitle('');
    setFormTitleKr('');
    setFormCategory(categories[0]?.name || 'Fan Goods');
    setFormPrice('3500');
    setFormCompareAtPrice('5000');
    setFormLeadTimeDays('2');
    setProductType('key_ring');
    setFormArtisanName('관리자');
    setFormArtisanRole('KOJIN 제작 관리자');
    setFormBadgeKr('신규 등록');
    setFormBulkDiscount('20% 100개 이상');
    setFormDescriptionKr('1개부터 제작 가능한 고품질 맞춤형 캐릭터 굿즈입니다.');
    setFormKeywords(['호러', '스컬', '귀여운', '토끼', '키링']);
    setNewKeywordInput('');
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  // Open modal for Editing an existing Product
  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormTitle(p.title);
    setFormTitleKr(p.titleKr || p.title);
    setFormCategory(p.category);
    setFormPrice(p.price.toString());
    setFormCompareAtPrice(p.compareAtPrice ? p.compareAtPrice.toString() : '');
    setFormLeadTimeDays(p.leadTimeDays.toString());
    setProductType(p.productType);
    setFormArtisanName(p.artisanName);
    setFormArtisanRole(p.artisanRole);
    setFormBadgeKr(p.badgeKr || p.badge || '');
    setFormBulkDiscount(p.bulkDiscount || '');
    setFormDescriptionKr(p.descriptionKr || p.description);
    setFormKeywords(p.searchKeywords ? [...p.searchKeywords] : []);
    setNewKeywordInput('');
    setIsAddModalOpen(true);
  };

  // Tag helper
  const handleAddKeyword = (kwToAdd?: string) => {
    const kw = (kwToAdd || newKeywordInput).trim();
    if (!kw) return;
    if (!formKeywords.includes(kw)) {
      setFormKeywords((prev) => [...prev, kw]);
    }
    if (!kwToAdd) setNewKeywordInput('');
  };

  const handleRemoveKeyword = (kwToRemove: string) => {
    setFormKeywords((prev) => prev.filter((k) => k !== kwToRemove));
  };

  // Save (Create or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitleKr.trim() && !formTitle.trim()) {
      showToast('상품명을 입력해주세요.', 'alert');
      return;
    }

    const catObj = categories.find((c) => c.name === formCategory) || categories[0];
    const finalTitle = formTitle.trim() || formTitleKr.trim();
    const finalTitleKr = formTitleKr.trim() || formTitle.trim();

    if (editingProduct) {
      // Update existing
      updateProduct(editingProduct.id, {
        title: finalTitle,
        titleKr: finalTitleKr,
        category: catObj.name,
        categoryKr: catObj.nameKr || catObj.name,
        categoryId: catObj.id,
        price: parseInt(formPrice) || 3500,
        compareAtPrice: formCompareAtPrice ? parseInt(formCompareAtPrice) : undefined,
        leadTimeDays: parseInt(formLeadTimeDays) || 2,
        productType: formProductType,
        artisanName: formArtisanName,
        artisanRole: formArtisanRole,
        badgeKr: formBadgeKr || undefined,
        badge: formBadgeKr || undefined,
        bulkDiscount: formBulkDiscount || undefined,
        description: formDescriptionKr,
        descriptionKr: formDescriptionKr,
        searchKeywords: formKeywords,
      });
      showToast(`'${finalTitleKr}' 상품 및 검색 키워드가 성공적으로 수정되었습니다!`, 'success');
    } else {
      // Create new
      addProduct({
        title: finalTitle,
        titleKr: finalTitleKr,
        slug: finalTitle.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-'),
        category: catObj.name,
        categoryKr: catObj.nameKr || catObj.name,
        categoryId: catObj.id,
        price: parseInt(formPrice) || 3500,
        compareAtPrice: formCompareAtPrice ? parseInt(formCompareAtPrice) : undefined,
        minQuantity: 1,
        bulkDiscount: formBulkDiscount || '20% 100개 이상',
        badge: formBadgeKr || 'NEW',
        badgeKr: formBadgeKr || '신규 등록',
        leadTimeDays: parseInt(formLeadTimeDays) || 2,
        description: formDescriptionKr,
        descriptionKr: formDescriptionKr,
        searchKeywords: formKeywords,
        craftsmanshipDetails: [
          '고품질 맞춤형 정밀 가공 & 친환경 잉크 UV 출력',
          '제작 전 1:1 디지털 시안 확인 무료 제공',
          '마플 규격 고강도 패키징 안전 발송',
        ],
        materials: ['고투명 아크릴', '메탈 하드웨어'],
        productType: formProductType,
        artisanName: formArtisanName,
        artisanRole: formArtisanRole,
        artisanAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5.0,
        reviewCount: 1,
        inStock: true,
        customizationOptions: [
          {
            id: 'character',
            type: 'character',
            label: '캐릭터 테마 선택',
            required: true,
            options: [
              { label: '💀 [호러] 고딕 스컬', value: 'gothic_skull' },
              { label: '🐰 [귀여운] 딸기 토끼', value: 'fluffy_bunny' },
              { label: '🐱 [귀여운] 사이버 캣', value: 'cyber_cat' },
              { label: '🧸 [귀여운] 찹쌀 곰돌이', value: 'bear' },
              { label: '🌿 [귀여운] 방긋 쿼카', value: 'quokka' },
              { label: '👻 [호러] 사이버 고스트', value: 'cyber_ghost' },
            ],
          },
          {
            id: 'monogram',
            type: 'monogram',
            label: '네임 각인 (한글·영문)',
            required: false,
            maxLength: 8,
            placeholder: 'KOJIN',
          },
        ],
      });
      showToast(`새 상품 '${finalTitleKr}'이(가) 등록되었습니다! 검색 키워드가 즉시 고객 검색에 연동됩니다.`, 'success');
    }

    setIsAddModalOpen(false);
  };

  // Quick keyword add directly on a product card
  const handleQuickAddKeyword = (productId: string) => {
    if (!quickKeywordInput.trim()) return;
    const targetProduct = products.find((p) => p.id === productId);
    if (!targetProduct) return;

    const currentKeywords = targetProduct.searchKeywords || [];
    const newKw = quickKeywordInput.trim();
    if (!currentKeywords.includes(newKw)) {
      const updatedKeywords = [...currentKeywords, newKw];
      updateProduct(productId, { searchKeywords: updatedKeywords });
      showToast(`'${newKw}' 키워드가 추가되었습니다!`, 'success');
    }
    setQuickKeywordInput('');
    setQuickKeywordProductId(null);
  };

  const handleQuickRemoveKeyword = (productId: string, kwToRemove: string) => {
    const targetProduct = products.find((p) => p.id === productId);
    if (!targetProduct) return;
    const updatedKeywords = (targetProduct.searchKeywords || []).filter((k) => k !== kwToRemove);
    updateProduct(productId, { searchKeywords: updatedKeywords });
    showToast(`'${kwToRemove}' 키워드가 삭제되었습니다.`, 'info');
  };

  // Keyword Stats & Aggregations
  const keywordStatsMap: Record<string, number> = {};
  products.forEach((p) => {
    (p.searchKeywords || []).forEach((kw) => {
      keywordStatsMap[kw] = (keywordStatsMap[kw] || 0) + 1;
    });
  });
  const allUniqueKeywords = Object.entries(keywordStatsMap).sort((a, b) => b[1] - a[1]);

  // Filter products for the admin table/grid
  const filteredProducts = products.filter((p) => {
    // 1. Keyword pill filter
    if (selectedKeywordFilter) {
      const hasKw = p.searchKeywords && p.searchKeywords.includes(selectedKeywordFilter);
      if (!hasKw) return false;
    }

    // 2. Admin text search
    if (adminSearchFilter.trim()) {
      const q = adminSearchFilter.toLowerCase().trim();
      const inTitle = p.title.toLowerCase().includes(q) || (p.titleKr && p.titleKr.toLowerCase().includes(q));
      const inKeywords = p.searchKeywords && p.searchKeywords.some((k) => k.toLowerCase().includes(q));
      const inCategory = p.category.toLowerCase().includes(q) || (p.categoryKr && p.categoryKr.toLowerCase().includes(q));
      return inTitle || inKeywords || inCategory;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* CMS Title & Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black font-display text-stone-900">
              상품 및 검색 키워드 CMS
            </h2>
            <span className="text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded border border-orange-300">
              실시간 스토어 연동
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            등록된 상품명 및 검색 키워드는 고객 검색창의 추천 태그와 실시간 검색 알고리즘에 즉시 반영됩니다.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>새 상품 & 키워드 등록</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher: 1) 상품 카탈로그 및 키워드 관리, 2) 등록된 검색 키워드 모아보기 */}
      <div className="flex items-center justify-between gap-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('catalog');
              setSelectedKeywordFilter(null);
            }}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>상품별 키워드 관리 ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === 'keywords'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>등록된 검색 키워드 분석 허브 ({allUniqueKeywords.length}개)</span>
          </button>
        </div>

        {/* Admin Search Bar */}
        <div className="relative pb-2">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={adminSearchFilter}
            onChange={(e) => setAdminSearchFilter(e.target.value)}
            placeholder="상품명 또는 키워드 필터..."
            className="pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 w-48 sm:w-64"
          />
          {adminSearchFilter && (
            <button
              onClick={() => setAdminSearchFilter('')}
              className="absolute right-2 top-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Keyword Filter Notice Bar */}
      {selectedKeywordFilter && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-center justify-between text-xs text-orange-950">
          <div className="flex items-center gap-2">
            <span className="font-bold">선택된 키워드 필터:</span>
            <span className="px-2 py-0.5 bg-orange-600 text-white rounded-md font-bold">
              #{selectedKeywordFilter}
            </span>
            <span className="text-orange-800">
              (연관 상품 {filteredProducts.length}건 표시 중)
            </span>
          </div>
          <button
            onClick={() => setSelectedKeywordFilter(null)}
            className="text-orange-700 hover:text-orange-950 font-bold underline cursor-pointer"
          >
            필터 해제
          </button>
        </div>
      )}

      {/* TAB 1: Product Catalog & Keywords Manager */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-2">
              <p className="text-sm font-bold text-stone-700">일치하는 상품이 없습니다.</p>
              <p className="text-xs text-stone-400">검색어를 변경하거나 필터를 초기화하세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((p) => {
                const title = p.titleKr || p.title;
                const isQuickKwOpen = quickKeywordProductId === p.id;

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-xs flex flex-col justify-between hover:border-stone-400 transition-all"
                  >
                    <div>
                      {/* Visual Mockup & Badges */}
                      <div className="relative h-44 bg-[#F5F5F3] rounded-xl border border-stone-200/80 flex items-center justify-center overflow-hidden mb-3">
                        {p.badgeKr && (
                          <span className="absolute top-2.5 left-2.5 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                            {p.badgeKr}
                          </span>
                        )}
                        <span className="absolute top-2.5 right-2.5 bg-white/90 text-stone-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded border border-stone-200">
                          {p.productType}
                        </span>

                        <LiveMockupPreview
                          productType={p.productType}
                          customization={{
                            character: p.slug.includes('cat')
                              ? 'tiny_kitty'
                              : p.slug.includes('quokka')
                              ? 'happy_quokka'
                              : p.slug.includes('capybara')
                              ? 'yuzu_capybara'
                              : p.slug.includes('phone')
                              ? 'gothic_skull'
                              : 'fluffy_bunny',
                            colorHex: '#18181B',
                            monogram: 'KOJIN',
                            text: 'POP',
                          }}
                          size="sm"
                          className="scale-90"
                        />
                      </div>

                      {/* Title & Price */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold">
                          <span>{p.categoryKr || p.category}</span>
                          <span className="font-mono text-stone-900 font-black text-sm">
                            {p.price.toLocaleString()} 원
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 line-clamp-1">
                          {title}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                          {p.descriptionKr || p.description}
                        </p>
                      </div>

                      {/* SEARCH KEYWORDS SECTION (Core Feature) */}
                      <div className="mt-3 pt-3 border-t border-stone-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-stone-800 flex items-center gap-1">
                            <Tag className="w-3 h-3 text-orange-600" />
                            <span>등록된 검색 키워드 ({(p.searchKeywords || []).length})</span>
                          </span>
                          <button
                            onClick={() => {
                              setQuickKeywordProductId(isQuickKwOpen ? null : p.id);
                              setQuickKeywordInput('');
                            }}
                            className="text-[10px] text-orange-600 font-bold hover:underline cursor-pointer"
                          >
                            {isQuickKwOpen ? '닫기' : '+ 키워드 추가'}
                          </button>
                        </div>

                        {/* Keyword Tag Pills */}
                        <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                          {(p.searchKeywords || []).length === 0 ? (
                            <span className="text-[11px] text-stone-400 italic">
                              등록된 키워드가 없습니다.
                            </span>
                          ) : (
                            p.searchKeywords.map((kw) => (
                              <span
                                key={kw}
                                className="inline-flex items-center gap-1 text-[11px] font-medium bg-stone-100 text-stone-800 px-2 py-0.5 rounded-md border border-stone-200/80 group"
                              >
                                <span>#{kw}</span>
                                <button
                                  type="button"
                                  onClick={() => handleQuickRemoveKeyword(p.id, kw)}
                                  className="text-stone-400 hover:text-red-600 cursor-pointer"
                                  title={`'${kw}' 키워드 삭제`}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))
                          )}
                        </div>

                        {/* Inline Quick Add Input */}
                        {isQuickKwOpen && (
                          <div className="pt-2 flex items-center gap-1.5 animate-fade-in">
                            <input
                              type="text"
                              value={quickKeywordInput}
                              onChange={(e) => setQuickKeywordInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleQuickAddKeyword(p.id);
                                }
                              }}
                              placeholder="새 키워드 입력 후 Enter"
                              className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1 text-xs text-stone-900 focus:outline-none focus:border-orange-600"
                            />
                            <button
                              type="button"
                              onClick={() => handleQuickAddKeyword(p.id)}
                              className="px-2.5 py-1 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                            >
                              추가
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Buttons: Edit, Toggle Stock, Delete */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                        className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                          p.inStock
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {p.inStock ? '판매 중 (1개 제작)' : '일시 품절'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>상세 수정</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${title}' 상품을 정말 삭제하시겠습니까?`)) {
                              deleteProduct(p.id);
                              showToast(`'${title}' 상품이 삭제되었습니다.`, 'info');
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer transition-colors"
                          title="상품 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Search Keywords Analytics & Global Tags Hub */}
      {activeTab === 'keywords' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Hash className="w-4 h-4 text-orange-600" />
              <span>전체 등록된 검색 키워드 분석 및 허브</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              관리자가 등록한 키워드를 클릭하면 해당 키워드가 등록된 상품 목록으로 즉시 필터링됩니다.
            </p>
          </div>

          {/* Keyword Cloud / Tag Matrix */}
          <div className="flex flex-wrap gap-2 pt-2">
            {allUniqueKeywords.map(([kw, count]) => {
              const isSelected = selectedKeywordFilter === kw;
              return (
                <button
                  key={kw}
                  onClick={() => {
                    setSelectedKeywordFilter(isSelected ? null : kw);
                    setActiveTab('catalog');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-orange-50 hover:text-orange-700 text-stone-800 border border-stone-200'
                  }`}
                >
                  <span>#{kw}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Guide for the Admin */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>검색 알고리즘 및 연동 안내</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-stone-700">
              <li>
                고객이 스토어 상단 검색창에 <strong>호러</strong>, <strong>토끼</strong>, <strong>키링</strong>, <strong>거울</strong> 등 입력 시, 상품명 뿐만 아니라 관리자가 등록한 키워드 태그와 100% 매칭되어 상품이 노출됩니다.
              </li>
              <li>
                상단 검색창 클릭 시 뜨는 <strong>관리자 추천 검색어</strong>는 등록된 키워드 중 사용 빈도가 높은 키워드가 실시간으로 자동 노출됩니다.
              </li>
              <li>
                새로운 애니메이션 캐릭터, 아이돌, 유행어 등을 상품 키워드에 추가하면 고객 검색에 즉각 반응합니다.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* CREATE & EDIT PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl border-2 border-stone-800 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                  {editingProduct ? '상품 및 검색어 수정' : '신규 커스텀 상품 등록'}
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  {editingProduct ? `[${editingProduct.titleKr || editingProduct.title}] 수정` : '새로운 캐릭터 굿즈 & 키워드 등록'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Product Titles: Korean & English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-800 font-bold mb-1">
                    상품명 (한글 필수) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitleKr}
                    onChange={(e) => setFormTitleKr(e.target.value)}
                    placeholder="예: 자유형 아크릴 키링 (딸기 토끼 에디션)"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-800 font-bold mb-1">
                    영문 상품명 (선택)
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Freeform Acrylic Keyring"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-600"
                  />
                </div>
              </div>

              {/* Category & Product Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-800 font-bold mb-1">
                    카테고리 분류
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-600 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.nameKr || c.name} ({c.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-800 font-bold mb-1">
                    상품 목업 렌더링 타입
                  </label>
                  <select
                    value={formProductType}
                    onChange={(e) => setProductType(e.target.value as ProductType)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-600 cursor-pointer"
                  >
                    <option value="key_ring">키링 / 아크릴 스탠드 (key_ring)</option>
                    <option value="phone_case">스마트폰 케이스 (phone_case)</option>
                    <option value="mirror">손거울 / 핀버튼 / 인형 (mirror)</option>
                    <option value="apparel">티셔츠 / 후드티 (apparel)</option>
                  </select>
                </div>
              </div>

              {/* Price & Discounts (KRW) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-800 font-bold mb-1">
                    판매 가격 (원, KRW) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="3500"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 font-mono font-bold focus:outline-none focus:border-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-800 font-bold mb-1">
                    정상 가격 (할인 전 금액)
                  </label>
                  <input
                    type="number"
                    value={formCompareAtPrice}
                    onChange={(e) => setFormCompareAtPrice(e.target.value)}
                    placeholder="5000"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 font-mono focus:outline-none focus:border-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-800 font-bold mb-1">
                    대표 뱃지 텍스트
                  </label>
                  <input
                    type="text"
                    value={formBadgeKr}
                    onChange={(e) => setFormBadgeKr(e.target.value)}
                    placeholder="예: KOJIN 키링 1위 / 최소 주문 1개"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-600"
                  />
                </div>
              </div>

              {/* Lead Time & Bulk Discount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-800 font-bold mb-1">
                    제작 소요일 (일)
                  </label>
                  <input
                    type="number"
                    value={formLeadTimeDays}
                    onChange={(e) => setFormLeadTimeDays(e.target.value)}
                    placeholder="2"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 font-mono focus:outline-none focus:border-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-800 font-bold mb-1">
                    대량 할인 문구 (마플 스타일)
                  </label>
                  <input
                    type="text"
                    value={formBulkDiscount}
                    onChange={(e) => setFormBulkDiscount(e.target.value)}
                    placeholder="예: 20% 500개 이상 2,800원"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-600"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-stone-800 font-bold mb-1">
                  상품 설명 (고객 노출 문구)
                </label>
                <textarea
                  rows={2}
                  value={formDescriptionKr}
                  onChange={(e) => setFormDescriptionKr(e.target.value)}
                  placeholder="1개부터 제작 가능한 고품질 맞춤형 캐릭터 굿즈..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-orange-600"
                />
              </div>

              {/* CRITICAL: SEARCH KEYWORDS TAG MANAGER (The User's Core Request) */}
              <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-stone-900 font-black text-xs flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-orange-600" />
                      <span>검색 키워드 관리 (고객 검색 연동) *</span>
                    </label>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      이 상품에 매칭할 검색어 태그를 등록하세요. 고객이 이 단어를 검색하면 즉시 본 상품이 노출됩니다.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-orange-700 bg-white px-2 py-0.5 rounded border border-orange-200">
                    {formKeywords.length}개 키워드 등록됨
                  </span>
                </div>

                {/* Input to add tag */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Hash className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={newKeywordInput}
                      onChange={(e) => setNewKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          handleAddKeyword();
                        }
                      }}
                      placeholder="키워드 입력 후 Enter 또는 추가 버튼 클릭 (예: 호러, 토끼, 스컬)"
                      className="w-full pl-8 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-orange-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddKeyword()}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    키워드 추가
                  </button>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 min-h-[36px] bg-white p-2.5 rounded-xl border border-stone-200">
                  {formKeywords.length === 0 ? (
                    <span className="text-[11px] text-stone-400 italic">
                      키워드가 없습니다. 아래 추천 태그를 클릭해 바로 추가하세요!
                    </span>
                  ) : (
                    formKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1.5 text-xs font-bold bg-orange-100 text-orange-900 px-2.5 py-1 rounded-lg border border-orange-300/80 animate-fade-in"
                      >
                        <span>#{kw}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(kw)}
                          className="text-orange-600 hover:text-red-700 cursor-pointer"
                          title="삭제"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                {/* Quick Add Suggestions */}
                <div className="space-y-1">
                  <span className="text-[10px] text-stone-500 font-bold">
                    빠른 추천 키워드 클릭 시 즉시 추가:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {suggestedTags.map((tag) => {
                      const isAdded = formKeywords.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          disabled={isAdded}
                          onClick={() => handleAddKeyword(tag)}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                            isAdded
                              ? 'bg-stone-100 text-stone-400 cursor-default'
                              : 'bg-white hover:bg-orange-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          +{tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-black shadow-md cursor-pointer transition-colors"
                >
                  {editingProduct ? '수정사항 저장 & 스토어 반영' : '상품 등록 & 검색어 반영'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
