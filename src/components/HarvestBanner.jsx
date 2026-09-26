import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

export default function HarvestBanner({ onReserveClick }) {
  return (
    <section className="py-8 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center shrink-0 border border-white/20">
            <Clock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-lg sm:text-xl font-heading text-white">
              Don't Miss This Sunday's Fresh Harvest
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-2xl">
              Growers pick exactly what is ordered on Saturday night. Place your produce reservation before 9:00 PM tonight to guarantee stall holds.
            </p>
          </div>
        </div>

        <button
          onClick={onReserveClick}
          className="btn-golden px-6 py-3 text-xs font-extrabold shadow-lg shrink-0 whitespace-nowrap"
        >
          <span>Reserve Produce Now</span>
        </button>

      </div>
    </section>
  );
}
