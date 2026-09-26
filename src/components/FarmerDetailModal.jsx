import React from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Award, 
  Phone, 
  Mail, 
  ShoppingBag, 
  CheckCircle,
  Plus
} from 'lucide-react';

export default function FarmerDetailModal({ 
  farmer, 
  onClose, 
  products, 
  onAddToCart 
}) {
  if (!farmer) return null;

  const farmerProducts = products.filter(p => p.farmer_id === farmer.farmer_id);

  return (
    <div className="modal-overlay">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header with Background Image */}
        <div className="relative h-44 bg-slate-900">
          <img 
            src={farmer.image} 
            alt={farmer.stall_name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Farmer Stall Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                  {farmer.stall_location}
                </span>
                {farmer.certified_organic && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Organic Certified
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-extrabold font-heading mt-1">{farmer.stall_name}</h2>
              <p className="text-xs text-emerald-200 font-medium">Lead Producer: {farmer.farmer_name}</p>
            </div>

            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl text-amber-300 font-extrabold text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>{farmer.rating}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Bio & Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900 text-sm">About the Farm</h4>
              <p className="text-slate-600 leading-relaxed font-normal">"{farmer.bio}"</p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2 text-slate-700 font-medium">
              <h4 className="font-extrabold text-emerald-950 text-sm">Stall Info & Contacts</h4>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Market: {farmer.market_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Contact: {farmer.contact_number}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Email: {farmer.email}</span>
              </div>
            </div>
          </div>

          {/* Weekly Produce Inventory Section */}
          <div>
            <h4 className="font-extrabold text-slate-900 text-base mb-3 font-heading">
              Current Weekly Stall Stock ({farmerProducts.length} items listed)
            </h4>

            {farmerProducts.length === 0 ? (
              <p className="text-slate-400 italic">No products listed currently for this stall.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {farmerProducts.map((p) => (
                  <div key={p.product_id} className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl border border-slate-200" />
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs font-heading">{p.name}</h5>
                        <span className="text-emerald-700 font-extrabold text-xs">${p.price.toFixed(2)} {p.unit}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(p, 1)}
                      className="btn-primary p-2 text-xs rounded-xl"
                      title="Pre-Order 1 unit"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button onClick={onClose} className="btn-secondary text-xs px-5 py-2">
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}
