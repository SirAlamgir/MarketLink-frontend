import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, Users, Store, Package, ShoppingBag, BarChart2,
  AlertTriangle, Settings, Plus, Edit2, Trash2, CheckCircle2,
  XCircle, Search, Filter, RefreshCw, MapPin, ArrowRight, CornerDownRight,
  LogOut, ArrowLeft, Leaf, Bell, Eye, EyeOff, ShieldAlert, FileText,
  DollarSign, Clock, Layers, Sparkles, Check, Flag, Download,
  Sun, Moon, ChevronDown, UserCheck, Key, Lock, Activity
} from 'lucide-react';

const INITIAL_FARMERS = [
  {
    id: 'farm_1',
    stallName: 'Riverbend Organic Farm',
    farmerName: 'Chaudhry Riaz Ahmed',
    email: 'riaz.farmer@marketlink.pk',
    phone: '+92 300 9876543',
    marketAssigned: 'Clifton Sunday Farmers Market (Booth B-12)',
    status: 'approved', // 'approved' | 'pending' | 'suspended'
    productsCount: 14,
    totalSales: '$4,850.00',
    joinedDate: '2026-01-15'
  },
  {
    id: 'farm_2',
    stallName: 'Green Valley Dairy & Poultry',
    farmerName: 'Hajra Bibi',
    email: 'hajra.dairy@marketlink.pk',
    phone: '+92 321 4455667',
    marketAssigned: 'DHA Phase 8 Organic Bazaar',
    status: 'approved',
    productsCount: 8,
    totalSales: '$3,210.00',
    joinedDate: '2026-02-01'
  },
  {
    id: 'farm_3',
    stallName: 'Malir Honey & Citrus Apiary',
    farmerName: 'Kamran Shah',
    email: 'kamran.honey@marketlink.pk',
    phone: '+92 333 1122334',
    marketAssigned: 'Gulshan Weekend Market',
    status: 'pending', // Requires Admin Approval per SRS Page 9
    productsCount: 5,
    totalSales: '$0.00',
    joinedDate: '2026-09-22'
  },
  {
    id: 'farm_4',
    stallName: 'Sunripe Hydroponic Berries',
    farmerName: 'Tariq Mehmood',
    email: 'tariq.berries@marketlink.pk',
    phone: '+92 301 8899000',
    marketAssigned: 'Clifton Sunday Farmers Market',
    status: 'suspended',
    productsCount: 3,
    totalSales: '$940.00',
    joinedDate: '2026-03-10'
  }
];

const INITIAL_CUSTOMERS = [
  {
    id: 'cust_1',
    name: 'Ayesha Khan',
    email: 'ayesha.k@example.com',
    phone: '+92 300 1234567',
    locality: 'Clifton Block 5',
    ordersCount: 12,
    status: 'active', // 'active' | 'suspended'
    joinedDate: '2026-02-10'
  },
  {
    id: 'cust_2',
    name: 'Dr. Kamran Malik',
    email: 'kamran.m@example.com',
    phone: '+92 321 9876543',
    locality: 'DHA Phase 6',
    ordersCount: 8,
    status: 'active',
    joinedDate: '2026-03-05'
  },
  {
    id: 'cust_3',
    name: 'Zainab Ahmed',
    email: 'zainab.a@example.com',
    phone: '+92 333 5554433',
    locality: 'Gulshan Block 13',
    ordersCount: 15,
    status: 'active',
    joinedDate: '2026-01-20'
  },
  {
    id: 'cust_4',
    name: 'Spam User Account',
    email: 'bot_test_99@fake.com',
    phone: '+92 345 0000000',
    locality: 'Unknown',
    ordersCount: 0,
    status: 'suspended',
    joinedDate: '2026-09-20'
  }
];

const INITIAL_MARKETS = [
  {
    market_id: 'mkt_1',
    market_name: 'Clifton Sunday Farmers Market',
    address: 'Seaview Park Promenade, Block 3, Clifton, Karachi',
    operating_days: 'Sunday (8:00 AM - 3:00 PM)',
    timings: '08:00 AM - 03:00 PM',
    map_coordinates: '24.8138° N, 67.0311° E',
    capacity: 28,
    activeFarmers: 22
  },
  {
    market_id: 'mkt_2',
    market_name: 'DHA Phase 8 Organic Bazaar',
    address: 'Creek Club Lawns, Khayaban-e-Shaheen, Phase 8, DHA',
    operating_days: 'Saturday & Sunday (9:00 AM - 4:00 PM)',
    timings: '09:00 AM - 04:00 PM',
    map_coordinates: '24.7922° N, 67.0688° E',
    capacity: 35,
    activeFarmers: 30
  },
  {
    market_id: 'mkt_3',
    market_name: 'Gulshan Weekend Farm Fresh Market',
    address: 'Nipa Cultural Complex Grounds, Main University Road',
    operating_days: 'Saturday (7:00 AM - 1:00 PM)',
    timings: '07:00 AM - 01:00 PM',
    map_coordinates: '24.9180° N, 67.0971° E',
    capacity: 20,
    activeFarmers: 16
  }
];

const INITIAL_MODERATION_ITEMS = [
  {
    id: 'mod_1',
    type: 'product',
    title: 'Synthetic Growth Booster Jam',
    reporter: 'System Quality Audit',
    reason: 'Non-organic claims without food safety certification',
    flaggedBy: 'Customer Report #882',
    status: 'flagged'
  },
  {
    id: 'mod_2',
    type: 'review',
    title: 'Abusive Language in Vendor Review',
    reporter: 'Farmer Riaz',
    reason: 'Contains profanity and unverified claims',
    flaggedBy: 'Vendor Appeal #104',
    status: 'flagged'
  }
];

const INITIAL_CATEGORIES = [
  { id: 'cat_1', name: 'Vegetables', icon: '🥕', count: 48 },
  { id: 'cat_2', name: 'Fruits', icon: '🍎', count: 32 },
  { id: 'cat_3', name: 'Dairy & Cheese', icon: '🧀', count: 24 },
  { id: 'cat_4', name: 'Bakery & Grains', icon: '🍞', count: 18 },
  { id: 'cat_5', name: 'Honey & Preserves', icon: '🍯', count: 15 },
  { id: 'cat_6', name: 'Poultry & Free-Range Eggs', icon: '🥚', count: 12 }
];

