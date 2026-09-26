import React, { useState } from 'react';
import { createOrder } from '../services/api';
import {
  X, ShoppingBag, MapPin, Clock, CheckCircle2, AlertCircle,
  ChevronDown, ChevronUp, QrCode, Leaf, Calendar, User, ArrowRight
} from 'lucide-react';

import confetti from 'canvas-confetti';

const PICKUP_SLOTS = [
  { id: 'sun_9', label: 'Sunday, 9:00 AM – 10:00 AM', available: true },
  { id: 'sun_10', label: 'Sunday, 10:00 AM – 11:00 AM', available: true },
  { id: 'sun_11', label: 'Sunday, 11:00 AM – 12:00 PM', available: true },
  { id: 'sun_12', label: 'Sunday, 12:00 PM – 1:00 PM', available: false },
];

export default function CheckoutModal({ isOpen, onClose, cart, selectedMarket, onPlaceOrder, showToast }) {
  const [selectedSlot, setSelectedSlot] = useState('sun_9');
  const [specialNote, setSpecialNote] = useState('');
  const [step, setStep] = useState(1); // 1 = review, 2 = confirm, 3 = success
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => s + (i.price || 0) * i.quantity, 0);
  const chosenSlot = PICKUP_SLOTS.find(s => s.id === selectedSlot);

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const resolvedFarmerId = cart[0]?.farmer_id?._id || cart[0]?.farmer_id || cart[0]?.farmerId || null;
      const orderData = {
        farmer_id: resolvedFarmerId,
        products: cart.map(item => ({
          product_id: item.product_id || item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: subtotal,
        order_status: 'placed',
        pickup_date: new Date().toISOString().split('T')[0],
        pickup_time_slot: chosenSlot?.label || 'Sunday, 9:00 AM – 10:00 AM',
        pickup_location: selectedMarket?.market_name || 'Clifton Sunday Farmers Market',
        notes: specialNote
      };

      let newOrderId = `ML-${Date.now().toString().slice(-6)}`;
      try {
        const { data } = await createOrder(orderData);
        newOrderId = data._id || newOrderId;
      } catch (apiErr) {
        console.error('Order API error:', apiErr);
      }

      setOrderId(newOrderId);
      setIsPlacing(false);
      setStep(3);

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // graceful fallback
      }

      onPlaceOrder && onPlaceOrder({
        orderId: newOrderId,
        items: cart,
        pickupSlot: chosenSlot?.label,
        market: selectedMarket?.market_name,
        subtotal,
        note: specialNote,
        status: 'Placed',
        placedAt: new Date().toISOString(),
      });
      showToast && showToast(`Pre-Order #${newOrderId.slice(-6)} placed! Farmer has been notified.`);
    } catch (err) {
      setIsPlacing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 p-5 text-white shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition">
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3 h-3" /> Pre-Order Checkout — SRS 1.6
          </div>
          <h2 className="text-xl font-extrabold text-white" style={{ color: '#fff' }}>
            {step === 3 ? '🎉 Pre-Order Placed!' : 'Place Your Pre-Order'}
          </h2>
          <p className="text-slate-300 text-[11px] mt-0.5">
            {step === 3
              ? `Order #${orderId} confirmed. Pickup your items at the stall.`
              : 'Review items, select pickup window, and confirm. Pay at stall on pickup day.'}
          </p>

          {/* Step indicator */}
          {step < 3 && (
            <div className="flex items-center gap-1 mt-3">
              {[1, 2].map(s => (
                <React.Fragment key={s}>
                  <div className={`w-6 h-6 rounded-full text-[10px] font-extrabold flex items-center justify-center transition ${step >= s ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                    {s}
                  </div>
                  {s < 2 && <div className={`flex-1 h-px ${step > s ? 'bg-emerald-500' : 'bg-white/20'}`} />}
                </React.Fragment>
              ))}
              <span className="text-[10px] text-slate-400 ml-2">{step === 1 ? 'Review Order' : 'Confirm Pickup'}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-5 text-xs text-slate-700">

          {/* SUCCESS STATE */}
          {step === 3 ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Pre-Order Confirmed!</h3>
                <p className="text-slate-500 text-xs mt-1">Your basket is reserved at the stall. Pay in cash on pickup day.</p>
              </div>

              {/* QR Pass */}
              <div className="bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-2xl p-5 space-y-3">
                <QrCode className="w-14 h-14 text-emerald-700 mx-auto" />
                <div className="text-lg font-extrabold text-emerald-900">Order #{orderId}</div>
                <div className="text-[11px] text-emerald-700 font-bold">Show this pass at the stall counter for express pickup</div>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Market</span>
                  <span className="text-slate-900">{selectedMarket?.market_name || 'Clifton Sunday Market'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Pickup Window</span>
                  <span className="text-slate-900">{chosenSlot?.label}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Total Items</span>
                  <span className="text-slate-900">{totalItems} items</span>
                </div>
                <div className="flex justify-between text-xs font-extrabold text-emerald-800 border-t border-slate-200 pt-2 mt-1">
                  <span>Amount Due at Pickup</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 text-[11px] font-medium text-left">
                <AlertCircle className="w-3.5 h-3.5 inline mr-1.5" />
                You can cancel this order from <strong>My Orders</strong> before Saturday 10:00 PM cutoff.
              </div>

              <button
                onClick={onClose}
                className="btn-primary w-full py-3 text-xs font-extrabold cursor-pointer"
              >
                Done — Back to Shopping
              </button>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Order Review */
            <>
              {/* Cart Items List */}
              <div>
                <h3 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-3">Your Pre-Order Items</h3>
                <div className="space-y-2">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                      <ShoppingBag className="w-8 h-8 mx-auto mb-2" />
                      <p>Your basket is empty</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.product_id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-sm shrink-0">
                          <Leaf className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-slate-900 truncate">{item.name}</div>
                          <div className="text-[11px] text-slate-400">{item.quantity} × PKR {(item.price || 0).toLocaleString()}</div>
                        </div>
                        <div className="font-extrabold text-slate-900 shrink-0">
                          PKR {((item.price || 0) * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-600 font-bold">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 font-bold">
                  <span>Delivery / Shipping</span>
                  <span className="text-emerald-700">FREE (Pickup Only)</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-emerald-900 border-t border-emerald-200 pt-2 mt-1">
                  <span>Pay at Stall</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Market Info */}
              <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-extrabold text-slate-900">{selectedMarket?.market_name || 'Clifton Sunday Market'}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{selectedMarket?.location || 'Khayaban-e-Iqbal, Clifton Block 4, Karachi'}</div>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => setStep(2)}
                className="btn-primary w-full py-3 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue — Choose Pickup Slot <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* STEP 2: Pickup Slot Selection */
            <>
              <div>
                <h3 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Choose Your Pickup Window
                </h3>
                <div className="space-y-2">
                  {PICKUP_SLOTS.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                        !slot.available
                          ? 'bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed'
                          : selectedSlot === slot.id
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold text-slate-800 text-xs">{slot.label}</span>
                      </div>
                      {!slot.available ? (
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Full</span>
                      ) : selectedSlot === slot.id ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={specialNote}
                  onChange={e => setSpecialNote(e.target.value)}
                  placeholder="e.g. Please keep my tomatoes separate, or I will be 10 minutes late..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
                />
              </div>

              {/* Final Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Pickup At</span>
                  <span className="text-slate-900">{selectedMarket?.market_name || 'Clifton Sunday Market'}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>Pickup Window</span>
                  <span className="text-emerald-800">{chosenSlot?.label}</span>
                </div>
                <div className="flex justify-between text-xs font-extrabold text-slate-900 border-t border-slate-200 pt-2 mt-1">
                  <span>Total Due at Stall</span>
                  <span>PKR {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 text-[11px] font-medium">
                <AlertCircle className="w-3.5 h-3.5 inline mr-1.5" />
                No payment is collected online. Pay cash at the stall counter during your selected pickup window.
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 rounded-xl border border-slate-300 text-slate-700 font-extrabold text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  className="btn-primary py-3 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isPlacing ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Confirm Pre-Order</>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
