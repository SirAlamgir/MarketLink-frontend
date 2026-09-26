import React, { useState } from 'react';
import {
  X, User, Mail, Phone, MapPin, Lock, Bell, Shield, CheckCircle2,
  Eye, EyeOff, Save, AlertCircle, ChevronRight, LogOut, Trash2
} from 'lucide-react';

const LOCALITY_OPTIONS = [
  'Clifton & South', 'DHA Phases 1-6', 'Gulshan-e-Iqbal', 'North Nazimabad',
  'Korangi & Landhi', 'Malir City', 'Saddar & Old City', 'Lyari & Kemari',
];

export default function AccountSettingsModal({ isOpen, onClose, currentUser, onUpdateUser, onSignOut, showToast }) {
  const [activeSection, setActiveSection] = useState('profile'); // 'profile' | 'security' | 'notifications'
  const [isSaving, setIsSaving] = useState(false);
  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    locality: currentUser?.locality || 'Clifton & South',
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    orderConfirmation: true,
    readyForPickup: true,
    farmerRestock: false,
    weeklyDigest: true,
    marketAnnouncements: true,
    cancelledOrder: true,
  });

  if (!isOpen) return null;

  const handleProfileSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onUpdateUser && onUpdateUser({
        ...currentUser,
        name: profileForm.name,
        shortName: profileForm.name.split(' ')[0],
        email: profileForm.email,
        phone: profileForm.phone,
        locality: profileForm.locality,
      });
      showToast && showToast('Profile updated successfully!');
    }, 800);
  };

  const handlePasswordSave = () => {
    if (!passwordForm.oldPassword) {
      showToast && showToast('Please enter your current password.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast && showToast('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast && showToast('New passwords do not match.');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      showToast && showToast('Password changed successfully!');
    }, 800);
  };

  const handleNotifToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    showToast && showToast('Notification preference saved.');
  };

  const sections = [
    { id: 'profile', label: 'Profile Info', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Password & Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 p-5 text-white shrink-0 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer transition">
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-2">
            <Shield className="w-3 h-3" /> Account Settings — SRS 1.6
          </div>
          <h2 className="text-xl font-extrabold text-white" style={{ color: '#fff' }}>Account Settings</h2>
          <p className="text-slate-400 text-[11px] mt-0.5">Manage your profile, password, and notification preferences</p>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-slate-200 shrink-0 bg-slate-50 overflow-x-auto">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition cursor-pointer border-b-2 ${
                activeSection === sec.id
                  ? 'text-emerald-700 border-emerald-600 bg-white'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              }`}
            >
              {sec.icon} {sec.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-5 text-xs text-slate-700">

          {/* PROFILE SECTION */}
          {activeSection === 'profile' && (
            <>
              {/* Avatar Display */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className={`w-14 h-14 rounded-full ${currentUser?.avatarBg || 'bg-emerald-600'} text-white font-extrabold text-xl flex items-center justify-center shadow`}>
                  {currentUser?.avatar || 'A'}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">{profileForm.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {currentUser?.role || 'Customer'} · Member since {currentUser?.memberSince || '2025'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{currentUser?.email}</div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={e => setProfileForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Phone / WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Locality */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Your Locality / Area</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={profileForm.locality}
                    onChange={e => setProfileForm(p => ({ ...p, locality: e.target.value }))}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 appearance-none"
                  >
                    {LOCALITY_OPTIONS.map(loc => (
                      <option key={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleProfileSave}
                disabled={isSaving}
                className="btn-primary w-full py-3 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><Save className="w-4 h-4" /> Save Profile Changes</>
                )}
              </button>
            </>
          )}

          {/* SECURITY SECTION */}
          {activeSection === 'security' && (
            <>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-amber-800">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[11px] font-medium">Your password must be at least 6 characters. For demo accounts, password change is simulated.</p>
              </div>

              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Current Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showOldPw ? 'text' : 'password'}
                    value={passwordForm.oldPassword}
                    onChange={e => setPasswordForm(p => ({ ...p, oldPassword: e.target.value }))}
                    placeholder="Enter current password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPw(!showOldPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showOldPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                    placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Repeat new password"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <button
                onClick={handlePasswordSave}
                disabled={isSaving}
                className="btn-primary w-full py-3 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><Shield className="w-4 h-4" /> Update Password</>
                )}
              </button>

              {/* Danger Zone */}
              <div className="border border-red-200 rounded-2xl p-4 bg-red-50 space-y-3 mt-2">
                <h3 className="text-xs font-extrabold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Danger Zone
                </h3>
                <button
                  onClick={() => { onSignOut && onSignOut(); onClose(); }}
                  className="w-full flex items-center justify-between p-3 bg-white border border-red-200 rounded-xl text-red-700 font-extrabold text-xs hover:bg-red-100 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2"><LogOut className="w-4 h-4" /> Sign Out of All Devices</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* NOTIFICATIONS SECTION */}
          {activeSection === 'notifications' && (
            <div className="space-y-3">
              <p className="text-[11px] text-slate-500 font-medium">
                Manage in-app and email alerts per SRS 1.6 Notification requirements.
              </p>

              {[
                { key: 'orderConfirmation', label: 'Order Confirmation', desc: 'When your pre-order is successfully placed' },
                { key: 'readyForPickup', label: 'Ready for Pickup Alert', desc: 'When farmer marks your order as ready' },
                { key: 'cancelledOrder', label: 'Order Cancellation', desc: 'When an order is cancelled by you or the farmer' },
                { key: 'farmerRestock', label: 'Farmer Restock Alerts', desc: 'When a favourite farmer adds new stock' },
                { key: 'weeklyDigest', label: 'Weekly Market Digest', desc: 'Summary of upcoming markets every Thursday' },
                { key: 'marketAnnouncements', label: 'Market Announcements', desc: 'Platform-wide announcements from admin' },
              ].map(notif => (
                <div key={notif.key} className="flex items-start justify-between gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <div className="flex-1">
                    <div className="font-extrabold text-slate-900">{notif.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{notif.desc}</div>
                  </div>
                  <button
                    onClick={() => handleNotifToggle(notif.key)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 mt-0.5 ${
                      notifications[notif.key] ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      notifications[notif.key] ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
