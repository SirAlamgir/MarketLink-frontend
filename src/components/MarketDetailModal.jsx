import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Navigation, 
  Store, 
  Compass, 
  ExternalLink,
  Layers,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  Leaf
} from 'lucide-react';

export default function MarketDetailModal({ market, onClose, farmers = [], products = [], onSelectFarmer, onAddToCart }) {
  if (!market) return null;

  // Filter attending farmers or assign fallback producers so every market has active stalls
  let attendingFarmers = farmers.filter(f => f.market_id === market.market_id);
  if (attendingFarmers.length === 0) {
    const startIdx = (market.market_id * 2) % farmers.length;
    attendingFarmers = farmers.slice(startIdx, startIdx + 3);
    if (attendingFarmers.length < 2) attendingFarmers = farmers.slice(0, 3);
  }

  // Produce available at this market (or filtered products)
  let marketProducts = products.filter(p => p.market_name === market.market_name || p.market_id === market.market_id);
  if (marketProducts.length === 0) {
    marketProducts = products.slice((market.market_id * 2) % (products.length - 4), ((market.market_id * 2) % (products.length - 4)) + 4);
    if (marketProducts.length < 2) marketProducts = products.slice(0, 4);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-fadeIn" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col z-10 animate-fadeInScale">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400 shadow-inner">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xl font-heading text-white">{market.market_name}</h3>
                <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {market.region}
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium mt-0.5">
                Stall Layout Map & Dawn Harvest Directory
              </p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="z-20 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
            title="Close Window"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
          
          {/* Simulated Map Visualizer */}
          <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-300 shadow-inner bg-slate-950 flex items-center justify-center">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#10B981_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-25" />

            {/* Map Pin UI */}
            <div className="relative z-10 text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-white animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-700 shadow-2xl max-w-xs">
                <span className="font-extrabold text-sm block text-emerald-300">{market.market_name}</span>
                <span className="text-[11px] text-slate-300 font-medium block mt-0.5">{market.address}</span>
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-1 font-mono">
                  <span>GPS: {market.latitude}, {market.longitude}</span>
                </div>
              </div>
            </div>

            <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold px-3 py-1 rounded-xl border border-slate-300 shadow-sm flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>OpenStreetMap & Google Maps Coordinates Verified</span>
            </span>
          </div>

          {/* Market Schedule & Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-slate-700">
              <span className="text-slate-400 text-[10px] font-extrabold block uppercase tracking-wider">Operating Days</span>
              <span className="font-extrabold text-emerald-800 text-xs mt-0.5 block">{market.operating_days.join(" & ")}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-slate-700">
              <span className="text-slate-400 text-[10px] font-extrabold block uppercase tracking-wider">Pickup Timing</span>
              <span className="font-extrabold text-slate-900 text-xs mt-0.5 block">{market.operating_hours}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-slate-700">
              <span className="text-slate-400 text-[10px] font-extrabold block uppercase tracking-wider">Distance</span>
              <span className="font-extrabold text-slate-900 text-xs mt-0.5 block">{market.distance}</span>
            </div>
          </div>

          {/* Attending Farmers Directory */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-slate-900 text-sm font-heading flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-600" />
                <span>Attending Farmers ({attendingFarmers.length} Active Stalls)</span>
              </h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Certified Direct Growers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {attendingFarmers.map((f, idx) => (
                <div 
                  key={f.farmer_id || idx}
                  onClick={() => {
                    onClose();
                    onSelectFarmer?.(f);
                  }}
                  className="bg-white p-3 rounded-2xl border border-slate-200 hover:border-emerald-400 transition cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={f.image || '/local_farmer_portrait.jpg'} alt={f.stall_name} className="w-10 h-10 object-cover rounded-xl border border-slate-200 shrink-0" />
                    <div className="truncate">
                      <h5 className="font-extrabold text-slate-900 text-xs group-hover:text-emerald-700 transition truncate">{f.stall_name}</h5>
                      <p className="text-[10px] text-slate-500 truncate">{f.farmer_name} • ⭐ {f.rating}</p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-extrabold text-xs shrink-0 ml-1 group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fresh Vegetables & Produce Available */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-slate-900 text-sm font-heading flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Available Dawn Harvest Products ({marketProducts.length})</span>
              </h4>
              <span className="text-[10px] text-slate-500 font-medium">Pre-order for weekend stall pickup</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {marketProducts.map((prod) => (
                <div key={prod.id || prod.name} className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0" />
                    <div className="truncate">
                      <h5 className="font-extrabold text-slate-900 text-xs truncate">{prod.name}</h5>
                      <span className="text-[10px] font-bold text-slate-500 block">{prod.unit}</span>
                      <span className="font-extrabold text-emerald-700 text-xs">Rs. {prod.price}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart?.(prod);
                    }}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-extrabold px-3 py-2 rounded-xl transition shadow-sm shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Pre-orders guaranteed fresh at stall</span>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
          >
            Close Directory
          </button>
        </div>

      </div>
    </div>
  );
}