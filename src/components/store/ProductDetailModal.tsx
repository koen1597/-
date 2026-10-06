import React, { useState } from 'react';
import { X, Check, ShieldCheck, Clock, MessageSquare, ShoppingBag, Sparkles, HelpCircle, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomSelection } from '../../types';
import { LiveMockupPreview } from '../common/LiveMockupPreview';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    openChatWithArtisan,
    t,
    language,
    currentUser,
    requireAuth,
    setIsCheckoutOpen,
  } = useApp();

  if (!selectedProduct) return null;

  // Initialize custom selection from product options
  const [customization, setCustomization] = useState<CustomSelection>(() => {
    const initial: CustomSelection = {
      deviceModel: 'iphone_16_pro',
      size: 'L',
      font: 'sans',
      finish: 'holo',
      specialNotes: '',
    };

    // Pick first color option
    const colorOpt = selectedProduct.customizationOptions.find((o) => o.type === 'color');
    if (colorOpt && colorOpt.options && colorOpt.options.length > 0) {
      initial.color = colorOpt.options[0].value;
      initial.colorHex = colorOpt.options[0].hex;
    }

    // Pick first character option
    const charOpt = selectedProduct.customizationOptions.find((o) => o.type === 'character');
    if (charOpt && charOpt.options && charOpt.options.length > 0) {
      initial.character = charOpt.options[0].value;
    }

    // Default monogram or text based on product type
    if (selectedProduct.productType === 'phone_case') {
      initial.monogram = language === 'kr' ? '코진' : 'KOJIN';
      initial.text = 'SWEET BERRY';
      if (!initial.character) {
        initial.character = 'fluffy_bunny';
      }
    } else if (selectedProduct.productType === 'mirror') {
      initial.monogram = language === 'kr' ? '민지' : 'MINJI';
      initial.text = language === 'kr' ? '오늘도 눈부시게 빛나!' : 'Stay Sunny!';
      if (!initial.character) {
        initial.character = 'happy_quokka';
      }
    } else if (selectedProduct.productType === 'key_ring') {
      initial.monogram = 'BERRY';
      initial.text = 'KOJIN STUDIO';
      if (!initial.character) {
        initial.character = 'fluffy_bunny';
      }
    } else if (selectedProduct.productType === 'apparel') {
      initial.monogram = 'KOJIN';
      initial.text = 'KOJIN ATELIER';
      if (!initial.character) {
        initial.character = 'fluffy_bunny';
      }
    }

    return initial;
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'customize' | 'details'>('customize');

  const handleColorChange = (value: string, hex?: string) => {
    setCustomization((prev) => ({
      ...prev,
      color: value,
      colorHex: hex || prev.colorHex,
    }));
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      requireAuth('장바구니 담기는 회원 로그인 후 이용하실 수 있습니다.', () => {
        addToCart(selectedProduct, customization, quantity);
        setSelectedProduct(null);
      });
      return;
    }
    addToCart(selectedProduct, customization, quantity);
    setSelectedProduct(null);
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      requireAuth('바로 구매 및 결제는 회원 로그인 후 이용하실 수 있습니다.', () => {
        addToCart(selectedProduct, customization, quantity);
        setSelectedProduct(null);
        setIsCheckoutOpen(true);
      });
      return;
    }
    addToCart(selectedProduct, customization, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const title = language === 'kr' && selectedProduct.titleKr ? selectedProduct.titleKr : selectedProduct.title;
  const category = language === 'kr' && selectedProduct.categoryKr ? selectedProduct.categoryKr : selectedProduct.category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-stone-800 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-stone-800 bg-[#FAF8F3]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded border border-orange-300">
              {t('configuratorBadge')}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-700 font-bold">
              {category}
            </span>
          </div>

          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Column: Live Interactive Mockup */}
          <div className="lg:col-span-5 bg-[#FAF6ED] p-6 sm:p-8 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-stone-800">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-600 mb-4 font-bold">
                <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500">
                  {t('livePreview')}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t('realtimeRender')}
                </span>
              </div>

              {/* Dynamic Mockup */}
              <div className="bg-white rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] border-2 border-stone-800">
                <LiveMockupPreview
                  productType={selectedProduct.productType}
                  customization={customization}
                  size="hero"
                />
              </div>

              {/* Dynamic specs summary preview */}
              <div className="mt-4 p-3 bg-white rounded-xl border border-stone-300 text-xs text-stone-700 space-y-1 font-mono">
                <div className="text-[10px] text-orange-700 font-bold uppercase tracking-widest">
                  {t('liveSpecManifest')}
                </div>
                {customization.character && (
                  <div>• Theme: {customization.character.toUpperCase()}</div>
                )}
                {customization.deviceModel && (
                  <div>• Model: {customization.deviceModel.replace(/_/g, ' ').toUpperCase()}</div>
                )}
                {customization.monogram && (
                  <div>• Monogram/Name: "{customization.monogram}"</div>
                )}
                {customization.text && (
                  <div>• Inscription: "{customization.text}"</div>
                )}
              </div>
            </div>

            {/* KOJIN Production & Support Assurance Card */}
            <div className="mt-6 pt-4 border-t border-stone-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                  KOJIN
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    KOJIN 제작 랩 & 품질 검수
                  </div>
                  <div className="text-[11px] text-stone-500">
                    1:1 시안 검수 및 제작 상담 지원
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  openChatWithArtisan(
                    'team-kojin-support',
                    'KOJIN 고객센터',
                    '1:1 제작 문의 & 고객지원팀',
                    '',
                    undefined,
                    undefined,
                    selectedProduct.titleKr || selectedProduct.title
                  )
                }
                className="text-xs text-orange-600 hover:text-orange-700 font-bold inline-flex items-center gap-1.5 underline cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                <span>{t('askArtisan')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customization Controls & Purchase Module */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h2 className="text-xl sm:text-2xl font-display font-black text-stone-900">
                    {title}
                  </h2>
                  <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">
                    ${selectedProduct.price}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 p-1 bg-stone-200 rounded-xl text-xs font-bold w-fit border border-stone-300">
                <button
                  type="button"
                  onClick={() => setActiveTab('customize')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'customize'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t('tabConfigure')}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t('tabDetails')}
                </button>
              </div>

              {activeTab === 'customize' ? (
                <div className="space-y-5">
                  {/* Customization Options */}
                  {selectedProduct.customizationOptions.map((opt) => {
                    // Character / Graphic Theme Selector
                    if (opt.type === 'character') {
                      return (
                        <div key={opt.id} className="space-y-1.5">
                          <label className="block text-xs font-bold text-stone-800 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-orange-600" />
                            <span>{t('labelCharacter')}</span>
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {opt.options?.map((choice) => (
                              <button
                                key={choice.value}
                                type="button"
                                onClick={() =>
                                  setCustomization((prev) => ({
                                    ...prev,
                                    character: choice.value,
                                  }))
                                }
                                className={`p-2.5 rounded-xl border-2 text-left text-xs font-bold transition-all ${
                                  customization.character === choice.value
                                    ? 'bg-amber-100 border-stone-900 ring-2 ring-amber-400 text-stone-900 shadow-xs'
                                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                                }`}
                              >
                                {choice.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // Device Model Selector
                    if (opt.type === 'device_model') {
                      return (
                        <div key={opt.id} className="space-y-1.5">
                          <label className="block text-xs font-bold text-stone-800">
                            {t('labelDevice')}
                          </label>
                          <select
                            value={customization.deviceModel || ''}
                            onChange={(e) =>
                              setCustomization((prev) => ({
                                ...prev,
                                deviceModel: e.target.value,
                              }))
                            }
                            className="w-full text-xs font-medium bg-stone-50 border-2 border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-900"
                          >
                            {opt.options?.map((choice) => (
                              <option key={choice.value} value={choice.value}>
                                {choice.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    }

                    // Color Swatches
                    if (opt.type === 'color') {
                      return (
                        <div key={opt.id} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-stone-800">
                              {t('labelColor')}
                            </label>
                            <span className="text-xs text-stone-500 font-mono font-bold">
                              {
                                opt.options?.find(
                                  (c) => c.value === customization.color
                                )?.label
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            {opt.options?.map((choice) => {
                              const isSelected = customization.color === choice.value;

                              return (
                                <button
                                  key={choice.value}
                                  type="button"
                                  onClick={() => handleColorChange(choice.value, choice.hex)}
                                  className={`group relative w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                                    isSelected
                                      ? 'border-stone-900 ring-2 ring-stone-900 scale-110 shadow-sm'
                                      : 'border-stone-300 hover:scale-105'
                                  }`}
                                  style={{ backgroundColor: choice.hex || '#666' }}
                                  title={choice.label}
                                >
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // Monogram / Name Field
                    if (opt.type === 'monogram') {
                      return (
                        <div key={opt.id} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-stone-800">
                              {t('labelMonogram')}
                            </label>
                            <span className="text-[11px] font-mono text-stone-500">
                              {(customization.monogram || '').length} / {opt.maxLength || 8}
                            </span>
                          </div>
                          <input
                            type="text"
                            value={customization.monogram || ''}
                            onChange={(e) =>
                              setCustomization((prev) => ({
                                ...prev,
                                monogram: e.target.value.slice(0, opt.maxLength || 8),
                              }))
                            }
                            maxLength={opt.maxLength || 8}
                            placeholder={opt.placeholder || 'KOJIN / MINJI'}
                            className="w-full text-xs font-bold bg-white border-2 border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-900"
                          />
                          {opt.helpText && (
                            <p className="text-[11px] text-stone-500">{opt.helpText}</p>
                          )}
                        </div>
                      );
                    }

                    // Custom Inscription Text
                    if (opt.type === 'text') {
                      return (
                        <div key={opt.id} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-stone-800">
                              {t('labelInscription')}
                            </label>
                            <span className="text-[11px] font-mono text-stone-500">
                              {(customization.text || '').length} / {opt.maxLength || 20}
                            </span>
                          </div>
                          <input
                            type="text"
                            value={customization.text || ''}
                            onChange={(e) =>
                              setCustomization((prev) => ({
                                ...prev,
                                text: e.target.value.slice(0, opt.maxLength || 20),
                              }))
                            }
                            maxLength={opt.maxLength || 20}
                            placeholder={opt.placeholder || 'OVER 9000!'}
                            className="w-full text-xs font-medium bg-white border-2 border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:border-stone-900"
                          />
                        </div>
                      );
                    }

                    return null;
                  })}

                  {/* Special Artisan Note field */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <span>{t('labelSpecialNotes')}</span>
                      <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
                    </label>
                    <input
                      type="text"
                      value={customization.specialNotes || ''}
                      onChange={(e) =>
                        setCustomization((prev) => ({
                          ...prev,
                          specialNotes: e.target.value,
                        }))
                      }
                      placeholder={t('placeholderNotes')}
                      className="w-full text-xs bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>
              ) : (
                /* Craftsmanship Details Tab */
                <div className="space-y-4 text-xs text-stone-700">
                  <div className="space-y-2">
                    <div className="font-bold text-stone-900">
                      {language === 'kr' ? '공방 수제작 품질 기준' : 'Workshop Standards'}
                    </div>
                    <ul className="space-y-2">
                      {selectedProduct.craftsmanshipDetails.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 space-y-1">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>{t('craftGuarantee')}</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      {t('proofNotice')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Buy / Add to Bag Action Bar */}
            <div className="pt-4 border-t-2 border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border-2 border-stone-800 rounded-xl bg-stone-100">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs font-bold text-stone-700 hover:text-stone-950"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-mono font-bold text-stone-950">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs font-bold text-stone-700 hover:text-stone-950"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 border-2 border-stone-800 text-stone-900 text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-orange-600" />
                  <span>{t('addToBag')}</span>
                </button>

                {/* Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 bg-stone-950 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>
                    바로 구매 — {(selectedProduct.price * quantity).toLocaleString()}원
                  </span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="flex items-center justify-between text-[11px] text-stone-600 font-mono font-medium pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-500" />
                  {selectedProduct.leadTimeDays}{t('craftDays')}
                </span>
                <span className="flex items-center gap-1 text-orange-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('craftGuarantee')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
