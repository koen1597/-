import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Boxes,
  FolderTree,
  ArrowLeft,
  Wrench,
  ShieldCheck,
  Info,
  KeyRound,
  X,
  Users,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminOverview } from './AdminOverview';
import { AdminOrders } from './AdminOrders';
import { AdminMessaging } from './AdminMessaging';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminCustomers } from './AdminCustomers';
import { AdminSecurity } from './AdminSecurity';

export const AdminLayout: React.FC = () => {
  const {
    adminView,
    setAdminView,
    setAppMode,
    adminLogout,
    orders,
    conversations,
    users,
    t,
    language,
    setLanguage,
  } = useApp();

  const [showAdminNotice, setShowAdminNotice] = useState(true);

  const totalUnreadAdmin = conversations.reduce(
    (acc, c) => acc + c.unreadCountAdmin,
    0
  );
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered').length;

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col font-sans">
      {/* CMS Top Header */}
      <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b-2 border-stone-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-base tracking-wide text-white">
                {t('adminTitle')}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase bg-amber-400 text-stone-950 px-2 py-0.5 rounded">
                {t('adminStaffBadge')}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>비밀번호 인증 완료</span>
              </span>
            </div>
            <div className="text-[11px] text-stone-400 font-mono">
              {language === 'kr' ? 'KOJIN 주문 제작 관리 시스템 & 고객센터' : 'KOJIN Production & Support Management'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher in Admin */}
          <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
            <button
              onClick={() => setLanguage('kr')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                language === 'kr' ? 'bg-amber-400 text-stone-950' : 'text-stone-400'
              }`}
            >
              KR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                language === 'en' ? 'bg-amber-400 text-stone-950' : 'text-stone-400'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setAppMode('store')}
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 border border-stone-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('returnToStoreBtn')}</span>
          </button>

          {/* Admin Logout Button */}
          <button
            onClick={adminLogout}
            className="px-3.5 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="관리자 세션 종료 및 스토어로 복귀"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>관리자 로그아웃</span>
          </button>
        </div>
      </header>

      {/* Prominent Guidance Banner on How to access Admin in the future */}
      {showAdminNotice && (
        <div className="bg-amber-50 border-b-2 border-amber-300 px-6 py-3.5 text-xs text-amber-950 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-1 rounded-md bg-amber-300 text-stone-900 shrink-0 mt-0.5">
              <KeyRound className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="font-extrabold text-stone-900 text-xs">
                {t('futureAccessTitle')}
              </div>
              <p className="text-[11px] text-stone-700 leading-relaxed max-w-4xl font-medium">
                {t('futureAccessNote')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAdminNotice(false)}
            className="text-stone-400 hover:text-stone-700 p-1 shrink-0"
            title="알림 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main CMS Layout (Sidebar + Content) */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r-2 border-stone-800 p-4 space-y-6 shrink-0">
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              {language === 'kr' ? '공방 워크플로우' : 'Workshop Management'}
            </div>

            <button
              onClick={() => setAdminView('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                adminView === 'dashboard'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                <span>{t('adminOverview')}</span>
              </div>
            </button>

            <button
              onClick={() => setAdminView('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                adminView === 'orders'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-orange-400" />
                <span>{t('adminOrders')}</span>
              </div>
              {activeOrdersCount > 0 && (
                <span
                  className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-full ${
                    adminView === 'orders'
                      ? 'bg-amber-400 text-stone-950'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {activeOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminView('messages')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                adminView === 'messages'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>{t('adminMessages')}</span>
              </div>
              {totalUnreadAdmin > 0 && (
                <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded-full bg-orange-600 text-white animate-pulse">
                  {totalUnreadAdmin}
                </span>
              )}
            </button>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-stone-200">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              {language === 'kr' ? '회원 및 고객 관리' : 'Customer Management'}
            </div>

            <button
              onClick={() => setAdminView('customers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                adminView === 'customers'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-blue-500" />
                <span>{language === 'kr' ? '고객 정보 & 구매이력' : 'Customer Accounts'}</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                {users.length}명
              </span>
            </button>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-stone-200">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              {language === 'kr' ? '상품 & 카테고리 CMS' : 'Catalog & Taxonomy CMS'}
            </div>

            <button
              onClick={() => setAdminView('products')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                adminView === 'products'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Boxes className="w-4 h-4 text-emerald-400" />
              <span>{t('adminProducts')}</span>
            </button>

            <button
              onClick={() => setAdminView('categories')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                adminView === 'categories'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <FolderTree className="w-4 h-4 text-purple-400" />
              <span>{t('adminCategories')}</span>
            </button>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-stone-200">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              {language === 'kr' ? '보안 & 접근 제어' : 'Security & Access'}
            </div>

            <button
              onClick={() => setAdminView('security')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                adminView === 'security'
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <KeyRound className="w-4 h-4 text-amber-500" />
              <span>{language === 'kr' ? '비밀번호 & 보안 관리' : 'Password & Security'}</span>
            </button>
          </div>

          {/* Quick Access Helper in Sidebar */}
          <div className="p-3 bg-amber-50 rounded-2xl border-2 border-stone-800 text-xs text-stone-800 space-y-1 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]">
            <div className="font-black text-stone-900 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-orange-600" />
              <span>{language === 'kr' ? '관리자 단축키 안내' : 'Secret Hotkey'}</span>
            </div>
            <p className="text-[11px] text-stone-600 font-mono">
              Alt + A 로 스토어 ↔ 관리자 전환!
            </p>
          </div>
        </aside>

        {/* Dynamic CMS View Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {adminView === 'dashboard' && <AdminOverview />}
          {adminView === 'orders' && <AdminOrders />}
          {adminView === 'messages' && <AdminMessaging />}
          {adminView === 'customers' && <AdminCustomers />}
          {adminView === 'products' && <AdminProducts />}
          {adminView === 'categories' && <AdminCategories />}
          {adminView === 'security' && <AdminSecurity />}
        </main>
      </div>
    </div>
  );
};
