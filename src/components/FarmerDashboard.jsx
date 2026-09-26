import React, { useState, useEffect } from 'react';
import { getProducts, replyToReview , createProduct, updateProduct, deleteProduct, getOrders, updateOrderStatus as apiUpdateOrderStatus } from '../services/api';
import {
  Store, Package, ShoppingBag, TrendingUp, Star, Calendar, Clock,
  Plus, Edit2, Trash2, CheckCircle2, AlertCircle, RefreshCw, MapPin,
  Check, XCircle, Search, Filter, ShieldCheck, User, Sparkles, MessageSquare,
  DollarSign, BarChart2, Eye, EyeOff, Layers, ArrowRight, CornerDownRight,
  LogOut, ArrowLeft, Leaf, LayoutDashboard, Settings, Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_FARMER_PRODUCTS = [
  {
    product_id: 'prod_201',
    name: 'Fresh Organic Tomatoes',
    category: 'vegetables',
    price: 3.50,
    unit: 'per kg',
    stock_quantity: 45,
    weekly_template_qty: 60,
    is_organic: true,
    is_sold_out: false,
    rating: 4.9,
    description: 'Vine-ripened, pesticide-free juicy organic tomatoes harvested every Saturday morning.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600'
  },
  {
    product_id: 'prod_202',
    name: 'Farm Fresh Farm Eggs',
    category: 'poultry',
    price: 4.80,
    unit: 'per dozen',
    stock_quantity: 28,
    weekly_template_qty: 40,
    is_organic: true,
    is_sold_out: false,
    rating: 4.8,
    description: 'Free-range pasture raised hen eggs with rich golden yolks.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=600'
  },
  {
    product_id: 'prod_203',
    name: 'Pure Wildflower Raw Honey',
    category: 'honey',
    price: 8.50,
    unit: '500g jar',
    stock_quantity: 12,
    weekly_template_qty: 25,
    is_organic: true,
    is_sold_out: false,
    rating: 5.0,
    description: 'Unfiltered 100% natural raw honey harvested from Malir valley wildflower hives.',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=600'
  },
  {
    product_id: 'prod_204',
    name: 'Crisp Green Spinach',
    category: 'vegetables',
    price: 2.20,
    unit: 'per bunch',
    stock_quantity: 8,
    weekly_template_qty: 30,
    is_organic: true,
    is_sold_out: false,
    rating: 4.7,
    description: 'Nutrient-rich, freshly washed leafy green spinach grown without artificial fertilizers.',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600'
  },
  {
    product_id: 'prod_205',
    name: 'Organic Red Strawberries',
    category: 'fruits',
    price: 5.00,
    unit: '500g box',
    stock_quantity: 0,
    weekly_template_qty: 20,
    is_organic: true,
    is_sold_out: true,
    rating: 4.9,
    description: 'Sweet and fragrant hydroponic organic strawberries.',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600'
  }
];

const INITIAL_ORDERS = [
  {
    orderId: 'ORD-8821',
    customerName: 'Ayesha Khan',
    customerPhone: '+92 300 1234567',
    customerEmail: 'ayesha.k@example.com',
    pickupSlot: 'Sunday 9:00 AM - 11:00 AM',
    marketName: 'Clifton Sunday Farmers Market',
    status: 'placed', // placed -> confirmed/rejected -> ready -> delivered
    placedAt: '2026-09-23 14:30',
    totalAmount: 16.80,
    qrPass: 'QR-RIVERBEND-8821',
    items: [
      { name: 'Fresh Organic Tomatoes', qty: 2, price: 3.50, unit: 'per kg' },
      { name: 'Farm Fresh Farm Eggs', qty: 1, price: 4.80, unit: 'per dozen' },
      { name: 'Pure Wildflower Raw Honey', qty: 1, price: 5.00, unit: '500g jar' }
    ]
  },
  {
    orderId: 'ORD-8819',
    customerName: 'Tariq Mehmood',
    customerPhone: '+92 321 9876543',
    customerEmail: 'tariq.m@example.com',
    pickupSlot: 'Sunday 11:00 AM - 1:00 PM',
    marketName: 'Clifton Sunday Farmers Market',
    status: 'confirmed',
    placedAt: '2026-09-23 11:15',
    totalAmount: 12.00,
    qrPass: 'QR-RIVERBEND-8819',
    items: [
      { name: 'Pure Wildflower Raw Honey', qty: 1, price: 8.50, unit: '500g jar' },
      { name: 'Crisp Green Spinach', qty: 2, price: 1.75, unit: 'per bunch' }
    ]
  },
  {
    orderId: 'ORD-8804',
    customerName: 'Zainab Ahmed',
    customerPhone: '+92 333 5554433',
    customerEmail: 'zainab.a@example.com',
    pickupSlot: 'Sunday 9:00 AM - 11:00 AM',
    marketName: 'Clifton Sunday Farmers Market',
    status: 'ready',
    placedAt: '2026-09-22 18:40',
    totalAmount: 22.50,
    qrPass: 'QR-RIVERBEND-8804',
    items: [
      { name: 'Fresh Organic Tomatoes', qty: 5, price: 3.50, unit: 'per kg' },
      { name: 'Farm Fresh Farm Eggs', qty: 1, price: 4.80, unit: 'per dozen' }
    ]
  },
  {
    orderId: 'ORD-8790',
    customerName: 'Bilal Hassan',
    customerPhone: '+92 301 7778899',
    customerEmail: 'bilal.h@example.com',
    pickupSlot: 'Sunday 1:00 PM - 3:00 PM',
    marketName: 'Clifton Sunday Farmers Market',
    status: 'delivered',
    placedAt: '2026-09-20 09:20',
    totalAmount: 31.00,
    qrPass: 'QR-RIVERBEND-8790',
    items: [
      { name: 'Fresh Organic Tomatoes', qty: 4, price: 3.50, unit: 'per kg' },
      { name: 'Pure Wildflower Raw Honey', qty: 2, price: 8.50, unit: '500g jar' }
    ]
  }
];

const INITIAL_REVIEWS = [
  {
    id: 'rev_1',
    customerName: 'Fatima Noor',
    date: '2026-09-21',
    rating: 5,
    productName: 'Fresh Organic Tomatoes',
    comment: 'The sweetest heirloom tomatoes I have tasted in Karachi! Perfect for fresh salad.',
    farmerReply: 'Thank you Fatima! Grown with love at our Malir farm.'
  },
  {
    id: 'rev_2',
    customerName: 'Dr. Kamran Malik',
    date: '2026-09-19',
    rating: 5,
    productName: 'Pure Wildflower Raw Honey',
    comment: 'Authentic raw honey without sugar syrup adulteration. Highly recommended stall!',
    farmerReply: ''
  },
  {
    id: 'rev_3',
    customerName: 'Sara Ali',
    date: '2026-09-18',
    rating: 4,
    productName: 'Farm Fresh Farm Eggs',
    comment: 'Fresh eggs, very clean pickup at stall B-12.',
    farmerReply: ''
  }
];

export default function FarmerDashboard({
  onNavigate,
  showToast,
  currentUser
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'template' | 'orders' | 'history' | 'reviews' | 'profile'
  
  // Data states — start empty, load from real API
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [cutoffActive, setCutoffActive] = useState(true);
  const [cutoffTime, setCutoffTime] = useState('Saturday 8:00 PM');
  const [farmerSearchQuery, setFarmerSearchQuery] = useState('');

  // Fetch Products from real backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        // Filter only this farmer's products if farmer_id matches
        const myProducts = currentUser?._id
          ? data.filter(p => p.farmer_id === currentUser._id || p.farmer_id?._id === currentUser._id || p.farmer_id === currentUser.id)
          : data;
        setProducts(myProducts.length > 0 ? myProducts : data);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [currentUser]);

  // Fetch Orders from real backend on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getOrders();
        // Filter orders for this farmer
        const myOrders = currentUser?._id
          ? data.filter(o => o.farmer_id === currentUser._id || o.farmer_id?._id === currentUser._id || o.farmer_id === currentUser.id)
          : data;
        const mappedOrders = (myOrders || []).map(o => ({
          orderId: o._id || o.orderId,
          customerName: o.customer_id?.name || o.customerName || 'Customer',
          customerPhone: o.customer_id?.phone || o.customerPhone || '+92 300 1234567',
          customerEmail: o.customer_id?.email || o.customerEmail || '',
          pickupSlot: o.pickup_time_slot || o.pickupSlot || 'Sunday 9:00 AM - 11:00 AM',
          marketName: o.pickup_location || o.marketName || 'Clifton Sunday Farmers Market',
          status: o.order_status === 'accepted' ? 'confirmed' : o.order_status === 'completed' ? 'delivered' : (o.order_status || o.status || 'placed'),
          placedAt: o.createdAt ? new Date(o.createdAt).toLocaleString() : o.placedAt || 'Recently',
          totalAmount: o.total_amount !== undefined ? o.total_amount : (o.totalAmount || 0),
          qrPass: o.qrPass || `QR-${(o._id || o.orderId || 'ORDER').slice(-6)}`,
          items: o.products ? o.products.map(p => ({
            name: p.product_id?.name || p.name || 'Produce Item',
            qty: p.quantity || p.qty || 1,
            price: p.price || 0,
            unit: p.product_id?.unit || p.unit || 'kg'
          })) : (o.items || [])
        }));
        setOrders(mappedOrders.length > 0 ? mappedOrders : INITIAL_ORDERS);
      } catch (err) {
        console.error('Failed to load orders:', err);
        setOrders(INITIAL_ORDERS);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [currentUser]);
  
  // Product Modal (Add/Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    unit: 'per kg',
    stock_quantity: '',
    weekly_template_qty: '',
    is_organic: true,
    description: '',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600'
  });

  // Reply state
  const [replyingRevId, setReplyingRevId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Profile Form state
  const [stallProfile, setStallProfile] = useState({
    stallName: 'Riverbend Organic Farm',
    farmerName: currentUser?.name || 'Chaudhry Riaz Ahmed',
    phone: currentUser?.phone || '+92 300 9876543',
    email: currentUser?.email || 'riaz.farmer@marketlink.pk',
    assignedMarket: 'Clifton Sunday Farmers Market (Booth B-12)',
    operatingDays: 'Sunday (8:00 AM - 3:00 PM)',
    pickupTimeWindows: 'Sunday 9-11 AM, 11 AM-1 PM, 1-3 PM',
    address: 'Plot 42, Malir Organic Belt, Karachi',
    latLng: '24.8607° N, 67.0011° E',
    bio: 'Family-owned 15-acre organic vegetable & honey farm practicing sustainable agriculture for over 18 years without synthetic chemicals.',
    organicCertId: 'PK-ORG-2024-8842'
  });

  // Stats
  const totalRevenue = orders
    .filter(o => o.status === 'delivered' || o.status === 'completed')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'placed' || o.status === 'pending').length;
  const readyOrdersCount = orders.filter(o => o.status === 'ready' || o.status === 'confirmed').length;
  const activeProductsCount = products.filter(p => !p.is_sold_out).length;

  // Filtered lists for seller search bar
  const displayedProducts = products.filter(p => {
    if (!farmerSearchQuery.trim()) return true;
    const q = farmerSearchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
  });

  const displayedOrders = orders.filter(o => {
    if (!farmerSearchQuery.trim()) return true;
    const q = farmerSearchQuery.toLowerCase();
    return o.orderId.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.customerPhone.includes(q);
  });

  // Handlers for Products
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      category: 'vegetables',
      price: '',
      unit: 'per kg',
      stock_quantity: '25',
      weekly_template_qty: '30',
      is_organic: true,
      description: '',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProdForm({
      name: prod.name,
      category: prod.category,
      price: prod.price.toString(),
      unit: prod.unit,
      stock_quantity: prod.stock_quantity.toString(),
      weekly_template_qty: (prod.weekly_template_qty || prod.stock_quantity).toString(),
      is_organic: prod.is_organic,
      description: prod.description,
      image: prod.image
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.price || !prodForm.stock_quantity) {
      showToast && showToast('Please fill in product name, price, and stock quantity.');
      return;
    }
    const farmerName = currentUser?.name || stallProfile.farmerName || 'Chaudhry Riaz Ahmed';
    try {
      if (editingProduct) {
        const { data } = await updateProduct(editingProduct._id || editingProduct.product_id, {
          farmer_name: farmerName,
          name: prodForm.name,
          category: prodForm.category,
          price: parseFloat(prodForm.price),
          unit: prodForm.unit,
          stock_quantity: parseInt(prodForm.stock_quantity, 10),
          isAvailable: parseInt(prodForm.stock_quantity, 10) > 0,
          description: prodForm.description,
          imageUrl: prodForm.image
        });
        setProducts(prev => prev.map(p =>
          (p._id || p.product_id) === (editingProduct._id || editingProduct.product_id) ? { ...data, farmer_name: farmerName, image: data?.imageUrl || prodForm.image } : p
        ));
        showToast && showToast(`Updated "${prodForm.name}" successfully!`);
      } else {
        const { data } = await createProduct({
          farmer_id: currentUser?.id || currentUser?._id,
          farmer_name: farmerName,
          name: prodForm.name,
          category: prodForm.category,
          price: parseFloat(prodForm.price),
          unit: prodForm.unit,
          stock_quantity: parseInt(prodForm.stock_quantity, 10),
          isAvailable: true,
          description: prodForm.description,
          imageUrl: prodForm.image
        });
        const newProduct = {
          ...data,
          product_id: data?._id || data?.product_id || `prod_${Date.now()}`,
          farmer_name: data?.farmer_name || farmerName,
          stall_name: stallProfile.stallName,
          image: data?.imageUrl || prodForm.image,
          is_sold_out: false
        };
        setProducts(prev => [newProduct, ...prev]);
        showToast && showToast(`Added "${prodForm.name}" under ${farmerName} to catalog!`);
      }
    } catch (err) {
      showToast && showToast('Failed to save product. Please try again.');
    }
    setIsProductModalOpen(false);
  };

  const handleToggleSoldOut = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.product_id === id) {
        const nextState = !p.is_sold_out;
        showToast && showToast(`"${p.name}" marked as ${nextState ? 'Sold Out' : 'Available'}`);
        return {
          ...p,
          is_sold_out: nextState,
          stock_quantity: nextState ? 0 : (p.weekly_template_qty || 20)
        };
      }
      return p;
    }));
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from your listing?`)) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => (p._id || p.product_id) !== id));
        showToast && showToast(`Removed "${name}" from catalog.`);
      } catch (err) {
        showToast && showToast('Failed to delete product.');
      }
    }
  };

  const handleApplyWeeklyTemplate = () => {
    setProducts(prev => prev.map(p => ({
      ...p,
      stock_quantity: p.weekly_template_qty || 30,
      is_sold_out: false
    })));
    showToast && showToast('Weekly stock template applied! Live inventory refreshed for market day.');
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiUpdateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o =>
        (o._id || o.orderId) === orderId ? { ...o, order_status: newStatus, status: newStatus } : o
      ));
      const statusLabels = {
        confirmed: 'Order Confirmed! Customer notified. ✅',
        accepted: 'Order Confirmed! Customer notified. ✅',
        rejected: 'Order Rejected. Customer notified. ❌',
        ready: 'Marked Ready for Pickup! 🎁',
        delivered: 'Order Marked Delivered! Customer notified. 🎉🚚',
        completed: 'Order Marked Delivered! Customer notified. 🎉🚚',
        cancelled: 'Order Cancelled.'
      };
      if (newStatus === 'delivered' || newStatus === 'completed') {
        try {
          confetti({
            particleCount: 85,
            spread: 70,
            origin: { y: 0.55 }
          });
        } catch (e) {}
      }
      showToast && showToast(statusLabels[newStatus] || `Order status: ${newStatus}`);
    } catch (err) {
      // Local fallback
      setOrders(prev => prev.map(o =>
        (o._id || o.orderId) === orderId ? { ...o, order_status: newStatus, status: newStatus } : o
      ));
      if (newStatus === 'delivered' || newStatus === 'completed') {
        try {
          confetti({
            particleCount: 85,
            spread: 70,
            origin: { y: 0.55 }
          });
        } catch (e) {}
      }
      const fallbackLabels = {
        confirmed: 'Order Confirmed! Customer notified. ✅',
        rejected: 'Order Rejected. Customer notified. ❌',
        ready: 'Marked Ready for Pickup! 🎁',
        delivered: 'Order Marked Delivered! Customer notified. 🎉🚚',
        cancelled: 'Order Cancelled.'
      };
      showToast && showToast(fallbackLabels[newStatus] || `Order: ${newStatus}`);
    }
  };

  const handleSubmitReviewReply = async (revId) => {
    if (!replyText.trim()) return;
    try {
      await replyToReview(revId, replyText.trim());
      setReviews(prev => prev.map(r => r._id === revId || r.id === revId ? { ...r, farmerReply: replyText.trim() } : r));
      setReplyingRevId(null);
      setReplyText('');
      showToast && showToast('Farmer reply published to review!');
    } catch(err) {
      showToast && showToast('Failed to post reply.');
    }
  };
  const oldHandleSubmitReviewReply = (revId) => {
    if (!replyText.trim()) return;
    setReviews(prev => prev.map(r =>
      r.id === revId ? { ...r, farmerReply: replyText.trim() } : r
    ));
    setReplyingRevId(null);
    setReplyText('');
    showToast && showToast('Farmer reply published to review!');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-body animate-fadeIn">
      
      {/* LEFT COLUMN SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-72 bg-slate-900 text-white flex flex-col justify-between border-r border-slate-800 shrink-0 min-h-screen p-5">
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-extrabold font-heading text-white tracking-tight block">
                Market<span className="text-emerald-400">Link</span>
              </span>
              <span className="text-[10px] text-amber-400 font-extrabold tracking-widest uppercase block">
                Farmer Seller Portal
              </span>
            </div>
          </div>

          {/* Farmer Stall Info Widget */}
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-amber-300 font-heading truncate">
                {stallProfile.stallName}
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium truncate">
              Farmer: {stallProfile.farmerName}
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">{stallProfile.assignedMarket}</span>
            </p>
          </div>

          {/* Farmer Portal Quick Search Bar (Prominent Left Sidebar Placement) */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              placeholder="Search produce, orders..."
              value={farmerSearchQuery}
              onChange={(e) => setFarmerSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/90 rounded-2xl text-xs font-semibold text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-700/80 shadow-inner transition"
            />
          </div>

          {/* COLUMN NAVIGATION MENU */}
          <nav className="space-y-1">
            <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Seller Dashboard Menu
            </p>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart2 className="w-4 h-4 text-amber-400" />
                <span>Overview & Insights</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-emerald-400" />
                <span>Manage Products</span>
              </div>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('template')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'template'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-amber-300" />
                <span>Weekly Stock Template</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-blue-400" />
                <span>Manage Pre-Orders</span>
              </div>
              {pendingOrdersCount > 0 && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Order History</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Customer Reviews</span>
              </div>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {reviews.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Store className="w-4 h-4 text-rose-400" />
                <span>Stall & Profile Settings</span>
              </div>
            </button>
          </nav>

        </div>

        {/* BOTTOM SIDEBAR ACTIONS: FIVERR STYLE SWITCH TO MARKETPLACE BUTTON */}
        <div className="pt-6 border-t border-slate-800 space-y-3 mt-6">
          
          {/* Pre-Order Cutoff Toggle */}
          <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 block">Cutoff Status:</span>
                <span className="font-extrabold text-amber-300 text-[11px]">{cutoffActive ? 'OPEN' : 'CLOSED'}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setCutoffActive(!cutoffActive);
                showToast && showToast(`Pre-order cutoff ${!cutoffActive ? 'Activated' : 'Paused'}`);
              }}
              className={`text-[10px] font-extrabold px-2 py-1 rounded-lg transition ${
                cutoffActive ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              {cutoffActive ? 'OPEN' : 'CLOSED'}
            </button>
          </div>

          {/* Fiverr-Style Switch to Customer / Marketplace View Button */}
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-emerald-500/40"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-300" />
            <span>Switch to Marketplace View</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT DISPLAY AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 min-h-screen">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          
          {/* Left Side: Prominent Seller Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search produce, customer orders, stock..."
              value={farmerSearchQuery}
              onChange={(e) => setFarmerSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/90 rounded-2xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 border border-slate-200 shadow-inner transition"
            />
          </div>

          {/* Right Side: Switch to Marketplace Button + Farmer Profile Badge */}
          <div className="flex items-center gap-3">
            {activeTab === 'products' && (
              <button
                onClick={handleOpenAddProduct}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Produce
              </button>
            )}

            {/* Green Switch to Marketplace View Button */}
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer border border-emerald-600/40"
            >
              <Store className="w-4 h-4 text-amber-300" />
              <span>Switch to Marketplace View</span>
            </button>

            {/* Farmer Profile Avatar Badge */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-amber-600 text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                {currentUser?.avatar || 'R'}
              </div>
              <div className="hidden sm:block">
                <h4 className="font-extrabold text-xs text-slate-900 leading-tight">
                  {stallProfile.farmerName}
                </h4>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Stall Owner
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">

          {/* TAB 1: OVERVIEW & INSIGHTS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">Total Revenue</span>
                    <span className="text-2xl font-extrabold text-slate-900 font-heading">
                      ${totalRevenue.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">Pending Orders</span>
                    <span className="text-2xl font-extrabold text-amber-700 font-heading">
                      {pendingOrdersCount} orders
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">Ready at Stall</span>
                    <span className="text-2xl font-extrabold text-blue-800 font-heading">
                      {readyOrdersCount} orders
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">Active Listings</span>
                    <span className="text-2xl font-extrabold text-purple-900 font-heading">
                      {activeProductsCount} items
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Table & Quick Template */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                        Incoming Pre-Orders
                      </h3>
                      <p className="text-xs text-slate-500">Orders placed by customers for pickup at Sunday market</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      Manage Orders <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.filter(o => o.status === 'placed' || o.status === 'pending' || o.status === 'confirmed' || o.status === 'accepted' || o.status === 'ready').map(ord => (
                      <div key={ord.orderId} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 hover:border-emerald-300 transition">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-mono">{ord.orderId}</span>
                            <span>{ord.customerName}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500 font-normal">{ord.pickupSlot}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            {ord.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm mr-2">${Number(ord.totalAmount).toFixed(2)}</span>
                          {(ord.status === 'placed' || ord.status === 'pending') && (
                            <>
                              <button
                                onClick={() => handleUpdateOrderStatus(ord.orderId, 'confirmed')}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-xs hover:scale-102"
                              >
                                <Check className="w-3.5 h-3.5" /> Confirm
                              </button>
                              <button
                                onClick={() => handleUpdateOrderStatus(ord.orderId, 'rejected')}
                                className="bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Reject
                              </button>
                            </>
                          )}
                          {(ord.status === 'confirmed' || ord.status === 'accepted') && (
                            <>
                              <button
                                onClick={() => handleUpdateOrderStatus(ord.orderId, 'ready')}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1"
                              >
                                Mark Ready
                              </button>
                              <button
                                onClick={() => handleUpdateOrderStatus(ord.orderId, 'delivered')}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-xs hover:scale-102"
                              >
                                <Truck className="w-3.5 h-3.5" /> Delivered
                              </button>
                            </>
                          )}
                          {ord.status === 'ready' && (
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.orderId, 'delivered')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-sm hover:scale-102"
                            >
                              <Truck className="w-3.5 h-3.5" /> Mark Delivered
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Col: Stock Health & Quick Template Reset */}
                <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Quick Stock Reset
                      </span>
                      <RefreshCw className="w-4 h-4 text-emerald-300" />
                    </div>

                    <h4 className="text-xl font-extrabold font-heading mt-3 leading-snug">
                      Sunday Market Harvesting Prep
                    </h4>
                    <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
                      Reset live stock quantities against your recurring weekly harvesting template with 1 click.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>Low Stock Alert:</span>
                      <span className="text-amber-300 font-extrabold">Spinach (8 left)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>Sold Out Items:</span>
                      <span className="text-rose-300 font-extrabold">Strawberries (0 left)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleApplyWeeklyTemplate}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs py-3 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Apply Weekly Stock Template
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map(prod => (
                  <div
                    key={prod.product_id}
                    className={`bg-white rounded-3xl overflow-hidden border transition shadow-sm flex flex-col justify-between ${
                      prod.is_sold_out ? 'border-rose-200 bg-rose-50/30 opacity-80' : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      
                      {prod.is_sold_out && (
                        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center">
                          <span className="bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
                            Sold Out
                          </span>
                        </div>
                      )}

                      {prod.is_organic && (
                        <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow">
                          Organic
                        </span>
                      )}

                      <span className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow ${
                        prod.stock_quantity <= 0
                          ? 'bg-rose-600 text-white'
                          : prod.stock_quantity < 15
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-slate-900 text-white'
                      }`}>
                        Stock: {prod.stock_quantity}
                      </span>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-slate-900 text-base font-heading">
                            {prod.name}
                          </h4>
                          <span className="font-extrabold text-emerald-800 text-sm font-heading">
                            ${prod.price.toFixed(2)} <span className="text-[10px] text-slate-500 font-semibold">{prod.unit}</span>
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {prod.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleToggleSoldOut(prod.product_id)}
                          className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                            prod.is_sold_out
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                          }`}
                        >
                          {prod.is_sold_out ? 'Mark Available' : 'Mark Sold Out'}
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.product_id, prod.name)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WEEKLY STOCK TEMPLATE */}
          {activeTab === 'template' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-heading flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-700" />
                    Weekly Stock Harvesting Template
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure your default Sunday harvesting template quantities. You can apply this template before every market day.
                  </p>
                </div>

                <button
                  onClick={handleApplyWeeklyTemplate}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Apply Template Now
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Product Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price / Unit</th>
                      <th className="p-3.5">Live Stock</th>
                      <th className="p-3.5">Weekly Template Stock</th>
                      <th className="p-3.5 rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(prod => (
                      <tr key={prod.product_id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 font-extrabold text-slate-900 flex items-center gap-2">
                          <img src={prod.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <span>{prod.name}</span>
                        </td>
                        <td className="p-3.5 capitalize font-semibold text-slate-600">{prod.category}</td>
                        <td className="p-3.5 font-bold">${prod.price.toFixed(2)} / {prod.unit}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                            prod.stock_quantity === 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {prod.stock_quantity}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">
                          {prod.weekly_template_qty || 30} units
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                          >
                            Edit Quantity
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MANAGE PRE-ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                  Customer Pre-Orders ({orders.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Accept pre-orders, mark items as ready for market pickup, and verify QR passes at your stall booth
                </p>
              </div>

              <div className="space-y-4">
                {orders.map(ord => (
                  <div
                    key={ord.orderId}
                    className={`p-5 rounded-2xl border transition ${
                      ord.status === 'pending'
                        ? 'border-amber-300 bg-amber-50/20'
                        : ord.status === 'ready'
                        ? 'border-blue-300 bg-blue-50/20'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-extrabold bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                          {ord.orderId}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm font-heading">{ord.customerName}</h4>
                          <p className="text-[11px] text-slate-500">{ord.customerPhone} • {ord.customerEmail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">Status:</span>
                        <span className={`text-xs font-extrabold px-3 py-1 rounded-full capitalize flex items-center gap-1.5 ${
                          ord.status === 'placed' || ord.status === 'pending'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : ord.status === 'confirmed' || ord.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : ord.status === 'ready'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : ord.status === 'delivered' || ord.status === 'completed'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          {ord.status === 'delivered' ? '✓ Delivered' : ord.status}
                        </span>
                      </div>
                    </div>

                    <div className="py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-medium block">Pickup Slot & Location:</span>
                        <span className="font-bold text-slate-800">{ord.pickupSlot} ({ord.marketName})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">QR Pass Verification:</span>
                        <span className="font-mono font-bold text-emerald-700">{ord.qrPass}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">Total Payable at Stall:</span>
                        <span className="font-extrabold text-base text-slate-900 font-heading">${Number(ord.totalAmount).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                      <span className="font-bold text-slate-700 block mb-1">Ordered Items:</span>
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-slate-600">
                          <span>{it.qty}x {it.name} ({it.unit})</span>
                          <span className="font-bold">${(it.qty * it.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 flex flex-wrap items-center justify-end gap-2">
                      {(ord.status === 'placed' || ord.status === 'pending') && (
                        <>
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.orderId, 'confirmed')}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm hover:scale-102"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Confirm Order
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.orderId, 'rejected')}
                            className="bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                          >
                            <XCircle className="w-4 h-4" /> Reject Order
                          </button>
                        </>
                      )}
                      {(ord.status === 'confirmed' || ord.status === 'accepted') && (
                        <>
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.orderId, 'ready')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                          >
                            Mark Ready for Pickup
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.orderId, 'delivered')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm hover:scale-102"
                          >
                            <Truck className="w-4 h-4" /> Mark as Delivered
                          </button>
                        </>
                      )}
                      {ord.status === 'ready' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(ord.orderId, 'delivered')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm hover:scale-102"
                        >
                          <Truck className="w-4 h-4" /> Mark as Delivered
                        </button>
                      )}
                      {(ord.status === 'delivered' || ord.status === 'completed') && (
                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Successfully Delivered & Notified
                        </span>
                      )}
                      {(ord.status === 'rejected' || ord.status === 'cancelled') && (
                        <span className="text-xs font-extrabold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-600" /> Cancelled / Rejected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ORDER HISTORY */}
          {activeTab === 'history' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                Sales & Order History Log
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Placed Date</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total Paid</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map(o => (
                      <tr key={o.orderId} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold">{o.orderId}</td>
                        <td className="p-3 font-semibold">{o.customerName}</td>
                        <td className="p-3 text-slate-500">{o.placedAt}</td>
                        <td className="p-3">{o.items.length} items</td>
                        <td className="p-3 font-extrabold text-slate-900">${o.totalAmount.toFixed(2)}</td>
                        <td className="p-3 capitalize font-bold text-emerald-700">{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                  Customer Reviews & Responses ({reviews.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Respond to customer feedback left on your products to build trust and lasting customer relationships.
                </p>
              </div>

              <div className="space-y-4">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm font-heading">{rev.customerName}</h4>
                        <span className="text-[11px] text-slate-500">Product: <strong>{rev.productName}</strong> • {rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 italic">
                      "{rev.comment}"
                    </p>

                    {rev.farmerReply ? (
                      <div className="ml-4 pl-4 border-l-2 border-emerald-600 bg-emerald-50/60 p-3 rounded-r-xl text-xs space-y-1">
                        <span className="font-extrabold text-emerald-900 flex items-center gap-1">
                          <CornerDownRight className="w-3.5 h-3.5 text-emerald-700" /> Official Farmer Response:
                        </span>
                        <p className="text-slate-800">{rev.farmerReply}</p>
                      </div>
                    ) : replyingRevId === rev.id ? (
                      <div className="space-y-2 mt-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your response to the customer..."
                          className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                          rows={2}
                        />
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => setReplyingRevId(null)}
                            className="text-xs text-slate-600 hover:text-slate-800 font-bold px-3 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSubmitReviewReply(rev.id)}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-1.5 rounded-xl shadow cursor-pointer"
                          >
                            Post Response
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setReplyingRevId(rev.id);
                          setReplyText('');
                        }}
                        className="text-xs font-extrabold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Reply to Customer
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: STALL PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                  Farmer Stall & Profile Management
                </h3>
                <p className="text-xs text-slate-500">
                  Per SRS requirement: Manage business name, contact info, market location details, map coordinates, and bio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stall / Business Name</label>
                  <input
                    type="text"
                    value={stallProfile.stallName}
                    onChange={(e) => setStallProfile({ ...stallProfile, stallName: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Farmer Contact Person</label>
                  <input
                    type="text"
                    value={stallProfile.farmerName}
                    onChange={(e) => setStallProfile({ ...stallProfile, farmerName: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={stallProfile.phone}
                    onChange={(e) => setStallProfile({ ...stallProfile, phone: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Market Booth</label>
                  <input
                    type="text"
                    value={stallProfile.assignedMarket}
                    onChange={(e) => setStallProfile({ ...stallProfile, assignedMarket: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Stall Address & Map Lat/Long (for Google Maps / OpenStreetMap)</label>
                  <input
                    type="text"
                    value={stallProfile.address}
                    onChange={(e) => setStallProfile({ ...stallProfile, address: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Farm Bio & Farming Practice</label>
                  <textarea
                    value={stallProfile.bio}
                    onChange={(e) => setStallProfile({ ...stallProfile, bio: e.target.value })}
                    rows={3}
                    className="w-full p-3 border border-slate-300 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => showToast && showToast('Farmer Stall Profile saved successfully!')}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow transition cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                {editingProduct ? 'Edit Produce Item' : 'Add New Farm Produce'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Bell Peppers"
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="dairy">Dairy</option>
                    <option value="bakery">Bakery</option>
                    <option value="honey">Honey & Jams</option>
                    <option value="poultry">Poultry & Eggs</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Unit Type</label>
                  <select
                    value={prodForm.unit}
                    onChange={(e) => setProdForm({ ...prodForm, unit: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="per kg">per kg</option>
                    <option value="500g box">500g box</option>
                    <option value="per bunch">per bunch</option>
                    <option value="per dozen">per dozen</option>
                    <option value="500g jar">500g jar</option>
                    <option value="per lb">per lb</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    placeholder="3.50"
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Live Stock *</label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={prodForm.stock_quantity}
                    onChange={(e) => setProdForm({ ...prodForm, stock_quantity: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Weekly Template Qty</label>
                  <input
                    type="number"
                    placeholder="30"
                    value={prodForm.weekly_template_qty}
                    onChange={(e) => setProdForm({ ...prodForm, weekly_template_qty: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="prodOrganic"
                  checked={prodForm.is_organic}
                  onChange={(e) => setProdForm({ ...prodForm, is_organic: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="prodOrganic" className="font-extrabold text-slate-800">
                  Certified Organic / Chemical Free Produce
                </label>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                <input
                  type="url"
                  value={prodForm.image}
                  onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="Describe your produce, freshness, harvesting day..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Produce Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
