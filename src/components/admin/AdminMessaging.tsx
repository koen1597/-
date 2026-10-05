import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Package,
  Compass,
  FileCheck,
  CheckCheck,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminMessaging: React.FC = () => {
  const {
    conversations,
    messages,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    orders,
    setSelectedOrderId,
    setAdminView,
  } = useApp();

  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(
    (c) =>
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.orderNumber && c.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv =
    conversations.find((c) => c.id === activeConversationId) ||
    filteredConversations[0] ||
    conversations[0];

  const currentMessages = messages.filter(
    (m) => m.conversationId === selectedConv?.id
  );

  const linkedOrder = orders.find((o) => o.id === selectedConv?.orderId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConv) return;
    sendMessage(selectedConv.id, replyText, 'artisan');
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black font-display text-stone-900 flex items-center gap-2">
          <span>KOJIN 고객센터 문의 & 상담 관리</span>
          <span className="text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded border border-orange-300">
            실시간 고객 지원
          </span>
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          고객들의 1:1 제작 문의, 시안 확인 요청, 대량 주문 상담에 실시간으로 답변합니다.
        </p>
      </div>

      {/* Messaging Dual Pane */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
        {/* Left Pane: Conversations List (col-span-4) */}
        <div className="md:col-span-4 border-r border-stone-200 flex flex-col bg-stone-50/50">
          {/* Search Thread */}
          <div className="p-3 border-b border-stone-200">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search inquiries, orders..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400">
                No customer inquiries found.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = selectedConv?.id === conv.id;

                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-amber-50/80 border-l-3 border-amber-800'
                        : 'hover:bg-stone-100/60'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.customerAvatar}
                        alt={conv.customerName}
                        className="w-9 h-9 rounded-full object-cover border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      {conv.unreadCountAdmin > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-700 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                          {conv.unreadCountAdmin}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-stone-900 truncate">
                          {conv.customerName}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 shrink-0">
                          {new Date(conv.lastMessageAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      {conv.orderNumber && (
                        <div className="text-[10px] font-mono text-amber-900 font-medium">
                          Order #{conv.orderNumber}
                        </div>
                      )}

                      <p className="text-[11px] text-stone-500 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Active Thread Chat & Reply Box (col-span-8) */}
        {selectedConv ? (
          <div className="md:col-span-8 flex flex-col justify-between h-full bg-[#FAF9F6]">
            {/* Thread Header */}
            <div className="p-4 border-b border-stone-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConv.customerAvatar}
                  alt={selectedConv.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xs font-semibold text-stone-900">
                    {selectedConv.customerName}
                  </h3>
                  <div className="text-[11px] text-stone-500 font-mono">
                    {selectedConv.customerEmail}
                  </div>
                </div>
              </div>

              {linkedOrder && (
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-stone-100 rounded text-xs font-mono text-stone-800">
                    #{linkedOrder.orderNumber} · {linkedOrder.status.replace(/_/g, ' ')}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOrderId(linkedOrder.id);
                      setAdminView('orders');
                    }}
                    className="text-xs text-amber-800 font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <Compass className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Messages Flow */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {currentMessages.map((msg) => {
                const isArtisanAdmin = msg.senderRole !== 'customer';

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 items-end ${
                      isArtisanAdmin ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {!isArtisanAdmin && (
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-3 text-xs shadow-xs space-y-1 ${
                        isArtisanAdmin
                          ? 'bg-stone-900 text-white rounded-br-xs'
                          : 'bg-white text-stone-900 border border-stone-200 rounded-bl-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 text-[10px] opacity-70">
                        <span className="font-semibold">
                          {isArtisanAdmin ? 'KOJIN 고객지원팀' : msg.senderName}
                        </span>
                        <span>
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {msg.proofId && (
                        <div className="mt-2 p-2 bg-amber-50 text-stone-900 rounded border border-amber-200 text-xs flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-amber-700" />
                          <span className="font-medium">
                            {msg.proofTitle || 'Design Proof Attached'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Artisan Templates */}
            <div className="px-4 py-2 bg-stone-100/70 border-t border-stone-200 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px]">
              <span className="text-stone-400 font-mono shrink-0">Artisan Quick Reply:</span>
              <button
                type="button"
                onClick={() =>
                  setReplyText(
                    'I have reviewed your custom request and will prepare a calibrated die proof within the hour!'
                  )
                }
                className="px-2 py-0.5 bg-white border border-stone-200 rounded text-stone-600 hover:text-stone-900 whitespace-nowrap"
              >
                "Calibrated proof coming"
              </button>
              <button
                type="button"
                onClick={() =>
                  setReplyText(
                    'The hand-tooling on your piece is underway on our bench now. The grain and stitching are looking exquisite.'
                  )
                }
                className="px-2 py-0.5 bg-white border border-stone-200 rounded text-stone-600 hover:text-stone-900 whitespace-nowrap"
              >
                "Tooling underway"
              </button>
              <button
                type="button"
                onClick={() =>
                  setReplyText(
                    'We can definitely adjust the font kerning or monogram placement for you before cutting the material!'
                  )
                }
                className="px-2 py-0.5 bg-white border border-stone-200 rounded text-stone-600 hover:text-stone-900 whitespace-nowrap"
              >
                "Placement tweak confirmed"
              </button>
            </div>

            {/* Reply Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-stone-200 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`${selectedConv.customerName} 고객님께 답변 작성...`}
                className="flex-1 text-xs bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-4 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Send Reply</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-8 flex items-center justify-center text-xs text-stone-400">
            Select a conversation to view and respond to customer requests.
          </div>
        )}
      </div>
    </div>
  );
};
