import React, { useState } from 'react';
import {
  X, ShoppingBag, Star, MapPin, Clock, Leaf, Plus, Minus,
  CheckCircle2, AlertCircle, User, Store, Heart, Share2, ChevronRight
} from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onAddToCart, onOpenFarmerDetail, favorites, onToggleFavorite }) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'reviews'
  const [addedAnim, setAddedAnim] = useState(false);

  if (!product) return null;

  const isFav = favorites && favorites.includes(product.product_id);

  const handleAddToCart = () => {
    onAddToCart && onAddToCart(product, qty);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1800);
  };

  // Mock reviews for product
  const mockReviews = [
    { id: 1, name: 'Ayesha K.', rating: 5, date: 'Sep 14, 2025', comment: 'Absolutely fresh! Picked it up at the Clifton market and it lasted a whole week. Will reorder.' },
    { id: 2, name: 'Tariq M.', rating: 4, date: 'Sep 7, 2025', comment: 'Great quality, the farmer was very helpful at the stall. Slight delay in pickup window but overall excellent.' },
    { id: 3, name: 'Sana R.', rating: 5, date: 'Aug 30, 2025', comment: 'Best organic produce in Karachi. Pre-ordering made it so convenient — no waiting in line!' },
  ];

  const avgRating = (mockReviews.reduce((s, r) => s + r.rating, 0) / mockReviews.length).toFixed(1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Image Band */}
        <div className="relative bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-950 p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Fav + Share */}
          <div className="absolute top-4 right-14 flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite && onToggleFavorite(product.product_id)}
              className={`p-2 rounded-full transition cursor-pointer ${isFav ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Category Badge */}
          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-3">
            <Leaf className="w-3 h-3" /> {product.category || 'Organic Produce'}
          </span>

          <h2 className="text-2xl font-extrabold text-white leading-tight" style={{ color: '#fff' }}>
            {product.name}
          </h2>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <div className="flex items-center gap-1 text-amber-400">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className="w-3.5 h-3.5" fill={s <= Math.round(parseFloat(avgRating)) ? 'currentColor' : 'none'} />
              ))}
              <span className="text-white text-xs font-bold ml-1">{avgRating}</span>
              <span className="text-slate-400 text-[11px]">({mockReviews.length} reviews)</span>
            </div>
            <span className="text-slate-400 text-[11px]">•</span>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Certified Organic
            </span>
          </div>

          {/* Price + Unit */}
          <div className="flex items-end gap-3 mt-4">
            <span className="text-3xl font-extrabold text-white">
              PKR {product.price?.toLocaleString() || '450'}
            </span>
            <span className="text-slate-300 text-sm pb-1">/ {product.unit || 'kg'}</span>
            <span className={`ml-auto text-xs font-extrabold px-2.5 py-1 rounded-full ${
              (product.stock_quantity || 30) > 10
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                : 'bg-red-500/20 text-red-300 border border-red-400/30'
            }`}>
              {(product.stock_quantity || 30) > 10 ? `${product.stock_quantity || 30} units left` : 'Limited Stock!'}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 shrink-0 bg-slate-50">
          {['details', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-extrabold uppercase tracking-wider transition cursor-pointer ${
                activeTab === tab
                  ? 'text-emerald-700 border-b-2 border-emerald-600 bg-white'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'details' ? 'Product Details' : `Reviews (${mockReviews.length})`}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-5 text-xs text-slate-700">

          {activeTab === 'details' ? (
            <>
              {/* Description */}
              <div>
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">About This Product</h3>
                <p className="text-slate-600 leading-relaxed text-[13px]">
                  {product.description ||
                    `Freshly harvested ${product.name} sourced directly from certified regional farms in the Malir Agricultural Zone. 
                    Grown without synthetic pesticides, this produce is delivered to the market stall every Saturday morning. 
                    All items are available for pre-order and in-person pickup only — no delivery. Payment is settled at the stall.`}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Category', value: product.category || 'Vegetables', icon: <Leaf className="w-3.5 h-3.5 text-emerald-600" /> },
                  { label: 'Unit Size', value: product.unit || '1 kg', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> },
                  { label: 'Pickup Only', value: 'Pay at Stall', icon: <MapPin className="w-3.5 h-3.5 text-emerald-600" /> },
                  { label: 'Cutoff Time', value: 'Sat 10:00 PM', icon: <Clock className="w-3.5 h-3.5 text-amber-600" /> },
                ].map(info => (
                  <div key={info.label} className="flex items-start gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <div className="mt-0.5 shrink-0">{info.icon}</div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{info.label}</div>
                      <div className="font-extrabold text-slate-900 mt-0.5">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Farmer Info Card */}
              {product.farmer_name && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <h3 className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5" /> Grower / Stall Info
                  </h3>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow">
                        {product.farmer_name?.charAt(0) || 'F'}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-sm">{product.farmer_name}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {product.stall || 'Clifton Sunday Market — Stall A-01'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenFarmerDetail && onOpenFarmerDetail({ farmer_name: product.farmer_name, farmer_id: product.farmer_id })}
                      className="flex items-center gap-1 text-emerald-700 font-extrabold text-[11px] hover:underline cursor-pointer whitespace-nowrap"
                    >
                      View Profile <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Pickup Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <h3 className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Pickup & Payment Info (SRS 1.5)
                </h3>
                <ul className="space-y-1.5 text-[12px] text-amber-800 font-medium">
                  <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" /> No online payment — settle at stall on pickup day</li>
                  <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" /> Pre-orders can be cancelled before Saturday 10:00 PM</li>
                  <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" /> Bring your QR pass for express stall pickup</li>
                </ul>
              </div>
            </>
          ) : (
            /* REVIEWS TAB */
            <div className="space-y-4">
              {/* Avg Rating Summary */}
              <div className="flex items-center gap-5 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-center shrink-0">
                  <div className="text-4xl font-extrabold text-slate-900">{avgRating}</div>
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-3.5 h-3.5 text-amber-500" fill={s <= Math.round(parseFloat(avgRating)) ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-bold">{mockReviews.length} reviews</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(star => {
                    const count = mockReviews.filter(r => r.rating === star).length;
                    const pct = (count / mockReviews.length) * 100;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-500 w-4 text-right">{star}</span>
                        <Star className="w-3 h-3 text-amber-500 shrink-0" fill="currentColor" />
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 w-4">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review Cards */}
              {mockReviews.map(rev => (
                <div key={rev.id} className="border border-slate-100 rounded-2xl p-4 bg-white">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-xs">{rev.name}</div>
                        <div className="text-[10px] text-slate-400">{rev.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className="w-3 h-3 text-amber-500" fill={s <= rev.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 text-[12px] leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="shrink-0 p-4 bg-white border-t border-slate-200 flex items-center gap-3">
          {/* Qty Selector */}
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shrink-0">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 py-2.5 font-extrabold text-slate-900 text-sm bg-white min-w-[40px] text-center">
              {qty}
            </span>
            <button
              onClick={() => setQty(q => Math.min(product.stock_quantity || 30, q + 1))}
              className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Total */}
          <div className="text-xs font-bold text-slate-500 shrink-0">
            Total: <span className="text-slate-900 font-extrabold text-sm">PKR {((product.price || 450) * qty).toLocaleString()}</span>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
              addedAnim
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 text-white'
            }`}
          >
            {addedAnim ? (
              <><CheckCircle2 className="w-4 h-4" /> Added to Basket!</>
            ) : (
              <><ShoppingBag className="w-4 h-4" /> Add {qty} to Pre-Order Basket</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
