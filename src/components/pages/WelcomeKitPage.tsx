import React, { useState } from 'react';
import {
  Package,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  FileText,
  Calculator,
  Building2,
  Send,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WelcomeKitPage: React.FC = () => {
  const { showToast, setIsChatDrawerOpen, setCurrentPage } = useApp();

  // Interactive Calculator State
  const [selectedKitIndex, setSelectedKitIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(50);

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('2026-11-15');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const kitPackages = [
    {
      id: 'kit-essential',
      title: '스타트업 에센셜 온보딩 키트 (Essential Onboarding)',
      subtitle: '신규 입사자 첫 출근 환영을 위한 가장 실용적인 5종 패키지',
      badge: '가장 많이 찾는 키트',
      basePrice: 32000,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      items: [
        '맞춤형 로고 하드 슬리브 패키지 박스',
        '2026 하드커버 만년 다이어리 (불박 각인)',
        '무광 메탈 젤펜 (레이저 로고 인쇄)',
        '크리스탈 투명 아크릴 로고 키링',
        '고급 인조가죽 사원증 목걸이 케이스',
      ],
      leadTime: '영업일 기준 5~7일',
    },
    {
      id: 'kit-tech',
      title: '프리미엄 테크 & 크리에이터 키트 (Premium Tech Kit)',
      subtitle: '개발자, 디자이너, VIP 고객을 위한 프리미엄 테크 굿즈 패키지',
      badge: '만족도 99%',
      basePrice: 68000,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      items: [
        '자석 오픈형 프리미엄 리지드 박스 & 스폰지 폼',
        '맥세이프 10000mAh 마그네틱 고속 보조배터리',
        '500ml 이중 진공 스테인리스 텀블러',
        '450g 헤비웨이트 코튼 자수 후드티',
        '리무버블 방수 로고 스티커 6종 세트',
      ],
      leadTime: '영업일 기준 7~10일',
    },
    {
      id: 'kit-eco',
      title: 'ESG 친환경 에코 오피스 키트 (Eco Green Kit)',
      subtitle: '지속 가능한 지구와 기업의 ESG 가치를 담은 친환경 패키지',
      badge: '친환경 인증',
      basePrice: 28000,
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      items: [
        '재생 크라프트 FSC 인증 패키지 박스',
        '사탕수수 유래 밤부 텀블러 (로고 각인)',
        '재생지 스프링 노트 & 대나무 볼펜',
        '순면 100% 캔버스 에코백',
        '천연 원목 손거울 (레이저 각인)',
      ],
      leadTime: '영업일 기준 5~7일',
    },
  ];

  const currentKit = kitPackages[selectedKitIndex];

  // Dynamic Volume Discount Calculation
  const getDiscountPercent = (qty: number) => {
    if (qty >= 500) return 35;
    if (qty >= 300) return 30;
    if (qty >= 100) return 25;
    if (qty >= 50) return 20;
    if (qty >= 30) return 15;
    return 10;
  };

  const discountRate = getDiscountPercent(quantity);
  const discountedUnitPrice = Math.round(currentKit.basePrice * (1 - discountRate / 100));
  const estimatedTotalPrice = discountedUnitPrice * quantity;

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !managerName || !phone) {
      showToast('회사명, 담당자명, 연락처를 모두 입력해주세요.', 'alert');
      return;
    }

    setIsSubmitted(true);
    showToast('웰컴 키트 견적 및 무료 샘플 요청이 접수되었습니다! 담당 관리자가 1시간 내로 연락드립니다.', 'success');
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen pb-20">
      {/* 1. Top Header Banner */}
      <section className="bg-stone-900 text-white border-b-2 border-stone-800 py-12 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>KOJIN B2B 기업 / 웰컴 키트 스튜디오</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
                신규 입사자의 첫 출근을 감동시키는 웰컴 키트
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                기업의 브랜드 아이덴티티를 온전히 담아낸 맞춤형 패키지. 로고 인쇄부터 포장 조립, 전국 개별 분할 배송까지 KOJIN 관리자가 원스톱으로 책임집니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('quote-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-black inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <FileText className="w-4 h-4 text-stone-950" />
                  <span>실시간 무료 견적 & 샘플 키트 신청</span>
                </button>
                <button
                  onClick={() => setIsChatDrawerOpen(true)}
                  className="px-5 py-3 bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>B2B 전담 관리자 1:1 상담</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-6 bg-stone-850 rounded-3xl border border-stone-700 space-y-4 max-w-sm text-xs">
              <div className="text-amber-400 font-mono font-bold uppercase tracking-wider text-[11px]">
                WHY KOJIN WELCOME KIT?
              </div>
              <div className="space-y-3 text-stone-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">최소 10개부터 소량 맞춤 제작</strong>
                    <p className="text-[11px] text-stone-400">스타트업, 소규모 팀도 부담 없는 10세트부터 주문 가능</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">실물 무료 샘플 사전 발송</strong>
                    <p className="text-[11px] text-stone-400">본생산 전 실제 제작 퀄리티를 미리 확인하실 수 있습니다</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">세금계산서 100% & 후불 결제 가능</strong>
                    <p className="text-[11px] text-stone-400">법인 결제, 세금계산서 발행 및 기업 맞춤 결제 조건 지원</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pre-curated Welcome Kit Packages Selection */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-stone-900">
            KOJIN 추천 웰컴 키트 패키지 라인업
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            패키지를 선택하시면 우측 견적 계산기에서 실시간 수량별 할인 금액을 확인하실 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {kitPackages.map((kit, index) => {
            const isSelected = selectedKitIndex === index;

            return (
              <div
                key={kit.id}
                onClick={() => setSelectedKitIndex(index)}
                className={`bg-white rounded-3xl border-2 transition-all p-6 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-orange-600 ring-2 ring-orange-200 shadow-md scale-[1.01]'
                    : 'border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full">
                      {kit.badge}
                    </span>
                    <span className="text-xs font-mono text-stone-400">{kit.leadTime}</span>
                  </div>

                  <div className="h-44 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img src={kit.image} alt={kit.title} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-stone-900 leading-snug">{kit.title}</h3>
                    <p className="text-xs text-stone-500 mt-1">{kit.subtitle}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <div className="text-xs font-bold text-stone-800">기본 구성품 (5종):</div>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {kit.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400">세트당 기본 정가</span>
                    <div className="font-mono text-lg font-black text-stone-950">
                      {kit.basePrice.toLocaleString()} 원
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-orange-600 text-white'
                        : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                    }`}
                  >
                    {isSelected ? '선택됨 ✓' : '선택하기'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive Kit Cost Calculator & Quote Request */}
      <section id="quote-form" className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Calculator Module */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-600" />
                <h3 className="text-xl font-display font-black text-stone-950">
                  웰컴 키트 실시간 견적 계산기
                </h3>
              </div>

              <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl space-y-2 text-xs">
                <div className="font-bold text-orange-950 flex items-center justify-between">
                  <span>선택된 패키지:</span>
                  <span className="font-black text-sm">{currentKit.title}</span>
                </div>
                <div className="text-stone-600">
                  기본 구성품 5종 + 맞춤형 브랜드 로고 인쇄 + 선물용 패키징 조립 완료 출고
                </div>
              </div>

              {/* Quantity Picker Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                  <span>제작 희망 수량:</span>
                  <span className="font-mono font-black text-orange-600 text-sm">{quantity} 세트</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[10, 30, 50, 100, 300, 500].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        quantity === q
                          ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {q}개
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation Output Box */}
              <div className="p-5 bg-stone-900 text-white rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2">
                  <span>수량별 대량 할인율</span>
                  <span className="font-bold text-amber-400 font-mono text-sm">
                    {discountRate}% 할인 적용됨
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span>세트당 단가 (할인가)</span>
                  <span className="font-mono font-bold text-white text-base">
                    {discountedUnitPrice.toLocaleString()} 원
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                  <span className="font-bold text-sm text-stone-200">예상 총 견적 (VAT 별도)</span>
                  <span className="font-mono font-black text-2xl text-amber-400">
                    {estimatedTotalPrice.toLocaleString()} 원
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-mono">
                  * 50세트 이상 주문 시 1회 실물 무료 샘플 제작 및 배송 포함
                </p>
              </div>
            </div>

            {/* Right: B2B Quote & Sample Request Form */}
            <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-stone-200 lg:pl-10 space-y-4">
              <div>
                <h4 className="font-bold text-base text-stone-900">
                  무료 샘플 키트 및 공식 견적서 신청
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  정보를 남겨주시면 KOJIN 관리자가 실물 샘플 키트 발송 및 PDF 공식 견적서를 신속히 전달해 드립니다.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-3 text-center">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-full mx-auto flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <h5 className="font-bold text-emerald-950 text-sm">
                    성공적으로 접수되었습니다!
                  </h5>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    남겨주신 연락처로 관리자가 웰컴 키트 실물 샘플 발송 안내 및 공식 견적서를 보내드립니다.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-emerald-900 font-bold underline"
                  >
                    추가 견적 작성하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">회사명 / 단체명 *</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="예: (주)코진엔터"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">담당자 성함 & 직함 *</label>
                      <input
                        type="text"
                        required
                        value={managerName}
                        onChange={(e) => setManagerName(e.target.value)}
                        placeholder="예: 김민수 팀장"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">연락처 (휴대폰) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-1234-5678"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-stone-800">회사 이메일 *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="manager@company.com"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-800">납기 희망일</label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-800">요청사항 & 로고 인쇄 문의</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="원하시는 추가 구성품이나 개별 택배 발송 여부 등을 자유롭게 적어주세요."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>공식 견적서 & 무료 샘플 신청하기</span>
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
