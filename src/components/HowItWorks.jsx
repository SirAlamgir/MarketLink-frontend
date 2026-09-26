import React from 'react';
import { 
  MapPin, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MapPin,
      title: "Find a Market Near You",
      description: "Browse markets across Karachi by location and day. Check verified vendor attendance, parking accessibility, and live stall opening hours.",
      linkText: "Explore regional zones →"
    },
    {
      number: "02",
      icon: ShoppingBag,
      title: "Reserve Your Items",
      description: "Pre-order fresh produce directly from farmers before it sells out. Secure limited seasonal greens, raw goat dairy, and wild-harvested Sidr honey.",
      linkText: "Item harvest catalogs →"
    },
    {
      number: "03",
      icon: CheckCircle2,
      title: "Pick Up & Enjoy",
      description: "Skip the queue — your harvest crate is freshly harvested, weighed, packed, and awaiting your arrival at verified stall pick-up hubs.",
      linkText: "Express pickup stalls →"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 pt-24 px-4 lg:px-8 bg-emerald-50/60 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block mb-4 text-[11px] font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
            TRANSPARENT FARM-TO-TABLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight mt-3">
            How MarketLink Works
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Connecting conscious shoppers with authentic producers in three simple steps before Sunday breakfast.
          </p>
        </div>

        {/* 3 Step Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const IconComp = step.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition group hover-card card-3d"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-emerald-100/80 text-emerald-700 flex items-center justify-center font-bold">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-200 font-heading group-hover:text-emerald-500 transition">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6">
                  <a
                    href="#markets"
                    className="text-xs font-extrabold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 transition"
                  >
                    <span>{step.linkText}</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
