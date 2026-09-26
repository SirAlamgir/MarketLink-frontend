import React from 'react';
import { Leaf, ShieldCheck, MapPin, Clock, Users, ShoppingBag, Store, CheckCircle2, Award, Sparkles, Mail, Phone, ArrowRight, Zap, Globe, Heart, TrendingUp, Cpu, Lock, Compass, Check, XCircle, HelpCircle } from 'lucide-react';

export default function AboutUsPage({ onNavigate, onOpenAiBot }) {
  const teamMembers = [
    { name: 'Tariq Mahmood', role: 'Founder & Lead System Architect', qualification: 'M.Sc. Enterprise Software, 12+ yrs experience', bio: 'Conceived MarketLink to solve food waste and supply opacity across local agricultural markets. Architect of the 3-tier web platform.', avatar: 'TM', badge: 'Architecture & Strategy' },
    { name: 'Dr. Fatima Al-Zahra', role: 'Head of Agronomy & Farm Verification', qualification: 'Ph.D. Sustainable Agriculture (UAF)', bio: 'Oversees physical grower credentialing, organic soil testing verification, and regional grower compliance across regional farm belts.', avatar: 'FA', badge: 'Quality & Certification' },
    { name: 'Hamza Bilal', role: 'Chief of Market Logistics & Geo-Ops', qualification: 'B.S. Supply Chain Management', bio: 'Coordinates ground operations at Karachi weekend market hubs, ensuring express pickup stall points run smoothly every week.', avatar: 'HB', badge: 'On-Ground Operations' },
    { name: 'Ayesha Noor', role: 'Community & Customer Experience Lead', qualification: 'B.A. Public Communications', bio: 'Champions customer satisfaction, pre-order assistance, and vendor onboarding support with an average response time of under 4 hours.', avatar: 'AN', badge: 'Customer Relations' }
  ];

  const milestones = [
    { year: 'Phase 1 - Problem Identification', title: 'Chalkboard Inefficiencies & Crop Spoilage', desc: 'Smallholder farmers in Malir & Hub suffered up to 35% produce loss due to unpredictable attendance and lack of advance pre-ordering channels.' },
    { year: 'Phase 2 - eGreen Basket Vision', title: 'Architecting MarketLink', desc: 'Formulated the comprehensive specifications covering 3 distinct user roles, real-time inventory, and interactive stall coordinate mapping.' },
    { year: 'Phase 3 - Pilot Launch in Clifton & DHA', title: 'First 15 Verified Growers', desc: 'Deployed the web platform with 15 direct organic farms, recording over 1,200 pre-orders and zero missed pickup reservations.' },
    { year: 'Phase 4 - City-Wide Network', title: '53+ Growers & 9 Regional Hubs', desc: 'Expanded across Clifton, Gulshan, Malir, North Nazimabad, PECHS, and Bahria with 24/7 MarketBot AI assistant and instant basket checkout.' }
  ];

  return (
    <div className='space-y-16 pb-20 animate-fadeIn'>
      <section className='bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white py-18 px-4 lg:px-8 relative overflow-hidden'>
        <div className='max-w-4xl mx-auto relative z-10 space-y-5 text-center'>
          <div className='inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2'>
            <Leaf className='w-3.5 h-3.5 text-emerald-400' />
            <span>Direct Farm-to-Table Marketplace Platform</span>
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight drop-shadow-md'>
            Empowering Local Farmers, <br className='hidden sm:inline' />
            <span className='text-emerald-400'>Elevating Farm-Fresh Goodness</span>
          </h1>
          <p className='text-slate-200 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm pt-1'>
            MarketLink bridges local agricultural producers with health-conscious urban communities. Eliminating wasted market trips, enabling pre-orders directly from the soil, and cutting out exploitative middlemen.
          </p>
          <div className='pt-4 flex flex-wrap items-center justify-center gap-4'>
            <button onClick={() => onNavigate('browse-markets')} className='btn-golden px-6 py-3 text-xs font-extrabold shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform'>
              <Store className='w-4 h-4' /><span>Explore Verified Markets</span>
            </button>
            <button onClick={onOpenAiBot} className='px-6 py-3 text-xs font-extrabold text-white border border-white/40 hover:bg-white/10 rounded-xl transition flex items-center gap-2 cursor-pointer hover:scale-105'>
              <Sparkles className='w-4 h-4 text-amber-300' /><span>Ask MarketBot AI</span>
            </button>
          </div>
        </div>
      </section>
      {/* 2. OUR PURPOSE & MISSION */}
      <section className='max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-4'>
        <div className='lg:col-span-6 relative'>
          <div className='relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover-card-3d'>
            <img src='/about_farm_team.jpg' alt='MarketLink Organic Farm Producers Team' className='w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700' />
            <div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent' />
            <div className='absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-emerald-200 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold'><ShieldCheck className='w-6 h-6' /></div>
                <div><h4 className='font-extrabold text-slate-900 text-xs font-heading'>100% Direct Smallholder Network</h4><p className='text-[11px] text-slate-500'>Zero Middleman Markups & Fair Farm Gate Pricing</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:col-span-6 space-y-5'>
          <div><span className='text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-block mb-3'>OUR PURPOSE & MISSION</span>
          <h2 className='text-3xl font-extrabold text-slate-900 font-heading leading-tight'>Bridging the Disconnect Between Soil & City Kitchens</h2></div>
          <p className='text-slate-600 text-xs sm:text-sm leading-relaxed font-normal'>Local farmers markets are growing rapidly as shoppers seek fresh, seasonal, and pesticide-free produce. However, historically, availability was communicated only through chalkboards, paper flyers, or word-of-mouth.</p>
          <p className='text-slate-600 text-xs sm:text-sm leading-relaxed font-normal'>Shoppers frequently arrived to find staple greens already sold out, or made long trips across Karachi only to find a grower absent. Farmers, conversely, had no mechanism to announce weekly yields or receive advance reservations, leading to heartbreaking post-harvest spoilage.</p>
          <p className='text-slate-600 text-xs sm:text-sm leading-relaxed font-normal'><strong>MarketLink transforms this dynamic</strong> by unifying inventory visibility, advance pre-orders, and geolocation stall mapping into one streamlined, community-powered hub.</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2'>
            <div className='bg-slate-50/90 hover:bg-emerald-50/50 p-4 rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-sm transition hover-card-3d'>
              <span className='font-extrabold text-emerald-900 text-xs block mb-1'>For Customers:</span>
              <span className='text-[11px] text-slate-600 leading-relaxed block'>Guaranteed fresh produce reservation, verified certifications, zero wasted market trips, and live stall navigation.</span>
            </div>
            <div className='bg-slate-50/90 hover:bg-amber-50/50 p-4 rounded-2xl border border-slate-200/90 hover:border-amber-300 shadow-sm transition hover-card-3d'>
              <span className='font-extrabold text-amber-900 text-xs block mb-1'>For Farmers:</span>
              <span className='text-[11px] text-slate-600 leading-relaxed block'>Accurate demand forecasting, reduced unsold crop waste, recurring customer relationships, and fair profit retention.</span>
            </div>
          </div>
        </div>
      </section>
      {/* 3. PLATFORM IMPACT METRICS */}
      <section className='bg-slate-900 text-white py-12 px-4 lg:px-8 border-y border-slate-800'>
        <div className='max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center'>
          <div className='p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover-card-3d transition-all duration-300'>
            <span className='text-3xl sm:text-4xl font-extrabold text-emerald-400 font-heading block'>53+</span>
            <span className='text-xs text-slate-300 font-semibold mt-1 block'>Registered Regional Growers</span>
            <span className='text-[10px] text-slate-400 mt-0.5 block'>100% credential verified</span>
          </div>
          <div className='p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover-card-3d transition-all duration-300'>
            <span className='text-3xl sm:text-4xl font-extrabold text-amber-400 font-heading block'>9</span>
            <span className='text-xs text-slate-300 font-semibold mt-1 block'>Verified City Market Hubs</span>
            <span className='text-[10px] text-slate-400 mt-0.5 block'>Clifton, Gulshan, Malir, PECHS & more</span>
          </div>
          <div className='p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover-card-3d transition-all duration-300'>
            <span className='text-3xl sm:text-4xl font-extrabold text-emerald-400 font-heading block'>&lt; 4.2h</span>
            <span className='text-xs text-slate-300 font-semibold mt-1 block'>Average Harvest-to-Bag Speed</span>
            <span className='text-[10px] text-slate-400 mt-0.5 block'>Picked at dawn, packed by morning</span>
          </div>
          <div className='p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover-card-3d transition-all duration-300'>
            <span className='text-3xl sm:text-4xl font-extrabold text-amber-400 font-heading block'>0%</span>
            <span className='text-xs text-slate-300 font-semibold mt-1 block'>Digital Checkout Surcharges</span>
            <span className='text-[10px] text-slate-400 mt-0.5 block'>Pay-at-stall in-person transparency</span>
          </div>
        </div>
      </section>

      {/* 4. SOLUTION COMPARISON */}
      <section className='max-w-7xl mx-auto px-4 lg:px-8 space-y-6'>
        <div className='text-center max-w-2xl mx-auto space-y-2'>
          <span className='text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-block mb-2'>SOLUTION COMPARISON</span>
          <h2 className='text-3xl font-extrabold text-slate-900 font-heading'>How MarketLink Revolutionizes Local Agriculture</h2>
          <p className='text-slate-600 text-xs sm:text-sm font-medium'>Comparing conventional weekend bazaar hurdles against our transparent digital pre-order workflow.</p>
        </div>
        <div className='bg-slate-50/80 rounded-3xl border border-slate-200/90 shadow-md overflow-hidden hover-card-3d'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-xs border-collapse'>
              <thead>
                <tr className='bg-slate-100/90 border-b border-slate-200 text-slate-700'>
                  <th className='py-4 px-6 font-extrabold text-sm font-heading'>Feature / Scenario</th>
                  <th className='py-4 px-6 font-extrabold text-red-600 bg-red-50/60'>Traditional Farmers Market</th>
                  <th className='py-4 px-6 font-extrabold text-emerald-800 bg-emerald-100/70'>MarketLink Solution</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200/60 bg-white'>
                <tr><td className='py-3.5 px-6 font-bold text-slate-800'>Stock & Availability</td><td className='py-3.5 px-6 text-slate-500'>Uncertain. Chalkboards or word of mouth; popular items sell out early.</td><td className='py-3.5 px-6 font-semibold text-emerald-900 bg-emerald-50/40'>Live digital inventory updated weekly with exact kilogram quotas.</td></tr>
                <tr><td className='py-3.5 px-6 font-bold text-slate-800'>Item Reservation</td><td className='py-3.5 px-6 text-slate-500'>None. First-come, first-served queues often resulting in wasted trips.</td><td className='py-3.5 px-6 font-semibold text-emerald-900 bg-emerald-50/40'>1-click pre-order basket with chosen pickup window reservation.</td></tr>
                <tr><td className='py-3.5 px-6 font-bold text-slate-800'>Harvest Planning</td><td className='py-3.5 px-6 text-slate-500'>Guesswork. Farmers bring arbitrary quantities, yielding high unsold waste.</td><td className='py-3.5 px-6 font-semibold text-emerald-900 bg-emerald-50/40'>Guaranteed order quotas let farmers harvest precisely what is booked.</td></tr>
                <tr><td className='py-3.5 px-6 font-bold text-slate-800'>Stall Location & Navigation</td><td className='py-3.5 px-6 text-slate-500'>Crowded bazaar disorientation; stalls frequently shift locations.</td><td className='py-3.5 px-6 font-semibold text-emerald-900 bg-emerald-50/40'>OpenStreetMap & Google Maps coordinates with pinpoint stall markers.</td></tr>
                <tr><td className='py-3.5 px-6 font-bold text-slate-800'>Payment & Settlement</td><td className='py-3.5 px-6 text-slate-500'>Unregulated prices with unexpected cash shortages.</td><td className='py-3.5 px-6 font-semibold text-emerald-900 bg-emerald-50/40'>Transparent farm-gate price guarantee, paid at stall (Cash / JazzCash).</td></tr>
                <tr><td className='py-3.5 px-6 font-bold text-slate-800'>Query Support</td><td className='py-3.5 px-6 text-slate-500'>No support outside bazaar operating hours.</td><td className='py-3.5 px-6 font-semibold text-emerald-900 bg-emerald-50/40'>24/7 MarketBot AI assistant answering timings, recipes & certifications.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. 3-TIER ECOSYSTEM */}
      <section className='max-w-7xl mx-auto px-4 lg:px-8 space-y-8'>
        <div className='text-center max-w-2xl mx-auto space-y-2'>
          <span className='text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-block mb-2'>3-TIER ECOSYSTEM</span>
          <h2 className='text-3xl font-extrabold text-slate-900 font-heading'>Dedicated Portals Across 3 Ecosystem Roles</h2>
          <p className='text-slate-600 text-xs sm:text-sm font-medium'>MarketLink serves three distinct stakeholder personas with tailored tools and dedicated workflows.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-slate-50/80 hover:bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md hover-card-3d transition-all duration-300 space-y-4'>
            <div className='w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold'><ShoppingBag className='w-6 h-6' /></div>
            <div><span className='bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase'>Role 1 • Shopper</span><h3 className='text-xl font-extrabold text-slate-900 mt-1.5 font-heading'>Customer Portal</h3></div>
            <ul className='text-xs text-slate-600 space-y-2.5 font-medium'>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0 mt-0.5' /><span>Browse nearby markets by location, operating days & timings</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0 mt-0.5' /><span>Filter organic vegetables, raw honey, artisanal dairy & herbs</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0 mt-0.5' /><span>Reserve pre-order crates with designated express pickup slots</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0 mt-0.5' /><span>View verified grower credentials & read peer customer reviews</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-emerald-600 shrink-0 mt-0.5' /><span>OpenStreetMap & Google Maps stall navigation</span></li>
            </ul>
          </div>
          <div className='bg-slate-50/80 hover:bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md hover-card-3d transition-all duration-300 space-y-4'>
            <div className='w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold'><Store className='w-6 h-6' /></div>
            <div><span className='bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase'>Role 2 • Producer</span><h3 className='text-xl font-extrabold text-slate-900 mt-1.5 font-heading'>Farmer Stall Portal</h3></div>
            <ul className='text-xs text-slate-600 space-y-2.5 font-medium'>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-amber-600 shrink-0 mt-0.5' /><span>Register stall name, geo-coordinates, and operating schedules</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-amber-600 shrink-0 mt-0.5' /><span>Manage weekly harvest quotas, price per kg, and batch sizes</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-amber-600 shrink-0 mt-0.5' /><span>Accept or modify incoming pre-orders & set Friday cut-off times</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-amber-600 shrink-0 mt-0.5' /><span>Mark items as sold out or active with live inventory sync</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-amber-600 shrink-0 mt-0.5' /><span>Access verified grower credential badges and reviews</span></li>
            </ul>
          </div>
          <div className='bg-slate-50/80 hover:bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md hover-card-3d transition-all duration-300 space-y-4'>
            <div className='w-12 h-12 rounded-2xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold'><ShieldCheck className='w-6 h-6' /></div>
            <div><span className='bg-slate-200 text-slate-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase'>Role 3 • Platform Admin</span><h3 className='text-xl font-extrabold text-slate-900 mt-1.5 font-heading'>Admin Control Desk</h3></div>
            <ul className='text-xs text-slate-600 space-y-2.5 font-medium'>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-slate-600 shrink-0 mt-0.5' /><span>Verify and approve incoming farmer credential submissions</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-slate-600 shrink-0 mt-0.5' /><span>Configure Karachi market locations, schedules, and capacity limits</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-slate-600 shrink-0 mt-0.5' /><span>Moderate customer reviews and ensure rating integrity</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-slate-600 shrink-0 mt-0.5' /><span>Monitor platform health, order completion rates, and metrics</span></li>
              <li className='flex items-start gap-2'><CheckCircle2 className='w-4 h-4 text-slate-600 shrink-0 mt-0.5' /><span>Manage global agricultural product categories and tags</span></li>
            </ul>
          </div>
        </div>
      </section>
      {/* 6. SYSTEM ARCHITECTURE */} 
      <section className='max-w-7xl mx-auto px-4 lg:px-8 space-y-8'>
        <div className='text-center max-w-2xl mx-auto space-y-2'>
          <span className='text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-block mb-2'>SYSTEM ARCHITECTURE</span>
          <h2 className='text-3xl font-extrabold text-slate-900 font-heading'>Engineered for Speed, Reliability & Security</h2>
          <p className='text-slate-600 text-xs sm:text-sm font-medium'>Built using modern web technologies to ensure dependable access across mobile devices and desktop computers.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover-card-3d transition space-y-3'><div className='w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center'><Zap className='w-5 h-5' /></div><h4 className='font-extrabold text-slate-900 text-sm font-heading'>Sub-Second Response</h4><p className='text-xs text-slate-600 leading-relaxed font-normal'>Ultra-fast page loads and instant filtering ensure smooth pre-ordering even on fluctuating mobile connections.</p></div>
          <div className='bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover-card-3d transition space-y-3'><div className='w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center'><Cpu className='w-5 h-5' /></div><h4 className='font-extrabold text-slate-900 text-sm font-heading'>99.9% High Availability</h4><p className='text-xs text-slate-600 leading-relaxed font-normal'>High platform reliability ensures shoppers can reserve their Sunday fresh harvest crates anytime before weekly cutoff windows.</p></div>
          <div className='bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover-card-3d transition space-y-3'><div className='w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center'><Lock className='w-5 h-5' /></div><h4 className='font-extrabold text-slate-900 text-sm font-heading'>Data Integrity & Privacy</h4><p className='text-xs text-slate-600 leading-relaxed font-normal'>Role-based security shields contact details, order histories, and grower credentials. No online credit card data stored.</p></div>
          <div className='bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover-card-3d transition space-y-3'><div className='w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center'><Compass className='w-5 h-5' /></div><h4 className='font-extrabold text-slate-900 text-sm font-heading'>Integrated Geolocation</h4><p className='text-xs text-slate-600 leading-relaxed font-normal'>Built-in OpenStreetMap and Google Maps coordinates provide interactive visual stall routing and parking directions.</p></div>
        </div>
      </section>

      {/* 7. OUR STORY */}
      <section className='max-w-7xl mx-auto px-4 lg:px-8 space-y-8'>
        <div className='text-center max-w-2xl mx-auto space-y-2'>
          <span className='text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-block mb-2'>THE MARKETLINK STORY</span>
          <h2 className='text-3xl font-extrabold text-slate-900 font-heading'>Our Evolution: From Farm Gates to Modern Screens</h2>
          <p className='text-slate-600 text-xs sm:text-sm font-medium'>How a simple idea grew into Karachi premier direct agricultural network.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {milestones.map((m, idx) => (
            <div key={idx} className='bg-slate-50/80 hover:bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm relative space-y-3 hover-card-3d transition'>
              <div className='w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm'>{idx + 1}</div>
              <span className='text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider block'>{m.year}</span>
              <h4 className='text-base font-extrabold text-slate-900 font-heading'>{m.title}</h4>
              <p className='text-xs text-slate-600 leading-relaxed'>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. MEET THE LEADERSHIP TEAM */}
      <section className='max-w-7xl mx-auto px-4 lg:px-8 space-y-8'>
        <div className='text-center max-w-2xl mx-auto space-y-2'>
          <span className='text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-block mb-2'>LEADERSHIP TEAM</span>
          <h2 className='text-3xl font-extrabold text-slate-900 font-heading'>Meet the Builders & Agronomists</h2>
          <p className='text-slate-600 text-xs sm:text-sm font-medium'>A passionate coalition of software engineers, agronomy researchers, and community logistics veterans.</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {teamMembers.map((member) => (
            <div key={member.name} className='bg-slate-50/80 hover:bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md hover-card-3d transition space-y-4 flex flex-col justify-between'>
              <div className='space-y-3'>
                <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-emerald-500/20 font-heading'>{member.avatar}</div>
                <div>
                  <span className='text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300 uppercase tracking-wider'>{member.badge}</span>
                  <h4 className='text-lg font-extrabold text-slate-900 font-heading mt-2'>{member.name}</h4>
                  <p className='text-xs font-semibold text-slate-700'>{member.role}</p>
                  <p className='text-[11px] text-slate-400 font-medium'>{member.qualification}</p>
                </div>
                <p className='text-xs text-slate-600 leading-relaxed font-normal pt-1'>{member.bio}</p>
              </div>
              <div className='pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-emerald-700 font-bold'><span>Verified Specialist</span><CheckCircle2 className='w-4 h-4 text-emerald-600' /></div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. REGIONAL HEADQUARTERS */}
      <section className='max-w-7xl mx-auto px-4 lg:px-8'>
        <div className='bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 lg:p-10 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover-card-3d'>
          <div className='lg:col-span-7 space-y-4'>
            <span className='text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-800 inline-block mb-1'>REGIONAL HEADQUARTERS</span>
            <h3 className='text-3xl font-extrabold text-white font-heading' style={{ color: '#ffffff' }}>Get in Touch with MarketLink HQ</h3>
            <p className='text-slate-200 text-xs sm:text-sm leading-relaxed font-normal'>Our dedicated logistics team and agricultural coordinators are available to support both local farmers and urban shoppers.</p>
            <div className='space-y-3 pt-2 text-xs font-medium text-slate-200'>
              <div className='flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10'><MapPin className='w-5 h-5 text-emerald-400 shrink-0' /><span>Block 7, Clifton, Karachi Regional Office</span></div>
              <div className='flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10'><Mail className='w-5 h-5 text-emerald-400 shrink-0' /><span>support@marketlink.pk / logistics@marketlink.pk</span></div>
              <div className='flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10'><Phone className='w-5 h-5 text-emerald-400 shrink-0' /><span>+92 300 1234 567 / +92 21 3587 9000</span></div>
            </div>
          </div>
          <div className='lg:col-span-5 bg-emerald-900/60 backdrop-blur-md text-white p-7 rounded-2xl shadow-xl border border-emerald-500/30 space-y-4 text-center hover-card-3d'>
            <div className='w-14 h-14 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-inner'>🌱</div>
            <h4 className='font-extrabold text-lg font-heading text-white'>Are You a Local Producer?</h4>
            <p className='text-xs text-emerald-100/80 leading-relaxed'>Join 53+ regional smallholders publishing weekly harvest inventories and receiving guaranteed stall pre-orders.</p>
            <button type='button' onClick={onOpenAiBot} className='btn-golden w-full py-3 text-xs shadow-md cursor-pointer font-extrabold'><span>Register Your Farm Stall</span></button>
          </div>
        </div>
      </section>

    </div>
  );
}
