import React from 'react';
import {
  Sparkles,
  Zap,
  Key,
  Layers,
  Image,
  Bookmark,
  Box,
  Smile,
  Smartphone,
  Eye,
  Shirt,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SubCategorySlider: React.FC = () => {
  const { subCategories, activeSubCategory, setActiveSubCategory, setSearchQuery, setCurrentPage } = useApp();

  const getSubCategoryIcon = (iconName: string, slug: string) => {
    switch (slug) {
      case 'all':
        return <span className="font-extrabold text-sm tracking-tight">All</span>;
      case '1min':
        return <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />;
      case 'keyring':
        return <Key className="w-5 h-5 text-emerald-600" />;
      case 'acrylic':
        return <Layers className="w-5 h-5 text-blue-500" />;
      case 'photocard':
        return <Image className="w-5 h-5 text-purple-500" />;
      case 'mirror':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'phone':
        return <Smartphone className="w-5 h-5 text-orange-600" />;
      case 'masking':
        return <Bookmark className="w-5 h-5 text-rose-500" />;
      case 'tincase':
        return <Box className="w-5 h-5 text-slate-500" />;
      case 'doll':
        return <Smile className="w-5 h-5 text-pink-500" />;
      case 'apparel':
        return <Shirt className="w-5 h-5 text-indigo-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  const handleSubCategoryClick = (slug: string) => {
    setActiveSubCategory(slug);
    if (slug === '1min') {
      setCurrentPage('templates');
      return;
    }
    // If selecting specific subcategory, we can focus search or filter
    if (slug === 'all') {
      setSearchQuery('');
    }
  };

  return (
    <div className="py-6 border-b border-stone-100 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-2 pt-1">
          {subCategories.map((item) => {
            const isActive = activeSubCategory === item.slug;

            return (
              <button
                key={item.id}
                onClick={() => handleSubCategoryClick(item.slug)}
                className="flex flex-col items-center gap-2.5 shrink-0 group cursor-pointer text-center"
              >
                {/* Circular Icon Holder */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'border-2 border-orange-600 bg-orange-50/50 shadow-xs'
                      : 'border border-stone-200 bg-[#FBFBFA] group-hover:border-stone-400 group-hover:scale-105'
                  }`}
                >
                  <div
                    className={`${
                      isActive ? 'text-orange-600 font-extrabold' : 'text-stone-700'
                    }`}
                  >
                    {getSubCategoryIcon(item.iconName, item.slug)}
                  </div>
                </div>

                {/* Subcategory Label */}
                <span
                  className={`text-xs font-bold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-orange-600 font-black'
                      : 'text-stone-700 group-hover:text-stone-900 font-medium'
                  }`}
                >
                  {item.nameKr}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
