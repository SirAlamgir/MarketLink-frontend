import React from 'react';
import { MapPin, Navigation, ShieldCheck, Zap } from 'lucide-react';

export default function LogisticsMap({ onOpenMarketDetail }) {
  return (
    <section className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-emerald-50/70 rounded-3xl p-6 lg:p-10 border border-emerald-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column Text & Logistics Stats */}
        <div className="lg:col-span-7 space-y-6">
          
          <span className="inline-block mb-4 text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
            REAL-TIME LOGISTICS
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight mt-3">
            Direct from Malir & Thatta Belt
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
            Produce ordered through MarketLink travels an average of under 42 kilometers from harvest bed to your city pickup counter — retaining 84% higher phytonutrient levels compared to supermarket cold-storage distribution.
          </p>

          {/* Logistics Counters Grid */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">4.2h</span>
              <span className="text-[11px] text-slate-500 font-semibold">Harvest-to-Bag</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-700 font-heading">0%</span>
              <span className="text-[11px] text-slate-500 font-semibold">Chemical Sprays</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-amber-600 font-heading">53+</span>
              <span className="text-[11px] text-slate-500 font-semibold">Active Smallholders</span>
            </div>
          </div>

        </div>

        {/* Right Column Map Widget */}
        <div className="lg:col-span-5 relative">
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-900 flex items-center justify-center">
            {/* Map background image simulated */}
            <div className="absolute inset-0 bg-slate-800 opacity-90">
              <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.3" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Karachi Map Markers Overlay */}
            <div className="relative z-10 text-center space-y-3 p-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              <div className="bg-slate-900/90 text-white p-3 rounded-xl border border-slate-700 shadow-xl max-w-xs mx-auto">
                <h4 className="font-extrabold text-xs">Karachi Regional Farm Hubs</h4>
                <p className="text-[10px] text-emerald-400 mt-0.5">Clifton • Gulshan • DHA • Malir</p>
              </div>

              <span className="inline-flex items-center gap-1.5 bg-emerald-700 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow">
                <MapPin className="w-3.5 h-3.5" />
                4 Active Online Pickup Hubs
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
