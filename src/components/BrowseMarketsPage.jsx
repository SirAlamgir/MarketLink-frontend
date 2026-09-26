import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Calendar, 
  Clock, 
  Store, 
  Star, 
  Filter, 
  Navigation, 
  CheckCircle, 
  Layers, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Grid,
  Map as MapIcon,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  Truck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Heart
} from 'lucide-react';

export default function BrowseMarketsPage({ 
  markets, 
  selectedMarket, 
  onSelectMarket, 
  onOpenMarketDetail,
  onOpenFarmerDetail,
  farmers
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedDay, setSelectedDay] = useState('All Days');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [activeMapMarket, setActiveMapMarket] = useState(markets[0] || null);
  const [openFaq, setOpenFaq] = useState(null);

  // Regions list
  const regions = ["All Regions", "Clifton & South", "Gulshan & East", "Malir Agricultural", "North Nazimabad", "PECHS & Central"];
  const days = ["All Days", "Sundays", "Wednesdays", "Saturdays", "Fridays", "Thursdays"];

  // Filter & Sort Logic
  const filteredMarkets = markets.filter(market => {
    if (selectedRegion !== 'All Regions' && market.region !== selectedRegion) {
      return false;
    }
    if (selectedDay !== 'All Days' && !market.operating_days.some(d => d.toLowerCase().includes(selectedDay.toLowerCase()))) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = market.market_name.toLowerCase().includes(q);
      const matchAddr = market.address.toLowerCase().includes(q);
      const matchRegion = market.region.toLowerCase().includes(q);
      if (!matchName && !matchAddr && !matchRegion) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'farmers') return b.attending_farmers - a.attending_farmers;
    if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    return b.rating - a.rating;
  });

  const marketFaqs = [
    {
      q: "How does the MarketLink pre-order pickup process work at the stalls?",
      a: "Once you place a pre-order on MarketLink, the attending farmer receives your reservation and harvests the produce at dawn. When you arrive at the designated market location, simply show your Order ID or phone number at the farmer's stall. Your items will be pre-weighed and packed in your reserved crate."
    },
    {
      q: "What are the pre-order cut-off times for weekend markets?",
      a: "According to SRS guidelines, weekly pre-orders close 24 hours prior to the market day (usually Saturday at 10:00 PM for Sunday markets). This ensures farmers have sufficient notice to pick, wash, and transport dawn-fresh harvests."
    },
    {
      q: "Can I still buy produce if I did not pre-order online?",
      a: "Yes! All verified markets welcome walk-in visitors for general stall browsing. However, popular limited items like raw Sidr honey, heirloom tomatoes, and organic baby greens often sell out within the first two hours. Pre-ordering guarantees your quota."
    },
    {
      q: "What payment methods are supported at pickup stalls?",
      a: "Payment is settled in-person directly with the farmer. All stalls accept Cash (PKR), while over 85% also accept instant QR payments via JazzCash and EasyPaisa. There are zero online gateway surcharges."
    },
    {
      q: "Are the stall locations accurate on the map?",
      a: "Yes. All market locations and individual farmer stall coordinates are pinned using OpenStreetMap and Google Maps API data, including parking entry gates and express pickup counter zones."
    }
  ];

  return (
    <div className="space-y-12 pb-20 animate-fadeIn">
      
      {/* 1. Page Header Banner */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white py-14 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="browse-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22c55e" strokeWidth="0.8" opacity="0.4" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#browse-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>OpenStreetMap & Google Maps Integrated Directory</span>
          </div>

          {/* Heading with green shade on 'Markets' */}
          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading drop-shadow-sm"
            style={{ color: '#ffffff' }}
          >
            Browse Farmers <span className="text-emerald-400">Markets</span>
          </h1>

          <p className="text-slate-200 text-sm max-w-2xl font-normal leading-relaxed">
            Discover verified local farmers markets across Karachi. Check operating schedules, explore stall maps, view attending producers, and reserve fresh harvests for weekend pickup.
          </p>

          {/* Search & Filter Header Control Card */}
          <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-2xl border border-emerald-200/90 space-y-3 mt-4">
            
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search market name, address, Clifton, Gulshan, Malir..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 border border-slate-200"
                />
              </div>

              {/* Day filter */}
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full md:w-44 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d === 'All Days' ? 'All Operating Days' : d}</option>
                ))}
              </select>

              {/* Sort by */}
              <div className="w-full md:w-48 flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-emerald-800 font-extrabold focus:outline-none cursor-pointer flex-1"
                >
                  <option value="rating">Top Rated</option>
                  <option value="farmers">Most Farmers</option>
                  <option value="distance">Nearest Distance</option>
                </select>
              </div>

              {/* Grid / Map View Mode Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 shrink-0 w-full md:w-auto justify-center border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'grid' 
                      ? 'bg-emerald-700 text-white shadow-xs' 
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Grid Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'map' 
                      ? 'bg-emerald-700 text-white shadow-xs' 
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Map View</span>
                </button>
              </div>

            </div>

            {/* Region Tabs Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar">
              <span className="text-[11px] font-bold text-slate-500 shrink-0">Region:</span>
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition shrink-0 border cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Main Markets Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        
        {/* Results Count Summary Bar */}
        <div className="flex items-center justify-between py-2 border-b border-slate-200 text-xs text-slate-600 font-bold">
          <span>Showing <span className="text-emerald-700 font-extrabold">{filteredMarkets.length}</span> Verified Farmers Markets</span>
          <span className="hidden sm:inline-block text-slate-400">All market stalls verified for zero-middleman pricing</span>
        </div>

        {/* View Mode: Interactive Simulated Map */}
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Map Interactive Frame */}
              <div className="lg:col-span-8 bg-slate-900 rounded-3xl overflow-hidden border border-slate-300 shadow-xl min-h-[480px] relative flex flex-col justify-between p-6">
                
                {/* Simulated Map Canvas Background */}
                <div className="absolute inset-0 bg-slate-950 opacity-90">
                  <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="map-grid-view" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#22c55e" strokeWidth="0.6" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#map-grid-view)" />
                  </svg>
                </div>

                {/* Top Overlay Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-slate-900/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Karachi Regional Map Pinning</span>
                  </span>

                  {activeMapMarket && (
                    <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow">
                      Active Pickup Hub: {activeMapMarket.market_name}
                    </span>
                  )}
                </div>

                {/* Map Pin Markers */}
                <div className="relative z-10 my-auto py-12 flex flex-wrap items-center justify-center gap-6">
                  {filteredMarkets.map((m) => {
                    const isSelected = activeMapMarket && activeMapMarket.market_id === m.market_id;

                    return (
                      <button
                        key={m.market_id}
                        onClick={() => setActiveMapMarket(m)}
                        className={`transition-all transform hover:scale-110 flex flex-col items-center group cursor-pointer ${
                          isSelected ? 'scale-115 z-20' : 'opacity-85'
                        }`}
                      >
                        <div className={`p-2.5 rounded-full shadow-2xl border-2 flex items-center justify-center transition ${
                          isSelected 
                            ? 'bg-emerald-500 text-white border-white ring-4 ring-emerald-400/50 animate-bounce' 
                            : 'bg-emerald-700 text-white border-white'
                        }`}>
                          <MapPin className="w-5 h-5" />
                        </div>
                        <span className="bg-slate-900/90 text-white text-[10px] font-extrabold px-2 py-0.5 rounded mt-1 shadow border border-slate-700 whitespace-nowrap">
                          {m.market_name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Selected Market Info Popup Bar */}
                {activeMapMarket && (
                  <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-emerald-200 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <img src={activeMapMarket.image} alt={activeMapMarket.market_name} className="w-12 h-12 object-cover rounded-xl border border-slate-200" />
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 font-heading">{activeMapMarket.market_name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{activeMapMarket.address} â€¢ {activeMapMarket.distance}</p>
                        <span className="text-[10px] font-bold text-emerald-700">{activeMapMarket.operating_days.join(" & ")} ({activeMapMarket.operating_hours})</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenMarketDetail(activeMapMarket)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition whitespace-nowrap shadow-sm cursor-pointer"
                    >
                      View Stall Directory
                    </button>
                  </div>
                )}

              </div>

              {/* Side Market Quick List */}
              <div className="lg:col-span-4 space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900 font-heading">Click Market to Focus on Map:</h3>
                <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
                  {filteredMarkets.map(m => (
                    <div
                      key={m.market_id}
                      onClick={() => setActiveMapMarket(m)}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                        activeMapMarket && activeMapMarket.market_id === m.market_id
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-900">{m.market_name}</h4>
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          â˜… {m.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{m.region} â€¢ {m.distance}</p>
                      <div className="mt-2 text-[10px] font-bold text-emerald-800 flex items-center justify-between">
                        <span>{m.attending_farmers} Local Farmers</span>
                        <span className="text-emerald-700 font-extrabold">Select â†’</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* View Mode: Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => {
              const isCurrentActive = selectedMarket && selectedMarket.market_id === market.market_id;

              return (
                <div
                  key={market.market_id}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group shadow-sm hover-card-3d ${
                    isCurrentActive
                      ? 'ring-2 ring-emerald-600 border-emerald-500 shadow-xl'
                      : 'border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  <div>
                    {/* Market Cover Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img 
                        src={market.image} 
                        alt={market.market_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <span className={`absolute top-3 left-3 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow ${market.badge_color || 'bg-emerald-700'}`}>
                        {market.badge}
                      </span>

                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-emerald-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-emerald-600" />
                        {market.distance}
                      </span>

                      {/* Title overlay */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="font-extrabold text-lg leading-snug font-heading drop-shadow-sm">
                          {market.market_name}
                        </h3>
                        <span className="text-xs text-emerald-300 font-semibold">{market.region}</span>
                      </div>
                    </div>

                    {/* Specs Details */}
                    <div className="p-5 space-y-3.5 text-xs">
                      
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1 text-emerald-600 font-extrabold">
                          <Star className="w-4 h-4 fill-current text-emerald-500" />
                          <span className="text-slate-900 text-sm font-bold">{market.rating}</span>
                          <span className="text-slate-400 text-[11px] font-normal">({market.reviews_count} reviews)</span>
                        </div>

                        <span className="bg-emerald-50 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border border-emerald-200">
                          {market.attending_farmers} Farmers Present
                        </span>
                      </div>

                      <div className="space-y-1.5 text-slate-600 font-medium">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{market.address}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-bold text-slate-800">{market.operating_days.join(" & ")} ({market.operating_hours})</span>
                        </div>
                      </div>

                      {/* Market Description */}
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                        "{market.description}"
                      </p>

                      {/* Facilities Pills */}
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-400 block uppercase mb-1">Stall Facilities & Perks:</span>
                        <div className="flex flex-wrap gap-1">
                          {market.facilities.map((fac, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                              {fac}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Available Time Slots */}
                      <div className="pt-1">
                        <span className="text-[10px] font-extrabold text-slate-400 block uppercase mb-1">Pre-Order Pickup Slots:</span>
                        <div className="flex flex-wrap gap-1">
                          {market.pickup_slots.map((slot, idx) => (
                            <span key={idx} className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectMarket(market)}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1 cursor-pointer ${
                        isCurrentActive
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                      }`}
                    >
                      {isCurrentActive ? 'âœ“ Selected Pickup Market' : 'Select Market'}
                    </button>

                    <button
                      onClick={() => onOpenMarketDetail(market)}
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      title="View Stall Directory & Map"
                    >
                      <span>Stalls</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* 3. SRS 1.2 & 1.6: HOW PRE-ORDERS & PICKUP WORK AT THE MARKET */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-8 lg:p-10 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              SRS SECTION 1.6 â€¢ MARKET PICKUP PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              How Market Pickups Work
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              Three simple steps to ensure you get authentic farm-fresh goods without the hassle of long bazaar queues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg font-heading">
                01
              </div>
              <h3 className="font-extrabold text-base text-slate-900 font-heading">Select Market & Time Slot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your nearest market venue across Clifton, Gulshan, Malir, or PECHS and pick a morning express pickup window (e.g. 08:30 â€“ 09:30 AM).
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg font-heading">
                02
              </div>
              <h3 className="font-extrabold text-base text-slate-900 font-heading">Reserve Ahead of Cutoff</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reserve your seasonal greens, raw goat milk, and Sidr honey before the weekly 10:00 PM pre-order freeze so growers harvest exact quantities at dawn.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg font-heading">
                03
              </div>
              <h3 className="font-extrabold text-base text-slate-900 font-heading">Fast-Track Stall Pickup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Skip the regular crowd. Head straight to the farmer's stall, inspect your pre-weighed crate, and settle payment via Cash, JazzCash, or EasyPaisa.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SRS 1.6 & 1.10: VISITOR GUIDELINES & BEST PRACTICES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                SRS SECTION 1.10 â€¢ VISITOR GUIDELINES
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-2">
                Market Day Etiquette & Tips
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Eco-friendly community standards</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Bring Reusable Bags (BYOB)</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Support zero-plastic community guidelines by bringing jute or cloth bags for heavy root vegetables.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Arrive in Pickup Window</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Stalls keep pre-orders safely reserved until 30 minutes before market closing, after which uncollected stock may be released.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero Online Markups</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Prices shown on MarketLink are 100% genuine farm-gate rates. No hidden convenience fees or gateway charges.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <Truck className="w-4 h-4 shrink-0" />
                <span>Designated Parking</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Every verified market venue has free or dedicated community parking with accessible ramps for strollers and wheelchairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQS FOR MARKET SHOPPERS */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
            COMMON QUESTIONS
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
            Farmers Markets FAQ
          </h3>
          <p className="text-xs text-slate-500">
            Answers to frequent questions about market locations, order confirmations, and payments.
          </p>
        </div>

        <div className="space-y-3">
          {marketFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;

            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4.5 flex items-center justify-between gap-4 font-extrabold text-xs text-slate-800 hover:text-emerald-700 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CALL TO ACTION FOR FARMERS & ORGANIZERS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-8 lg:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-600/40">
              GROWER COLLABORATION
            </span>
            <h3 
              className="text-2xl sm:text-3xl font-extrabold text-white font-heading"
              style={{ color: '#ffffff' }}
            >
              Organize or Join a Farmers Market
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl font-normal">
              Are you a regional agricultural grower in Sindh or an urban community market organizer? Connect with our team to list your venue on MarketLink.
            </p>
          </div>

          <button
            onClick={() => onSelectMarket(markets[0])}
            className="bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition text-xs whitespace-nowrap cursor-pointer shrink-0"
          >
            Explore Market Stalls Now â†’
          </button>
        </div>
      </section>

    </div>
  );
}
