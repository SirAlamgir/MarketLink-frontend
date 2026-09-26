import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import CategoryGrid from './components/CategoryGrid';
import MarketExplorer from './components/MarketExplorer';
import LogisticsMap from './components/LogisticsMap';
import FarmerSpotlight from './components/FarmerSpotlight';
import HarvestBanner from './components/HarvestBanner';
import ProductCatalog from './components/ProductCatalog';
import CustomerReviews from './components/CustomerReviews';
import BrowseMarketsPage from './components/BrowseMarketsPage';
import AboutUsPage from './components/AboutUsPage';
import ContactUsPage from './components/ContactUsPage';
import AiChatbot from './components/AiChatbot';
import CartDrawer from './components/CartDrawer';
import FarmerDetailModal from './components/FarmerDetailModal';
import MarketDetailModal from './components/MarketDetailModal';
import ReviewModal from './components/ReviewModal';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import ProductDetailModal from './components/ProductDetailModal';
import CheckoutModal from './components/CheckoutModal';
import CustomerDashboard from './components/CustomerDashboard';
import AccountSettingsModal from './components/AccountSettingsModal';
import FarmerDashboard from './components/FarmerDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

import MarketMap from './components/MarketMap';
import { getProducts } from './services/api';
import { MARKETS, FARMERS, PRODUCTS, CATEGORIES, REVIEWS } from './data/mockData';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'browse-markets' | 'about-us' | 'contact-us' | 'farmer-dashboard' | 'admin'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(MARKETS[0]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(['prod_201']);

  // Real products from backend (merged with mock as fallback)
  const [realProducts, setRealProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(({ data }) => {
        if (data && data.length > 0) {
          // Map backend product fields to frontend expected format
          const mapped = data.map(p => ({
            ...p,
            product_id: p._id || p.product_id,
            farmer_name: p.farmer_id?.name || 'MarketLink Farmer',
            stall_name: p.farmer_id?.stallName || 'Organic Stall',
            is_organic: true,
            is_sold_out: !p.isAvailable || p.stock_quantity <= 0,
            image: p.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600',
            rating: 4.8
          }));
          setRealProducts(mapped);
        }
      })
      .catch(() => setRealProducts([]));
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [reviewsList, setReviewsList] = useState(REVIEWS);

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiBotOpen, setIsAiBotOpen] = useState(false);
  const [selectedFarmerModal, setSelectedFarmerModal] = useState(null);
  const [selectedMarketModal, setSelectedMarketModal] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // New screen modals
  const [selectedProductModal, setSelectedProductModal] = useState(null); // Product Detail
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);            // Checkout / Pre-Order
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);          // Customer Dashboard
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false); // Account Settings
  const [isFarmerDashboardOpen, setIsFarmerDashboardOpen] = useState(false); // Farmer Dashboard

  // User Auth & Profile State — starts as null (logged out)
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [hasSeenAuthModal, setHasSeenAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'register'
  const [authModalAccountType, setAuthModalAccountType] = useState('customer'); // 'customer' | 'farmer'
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // URL Route Detection for Admin Portal (/admin or #/admin)
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#/admin' || hash.startsWith('#/admin') || path === '/admin' || path.startsWith('/admin')) {
        setCurrentView('admin');
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  // Tawk.to Live Chat Widget
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/64b2b6c794cf5d49dc6aa7d3/1h5e0sai8';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Automatic redirect for Farmer accounts on login or registration
  useEffect(() => {
    if (currentUser && (currentUser.role === 'Farmer' || currentUser.role === 'farmer')) {
      setCurrentView('farmer-dashboard');
    }
  }, [currentUser]);

  // Auto-open AuthModal (Registration) if not logged in
  useEffect(() => {
    // Show only once if not logged in
    if (!currentUser && currentView !== 'admin' && !isAuthModalOpen && !hasSeenAuthModal) {
      const timer = setTimeout(() => {
        if (!currentUser && !isAuthModalOpen && !hasSeenAuthModal) {
          setAuthModalMode('register');
          setAuthModalAccountType('customer');
          setIsAuthModalOpen(true);
          setHasSeenAuthModal(true);
        }
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [currentUser, currentView, isAuthModalOpen, hasSeenAuthModal]);

  const handleNavigate = (view) => {
    if (view === 'admin') {
      window.location.hash = '/admin';
    } else {
      if (window.location.hash === '#/admin' || window.location.hash.startsWith('#/admin')) {
        window.location.hash = '';
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product, qtyToAdd = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product_id === product.product_id);
      if (existing) {
        return prev.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: qtyToAdd }];
      }
    });

    showToast(`Added ${qtyToAdd}x "${product.name}" to your basket!`);
  };

  const handleUpdateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product_id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCart(prev => prev.filter(item => item.product_id !== productId));
    showToast("Item removed from basket.");
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Favorites toggle
  const handleToggleFavorite = (id) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        showToast("Saved to favorites ❤️");
        return [...prev, id];
      }
    });
  };

  const handleOpenFarmerDetail = (farmerObj) => {
    if (farmerObj.farmer_name) {
      setSelectedFarmerModal(farmerObj);
    } else {
      const found = FARMERS.find(f => f.farmer_id === farmerObj.farmer_id);
      setSelectedFarmerModal(found || FARMERS[0]);
    }
  };

  const handleAddReview = (newReview) => {
    setReviewsList(prev => [newReview, ...prev]);
    showToast("Review published successfully!");
  };

  const cartTotalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-body">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fadeIn text-xs font-semibold">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar - Hidden on Farmer Seller Portal & Admin Portal */}
      {currentView !== 'farmer-dashboard' && currentView !== 'admin' && (
        <Navbar
          cartCount={cartTotalItems}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => {
            if (currentView !== 'home') handleNavigate('home');
            setTimeout(() => {
              const produceSection = document.getElementById('produce');
              if (produceSection) produceSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onOpenAiBot={() => setIsAiBotOpen(true)}
          currentView={currentView}
          onNavigate={handleNavigate}
          currentUser={currentUser}
          onOpenAuthModal={(mode = 'signin', accountType = 'customer') => {
            setAuthModalMode(mode);
            setAuthModalAccountType(accountType);
            setIsAuthModalOpen(true);
          }}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onOpenDashboard={() => setIsDashboardOpen(true)}
          onOpenSettings={() => setIsAccountSettingsOpen(true)}
          onOpenFarmerDashboard={() => setIsFarmerDashboardOpen(true)}
          onSignOut={() => {
            setCurrentUser(null);
            showToast("Signed out successfully. Click Sign In anytime to log in.");
          }}
          onSwitchRole={(newRole) => {
            if (currentUser) {
              setCurrentUser(prev => ({
                ...prev,
                role: newRole,
                name: newRole === 'Farmer' ? 'Chaudhry Riaz (Farmer)' : 'Ayesha Khan',
                shortName: newRole === 'Farmer' ? 'Riaz' : 'Ayesha',
                avatar: newRole === 'Farmer' ? 'R' : 'A',
                avatarBg: newRole === 'Farmer' ? 'bg-amber-600' : 'bg-emerald-600'
              }));
              showToast(`Switched active view to ${newRole} mode.`);
              if (newRole === 'Farmer') handleNavigate('farmer-dashboard');
              else handleNavigate('home');
            }
          }}
        />
      )}

      {/* View Switcher: Admin Portal | Farmer Dashboard | Home View | Browse Markets View | About Us View | Contact Us View */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          isAdminAuthenticated ? (
            <AdminDashboard
              onLogout={() => {
                setIsAdminAuthenticated(false);
                showToast("Admin logged out successfully.");
              }}
              onSwitchToPublic={() => handleNavigate('home')}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={() => {
                setIsAdminAuthenticated(true);
                showToast("Admin access granted. Welcome to MarketLink Console.");
              }}
              onBackToSite={() => handleNavigate('home')}
            />
          )
        ) : currentView === 'farmer-dashboard' ? (
          <FarmerDashboard
            onNavigate={handleNavigate}
            showToast={showToast}
            currentUser={currentUser}
          />
        ) : currentView === 'browse-markets' ? (
          <BrowseMarketsPage
            markets={MARKETS}
            selectedMarket={selectedMarket}
            onSelectMarket={(m) => {
              setSelectedMarket(m);
              showToast(`Selected "${m.market_name}" for pickup!`);
            }}
            onOpenMarketDetail={(m) => setSelectedMarketModal(m)}
            onOpenFarmerDetail={handleOpenFarmerDetail}
            farmers={FARMERS}
          />
        ) : currentView === 'about-us' ? (
          <AboutUsPage
            onNavigate={handleNavigate}
            onOpenAiBot={() => setIsAiBotOpen(true)}
          />
        ) : currentView === 'contact-us' ? (
          <ContactUsPage
            onNavigate={handleNavigate}
            onOpenAiBot={() => setIsAiBotOpen(true)}
          />
        ) : (
          <div className="space-y-12 lg:space-y-20 py-4">
            {/* 1. Hero Banner */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearchSubmit={() => {
                handleNavigate('browse-markets');
              }}
              onOpenAiBot={() => setIsAiBotOpen(true)}
              onOpenAuthModal={(mode = 'signin', accountType = 'customer') => {
                setAuthModalMode(mode);
                setAuthModalAccountType(accountType);
                setIsAuthModalOpen(true);
              }}
              currentUser={currentUser}
              onNavigate={handleNavigate}
            />

            {/* 2. How MarketLink Works */}
            <HowItWorks />

            {/* 3. This Week's Markets Section */}
            <MarketExplorer
              markets={MARKETS}
              selectedMarket={selectedMarket}
              onSelectMarket={(market) => {
                setSelectedMarket(market);
                showToast(`Selected "${market.market_name}" for pickup!`);
              }}
              onOpenMarketDetail={(market) => setSelectedMarketModal(market)}
            />

            {/* 4. Real-Time Logistics & Map Banner */}
            <LogisticsMap
              onOpenMarketDetail={(market) => setSelectedMarketModal(market || MARKETS[0])}
            />

            {/* 5. Meet Our Farmers Spotlight */}
            <FarmerSpotlight
              farmers={FARMERS}
              onOpenFarmerDetail={handleOpenFarmerDetail}
            />

            {/* 6. Sunday Fresh Harvest Callout Bar */}
            <HarvestBanner
              onReserveClick={() => {
                const produceSection = document.getElementById('produce');
                if (produceSection) produceSection.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 7. Integrated Category Browser & Product Catalog */}
            <ProductCatalog
              products={[...realProducts, ...PRODUCTS]}
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
              onOpenFarmerDetail={handleOpenFarmerDetail}
              onOpenProductDetail={(prod) => setSelectedProductModal(prod)}
            />

            {/* 8. Customer Reviews */}
            <CustomerReviews
              reviews={reviewsList}
              onOpenWriteReview={() => setIsReviewModalOpen(true)}
            />

            {/* 9. Live Farmers Market Map (OpenStreetMap) */}
            <MarketMap onNavigate={handleNavigate} />
          </div>
        )}
      </main>

      {/* Floating AI Assistant Trigger - Hidden on Farmer Dashboard & Admin view */}
      {currentView !== 'farmer-dashboard' && currentView !== 'admin' && (
        <button
          onClick={() => setIsAiBotOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-emerald-700 hover:bg-emerald-800 text-white p-4 rounded-full shadow-2xl border-2 border-white transition flex items-center gap-2 group"
          title="Ask MarketBot AI"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="hidden md:inline font-bold text-xs pr-1 font-heading">AI MarketBot</span>
        </button>
      )}

      {/* Modals & Drawers */}
      <AiChatbot
        isOpen={isAiBotOpen}
        onClose={() => setIsAiBotOpen(false)}
        markets={MARKETS}
        farmers={FARMERS}
        products={[...realProducts, ...PRODUCTS]}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        selectedMarket={selectedMarket}
        markets={MARKETS}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />

      {selectedFarmerModal && (
        <FarmerDetailModal
          farmer={selectedFarmerModal}
          onClose={() => setSelectedFarmerModal(null)}
          products={[...realProducts, ...PRODUCTS]}
          onAddToCart={handleAddToCart}
        />
      )}

      {selectedMarketModal && (
        <MarketDetailModal
          market={selectedMarketModal}
          onClose={() => setSelectedMarketModal(null)}
          farmers={FARMERS}
          onSelectFarmer={(farmer) => handleOpenFarmerDetail(farmer)}
        />
      )}

      {isReviewModalOpen && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          farmers={FARMERS}
          onSubmitReview={handleAddReview}
        />
      )}

      {/* Product Detail Modal */}
      {selectedProductModal && (
        <ProductDetailModal
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
          onAddToCart={handleAddToCart}
          onOpenFarmerDetail={handleOpenFarmerDetail}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Checkout / Pre-Order Flow */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        selectedMarket={selectedMarket}
        showToast={showToast}
        onPlaceOrder={(order) => {
          showToast(`Pre-order #${order.orderId} placed! Show QR at stall.`);
        }}
      />

      {/* Customer Dashboard (My Orders + History + Reorder) */}
      <CustomerDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        currentUser={currentUser}
        showToast={showToast}
        onNavigate={handleNavigate}
        onReorder={(order) => {
          order.items.forEach(item => {
            handleAddToCart({ product_id: item.name, name: item.name, price: item.price, unit: item.unit }, item.qty);
          });
        }}
      />

      {/* Account Settings Modal */}
      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
        currentUser={currentUser}
        showToast={showToast}
        onUpdateUser={(updatedUser) => setCurrentUser(updatedUser)}
        onSignOut={() => {
          setCurrentUser(null);
          setIsAccountSettingsOpen(false);
          showToast('Signed out successfully.');
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        initialAccountType={authModalAccountType}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
          if (user.role === 'Farmer' || user.role === 'farmer' || user.stallName || user.accountType === 'farmer') {
            handleNavigate('farmer-dashboard');
          } else {
            handleNavigate('home');
          }
        }}
        showToast={showToast}
      />

      {/* User Profile & Pre-Orders Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={currentUser}
        onSignOut={() => {
          setCurrentUser(null);
          showToast("Signed out successfully.");
        }}
        onNavigate={handleNavigate}
        showToast={showToast}
      />

      {/* Footer - Hidden on Farmer Seller Dashboard & Admin View */}
      {currentView !== 'farmer-dashboard' && currentView !== 'admin' && (
        <Footer onNavigate={handleNavigate} />
      )}

    </div>
  );
}
