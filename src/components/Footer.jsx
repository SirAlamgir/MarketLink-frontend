import React from 'react';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-14 pb-8 px-4 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/80">

        {/* Brand Info Column */}
        <div className="lg:col-span-2 space-y-4">
          <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('home'); }} className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('home'); }}
              className="inline-block group"
            >
              <div className="w-[180px] p-3 rounded-xl bg-white shadow-lg shadow-black/20 transition-all duration-300 group-hover:scale-105">
                <img
                  src="Flogo.png"
                  alt="MarketLink Logo"
                  className="w-full h-auto object-contain"
                />
              </div>
            </a>
          </a>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Connecting local growers directly with conscious consumers. Fresh harvest transparency, sustainable farm-to-table commerce, and verified regional markets.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold text-white text-sm font-heading">Quick Links</h4>
          <ul className="space-y-2 font-medium">
            <li><button onClick={() => onNavigate && onNavigate('home')} className="hover:text-emerald-400 transition text-left">Home</button></li>
            <li><button onClick={() => onNavigate && onNavigate('browse-markets')} className="hover:text-emerald-400 transition text-left">Browse Markets</button></li>
            <li><button onClick={() => onNavigate && onNavigate('about-us')} className="hover:text-emerald-400 transition text-left">About Us</button></li>
            <li><button onClick={() => onNavigate && onNavigate('contact-us')} className="hover:text-emerald-400 transition text-left">Contact Us</button></li>
            <li><button onClick={() => onNavigate && onNavigate('admin')} className="text-amber-400 font-extrabold hover:text-amber-300 transition text-left flex items-center gap-1"><span>🛡️ Admin Portal</span></button></li>
          </ul>
        </div>

        {/* For Farmers */}
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold text-white text-sm font-heading">For Farmers</h4>
          <ul className="space-y-2 font-medium">
            <li><a href="#" className="hover:text-emerald-400 transition">Farmer Sign Up</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition">Farmer Login</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition">Produce Guide</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition">Wholesale Logistics</a></li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold text-white text-sm font-heading">Contact Support</h4>
          <div className="space-y-2 text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>support@marketlink-egreen.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+92 21 3456 7890</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Karachi, Pakistan</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
        <p>© 2026 MarketLink (eGreen Basket). All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition">Harvest Standards</a>
        </div>
      </div>
    </footer>
  );
}
