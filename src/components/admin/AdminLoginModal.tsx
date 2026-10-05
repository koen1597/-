import React, { useState } from 'react';
import { Lock, X, Eye, EyeOff, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginModalOpen,
    setIsAdminLoginModalOpen,
    verifyAndLoginAdmin,
    adminPassword,
    language,
  } = useApp();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }
    const success = verifyAndLoginAdmin(password);
    if (!success) {
      setErrorMsg('관리자 비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    } else {
      setPassword('');
      setErrorMsg('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-white border-b-2 border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black font-display tracking-wide">
                {language === 'kr' ? 'KOJIN 관리자 인증' : 'KOJIN Admin Authentication'}
              </h3>
              <p className="text-[10px] text-stone-400 font-mono">
                Staff Only Security Gateway
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsAdminLoginModalOpen(false);
              setPassword('');
              setErrorMsg('');
            }}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-black text-stone-900">
              {language === 'kr' ? '관리자 비밀번호를 입력해주세요' : 'Enter Admin Password'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'kr'
                ? '주문 관리, 1:1 시안 검수, 상품 및 고객 관리를 위해 관리자 권한 확인이 필요합니다.'
                : 'Authentication is required to access production orders, customer proofs, and catalog CMS.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                {language === 'kr' ? '관리자 비밀번호' : 'Admin Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="관리자 전용 비밀번호를 입력해주세요"
                  className="w-full px-3.5 py-3 text-sm font-mono font-bold bg-stone-50 border-2 border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errorMsg && (
                <p className="text-[11px] text-red-600 font-bold mt-1.5">
                  {errorMsg}
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center gap-2.5">
              <button
                type="submit"
                className="flex-1 py-3 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{language === 'kr' ? '관리자 콘솔 접속' : 'Authenticate & Enter'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdminLoginModalOpen(false);
                  setPassword('');
                  setErrorMsg('');
                }}
                className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {language === 'kr' ? '취소' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