export default function AdminDashboard({
  onNavigate,
  showToast,
  currentUser,
  onAdminLogout,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'farmers' | 'customers' | 'markets' | 'moderation' | 'reports' | 'system'
  const [adminSearchQuery, setAdminSearchQuery] = useState('');

  // Theme Mode State ('dark' | 'light')
  const [themeMode, setThemeMode] = useState('dark');
  const isDark = themeMode === 'dark';

  // Admin Profile & Dropdown States
  const [isAdminProfileOpen, setIsAdminProfileOpen] = useState(false);
  const [isProfileDetailModalOpen, setIsProfileDetailModalOpen] = useState(false);
  const [isAuditLogModalOpen, setIsAuditLogModalOpen] = useState(false);
  const adminProfileRef = useRef(null);

  // Admin Security Details & Password State
  const [adminPassForm, setAdminPassForm] = useState({ currentPass: '', newPass: '', confirmPass: '' });
  const [passMessage, setPassMessage] = useState(null);

  // Click outside listener for Admin Profile Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (adminProfileRef.current && !adminProfileRef.current.contains(event.target)) {
        setIsAdminProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Theme Class Dictionary for Dark vs Light Mode
  const t = {
    mainBg: isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900',
    sidebarBg: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md text-slate-800',
    headerBg: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm',
    cardBg: isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm',
    cardAltBg: isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200',
    inputBg: isDark ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-500' : 'bg-slate-100 border-slate-300 text-slate-900 placeholder:text-slate-400',
    mutedText: isDark ? 'text-slate-400' : 'text-slate-500',
    headingText: isDark ? 'text-white' : 'text-slate-900',
    border: isDark ? 'border-slate-800' : 'border-slate-200',
    tableRow: isDark ? 'hover:bg-slate-800/40 border-slate-800/60' : 'hover:bg-slate-50 border-slate-200',
    tableHead: isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700 font-bold',
    modalBg: isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl',
  };

  // Master Data States
  const [farmers, setFarmers] = useState(INITIAL_FARMERS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [markets, setMarkets] = useState(INITIAL_MARKETS);
  const [moderationItems, setModerationItems] = useState(INITIAL_MODERATION_ITEMS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann_1',
      title: 'Eid Holiday Schedule Update',
      message: 'All Farmers Markets will operate on special holiday hours this coming weekend.',
      date: '2026-09-23',
      target: 'all'
    }
  ]);

  // Modal States
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [editingMarket, setEditingMarket] = useState(null);
  const [marketForm, setMarketForm] = useState({
    market_name: '',
    address: '',
    operating_days: 'Sunday (8:00 AM - 3:00 PM)',
    timings: '08:00 AM - 03:00 PM',
    map_coordinates: '24.8138° N, 67.0311° E',
    capacity: 25
  });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('🌾');

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    target: 'all'
  });

  // Filtered lists for admin search
  const filteredFarmers = farmers.filter(f => {
    if (!adminSearchQuery.trim()) return true;
    const q = adminSearchQuery.toLowerCase();
    return f.stallName.toLowerCase().includes(q) || f.farmerName.toLowerCase().includes(q) || f.email.toLowerCase().includes(q);
  });

  const filteredCustomers = customers.filter(c => {
    if (!adminSearchQuery.trim()) return true;
    const q = adminSearchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.locality.toLowerCase().includes(q);
  });

  const filteredMarkets = markets.filter(m => {
    if (!adminSearchQuery.trim()) return true;
    const q = adminSearchQuery.toLowerCase();
    return m.market_name.toLowerCase().includes(q) || m.address.toLowerCase().includes(q);
  });

  // Farmer Approval Handlers (SRS Page 9)
  const handleApproveFarmer = (id, name) => {
    setFarmers(prev => prev.map(f => f.id === id ? { ...f, status: 'approved' } : f));
    showToast && showToast(`Farmer "${name}" registration APPROVED! Can now list products.`);
  };

  const handleSuspendFarmer = (id, name) => {
    setFarmers(prev => prev.map(f => f.id === id ? { ...f, status: 'suspended' } : f));
    showToast && showToast(`Farmer "${name}" account SUSPENDED.`);
  };

  const handleDeleteFarmer = (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete farmer record "${name}"?`)) {
      setFarmers(prev => prev.filter(f => f.id !== id));
      showToast && showToast(`Farmer "${name}" record removed.`);
    }
  };

  // Customer Management Handlers (SRS Page 9)
  const handleToggleCustomerStatus = (id, currentStatus, name) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: nextStatus } : c));
    showToast && showToast(`Customer account "${name}" is now ${nextStatus.toUpperCase()}.`);
  };

  const handleDeleteCustomer = (id, name) => {
    if (window.confirm(`Delete customer account "${name}"?`)) {
      setCustomers(prev => prev.filter(c => c.id !== id));
      showToast && showToast(`Customer "${name}" account deleted.`);
    }
  };

  // Market Management Handlers (SRS Page 9)
  const handleSaveMarket = (e) => {
    e.preventDefault();
    if (!marketForm.market_name || !marketForm.address) {
      showToast && showToast('Please enter market name and address.');
      return;
    }

    if (editingMarket) {
      setMarkets(prev => prev.map(m => m.market_id === editingMarket.market_id ? {
        ...m,
        market_name: marketForm.market_name,
        address: marketForm.address,
        operating_days: marketForm.operating_days,
        timings: marketForm.timings,
        map_coordinates: marketForm.map_coordinates,
        capacity: parseInt(marketForm.capacity, 10)
      } : m));
      showToast && showToast(`Market "${marketForm.market_name}" updated!`);
    } else {
      const newMkt = {
        market_id: `mkt_${Date.now()}`,
        market_name: marketForm.market_name,
        address: marketForm.address,
        operating_days: marketForm.operating_days,
        timings: marketForm.timings,
        map_coordinates: marketForm.map_coordinates,
        capacity: parseInt(marketForm.capacity, 10),
        activeFarmers: 0
      };
      setMarkets(prev => [newMkt, ...prev]);
      showToast && showToast(`New Farmers Market "${marketForm.market_name}" added!`);
    }
    setIsMarketModalOpen(false);
  };

  const handleDeleteMarket = (id, name) => {
    if (window.confirm(`Remove Farmers Market "${name}"?`)) {
      setMarkets(prev => prev.filter(m => m.market_id !== id));
      showToast && showToast(`Market "${name}" removed.`);
    }
  };

  // Content Moderation Handlers (SRS Page 9)
  const handleRemoveModerationItem = (id, title) => {
    setModerationItems(prev => prev.filter(i => i.id !== id));
    showToast && showToast(`Inappropriate item "${title}" removed from platform.`);
  };

  const handleDismissModerationItem = (id) => {
    setModerationItems(prev => prev.filter(i => i.id !== id));
    showToast && showToast('Flag dismissed.');
  };

  // System Config Handlers (SRS Page 9)
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    const catObj = {
      id: `cat_${Date.now()}`,
      name: newCatName,
      icon: newCatIcon || '🌾',
      count: 0
    };
    setCategories(prev => [...prev, catObj]);
    setNewCatName('');
    setIsCategoryModalOpen(false);
    showToast && showToast(`Master category "${newCatName}" added!`);
  };

  const handlePublishAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementForm.title || !announcementForm.message) return;
    const newAnn = {
      id: `ann_${Date.now()}`,
      title: announcementForm.title,
      message: announcementForm.message,
      date: new Date().toISOString().split('T')[0],
      target: announcementForm.target
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    setAnnouncementForm({ title: '', message: '', target: 'all' });
    showToast && showToast('Platform-wide announcement published to all users!');
  };

  return (
    <div className={`min-h-screen ${t.mainBg} flex flex-col md:flex-row font-body animate-fadeIn transition-colors duration-200`}>
      
      {/* LEFT COLUMN SIDEBAR NAVIGATION */}
      <aside className={`w-full md:w-72 ${t.sidebarBg} border-r shrink-0 min-h-screen p-5 flex flex-col justify-between sticky top-0 h-screen overflow-y-auto`}>
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className={`flex items-center gap-3 pb-5 border-b ${t.border}`}>
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-900/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-lg font-extrabold font-heading tracking-tight block ${t.headingText}`}>
                Market<span className="text-emerald-500">Link</span> Admin
              </span>
              <span className="text-[10px] text-emerald-500 font-extrabold tracking-widest uppercase block">
                Platform Control Center
              </span>
            </div>
          </div>

          {/* Admin User Badge */}
          <div className={`${t.cardAltBg} p-3.5 rounded-2xl border ${t.border} space-y-1`}>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-emerald-500 font-heading truncate">
                Super Admin Master
              </span>
              <span className="bg-emerald-500/20 text-emerald-500 text-[9px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                ROOT
              </span>
            </div>
            <p className={`text-[11px] ${t.mutedText} truncate`}>admin@marketlink.pk</p>
          </div>

          {/* COLUMN NAVIGATION MENU */}
          <nav className="space-y-1">
            <p className={`text-[10px] font-extrabold ${t.mutedText} uppercase tracking-wider px-3 mb-2`}>
              Admin System Modules
            </p>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-700 text-white shadow-lg'
                  : isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart2 className="w-4 h-4 text-emerald-500" />
                <span>Overview & Analytics</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('farmers')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'farmers'
                  ? 'bg-emerald-700 text-white shadow-lg'
                  : isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Store className="w-4 h-4 text-amber-500" />
                <span>Manage Farmers</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'}`}>
                {farmers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-emerald-700 text-white shadow-lg'
                  : isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Manage Customers</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'}`}>
                {customers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('markets')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'markets'
                  ? 'bg-emerald-700 text-white shadow-lg'
                  : isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span>Manage Markets</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'}`}>
                {markets.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('moderation')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'moderation'
                  ? 'bg-emerald-700 text-white shadow-lg'
                  : isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>Content Moderation</span>
              </div>
              {moderationItems.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {moderationItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-emerald-700 text-white shadow-lg'
                  : isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-cyan-500" />
                <span>Reports & Analytics</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'system'
                  ? 'bg-emerald-700 text-white shadow-lg'
                  : isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-amber-500" />
                <span>System Configuration</span>
              </div>
            </button>
          </nav>

        </div>

        {/* BOTTOM SIDEBAR ACTIONS */}
        <div className={`pt-6 border-t ${t.border} space-y-3 mt-6`}>
          <button
            onClick={() => {
              if (onLogout) onLogout();
              else if (onAdminLogout) onAdminLogout();
            }}
            className="w-full bg-rose-900/60 hover:bg-rose-900 text-rose-100 font-extrabold text-xs py-3 rounded-2xl shadow transition flex items-center justify-center gap-2 cursor-pointer border border-rose-700/50"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className={`flex-1 flex flex-col min-w-0 ${t.mainBg} min-h-screen`}>
        
        {/* Top Header Bar */}
        <header className={`${t.headerBg} border-b px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-md`}>
          
          {/* Left Side: Admin Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${t.mutedText}`} />
            <input
              type="text"
              placeholder="Search farmers, customers, markets, listings..."
              value={adminSearchQuery}
              onChange={(e) => setAdminSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 ${t.inputBg} rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 border transition`}
            />
          </div>

          {/* Right Side: Actions & Profile Badge */}
          <div className="flex items-center gap-3">
            
            {/* Quick Theme Switcher Button */}
            <button
              type="button"
              onClick={() => {
                const next = isDark ? 'light' : 'dark';
                setThemeMode(next);
                showToast && showToast(`Switched theme to ${next.toUpperCase()} mode! ☀️/🌙`);
              }}
              className={`px-3 py-2 rounded-xl border flex items-center gap-2 text-xs font-extrabold transition cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              }`}
              title="Switch Dark / Light Theme Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span className="hidden md:inline">{isDark ? 'Light Theme' : 'Dark Theme'}</span>
            </button>

            {activeTab === 'markets' && (
              <button
                onClick={() => {
                  setEditingMarket(null);
                  setMarketForm({
                    market_name: '',
                    address: '',
                    operating_days: 'Sunday (8:00 AM - 3:00 PM)',
                    timings: '08:00 AM - 03:00 PM',
                    map_coordinates: '24.8138° N, 67.0311° E',
                    capacity: 25
                  });
                  setIsMarketModalOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Farmers Market
              </button>
            )}

            {/* Interactive Admin Profile Dropdown Button */}
            <div className="relative shrink-0" ref={adminProfileRef}>
              <button
                type="button"
                onClick={() => setIsAdminProfileOpen(!isAdminProfileOpen)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border transition cursor-pointer shadow-xs ${
                  isAdminProfileOpen 
                    ? 'bg-emerald-600/20 border-emerald-500 ring-2 ring-emerald-500/30' 
                    : isDark ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 border-slate-300'
                }`}
                title="Click for Admin Account & Security Options"
              >
                <div className="w-8.5 h-8.5 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
                  ADM
                </div>
                <div className="text-left hidden sm:block">
                  <h4 className={`font-extrabold text-xs leading-tight ${t.headingText}`}>
                    Super Admin
                  </h4>
                  <span className="text-[10px] text-emerald-500 font-extrabold font-mono block">
                    Full Authority
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 ${t.mutedText} transition-transform ${isAdminProfileOpen ? 'rotate-180 text-emerald-500' : ''}`} />
              </button>

              {/* Working Admin Profile Dropdown Menu */}
              {isAdminProfileOpen && (
                <div className={`absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl border p-3 z-50 animate-fadeIn ${t.modalBg}`}>
                  
                  {/* Admin Header Card */}
                  <div className={`p-3.5 rounded-xl border mb-2.5 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                        ADM
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-1">
                          <h4 className={`font-extrabold text-xs truncate ${t.headingText}`}>Super Admin (Root)</h4>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">admin@marketlink.pk</p>
                        <span className="inline-block mt-1 bg-emerald-500/20 text-emerald-500 font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-500/30">
                          CLEARANCE: LEVEL 5
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1 text-xs font-bold">
                    
                    {/* Theme Mode Toggle Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const next = isDark ? 'light' : 'dark';
                        setThemeMode(next);
                        showToast && showToast(`Switched theme to ${next.toUpperCase()} mode!`);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition cursor-pointer ${
                        isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                        <span>Toggle Color Theme</span>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono ${
                        isDark ? 'bg-slate-800 text-amber-300' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {isDark ? '🌙 Dark' : '☀️ Light'}
                      </span>
                    </button>

                    {/* Admin Profile & Password Modal Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdminProfileOpen(false);
                        setIsProfileDetailModalOpen(true);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center gap-2.5 transition cursor-pointer ${
                        isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-emerald-500" />
                      <span>Admin Account & Clearance</span>
                    </button>

                    {/* Audit Logs Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdminProfileOpen(false);
                        setIsAuditLogModalOpen(true);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center gap-2.5 transition cursor-pointer ${
                        isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Activity className="w-4 h-4 text-amber-500" />
                      <span>Security Audit Logs</span>
                    </button>
                  </div>

                  {/* Sign Out Action */}
                  <div className={`pt-2 mt-2 border-t ${t.border}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdminProfileOpen(false);
                        if (onLogout) onLogout();
                        else if (onAdminLogout) onAdminLogout();
                      }}
                      className="w-full p-2 rounded-xl text-left text-rose-500 hover:bg-rose-500/10 font-bold flex items-center gap-2.5 transition cursor-pointer text-xs"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out Admin</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">

          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className={`${t.cardBg} p-5 rounded-3xl border ${t.border} shadow-xs space-y-2`}>
                  <span className={`text-xs ${t.mutedText} font-semibold block`}>Total Registered Farmers</span>
                  <span className="text-2xl font-extrabold text-amber-500 font-heading block">
                    {farmers.length}
                  </span>
                  <span className="text-[10px] text-emerald-500 font-bold">SRS Requirement 1.6</span>
                </div>

                <div className={`${t.cardBg} p-5 rounded-3xl border ${t.border} shadow-xs space-y-2`}>
                  <span className={`text-xs ${t.mutedText} font-semibold block`}>Total Active Customers</span>
                  <span className="text-2xl font-extrabold text-blue-500 font-heading block">
                    1,450
                  </span>
                  <span className={`text-[10px] ${t.mutedText} font-medium`}>Across all zones</span>
                </div>

                <div className={`${t.cardBg} p-5 rounded-3xl border ${t.border} shadow-xs space-y-2`}>
                  <span className={`text-xs ${t.mutedText} font-semibold block`}>Farmers Markets</span>
                  <span className="text-2xl font-extrabold text-purple-500 font-heading block">
                    {markets.length}
                  </span>
                  <span className="text-[10px] text-purple-500 font-bold">OpenStreetMap Linked</span>
                </div>

                <div className={`${t.cardBg} p-5 rounded-3xl border ${t.border} shadow-xs space-y-2`}>
                  <span className={`text-xs ${t.mutedText} font-semibold block`}>Platform Pre-Orders</span>
                  <span className="text-2xl font-extrabold text-emerald-500 font-heading block">
                    3,840
                  </span>
                  <span className="text-[10px] text-emerald-500 font-bold">98% fulfillment</span>
                </div>

                <div className={`${t.cardBg} p-5 rounded-3xl border ${t.border} shadow-xs space-y-2`}>
                  <span className={`text-xs ${t.mutedText} font-semibold block`}>Platform Gross Sales</span>
                  <span className="text-2xl font-extrabold text-cyan-500 font-heading block">
                    $124,500
                  </span>
                  <span className="text-[10px] text-cyan-500 font-mono">Paid at pickup</span>
                </div>
              </div>

              {/* Action Tables & Moderation Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left: Pending Farmer Approvals */}
                <div className={`${t.cardBg} rounded-3xl p-6 border ${t.border} space-y-4 shadow-xs`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-extrabold font-heading flex items-center gap-2 ${t.headingText}`}>
                        <Clock className="w-5 h-5 text-amber-500" />
                        Pending Farmer Registrations
                      </h3>
                      <p className={`text-xs ${t.mutedText}`}>Approve farmer registrations before they can publish produce listings (SRS Page 9)</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {farmers.filter(f => f.status === 'pending').map(f => (
                      <div key={f.id} className={`p-4 ${t.cardAltBg} rounded-2xl border border-amber-500/40 flex flex-wrap items-center justify-between gap-3`}>
                        <div>
                          <h4 className={`font-extrabold text-sm font-heading ${t.headingText}`}>{f.stallName}</h4>
                          <p className={`text-xs ${t.mutedText}`}>Owner: {f.farmerName} • {f.phone}</p>
                          <p className="text-[11px] text-emerald-500 font-medium mt-0.5">{f.marketAssigned}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveFarmer(f.id, f.stallName)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl transition cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleSuspendFarmer(f.id, f.stallName)}
                            className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                    {farmers.filter(f => f.status === 'pending').length === 0 && (
                      <p className={`text-xs ${t.mutedText} italic text-center py-4`}>No pending farmer registration approvals.</p>
                    )}
                  </div>
                </div>

                {/* Right: Flagged Content Moderation Alert */}
                <div className={`${t.cardBg} rounded-3xl p-6 border ${t.border} space-y-4 shadow-xs`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-extrabold font-heading flex items-center gap-2 ${t.headingText}`}>
                        <ShieldAlert className="w-5 h-5 text-rose-500" />
                        Content Moderation Alerts
                      </h3>
                      <p className={`text-xs ${t.mutedText}`}>Review flagged product listings or abusive customer reviews (SRS Page 9)</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {moderationItems.map(item => (
                      <div key={item.id} className={`p-4 ${t.cardAltBg} rounded-2xl border border-rose-500/40 flex flex-wrap items-center justify-between gap-3`}>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-rose-500/20 text-rose-500 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase border border-rose-500/30">
                              {item.type}
                            </span>
                            <h4 className={`font-extrabold text-xs ${t.headingText}`}>{item.title}</h4>
                          </div>
                          <p className={`text-[11px] ${t.mutedText} mt-1`}>Reason: {item.reason}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRemoveModerationItem(item.id, item.title)}
                            className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition cursor-pointer"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => handleDismissModerationItem(item.id)}
                            className={`font-bold text-xs px-3 py-1.5 rounded-xl transition cursor-pointer ${
                              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                            }`}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: MANAGE FARMERS */}
          {activeTab === 'farmers' && (
            <div className={`${t.cardBg} p-6 rounded-3xl border ${t.border} space-y-4 shadow-xs`}>
              <div>
                <h3 className={`text-lg font-extrabold font-heading ${t.headingText}`}>
                  Manage Farmers & Stall Registrations ({filteredFarmers.length})
                </h3>
                <p className={`text-xs ${t.mutedText}`}>
                  SRS Page 9 Requirement: Admin can view, approve, or suspend Farmer registrations before they can list products.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className={`w-full text-left text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <thead className={`${t.tableHead} font-extrabold uppercase`}>
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Stall & Farmer Name</th>
                      <th className="p-3.5">Contact Details</th>
                      <th className="p-3.5">Assigned Market</th>
                      <th className="p-3.5">Listings</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${t.border}`}>
                    {filteredFarmers.map(f => (
                      <tr key={f.id} className={`${t.tableRow} transition`}>
                        <td className={`p-3.5 font-extrabold ${t.headingText}`}>
                          <div>{f.stallName}</div>
                          <span className={`text-[11px] ${t.mutedText} font-normal`}>Owner: {f.farmerName}</span>
                        </td>
                        <td className={`p-3.5 ${t.mutedText}`}>
                          <div>{f.email}</div>
                          <span className="text-[11px] font-mono opacity-80">{f.phone}</span>
                        </td>
                        <td className="p-3.5 text-emerald-500 font-semibold">{f.marketAssigned}</td>
                        <td className="p-3.5 font-bold">{f.productsCount} products</td>
                        <td className="p-3.5 capitalize font-bold">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            f.status === 'approved' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' :
                            f.status === 'pending' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' :
                            'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                          }`}>
                            {f.status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            {f.status !== 'approved' && (
                              <button
                                onClick={() => handleApproveFarmer(f.id, f.stallName)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-3 py-1 rounded-xl transition cursor-pointer"
                              >
                                Approve
                              </button>
                            )}
                            {f.status !== 'suspended' && (
                              <button
                                onClick={() => handleSuspendFarmer(f.id, f.stallName)}
                                className="bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs px-3 py-1 rounded-xl transition cursor-pointer"
                              >
                                Suspend
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteFarmer(f.id, f.stallName)}
                              className="text-rose-500 hover:text-rose-600 p-1"
                              title="Delete Farmer Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className={`${t.cardBg} p-6 rounded-3xl border ${t.border} space-y-4 shadow-xs`}>
              <div>
                <h3 className={`text-lg font-extrabold font-heading ${t.headingText}`}>
                  Manage Customer Accounts ({filteredCustomers.length})
                </h3>
                <p className={`text-xs ${t.mutedText}`}>
                  SRS Page 9 Requirement: Admin can view, activate, or deactivate customer accounts in case of policy violations.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className={`w-full text-left text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <thead className={`${t.tableHead} font-extrabold uppercase`}>
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Customer Name</th>
                      <th className="p-3.5">Email & Phone</th>
                      <th className="p-3.5">Locality Zone</th>
                      <th className="p-3.5">Pre-Orders Placed</th>
                      <th className="p-3.5">Account Status</th>
                      <th className="p-3.5 rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${t.border}`}>
                    {filteredCustomers.map(c => (
                      <tr key={c.id} className={`${t.tableRow} transition`}>
                        <td className={`p-3.5 font-extrabold ${t.headingText}`}>{c.name}</td>
                        <td className={`p-3.5 ${t.mutedText}`}>
                          <div>{c.email}</div>
                          <span className="text-[11px] font-mono opacity-80">{c.phone}</span>
                        </td>
                        <td className={`p-3.5 ${t.headingText}`}>{c.locality}</td>
                        <td className="p-3.5 font-bold text-emerald-500">{c.ordersCount} orders</td>
                        <td className="p-3.5 capitalize font-bold">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            c.status === 'active' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleCustomerStatus(c.id, c.status, c.name)}
                              className={`font-extrabold text-xs px-3 py-1 rounded-xl transition cursor-pointer ${
                                c.status === 'active' ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-emerald-600 text-white hover:bg-emerald-500'
                              }`}
                            >
                              {c.status === 'active' ? 'Suspend' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleDeleteCustomer(c.id, c.name)}
                              className="text-rose-500 hover:text-rose-600 p-1"
                              title="Delete Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MANAGE MARKETS */}
          {activeTab === 'markets' && (
            <div className={`${t.cardBg} p-6 rounded-3xl border ${t.border} space-y-4 shadow-xs`}>
              <div className={`flex flex-wrap items-center justify-between gap-4 border-b ${t.border} pb-4`}>
                <div>
                  <h3 className={`text-lg font-extrabold font-heading ${t.headingText}`}>
                    Manage Farmers Markets ({filteredMarkets.length})
                  </h3>
                  <p className={`text-xs ${t.mutedText}`}>
                    SRS Page 9 Requirement: Admin can add, edit, or remove farmers markets, including name, address, operating days, timings, and map coordinates (Google Maps / OpenStreetMap).
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingMarket(null);
                    setMarketForm({
                      market_name: '',
                      address: '',
                      operating_days: 'Sunday (8:00 AM - 3:00 PM)',
                      timings: '08:00 AM - 03:00 PM',
                      map_coordinates: '24.8138° N, 67.0311° E',
                      capacity: 25
                    });
                    setIsMarketModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Farmers Market
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMarkets.map(mkt => (
                  <div key={mkt.market_id} className={`${t.cardAltBg} p-5 rounded-3xl border ${t.border} space-y-3 flex flex-col justify-between shadow-xs`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-extrabold text-base font-heading ${t.headingText}`}>
                          {mkt.market_name}
                        </h4>
                        <span className="bg-emerald-500/20 text-emerald-500 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                          {mkt.activeFarmers} / {mkt.capacity} Stalls
                        </span>
                      </div>

                      <p className={`text-xs ${t.mutedText} flex items-start gap-1.5`}>
                        <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{mkt.address}</span>
                      </p>

                      <div className={`text-[11px] p-2.5 rounded-xl space-y-1 ${isDark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700 border border-slate-200'}`}>
                        <div>Operating: <strong className={t.headingText}>{mkt.operating_days}</strong></div>
                        <div>Map Pin (OSM): <strong className="text-amber-500 font-mono">{mkt.map_coordinates}</strong></div>
                      </div>
                    </div>

                    <div className={`pt-3 border-t ${t.border} flex items-center justify-end gap-2`}>
                      <button
                        onClick={() => {
                          setEditingMarket(mkt);
                          setMarketForm({
                            market_name: mkt.market_name,
                            address: mkt.address,
                            operating_days: mkt.operating_days,
                            timings: mkt.timings,
                            map_coordinates: mkt.map_coordinates,
                            capacity: mkt.capacity
                          });
                          setIsMarketModalOpen(true);
                        }}
                        className={`text-xs font-bold p-2 ${t.mutedText} hover:${t.headingText}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMarket(mkt.market_id, mkt.market_name)}
                        className="text-rose-500 hover:text-rose-600 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONTENT MODERATION */}
          {activeTab === 'moderation' && (
            <div className={`${t.cardBg} p-6 rounded-3xl border ${t.border} space-y-6 shadow-xs`}>
              <div>
                <h3 className={`text-lg font-extrabold font-heading ${t.headingText}`}>
                  Content Moderation Queue ({moderationItems.length})
                </h3>
                <p className={`text-xs ${t.mutedText}`}>
                  SRS Page 9 Requirement: Admin can view and remove inappropriate product listings or customer reviews that violate platform guidelines.
                </p>
              </div>

              <div className="space-y-4">
                {moderationItems.map(item => (
                  <div key={item.id} className={`p-5 ${t.cardAltBg} rounded-2xl border border-rose-500/40 flex flex-wrap items-center justify-between gap-4`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-rose-500/20 text-rose-500 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-rose-500/30">
                          Flagged {item.type}
                        </span>
                        <h4 className={`font-extrabold text-sm font-heading ${t.headingText}`}>{item.title}</h4>
                      </div>
                      <p className={`text-xs ${t.mutedText}`}>Reason: <span className="text-rose-500 font-semibold italic">{item.reason}</span></p>
                      <p className={`text-[11px] ${t.mutedText} opacity-80`}>Source: {item.flaggedBy}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleRemoveModerationItem(item.id, item.title)}
                        className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
                      >
                        Remove Listing / Review
                      </button>
                      <button
                        onClick={() => handleDismissModerationItem(item.id)}
                        className={`font-extrabold text-xs px-4 py-2 rounded-xl transition cursor-pointer ${
                          isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        }`}
                      >
                        Dismiss Flag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REPORTS & ANALYTICS */}
          {activeTab === 'reports' && (
            <div className={`${t.cardBg} p-6 rounded-3xl border ${t.border} space-y-6 shadow-xs`}>
              <div className={`flex items-center justify-between border-b ${t.border} pb-4`}>
                <div>
                  <h3 className={`text-lg font-extrabold font-heading ${t.headingText}`}>
                    Platform-Wide Reports & Analytics
                  </h3>
                  <p className={`text-xs ${t.mutedText}`}>
                    SRS Page 9 Requirement: Admin can view platform-wide reports covering total orders, revenue summary across markets, and most active Farmers.
                  </p>
                </div>

                <button
                  onClick={() => showToast && showToast('Exporting MarketLink Platform Analytics Report (PDF/CSV)...')}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Export Master Report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className={`${t.cardAltBg} p-5 rounded-3xl border ${t.border} space-y-2`}>
                  <span className={`text-xs ${t.mutedText} font-semibold`}>Top Performing Market</span>
                  <h4 className="text-lg font-extrabold text-emerald-500 font-heading">Clifton Sunday Farmers Market</h4>
                  <p className={`text-xs ${t.mutedText}`}>$64,200 total sales (51.5% platform volume)</p>
                </div>

                <div className={`${t.cardAltBg} p-5 rounded-3xl border ${t.border} space-y-2`}>
                  <span className={`text-xs ${t.mutedText} font-semibold`}>Most Active Farmer Stall</span>
                  <h4 className="text-lg font-extrabold text-amber-500 font-heading">Riverbend Organic Farm</h4>
                  <p className={`text-xs ${t.mutedText}`}>420 pre-orders fulfilled (99.2% rating)</p>
                </div>

                <div className={`${t.cardAltBg} p-5 rounded-3xl border ${t.border} space-y-2`}>
                  <span className={`text-xs ${t.mutedText} font-semibold`}>Top Produce Category</span>
                  <h4 className="text-lg font-extrabold text-cyan-500 font-heading">Organic Vegetables (42%)</h4>
                  <p className={`text-xs ${t.mutedText}`}>Tomatoes & Spinach lead demand</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SYSTEM CONFIGURATION */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className={`${t.cardBg} p-6 rounded-3xl border ${t.border} space-y-4 shadow-xs`}>
                <div className={`flex items-center justify-between border-b ${t.border} pb-4`}>
                  <div>
                    <h3 className={`text-lg font-extrabold font-heading ${t.headingText}`}>
                      Product Categories Master Data
                    </h3>
                    <p className={`text-xs ${t.mutedText}`}>
                      SRS Page 9 Requirement: Admin can manage master data such as product categories.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Category
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {categories.map(cat => (
                    <div key={cat.id} className={`${t.cardAltBg} p-4 rounded-2xl border ${t.border} text-center space-y-1`}>
                      <span className="text-2xl block">{cat.icon}</span>
                      <h4 className={`font-extrabold text-xs truncate ${t.headingText}`}>{cat.name}</h4>
                      <span className={`text-[10px] ${t.mutedText}`}>{cat.count} listings</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${t.cardBg} p-6 rounded-3xl border ${t.border} space-y-4 shadow-xs`}>
                <div>
                  <h3 className={`text-lg font-extrabold font-heading ${t.headingText}`}>
                    Broadcast Platform Announcement
                  </h3>
                  <p className={`text-xs ${t.mutedText}`}>
                    SRS Page 9 Requirement: Admin can publish platform-wide notifications or announcements to Farmers and Customers.
                  </p>
                </div>

                <form onSubmit={handlePublishAnnouncement} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`font-bold block mb-1 ${t.mutedText}`}>Announcement Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Market Operating Schedule Notice"
                        value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                        className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                      />
                    </div>

                    <div>
                      <label className={`font-bold block mb-1 ${t.mutedText}`}>Target Audience</label>
                      <select
                        value={announcementForm.target}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, target: e.target.value })}
                        className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                      >
                        <option value="all">All Users (Farmers & Customers)</option>
                        <option value="farmers">Farmers Only</option>
                        <option value="customers">Customers Only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`font-bold block mb-1 ${t.mutedText}`}>Announcement Message *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Type official system announcement message..."
                      value={announcementForm.message}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                      className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow transition cursor-pointer"
                    >
                      Publish System Announcement
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* Add / Edit Farmers Market Modal */}
      {isMarketModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border space-y-4 max-h-[90vh] overflow-y-auto ${t.modalBg}`}>
            <div className={`flex items-center justify-between border-b ${t.border} pb-3`}>
              <h3 className={`text-lg font-extrabold font-heading ${t.headingText}`}>
                {editingMarket ? 'Edit Farmers Market' : 'Add New Farmers Market'}
              </h3>
              <button onClick={() => setIsMarketModalOpen(false)} className={`p-1 ${t.mutedText} hover:${t.headingText}`}>
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMarket} className="space-y-4 text-xs">
              <div>
                <label className={`font-bold block mb-1 ${t.mutedText}`}>Market Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Malir Farmers Market"
                  value={marketForm.market_name}
                  onChange={(e) => setMarketForm({ ...marketForm, market_name: e.target.value })}
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                />
              </div>

              <div>
                <label className={`font-bold block mb-1 ${t.mutedText}`}>Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Full location address..."
                  value={marketForm.address}
                  onChange={(e) => setMarketForm({ ...marketForm, address: e.target.value })}
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`font-bold block mb-1 ${t.mutedText}`}>Operating Days</label>
                  <input
                    type="text"
                    value={marketForm.operating_days}
                    onChange={(e) => setMarketForm({ ...marketForm, operating_days: e.target.value })}
                    className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                  />
                </div>

                <div>
                  <label className={`font-bold block mb-1 ${t.mutedText}`}>Stall Capacity</label>
                  <input
                    type="number"
                    value={marketForm.capacity}
                    onChange={(e) => setMarketForm({ ...marketForm, capacity: e.target.value })}
                    className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                  />
                </div>
              </div>

              <div>
                <label className={`font-bold block mb-1 ${t.mutedText}`}>Google Maps / OpenStreetMap Pin Coordinates (Lat, Long)</label>
                <input
                  type="text"
                  placeholder="24.8138° N, 67.0311° E"
                  value={marketForm.map_coordinates}
                  onChange={(e) => setMarketForm({ ...marketForm, map_coordinates: e.target.value })}
                  className={`w-full p-3 rounded-xl border font-mono text-amber-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                />
              </div>

              <div className={`flex items-center justify-end gap-3 pt-3 border-t ${t.border}`}>
                <button
                  type="button"
                  onClick={() => setIsMarketModalOpen(false)}
                  className={`px-4 py-2 font-bold ${t.mutedText}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer"
                >
                  {editingMarket ? 'Save Changes' : 'Create Market Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Master Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border space-y-4 ${t.modalBg}`}>
            <div className={`flex items-center justify-between border-b ${t.border} pb-3`}>
              <h3 className={`text-lg font-extrabold font-heading ${t.headingText}`}>Add Master Produce Category</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className={`p-1 ${t.mutedText} hover:${t.headingText}`}>
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
              <div>
                <label className={`font-bold block mb-1 ${t.mutedText}`}>Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Spices & Herbs"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                />
              </div>

              <div>
                <label className={`font-bold block mb-1 ${t.mutedText}`}>Category Icon / Emoji</label>
                <input
                  type="text"
                  placeholder="🌿"
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                />
              </div>

              <div className={`flex items-center justify-end gap-3 pt-3 border-t ${t.border}`}>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className={`px-4 py-2 font-bold ${t.mutedText}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer"
                >
                  Add Master Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Profile & Security Details Modal */}
      {isProfileDetailModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className={`w-full max-w-xl rounded-3xl p-6 shadow-2xl border space-y-5 max-h-[90vh] overflow-y-auto ${t.modalBg}`}>
            <div className={`flex items-center justify-between border-b pb-3.5 ${t.border}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-extrabold font-heading ${t.headingText}`}>
                    Admin Security & Clearance Profile
                  </h3>
                  <p className="text-xs text-emerald-500 font-semibold">Master Administrator Console</p>
                </div>
              </div>
              <button 
                onClick={() => setIsProfileDetailModalOpen(false)} 
                className={`p-1.5 rounded-xl transition hover:bg-slate-800/40 ${t.mutedText}`}
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info Details */}
            <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className={`block font-bold text-[10px] uppercase tracking-wider ${t.mutedText}`}>Admin Name</span>
                  <span className={`font-extrabold ${t.headingText}`}>Super Admin (System Root)</span>
                </div>

                <div>
                  <span className={`block font-bold text-[10px] uppercase tracking-wider ${t.mutedText}`}>Master Email</span>
                  <span className="font-extrabold text-emerald-500">admin@marketlink.pk</span>
                </div>

                <div>
                  <span className={`block font-bold text-[10px] uppercase tracking-wider ${t.mutedText}`}>Assigned Role</span>
                  <span className={`font-extrabold ${t.headingText}`}>Super Administrator</span>
                </div>

                <div>
                  <span className={`block font-bold text-[10px] uppercase tracking-wider ${t.mutedText}`}>Clearance Level</span>
                  <span className="font-mono text-amber-400 font-bold">Level 5 (Full Authority)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-[10px] font-bold">
                <span className="bg-emerald-500/20 text-emerald-500 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  ✓ Vendor Approvals
                </span>
                <span className="bg-emerald-500/20 text-emerald-500 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  ✓ Customer Status Controls
                </span>
                <span className="bg-emerald-500/20 text-emerald-500 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  ✓ GPS Markets CRUD
                </span>
                <span className="bg-emerald-500/20 text-emerald-500 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  ✓ Moderation Enforcer
                </span>
              </div>
            </div>

            {/* Password Update Form */}
            <div className="space-y-3 pt-2">
              <h4 className={`text-xs font-extrabold font-heading flex items-center gap-2 ${t.headingText}`}>
                <Key className="w-4 h-4 text-amber-400" />
                Change Master Admin Password
              </h4>

              {passMessage && (
                <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-semibold border border-emerald-500/40">
                  {passMessage}
                </div>
              )}

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPassForm.newPass !== adminPassForm.confirmPass) {
                    setPassMessage("⚠️ Passwords do not match!");
                    return;
                  }
                  setPassMessage("✓ Admin password updated successfully!");
                  setAdminPassForm({ currentPass: '', newPass: '', confirmPass: '' });
                  showToast && showToast("Admin credentials security updated.");
                  setTimeout(() => setPassMessage(null), 3000);
                }} 
                className="space-y-3 text-xs"
              >
                <div>
                  <label className={`block font-bold mb-1 ${t.mutedText}`}>Current Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={adminPassForm.currentPass}
                    onChange={(e) => setAdminPassForm({ ...adminPassForm, currentPass: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block font-bold mb-1 ${t.mutedText}`}>New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Min 6 characters"
                      value={adminPassForm.newPass}
                      onChange={(e) => setAdminPassForm({ ...adminPassForm, newPass: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                    />
                  </div>

                  <div>
                    <label className={`block font-bold mb-1 ${t.mutedText}`}>Confirm New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Repeat new password"
                      value={adminPassForm.confirmPass}
                      onChange={(e) => setAdminPassForm({ ...adminPassForm, confirmPass: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border focus:ring-2 focus:ring-emerald-500 focus:outline-none ${t.inputBg}`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsProfileDetailModalOpen(false)}
                    className={`px-4 py-2 font-bold ${t.mutedText}`}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer"
                  >
                    Update Admin Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Security Audit Log Modal */}
      {isAuditLogModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className={`w-full max-w-2xl rounded-3xl p-6 shadow-2xl border space-y-4 max-h-[90vh] overflow-y-auto ${t.modalBg}`}>
            <div className={`flex items-center justify-between border-b pb-3 ${t.border}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-extrabold font-heading ${t.headingText}`}>
                    Security Audit & Event Logs
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold">Real-time Platform Audit Trail</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAuditLogModalOpen(false)} 
                className={`p-1.5 rounded-xl transition hover:bg-slate-800/40 ${t.mutedText}`}
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Audit Log Table */}
            <div className="space-y-2 text-xs">
              {[
                { time: '2026-09-24 16:30', event: 'Theme Mode changed to ' + themeMode.toUpperCase(), ip: '192.168.1.104', type: 'info' },
                { time: '2026-09-24 15:45', event: 'Approved Farmer Registration #farm_3 (Kamran Shah)', ip: '192.168.1.104', type: 'success' },
                { time: '2026-09-24 14:12', event: 'Flagged Listing #mod_1 updated & seller notified', ip: '192.168.1.104', type: 'warning' },
                { time: '2026-09-24 12:05', event: 'Master Category "Organic Honey & Preserves" added', ip: '192.168.1.104', type: 'info' },
                { time: '2026-09-24 09:15', event: 'Master Admin Login Successful', ip: '192.168.1.104', type: 'success' }
              ].map((log, idx) => (
                <div key={idx} className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 ${t.cardAltBg}`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${
                      log.type === 'success' ? 'bg-emerald-500' : log.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <span className={`font-semibold ${t.headingText}`}>{log.event}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-mono">
                    <span className={t.mutedText}>{log.time}</span>
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">{log.ip}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className={`text-[11px] ${t.mutedText}`}>Showing 5 recent security events</span>
              <button
                onClick={() => {
                  showToast && showToast("Audit log exported as JSON format!");
                }}
                className="bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Export Log
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
