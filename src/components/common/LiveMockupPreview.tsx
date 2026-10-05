import React from 'react';
import { ProductType, CustomSelection } from '../../types';
import { Sparkles, Star } from 'lucide-react';

interface LiveMockupPreviewProps {
  productType: ProductType;
  customization?: CustomSelection;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  interactive?: boolean;
}

export const LiveMockupPreview: React.FC<LiveMockupPreviewProps> = ({
  productType,
  customization = {},
  size = 'md',
  className = '',
}) => {
  const {
    text = '',
    monogram = '',
    character = 'fluffy_bunny',
    font = 'sans',
    colorHex = '#FB7185',
    finish = 'holo',
  } = customization;

  // Responsive dimensions
  const sizeClasses = {
    sm: 'h-40 w-40 text-xs',
    md: 'h-64 w-full text-sm',
    lg: 'h-80 w-full text-base',
    hero: 'h-96 w-full text-base',
  }[size];

  // Helper to extract character profile
  const getThemeInfo = (charKey: string) => {
    // Horror / Dark themes
    if (charKey.includes('skull') || charKey === 'gothic_skull') {
      return { icon: '💀', label: 'GOTHIC SKULL', sub: '다크 스컬', aura: 'from-purple-900 to-black', border: 'border-purple-500', isHorror: true };
    }
    if (charKey.includes('ghost') || charKey === 'cyber_ghost') {
      return { icon: '👻', label: 'CYBER GHOST', sub: '사이버 고스트', aura: 'from-cyan-900 to-black', border: 'border-cyan-400', isHorror: true };
    }
    if (charKey.includes('bat') || charKey === 'vampire_bat') {
      return { icon: '🦇', label: 'VAMPIRE BAT', sub: '블러드 문', aura: 'from-red-950 to-black', border: 'border-red-600', isHorror: true };
    }
    if (charKey.includes('doll') || charKey === 'creepy_doll') {
      return { icon: '🪡', label: 'CREEPY DOLL', sub: '부두 인형', aura: 'from-stone-900 to-purple-950', border: 'border-fuchsia-600', isHorror: true };
    }
    if (charKey.includes('monster') || charKey === 'dark_monster') {
      return { icon: '👁️', label: 'MONSTER EYE', sub: '미드나잇 아이', aura: 'from-emerald-950 to-black', border: 'border-emerald-500', isHorror: true };
    }

    // Cute / Kawaii themes
    if (charKey.includes('bunny') || charKey === 'fluffy_bunny') {
      return { icon: '🐰', label: 'STRAWBERRY BUNNY', sub: '딸기 토끼', aura: 'from-pink-100 to-rose-50', border: 'border-pink-300', isCute: true };
    }
    if (charKey.includes('bear') || charKey === 'cute_bear') {
      return { icon: '🧸', label: 'FLUFFY BEAR', sub: '찹쌀 곰돌이', aura: 'from-amber-100 to-yellow-50', border: 'border-amber-300', isCute: true };
    }
    if (charKey.includes('quokka') || charKey === 'happy_quokka') {
      return { icon: '🌿', label: 'HAPPY QUOKKA', sub: '방긋 쿼카', aura: 'from-emerald-100 to-lime-50', border: 'border-emerald-300', isCute: true };
    }
    if (charKey.includes('kitty') || charKey.includes('cat') || charKey === 'tiny_kitty') {
      return { icon: '🐾', label: 'JELLY PAW KITTY', sub: '냥이 젤리발', aura: 'from-rose-100 to-pink-50', border: 'border-rose-300', isCute: true };
    }
    if (charKey.includes('capybara') || charKey === 'yuzu_capybara') {
      return { icon: '🍊', label: 'YUZU CAPYBARA', sub: '유자 카피바라', aura: 'from-amber-100 to-orange-50', border: 'border-orange-300', isCute: true };
    }
    if (charKey.includes('hamster') || charKey === 'pudding_hamster') {
      return { icon: '🍮', label: 'PUDDING HAMSTER', sub: '푸딩 햄스터', aura: 'from-yellow-100 to-amber-50', border: 'border-yellow-300', isCute: true };
    }

    // Retro & Anime
    if (charKey.includes('gameboy') || charKey === 'retro_gameboy') {
      return { icon: '🎮', label: 'RETRO 8-BIT', sub: '레트로 게임보이', aura: 'from-indigo-900 to-stone-900', border: 'border-indigo-400', isRetro: true };
    }
    if (charKey.includes('fox') || charKey === 'pixel_fox') {
      return { icon: '🦊', label: 'PIXEL FOX', sub: '픽셀 여우', aura: 'from-orange-900 to-stone-900', border: 'border-orange-400', isRetro: true };
    }

    // Default / Energy hero
    return { icon: '⚡', label: 'ENERGY HERO', sub: '사이어인 오라', aura: 'from-amber-900 to-stone-950', border: 'border-amber-400' };
  };

  const themeInfo = getThemeInfo(character);

  // 1. Character Phone Case (Horror, Cute, Retro)
  if (productType === 'phone_case') {
    return (
      <div
        className={`relative flex items-center justify-center p-6 bg-gradient-to-b from-stone-100 to-stone-200/60 rounded-2xl overflow-hidden select-none ${sizeClasses} ${className}`}
      >
        {/* Ambient glow based on theme */}
        <div
          className={`absolute inset-0 bg-radial pointer-events-none opacity-40 ${
            themeInfo.isHorror
              ? 'from-purple-900/40 via-red-900/20 to-transparent'
              : themeInfo.isCute
              ? 'from-pink-300/40 via-amber-200/20 to-transparent'
              : 'from-amber-300/30 via-orange-200/10 to-transparent'
          }`}
        />

        {/* Phone Case Shell with Shockproof Bumper Corners */}
        <div
          className="relative w-44 h-72 rounded-[34px] shadow-2xl p-2 flex flex-col items-center justify-between border-2 border-stone-800 transition-all duration-300"
          style={{ backgroundColor: colorHex || (themeInfo.isHorror ? '#18181B' : '#FB7185') }}
        >
          {/* 4 Reinforced Bumper Corners */}
          <div className="absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full bg-stone-900 border border-white/20" />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-stone-900 border border-white/20" />
          <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full bg-stone-900 border border-white/20" />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-stone-900 border border-white/20" />

          {/* Camera Island (Left Top) */}
          <div className="absolute top-3 left-3 w-16 h-18 rounded-2xl bg-stone-950 p-1.5 shadow-lg border border-stone-700 z-20 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="w-5 h-5 rounded-full bg-stone-900 ring-2 ring-stone-700 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/40 ring-1 ring-cyan-300" />
              </div>
              <div className="w-5 h-5 rounded-full bg-stone-900 ring-2 ring-stone-700 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/40 ring-1 ring-cyan-300" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-5 h-5 rounded-full bg-stone-900 ring-2 ring-stone-700 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/40 ring-1 ring-cyan-300" />
              </div>
              <div className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
          </div>

          {/* Internal Case Backplate */}
          <div className={`w-full h-full rounded-[26px] relative overflow-hidden flex flex-col justify-between p-3.5 border border-stone-800 ${
            themeInfo.isHorror ? 'bg-[#0F0F12]' : themeInfo.isCute ? 'bg-white/95' : 'bg-stone-900'
          }`}>
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-fuchsia-500/10 to-amber-400/15 pointer-events-none mix-blend-screen" />

            {/* MagSafe Wireframe */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border border-stone-500/20 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 rounded-full border border-stone-500/30" />
            </div>

            {/* Top Label Tag */}
            <div className="z-10 flex justify-end">
              <span className={`text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border ${
                themeInfo.isHorror
                  ? 'text-red-400 bg-red-950/60 border-red-800'
                  : themeInfo.isCute
                  ? 'text-pink-600 bg-pink-100 border-pink-300'
                  : 'text-amber-300 bg-black/40 border-amber-400/30'
              }`}>
                {themeInfo.label}
              </span>
            </div>

            {/* Center Dynamic Character Art Illustration */}
            <div className="my-auto z-10 flex flex-col items-center justify-center text-center">
              <div className="relative">
                {/* Aura Glow */}
                <div className={`absolute -inset-4 bg-gradient-to-t ${themeInfo.aura} rounded-full opacity-40 blur-md`} />

                {/* Character Badge */}
                <div className={`relative w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center shadow-xl ${
                  themeInfo.isHorror
                    ? 'bg-stone-950 border-purple-400 text-purple-200'
                    : themeInfo.isCute
                    ? 'bg-white border-pink-400 text-stone-900'
                    : 'bg-stone-900 border-amber-400 text-amber-300'
                }`}>
                  <span className="text-3xl drop-shadow-md">{themeInfo.icon}</span>
                  <span className="text-[9px] font-black tracking-wider uppercase font-mono mt-0.5">
                    {themeInfo.sub}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Custom Customer Text & Inscription */}
            <div className="z-10 text-center space-y-0.5 pb-1">
              {monogram ? (
                <div className={`inline-block px-2.5 py-0.5 rounded text-xs font-black tracking-wider border ${
                  themeInfo.isHorror
                    ? 'bg-red-950/80 text-red-300 border-red-600'
                    : themeInfo.isCute
                    ? 'bg-pink-100 text-pink-700 border-pink-300'
                    : 'bg-black/60 text-amber-300 border-amber-400/50'
                }`}>
                  {monogram}
                </div>
              ) : (
                <div className="text-[10px] text-stone-400 font-mono tracking-widest">
                  [YOUR NAME]
                </div>
              )}

              {text && (
                <div className={`text-[10px] font-bold font-mono tracking-wide ${
                  themeInfo.isCute ? 'text-stone-700' : 'text-stone-300'
                }`}>
                  "{text}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Pocket Mirror & Round Goods (Cute or Horror Gothic)
  if (productType === 'mirror') {
    return (
      <div
        className={`relative flex items-center justify-center p-6 bg-gradient-to-b from-stone-100 to-stone-200/50 rounded-2xl overflow-hidden select-none ${sizeClasses} ${className}`}
      >
        {/* Soft playful halo */}
        <div
          className={`absolute inset-0 bg-radial pointer-events-none opacity-40 ${
            themeInfo.isHorror
              ? 'from-purple-950/60 to-transparent'
              : 'from-amber-200/60 to-transparent'
          }`}
        />

        {/* Round Compact Mirror Frame */}
        <div
          className={`relative w-48 h-48 rounded-full shadow-2xl p-3 flex flex-col items-center justify-between border-4 transition-all duration-300 ${
            themeInfo.isHorror ? 'border-purple-900 bg-stone-950 text-white' : 'border-white bg-[#FEF08A] text-stone-900'
          }`}
          style={{ backgroundColor: colorHex || (themeInfo.isHorror ? '#18181B' : '#FEF08A') }}
        >
          {/* Subtle 3D Rim Highlight */}
          <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-black/10 pointer-events-none" />

          {/* Mirror Backplate with Character Artwork */}
          <div className={`w-full h-full rounded-full shadow-inner flex flex-col items-center justify-between p-4 relative overflow-hidden border ${
            themeInfo.isHorror
              ? 'bg-[#121217] border-purple-800/50 text-white'
              : 'bg-white/95 border-amber-100 text-stone-900'
          }`}>
            {/* Header info */}
            <div className="w-full flex justify-between items-center text-[10px] text-stone-400 font-medium">
              <span className={`flex items-center gap-0.5 font-bold ${
                themeInfo.isHorror ? 'text-purple-400' : 'text-amber-600'
              }`}>
                <Sparkles className="w-3 h-3" />
                <span>{themeInfo.isHorror ? 'GOTHIC MIRROR' : 'CUTE MIRROR'}</span>
              </span>
              <span>75mm</span>
            </div>

            {/* Center Graphic */}
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="text-4xl drop-shadow-sm animate-bounce-subtle">
                {themeInfo.icon}
              </div>
              <div className={`text-xs font-bold mt-1 ${
                themeInfo.isHorror ? 'text-purple-200' : 'text-stone-800'
              }`}>
                {themeInfo.sub}
              </div>
            </div>

            {/* Custom Engraved Name or Mantra */}
            <div className="text-center w-full pb-0.5">
              {monogram ? (
                <div className={`text-xs font-extrabold px-2 py-0.5 rounded-full inline-block border ${
                  themeInfo.isHorror
                    ? 'text-purple-300 bg-purple-950/80 border-purple-700'
                    : 'text-amber-900 bg-amber-100/90 border-amber-300'
                }`}>
                  {monogram}
                </div>
              ) : (
                <div className="text-[10px] text-stone-400 font-medium">
                  [이름 각인]
                </div>
              )}

              {text && (
                <div className={`text-[10px] mt-0.5 font-medium truncate max-w-[130px] ${
                  themeInfo.isHorror ? 'text-stone-400' : 'text-stone-600'
                }`}>
                  {text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Cast Acrylic Keyring & Stand (Horror, Cute, Retro)
  if (productType === 'key_ring') {
    return (
      <div
        className={`relative flex items-center justify-center p-6 bg-stone-100 rounded-2xl overflow-hidden select-none ${sizeClasses} ${className}`}
      >
        <div className="relative flex flex-col items-center">
          {/* Metal Ring & Carabiner Shackle */}
          <div className="w-14 h-14 rounded-full border-[5px] border-amber-500 shadow-lg flex items-center justify-center relative bg-gradient-to-tr from-amber-600 via-yellow-200 to-amber-700">
            <div className="w-7 h-7 rounded-full bg-stone-100 shadow-inner flex items-center justify-center">
              <div className="w-1 h-3 bg-stone-400 rounded" />
            </div>
            {/* Shackle Hex Nut */}
            <div className="absolute -bottom-2 w-6 h-3 bg-stone-900 rounded-xs flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
          </div>

          {/* Thick Cast Acrylic Character Charm Tag */}
          <div
            className={`w-28 h-40 -mt-1 rounded-2xl shadow-xl transition-all duration-300 relative flex flex-col justify-between items-center p-3 border-2 ${
              themeInfo.isHorror ? 'border-purple-500' : 'border-stone-900'
            }`}
            style={{ backgroundColor: colorHex || (themeInfo.isHorror ? '#18181B' : '#E0F2FE') }}
          >
            {/* Acrylic Thickness & Highlight Glare */}
            <div className="absolute top-1 right-2 w-1.5 h-12 bg-white/40 rounded-full blur-[1px] pointer-events-none" />

            {/* Top Chain Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-stone-900 border border-white/40 shadow-sm" />

            {/* Character Icon / Artwork */}
            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="text-3xl drop-shadow-md">
                {themeInfo.icon}
              </div>
              <div className="text-[11px] font-black text-white drop-shadow mt-1 font-mono tracking-wider">
                {themeInfo.label}
              </div>
              <div className="text-[9px] text-white/80 font-bold">
                {themeInfo.sub}
              </div>
            </div>

            {/* Custom Name / Tag */}
            <div className="w-full bg-stone-950/80 rounded-lg p-1.5 text-center border border-white/20">
              <div className="text-xs font-black text-amber-300 font-mono truncate">
                {monogram || 'CUSTOM TAG'}
              </div>
              {text && (
                <div className="text-[9px] text-stone-300 font-mono truncate">
                  {text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Personalized Apparel (Streetwear Hoodie / Tee)
  return (
    <div
      className={`relative flex items-center justify-center p-6 bg-stone-100 rounded-2xl overflow-hidden select-none ${sizeClasses} ${className}`}
    >
      <div
        className="relative w-56 h-64 rounded-3xl shadow-xl transition-colors duration-300 flex flex-col items-center justify-start p-4 border-2 border-stone-800 overflow-hidden"
        style={{ backgroundColor: colorHex || '#27272A' }}
      >
        {/* Fabric Texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        />

        {/* Hood Collar & Drawstrings */}
        <div className="w-24 h-10 -mt-2 rounded-b-full border-b-4 border-stone-950 bg-black/20 flex items-center justify-center relative">
          <div className="absolute top-6 left-6 w-1 h-14 bg-stone-300 rounded-full shadow-sm" />
          <div className="absolute top-6 right-6 w-1 h-16 bg-stone-300 rounded-full shadow-sm" />
        </div>

        {/* Chest Embroidered Character Badge */}
        <div className="absolute top-16 left-7 flex items-center gap-2 max-w-[160px] bg-black/40 p-2 rounded-xl border border-white/10">
          <div className="text-xl">
            {themeInfo.icon}
          </div>
          <div className="min-w-0">
            <div className="text-[9px] font-mono font-bold text-amber-400 truncate">
              {themeInfo.label}
            </div>
            <div className="text-xs font-black text-white leading-tight truncate">
              {text || monogram || 'KOJIN CUSTOM'}
            </div>
          </div>
        </div>

        {/* Kangaroo Pocket */}
        <div className="absolute bottom-0 w-36 h-16 rounded-t-2xl border-t-2 border-stone-950 bg-black/20" />
      </div>
    </div>
  );
};
