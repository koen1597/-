import React, { useState } from 'react';
import {
  Boxes,
  Calculator,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Truck,
  Send,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Download,
  PhoneCall,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BulkOrderPage: React.FC = () => {
  const { products, showToast, setIsChatDrawerOpen, setCurrentPage } = useApp();

  // Calculator State
  const [selectedProductId, setSelectedProductId] = useState<string>(
    products[0]?.id || 'prod-acrylic-keyring'
  );
  const [bulkQuantity, setBulkQuantity] = useState<number>(100);

  // Form State
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-25');
  const [needTaxInvoice, setNeedTaxInvoice] = useState(true);
  const [packagingType, setPackagingType] = useState('individual_opp');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  // Volume discount tiers
  const discountTiers = [
    { range: '1~9개', min: 1, max: 9, percent: 0, perk: '기본가 (1개부터 제작)' },
    { range: '10~49개', min: 10, max: 49, percent: 10, perk: '소규모 단체 할인' },
    { range: '50~99개', min: 50, max: 99, percent: 20, perk: '디지털 시안 무료 지원' },
    { range: '100~299개', min: 100, max: 299, percent: 30, perk: '전담 관리자 1:1 배정' },
    { range: '300~499개', min: 300, max: 499, percent: 38, perk: '무료 배송 + 개별 포장' },
    { range: '500개 이상', min: 500, max: 99999, percent: 45, perk: '최대 45% OFF + 실물 사전 샘플 무료' },
  ];

  const getTier = (qty: number) => {
    if (qty >= 500) return discountTiers[5];
    if (qty >= 300) return discountTiers[4];
    if (qty >= 100) return discountTiers[3];
    if (qty >= 50) return discountTiers[2];
    if (qty >= 10) return discountTiers[1];
    return discountTiers[0];
  };

  const currentTier = getTier(bulkQuantity);
  const unitOriginalPrice = selectedProduct?.price || 3500;
  const unitDiscountedPrice = Math.round(
    unitOriginalPrice * (1 - currentTier.percent / 100)
  );
  const totalPrice = unitDiscountedPrice * bulkQuantity;
  const totalSavings = (unitOriginalPrice - unitDiscountedPrice) * bulkQuantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactName || !phone) {
      showToast('단체/기업명, 담당자명, 연락처를 입력해주세요.', 'alert');
      return;
    }

    setIsSubmitted(true);
    showToast(
      '대량 주문 견적 요청이 성공적으로 접수되었습니다! 전담 관리자가 30분 이내로 연락드립니다.',
      'success'
    );
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="bg-stone-900 text-white border-b-2 border-stone-800 py-12 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/30 text-orange-400 border border-orange-500/40 text-xs font-mono font-bold">
                <Boxes className="w-3.5 h-3.5" />
                <span>KOJIN 대량 주문 & B2B 단체 제작 센터</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
                10개부터 10,000개까지, 최대 45% 단체 할인
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                동아리, 학과 굿즈, 팬클럽 응원 굿즈, 기업 판촉 및 행사 굿즈까지! 전담 관리자가 배정되어 무료 1:1 시안 검수 및 실물 샘플 확인 후 안전하게 납품해 드립니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('bulk-calculator');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-black inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Calculator className="w-4 h-4 text-white" />
                  <span>실시간 수량별 견적 계산기 →</span>
                </button>
                <button
                  onClick={() => setIsChatDrawerOpen(true)}
                  className="px-5 py-3 bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>전담 관리자 실시간 상담</span>
                </button>
              </div>
            </div>

            {/* 4 Process Highlights */}
            <div className="p-6 bg-stone-850 rounded-3xl border border-stone-700 space-y-3 max-w-sm text-xs">
              <span className="font-mono text-amber-400 font-bold uppercase text-[10px]">
                4-STEP BULK PROCESS
              </span>
              <div className="space-y-2.5 text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-orange-400 font-black">01</span>
                  <span>견적 요청 & 도안 파일 전달</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-orange-400 font-black">02</span>
                  <span>관리자 1:1 고해상도 시안 무료 검수</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-orange-400 font-black">03</span>
                  <span>사전 실물 샘플 확인 및 승인</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-orange-400 font-black">04</span>
                  <span>정밀 양산 & 개별 포장 안심 배송</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tiered Discount Rate Table */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-stone-900">
            수량별 대량 주문 할인율 표
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            제작 수량이 많아질수록 단가는 대폭 내려가며, 500개 이상 제작 시 실물 사전 샘플 1회가 무료로 제공됩니다.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {discountTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                currentTier.range === tier.range
                  ? 'bg-orange-50 border-orange-600 ring-2 ring-orange-200'
                  : 'bg-white border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">{tier.range}</span>
                {tier.percent > 0 && (
                  <span className="bg-orange-600 text-white font-mono text-[10px] font-black px-1.5 py-0.5 rounded">
                    -{tier.percent}%
                  </span>
                )}
              </div>
              <div className="text-xl font-black font-mono text-stone-950">
                {tier.percent === 0 ? '기본가' : `${tier.percent}% OFF`}
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                {tier.perk}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Bulk Calculator & Quote Form */}
      <section id="bulk-calculator" className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Product Selector & Calculator */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-600" />
                <h3 className="text-xl font-display font-black text-stone-950">
                  대량 주문 실시간 자동 계산기
                </h3>
              </div>

              {/* Select Product */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800">
                  제작 희망 상품 선택:
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-50 border-2 border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:border-stone-900"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.titleKr || p.title} (기본단가: {p.price.toLocaleString()}원)
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Preset Buttons & Custom Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">주문 희망 수량:</span>
                  <span className="font-mono font-black text-orange-600 text-sm">
                    {bulkQuantity.toLocaleString()} 개
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[30, 50, 100, 300, 500, 1000].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setBulkQuantity(q)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        bulkQuantity === q
                          ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {q}개
                    </button>
                  ))}
                </div>

                <div className="pt-1">
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={bulkQuantity}
                    onChange={(e) => setBulkQuantity(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Output Display Card */}
              <div className="p-5 bg-stone-900 text-white rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2">
                  <span>적용된 대량 할인율</span>
                  <span className="font-bold text-amber-400 font-mono text-sm">
                    {currentTier.percent}% 할인 ({currentTier.range})
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span>정상 개당 단가</span>
                  <span className="font-mono text-stone-400 line-through">
                    {unitOriginalPrice.toLocaleString()} 원
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span>할인 적용된 개당 단가</span>
                  <span className="font-mono font-bold text-white text-base">
                    {unitDiscountedPrice.toLocaleString()} 원
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                  <span>총 절약 금액</span>
                  <span>-{totalSavings.toLocaleString()} 원 절약!</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                  <span className="font-bold text-sm text-stone-200">
                    예상 총 견적 (VAT 별도)
                  </span>
                  <span className="font-mono font-black text-2xl text-amber-400">
                    {totalPrice.toLocaleString()} 원
                  </span>
                </div>

                <div className="text-[11px] text-stone-400 font-mono">
                  * 제작 관리: 관리자 (KOJIN 전담 관리팀 1:1 배정)
                </div>
              </div>
            </div>

            {/* Right: B2B Quote Submission Form */}
            <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-stone-200 lg:pl-10 space-y-4">
              <div>
                <h4 className="font-bold text-base text-stone-900">
                  대량 제작 공식 견적서 및 샘플 요청
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  세금계산서 발행 및 납기 일정 상담을 위해 아래 정보를 입력해 주시면 관리자가 30분 이내로 견적서를 보내드립니다.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-3 text-center">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-full mx-auto flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h5 className="font-bold text-emerald-950 text-sm">
                    대량 주문 요청이 접수되었습니다!
                  </h5>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    남겨주신 번호로 관리자가 세부 일정 확인 및 PDF 공식 견적서를 전송해 드립니다.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-emerald-900 font-bold underline"
                  >
                    추가 견적 요청하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">단체 / 회사명 *</label>
                      <input
                        type="text"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="예: 홍익대 만화동아리 / (주)디자인랩"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">담당자 성함 *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="예: 이준혁"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">연락처 *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">이메일 *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@gmail.com"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">행사일 / 납기 희망일</label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">포장 방식</label>
                      <select
                        value={packagingType}
                        onChange={(e) => setPackagingType(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      >
                        <option value="individual_opp">개별 OPP 비닐 포장 (기본 무료)</option>
                        <option value="gift_box">선물용 크라프트 박스 포장 (+300원)</option>
                        <option value="bulk_box">벌크 묶음 포장 (환경보호)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="invoice-checkbox"
                      checked={needTaxInvoice}
                      onChange={(e) => setNeedTaxInvoice(e.target.checked)}
                      className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
                    />
                    <label htmlFor="invoice-checkbox" className="text-stone-800 font-bold cursor-pointer">
                      전자세금계산서 발행 희망 (사업자등록증 첨부 가능)
                    </label>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-800">도안 형태 및 세부 요청사항</label>
                    <textarea
                      rows={2}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="원하시는 각인 문구, 타공 위치, 고리 부자재 변경(카라비너/볼체인) 등을 적어주세요."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-950 hover:bg-orange-600 text-white rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>대량 주문 견적 요청서 전송</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
