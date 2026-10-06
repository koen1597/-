import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GoogleOAuthPage: React.FC = () => {
  const { setCurrentPage, loginWithGoogle } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLaunchGooglePopup = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const ok = await loginWithGoogle();
      if (ok) {
        setCurrentPage('profile');
      }
    } catch (err: any) {
      setErrorMessage('Google 로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F9] flex flex-col justify-between py-8 px-4 font-sans select-none animate-fade-in">
      {/* Top Bar */}
      <div className="max-w-[480px] w-full mx-auto flex items-center justify-between pb-4">
        <button
          type="button"
          onClick={() => setCurrentPage('login')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-950 font-bold transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-stone-200/60"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>스토어로 돌아가기 (취소)</span>
        </button>

        <span className="text-[11px] font-mono text-stone-500 font-bold">
          Firebase Google Auth
        </span>
      </div>

      {/* Main Google Auth Card */}
      <div className="max-w-[460px] w-full mx-auto bg-white rounded-[28px] border border-stone-200 shadow-lg p-8 sm:p-10 my-auto text-center space-y-6">
        {/* Google Official 4-Color Logo */}
        <div className="flex justify-center">
          <svg className="w-12 h-12" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Google 계정으로 로그인
          </h1>
          <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
            <strong>KOJIN CUSTOM STUDIO</strong>에 연결하여 안전하고 간편하게 주문 및 1:1 시안을 관리하세요.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold">
            {errorMessage}
          </div>
        )}

        {/* Big Action Button */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleLaunchGooglePopup}
            className="w-full py-4 px-6 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-2xl text-sm font-black transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                <span>Google 인증 창 연결 중...</span>
              </div>
            ) : (
              <span>Google 공식 팝업으로 인증하기</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage('login')}
            className="w-full py-3 text-xs text-stone-600 hover:text-stone-900 font-bold transition-colors cursor-pointer"
          >
            일반 이메일로 로그인하기
          </button>
        </div>

        {/* Security Assurance */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Google OAuth 2.0 & Firebase Auth 공식 보안 연동</span>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[480px] w-full mx-auto flex items-center justify-between text-[11px] text-stone-500 pt-4">
        <span>한국어</span>
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">도움말</span>
          <span className="hover:underline cursor-pointer">개인정보처리방침</span>
          <span className="hover:underline cursor-pointer">서비스 약관</span>
        </div>
      </div>
    </div>
  );
};
