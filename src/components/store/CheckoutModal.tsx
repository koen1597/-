import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CreditCard, ArrowRight, Truck, Sparkles, Smartphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShippingAddress } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    placeOrder,
    user,
    currentUser,
    requireAuth,
    t,
    language,
  } = useApp();

  if (!isCheckoutOpen) return null;

  if (!currentUser) {
    setIsCheckoutOpen(false);
    requireAuth('주문 결제는 회원 로그인 후 진행하실 수 있습니다.');
    return null;
  }

  const defaultAddr = user.savedAddresses[0] || {
    fullName: user.name,
    street: '서울특별시 마포구 와우산로 120 (홍대입구)',
    city: '서울',
    state: '마포구',
    postalCode: '04052',
    country: '대한민국 (South Korea)',
    phone: user.phone,
  };

  const [shipping, setShipping] = useState<ShippingAddress>(defaultAddr);
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'kakao' | 'escrow'>('kakao');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4289');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = Number((subtotal * 0.1).toFixed(2)); // 10% VAT
  const total = Number((subtotal + tax).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const paymentLabel =
        paymentMethod === 'kakao'
          ? (language === 'kr' ? '카카오페이 / 네이버페이' : 'KakaoPay / NaverPay')
          : paymentMethod === 'escrow'
          ? (language === 'kr' ? '에스크로 안심 결제' : 'Artisan Escrow')
          : `신용카드 (Mastercard 끝자리 ${cardNumber.slice(-4)})`;

      placeOrder(shipping, paymentLabel, customerNotes);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-stone-800 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-stone-800 bg-[#FAF8F3]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span className="text-sm font-bold text-stone-900 font-display">
              {t('checkoutTitle')}
            </span>
            <span className="text-xs text-stone-500 font-mono">· 256-Bit SSL</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Account / Contact Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                {t('stepContact')}
              </h3>
              <span className="text-xs text-stone-500 font-mono">
                {user.name} ({user.email})
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-medium">{language === 'kr' ? '주문자 이름' : 'Full Name'}</label>
                <input
                  type="text"
                  required
                  value={shipping.fullName}
                  onChange={(e) =>
                    setShipping((p) => ({ ...p, fullName: e.target.value }))
                  }
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:outline-none focus:border-stone-900"
                />
              </div>
              <div>
                <label className="block text-stone-600 mb-1 font-medium">{language === 'kr' ? '연락처 휴대폰' : 'Phone Number'}</label>
                <input
                  type="text"
                  required
                  value={shipping.phone}
                  onChange={(e) =>
                    setShipping((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-3 pt-3 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-600" />
                <span>{t('stepShipping')}</span>
              </h3>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {t('complimentaryShipping')}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-medium">{language === 'kr' ? '기본 배송 주소' : 'Street Address'}</label>
                <input
                  type="text"
                  required
                  value={shipping.street}
                  onChange={(e) =>
                    setShipping((p) => ({ ...p, street: e.target.value }))
                  }
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:outline-none focus:border-stone-900"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">{language === 'kr' ? '도시 / 구' : 'City'}</label>
                  <input
                    type="text"
                    required
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping((p) => ({ ...p, city: e.target.value }))
                    }
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">{language === 'kr' ? '지역 / 도' : 'State'}</label>
                  <input
                    type="text"
                    required
                    value={shipping.state}
                    onChange={(e) =>
                      setShipping((p) => ({ ...p, state: e.target.value }))
                    }
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">{language === 'kr' ? '우편번호' : 'Postal Code'}</label>
                  <input
                    type="text"
                    required
                    value={shipping.postalCode}
                    onChange={(e) =>
                      setShipping((p) => ({ ...p, postalCode: e.target.value }))
                    }
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Artisan Design Instructions */}
          <div className="space-y-2 pt-3 border-t border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              {t('stepNotes')}
            </h3>
            <textarea
              rows={2}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder={t('placeholderNotes')}
              className="w-full text-xs bg-stone-50 border-2 border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-stone-900"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-3 pt-3 border-t border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              {t('stepPayment')}
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('kakao')}
                className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === 'kakao'
                    ? 'border-stone-900 bg-amber-100 ring-2 ring-amber-400 text-stone-950 shadow-xs'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-black text-stone-900">
                  <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                  <span>간편결제</span>
                </div>
                <div className="text-[10px] text-stone-600 mt-0.5">카카오·네이버페이</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-stone-900 bg-amber-100 ring-2 ring-amber-400 text-stone-950 shadow-xs'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{t('payCard')}</span>
                </div>
                <div className="text-[10px] text-stone-600 mt-0.5">모든 카드 지원</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('escrow')}
                className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === 'escrow'
                    ? 'border-stone-900 bg-amber-100 ring-2 ring-amber-400 text-stone-950 shadow-xs'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="font-bold text-stone-900">에스크로</div>
                <div className="text-[10px] text-stone-600 mt-0.5">시안 승인 시 입금</div>
              </button>
            </div>
          </div>

          {/* Itemized Order Review */}
          <div className="p-4 bg-stone-100 rounded-2xl border border-stone-300 text-xs space-y-2">
            <div className="font-bold text-stone-900 mb-1">{language === 'kr' ? '주문 상품 요약' : 'Order Items'}:</div>
            {cart.map((item) => {
              const itemTitle = language === 'kr' && item.product.titleKr ? item.product.titleKr : item.product.title;

              return (
                <div key={item.id} className="flex justify-between items-start text-stone-700">
                  <div>
                    <span className="font-bold text-stone-900">
                      {item.quantity}x {itemTitle}
                    </span>
                    <span className="block text-[11px] text-stone-500 font-mono">
                      {item.customization.character && `Theme: ${item.customization.character} · `}
                      {item.customization.monogram && `Name: "${item.customization.monogram}" · `}
                      {item.customization.text && `"${item.customization.text}"`}
                    </span>
                  </div>
                  <span className="font-mono tabular-nums text-stone-900 font-bold">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                </div>
              );
            })}

            <div className="pt-2 border-t border-stone-200 space-y-1 text-stone-600">
              <div className="flex justify-between">
                <span>{language === 'kr' ? '공방 상품가' : 'Subtotal'}</span>
                <span className="font-mono tabular-nums font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'kr' ? '부가세 (10%)' : 'Tax'}</span>
                <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-stone-950 text-sm pt-1 border-t border-stone-200">
                <span>{t('estimatedTotal')}</span>
                <span className="font-mono tabular-nums text-orange-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-stone-950 hover:bg-stone-800 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isProcessing ? (
                <span>{t('processingOrder')}</span>
              ) : (
                <>
                  <span>{t('authorizeOrder')} (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
              <span>{t('craftGuarantee')}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
