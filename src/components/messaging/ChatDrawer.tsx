import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  MessageSquare,
  FileCheck,
  Compass,
  Headphones,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChatDrawer: React.FC = () => {
  const {
    isChatDrawerOpen,
    setIsChatDrawerOpen,
    conversations,
    messages,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    setSelectedOrderId,
    appMode,
    t,
    language,
  } = useApp();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConv =
    conversations.find((c) => c.id === activeConversationId) ||
    conversations[0];

  const currentMessages = messages.filter(
    (m) => m.conversationId === (currentConv?.id || '')
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages.length, isChatDrawerOpen]);

  if (!isChatDrawerOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentConv) return;
    sendMessage(currentConv.id, input, appMode === 'store' ? 'customer' : 'admin');
    setInput('');
  };

  const handleQuickPrompt = (prompt: string) => {
    if (!currentConv) return;
    sendMessage(currentConv.id, prompt, 'customer');
  };

  const supportFaqs = [
    { label: '🔍 시안 확인 및 수정 문의', text: '제작 전 등록된 1:1 시안을 미리 확인하고 수정할 수 있나요?' },
    { label: '📦 배송 및 출고 일정 안내', text: '주문 후 실물 굿즈 출고 및 배송까지 며칠 정도 걸리나요?' },
    { label: '🎨 직접 그린 도안/일러스트 인쇄', text: '직접 작업한 고화질 PNG/PSD 도안 파일로도 1개 제작이 가능한가요?' },
    { label: '🏷️ 대량 주문 할인 견적', text: '50개 이상 단체/동아리/행사용 대량 주문 시 할인율과 견적이 궁금합니다.' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsChatDrawerOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col justify-between border-l-2 border-stone-800">
          {/* Top Header: KOJIN Customer Support */}
          <div className="px-5 py-4 border-b-2 border-stone-800 bg-[#FAF8F3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black shadow-xs">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black font-display text-stone-900 leading-tight">
                    KOJIN 고객센터 (1:1 제작 상담)
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[11px] text-stone-500 font-medium">
                  {language === 'kr'
                    ? '평일 10:00 - 18:00 실시간 상담 운영 중'
                    : 'Customer Support & Custom Orders Desk'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatDrawerOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Linked Order Banner */}
          {currentConv?.orderNumber && (
            <div className="px-5 py-2.5 bg-orange-50/80 border-b border-orange-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-orange-950 font-black">
                  #{currentConv.orderNumber}
                </span>
                <span className="text-stone-700 truncate max-w-[200px] font-medium">
                  {currentConv.productTitle}
                </span>
              </div>
              <button
                onClick={() => {
                  if (currentConv.orderId) {
                    setSelectedOrderId(currentConv.orderId);
                    setIsChatDrawerOpen(false);
                  }
                }}
                className="text-orange-700 font-bold hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t('trackProgressBtn')}</span>
              </button>
            </div>
          )}

          {/* Support Guidelines Notice */}
          <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>
              {language === 'kr'
                ? '시안 검수, 주문 제작 일정, 대량 주문 등 문의사항을 남겨주시면 고객지원팀이 신속히 안내해 드립니다.'
                : 'Leave inquiries regarding proof approval, custom specs, or bulk orders for our support team.'}
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF9F6]">
            {/* System Welcome Message */}
            <div className="flex gap-2.5 items-start justify-start">
              <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                K
              </div>
              <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-xs bg-white text-stone-900 border-2 border-stone-200 rounded-bl-xs shadow-xs space-y-1">
                <div className="flex items-center justify-between gap-3 text-[10px] text-stone-500 font-mono">
                  <span className="font-bold text-orange-700">KOJIN 고객지원팀</span>
                  <span>상담 안내</span>
                </div>
                <p className="leading-relaxed font-medium">
                  안녕하세요! 나만의 굿즈 제작 스튜디오 <strong>KOJIN</strong> 고객센터입니다.
                  <br />
                  시안 확인, 옵션 변경, 배송 및 제작 일정 등 궁금하신 점을 말씀해 주시면 신속히 안내해 드리겠습니다.
                </p>
              </div>
            </div>

            {currentMessages.map((msg) => {
              const isMe =
                appMode === 'store'
                  ? msg.senderRole === 'customer'
                  : msg.senderRole !== 'customer';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 items-end ${
                    isMe ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isMe && (
                    <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mb-1 shadow-xs">
                      K
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs shadow-xs space-y-1 ${
                      isMe
                        ? 'bg-stone-950 text-white rounded-br-xs'
                        : 'bg-white text-stone-900 border-2 border-stone-300 rounded-bl-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[10px] opacity-70 font-mono">
                      <span className="font-bold">
                        {isMe
                          ? appMode === 'store'
                            ? '나 (고객)'
                            : 'KOJIN 고객지원팀'
                          : msg.senderRole === 'customer'
                          ? msg.senderName
                          : 'KOJIN 고객지원팀'}
                      </span>
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</p>

                    {/* Proof notification bubble within chat */}
                    {msg.proofId && (
                      <div className="mt-2 p-2.5 bg-orange-100/90 text-stone-900 rounded-xl border border-orange-300 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950">
                          <FileCheck className="w-4 h-4 text-orange-600 shrink-0" />
                          <span>{msg.proofTitle || '디자인 시안 등록됨'}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (msg.orderId) {
                              setSelectedOrderId(msg.orderId);
                              setIsChatDrawerOpen(false);
                            }
                          }}
                          className="px-2.5 py-1 bg-stone-900 text-white text-[11px] rounded-lg hover:bg-stone-800 transition-colors font-bold shrink-0 cursor-pointer"
                        >
                          {t('reviewProofBtn')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Support FAQ Prompts Bar */}
          {appMode === 'store' && (
            <div className="px-4 py-2.5 bg-stone-100 border-t border-stone-200 space-y-1.5 text-[11px]">
              <div className="text-stone-500 font-bold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
                <span>자주 묻는 질문 빠른 문의:</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {supportFaqs.map((faq) => (
                  <button
                    key={faq.label}
                    type="button"
                    onClick={() => handleQuickPrompt(faq.text)}
                    className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-orange-700 text-stone-700 border border-stone-200 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {faq.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t-2 border-stone-800 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="고객센터에 문의하실 내용을 입력해주세요..."
              className="flex-1 text-xs bg-stone-50 border-2 border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 font-medium"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 bg-stone-950 text-white rounded-xl hover:bg-stone-800 disabled:opacity-40 transition-colors shrink-0 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
              aria-label="Send message"
            >
              <span>{t('sendBtn')}</span>
              <Send className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
