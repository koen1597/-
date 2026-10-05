import React, { useState } from 'react';
import {
  Package,
  FileCheck,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  ArrowRight,
  Upload,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { LiveMockupPreview } from '../common/LiveMockupPreview';

export const AdminOrders: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    uploadProof,
    openChatWithArtisan,
    setAdminView,
    setActiveConversationId,
    conversations,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Digital Proof Creator state
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofTitle, setProofTitle] = useState('Die Engraving Blueprint v2');
  const [proofNotes, setProofNotes] = useState(
    'Refined laser kerning and verified depth calibration. Please review the updated layout.'
  );

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = filterStatus === 'all' || ord.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.items.some((i) => i.product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleCreateProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    uploadProof(selectedOrder.id, {
      title: proofTitle,
      previewNote: proofNotes,
      mockupConfig: selectedOrder.items[0]?.customization || {},
    });

    setShowProofModal(false);
  };

  const handleOpenChat = (order: Order) => {
    const conv = conversations.find((c) => c.orderId === order.id);
    if (conv) {
      setActiveConversationId(conv.id);
      setAdminView('messages');
    } else {
      openChatWithArtisan(
        order.assignedArtisan.id,
        order.assignedArtisan.name,
        order.assignedArtisan.role,
        order.assignedArtisan.avatar,
        order.id,
        order.orderNumber,
        order.items[0]?.product.title
      );
      setAdminView('messages');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Artisan Production Orders Pipeline
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Review bespoke customer requirements, advance production stages, and issue design proofs.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order #, customer, item..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto scrollbar-none text-xs">
        {[
          { label: 'All Orders', value: 'all', count: orders.length },
          { label: 'Order Placed', value: 'placed', count: orders.filter((o) => o.status === 'placed').length },
          { label: 'Proof Ready', value: 'proof_ready', count: orders.filter((o) => o.status === 'proof_ready').length },
          { label: 'In Crafting', value: 'in_crafting', count: orders.filter((o) => o.status === 'in_crafting').length },
          { label: 'Quality Check', value: 'quality_check', count: orders.filter((o) => o.status === 'quality_check').length },
          { label: 'Shipped', value: 'shipped', count: orders.filter((o) => o.status === 'shipped').length },
          { label: 'Delivered', value: 'delivered', count: orders.filter((o) => o.status === 'delivered').length },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterStatus(tab.value)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filterStatus === tab.value
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>{tab.label}</span>
            <span className="font-mono text-[11px] text-stone-400">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-mono uppercase text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Order</th>
                <th className="py-3.5 px-4 font-semibold">Customer & Specs</th>
                <th className="py-3.5 px-4 font-semibold">Bespoke Item</th>
                <th className="py-3.5 px-4 font-semibold">Assigned Artisan</th>
                <th className="py-3.5 px-4 font-semibold">Workflow Status</th>
                <th className="py-3.5 px-4 font-semibold">Total</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-500">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Order # */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-stone-900">
                      #{ord.orderNumber}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900">{ord.customerName}</div>
                      <div className="text-[11px] text-stone-400 truncate max-w-[160px]">
                        {ord.customerEmail}
                      </div>
                    </td>

                    {/* Bespoke Item & Custom Specs */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-800 line-clamp-1">
                        {ord.items[0]?.product.title}
                      </div>
                      <div className="text-[11px] font-mono text-amber-900 mt-0.5">
                        {ord.items[0]?.customization.monogram && (
                          <span>Monogram: "{ord.items[0].customization.monogram}" </span>
                        )}
                        {ord.items[0]?.customization.text && (
                          <span>· Inscription: "{ord.items[0].customization.text}"</span>
                        )}
                      </div>
                    </td>

                    {/* Artisan */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={ord.assignedArtisan.avatar}
                          alt={ord.assignedArtisan.name}
                          className="w-5 h-5 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-stone-700">{ord.assignedArtisan.name}</span>
                      </div>
                    </td>

                    {/* Workflow Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          handleStatusChange(ord.id, e.target.value as OrderStatus)
                        }
                        className="text-[11px] font-mono bg-stone-50 border border-stone-200 rounded px-2 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
                      >
                        <option value="placed">Placed</option>
                        <option value="artisan_review">Artisan Review</option>
                        <option value="proof_ready">Proof Ready</option>
                        <option value="in_crafting">In Crafting</option>
                        <option value="quality_check">Quality Check</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-stone-900 tabular-nums">
                      ${ord.total.toFixed(2)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
                          title="Inspect Order Details & Proofs"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenChat(ord)}
                          className="p-1.5 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded"
                          title="Message Customer Regarding Order"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Inspector Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-stone-900">
                  Workshop Order Dossier: #{selectedOrder.orderNumber}
                </h3>
                <span className="text-xs text-stone-500 font-mono">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Order Status Controller Bar */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-stone-400">
                    Production Stage
                  </span>
                  <div className="text-sm font-semibold text-stone-900 capitalize">
                    {selectedOrder.status.replace(/_/g, ' ')}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowProofModal(true)}
                    className="px-3 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-semibold hover:bg-amber-900 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Digital Proof</span>
                  </button>

                  <button
                    onClick={() => {
                      handleOpenChat(selectedOrder);
                      setSelectedOrder(null);
                    }}
                    className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Customer Chat</span>
                  </button>
                </div>
              </div>

              {/* Items & Custom Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                    Bespoke Production Manifest
                  </h4>
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                      <div className="font-semibold text-xs text-stone-900">
                        {item.product.title}
                      </div>
                      <div className="text-xs space-y-1 font-mono text-stone-600">
                        {item.customization.deviceModel && (
                          <div>• Fit: {item.customization.deviceModel}</div>
                        )}
                        {item.customization.color && (
                          <div>• Material Tone: {item.customization.color}</div>
                        )}
                        {item.customization.monogram && (
                          <div className="text-amber-900 font-bold">
                            • Monogram Stamped: "{item.customization.monogram}"
                          </div>
                        )}
                        {item.customization.text && (
                          <div>• Inscription: "{item.customization.text}"</div>
                        )}
                        {item.customization.font && (
                          <div>• Typography: {item.customization.font}</div>
                        )}
                        {item.customization.specialNotes && (
                          <div className="text-stone-700 bg-amber-50 p-2 rounded border border-amber-200">
                            Note from customer: "{item.customization.specialNotes}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Preview of Specs */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                    Specification Render
                  </h4>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex justify-center">
                    <LiveMockupPreview
                      productType={selectedOrder.items[0]?.product.productType || 'phone_case'}
                      customization={selectedOrder.items[0]?.customization}
                      size="md"
                    />
                  </div>
                </div>
              </div>

              {/* Existing Digital Proofs History */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Digital Proofs on Record ({selectedOrder.proofs.length})
                </h4>
                {selectedOrder.proofs.length === 0 ? (
                  <p className="text-xs text-stone-400">
                    No digital proofs have been issued yet. Click "Upload Digital Proof" to send one.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedOrder.proofs.map((proof) => (
                      <div
                        key={proof.id}
                        className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-stone-900">
                            {proof.title} (v{proof.version})
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {proof.previewNote}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                            proof.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : proof.status === 'revision_requested'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {proof.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Proof Sub-Modal */}
      {showProofModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 space-y-4 shadow-2xl border border-stone-200">
            <h3 className="text-sm font-semibold text-stone-900">
              Issue Digital Proof for #{selectedOrder.orderNumber}
            </h3>

            <form onSubmit={handleCreateProof} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-600 mb-1">Proof Blueprint Title</label>
                <input
                  type="text"
                  required
                  value={proofTitle}
                  onChange={(e) => setProofTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1">
                  Artisan Notes / Calibration Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={proofNotes}
                  onChange={(e) => setProofNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProofModal(false)}
                  className="px-3 py-1.5 text-stone-500 hover:text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800"
                >
                  Transmit Proof to Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
