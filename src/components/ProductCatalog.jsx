import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  ShoppingBag, 
  Heart, 
  Check, 
  Award, 
  Star, 
  Filter, 
  Search,
  Sparkles,
  Info,
  User
} from 'lucide-react';

export default function ProductCatalog({ 
  products, 
  categories = [],
  activeCategory, 
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onOpenFarmerDetail,
  onOpenProductDetail
}) {
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [quantities, setQuantities] = useState({});

  // Filter products by category, search query, and organic checkbox
  const filteredProducts = products.filter(product => {
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }
    if (organicOnly && !product.is_organic) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchName = product.name?.toLowerCase().includes(query) || false;
      const matchFarmer = (product.farmer_name || product.farmer_id?.name || '')?.toLowerCase().includes(query);
      const matchStall = (product.stall_name || product.farmer_id?.stallName || '')?.toLowerCase().includes(query);
      if (!matchName && !matchFarmer && !matchStall) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'stock') return b.stock_quantity - a.stock_quantity;
    return b.rating - a.rating;
  });

  const getQty = (id) => quantities[id] || 1;

  const handleQtyChange = (id, delta, maxStock) => {
    const current = getQty(id);
    const updated = Math.max(1, Math.min(maxStock, current + delta));
    setQuantities(prev => ({ ...prev, [id]: updated }));
  };

  return (
    <section id="produce" className="py-16 lg:py-24 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Single Unified Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="inline-block mb-4 text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
            Fresh Market Departments & Weekly Harvest
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight mt-3">
            Browse Produce by Category
          </h2>
          <p className="text-slate-600 text-sm font-medium mt-1 max-w-xl">
            Select a department to explore weekly fresh organic items listed directly by verified regional farm stalls.
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Organic Only Checkbox */}
          <label className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer shadow-sm hover:border-emerald-300 transition select-none">
            <input
              type="checkbox"
              checked={organicOnly}
              onChange={(e) => setOrganicOnly(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <span className="flex items-center gap-1 text-emerald-800">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              100% Certified Organic Only
            </span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-emerald-700 font-extrabold focus:outline-none cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Highest Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Department Selection Pills */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-102'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/60 shadow-xs'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isActive ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.count || 0}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            🌱
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Produce Found</h3>
          <p className="text-slate-500 text-sm">
            No items matched your current search filters. Try switching category or clearing the search terms.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSearchQuery('');
              setOrganicOnly(false);
            }}
            className="btn-secondary text-xs px-5 py-2.5"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(`prod_${product.product_id}`);
            const qty = getQty(product.product_id);

            return (
              <div
                key={product.product_id}
                className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 hover:border-emerald-300 flex flex-col justify-between group relative card-3d"
              >
                {/* Top Image Container */}
                <div 
                  onClick={() => onOpenProductDetail && onOpenProductDetail(product)}
                  className="relative h-52 overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(`prod_${product.product_id}`);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                      isFav 
                        ? 'bg-rose-50 text-rose-500 shadow' 
                        : 'bg-white/80 text-slate-400 hover:text-rose-500'
                    }`}
                    title={isFav ? "Remove Favorite" : "Save Favorite Product"}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Organic tag */}
                  {product.is_organic && (
                    <span className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Organic
                    </span>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 font-extrabold px-3 py-1 rounded-xl shadow border border-emerald-100 flex items-baseline gap-1">
                    <span className="text-emerald-700 text-lg font-heading">${product.price.toFixed(2)}</span>
                    <span className="text-[11px] text-slate-500 font-semibold">{product.unit}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Stock */}
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                      </div>

                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        product.stock_quantity < 15 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {product.stock_quantity} left in stock
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => onOpenProductDetail && onOpenProductDetail(product)}
                      className="font-extrabold text-lg text-slate-900 leading-tight font-heading group-hover:text-emerald-700 transition cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Farmer Link */}
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onOpenFarmerDetail({ farmer_id: product.farmer_id, farmer_name: product.farmer_name })}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200/70 cursor-pointer"
                        title={`View products from ${product.farmer_name || 'Farmer'}`}
                      >
                        <User className="w-3 h-3 text-emerald-700 shrink-0" />
                        <span className="truncate max-w-[150px]">Farmer: {product.farmer_name || product.farmer_id?.name || 'Local Farmer'}</span>
                      </button>
                      {product.stall_name && (
                        <span className="text-[10px] text-slate-400 font-semibold truncate max-w-[90px]">{product.stall_name}</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Bottom Action Controls */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    {/* Quantity Picker */}
                    <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                      <button
                        onClick={() => handleQtyChange(product.product_id, -1, product.stock_quantity)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shadow-sm transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-extrabold text-slate-900">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(product.product_id, 1, product.stock_quantity)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shadow-sm transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Pre-Order Button */}
                    <button
                      onClick={() => onAddToCart(product, qty)}
                      className="btn-primary flex-1 text-xs py-2.5 shadow-emerald-500/20"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Pre-Order Basket</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
