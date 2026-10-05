import React, { useState } from 'react';
import { Plus, FolderPlus, Smartphone, Key, Shirt, Briefcase, LayoutGrid, Edit2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductType } from '../../types';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, products } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Smartphone');
  const [featuredProductType, setFeaturedProductType] = useState<ProductType>('phone_case');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description.trim(),
      iconName,
      itemCount: 0,
      featuredProductType,
    });

    setName('');
    setDescription('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Category Taxonomy System CMS
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Organize custom goods classifications, storefront badges, and material taxonomy.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <FolderPlus className="w-4 h-4" />
          <span>New Goods Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const matchingProductsCount = products.filter(
            (p) =>
              p.categoryId === cat.id ||
              p.category.toLowerCase().replace(/\s+/g, '-') === cat.slug
          ).length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200/60">
                      {cat.iconName === 'Smartphone' && <Smartphone className="w-4 h-4" />}
                      {cat.iconName === 'Key' && <Key className="w-4 h-4" />}
                      {cat.iconName === 'Shirt' && <Shirt className="w-4 h-4" />}
                      {cat.iconName === 'Briefcase' && <Briefcase className="w-4 h-4" />}
                      {!['Smartphone', 'Key', 'Shirt', 'Briefcase'].includes(cat.iconName) && (
                        <LayoutGrid className="w-4 h-4" />
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-stone-900">
                      {cat.name}
                    </h3>
                  </div>

                  <span className="font-mono text-xs text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded">
                    {matchingProductsCount} active products
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {cat.description}
                </p>

                <div className="text-[11px] font-mono text-stone-400 pt-1">
                  Slug: /{cat.slug} · Type: {cat.featuredProductType}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Display Order: Standard</span>
                <span className="text-stone-700 font-medium">Storefront Enabled</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 space-y-4 shadow-2xl border border-stone-200">
            <h3 className="text-base font-serif font-bold text-stone-900">
              Create New Goods Category
            </h3>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bespoke Jewelry & Cufflinks"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Category Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description for storefront taxonomy..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Icon Symbol
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900"
                  >
                    <option value="Smartphone">Smartphone</option>
                    <option value="Key">Key Ring</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Briefcase">Briefcase</option>
                    <option value="LayoutGrid">General Grid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Mockup Type
                  </label>
                  <select
                    value={featuredProductType}
                    onChange={(e) =>
                      setFeaturedProductType(e.target.value as ProductType)
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900"
                  >
                    <option value="phone_case">Phone Case</option>
                    <option value="key_ring">Key Ring</option>
                    <option value="apparel">Apparel</option>
                    <option value="leather_goods">Leather Goods</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-3.5 py-1.5 text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
