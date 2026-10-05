import React, { useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  Phone,
  ShoppingBag,
  Sparkles,
  LogOut,
  Edit2,
  Check,
  ShieldCheck,
  Package,
  MessageSquare,
  Clock,
  ExternalLink,
  MapPin,
  Heart,
  ChevronRight,
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyProfilePage: React.FC = () => {
  const {
    currentUser,
    setCurrentPage,
    logoutCustomer,
    updateUserProfile,
    resetTestData,
    orders,
    setSelectedOrderId,
    setIsChatDrawerOpen,
    wishlist,
    products,
    setSelectedProduct,
    language,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('orders');

  // Section 1: Edit Profile (Name, Phone, BirthDate, Address) - Separate State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [birthDate, setBirthDate] = useState(currentUser?.birthDate || '');
  const [streetAddress, setStreetAddress] = useState(
    currentUser?.savedAddresses?.[0]?.street || '기본 배송지 미등록'
  );

  // Section 2: Password Change (For Email Accounts ONLY) - Separate State
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // If user is not logged in, show login prompt screen
  if (!currentUser) {
    return (
      <div className="py-16 px-4 bg-[#F8F7F2] min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl border-2 border-stone-800 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-stone-800 flex items-center justify-center mx-auto text-amber-900 shadow-xs">
            <User className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-display font-black text-stone-900">
              로그인이 필요한 페이지입니다
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
              마이 프로필, 주문 제작 현황 및 1:1 시안 검수 내역을 확인하시려면 먼저 로그인해주세요.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setCurrentPage('login')}
              className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>KOJIN 로그인하러 가기</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentPage('signup')}
              className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>1초 간편 회원가입</span>
            </button>
          </div>

          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-stone-500 hover:text-stone-900 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>스토어로 돌아가기</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Real-time user's specific orders (New accounts start cleanly with 0 orders)
  const myOrders = orders.filter(
    (o) => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase()
  );
  const totalSpent = myOrders.reduce((acc, o) => acc + o.total, 0);

  // Profile Edit Handler (Name, Phone, BirthDate, Address)
  const handleStartEditProfile = () => {
    setName(currentUser.name);
    setPhone(currentUser.phone || '');
    setBirthDate(currentUser.birthDate || '');
    setStreetAddress(currentUser.savedAddresses?.[0]?.street || '');
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('이름을 입력해주세요.', 'alert');
      return;
    }

    const updates: any = {
      name: name.trim(),
      phone: phone.trim(),
      birthDate: birthDate.trim() || '미등록',
    };

    if (streetAddress.trim()) {
      updates.savedAddresses = [
        {
          fullName: name.trim(),
          street: streetAddress.trim(),
          city: '서울',
          state: '마포구',
          postalCode: '04052',
          country: '대한민국',
          phone: phone.trim() || '010-0000-0000',
        },
      ];
    }

    updateUserProfile(updates);
    setIsEditingProfile(false);
    showToast('프로필 정보가 성공적으로 수정되었습니다!', 'success');
  };

  // Password Change Handler (Strictly for Email Accounts)
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    const expectedCurrentPassword = currentUser.password || 'password123';
    if (!currentPasswordInput) {
      setPasswordError('현재 비밀번호를 입력해주세요.');
      return;
    }
    if (currentPasswordInput !== expectedCurrentPassword) {
      setPasswordError('현재 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!newPasswordInput || newPasswordInput.length < 6) {
      setPasswordError('새 비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordError('새 비밀번호와 비밀번호 확인 입력이 일치하지 않습니다.');
      return;
    }

    updateUserProfile({ password: newPasswordInput.trim() });
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setPasswordSuccess('비밀번호가 성공적으로 변경되었습니다. 다음 로그인부터 새로운 비밀번호가 적용됩니다.');
    showToast('비밀번호가 성공적으로 변경되었습니다!', 'success');
  };

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 bg-[#F8F7F2] min-h-[calc(100vh-140px)]">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-500 font-bold">
            <button
              onClick={() => setCurrentPage('home')}
              className="hover:text-stone-900 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>홈</span>
            </button>
            <span>/</span>
            <span className="text-stone-900 font-black">마이 프로필 페이지</span>
          </div>

          <button
            onClick={() => setCurrentPage('home')}
            className="text-stone-600 hover:text-stone-950 font-bold transition-colors cursor-pointer"
          >
            ← 스토어 계속 둘러보기
          </button>
        </div>

        {/* Profile Hero Header Card */}
        <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* User Info Left */}
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-stone-800 shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-amber-400 text-stone-950 rounded-lg border border-stone-800">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                    {currentUser.name}
                  </h1>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    KOJIN 공식 회원
                  </span>
                  {currentUser.authProvider === 'google' ? (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Google 소셜 로그인 회원
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-300 inline-flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-stone-500" />
                      자체 이메일 / 패스워드 회원
                    </span>
                  )}
                </div>

                <div className="text-xs text-stone-600 font-mono flex flex-wrap items-center gap-3">
                  <span>{currentUser.email}</span>
                  <span>·</span>
                  <span>가입일: {currentUser.memberSince}</span>
                  {currentUser.phone && (
                    <>
                      <span>·</span>
                      <span>연락처: {currentUser.phone}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Metrics & Logout */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100">
              <div className="p-3 sm:p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center min-w-[100px]">
                <span className="text-[10px] font-mono text-stone-400 font-bold block">
                  총 주문 건수
                </span>
                <span className="text-lg font-black text-stone-900 font-mono">
                  {myOrders.length}건
                </span>
              </div>

              <div className="p-3 sm:p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center min-w-[120px]">
                <span className="text-[10px] font-mono text-stone-400 font-bold block">
                  누적 결제액
                </span>
                <span className="text-lg font-black text-orange-600 font-mono">
                  {totalSpent.toLocaleString()}원
                </span>
              </div>

              <button
                onClick={logoutCustomer}
                className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-2xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
                title="로그아웃"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                <span>로그아웃</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('이전 테스트 세션에서 저장된 브라우저 캐시 및 주문 내역을 모두 초기화하시겠습니까?')) {
                    resetTestData();
                    setCurrentPage('home');
                  }
                }}
                className="px-3 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-300 rounded-2xl text-xs font-mono transition-all cursor-pointer"
                title="이전 브라우저 캐시 및 테스트 데이터 전체 초기화"
              >
                캐시/데이터 초기화
              </button>
            </div>
          </div>
        </div>

        {/* Page Section Tabs */}
        <div className="flex items-center gap-2 border-b-2 border-stone-800 pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-950 border border-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>나의 주문 & 1:1 시안 내역 ({myOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-950 border border-stone-200'
            }`}
          >
            <User className="w-4 h-4 text-orange-400" />
            <span>회원 정보 & 계정 보안</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'bg-stone-950 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-950 border border-stone-200'
            }`}
          >
            <Heart className="w-4 h-4 text-red-500" />
            <span>찜한 상품 목록 ({wishlistedProducts.length})</span>
          </button>
        </div>

        {/* Tab 1: Orders and 1:1 Proofs */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-600" />
                  <span>주문 및 1:1 커스텀 시안 관리</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  주문 즉시 제작 관리팀이 1:1 고해상도 시안을 등록하며, 고객 승인 후 실물 제작에 착수합니다.
                </p>
              </div>

              <button
                onClick={() => setIsChatDrawerOpen(true)}
                className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-stone-900 border border-amber-300 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                <span>1:1 고객센터 상담 문의</span>
              </button>
            </div>

            {myOrders.length === 0 ? (
              /* Clean Empty State for New User */
              <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-300 flex items-center justify-center mx-auto text-stone-400">
                  <Package className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-stone-900 text-base">
                    아직 주문하신 내역이 없습니다 (0건)
                  </h4>
                  <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                    새롭게 가입하신 것을 환영합니다! 고딕 호러 폰케이스, 아크릴 디오라마 스탠드, 동물 손거울 등 원하는 상품을 선택하여 나만의 커스텀 굿즈를 주문해보세요.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="px-6 py-3.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-black inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>스토어 상품 둘러보기 및 커스텀하기</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {myOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-3xl border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] p-6 space-y-4 hover:border-orange-500 transition-colors"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono font-black text-stone-900 text-sm">
                          주문번호: #{ord.orderNumber}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">
                          주문일시: {new Date(ord.createdAt).toLocaleString()}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                          {ord.status === 'proof_ready'
                            ? '✨ 1:1 시안 도착 (승인 대기)'
                            : ord.status === 'in_crafting'
                            ? '⚙️ 레이저 가공 & 정밀 제작 중'
                            : ord.status === 'shipped'
                            ? '🚚 택배 출고 및 배송 중'
                            : ord.status === 'delivered'
                            ? '✅ 배송 완료'
                            : '주문 접수'}
                        </span>
                      </div>

                      <div className="font-mono font-black text-base text-stone-900 text-right">
                        총 결제 금액: <span className="text-orange-600">{ord.total.toLocaleString()}원</span>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="divide-y divide-stone-100">
                      {ord.items.map((item) => (
                        <div
                          key={item.id}
                          className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-700 text-base">
                              🎨
                            </div>
                            <div>
                              <div className="font-bold text-stone-900 text-sm">
                                {item.product.titleKr || item.product.title}
                              </div>
                              <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                                {item.customization.character && (
                                  <span className="mr-2">캐릭터: {item.customization.character}</span>
                                )}
                                {item.customization.monogram && (
                                  <span className="mr-2">이니셜: {item.customization.monogram}</span>
                                )}
                                {item.customization.text && (
                                  <span>문구: "{item.customization.text}"</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 self-end sm:self-center">
                            <span className="font-mono text-stone-500 font-bold">
                              {item.quantity}개
                            </span>
                            <span className="font-mono font-bold text-stone-900">
                              {item.totalPrice.toLocaleString()}원
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Proof Notice & Bottom Actions */}
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs text-amber-950 space-y-0.5">
                        <span className="font-bold flex items-center gap-1.5 text-stone-900">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>담당 제작 관리자: {ord.assignedArtisan.name}</span>
                        </span>
                        <p className="text-[11px] text-stone-700">
                          시안 검수창에서 디테일한 외곽선 및 각인 위치를 확인하고 즉시 승인 또는 수정 요청을 보낼 수 있습니다.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setSelectedOrderId(ord.id);
                          }}
                          className="px-4 py-2.5 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-black inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                          <span>1:1 시안 검수 및 실시간 배송조회</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile Info & Password Management (Separate Sections) */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* SECTION A: 기본 회원 프로필 (이름 수정 등) - All Users */}
            <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-600" />
                    <span>회원 기본 프로필 관리 (이름, 연락처, 배송지)</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    회원님의 실명, 연락처, 생년월일 및 상품 수령 기본 배송지를 관리합니다.
                  </p>
                </div>

                {!isEditingProfile ? (
                  <button
                    onClick={handleStartEditProfile}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>이름 및 정보 수정</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    수정 취소
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                /* Profile Edit Form */
                <form onSubmit={handleSaveProfile} className="space-y-5 text-xs max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-800 font-bold mb-1.5">
                        이름 (실명) *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름 입력 (예: 홍길동)"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-800 font-bold mb-1.5">
                        로그인 이메일 (계정 식별자 - 변경 불가)
                      </label>
                      <input
                        type="email"
                        disabled
                        value={currentUser.email}
                        className="w-full px-3.5 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-500 font-mono cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-800 font-bold mb-1.5">
                        생년월일 (YYYY.MM.DD)
                      </label>
                      <input
                        type="text"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        placeholder="예: 1998.05.20"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-800 font-bold mb-1.5">
                        휴대폰 번호
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="예: 010-1234-5678"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-800 font-bold mb-1.5">
                      기본 배송지 주소
                    </label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="도로명 주소 및 상세 주소"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>수정사항 저장하기</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      취소
                    </button>
                  </div>
                </form>
              ) : (
                /* Profile Display Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 font-bold block">이름 (실명)</span>
                    <span className="font-black text-stone-900 text-sm">{currentUser.name}</span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 font-bold block">이메일 주소</span>
                    <span className="font-mono font-bold text-stone-900">{currentUser.email}</span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 font-bold block">로그인 방식</span>
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      {currentUser.authProvider === 'google' ? (
                        <span className="text-blue-600 font-black">Google OAuth 2.0 연동</span>
                      ) : (
                        <span className="text-stone-800 font-black">일반 이메일 회원</span>
                      )}
                    </span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 font-bold block">생년월일</span>
                    <span className="font-mono font-bold text-stone-900">
                      {currentUser.birthDate || '미등록'}
                    </span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 font-bold block">연락처</span>
                    <span className="font-mono font-bold text-stone-900">
                      {currentUser.phone || '미등록'}
                    </span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 font-bold block">기본 배송지</span>
                    <span className="font-medium text-stone-800 truncate block">
                      {currentUser.savedAddresses?.[0]?.street || '등록된 기본 배송지가 없습니다.'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION B: 비밀번호 수정 기능 (일반 회원가입 폼 가입자 전용 - 구글 사용자는 버튼/기능 없음) */}
            {currentUser.authProvider === 'email' ? (
              <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] p-6 sm:p-8 space-y-5">
                <div className="border-b border-stone-200 pb-4">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-orange-600" />
                    <h3 className="text-base font-black text-stone-900">
                      비밀번호 변경 (일반 이메일 회원 전용)
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    현재 비밀번호를 인증한 후 새로운 비밀번호로 안전하게 변경합니다.
                  </p>
                </div>

                {passwordError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md text-xs">
                  {/* Current Password */}
                  <div>
                    <label className="block text-stone-800 font-bold mb-1.5">
                      현재 비밀번호 *
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        required
                        value={currentPasswordInput}
                        onChange={(e) => {
                          setCurrentPasswordInput(e.target.value);
                          setPasswordError('');
                          setPasswordSuccess('');
                        }}
                        placeholder="현재 사용 중인 비밀번호"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-stone-800 font-bold mb-1.5">
                      새 비밀번호 * (최소 6자리 이상)
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={newPasswordInput}
                        onChange={(e) => {
                          setNewPasswordInput(e.target.value);
                          setPasswordError('');
                          setPasswordSuccess('');
                        }}
                        placeholder="새로운 비밀번호 입력"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-stone-800 font-bold mb-1.5">
                      새 비밀번호 확인 *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPasswordInput}
                        onChange={(e) => {
                          setConfirmPasswordInput(e.target.value);
                          setPasswordError('');
                          setPasswordSuccess('');
                        }}
                        placeholder="새로운 비밀번호 다시 입력"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-950 hover:bg-stone-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-2"
                  >
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>비밀번호 변경 완료</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Google Social Account Info Banner (No password fields or buttons!) */
              <div className="p-5 bg-blue-50/70 border-2 border-blue-200 rounded-3xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center shrink-0 text-blue-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <h4 className="font-black text-blue-950 text-sm">
                    Google 계정 연동 보안 안내
                  </h4>
                  <p className="text-blue-800 leading-relaxed">
                    회원님은 <strong>Google 소셜 로그인</strong>으로 가입하셨습니다. KOJIN 시스템에 별도의 비밀번호를 저장하지 않고 Google의 고도화된 2단계 인증과 보안 시스템으로 안전하게 보호되므로, 비밀번호 설정이나 변경이 필요하지 않습니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span>찜한 상품 보관함 ({wishlistedProducts.length}개)</span>
            </h3>

            {wishlistedProducts.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-xs text-stone-500 font-bold">아직 찜한 상품이 없습니다.</p>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="px-5 py-2.5 bg-stone-950 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  상품 둘러보기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {wishlistedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl border-2 border-stone-200 hover:border-stone-800 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-stone-900">{p.titleKr || p.title}</span>
                      <span className="text-xs font-mono font-black text-orange-600">
                        {p.price.toLocaleString()}원
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setCurrentPage('home');
                      }}
                      className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      커스텀 주문하기
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
