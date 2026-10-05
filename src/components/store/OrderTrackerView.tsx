import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Compass,
  MessageSquare,
  ShieldCheck,
  FileCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LiveMockupPreview } from '../common/LiveMockupPreview';

export const OrderTrackerView: React.FC = () => {
  const {
    orders,
    selectedOrderId,
    setSelectedOrderId,
    approveProof,
    requestProofRevision,
    openChatWithArtisan,
    t,
    language,
  } = useApp();

  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [showRevisionInput, setShowRevisionInput] = useState(false);

  const currentOrder =
    orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-display font-bold text-stone-900">
          {language === 'kr' ? '주문 내역이 없습니다' : 'No Orders Placed Yet'}
        </h2>
        <p className="text-xs text-stone-500 mt-2">
          {language === 'kr'
            ? '커스텀 굿즈를 주문하시면 실시간 공방 타임라인과 시안이 이곳에 표시됩니다.'
            : 'Your custom goods and digital proofs will appear here in real-time.'}
        </p>
      </div>
    );
  }

  const activeProof = currentOrder.proofs[currentOrder.proofs.length - 1];

  const handleApprove = (proofId: string) => {
    approveProof(currentOrder.id, proofId);
  };

  const handleSendRevision = (proofId: string) => {
    if (!revisionFeedback.trim()) return;
    requestProofRevision(currentOrder.id, proofId, revisionFeedback);
    setRevisionFeedback('');
    setShowRevisionInput(false);
  };

  return (
    <div className="bg-[#FAF8F3] min-h-[calc(100vh-140px)] py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-700 mb-1">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{t('trackerBadge')}</span>
              <span>·</span>
              <span className="font-extrabold text-stone-900">
                #{currentOrder.orderNumber}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-stone-900">
              {t('orderProgressTitle')}
            </h1>
          </div>

          {/* Order Switcher if user has multiple orders */}
          {orders.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-600 font-bold">{t('switchOrder')}</span>
              <select
                value={currentOrder.id}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="text-xs font-mono font-bold bg-white border-2 border-stone-800 rounded-xl px-3 py-1.5 text-stone-900 focus:outline-none"
              >
                {orders.map((ord) => (
                  <option key={ord.id} value={ord.id}>
                    #{ord.orderNumber} ({ord.items[0]?.product.title.slice(0, 16)}...)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Top Status & Artisan Communication Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Order Stage Overview */}
          <div className="p-5 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-700">
              {t('productionState')}
            </span>
            <div className="text-base font-black text-stone-900 capitalize">
              {currentOrder.status.replace(/_/g, ' ')}
            </div>
            <div className="text-xs text-stone-600 font-medium">
              {currentOrder.estimatedDelivery}
            </div>
          </div>

          {/* KOJIN Production & Customer Support Card */}
          <div className="p-5 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                KOJIN
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-700">
                  {t('assignedMaker')}
                </span>
                <div className="text-xs font-bold text-stone-900">
                  KOJIN 제작 랩 & 품질 검수팀
                </div>
                <div className="text-[11px] text-stone-500 truncate max-w-[130px]">
                  정밀 가공 및 시안 검수
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                openChatWithArtisan(
                  'team-kojin-support',
                  'KOJIN 고객센터',
                  '1:1 제작 문의 & 고객지원팀',
                  '',
                  currentOrder.id,
                  currentOrder.orderNumber,
                  currentOrder.items[0]?.product.title
                )
              }
              className="px-3 py-2 bg-stone-950 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
              title="고객센터 1:1 상담 문의"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('chatBtn')}</span>
            </button>
          </div>

          {/* Courier & Tracking */}
          <div className="p-5 bg-white rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
              {t('logisticsCarrier')}
            </span>
            <div className="text-xs font-bold text-stone-900">
              {currentOrder.carrier || 'CJ대한통운'}
            </div>
            <div className="text-xs font-mono text-orange-700 font-extrabold">
              {currentOrder.trackingNumber || '배송 준비 중'}
            </div>
          </div>
        </div>

        {/* Digital Proof Approval Section (Interactive Highlight!) */}
        {activeProof && (
          <div className="bg-amber-100/90 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-300 text-stone-950 font-mono text-[11px] font-black border border-stone-800 mb-2">
                  <FileCheck className="w-3.5 h-3.5 text-orange-700" />
                  <span>{t('actionRequiredProof')}{activeProof.version}</span>
                </div>
                <h3 className="text-lg font-black font-display text-stone-950">
                  {activeProof.title}
                </h3>
                <p className="text-xs text-stone-700 max-w-xl mt-1 leading-relaxed font-medium">
                  {activeProof.previewNote}
                </p>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {activeProof.status === 'approved' ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold border-2 border-emerald-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t('proofApprovedText')}</span>
                  </span>
                ) : activeProof.status === 'revision_requested' ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-100 text-orange-900 rounded-xl text-xs font-bold border-2 border-orange-400">
                    <RotateCcw className="w-4 h-4 text-orange-700" />
                    <span>{t('proofRevisionSentText')}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-stone-950 rounded-xl text-xs font-extrabold border-2 border-stone-800 shadow-xs animate-bounce-subtle">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>{t('awaitingApprovalText')}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Proof Render Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white p-6 rounded-2xl border-2 border-stone-800">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-orange-700">
                  {language === 'kr' ? '시안 정밀 스펙 내역' : 'Digital Blueprint Specs'}
                </div>
                <div className="space-y-2 text-xs text-stone-800 font-mono font-medium">
                  {activeProof.mockupConfig.character && (
                    <div>• Theme: {activeProof.mockupConfig.character}</div>
                  )}
                  {activeProof.mockupConfig.deviceModel && (
                    <div>• Model: {activeProof.mockupConfig.deviceModel}</div>
                  )}
                  {activeProof.mockupConfig.monogram && (
                    <div>• Name / Monogram: "{activeProof.mockupConfig.monogram}"</div>
                  )}
                  {activeProof.mockupConfig.text && (
                    <div>• Inscription: "{activeProof.mockupConfig.text}"</div>
                  )}
                </div>

                {activeProof.customerFeedback && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs text-stone-800 font-medium">
                    <div className="font-bold text-amber-950 mb-0.5">
                      {language === 'kr' ? '고객님 요청 수정사항:' : 'Your Feedback:'}
                    </div>
                    <div>"{activeProof.customerFeedback}"</div>
                  </div>
                )}
              </div>

              {/* Visual Render */}
              <div className="flex justify-center bg-stone-50 rounded-xl p-4 border border-stone-200">
                <LiveMockupPreview
                  productType={currentOrder.items[0]?.product.productType || 'phone_case'}
                  customization={activeProof.mockupConfig}
                  size="md"
                />
              </div>
            </div>

            {/* Approval & Revision Actions */}
            {activeProof.status === 'pending_customer_approval' && (
              <div className="space-y-4 pt-2">
                {!showRevisionInput ? (
                  <div className="flex flex-wrap items-center gap-3.5">
                    <button
                      onClick={() => handleApprove(activeProof.id)}
                      className="px-6 py-3.5 bg-stone-950 hover:bg-stone-800 text-white font-black text-xs sm:text-sm rounded-xl transition-colors shadow-md inline-flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{t('approveProofBtn')}</span>
                    </button>

                    <button
                      onClick={() => setShowRevisionInput(true)}
                      className="px-4 py-3 bg-white text-stone-900 border-2 border-stone-800 hover:bg-stone-50 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      {t('requestAdjustmentsBtn')}
                    </button>

                    <button
                      onClick={() =>
                        openChatWithArtisan(
                          currentOrder.assignedArtisan.id,
                          currentOrder.assignedArtisan.name,
                          currentOrder.assignedArtisan.role,
                          currentOrder.assignedArtisan.avatar,
                          currentOrder.id,
                          currentOrder.orderNumber,
                          currentOrder.items[0]?.product.title
                        )
                      }
                      className="text-xs text-stone-800 hover:text-orange-600 font-bold inline-flex items-center gap-1.5 underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                      <span>{language === 'kr' ? `${currentOrder.assignedArtisan.name} 작가와 실시간 상담` : 'Chat with maker'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-white rounded-2xl border-2 border-stone-800 space-y-3">
                    <div className="text-xs font-bold text-stone-900">
                      {language === 'kr' ? '원하시는 수정 요청사항을 적어주세요:' : 'Specify Desired Adjustments:'}
                    </div>
                    <textarea
                      rows={2}
                      value={revisionFeedback}
                      onChange={(e) => setRevisionFeedback(e.target.value)}
                      placeholder={language === 'kr' ? '예: 캐릭터 위치를 조금 더 올려주시고 글씨는 굵은 폰트로 교체해주세요!' : 'e.g. Please adjust font size...'}
                      className="w-full text-xs p-2.5 border-2 border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSendRevision(activeProof.id)}
                        className="px-4 py-2 bg-stone-950 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors"
                      >
                        {language === 'kr' ? '작가에게 수정사항 전달' : 'Submit Revision'}
                      </button>
                      <button
                        onClick={() => setShowRevisionInput(false)}
                        className="px-3 py-2 text-xs font-bold text-stone-500 hover:text-stone-800"
                      >
                        {language === 'kr' ? '취소' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 5-Stage Live Timeline */}
        <div className="bg-white rounded-3xl border-2 border-stone-800 p-6 sm:p-8 space-y-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 font-display">
              {t('timelineTitle')}
            </h3>
            <span className="text-xs text-orange-700 font-mono font-bold">LIVE STATUS</span>
          </div>

          <div className="relative border-l-3 border-stone-800 pl-6 ml-3 space-y-8">
            {currentOrder.milestones.map((m, idx) => {
              const isPast = m.completed;
              const isCurrent = m.current;

              return (
                <div key={idx} className="relative group">
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute -left-[32px] top-0 w-4.5 h-4.5 rounded-full border-2 border-stone-900 transition-all flex items-center justify-center ${
                      isPast
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-amber-400 ring-4 ring-amber-200 animate-pulse'
                        : 'bg-white'
                    }`}
                  >
                    {isPast && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-xs font-bold tracking-wide ${
                          isCurrent
                            ? 'text-orange-950 font-black'
                            : isPast
                            ? 'text-stone-900'
                            : 'text-stone-400'
                        }`}
                      >
                        {m.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] font-mono font-black uppercase bg-amber-300 text-stone-950 px-2 py-0.5 rounded border border-stone-800">
                          {language === 'kr' ? '진행 중' : 'Active'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed max-w-xl font-medium">
                      {m.description}
                    </p>
                    <div className="text-[11px] font-mono text-stone-400 pt-0.5">
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items & Shipping Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customized Items */}
          <div className="bg-white rounded-3xl border-2 border-stone-800 p-6 space-y-4 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
              {t('itemsInRun')}
            </h4>
            <div className="space-y-4">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-20 bg-stone-100 rounded-xl border border-stone-300 overflow-hidden flex items-center justify-center shrink-0">
                    <LiveMockupPreview
                      productType={item.product.productType}
                      customization={item.customization}
                      size="sm"
                      className="scale-75"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-xs font-bold text-stone-900">
                      {language === 'kr' && item.product.titleKr ? item.product.titleKr : item.product.title}
                    </div>
                    <div className="text-[11px] font-mono text-stone-600 space-y-0.5">
                      {item.customization.character && (
                        <div>Theme: {item.customization.character}</div>
                      )}
                      {item.customization.monogram && (
                        <div>Name: "{item.customization.monogram}"</div>
                      )}
                    </div>
                    <div className="text-xs font-mono text-stone-900 font-extrabold pt-1">
                      ${item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-white rounded-3xl border-2 border-stone-800 p-6 space-y-4 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
              {t('shippingRecipient')}
            </h4>
            <div className="space-y-1 text-xs text-stone-700 font-medium">
              <div className="font-bold text-stone-950">
                {currentOrder.shippingAddress.fullName}
              </div>
              <div>{currentOrder.shippingAddress.street}</div>
              <div>
                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}{' '}
                {currentOrder.shippingAddress.postalCode}
              </div>
              <div>{currentOrder.shippingAddress.country}</div>
              <div className="font-mono text-stone-500 pt-2">
                Phone: {currentOrder.shippingAddress.phone}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 text-xs flex justify-between text-stone-600 font-mono font-bold">
              <span>{currentOrder.paymentMethod}</span>
              <span className="font-extrabold text-orange-600">
                Total: ${currentOrder.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
