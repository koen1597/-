import React from 'react';
import {
  Package,
  FileCheck,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminOverview: React.FC = () => {
  const { orders, products, conversations, setAdminView, t, language } = useApp();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const pendingProofs = orders.filter((o) => o.status === 'proof_ready');
  const unreadMessagesCount = conversations.reduce(
    (acc, c) => acc + c.unreadCountAdmin,
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-display font-black text-stone-900 flex items-center gap-2">
          <span>{language === 'kr' ? 'KOJIN 주문 제작 & 고객센터 현황' : 'KOJIN Production & Support Overview'}</span>
          <span className="text-xs font-mono font-bold bg-amber-300 text-stone-900 px-2 py-0.5 rounded border border-stone-800">
            {language === 'kr' ? '실시간 연동' : 'Live Connected'}
          </span>
        </h2>
        <p className="text-xs text-stone-600 mt-1 font-medium">
          {language === 'kr'
            ? 'KOJIN 호러·큐트 캐릭터 폰케이스, 동물 손거울, 아크릴 키링의 실시간 제작 파이프라인과 고객센터 1:1 문의를 확인하세요.'
            : 'Monitor active character custom runs, digital proofs, and customer communications.'}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              {language === 'kr' ? '진행 중인 커스텀 주문' : 'Active Orders'}
            </span>
            <Package className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black font-mono text-stone-900">
            {activeOrders.length}
          </div>
          <div className="text-[11px] text-stone-500 font-medium">
            {orders.length} {language === 'kr' ? '건 중 제작 진행 중' : 'total orders'}
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              {language === 'kr' ? '고객 시안 승인 대기' : 'Awaiting Proof'}
            </span>
            <FileCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black font-mono text-orange-700">
            {pendingProofs.length}
          </div>
          <div className="text-[11px] text-stone-500 font-medium">
            {language === 'kr' ? '승인 즉시 인쇄/제작 착수' : 'Awaiting customer review'}
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              {language === 'kr' ? '고객센터 1:1 문의 대화' : 'Customer Inquiries'}
            </span>
            <MessageSquare className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black font-mono text-stone-900">
            {conversations.length}
          </div>
          <div className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
            <span className="font-mono text-orange-600 font-bold">
              {unreadMessagesCount} {language === 'kr' ? '건 미확인' : 'unread'}
            </span>
            <span>· 평균 응답 15분</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              {language === 'kr' ? '누적 제작 매출' : 'Total Revenue'}
            </span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black font-mono text-stone-900 tabular-nums">
            {totalRevenue.toLocaleString()} 원
          </div>
          <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{language === 'kr' ? '공방 가동률 92%' : 'High Utilization'}</span>
          </div>
        </div>
      </div>

      {/* Quick Action Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Action Queue */}
        <div className="p-6 bg-white rounded-3xl border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              {language === 'kr' ? '실시간 제작 주문 파이프라인' : 'Production Queue'}
            </h3>
            <button
              onClick={() => setAdminView('orders')}
              className="text-xs text-orange-700 hover:underline font-bold"
            >
              {language === 'kr' ? '전체 주문 보기 →' : 'View All →'}
            </button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                className="p-3 bg-stone-50 rounded-xl border-2 border-stone-200 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-stone-900">
                      #{ord.orderNumber}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-700 font-medium">{ord.customerName}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono truncate max-w-[200px]">
                    {ord.items[0]?.product.title}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                      ord.status === 'proof_ready'
                        ? 'bg-amber-200 text-stone-900 border border-stone-800'
                        : ord.status === 'in_crafting'
                        ? 'bg-cyan-100 text-cyan-900 border border-cyan-400'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {ord.status.replace(/_/g, ' ')}
                  </span>
                  <button
                    onClick={() => setAdminView('orders')}
                    className="px-2.5 py-1 bg-stone-900 text-white rounded-lg text-[11px] font-bold hover:bg-stone-800"
                  >
                    {language === 'kr' ? '관리' : 'Manage'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Artisan Conversations Snapshot */}
        <div className="p-6 bg-white rounded-3xl border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              {language === 'kr' ? '실시간 1:1 고객 문의' : 'Recent Inquiries'}
            </h3>
            <button
              onClick={() => setAdminView('messages')}
              className="text-xs text-orange-700 hover:underline font-bold"
            >
              {language === 'kr' ? '메신저 허브 열기 →' : 'Open Messaging →'}
            </button>
          </div>

          <div className="space-y-3">
            {conversations.slice(0, 3).map((conv) => (
              <div
                key={conv.id}
                onClick={() => setAdminView('messages')}
                className="p-3 bg-stone-50 rounded-xl border-2 border-stone-200 hover:border-stone-800 transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={conv.customerAvatar}
                    alt={conv.customerName}
                    className="w-8 h-8 rounded-full object-cover border border-stone-300"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <span>{conv.customerName}</span>
                      {conv.orderNumber && (
                        <span className="font-mono text-[10px] text-orange-700 font-bold">
                          (#{conv.orderNumber})
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 line-clamp-1 max-w-xs font-medium">
                      {conv.lastMessage}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-stone-400 shrink-0">
                  {new Date(conv.lastMessageAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
