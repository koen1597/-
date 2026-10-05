import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, MessageSquare, Zap, Eye, Ghost, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LiveMockupPreview } from '../common/LiveMockupPreview';

export const HeroBanner: React.FC = () => {
  const { setActiveCategory, setSelectedProduct, products, setIsChatDrawerOpen, setCurrentPage, t, language } = useApp();

  // Interactive Theme Selector in Hero Showcase
  const [heroTheme, setHeroTheme] = useState<'skull' | 'bunny' | 'ghost' | 'quokka'>('bunny');

  const heroConfigs = {
    bunny: {
      character: 'fluffy_bunny',
      colorHex: '#FB7185',
      monogram: 'BUNNY',
      text: 'SWEET BERRY',
      label: '🐰 큐트 카와이 (Cute Bunny)',
      tag: 'CUTE THEME',
    },
    skull: {
      character: 'gothic_skull',
      colorHex: '#18181B',
      monogram: 'GOTHIC',
      text: 'DARK BLOOD MOON',
      label: '💀 고딕 호러 (Gothic Skull)',
      tag: 'HORROR THEME',
    },
    ghost: {
      character: 'cyber_ghost',
      colorHex: '#0891B2',
      monogram: 'PHANTOM',
      text: 'CYBER NEON GHOST',
      label: '👻 사이버 고스트 (Cyber Ghost)',
      tag: 'SPOOKY THEME',
    },
    quokka: {
      character: 'happy_quokka',
      colorHex: '#FEF08A',
      monogram: 'QUOKKA',
      text: 'HAVE A HAPPY DAY',
      label: '🌿 힐링 쿼카 (Cute Quokka)',
      tag: 'ANIMAL THEME',
    },
  };

  const currentHeroConfig = heroConfigs[heroTheme];

  const featuredProduct = products[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF7] via-[#FAF6ED] to-[#F5EFE1] border-b border-stone-300/70 pt-8 pb-14 lg:py-16">
      {/* Decorative ambient shapes */}
      <div className="absolute top-6 left-12 w-32 h-32 rounded-full bg-pink-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 right-16 w-44 h-44 rounded-full bg-purple-300/20 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-900 bg-amber-200/80 px-3 py-1 rounded-md border border-amber-300 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
              <span>KOJIN 다채로운 테마 커스텀 스튜디오</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-stone-900 tracking-tight leading-[1.14] text-balance">
              {language === 'kr'
                ? '귀여운 동물 캐릭터부터 고딕·호러 아트까지, 나만의 굿즈 제작.'
                : 'From adorable kawaii pets to gothic & horror art, craft custom goods your way.'}
            </h1>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-xl font-normal">
              {language === 'kr'
                ? '특정 인물이나 제한된 장르에 얽매이지 않고, 사랑스러운 딸기 토끼·방긋 쿼카부터 스푸키한 고딕 스컬·사이버 고스트까지 다양한 테마를 1개부터 정밀 제작합니다.'
                : 'Explore cute kawaii animals, spooky gothic skulls, neon phantoms, and retro street art. Crafted with precision from just 1 piece.'}
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs text-stone-800 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>1:1 디지털 시안 무료 검수</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>호러 & 큐트 다양한 테마</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>2~4일 내 출고 보장</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={() => setSelectedProduct(featuredProduct)}
                className="px-6 py-3.5 bg-stone-950 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-stone-800 transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>나만의 굿즈 커스텀하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-amber-400" />
              </button>

              <button
                onClick={() => setCurrentPage('templates')}
                className="px-5 py-3.5 bg-white text-stone-900 border-2 border-stone-800 text-xs sm:text-sm font-bold rounded-xl hover:bg-amber-50 transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>1분컷 무료 템플릿 둘러보기</span>
              </button>

              <button
                onClick={() => setIsChatDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-amber-800 transition-colors py-2 px-1"
              >
                <MessageSquare className="w-4 h-4 text-orange-600" />
                <span>고객센터 1:1 상담</span>
              </button>
            </div>
          </div>

          {/* Right Live Interactive Mockup Showcase with Theme Switcher */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="w-full max-w-md bg-white p-6 rounded-3xl border-2 border-stone-800 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] relative">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
                <div>
                  <div className="text-[10px] font-mono font-bold text-orange-700 uppercase tracking-wider">
                    {currentHeroConfig.tag}
                  </div>
                  <div className="text-sm font-black text-stone-900">
                    실시간 테마 목업 체험
                  </div>
                </div>

                {/* Theme Selector Pills */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
                  <button
                    onClick={() => setHeroTheme('bunny')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      heroTheme === 'bunny' ? 'bg-pink-500 text-white shadow-xs' : 'text-stone-600 hover:text-stone-950'
                    }`}
                    title="귀여운 토끼"
                  >
                    🐰
                  </button>
                  <button
                    onClick={() => setHeroTheme('skull')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      heroTheme === 'skull' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-950'
                    }`}
                    title="고딕 호러 스컬"
                  >
                    💀
                  </button>
                  <button
                    onClick={() => setHeroTheme('ghost')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      heroTheme === 'ghost' ? 'bg-cyan-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-950'
                    }`}
                    title="사이버 고스트"
                  >
                    👻
                  </button>
                  <button
                    onClick={() => setHeroTheme('quokka')}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      heroTheme === 'quokka' ? 'bg-amber-400 text-stone-950 shadow-xs' : 'text-stone-600 hover:text-stone-950'
                    }`}
                    title="귀여운 쿼카"
                  >
                    🌿
                  </button>
                </div>
              </div>

              {/* Dynamic Live Mockup */}
              <LiveMockupPreview
                productType="phone_case"
                customization={{
                  character: currentHeroConfig.character,
                  colorHex: currentHeroConfig.colorHex,
                  monogram: currentHeroConfig.monogram,
                  text: currentHeroConfig.text,
                  finish: 'holo',
                }}
                size="lg"
                className="shadow-inner"
              />

              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-stone-700 font-mono text-[11px]">
                    {currentHeroConfig.label}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProduct(featuredProduct)}
                  className="text-stone-900 font-bold hover:text-orange-600 underline cursor-pointer"
                >
                  이 테마로 만들기 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
