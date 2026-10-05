import React from 'react';
import { Smartphone, Key, Shirt, Sparkles, LayoutGrid, Search, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CategoryFilter: React.FC = () => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    products,
    t,
    language,
  } = useApp();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'Key':
        return <Key className="w-3.5 h-3.5" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'Shirt':
        return <Shirt className="w-3.5 h-3.5" />;
      default:
        return <LayoutGrid className="w-3.5 h-3.5" />;
    }
  };

  const filteredCount = products.filter((p) => {
    const matchesCategory =
      activeCategory === 'all' ||
      p.categoryId === `cat-${activeCategory}` ||
      p.category.toLowerCase().replace(/\s+/g, '-').includes(activeCategory);
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.titleKr && p.titleKr.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).length;

  return (
    <div className="space-y-4 mb-8">
      {/* Upper Controls Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-2xl overflow-x-auto scrollbar-none border border-stone-300">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{t('filterAll')}</span>
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{language === 'kr' && cat.nameKr ? cat.nameKr : cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar with Clear Affordance */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border-2 border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Quiet Unboxed Metadata Line */}
      <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
        <span>{t('showingCount', { count: filteredCount })}</span>
        <span aria-hidden="true">·</span>
        <span className="text-orange-700 font-bold">{t('freeEngravingNotice')}</span>
      </div>
    </div>
  );
};
