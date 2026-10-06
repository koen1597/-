import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  User,
  Calendar,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  UserPlus,
  LogIn,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerAuthPage: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    loginWithEmail,
    loginWithGoogle,
    registerUser,
    language,
    currentUser,
    showToast,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>(() => {
    return currentPage === 'signup' ? 'signup' : 'login';
  });

  // Keep mode in sync with currentPage navigation
  useEffect(() => {
    if (currentPage === 'signup') {
      setMode('signup');
      setErrorMsg('');
    } else if (currentPage === 'login') {
      setMode('login');
      setErrorMsg('');
    }
  }, [currentPage]);

  // Form input states - ALWAYS clean/empty for user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // If user is already logged in and lands here, provide an easy redirect to profile
  if (currentUser) {
    return (
      <div className="py-16 px-4 bg-[#F8F7F2] min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl border-2 border-stone-800 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border-2 border-stone-800 flex items-center justify-center mx-auto text-emerald-800">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-display font-black text-stone-900">
              이미 로그인되어 있습니다
            </h2>
            <p className="text-xs text-stone-600">
              현재 <strong>{currentUser.name}</strong>({currentUser.email}) 계정으로 접속 중입니다.
            </p>
          </div>
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => setCurrentPage('profile')}
              className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>내 프로필 페이지로 이동</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage('home')}
              className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              스토어로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('이메일 주소를 입력해주세요.');
      return;
    }
    if (!password) {
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    const success = await loginWithEmail(email, password);
    setIsSubmitting(false);

    if (success) {
      setCurrentPage('profile');
    }
  };

  // Handle Registration submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('이름(실명)을 입력해주세요.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('비밀번호와 비밀번호 확인 입력이 일치하지 않습니다.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('이용약관 및 개인정보 수집·이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);
    const success = await registerUser({
      name: name.trim(),
      email: email.trim(),
      password,
      birthDate: birthDate.trim() || undefined,
      phone: phone.trim() || undefined,
      authProvider: 'email',
    });
    setIsSubmitting(false);

    if (success) {
      setCurrentPage('profile');
    }
  };

  // Handle Google Social Login - Triggers real Firebase OAuth popup
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMsg('');
    try {
      const success = await loginWithGoogle();
      if (success) {
        setCurrentPage('profile');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 bg-[#F8F7F2] min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Top Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>스토어로 돌아가기</span>
          </button>

          <span className="text-[11px] font-mono text-stone-400">
            KOJIN Member Gateway
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-[#FAF8F3] border-b-2 border-stone-800 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-stone-900 border border-stone-800 text-xs font-black mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>KOJIN CUSTOM STUDIO</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-black text-stone-900 tracking-tight">
              {mode === 'login' ? '고객 로그인' : '신규 회원가입'}
            </h1>
            <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto leading-relaxed">
              {mode === 'login'
                ? '가입하신 계정으로 로그인하여 1:1 시안 검수 및 주문 제작 현황을 확인하세요.'
                : '간편 회원가입 후 나만의 호러 & 큐트 캐릭터 굿즈 제작과 전용 혜택을 받아보세요.'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-stone-100 border-b-2 border-stone-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`py-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'bg-white text-stone-950 shadow-xs border border-stone-300 font-black'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <LogIn className="w-4 h-4 text-orange-600" />
              <span>로그인 (Sign In)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
              }}
              className={`py-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'signup'
                  ? 'bg-white text-stone-950 shadow-xs border border-stone-300 font-black'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <UserPlus className="w-4 h-4 text-orange-600" />
              <span>회원가입 (Sign Up)</span>
            </button>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Google Social Login Button (1-Click) */}
            <div className="space-y-2">
              <button
                type="button"
                disabled={isGoogleLoading || isSubmitting}
                onClick={handleGoogleLogin}
                className="w-full py-3.5 px-4 bg-white hover:bg-stone-50 border-2 border-stone-800 rounded-2xl text-xs font-black text-stone-900 flex items-center justify-center gap-3 transition-all shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] cursor-pointer disabled:opacity-60 group"
              >
                {isGoogleLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-stone-400 border-t-stone-900 rounded-full animate-spin" />
                    <span>Google 로그인 진행 중...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>
                      {mode === 'login'
                        ? 'Google 계정으로 계속하기'
                        : 'Google 계정으로 1초 간편 회원가입'}
                    </span>
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-stone-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-mono text-stone-400 absolute">
                  또는 일반 이메일로 {mode === 'login' ? '로그인' : '회원가입'}
                </span>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMsg && (
              <div className="p-3.5 bg-red-50 border-2 border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-center gap-2">
                <span>⚠️ {errorMsg}</span>
              </div>
            )}

            {/* Mode 1: Login Form */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-800 font-bold mb-1.5">
                    이메일 주소 *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="예: your.email@example.com"
                      className="w-full pl-10 pr-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-800 font-bold mb-1.5">
                    비밀번호 *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호 입력"
                      className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  <span>KOJIN 로그인</span>
                </button>
              </form>
            ) : (
              /* Mode 2: Signup Form */
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-800 font-bold mb-1.5">
                    이름 (실명) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="이름 입력 (예: 홍길동)"
                      className="w-full pl-10 pr-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-800 font-bold mb-1.5">
                    이메일 주소 *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="이메일 입력 (예: myid@domain.com)"
                      className="w-full pl-10 pr-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-800 font-bold mb-1.5">
                      비밀번호 *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="6자리 이상"
                        className="w-full pl-3.5 pr-9 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-800 font-bold mb-1.5">
                      비밀번호 확인 *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="동일하게 재입력"
                        className="w-full pl-3.5 pr-9 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-800 font-bold mb-1.5">
                      생년월일 (YYYY.MM.DD)
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        placeholder="예: 2000.01.15"
                        className="w-full pl-10 pr-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-800 font-bold mb-1.5">
                      휴대폰 번호
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="예: 010-1234-5678"
                        className="w-full pl-10 pr-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-0.5 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-[11px] leading-tight">
                      [필수] KOJIN 이용약관 및 개인정보 수집·이용에 동의합니다.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>KOJIN 회원가입 완료</span>
                </button>
              </form>
            )}
          </div>

          {/* Bottom Switch Footer */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
            {mode === 'login' ? (
              <span>
                아직 회원이 아니신가요?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                  }}
                  className="text-orange-600 font-bold underline cursor-pointer ml-1"
                >
                  무료 간편 회원가입
                </button>
              </span>
            ) : (
              <span>
                이미 계정이 있으신가요?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className="text-orange-600 font-bold underline cursor-pointer ml-1"
                >
                  로그인하러 가기
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
