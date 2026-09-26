import React, { useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Store, ArrowRight, Leaf, Sparkles, ShieldCheck, Star } from 'lucide-react';

const STATS = [
  { val: '53+', label: 'Local Farmers' },
  { val: '4.2h', label: 'Harvest to Bag' },
  { val: '100%', label: 'Zero Chemicals' },
  { val: '4.9?', label: 'Avg Rating' },
];

export default function Hero({ searchQuery, setSearchQuery, onSearchSubmit, onOpenAiBot }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative text-white overflow-hidden" style={{ minHeight: '600px' }}>
      
      {/* Background with Parallax */}
      <div className="absolute inset-0 z-0">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img
            src="/riverbend_farm_hero.jpg"
            alt="Fresh Farm Market"
            className="w-full h-full object-cover object-center scale-110"
          />
        </div>
        {/* Layered gradient overlays for better text visibility while showing image */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-800/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-900/30" />
        {/* Subtle green tint overlay */}
        <div className="absolute inset-0 bg-emerald-950/20" />
      </div>

      {/* Animated floating orbs */}
      <div className="absolute top-10 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" style={{ animation: 'pulse 3s ease-in-out 2s infinite' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-14 pb-28 flex flex-col lg:flex-row items-start lg:items-center gap-12">
        
        {/* Left: Text Content */}
        <div className="flex-1 space-y-6 animate-fadeInScale">
          
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-xl shadow-emerald-950/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Karachi Regional Farm Network � 100% Direct Harvest</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-heading drop-shadow-2xl">
            Farm Fresh,<br />
            Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">Click Away</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed font-medium drop-shadow-lg">
            Discover local growers across Karachi, browse this week's fresh-harvested stock, and pre-order for seamless market pickup � zero wasted trips.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#markets"
              className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-7 py-3.5 text-sm font-extrabold shadow-2xl shadow-emerald-950/50 rounded-2xl flex items-center gap-2 hover:scale-105 transition-all duration-300 border border-emerald-400/20"
            >
              <Store className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Browse Markets</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={onOpenAiBot}
              className="group px-7 py-3.5 text-sm font-extrabold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-emerald-400/50 rounded-2xl transition-all duration-300 backdrop-blur-md flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <Leaf className="w-4 h-4 text-emerald-400 group-hover:animate-bounce" />
              <span>Become a Farmer</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Growers</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Star className="w-4 h-4 fill-current" />
              <span>4.9/5 Avg. Rating</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Zero Middlemen</span>
            </div>
          </div>
        </div>

        {/* Right: Floating Stats Cards */}
        <div className="hidden lg:grid grid-cols-2 gap-3 shrink-0 w-72">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-xl"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="text-2xl font-extrabold text-white font-heading">{s.val}</div>
              <div className="text-[11px] text-emerald-300 font-semibold mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Search Bar */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-4 -mb-8 pb-2">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-emerald-200/50 flex flex-col md:flex-row items-center gap-3 text-xs hover:shadow-3xl transition-shadow duration-300">
          
          <div className="w-full md:w-1/4 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-800 font-bold hover:border-emerald-300 transition">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1 truncate">
              <span className="text-[10px] text-slate-400 block font-normal">Location</span>
              <span>All Karachi Localities</span>
            </div>
          </div>

          <div className="w-full md:w-1/4 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-800 font-bold hover:border-emerald-300 transition">
            <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="flex-1 truncate">
              <span className="text-[10px] text-slate-400 block font-normal">Market Day</span>
              <span>Today / This Weekend</span>
            </div>
          </div>

          <div className="w-full md:flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-800 hover:border-emerald-400 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search: Sidr Honey, Organic Kale, Fresh Tomatoes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onSearchSubmit?.()}
              className="w-full bg-transparent focus:outline-none text-xs font-semibold text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            onClick={onSearchSubmit}
            className="w-full md:w-auto bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold px-7 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0"
          >
            <span>Find Fresh</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
