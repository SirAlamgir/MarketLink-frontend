import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  ChevronDown, 
  Leaf, 
  Menu, 
  X,
  ShieldCheck,
  User,
  LogOut,
  QrCode,
  CheckCircle2,
  Store,
  Sparkles,
  Bell,
  Truck
} from 'lucide-react';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../services/api';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenSearch, 
  onOpenAiBot,
  currentView,
  onNavigate,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal,
  onOpenDashboard,
  onOpenSettings,
  onSignOut,
  onSwitchRole,
  onOpenFarmerDashboard
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { _id: 'n1', title: 'Order Delivered! 🎉🚚', message: 'Your fresh farm harvest was delivered successfully.', createdAt: new Date().toISOString(), read: false },
    { _id: 'n2', title: 'Order Confirmed! ✅', message: 'Farmer confirmed your order. Items are being packed!', createdAt: new Date(Date.now() - 3600000).toISOString(), read: false },
    { _id: 'n3', title: 'Sunday Farmers Market 🌿', message: 'Clifton Sunday Market pre-orders are open.', createdAt: new Date(Date.now() - 10800000).toISOString(), read: true },
  ]);
  const profileDropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Fetch real notifications if user is logged in
  useEffect(() => {
    if (currentUser) {
      getNotifications()
        .then(({ data }) => {
          if (data && data.length > 0) {
            setNotifications(data);
          }
        })
        .catch(() => {});
    }
  }, [currentUser, notifOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
    } catch(e) {}
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.read && notif._id && !notif._id.startsWith('n')) {
      try {
        await markNotificationRead(notif._id);
      } catch(e) {}
    }
    setNotifications(prev => prev.map(n => n._id === notif._id ? ({ ...n, read: true }) : n));
    setNotifOpen(false);
    if (currentUser?.role === 'Farmer') {
      onOpenFarmerDashboard ? onOpenFarmerDashboard() : onNavigate?.('farmer-dashboard');
    } else {
      onOpenDashboard && onOpenDashboard();
    }
  };

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Browse Markets', view: 'browse-markets' },
    { label: 'About Us', view: 'about-us' },
    { label: 'Contact Us', view: 'contact-us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/70 shadow-sm">
      
      {/* Top Live Ticker */}
      <div className="bg-emerald-900 text-emerald-100 text-[11px] py-1.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
            <span className="font-bold text-emerald-300 shrink-0">Live:</span>
            <div className="overflow-hidden flex-1">
              <span className="inline-block animate-ticker font-medium whitespace-nowrap">
                🌿 Clifton Sunday Market pre-orders close Saturday 10PM &nbsp;&nbsp;&nbsp; 👨‍🌾 53 verified farmers active this week &nbsp;&nbsp;&nbsp; 🍯 New: Malir Organic Honey now in stock &nbsp;&nbsp;&nbsp; ✨ Zero middlemen — direct harvest pricing guaranteed
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[10px] font-semibold text-emerald-300 shrink-0">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" />100% Verified</span>
            <span>🌱 Zero Markups</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-6 xl:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* LEFT: Logo */}
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-[200px] p-2 group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-110">
            <img src="Flogo.png" alt='Logo' />
          </div>  
        </button>

        {/* CENTER: Navigation Pills */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 rounded-2xl px-1.5 py-1.5 border border-slate-200/60">
          {navLinks.map((link) => (
            <button
              key={link.view + link.label}
              onClick={() => onNavigate(link.view)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                currentView === link.view
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* RIGHT: Search + Sign In + Cart + Notification + AI + User */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Inline Search Box */}
          <div className={`hidden md:flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 transition-all duration-300 ${searchOpen ? 'w-52 ring-2 ring-emerald-500/30 bg-white border-emerald-300' : 'w-36 hover:w-44'}`}>
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search produce..."
              value={searchVal}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              onChange={e => setSearchVal(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none w-full"
            />
          </div>

          {/* Sign In moved to before AI Assistant */}

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all duration-200 group"
            title="Basket"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifDropdownRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2.5 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 group cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-fadeInScale">
                <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-slate-900 text-xs">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={handleMarkAllRead} 
                    className="text-[10px] text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-slate-400 text-xs">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n, i) => {
                      const isDelivered = n.title?.toLowerCase().includes('delivered');
                      const isConfirmed = n.title?.toLowerCase().includes('confirmed') || n.title?.toLowerCase().includes('accepted');
                      const isRejected = n.title?.toLowerCase().includes('reject') || n.title?.toLowerCase().includes('cancel');
                      const icon = isDelivered ? '🚚' : isConfirmed ? '✅' : isRejected ? '❌' : n.title?.toLowerCase().includes('order') ? '🛒' : '🌿';
                      
                      return (
                        <div 
                          key={n._id || i} 
                          onClick={() => handleNotificationClick(n)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl text-xs transition cursor-pointer ${
                            !n.read 
                              ? 'bg-emerald-50/70 border border-emerald-200/60 hover:bg-emerald-100/60' 
                              : 'hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          <span className="text-base shrink-0 select-none">{icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-extrabold text-slate-900 truncate flex items-center justify-between">
                              <span>{n.title}</span>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                            </div>
                            <div className="text-slate-600 text-[11px] line-clamp-2 mt-0.5">{n.message || n.sub}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <button 
                  onClick={() => {
                    setNotifOpen(false);
                    if (currentUser?.role === 'Farmer') {
                      onOpenFarmerDashboard ? onOpenFarmerDashboard() : onNavigate?.('farmer-dashboard');
                    } else {
                      onOpenDashboard && onOpenDashboard();
                    }
                  }} 
                  className="w-full mt-2.5 pt-2 border-t border-slate-100 text-xs font-bold text-emerald-700 hover:text-emerald-900 text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>View All Orders & Details</span>
                  <ChevronDown className="w-3 h-3 -rotate-90" />
                </button>
              </div>
            )}
          </div>

          {/* AI Bot */}
          <button
            onClick={onOpenAiBot}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-emerald-500/20 transition-all duration-200 hover:scale-105 hover:shadow-emerald-500/30"
            title="AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">AI Assistant</span>
          </button>

          {/* Sign In - right of AI Assistant */}
          {!currentUser && (
            <button
              onClick={() => onOpenAuthModal?.()}
              className="hidden sm:flex items-center gap-1.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-slate-800 hover:text-emerald-800 text-xs font-extrabold px-4 py-2 rounded-xl shadow-sm transition-all duration-200 hover:scale-105"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sign In</span>
            </button>
          )}

          {/* User Profile */}
          {currentUser ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-2 rounded-xl border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  profileDropdownOpen 
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-400 shadow-sm' 
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg ${currentUser.avatarBg || 'bg-emerald-600'} text-white font-extrabold flex items-center justify-center text-[10px] shadow-sm`}>
                  {currentUser.avatar || 'U'}
                </div>
                <span className="hidden sm:inline">Hi, {currentUser.shortName || currentUser.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-fadeInScale">
                  <div className="p-3 bg-gradient-to-br from-emerald-50 to-slate-50 rounded-xl border border-emerald-100/60 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl ${currentUser.avatarBg || 'bg-emerald-600'} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                        {currentUser.avatar || 'U'}
                      </div>
                      <div className="truncate flex-1">
                        <div className="flex items-center gap-1">
                          <h4 className="font-extrabold text-slate-900 text-xs truncate">{currentUser.name}</h4>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        </div>
                        <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">{currentUser.role || 'Verified Customer'}</span>
                      <span className="text-[10px] text-slate-500">{currentUser.locality || 'Clifton Zone'}</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    {currentUser?.role === 'Farmer' && (
                      <button
                        onClick={() => { setProfileDropdownOpen(false); onNavigate('farmer-dashboard'); }}
                        className="w-full p-2.5 text-left rounded-xl bg-emerald-800 text-white font-extrabold flex items-center justify-between transition hover:bg-emerald-900 text-xs"
                      >
                        <div className="flex items-center gap-2"><Store className="w-4 h-4 text-amber-300" /><span>Farmer Dashboard</span></div>
                        <span className="text-[9px] bg-black/30 text-emerald-300 px-2 py-0.5 rounded-full">PORTAL</span>
                      </button>
                    )}
                    <button onClick={() => { setProfileDropdownOpen(false); onOpenDashboard?.(); }}
                      className="w-full p-2.5 text-left rounded-xl hover:bg-emerald-50 text-slate-800 font-bold flex items-center justify-between transition text-xs">
                      <div className="flex items-center gap-2"><QrCode className="w-4 h-4 text-emerald-600" /><span>My Orders & Dashboard</span></div>
                      <span className="bg-emerald-600 text-white text-[9px] px-2 py-0.5 rounded-full font-extrabold">2</span>
                    </button>
                    <button onClick={() => { setProfileDropdownOpen(false); onOpenProfileModal?.(); }}
                      className="w-full p-2.5 text-left rounded-xl hover:bg-slate-100 text-slate-700 font-bold flex items-center gap-2 transition text-xs">
                      <User className="w-4 h-4 text-slate-500" /><span>Account Profile</span>
                    </button>
                    <button onClick={() => { setProfileDropdownOpen(false); onOpenSettings?.(); }}
                      className="w-full p-2.5 text-left rounded-xl hover:bg-slate-100 text-slate-700 font-bold flex items-center gap-2 transition text-xs">
                      <ShieldCheck className="w-4 h-4 text-slate-500" /><span>Account Settings</span>
                    </button>
                    <button onClick={() => { setProfileDropdownOpen(false); onSwitchRole?.(currentUser.role === 'Customer' ? 'Farmer' : 'Customer'); }}
                      className="w-full p-2.5 text-left rounded-xl hover:bg-amber-50 text-amber-700 font-bold flex items-center gap-2 transition text-xs">
                      <Store className="w-4 h-4" /><span>{currentUser.role === 'Customer' ? 'Switch to Farmer View' : 'Switch to Customer View'}</span>
                    </button>
                  </div>

                  <div className="pt-2 mt-1 border-t border-slate-100">
                    <button onClick={() => { setProfileDropdownOpen(false); onSignOut?.(); }}
                      className="w-full p-2.5 text-left rounded-xl hover:bg-red-50 text-red-600 font-extrabold flex items-center gap-2 transition text-xs">
                      <LogOut className="w-4 h-4" /><span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          ) : null}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 animate-fadeIn">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => { onNavigate(link.view); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition ${currentView === link.view ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search produce..." className="bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
