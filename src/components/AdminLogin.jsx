import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [email, setEmail] = useState('admin@marketlink.pk');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both Admin Email and Password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Admin Credentials check
      if (email.toLowerCase() === 'admin@marketlink.pk' && password === 'admin123') {
        const adminUser = {
          userId: 'admin_master_1',
          name: 'Super Admin (MarketLink)',
          shortName: 'Admin',
          email: 'admin@marketlink.pk',
          role: 'Admin',
          avatar: 'ADM',
          avatarBg: 'bg-emerald-900',
          permissions: ['all']
        };
        onLoginSuccess(adminUser);
      } else {
        setError('Invalid Admin Credentials. Use demo: admin@marketlink.pk / admin123');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4 sm:p-6 font-body animate-fadeIn">
      
      {/* Container Card */}
      <div className="bg-slate-900/90 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30 backdrop-blur-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700/30 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-white font-heading tracking-tight">
            Market<span className="text-emerald-400">Link</span> Admin Portal
          </h2>
          <p className="text-xs text-slate-400">
            Platform Management & Oversight Login
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-emerald-950/60 border border-emerald-500/40 p-3.5 rounded-2xl text-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> Master Admin Login
            </span>
            <span className="bg-emerald-500/30 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono">
              SYSTEM
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-mono">Email: admin@marketlink.pk</p>
          <p className="text-[11px] text-slate-300 font-mono">Password: admin123</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-500/20 border border-rose-500/50 text-rose-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-300 block mb-1.5">
              Admin Master Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@marketlink.pk"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <span>Authenticating Admin...</span>
            ) : (
              <>
                <span>Access Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to Marketplace Link */}
        <div className="pt-3 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-emerald-400 font-semibold transition"
          >
            ← Return to Public Marketplace
          </button>
        </div>

      </div>

    </div>
  );
}
