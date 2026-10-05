import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Layers,
  Smartphone,
  Key,
  Image as ImageIcon,
  Smile,
  Copy,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

interface TemplateItem {
  id: string;
  title: string;
  category: 'horror' | 'cute' | 'photocard' | 'animal' | 'retro';
  categoryLabel: string;
  badge: string;
  productId: string;
  estimatedTime: string;
  description: string;
  tags: string[];
  previewGradient: string;
  previewIcon: string;
  presetCustomization: {
    character: string;
    colorHex: string;
    monogram: string;
    text: string;
    finish?: string;
  };
}

export const QuickTemplatesPage: React.FC = () => {
  const { products, setSelectedProduct, showToast, setCurrentPage } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const templates: TemplateItem[] = [
    {
      id: 'tpl-gothic-skull',
      title: '고딕 스컬 & 블러드 로즈 다크 폰케이스 템플릿',
      category: 'horror',
      categoryLabel: '호러 / 고딕',
      badge: '호러 1위',
      productId: 'prod-custom-bumper-phone-case',
      estimatedTime: '40초 완성',
      description: '블랙 앤 퍼플 딥 컬러에 앤틱 해골과 장미 일러스트가 들어간 고딕 호러 폰케이스 템플릿',
      tags: ['호러', '고딕', '스컬', '해골', '폰케이스'],
      previewGradient: 'from-purple-950 via-stone-900 to-black',
      previewIcon: '💀',
      presetCustomization: {
        character: 'gothic_skull',
        colorHex: '#18181B',
        monogram: 'GOTHIC',
        text: 'DARK BLOOD MOON',
        finish: 'holo',
      },
    },
    {
      id: 'tpl-bunny-berry',
      title: '딸기 찹쌀 토끼 생크림 폰케이스 템플릿',
      category: 'cute',
      categoryLabel: '귀여운 / 카와이',
      badge: '인기 폭발',
      productId: 'prod-custom-bumper-phone-case',
      estimatedTime: '30초 완성',
      description: '달콤한 딸기 우유 핑크와 사랑스러운 토끼 귀 캐릭터가 어우러진 큐트 케이스',
      tags: ['귀여운', '토끼', '딸기', '핑크', '폰케이스'],
      previewGradient: 'from-pink-400 via-rose-300 to-amber-100',
      previewIcon: '🐰',
      presetCustomization: {
        character: 'fluffy_bunny',
        colorHex: '#FB7185',
        monogram: 'BERRY',
        text: 'SWEET BUNNY',
      },
    },
    {
      id: 'tpl-cyber-ghost',
      title: '사이버 네온 고스트 아크릴 키링 템플릿',
      category: 'horror',
      categoryLabel: '호러 / 고딕',
      badge: '스푸키 템플릿',
      productId: 'prod-acrylic-keyring',
      estimatedTime: '30초 완성',
      description: '네온 시안 컬러의 귀여운 유령 실루엣을 따라 레이저 커팅되는 스푸키 키링',
      tags: ['유령', '호러', '키링', '고스트', '아크릴'],
      previewGradient: 'from-cyan-900 via-stone-900 to-black',
      previewIcon: '👻',
      presetCustomization: {
        character: 'cyber_ghost',
        colorHex: '#0891B2',
        monogram: 'GHOST',
        text: 'MIDNIGHT PHANTOM',
        finish: 'clear',
      },
    },
    {
      id: 'tpl-quokka-mirror',
      title: '힐링 쿼카 나뭇잎 일러스트 손거울 템플릿',
      category: 'animal',
      categoryLabel: '동물 / 힐링',
      badge: '선물 추천',
      productId: 'prod-cute-animal-mirror',
      estimatedTime: '45초 완성',
      description: '파스텔 버터 옐로우 배경에 귀여운 쿼카와 고객님의 한 줄 힐링 응원 문구 각인',
      tags: ['손거울', '쿼카', '거울', '힐링', '귀여운'],
      previewGradient: 'from-amber-200 via-yellow-300 to-emerald-200',
      previewIcon: '🌿',
      presetCustomization: {
        character: 'happy_quokka',
        colorHex: '#FEF08A',
        monogram: 'QUOKKA',
        text: '오늘도 눈부시게 빛나!',
      },
    },
    {
      id: 'tpl-creepy-voodoo',
      title: '크리피 큐트 부두인형 말랑 만쥬 템플릿',
      category: 'horror',
      categoryLabel: '호러 / 고딕',
      badge: '크리피 큐트',
      productId: 'prod-plush-manju',
      estimatedTime: '40초 완성',
      description: '단추 눈과 자수 바느질 자국의 키치하고 오싹한 매력을 담은 모찌 인형 템플릿',
      tags: ['호러', '부두인형', '만쥬', '인형', '크리피'],
      previewGradient: 'from-stone-900 via-purple-950 to-stone-950',
      previewIcon: '🪡',
      presetCustomization: {
        character: 'creepy_doll',
        colorHex: '#581C87',
        monogram: 'VOODOO',
        text: 'CREEPY CUTE',
      },
    },
    {
      id: 'tpl-photocard-sparkle',
      title: '별빛 스파클 홀로그램 포토카드 (10장 세트) 템플릿',
      category: 'photocard',
      categoryLabel: '포토카드 프레임',
      badge: '베스트셀러',
      productId: 'prod-photo-card',
      estimatedTime: '1분 완성',
      description: '인스타 피드 스타일 규격 프레임에 별빛 홀로그램 코팅과 서명 문구 자동 레이아웃',
      tags: ['포토카드', '홀로그램', '포카', '귀여운', '아이돌'],
      previewGradient: 'from-purple-500 via-pink-500 to-rose-400',
      previewIcon: '✨',
      presetCustomization: {
        character: 'fluffy_bunny',
        colorHex: '#C084FC',
        monogram: 'BUNNY',
        text: 'SWEET DREAM 2026',
        finish: 'holo',
      },
    },
    {
      id: 'tpl-vampire-bat',
      title: '블러드 문 뱀파이어 배트 키링 템플릿',
      category: 'horror',
      categoryLabel: '호러 / 고딕',
      badge: '다크 판타지',
      productId: 'prod-acrylic-keyring',
      estimatedTime: '30초 완성',
      description: '붉은 달밤을 나는 뱀파이어 박쥐 날개 외곽선의 스모크 아크릴 키링',
      tags: ['호러', '뱀파이어', '박쥐', '키링', '고딕'],
      previewGradient: 'from-red-950 via-stone-950 to-black',
      previewIcon: '🦇',
      presetCustomization: {
        character: 'vampire_bat',
        colorHex: '#27272A',
        monogram: 'BAT',
        text: 'VAMPIRE NIGHT',
      },
    },
    {
      id: 'tpl-fluffy-bear',
      title: '말랑 퐁당 찹쌀 곰돌이 포켓 거울 템플릿',
      category: 'cute',
      categoryLabel: '귀여운 / 카와이',
      badge: '힐링 템플릿',
      productId: 'prod-cute-animal-mirror',
      estimatedTime: '30초 완성',
      description: '복슬복슬 귀여운 곰돌이 얼굴과 따뜻한 베이지 프레임의 손거울 템플릿',
      tags: ['곰돌이', '귀여운', '손거울', '거울', '카와이'],
      previewGradient: 'from-amber-100 via-yellow-100 to-orange-100',
      previewIcon: '🧸',
      presetCustomization: {
        character: 'cute_bear',
        colorHex: '#FEF08A',
        monogram: 'BEAR',
        text: 'HAVE A SOFT DAY',
      },
    },
  ];

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCategory = activeCategory === 'all' || tpl.category === activeCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleApplyTemplate = (tpl: TemplateItem) => {
    const targetProduct = products.find((p) => p.id === tpl.productId);
    if (!targetProduct) {
      showToast('해당 상품을 찾을 수 없습니다.', 'alert');
      return;
    }

    // Select product and open configurator modal
    setSelectedProduct(targetProduct);
    showToast(`"${tpl.title}" 템플릿이 에디터에 적용되었습니다! (1분컷)`, 'success');
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen pb-20">
      {/* 1. Top Editorial Banner */}
      <section className="bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border-b-2 border-stone-800 py-12 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300 text-stone-950 border border-stone-900 text-xs font-mono font-bold shadow-xs">
                <Zap className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
                <span>만상사 & 아뜰리에 커스텀 굿즈 1분컷 무료 템플릿</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-stone-950 leading-tight">
                디자인 몰라도 1분만에 완성하는 무료 굿즈 템플릿
              </h1>
              <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-normal">
                전문 그래픽 디자이너가 완성한 프레임에 원하는 문구와 닉네임만 넣으세요! 복잡한 편집 프로그램 없이 클릭 한 번으로 고품질 시안이 자동 생성됩니다.
              </p>

              {/* 3 Step Process Bar */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-bold text-stone-900">
                <div className="p-3 bg-white/90 rounded-xl border border-stone-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-mono text-[11px] shrink-0 font-black">
                    1
                  </span>
                  <span>템플릿 선택</span>
                </div>
                <div className="p-3 bg-white/90 rounded-xl border border-stone-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-mono text-[11px] shrink-0 font-black">
                    2
                  </span>
                  <span>문구/이름 입력</span>
                </div>
                <div className="p-3 bg-white/90 rounded-xl border border-stone-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-mono text-[11px] shrink-0 font-black">
                    3
                  </span>
                  <span>관리자 1:1 검수</span>
                </div>
              </div>
            </div>

            {/* Quick Benefits Card */}
            <div className="p-6 bg-white rounded-3xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-4 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-600 uppercase">
                <Clock className="w-4 h-4" />
                <span>1-MINUTE INSTANT READY</span>
              </div>
              <h3 className="font-black text-lg text-stone-950">
                무료 템플릿 특별 혜택
              </h3>
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>모든 프레임 및 그래픽 템플릿 100% 무료</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>주문 후 24시간 이내 관리자 1:1 고해상도 시안 확인</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>시안 승인 전까지 무제한 무료 위치/문구 수정</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>최소 수량 1개부터 주문 제작 가능</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Tabs & Search Bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-stone-200 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {[
              { id: 'all', label: '전체 템플릿' },
              { id: 'horror', label: '💀 호러 / 고딕' },
              { id: 'cute', label: '🐰 귀여운 / 카와이' },
              { id: 'photocard', label: '✨ 포토카드 프레임' },
              { id: 'animal', label: '🌿 동물 / 힐링' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-500 font-mono">
            {filteredTemplates.length}개의 템플릿 준비됨
          </div>
        </div>
      </div>

      {/* 3. Templates Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border-2 border-stone-200 hover:border-stone-900 transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Preview Card */}
                <div
                  className={`h-48 w-full bg-gradient-to-br ${tpl.previewGradient} p-5 flex flex-col justify-between relative overflow-hidden text-white`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-950/60 backdrop-blur-xs text-amber-300">
                      {tpl.badge}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      {tpl.estimatedTime}
                    </span>
                  </div>

                  <div className="text-center py-2">
                    <span className="text-4xl drop-shadow-md">{tpl.previewIcon}</span>
                    <div className="text-xs font-black tracking-wider uppercase mt-1 drop-shadow-sm">
                      {tpl.presetCustomization.monogram}
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-center bg-black/30 backdrop-blur-xs py-1 rounded">
                    "{tpl.presetCustomization.text}"
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-orange-600 font-bold">
                    <span>{tpl.categoryLabel}</span>
                    <span className="text-stone-400 font-mono text-[10px]">
                      제작 관리: 관리자
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-stone-900 leading-snug line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {tpl.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {tpl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleApplyTemplate(tpl)}
                  className="w-full py-2.5 bg-stone-900 hover:bg-orange-600 text-white rounded-xl text-xs font-black inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>이 템플릿으로 1분 제작하기</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bottom Custom Template Consultation Banner */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white border-2 border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display font-black text-lg text-white">
              찾으시는 템플릿이나 디자인이 없으신가요?
            </h4>
            <p className="text-xs text-stone-400">
              고객센터 1:1 상담으로 가지고 계신 이미지나 원하는 캐릭터 스타일을 알려주시면 관리자가 맞춤형 템플릿 시안을 무료로 제작해 드립니다.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('bulk-order')}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold shrink-0 cursor-pointer transition-colors"
          >
            대량 및 맞춤 템플릿 문의하기 →
          </button>
        </div>
      </section>
    </div>
  );
};
