import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LiveMockupPreview } from '../common/LiveMockupPreview';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    setIsCheckoutOpen,
    t,
    language,
    currentUser,
    requireAuth,
  } = useApp();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleCheckoutClick = () => {
    if (!currentUser) {
      setIsCartOpen(false);
      requireAuth('주문 결제를 진행하시려면 먼저 로그인해주세요.', () => {
        setIsCheckoutOpen(true);
      });
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l-2 border-stone-800">
          {/* Header */}
          <div className="px-6 py-5 border-b-2 border-stone-800 bg-[#FAF8F3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-orange-600" />
              <h2 className="text-base font-bold text-stone-900 font-display">
                {t('cartTitle')}
              </h2>
              <span className="font-mono text-xs font-bold bg-amber-200 text-stone-900 px-2 py-0.5 rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-stone-800">
                  {t('emptyCartTitle')}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  {t('emptyCartSub')}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-stone-900 bg-amber-300 rounded-xl hover:bg-amber-400 transition-colors border border-stone-800"
                >
                  {t('browseGoods')}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const title = language === 'kr' && item.product.titleKr ? item.product.titleKr : item.product.title;

                return (
                  <div key={item.id} className="py-4 flex gap-4 items-start">
                    {/* Item Mini Mockup */}
                    <div className="w-20 h-24 bg-stone-100 rounded-xl border border-stone-300 overflow-hidden flex items-center justify-center shrink-0">
                      <LiveMockupPreview
                        productType={item.product.productType}
                        customization={item.customization}
                        size="sm"
                        className="scale-90"
                      />
                    </div>

                    {/* Item Information */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-stone-900 leading-snug line-clamp-1">
                          {title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Custom Specs Pills */}
                      <div className="text-[11px] text-stone-600 space-y-0.5 font-mono">
                        {item.customization.character && (
                          <div className="text-orange-700 font-bold">
                            Theme: {item.customization.character}
                          </div>
                        )}
                        {item.customization.monogram && (
                          <div className="text-stone-900 font-bold">
                            Name: "{item.customization.monogram}"
                          </div>
                        )}
                        {item.customization.text && (
                          <div className="text-stone-500 italic truncate">
                            "{item.customization.text}"
                          </div>
                        )}
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                          ${item.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Module */}
          {cart.length > 0 && (
            <div className="p-6 border-t-2 border-stone-800 bg-[#FAF8F3] space-y-4">
              {/* Proofing Guarantee Note */}
              <div className="flex items-center gap-2 p-2.5 bg-amber-100 rounded-xl border border-amber-300 text-xs text-amber-950 font-medium">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-[11px] leading-tight">
                  {t('proofNotice')}
                </span>
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 font-medium">
                  <span>{language === 'kr' ? '상품 금액' : 'Subtotal'}</span>
                  <span className="font-mono tabular-nums text-stone-900 font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600 font-medium">
                  <span>{language === 'kr' ? '공방 무료 배송' : 'Shipping'}</span>
                  <span className="font-mono text-emerald-700 font-bold">{t('complimentaryShipping')}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>{t('estimatedTotal')}</span>
                  <span className="font-mono tabular-nums text-orange-600">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 bg-stone-950 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('proceedCheckout')}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
