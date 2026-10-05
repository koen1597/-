import React, { useState } from 'react';
import {
  Users,
  Search,
  Mail,
  Calendar,
  Phone,
  ShoppingBag,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Filter,
  CheckCircle2,
  X,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserAccount, Order } from '../../types';

export const AdminCustomers: React.FC = () => {
  const {
    users,
    orders,
    setSelectedOrderId,
    setIsChatDrawerOpen,
    language,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | 'google' | 'email'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<UserAccount | null>(null);
  const [showPasswordInModal, setShowPasswordInModal] = useState(false);

  // Filter customers
  const filteredUsers = users.filter((u) => {
    const matchesProvider =
      providerFilter === 'all' || u.authProvider === providerFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      (u.birthDate && u.birthDate.includes(q));
    return matchesProvider && matchesSearch;
  });

  // Calculate order stats per customer
  const getCustomerOrders = (email: string): Order[] => {
    return orders.filter(
      (o) => o.customerEmail.toLowerCase() === email.toLowerCase()
    );
  };

  const googleCount = users.filter((u) => u.authProvider === 'google').length;
  const emailCount = users.filter((u) => u.authProvider === 'email').length;
  const totalSpend = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-stone-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-600" />
            <span>{language === 'kr' ? '고객 정보 & 회원 관리' : 'Customer & Member Directory'}</span>
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            {language === 'kr'
              ? '가입된 고객의 프로필, 로그인 방식(이메일/구글), 생년월일 및 누적 주문 내역을 실시간 관리합니다.'
              : 'Manage registered user accounts, auth providers, birth dates, and purchase history.'}
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-1">
          <span className="text-[10px] font-mono text-stone-400 font-bold">총 가입 회원</span>
          <div className="text-2xl font-black text-stone-900 font-mono">{users.length} 명</div>
          <p className="text-[10px] text-stone-500">KOJIN 스튜디오 회원 풀</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-1">
          <span className="text-[10px] font-mono text-stone-400 font-bold">Google 소셜 가입</span>
          <div className="text-2xl font-black text-blue-600 font-mono">{googleCount} 명</div>
          <p className="text-[10px] text-stone-500">Google 원클릭 로그인 연동</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-1">
          <span className="text-[10px] font-mono text-stone-400 font-bold">일반 이메일 가입</span>
          <div className="text-2xl font-black text-stone-800 font-mono">{emailCount} 명</div>
          <p className="text-[10px] text-stone-500">자체 이메일/비밀번호 회원</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-1">
          <span className="text-[10px] font-mono text-stone-400 font-bold">누적 주문 총액</span>
          <div className="text-xl font-black text-orange-600 font-mono">
            {totalSpend.toLocaleString()} 원
          </div>
          <p className="text-[10px] text-stone-500">총 {orders.length}건의 주문 결제</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="고객 이름, 이메일, 전화번호, 생년월일 검색..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-center">
          <span className="text-xs text-stone-400 font-bold mr-1">로그인 방식:</span>
          {(['all', 'google', 'email'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setProviderFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                providerFilter === tab
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab === 'all' ? '전체' : tab === 'google' ? 'Google 소셜' : '일반 이메일'}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-800">
            <thead className="bg-[#FAF8F3] border-b-2 border-stone-800 text-[11px] font-mono text-stone-600 uppercase">
              <tr>
                <th className="py-3.5 px-4 font-bold">고객 프로필</th>
                <th className="py-3.5 px-4 font-bold">로그인 방식</th>
                <th className="py-3.5 px-4 font-bold">생년월일</th>
                <th className="py-3.5 px-4 font-bold">연락처</th>
                <th className="py-3.5 px-4 font-bold">가입 일자</th>
                <th className="py-3.5 px-4 font-bold">누적 주문 / 구매액</th>
                <th className="py-3.5 px-4 font-bold text-right">상세 조회</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400 text-xs">
                    일치하는 고객 정보가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const customerOrders = getCustomerOrders(u.email);
                  const customerTotal = customerOrders.reduce((acc, o) => acc + o.total, 0);

                  return (
                    <tr key={u.id} className="hover:bg-amber-50/40 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-9 h-9 rounded-full object-cover border border-stone-200"
                          />
                          <div>
                            <div className="font-bold text-stone-900 text-xs">{u.name}</div>
                            <div className="text-[11px] text-stone-400 font-mono">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Login Provider Badge */}
                      <td className="py-3.5 px-4">
                        {u.authProvider === 'google' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span>Google 소셜</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                            <Mail className="w-3 h-3 text-stone-500" />
                            <span>일반 이메일</span>
                          </span>
                        )}
                      </td>

                      {/* Birth Date */}
                      <td className="py-3.5 px-4 font-mono text-stone-700">
                        {u.birthDate || '미등록'}
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 font-mono text-stone-700">
                        {u.phone || '미등록'}
                      </td>

                      {/* Member Since */}
                      <td className="py-3.5 px-4 text-stone-600">
                        {u.memberSince}
                      </td>

                      {/* Orders & Total Spend */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-stone-900">
                          {customerOrders.length}건
                          {customerTotal > 0 && (
                            <span className="text-orange-600 ml-1.5 font-black">
                              ({customerTotal.toLocaleString()}원)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedCustomer(u)}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          정보 & 구매이력
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-stone-800 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 bg-[#FAF8F3] border-b-2 border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-stone-800 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-stone-900">
                      {selectedCustomer.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      {selectedCustomer.authProvider === 'google' ? 'Google 소셜 로그인' : '일반 이메일 계정'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">
                    {selectedCustomer.email} · 가입일: {selectedCustomer.memberSince}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              {/* Profile Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div>
                  <span className="text-[10px] font-mono text-stone-400">생년월일</span>
                  <div className="font-bold text-stone-900 text-xs mt-0.5">
                    {selectedCustomer.birthDate || '미등록'}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400">휴대폰 번호</span>
                  <div className="font-bold text-stone-900 text-xs mt-0.5">
                    {selectedCustomer.phone || '미등록'}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400">회원 등급</span>
                  <div className="font-bold text-emerald-700 text-xs mt-0.5">
                    KOJIN 일반 회원
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-stone-400">총 구매 금액</span>
                  <div className="font-black text-orange-600 text-xs mt-0.5">
                    {getCustomerOrders(selectedCustomer.email)
                      .reduce((acc, o) => acc + o.total, 0)
                      .toLocaleString()}{' '}
                    원
                  </div>
                </div>
              </div>

              {/* Authentication Credentials & Method Details */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-orange-600" />
                    <span>계정 보안 및 로그인 방식</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700">
                    {selectedCustomer.authProvider === 'google' ? 'Google OAuth 2.0' : '자체 이메일/비번 인증'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                    <span className="text-[10px] font-mono text-stone-400 block mb-0.5">로그인 식별자 (이메일)</span>
                    <span className="font-mono font-bold text-stone-900">{selectedCustomer.email}</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 block mb-0.5">비밀번호 관리</span>
                      {selectedCustomer.authProvider === 'google' ? (
                        <span className="text-[11px] font-medium text-blue-700 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Google 소셜 계정 (구글 토큰 인증)
                        </span>
                      ) : (
                        <span className="font-mono font-bold text-stone-900 text-xs">
                          {showPasswordInModal
                            ? selectedCustomer.password || 'password123'
                            : '••••••••••'}
                        </span>
                      )}
                    </div>
                    {selectedCustomer.authProvider === 'email' && (
                      <button
                        type="button"
                        onClick={() => setShowPasswordInModal(!showPasswordInModal)}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {showPasswordInModal ? (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>숨기기</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>비번 확인</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Purchase History */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                    <span>해당 고객 구매 이력 ({getCustomerOrders(selectedCustomer.email).length}건)</span>
                  </h4>
                </div>

                {getCustomerOrders(selectedCustomer.email).length === 0 ? (
                  <p className="text-stone-400 text-xs py-4 text-center bg-stone-50 rounded-xl">
                    아직 구매 내역이 없습니다.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {getCustomerOrders(selectedCustomer.email).map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3 bg-white border border-stone-200 rounded-xl flex items-center justify-between hover:border-stone-400 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-stone-900">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                              {ord.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-600">
                            {ord.items.map((i) => i.product.titleKr || i.product.title).join(', ')} ({ord.items.length}종)
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-3">
                          <div className="font-mono font-black text-xs text-stone-900">
                            {ord.total.toLocaleString()} 원
                          </div>
                          <button
                            onClick={() => {
                              setSelectedOrderId(ord.id);
                              setSelectedCustomer(null);
                            }}
                            className="px-2.5 py-1 bg-stone-900 text-white rounded-lg text-[11px] font-bold hover:bg-stone-800 transition-colors"
                          >
                            주문 조회
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
