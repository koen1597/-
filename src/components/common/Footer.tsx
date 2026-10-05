import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveCategory, setAppMode, setIsChatDrawerOpen, setCurrentPage, t, language } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 text-sm border-t border-stone-800">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Ethos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display font-black text-amber-400 tracking-tight">
                KOJIN
              </span>
              <span className="text-xs font-mono bg-stone-800 text-stone-400 px-2 py-0.5 rounded">
                STUDIO
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              {t('footerEthos')}
            </p>
            <div className="text-xs text-stone-500 font-mono">
              Seoul Custom Lab & Print Studio
            </div>
          </div>

          {/* Custom Goods Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {language === 'kr' ? '커스텀 카테고리' : 'Custom Categories'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setActiveCategory('phone-cases');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navPhoneCases')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setActiveCategory('fangoods');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navKeyHolders')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setActiveCategory('mirrors');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navMirrors')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setActiveCategory('apparel');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navApparel')}
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & B2B Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {language === 'kr' ? '고객센터 & 서비스' : 'Customer & Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsChatDrawerOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  고객센터 1:1 상담 문의
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('templates')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  1분컷 무료 디자인 템플릿
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('welcome-kit')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  기업 / 신규 입사자 웰컴 키트
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('bulk-order')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  대량 주문 & 단체 할인 견적
                </button>
              </li>
            </ul>
          </div>

          {/* Discreet Staff Admin Channel (Direct answer to question #2) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {language === 'kr' ? '스태프 & 제작실' : 'Staff Access'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'kr'
                ? '관리자 화면은 상단 버튼 외에도 브라우저 주소창에 #admin을 붙이거나, 키보드 단축키(Alt+A), 또는 아래 자물쇠 링크를 통해 언제든지 비공개 접속 가능합니다.'
                : 'Access the admin studio anytime via URL #admin, keyboard shortcut (Alt+A), or the discreet link below.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setAppMode('admin')}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-400 transition-colors py-1 px-2 rounded bg-stone-800/80 border border-stone-700/60 font-mono"
                title="스태프 전용 관리자 포털 (단축키: Alt + A)"
              >
                <Lock className="w-3 h-3 text-stone-400" />
                <span>{t('staffAccess')} (#admin)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            {t('footerCopyright')}
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Alt+A: 빠른 관리자 토글</span>
            <span>·</span>
            <span>#admin 직접 접근 가능</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
