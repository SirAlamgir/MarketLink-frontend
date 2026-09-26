import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FarmerSpotlight({ farmers, onOpenFarmerDetail }) {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const CARD_WIDTH = 288; // w-72 = 288px
  const GAP = 20;         // gap-5 = 20px

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const totalSlides = Math.max(1, farmers.length - getVisibleCount() + 1);

  const scrollToIndex = useCallback((idx) => {
    if (!trackRef.current) return;
    trackRef.current.scrollTo({ left: idx * (CARD_WIDTH + GAP), behavior: 'smooth' });
    setCurrentIndex(idx);
  }, []);

  const goPrev = () => scrollToIndex(Math.max(0, currentIndex - 1));
  const goNext = () => scrollToIndex(Math.min(totalSlides - 1, currentIndex + 1));

  // Auto-slide: left to right loop
  useEffect(() => {
    if (isHovered || isDragging || farmers.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev >= totalSlides - 1 ? 0 : prev + 1;
        if (trackRef.current) {
          trackRef.current.scrollTo({ left: next * (CARD_WIDTH + GAP), behavior: 'smooth' });
        }
        return next;
      });
    }, 2800);
    return () => clearInterval(timer);
  }, [isHovered, isDragging, totalSlides, farmers.length]);

  // Drag support
  const onMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.pageX - trackRef.current.offsetLeft;
    dragScrollLeft.current = trackRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.5;
  };
  const onMouseUp = () => setIsDragging(false);

  const onScroll = () => {
    if (!trackRef.current) return;
    const idx = Math.round(trackRef.current.scrollLeft / (CARD_WIDTH + GAP));
    setCurrentIndex(Math.min(idx, totalSlides - 1));
  };

  return (
    <section id="farmers" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-block mb-4 text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
            VERIFIED PRODUCERS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading leading-tight mt-3">
            Meet Our Farmers
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
            Get to know the passionate hands cultivating your family's food.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-xs text-slate-600 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex >= totalSlides - 1}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-xs text-slate-600 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenFarmerDetail(farmers[0])}
            className="text-xs font-extrabold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition ml-1"
          >
            <span>View All {farmers.length} Growers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slider Track */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
      >
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onScroll={onScroll}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {farmers.map((farmer) => (
            <div
              key={farmer.farmer_id}
              className="flex-shrink-0 w-72 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between group hover-card"
            >
              <div>
                <div className="relative mb-4 text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-emerald-100 shadow-md mx-auto">
                    <img
                      src={farmer.image}
                      alt={farmer.farmer_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      draggable="false"
                    />
                  </div>
                  <span className="absolute bottom-0 right-1/3 bg-emerald-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    ?
                  </span>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-extrabold text-base text-slate-900 leading-snug font-heading">{farmer.farmer_name}</h3>
                  <p className="text-[11px] font-semibold text-slate-500">{farmer.farm_name}</p>
                </div>

                <div className="flex items-center justify-center gap-1 text-amber-500 font-extrabold text-xs my-2.5">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-slate-900">{farmer.rating}</span>
                  <span className="text-slate-400 text-[11px] font-normal">({farmer.orders_count} orders)</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1 my-3">
                  {farmer.tags.map((tag, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-slate-500 text-xs text-center line-clamp-3 leading-relaxed mb-4">"{farmer.bio}"</p>
              </div>

              <button
                onClick={() => onOpenFarmerDetail(farmer)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <span>View Profile & Stock</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`transition-all rounded-full ${idx === currentIndex ? 'w-6 h-2 bg-emerald-600' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
