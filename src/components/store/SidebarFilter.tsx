import React, { useState } from 'react';
import { RotateCcw, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SidebarFilter: React.FC = () => {
  const {
    activeColorFilter,
    setActiveColorFilter,
    activePriceFilter,
    setActivePriceFilter,
    searchQuery,
    setSearchQuery,
    resetFilters,
  } = useApp();

  // Accordion collapsed state for filter categories
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    theme: true,
    color: true,
    size: true,
    price: true,
    material: true,
    shape: true,
    print: false,
    gloss: false,
    type: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const themes = [
    { label: '전체 테마', value: '' },
    { label: '💀 호러 / 고딕 / 스컬', value: '호러' },
    { label: '🐰 귀여운 / 카와이 / 동물', value: '귀여운' },
    { label: '⚡ 사이버 & 네온', value: '사이버' },
  ];

  const colors = [
    { label: '전체', value: 'all', hex: '#FFFFFF' },
    { label: '투명', value: 'clear', hex: '#E0F2FE' },
    { label: '블랙', value: 'black', hex: '#18181B' },
    { label: '오렌지', value: 'orange', hex: '#EA580C' },
    { label: '옐로우', value: 'yellow', hex: '#EAB308' },
    { label: '퍼플/홀로', value: 'holo', hex: '#A855F7' },
    { label: '화이트', value: 'white', hex: '#F4F4F5' },
    { label: '민트', value: 'mint', hex: '#10B981' },
  ];

  const priceRanges = [
    { label: '전체 가격', value: 'all' },
    { label: '5,000원 이하', value: 'under5k' },
    { label: '5,000원 ~ 10,000원', value: '5kTo10k' },
    { label: '10,000원 ~ 20,000원', value: '10kTo20k' },
    { label: '20,000원 이상', value: 'over20k' },
  ];

  const materials = ['아크릴', 'TPU / 하드케이스', '코튼 100%', '글라스 은경', '메탈 / 브라스'];
  const shapes = ['자유형 외곽선 커팅', '원형 / 타원형', '스탠드 디오라마형', '직사각형'];

  return (
    <aside className="w-56 shrink-0 hidden md:block space-y-4 pr-6 border-r border-stone-200">
      {/* Filter Header with Reset Button (MARPPLE Style) */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <h3 className="text-sm font-black text-stone-900 font-display">
          필터 검색
        </h3>
        <button
          onClick={resetFilters}
          className="text-stone-400 hover:text-stone-900 transition-colors p-1 rounded-md"
          title="필터 초기화"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Accordion Filter: 캐릭터 & 디자인 테마 (Horror / Cute) */}
      <div className="border-b border-stone-100 pb-3">
        <button
          onClick={() => toggleSection('theme')}
          className="w-full flex items-center justify-between text-xs font-bold text-stone-800 py-1.5 cursor-pointer"
        >
          <span>캐릭터 & 테마</span>
          {openSections.theme ? (
            <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>

        {openSections.theme && (
          <div className="space-y-1 pt-2">
            {themes.map((th) => {
              const isSelected = (th.value === '' && searchQuery === '') || (th.value !== '' && searchQuery === th.value);
              return (
                <button
                  key={th.value}
                  onClick={() => setSearchQuery(th.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{th.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion Filter 1: 색상 (Color) */}
      <div className="border-b border-stone-100 pb-3">
        <button
          onClick={() => toggleSection('color')}
          className="w-full flex items-center justify-between text-xs font-bold text-stone-800 py-1.5 cursor-pointer"
        >
          <span>색상</span>
          {openSections.color ? (
            <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>

        {openSections.color && (
          <div className="grid grid-cols-4 gap-2 pt-2">
            {colors.map((c) => {
              const isSelected = activeColorFilter === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => setActiveColorFilter(c.value)}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  title={c.label}
                >
                  <div
                    className={`w-6 h-6 rounded-full border transition-all flex items-center justify-center ${
                      isSelected
                        ? 'border-orange-600 ring-2 ring-orange-400 scale-110 shadow-xs'
                        : 'border-stone-300 group-hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-stone-900 drop-shadow" />
                    )}
                  </div>
                  <span className="text-[10px] text-stone-600 font-medium truncate max-w-full">
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion Filter 2: 가격대 (Price Range) */}
      <div className="border-b border-stone-100 pb-3">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-bold text-stone-800 py-1.5 cursor-pointer"
        >
          <span>가격대</span>
          {openSections.price ? (
            <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>

        {openSections.price && (
          <div className="space-y-1.5 pt-2 text-xs">
            {priceRanges.map((p) => {
              const isSelected = activePriceFilter === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => setActivePriceFilter(p.value)}
                  className={`w-full text-left px-2 py-1 rounded-md transition-colors text-xs flex items-center justify-between ${
                    isSelected
                      ? 'bg-orange-50 text-orange-700 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <span>{p.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-orange-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion Filter 3: 재질 (Material) */}
      <div className="border-b border-stone-100 pb-3">
        <button
          onClick={() => toggleSection('material')}
          className="w-full flex items-center justify-between text-xs font-bold text-stone-800 py-1.5 cursor-pointer"
        >
          <span>재질</span>
          {openSections.material ? (
            <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>

        {openSections.material && (
          <div className="space-y-1.5 pt-2 text-xs">
            {materials.map((m, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 cursor-pointer text-xs"
              >
                <input
                  type="checkbox"
                  className="rounded border-stone-300 text-orange-600 focus:ring-orange-500"
                />
                <span>{m}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Accordion Filter 4: 모양 (Shape) */}
      <div className="border-b border-stone-100 pb-3">
        <button
          onClick={() => toggleSection('shape')}
          className="w-full flex items-center justify-between text-xs font-bold text-stone-800 py-1.5 cursor-pointer"
        >
          <span>모양</span>
          {openSections.shape ? (
            <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>

        {openSections.shape && (
          <div className="space-y-1.5 pt-2 text-xs">
            {shapes.map((s, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 cursor-pointer text-xs"
              >
                <input
                  type="checkbox"
                  className="rounded border-stone-300 text-orange-600 focus:ring-orange-500"
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Accordion Filter 5: 인쇄방식 */}
      <div className="border-b border-stone-100 pb-3">
        <button
          onClick={() => toggleSection('print')}
          className="w-full flex items-center justify-between text-xs font-bold text-stone-800 py-1.5 cursor-pointer"
        >
          <span>인쇄방식</span>
          {openSections.print ? (
            <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>

        {openSections.print && (
          <div className="space-y-1.5 pt-2 text-xs text-stone-600">
            <div>• UV 양면 배면 인쇄</div>
            <div>• 홀로그램 박 가공</div>
            <div>• 450g 체인스티치 자수</div>
          </div>
        )}
      </div>

      {/* Accordion Filter 6: 최소 주문수량 */}
      <div className="pt-2">
        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-stone-700 space-y-1">
          <div className="font-bold text-amber-950 flex items-center gap-1">
            <span>✨ 1개부터 주문 가능</span>
          </div>
          <p className="text-[11px] text-stone-600">
            소량 제작부터 대량 단체 판촉 굿즈까지 단가 자동 할인 적용!
          </p>
        </div>
      </div>
    </aside>
  );
};
