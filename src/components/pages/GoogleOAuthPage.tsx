import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GoogleOAuthPage: React.FC = () => {
  const { setCurrentPage, loginWithGoogle } = useApp();

  const [step, setStep] = useState<'identifier' | 'challenge' | 'redirecting'>('identifier');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Step 1 (Identifier - Email)
  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMessage('이메일 또는 휴대전화를 입력하세요.');
      return;
    }

    if (!trimmed.includes('@')) {
      // If user typed only name or prefix, append @gmail.com for convenience
      setEmail(`${trimmed}@gmail.com`);
    }

    // Default name from email prefix if not provided
    const autoName = trimmed.split('@')[0];
    if (!name) {
      setName(autoName);
    }

    setStep('challenge');
  };

  // Handle Step 2 (Password / Name Confirmation)
  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('프로필에 표시할 이름을 입력해주세요.');
      return;
    }

    // Transition to Redirecting screen
    setStep('redirecting');

    // Simulate authentic OAuth 2.0 token handshake and redirect callback
    setTimeout(() => {
      loginWithGoogle(email.trim(), name.trim());
      setCurrentPage('profile');
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F9] flex flex-col justify-between py-6 px-4 font-sans select-none animate-fade-in">
      {/* Top Bar with Cancel / Back to Store Link */}
      <div className="max-w-[480px] w-full mx-auto flex items-center justify-between pb-4">
        <button
          type="button"
          onClick={() => setCurrentPage('login')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-950 font-bold transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-stone-200/60"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>kojinstudio.app으로 돌아가기 (로그인 취소)</span>
        </button>

        <span className="text-[11px] font-mono text-stone-500 font-bold">
          OAuth 2.0 Auth Flow
        </span>
      </div>

      {/* Main Google Auth Card */}
      <div className="max-w-[448px] w-full mx-auto bg-white rounded-[28px] border border-stone-200 shadow-sm p-8 sm:p-10 my-auto">
        {/* Google 4-Color Official Logo */}
        <div className="mb-4">
          <svg className="w-10 h-10" viewBox="0 0 48 48">
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

        {/* STEP 1: Email Identifier */}
        {step === 'identifier' && (
          <form onSubmit={handleIdentifierSubmit} className="space-y-6">
            <div>
              <h1 className="text-2xl font-normal text-stone-900 tracking-tight">로그인</h1>
              <p className="text-sm text-stone-700 mt-2">
                <strong>kojinstudio.app</strong> 앱으로 계속 진행
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
                {errorMessage}
              </div>
            )}

            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 또는 휴대전화"
                  className="w-full px-4 py-3.5 border border-stone-300 rounded-lg text-stone-900 text-sm focus:outline-none focus:border-[#0B57D0] focus:ring-1 focus:ring-[#0B57D0] transition-colors"
                />
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setEmail('creator@gmail.com')}
                  className="text-xs text-[#0B57D0] font-medium hover:underline cursor-pointer"
                >
                  이메일을 잊으셨나요?
                </button>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              자신이 사용하는 컴퓨터가 아닌가요? 게스트 모드를 사용하여 비공개로 로그인하세요.{' '}
              <span className="text-[#0B57D0] font-medium cursor-pointer hover:underline">
                자세히 알아보기
              </span>
            </p>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('challenge')}
                className="text-xs text-[#0B57D0] font-medium hover:bg-blue-50 px-3 py-2 rounded-full transition-colors cursor-pointer"
              >
                계정 만들기
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B57D0] hover:bg-[#0842A0] text-white text-xs font-medium rounded-full transition-colors cursor-pointer shadow-sm"
              >
                다음
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Password & Name Challenge */}
        {step === 'challenge' && (
          <form onSubmit={handleChallengeSubmit} className="space-y-6">
            <div>
              {/* Account Chip */}
              <button
                type="button"
                onClick={() => setStep('identifier')}
                className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-full text-xs text-stone-800 font-medium mb-3 cursor-pointer transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#0B57D0] text-white flex items-center justify-center text-[10px] font-bold">
                  {name ? name.slice(0, 1) : email.slice(0, 1).toUpperCase()}
                </div>
                <span>{email}</span>
                <span className="text-stone-400 text-[10px]">▼</span>
              </button>

              <h1 className="text-2xl font-normal text-stone-900 tracking-tight">환영합니다</h1>
              <p className="text-xs text-stone-500 mt-1">Google 계정 프로필 및 본인 확인</p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
                {errorMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-stone-600 font-medium mb-1">
                  프로필 이름 (실명 또는 닉네임) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 홍길동 (쇼핑몰에 표시될 이름)"
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg text-stone-900 text-sm focus:outline-none focus:border-[#0B57D0] focus:ring-1 focus:ring-[#0B57D0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-600 font-medium mb-1">
                  Google 계정 비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg text-stone-900 text-sm focus:outline-none focus:border-[#0B57D0] focus:ring-1 focus:ring-[#0B57D0] transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showPwd"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-4 h-4 accent-[#0B57D0] rounded cursor-pointer"
                />
                <label htmlFor="showPwd" className="text-xs text-stone-700 cursor-pointer">
                  비밀번호 표시
                </label>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('identifier')}
                className="text-xs text-[#0B57D0] font-medium hover:bg-blue-50 px-3 py-2 rounded-full transition-colors cursor-pointer"
              >
                다른 계정 사용
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B57D0] hover:bg-[#0842A0] text-white text-xs font-medium rounded-full transition-colors cursor-pointer shadow-sm"
              >
                로그인 완료
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Indeterminate Spinner & Redirect Callback */}
        {step === 'redirecting' && (
          <div className="py-8 text-center space-y-6 animate-fade-in">
            {/* Google 4-Color Animated Ring Spinner */}
            <div className="relative w-14 h-14 mx-auto">
              <div className="w-14 h-14 rounded-full border-4 border-stone-100 border-t-[#4285F4] border-r-[#EA4335] border-b-[#FBBC05] border-l-[#34A853] animate-spin" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-medium text-stone-900">
                kojinstudio.app으로 이동하는 중...
              </h2>
              <p className="text-xs text-stone-500 leading-relaxed">
                Google 계정 권한이 안전하게 승인되었습니다.<br />
                잠시 후 쇼핑몰 마이페이지로 자동 연결됩니다.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{name || email} 계정 인증 완료</span>
            </div>
          </div>
        )}
      </div>

      {/* Official Google Footer */}
      <div className="max-w-[448px] w-full mx-auto flex items-center justify-between text-[11px] text-stone-500 pt-6">
        <div className="flex items-center gap-1 cursor-pointer hover:text-stone-800">
          <span>한국어</span>
          <span className="text-[9px]">▼</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hover:text-stone-800 cursor-pointer">도움말</span>
          <span className="hover:text-stone-800 cursor-pointer">개인정보처리방침</span>
          <span className="hover:text-stone-800 cursor-pointer">약관</span>
        </div>
      </div>
    </div>
  );
};
