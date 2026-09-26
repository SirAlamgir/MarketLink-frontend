import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getMarkets } from '../services/api';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Default markets data (fallback if backend not connected)
const DEFAULT_MARKETS = [
  { _id: '1', market_name: 'Karachi Farmers Market', address: 'Clifton Block 9, Karachi', latitude: 24.8150, longitude: 67.0300, operating_days: ['Saturday', 'Sunday'], timings: '7:00 AM - 1:00 PM' },
  { _id: '2', market_name: 'Defence Organic Bazaar', address: 'DHA Phase 6, Karachi', latitude: 24.7800, longitude: 67.0600, operating_days: ['Friday', 'Saturday'], timings: '6:00 AM - 12:00 PM' },
  { _id: '3', market_name: 'Gulshan Green Market', address: 'Gulshan-e-Iqbal, Karachi', latitude: 24.9215, longitude: 67.0947, operating_days: ['Sunday'], timings: '8:00 AM - 2:00 PM' },
  { _id: '4', market_name: 'Malir Mandi', address: 'Malir Agricultural Zone, Karachi', latitude: 24.8928, longitude: 67.2064, operating_days: ['Tuesday', 'Thursday', 'Saturday'], timings: '5:00 AM - 11:00 AM' },
];

export default function MarketMap({ onNavigate }) {
  const [markets, setMarkets] = useState(DEFAULT_MARKETS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const { data } = await getMarkets();
        if (data && data.length > 0) {
          setMarkets(data);
        }
      } catch (err) {
        // Use default markets if backend not available
        setMarkets(DEFAULT_MARKETS);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkets();
  }, []);

  // Center map on Karachi
  const karachiCenter = [24.8607, 67.0011];

  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3">
            📍 Find Markets Near You
          </span>
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Farmers Markets — Live Map
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Discover fresh produce stalls near you. All markets listed below operate on fixed schedules with in-person cash payment.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl" style={{ height: '480px' }}>
            <MapContainer center={karachiCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markets.map((market) => (
                market.latitude && market.longitude ? (
                  <Marker key={market._id} position={[market.latitude, market.longitude]}>
                    <Popup>
                      <div className="text-sm">
                        <strong className="text-emerald-700 block mb-1">{market.market_name}</strong>
                        <span className="text-slate-600 text-xs block">📍 {market.address}</span>
                        {market.timings && <span className="text-slate-600 text-xs block">⏰ {market.timings}</span>}
                        {market.operating_days && (
                          <span className="text-slate-600 text-xs block">📅 {market.operating_days.join(', ')}</span>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ) : null
              ))}
            </MapContainer>
          </div>
        )}

        {/* Market Cards below map */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {markets.map((market) => (
            <div key={market._id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-emerald-500/50 transition">
              <h3 className="font-bold text-white text-sm mb-1">{market.market_name}</h3>
              <p className="text-slate-400 text-xs mb-1">📍 {market.address}</p>
              {market.timings && <p className="text-emerald-400 text-xs font-semibold">⏰ {market.timings}</p>}
              {market.operating_days && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {market.operating_days.map(day => (
                    <span key={day} className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{day}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
