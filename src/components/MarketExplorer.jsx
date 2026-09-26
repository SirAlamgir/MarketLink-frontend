import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Store, 
  ChevronRight,
  Navigation
} from 'lucide-react';

export default function MarketExplorer({ markets, selectedMarket, onSelectMarket, onOpenMarketDetail }) {
  const [activeRegion, setActiveRegion] = useState("All Karachi");

  const filteredMarkets = activeRegion === "All Karachi" 
    ? markets 
    : markets.filter(m => m.region === activeRegion);

  return (
    <section id="markets" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-block mb-4 text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
            ACTIVE SCHEDULES
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading leading-tight mt-3">
            This Week's Markets
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
            Reserve before the weekend cut-off windows lock in for field picking.
          </p>
        </div>

        {/* Region Filter Tabs matching screenshot */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          {["All Karachi", "Clifton & South", "Gulshan & East", "Malir Agricultural"].map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeRegion === region 
                  ? 'bg-emerald-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredMarkets.map((market) => (
          <div
            key={market.market_id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:border-emerald-400 flex flex-col justify-between group hover-card"
          >
            <div>
              {/* Market Image with Badge */}
              <div className="relative h-40 overflow-hidden bg-slate-100">
                <img 
                  src={market.image} 
                  alt={market.market_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <span className={`absolute top-2.5 left-2.5 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow ${market.badge_color || 'bg-emerald-700'}`}>
                  {market.badge}
                </span>

                <span className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {market.attending_farmers} Local Farmers
                </span>
              </div>

              {/* Specs */}
              <div className="p-4 space-y-2 text-xs">
                <h3 className="font-extrabold text-base text-slate-900 leading-tight font-heading group-hover:text-emerald-700 transition">
                  {market.market_name}
                </h3>

                <div className="flex items-start gap-1.5 text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="truncate">{market.address}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{market.operating_days.join(", ")} • {market.operating_hours}</span>
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                {market.status}
              </span>

              <button
                onClick={() => onOpenMarketDetail(market)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg cursor-pointer transition"
              >
                Browse Stalls
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
