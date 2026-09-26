import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles,
  QrCode,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart,
  selectedMarket,
  markets,
  onCheckout
}) {
  const [pickupSlot, setPickupSlot] = useState("09:00 AM - 11:00 AM");
  const [customerName, setCustomerName] = useState("Rohaan Customer");
  const [contactNumber, setContactNumber] = useState("+1 (555) 987-6543");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleConfirmOrder = () => {
    const generatedId = "ML-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderConfirmed(true);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  };

  const handleDone = () => {
    setOrderConfirmed(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white p-5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 text-amber-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base font-heading">Pre-Order Harvest Basket</h3>
                <p className="text-xs text-emerald-200">Reserved for Stall Pickup</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          {orderConfirmed ? (
            /* Digital Order Ticket Modal View */
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold shadow-md shadow-emerald-600/20 animate-bounce">
                ✓
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Pre-Order Confirmed
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 font-heading">
                  Reservation Ticket
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Order ID: <span className="font-mono font-bold text-emerald-700">{orderId}</span>
                </p>
              </div>

              {/* Ticket Card Details */}
              <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-md text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">Pickup Market:</span>
                  <span className="font-extrabold text-slate-900">{selectedMarket ? selectedMarket.market_name : 'Green Valley Market'}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">Time Slot:</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{pickupSlot}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">Customer:</span>
                  <span className="font-bold text-slate-800">{customerName}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 font-medium">Total Amount Due at Pickup:</span>
                  <span className="font-extrabold text-emerald-700 text-base font-heading">${subtotal.toFixed(2)}</span>
                </div>

                {/* QR Code Placeholder */}
                <div className="pt-3 border-t border-dashed border-slate-200 text-center space-y-2">
                  <div className="w-24 h-24 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center border border-slate-300 text-slate-400">
                    <QrCode className="w-16 h-16 text-slate-700" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block">
                    Show this digital ticket at the farmer stall upon pickup.
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-medium text-left flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">No Online Payment Required</span>
                  <span>Please present cash, credit card, or mobile pay directly at the farmer's stall.</span>
                </div>
              </div>

              <button
                onClick={handleDone}
                className="btn-primary w-full py-3.5 text-sm shadow-emerald-500/30"
              >
                Done & Return To Shop
              </button>
            </div>
          ) : (
            /* Cart Items & Form View */
            <>
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                      🛍️
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-base">Your Basket is Empty</h4>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto">
                      Explore fresh organic produce from local farm stalls and reserve your items ahead of market day.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Cart Item Cards */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.product_id}
                          className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-xl border border-slate-200"
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-slate-900 truncate font-heading">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-emerald-700 font-semibold">
                              Stall: {item.stall_name}
                            </p>
                            <span className="text-xs font-extrabold text-slate-800">
                              ${item.price.toFixed(2)} {item.unit}
                            </span>
                          </div>

                          {/* Qty Controls */}
                          <div className="flex flex-col items-end gap-2">
                            <button
                              onClick={() => onRemoveItem(item.product_id)}
                              className="text-slate-400 hover:text-rose-500 transition"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="flex items-center bg-white rounded-lg p-0.5 border border-slate-300">
                              <button
                                onClick={() => onUpdateQty(item.product_id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-slate-100 rounded"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQty(item.product_id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-slate-100 rounded"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Market Pickup Configurator */}
                    <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>Pickup Location & Time Window</span>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Select Market Location:
                        </label>
                        <div className="p-2.5 bg-white rounded-xl border border-slate-200 font-bold text-slate-800 flex items-center justify-between">
                          <span>{selectedMarket ? selectedMarket.market_name : 'Green Valley Farmers Market'}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Sat & Sun</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Pickup Time Slot:
                        </label>
                        <select
                          value={pickupSlot}
                          onChange={(e) => setPickupSlot(e.target.value)}
                          className="w-full p-2.5 bg-white rounded-xl border border-slate-200 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="07:30 AM - 09:00 AM">07:30 AM - 09:00 AM (Early Harvest)</option>
                          <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM (Mid-Morning)</option>
                          <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM (Afternoon Pickup)</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-5 bg-white border-t border-slate-200 space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal ({cart.length} items):</span>
                      <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Market Reservation Fee:</span>
                      <span className="font-bold text-emerald-600">FREE ($0.00)</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-extrabold text-base pt-2 border-t border-slate-100">
                      <span>Total Amount at Stall:</span>
                      <span className="text-emerald-700 font-heading">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={onCheckout ? onCheckout : handleConfirmOrder}
                    className="btn-primary w-full py-3.5 text-sm shadow-emerald-500/30"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Proceed to Checkout & Place Pre-Order</span>
                  </button>

                  <p className="text-[10px] text-slate-400 text-center font-medium">
                    🔒 SRS Complaint: Settlement takes place in-person at pickup.
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
