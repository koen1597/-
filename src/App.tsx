import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroBanner } from './components/store/HeroBanner';
import { SubCategorySlider } from './components/store/SubCategorySlider';
import { SidebarFilter } from './components/store/SidebarFilter';
import { MarppleProductGrid } from './components/store/MarppleProductGrid';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { OrderTrackerView } from './components/store/OrderTrackerView';
import { ChatDrawer } from './components/messaging/ChatDrawer';
import { AdminLayout } from './components/admin/AdminLayout';
import { KojinShopPage } from './components/pages/KojinShopPage';
import { QuickTemplatesPage } from './components/pages/QuickTemplatesPage';
import { WelcomeKitPage } from './components/pages/WelcomeKitPage';
import { BulkOrderPage } from './components/pages/BulkOrderPage';
import { CustomerAuthPage } from './components/pages/CustomerAuthPage';
import { MyProfilePage } from './components/pages/MyProfilePage';
import { GoogleOAuthPage } from './components/pages/GoogleOAuthPage';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AuthRequiredModal } from './components/common/AuthRequiredModal';
import { Sparkles, CheckCircle2, MessageSquare, Zap } from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const {
    selectedOrderId,
    setSelectedOrderId,
    setIsChatDrawerOpen,
    t,
    language,
    currentPage,
    setCurrentPage,
  } = useApp();

  // Full-screen authentic Google OAuth 2.0 redirect page
  if (currentPage === 'google_oauth') {
    return <GoogleOAuthPage />;
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 'shop':
        return <KojinShopPage />;
      case 'templates':
        return <QuickTemplatesPage />;
      case 'welcome-kit':
        return <WelcomeKitPage />;
      case 'bulk-order':
        return <BulkOrderPage />;
      case 'login':
      case 'signup':
        return <CustomerAuthPage />;
      case 'account':
      case 'profile':
        return <MyProfilePage />;
      case 'home':
      default:
        return (
          <>
            {/* Storefront Hero Showcase */}
            <HeroBanner />

            {/* SubCategory Circular Icons Carousel (1분컷 굿즈, 키링, 아크릴, 포토카드, 거울 등) */}
            <SubCategorySlider />

            {/* Main Catalog & Shopping Mall Layout: Sidebar Filter + 4-Column Product Grid */}
            <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left: Collapsible Sticky Sidebar Filter */}
                <SidebarFilter />

                {/* Right: Marpple Product Grid with Badges, Live Previews & Sort Controls */}
                <MarppleProductGrid />
              </div>
            </section>

            {/* Playful & Hippy Craftsmanship Story Section */}
            <section className="bg-stone-900 text-stone-100 py-16 border-t-2 border-stone-800">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                  <div className="lg:col-span-2 space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                      {language === 'kr' ? 'KOJIN 1:1 고객센터 & 제작 케어' : 'KOJIN Customer Support & Care'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight">
                      {language === 'kr'
                        ? '세상에 단 하나뿐인 나만의 굿즈, KOJIN 정밀 맞춤 제작.'
                        : 'Custom made goods tailored just for you, crafted with precision by KOJIN.'}
                    </h2>
                    <p className="text-stone-300 text-sm leading-relaxed max-w-2xl font-normal">
                      {language === 'kr'
                        ? '고딕 호러 폰케이스부터 귀여운 동물 손거울, 아크릴 키링까지! 주문 즉시 전문 제작 관리팀이 배정되어 1:1로 고해상도 시안을 확인해 드립니다. 원하시는 문구나 세부 위치, 대량 주문 등은 고객센터 1:1 상담을 통해 편하게 이야기 나누실 수 있습니다.'
                        : 'From gothic horror phone cases to cute animal mirrors and acrylic key holders, our production team renders high-res proofs before crafting. Reach our support desk anytime for custom inquiries.'}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4">
                      <button
                        onClick={() => setIsChatDrawerOpen(true)}
                        className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-black inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                      >
                        <MessageSquare className="w-4 h-4 text-stone-950" />
                        <span>{t('heroCtaConsult')}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 bg-stone-800 rounded-3xl border-2 border-stone-700 space-y-4 text-xs shadow-xl">
                    <h3 className="font-black text-white uppercase tracking-wider text-xs flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>{language === 'kr' ? 'KOJIN 제작 & 고객 케어 프로세스' : 'The KOJIN Workflow'}</span>
                    </h3>
                    <div className="space-y-3 text-stone-300 font-medium">
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-amber-400 text-xs font-bold">01</span>
                        <span>{language === 'kr' ? '원하는 캐릭터, 배경색, 한글/영문 닉네임을 선택합니다.' : 'Select character, colors, and your custom nickname.'}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-amber-400 text-xs font-bold">02</span>
                        <span>{language === 'kr' ? '24시간 이내 관리자가 등록한 1:1 시안을 확인하고 수정 요청이 가능합니다.' : 'Receive 1:1 digital proof and chat with support for any changes.'}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-amber-400 text-xs font-bold">03</span>
                        <span>{language === 'kr' ? '고객님이 [시안 승인]을 누르면 실물 정밀 인쇄/제작이 시작됩니다.' : 'Approve proof to authorize physical precision crafting.'}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-amber-400 text-xs font-bold">04</span>
                        <span>{language === 'kr' ? '실시간 타임라인으로 제작 단계 및 송장을 조회합니다.' : 'Track real-time workshop milestones straight to your door.'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F2] font-sans">
      <Header />

      <main className="flex-1">
        {selectedOrderId ? (
          <div>
            <div className="bg-stone-200/80 border-b border-stone-300 py-2.5 px-4">
              <div className="container mx-auto flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedOrderId(null)}
                  className="font-bold text-stone-700 hover:text-stone-950 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  ← {language === 'kr' ? '스토어로 돌아가기' : 'Return to Store'}
                </button>
                <span className="font-mono text-stone-600 font-bold">
                  {language === 'kr' ? '실시간 제작 현황 조회 중' : 'Live Order Tracking Active'}
                </span>
              </div>
            </div>
            <OrderTrackerView />
          </div>
        ) : (
          renderPageContent()
        )}
      </main>

      <Footer />

      {/* Interactive Drawers & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <ChatDrawer />
    </div>
  );
};

const ToastAlert: React.FC = () => {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
      <div className="bg-stone-950 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center gap-3">
        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="leading-snug font-bold">{toast.message}</span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <ToastAlert />
    </AppProvider>
  );
}

const AppContent: React.FC = () => {
  const { appMode } = useApp();

  return (
    <>
      {appMode === 'admin' ? (
        <>
          <AdminLayout />
          <ChatDrawer />
        </>
      ) : (
        <StorefrontContent />
      )}

      {/* Global Modals: Admin Authentication Gateway (5696) */}
      <AdminLoginModal />

      {/* Access Control: Real Firebase Authentication Required Modal */}
      <AuthRequiredModal />
    </>
  );
};
