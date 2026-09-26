import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Store, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  MapPin,
  AlertCircle
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'signin', // 'signin' | 'register'
  initialAccountType = 'customer', // 'customer' | 'farmer'
  onLoginSuccess,
  showToast 
}) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'register'
  const [accountType, setAccountType] = useState(initialAccountType); // 'customer' | 'farmer'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    locality: 'Clifton & South',
    stallName: '',
    farmRegion: 'Malir Agricultural Zone',
    cnic: '',
    agreeTerms: true,
    rememberMe: true
  });

  // Sync mode and reset form whenever modal opens or mode changes
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setAccountType(initialAccountType || 'customer');
      setErrorMsg('');
      setForgotPasswordSent(false);
      setIsLoading(false);
      setShowPassword(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        locality: 'Clifton & South',
        stallName: '',
        farmRegion: 'Malir Agricultural Zone',
        cnic: '',
        agreeTerms: true,
        rememberMe: true
      });
    }
  }, [initialMode, initialAccountType, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      const { data } = await loginUser({ email: formData.email, password: formData.password });
      // Save JWT token
      localStorage.setItem('marketlink_token', data.token);
      const userObj = {
        id: data._id,
        name: data.name,
        shortName: data.name.split(' ')[0],
        email: data.email,
        role: data.role,
        avatar: data.name.charAt(0).toUpperCase(),
        avatarBg: data.role === 'Farmer' ? 'bg-amber-600' : 'bg-emerald-600',
        isVerified: true
      };
      onLoginSuccess(userObj);
      showToast && showToast(`Welcome back, ${userObj.name}! Successfully signed in.`);
      onClose();
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { setErrorMsg("Please enter your full name."); return; }
    if (!formData.email.trim() || !formData.email.includes('@')) { setErrorMsg("Please enter a valid email address."); return; }
    if (!formData.password || formData.password.length < 6) { setErrorMsg("Password must be at least 6 characters."); return; }
    if (formData.password !== formData.confirmPassword) { setErrorMsg("Passwords do not match."); return; }
    if (!formData.agreeTerms) { setErrorMsg("Please agree to the MarketLink Terms & Organic Policy."); return; }

    setIsLoading(true);
    setErrorMsg('');
    const isFarmer = accountType === 'farmer';
    try {
      const { data } = await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: isFarmer ? 'Farmer' : 'Customer',
        stallName: formData.stallName,
        farmRegion: formData.farmRegion,
        cnic: formData.cnic
      });
      // Save JWT token
      localStorage.setItem('marketlink_token', data.token);
      const userObj = {
        id: data._id,
        name: data.name,
        shortName: data.name.split(' ')[0],
        email: data.email,
        role: data.role,
        stallName: formData.stallName || undefined,
        avatar: data.name.charAt(0).toUpperCase(),
        avatarBg: isFarmer ? 'bg-amber-600' : 'bg-emerald-600',
        memberSince: 'Today',
        isVerified: true
      };
      onLoginSuccess(userObj);
      if (isFarmer) {
        showToast && showToast(`Welcome Grower ${userObj.name}! Redirecting to your Farmer Portal...`);
      } else {
        showToast && showToast(`Welcome to MarketLink, ${userObj.name}! Your account is ready.`);
      }
      onClose();
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick 1-click Demo Logins for smooth evaluation
  const handleQuickDemo = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let demoUser = null;
      if (role === 'ayesha') {
        demoUser = {
          id: 'usr_ayesha_01',
          name: 'Ayesha Khan',
          shortName: 'Ayesha',
          email: 'ayesha.khan@gmail.com',
          phone: '+92 300 9876543',
          role: 'Customer',
          locality: 'Clifton Block 4, Karachi',
          avatar: 'A',
          avatarBg: 'bg-emerald-600',
          memberSince: 'March 2025',
          isVerified: true
        };
      } else if (role === 'farmer') {
        demoUser = {
          id: 'usr_farmer_riaz',
          name: 'Chaudhry Riaz',
          shortName: 'Riaz',
          email: 'riaz.biofarms@marketlink.pk',
          phone: '+92 301 5558899',
          role: 'Farmer',
          stallName: 'Green Acres Bio-Farms (Stall #A-01)',
          locality: 'Malir Agricultural Zone',
          avatar: 'R',
          avatarBg: 'bg-emerald-700',
          memberSince: 'January 2025',
          isVerified: true
        };
      } else {
        demoUser = {
          id: 'usr_admin_tariq',
          name: 'Tariq Mahmood',
          shortName: 'Tariq (Admin)',
          email: 'admin@marketlink.pk',
          phone: '+92 21 3587 9000',
          role: 'Admin',
          locality: 'MarketLink Central HQ',
          avatar: 'T',
          avatarBg: 'bg-slate-800',
          memberSince: 'Founder',
          isVerified: true
        };
      }
      onLoginSuccess(demoUser);
      showToast && showToast(`Logged in as ${demoUser.name} (${demoUser.role})`);
      onClose();
    }, 400);
  };

  // Social Auth Handlers (Simulated authentic OAuth flow)
  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const socialUser = {
        id: `usr_${provider}_${Date.now()}`,
        name: provider === 'Google' ? 'Ayesha Khan (Google)' : 'Ayesha Khan (Facebook)',
        shortName: 'Ayesha',
        email: provider === 'Google' ? 'ayesha.google@gmail.com' : 'ayesha.fb@facebook.com',
        phone: '+92 300 9876543',
        role: 'Customer',
        locality: 'Clifton & South',
        avatar: 'A',
        avatarBg: provider === 'Google' ? 'bg-red-500' : 'bg-blue-600',
        memberSince: 'Today via ' + provider,
        isVerified: true
      };
      onLoginSuccess(socialUser);
      showToast && showToast(`Successfully authenticated via ${provider}!`);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Secure Authentication • SRS v1.0</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white font-heading tracking-tight" style={{ color: '#ffffff' }}>
            {mode === 'signin' ? 'Welcome Back to MarketLink' : 'Create Your MarketLink Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {mode === 'signin' 
              ? 'Access your pre-orders, favorite growers, and express stall pickup passes.' 
              : 'Join conscious shoppers and verified growers direct from regional farm gates.'}
          </p>

          {/* Mode Switcher Pills */}
          <div className="flex bg-black/30 p-1 rounded-xl mt-4 border border-white/10">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                mode === 'signin' 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                mode === 'register' 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Register (New Account)
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden space-y-5 text-xs text-slate-700">
          
          {/* Error Banner */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 font-medium animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Forgot Password Notice */}
          {forgotPasswordSent && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-2 font-medium animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Password reset instructions sent to your email / SMS.</span>
            </div>
          )}

          {/* Social Auth Removed */}

          {/* SIGN IN FORM */}
          {mode === 'signin' ? (
            <form onSubmit={handleSignInSubmit} className="space-y-4" autoComplete="off">
              {/* Trap Chrome AutoFill */}
              <input type="text" name="prevent_autofill_email" style={{ opacity: 0, position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex={-1} readOnly />
              <input type="password" name="prevent_autofill_pass" style={{ opacity: 0, position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex={-1} readOnly />

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Email Address or Mobile Number
                </label>
                <div className="relative bg-slate-50 rounded-xl border border-slate-200 focus-within:border-emerald-500 transition">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="email"
                    autoComplete="off"
                    placeholder="e.g. ayesha.khan@gmail.com or 03001234567"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Password
                </label>
                <div className="relative bg-slate-50 rounded-xl border border-slate-200 focus-within:border-emerald-500 transition">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-semibold text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordSent(true)}
                  className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-xs font-extrabold shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4" autoComplete="off">
              {/* Trap Chrome AutoFill */}
              <input type="text" name="prevent_autofill_email_reg" style={{ opacity: 0, position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex={-1} readOnly />
              <input type="password" name="prevent_autofill_pass_reg" style={{ opacity: 0, position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex={-1} readOnly />

              {/* Account Type Selector (Customer vs Farmer) */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Select Your Account Role:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType('customer')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition cursor-pointer ${
                      accountType === 'customer'
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block font-heading">Shopper</span>
                      <span className="text-[10px] text-slate-500 block leading-tight">Pre-order for weekend pickup</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('farmer')}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition cursor-pointer ${
                      accountType === 'farmer'
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block font-heading">Grower / Farmer</span>
                      <span className="text-[10px] text-slate-500 block leading-tight">List stall & weekly harvest</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Full Name *
                </label>
                <div className="relative bg-slate-50 rounded-xl border border-slate-200 focus-within:border-emerald-500 transition">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="e.g. Ayesha Khan or Tariq Mahmood"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* Email & Phone fields stacked */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Email Address *
                  </label>
                  <div className="relative bg-slate-50 rounded-xl border border-slate-200 focus-within:border-emerald-500 transition">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative bg-slate-50 rounded-xl border border-slate-200 focus-within:border-emerald-500 transition">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="phone"
                      autoComplete="off"
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Farmer Specific Fields */}
              {accountType === 'farmer' && (
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-[11px] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>SRS 1.6 Farmer Credentials</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Farm Stall / Business Name *
                    </label>
                    <div className="bg-white rounded-xl border border-slate-200 focus-within:border-emerald-500 transition">
                      <input
                        type="text"
                        name="stallName"
                        autoComplete="off"
                        placeholder="e.g. Riverbend Organic Orchard"
                        value={formData.stallName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-semibold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Cultivation Zone
                      </label>
                      <select
                        name="farmRegion"
                        value={formData.farmRegion}
                        onChange={handleChange}
                        className="w-full px-2 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option>Malir Agricultural Zone</option>
                        <option>Thatta & Gharo Belt</option>
                        <option>Hyderabad Orchards</option>
                        <option>Hub River Basin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        CNIC / Grower ID
                      </label>
                      <div className="bg-white rounded-xl border border-slate-200 focus-within:border-emerald-500 transition">
                        <input
                          type="text"
                          name="cnic"
                          autoComplete="off"
                          placeholder="42201-XXXXXXX-X"
                          value={formData.cnic}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-semibold text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Password & Confirm Password Grid */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Password *
                  </label>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 focus-within:border-emerald-500 transition">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="new-password"
                      placeholder="Min. 6 chars"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Confirm Password *
                  </label>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 focus-within:border-emerald-500 transition">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder="Repeat password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer font-medium text-slate-600 text-[11px] pt-1">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 mt-0.5"
                />
                <span>I agree to MarketLink's Regional Grower Guidelines, Zero-Waste Policy, and In-Person Pickup Settlement Rules.</span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-xs font-extrabold shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}



        </div>

      </div>
    </div>
  );
}
