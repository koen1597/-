import React, { useState } from 'react';
import { ShieldCheck, KeyRound, Lock, CheckCircle2, RotateCcw, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSecurity: React.FC = () => {
  const {
    adminPassword,
    changeAdminPassword,
    resetAdminPassword,
    language,
  } = useApp();

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentPwd.trim()) {
      setErrorMsg('현재 관리자 비밀번호를 입력해주세요.');
      return;
    }
    if (!newPwd.trim() || newPwd.trim().length < 4) {
      setErrorMsg('새 비밀번호는 최소 4자리 이상으로 설정해주세요.');
      return;
    }
    if (newPwd !== confirmPwd) {
      setErrorMsg('새 비밀번호와 확인 입력이 일치하지 않습니다.');
      return;
    }

    const success = changeAdminPassword(currentPwd, newPwd);
    if (success) {
      setSuccessMsg('관리자 비밀번호가 성공적으로 변경되었습니다. 다음 로그인부터 새로운 비밀번호가 적용됩니다.');
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
    }
  };

  const handleReset = () => {
    if (window.confirm('정말 관리자 비밀번호를 초기값(5696)으로 복구하시겠습니까?')) {
      resetAdminPassword();
      setSuccessMsg('비밀번호가 초기값(5696)으로 복원되었습니다.');
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
      setErrorMsg('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-black text-stone-900 flex items-center gap-2">
          <KeyRound className="w-6 h-6 text-orange-600" />
          <span>{language === 'kr' ? '관리자 보안 & 비밀번호 설정' : 'Admin Security & Password'}</span>
        </h2>
        <p className="text-xs text-stone-600 mt-1">
          {language === 'kr'
            ? '공방 관리자 콘솔 접근 권한을 보호하고 로그인 비밀번호를 변경 및 관리합니다.'
            : 'Protect and manage the access credentials for the KOJIN staff administration console.'}
        </p>
      </div>

      {/* Security Status Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-1">
          <span className="text-[10px] font-mono text-stone-500 uppercase font-bold">인증 보안 상태</span>
          <div className="text-base font-black text-emerald-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>암호화 보안 활성</span>
          </div>
          <p className="text-[11px] text-stone-500">세션 기반 인가 시스템 가동 중</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-1">
          <span className="text-[10px] font-mono text-stone-500 uppercase font-bold">현재 설정 상태</span>
          <div className="text-base font-black text-stone-900 font-mono">
            {adminPassword === '5696' ? (
              <span className="text-orange-600">초기 기본값 (5696)</span>
            ) : (
              <span className="text-blue-700">관리자 맞춤 변경됨</span>
            )}
          </div>
          <p className="text-[11px] text-stone-500">
            {adminPassword === '5696' ? '보안을 위해 비밀번호 변경을 권장합니다' : '최근 갱신 완료'}
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-1">
          <span className="text-[10px] font-mono text-stone-500 uppercase font-bold">초기화 옵션</span>
          <div className="pt-0.5">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 rounded-lg text-xs font-bold border border-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>5696 기본값 복원</span>
            </button>
          </div>
          <p className="text-[10px] text-stone-400">비번 분실 시 언제든 5696으로 복구</p>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <h3 className="text-lg font-black text-stone-900">
            {language === 'kr' ? '관리자 비밀번호 변경' : 'Change Admin Password'}
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            현재 비밀번호를 인증한 후 안전한 새 비밀번호를 등록해주세요.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              현재 비밀번호 *
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                placeholder="현재 비밀번호 입력 (초기값: 5696)"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              새 비밀번호 (4자리 이상) *
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                placeholder="새로운 관리자 비밀번호 입력"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              새 비밀번호 확인 *
            </label>
            <input
              type={showNew ? 'text' : 'password'}
              required
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              placeholder="새로운 비밀번호를 한 번 더 입력해주세요"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>새 비밀번호 저장</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentPwd('5696');
              }}
              className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              현재 비번(5696) 자동채우기
            </button>
          </div>
        </form>
      </div>

      {/* Security Best Practices Card */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-xs text-amber-950 space-y-2">
        <h4 className="font-bold flex items-center gap-1.5 text-stone-900">
          <Lock className="w-4 h-4 text-orange-600" />
          <span>관리자 보안 가이드라인</span>
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-stone-700">
          <li>
            비밀번호는 브라우저 보안 저장소(LocalStorage)에 안전하게 격리 저장되며, 세션 인증 후 어드민 작업이 허용됩니다.
          </li>
          <li>
            관리자 작업을 마친 후에는 우측 상단의 <strong>[관리자 로그아웃]</strong> 버튼을 누르면 즉시 보안 잠금 상태로 복귀합니다.
          </li>
          <li>
            비밀번호를 분실하더라도 언제든지 위의 <strong>[5696 기본값 복원]</strong> 버튼을 통해 초기 상태로 리셋할 수 있습니다.
          </li>
        </ul>
      </div>
    </div>
  );
};
