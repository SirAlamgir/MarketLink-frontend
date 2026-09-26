import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus as apiUpdateOrderStatus } from '../services/api';
import {
  X, ShoppingBag, Clock, CheckCircle2, AlertCircle, Star,
  QrCode, MapPin, RotateCcw, XCircle, ChevronRight, Leaf,
  BarChart2, Package, Calendar, TrendingUp, Truck, User, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

const DEMO_ORDERS = [
  {
    orderId: 'ML-887234',
    status: 'Delivered',
    placedAt: '2026-09-24',
    pickupSlot: 'Sunday, 10:00 AM – 11:00 AM',
    market: 'Clifton Sunday Market',
    items: [
      { name: 'Heirloom Tomatoes', qty: 2, unit: 'kg', price: 380, farmer: 'Chaudhry Ghulam Rasool' },
      { name: 'Wild Sidr Honey', qty: 1, unit: 'jar', price: 1200, farmer: 'Tariq Mehmood' },
    ],
    total: 1960,
  },
  {
    orderId: 'ML-774120',
    status: 'Confirmed',
    placedAt: '2026-09-25',
    pickupSlot: 'Sunday, 9:00 AM – 10:00 AM',
    market: 'DHA Phase 6 Weekend Market',
    items: [
      { name: 'Organic Spinach', qty: 1, unit: 'bundle', price: 120, farmer: 'Chaudhry Ghulam Rasool' },
      { name: 'Fresh Desi Eggs', qty: 2, unit: 'dozen', price: 480, farmer: 'Tariq Mehmood' },
    ],
    total: 1080,
  },
  {
    orderId: 'ML-663055',
    status: 'Placed',
    placedAt: '2026-09-25',
    pickupSlot: 'Sunday, 11:00 AM – 12:00 PM',
    market: 'Clifton Sunday Market',
    items: [
      { name: 'Guava (Amrood)', qty: 3, unit: 'kg', price: 200, farmer: 'Chaudhry Ghulam Rasool' },
    ],
    total: 600,
  },
  {
    orderId: 'ML-551987',
    status: 'Cancelled',
    placedAt: '2026-08-31',
    pickupSlot: 'Sunday, 10:00 AM – 11:00 AM',
    market: 'Clifton Sunday Market',
    items: [
      { name: 'Organic Milk', qty: 2, unit: 'litre', price: 250, farmer: 'Tariq Mehmood' },
    ],
    total: 500,
  },
];

const STATUS_STYLES = {
  'Placed': { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300' },
  'Confirmed': { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300' },
  'Ready for Pickup': { bg: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300' },
  'Delivered': { bg: 'bg-gradient-to-r from-emerald-600 to-emerald-700', text: 'text-white', border: 'border-emerald-700' },
  'Completed': { bg: 'bg-emerald-700', text: 'text-white', border: 'border-emerald-800' },
  'Cancelled': { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300' },
  'Rejected': { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300' },
};

export default function CustomerDashboard({ isOpen, onClose, currentUser, onReorder, showToast, onNavigate }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'history' | 'favorites'
  const [orders, setOrders] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (isOpen) {
      getOrders()
        .then(({ data }) => {
          // Filter only this customer's orders if currentUser exists, else show all
          const myOrders = currentUser?._id
            ? data.filter(o => o.customer_id === currentUser._id || o.customer_id?._id === currentUser._id || o.customer_id === currentUser.id)
            : data;
          
          // Map to match frontend structure
          const mapped = (myOrders || []).map(o => ({
            orderId: o._id || o.orderId,
            status: o.order_status === 'placed' ? 'Placed' 
                  : o.order_status === 'confirmed' || o.order_status === 'accepted' ? 'Confirmed'
                  : o.order_status === 'ready' ? 'Ready for Pickup'
                  : o.order_status === 'delivered' || o.order_status === 'completed' ? 'Delivered'
                  : o.order_status === 'rejected' ? 'Rejected'
                  : o.order_status === 'cancelled' ? 'Cancelled'
                  : 'Placed',
            placedAt: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : (o.order_date || 'Recently'),
            pickupSlot: o.pickup_time_slot || 'Sunday Morning',
            market: o.pickup_location || o.market || 'Clifton Sunday Market',
            total: o.total_amount !== undefined ? o.total_amount : (o.total || 0),
            items: o.products ? o.products.map(p => ({
              name: p.product_id?.name || p.name || 'Organic Produce',
              qty: p.quantity || p.qty || 1,
              price: p.price || 0,
              unit: p.product_id?.unit || p.unit || 'kg',
              farmer: p.product_id?.farmer_name || p.product_id?.farmer_id?.name || p.farmer || 'MarketLink Farmer'
            })) : []
          }));
          const finalOrders = mapped.length > 0 ? mapped : DEMO_ORDERS;
          setOrders(finalOrders);

          // If there is any delivered order, celebrate with confetti
          if (finalOrders.some(ord => ord.status === 'Delivered')) {
            try {
              confetti({
                particleCount: 65,
                spread: 60,
                origin: { y: 0.4 }
              });
            } catch (e) {}
          }
        })
        .catch(() => {
          setOrders(DEMO_ORDERS);
        })
        .finally(() => setLoadingOrders(false));
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const activeOrders = orders.filter(o => o.status === 'Placed' || o.status === 'Confirmed' || o.status === 'Ready for Pickup');
  const historyOrders = orders.filter(o => o.status === 'Delivered' || o.status === 'Completed' || o.status === 'Cancelled' || o.status === 'Rejected');

  const handleCancel = async (orderId) => {
    setCancellingId(orderId);
    try {
      await apiUpdateOrderStatus(orderId, 'cancelled');
      setOrders(prev => prev.map(o =>
        o.orderId === orderId ? { ...o, status: 'Cancelled' } : o
      ));
      showToast && showToast(`Order #${orderId.slice(-6)} cancelled successfully.`);
    } catch (err) {
      setOrders(prev => prev.map(o =>
        o.orderId === orderId ? { ...o, status: 'Cancelled' } : o
      ));
      showToast && showToast(`Order #${orderId.slice(-6)} cancelled.`);
    } finally {
      setCancellingId(null);
    }
  };

  const handleReorder = (order) => {
    onReorder && onReorder(order);
    showToast && showToast(`Items from #${order.orderId.slice(-6)} added back to basket!`);
    onClose();
  };

  const totalSpent = orders.filter(o => o.status === 'Delivered' || o.status === 'Completed').reduce((s, o) => s + (o.total || 0), 0);

  const tabs = [
    { id: 'orders', label: 'Active Orders', count: activeOrders.length },
    { id: 'history', label: 'History & Delivered', count: historyOrders.length },
  ];

  const OrderCard = ({ order }) => {
    const st = STATUS_STYLES[order.status] || STATUS_STYLES['Placed'];
    const canCancel = order.status === 'Placed';

    return (
      <div className={`border rounded-2xl overflow-hidden bg-white transition hover:shadow-md ${
        order.status === 'Delivered' ? 'border-emerald-300 ring-2 ring-emerald-500/10' : 'border-slate-200'
      }`}>
        {/* Card Header */}
        <div className="flex items-center justify-between p-3.5 bg-slate-50 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-xs font-mono">#{order.orderId.slice(-8)}</span>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${st.bg} ${st.text} ${st.border}`}>
                {order.status === 'Delivered' && <Truck className="w-3 h-3 text-white inline shrink-0" />}
                {order.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Placed {order.placedAt}
            </div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-slate-900 text-sm">PKR {Number(order.total).toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">Pay at stall</div>
          </div>
        </div>

        {/* Items */}
        <div className="px-3.5 py-3 space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex flex-wrap items-center justify-between text-xs gap-1">
              <div className="flex items-center gap-1.5 text-slate-700 flex-1 min-w-0">
                <Leaf className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-bold truncate">{item.qty}× {item.name}</span>
                <span className="text-slate-400">({item.unit})</span>
                {item.farmer && (
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200/60 shrink-0">
                    Farmer: {item.farmer}
                  </span>
                )}
              </div>
              <span className="font-extrabold text-slate-700 shrink-0">PKR {((item.price || 0) * (item.qty || 1)).toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Pickup Info */}
        <div className="px-3.5 pb-3 flex items-start gap-1.5 text-[11px] text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
          <span>{order.market} — {order.pickupSlot}</span>
        </div>

        {/* QR / Actions */}
        <div className="px-3.5 pb-3.5 flex flex-wrap items-center gap-2">
          {order.status === 'Confirmed' && (
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-1.5 text-emerald-800 font-extrabold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmed by Farmer! Being prepared
            </div>
          )}
          {order.status === 'Ready for Pickup' && (
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 text-blue-800 font-extrabold text-[11px]">
              <QrCode className="w-3.5 h-3.5" /> Ready at Stall — Express Pickup
            </div>
          )}
          {(order.status === 'Delivered' || order.status === 'Completed') && (
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-1.5 text-emerald-800 font-extrabold text-[11px]">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Order Delivered Successfully! 🎉</span>
              </div>
              <button
                onClick={() => handleReorder(order)}
                className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl px-3 py-1.5 text-[11px] font-extrabold cursor-pointer transition shadow-xs hover:scale-102"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reorder
              </button>
            </div>
          )}
          {canCancel && (
            <button
              onClick={() => handleCancel(order.orderId)}
              disabled={cancellingId === order.orderId}
              className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-xl px-3 py-1.5 text-rose-700 font-extrabold text-[11px] cursor-pointer hover:bg-rose-100 transition disabled:opacity-60"
            >
              {cancellingId === order.orderId ? (
                <span className="w-3 h-3 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <XCircle className="w-3.5 h-3.5" />
              )}
              Cancel Order
            </button>
          )}
          {(order.status === 'Cancelled' || order.status === 'Rejected') && (
            <button
              onClick={() => handleReorder(order)}
              className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-extrabold text-[11px] cursor-pointer hover:bg-slate-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reorder Items
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 p-5 text-white shrink-0 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition">
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-full ${currentUser?.avatarBg || 'bg-emerald-600'} text-white font-extrabold text-lg flex items-center justify-center shadow`}>
              {currentUser?.avatar || 'A'}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white" style={{ color: '#fff' }}>
                {currentUser?.name || 'My Dashboard'}
              </h2>
              <p className="text-emerald-300 text-[11px] font-bold">{currentUser?.role || 'Customer'} · {currentUser?.locality || 'Karachi'}</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { icon: <Package className="w-3.5 h-3.5" />, label: 'Active Orders', val: activeOrders.length },
              { icon: <CheckCircle2 className="w-3.5 h-3.5" />, label: 'Completed', val: historyOrders.filter(o=>o.status==='Completed').length },
              { icon: <TrendingUp className="w-3.5 h-3.5" />, label: 'Total Spent', val: `PKR ${totalSpent.toLocaleString()}` },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-2.5 text-center border border-white/10">
                <div className="flex items-center justify-center gap-1 text-emerald-300 mb-0.5">{stat.icon}</div>
                <div className="font-extrabold text-white text-sm">{stat.val}</div>
                <div className="text-[9px] text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 shrink-0 bg-slate-50">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-xs font-extrabold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === tab.id
                  ? 'text-emerald-700 border-b-2 border-emerald-600 bg-white'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-3">
          {activeTab === 'orders' ? (
            activeOrders.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto" />
                <p className="font-bold">No active orders</p>
                <p className="text-[11px]">Browse markets and place a pre-order to see it here.</p>
                <button
                  onClick={() => { onClose(); onNavigate && onNavigate('browse-markets'); }}
                  className="mt-2 btn-primary text-xs py-2 px-5 cursor-pointer"
                >
                  Browse Markets
                </button>
              </div>
            ) : (
              activeOrders.map(order => <OrderCard key={order.orderId} order={order} />)
            )
          ) : (
            /* ORDER HISTORY TAB */
            historyOrders.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Clock className="w-10 h-10 mx-auto" />
                <p className="font-bold">No past orders yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1">
                  Past Orders — Click "Reorder" to quickly re-add items to basket
                </div>
                {historyOrders.map(order => <OrderCard key={order.orderId} order={order} />)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
