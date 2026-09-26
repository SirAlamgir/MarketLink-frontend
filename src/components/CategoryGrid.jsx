import React from 'react';
import { 
  Sparkles, 
  Carrot, 
  Apple, 
  Egg, 
  Wheat, 
  Flame, 
  Leaf,
  Layers
} from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  Carrot: Carrot,
  Apple: Apple,
  Egg: Egg,
  Wheat: Wheat,
  Flame: Flame,
  Leaf: Leaf
};

export default function CategoryGrid({ categories, activeCategory, onSelectCategory }) {
  return (
    <section className="py-10 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100/60 px-2.5 py-1 rounded-full border border-emerald-200">
            Fresh Market Departments
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-heading">
            Browse By Category
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-xs font-medium">
          Select a category to explore fresh weekly produce harvested by our local farm stalls.
        </p>
      </div>

      {/* Categories Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Layers;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 text-center group cursor-pointer hover-card-3d ${
                isActive
                  ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 text-white border-emerald-600 shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-white hover:bg-emerald-50/70 text-slate-700 border-slate-200 hover:border-emerald-300 shadow-sm'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-emerald-100/70 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
              }`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs tracking-tight leading-snug line-clamp-1">
                {cat.name}
              </span>
              <span className={`text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full ${
                isActive 
                  ? 'bg-emerald-800/60 text-emerald-100'
                  : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-800'
              }`}>
                {cat.count} items
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
