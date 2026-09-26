import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  AlertCircle, 
  QrCode, 
  ExternalLink,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Heart,
  Store
} from 'lucide-react';

export default function UserProfileModal({ 
  isOpen, 
  onClose, 
  user, 
  onSignOut,
  onNavigate,
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'favorites'

  // Pre-orders state
  const [orders, setOrders] = useState([
    {
      order_id: "ML-8921",
      market_name: "Clifton Sunday Farmers Market",
      pickup_date: "This Sunday, Oct 1",
      pickup_time: "08:30 AM – 09:30 AM",
      farmer_name: "Chaudhry Riaz (Green Acres Bio-Farms)",
      stall_number: "Stall #A-01",
      items: [
        { name: "Organic Heirloom Tomatoes", qty: 2, unit: "1 kg pack", price: 280 },
        { name: "Crisp Native Baby Palak", qty: 3, unit: "500g bunch", price: 120 }
      ],
      total_amount: 920,
      status: "Confirmed for Pickup",
      payment_mode: "Cash / JazzCash at Stall",
      cutoff_notice: "Cancellable until Saturday 10:00 PM",
      canCancel: true
    },
    {
      order_id: "ML-7402",
      market_name: "Clifton Sunday Farmers Market",
      pickup_date: "This Sunday, Oct 1",
      pickup_time: "09:00 AM – 10:00 AM",
      farmer_name: "Haji Munir (Malir Wild Apiaries)",
      stall_number: "Stall #A-04",
      items: [
        { name: "Pure Raw Wild Sidr Honey", qty: 1, unit: "1 kg glass jar", price: 2400 }
      ],
      total_amount: 2400,
      status: "Confirmed for Pickup",
      payment_mode: "Cash / EasyPaisa at Stall",
      cutoff_notice: "Cancellable until Saturday 10:00 PM",
      canCancel: true
    }
  ]);

  if (!isOpen || !user) return null;

  const handleCancelOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.order_id !== orderId));
    showToast && showToast(`Pre-order #${orderId} was cancelled. Reservation released.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Card */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${user.avatarBg || 'bg-emerald-600'} text-white font-extrabold text-2xl flex items-center justify-center shadow-lg border-2 border-white/20 font-heading`}>
              {user.avatar || 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white font-heading" style={{ color: '#ffffff' }}>
                  {user.name}
                </h3>
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/40">
                  {user.role || 'Customer'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{user.email} • {user.phone}</p>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Primary Zone: {user.locality || 'Clifton & South, Karachi'}</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-white/10 pt-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'orders' 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Active Pre-Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'profile' 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Account Details</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {activeTab === 'orders' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 font-heading">Your Sunday Pickup Reservations</h4>
                  <p className="text-slate-500 text-[11px]">Show your digital order pass at the farmer's stall to collect.</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  2 Items Reserved
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto text-xl">
                    🧺
                  </div>
                  <h5 className="font-bold text-slate-800">No active pre-orders right now</h5>
                  <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                    Explore our weekly markets and pre-order fresh produce before the Saturday night cutoff.
                  </p>
                  <button
                    onClick={() => { onClose(); onNavigate && onNavigate('browse-markets'); }}
                    className="btn-primary py-2 px-4 text-xs font-bold cursor-pointer"
                  >
                    Browse Markets Now
                  </button>
                </div>
              ) : (
                orders.map((order) => (
                  <div 
                    key={order.order_id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 hover:border-emerald-300 transition"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900 font-heading">Order #{order.order_id}</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {order.status}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">{order.market_name} • <span className="font-bold text-slate-700">{order.stall_number}</span></p>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-bold text-slate-500 block">Pickup Slot</span>
                        <span className="font-extrabold text-emerald-700 text-xs block">{order.pickup_time}</span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-1.5 py-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800">{item.qty}x {item.name} ({item.unit})</span>
                          <span className="font-extrabold text-slate-900">PKR {item.qty * item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total & Action Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Due at Stall</span>
                        <span className="text-base font-extrabold text-emerald-800 font-heading">PKR {order.total_amount}</span>
                        <span className="text-[10px] text-slate-500 block font-medium">({order.payment_mode})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {order.canCancel && (
                          <button
                            onClick={() => handleCancelOrder(order.order_id)}
                            className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-[11px] font-bold transition cursor-pointer"
                          >
                            Cancel Pre-Order
                          </button>
                        )}
                        <div className="bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 shadow-xs">
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Pass Ready</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          ) : (
            /* ACCOUNT DETAILS TAB */
            <div className="space-y-5">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 font-heading">User Profile Information</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Full Name</span>
                    <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Account Role</span>
                    <span className="font-bold text-emerald-700 text-sm">{user.role}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Email Address</span>
                    <span className="font-semibold text-slate-800">{user.email}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Phone / WhatsApp</span>
                    <span className="font-semibold text-slate-800">{user.phone}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Primary Market Zone</span>
                    <span className="font-semibold text-slate-800">{user.locality}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Account Verification</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verified Consumer Profile</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Sign out button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    onSignOut();
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
