import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  ShieldCheck 
} from 'lucide-react';
import { AI_FAQS } from '../data/mockData';

export default function AiChatbot({ isOpen, onClose, markets, farmers, products }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! 👋 I'm **MarketBot AI**, your smart farmers market assistant. Ask me about market hours, farmer stall locations, fresh produce availability, or how pre-ordering works!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI response logic matching SRS requirements
    setTimeout(() => {
      let botResponse = "";
      const lower = text.toLowerCase();

      if (lower.includes('timing') || lower.includes('hour') || lower.includes('open') || lower.includes('when') || lower.includes('time')) {
        const marketList = markets.slice(0, 4).map(m => `• **${m.market_name}:** ${m.operating_days.join(' & ')} (${m.operating_hours})`).join('\n');
        botResponse = `🕒 **Karachi Market Schedule:**\n${marketList}\n\nPre-orders close 24 hours before the market opens!`;
      } else if (lower.includes('pre-order') || lower.includes('order') || lower.includes('how') || lower.includes('basket') || lower.includes('reserve')) {
        botResponse = "🛍️ **How Pre-Ordering Works:**\n1. Browse fresh produce listed by our local farmers.\n2. Add items to your Pre-Order Basket.\n3. Select your pickup market & time slot.\n4. Confirm your digital reservation ticket.\n5. Pay in person at the farmer's stall on market day!\n\nZero online fees. No middleman. 100% direct to farmer.";
      } else if (lower.includes('pay') || lower.includes('payment') || lower.includes('cost') || lower.includes('card') || lower.includes('cash')) {
        botResponse = "💳 **Payment at MarketLink:**\nAll payments are settled **in person at the farmer's stall** on pickup day. Farmers accept Cash, Credit/Debit Cards, JazzCash, EasyPaisa, and mobile contactless pay. **No online payment required!**";
      } else if (lower.includes('vegetable') || lower.includes('spinach') || lower.includes('palak') || lower.includes('tomato') || lower.includes('carrot') || lower.includes('kale')) {
        const vegProducts = products.filter(p => p.category === 'vegetables').slice(0, 3);
        const list = vegProducts.map(p => `• **${p.name}:** Rs ${(p.price * 280).toFixed(0)}/unit — Stall: ${p.stall_name}`).join('\n');
        botResponse = `🥬 **Fresh Organic Vegetables in Stock:**\n${list}\n\nFilter by \'Organic Vegetables\' on the homepage for the full catalog!`;
      } else if (lower.includes('honey') || lower.includes('sidr') || lower.includes('wildflower')) {
        botResponse = "🍯 **Pure Raw Honey at MarketLink:**\n• **Wild Sidr Honey** (500g jar): Rs 3,500 — Fatima Zehra at Ember Groves Apiary\n• **Wildflower Berry Honey** (400g jar): Rs 2,520 — Same stall, Gulshan Green Bazaar\n\nUnpasteurized, mountain-sourced, no additives!";
      } else if (lower.includes('dairy') || lower.includes('milk') || lower.includes('ghee') || lower.includes('paneer') || lower.includes('desi')) {
        botResponse = "🥛 **Desi Dairy at MarketLink:**\n• **Pure A2 Desi Cow Milk:** Rs 980/liter — Tariq Mahmood\n• **Cultured Desi Cow Ghee:** Rs 3,920/500g — Gharo Grassland Dairy\n• **Farm-Fresh Paneer:** Rs 2,100/400g block\n\nAll grass-fed, free-roaming herds from Gharo!";
      } else if (lower.includes('farmer') || lower.includes('stall') || lower.includes('grower') || lower.includes('chaudhry') || lower.includes('fatima') || lower.includes('tariq') || lower.includes('bilal')) {
        const farmerList = farmers.map(f => `• **${f.farmer_name}** (${f.farm_name}) → ${f.market_name}`).join('\n');
        botResponse = `👨‍🌾 **Our Verified Local Farmers:**\n${farmerList}\n\nClick any farmer card on the homepage to view their full stall profile and current stock!`;
      } else if (lower.includes('cancel') || lower.includes('refund') || lower.includes('return')) {
        botResponse = "❌ **Cancellation Policy:**\nYou may cancel your pre-order up to **24 hours before** your market pickup window at no penalty. Simply contact your farmer directly or message us through MarketBot. No partial refunds — full release of reservation!";
      } else if (lower.includes('organic') || lower.includes('certified') || lower.includes('pesticide')) {
        botResponse = "🌿 **Organic Certification at MarketLink:**\nAll farmers are verified through our Regional Grower Certification program. Items tagged as **Organic** are 100% certified pesticide-free. Non-organic items are still grown with minimal chemical intervention — far superior to supermarket produce!";
      } else {
        botResponse = `✨ Thanks for your question about "${text}"!\n\nYou can explore our live product catalog on the homepage, filter by certified organic items, or browse markets by region. I'm here to help with:\n• Market timings & locations\n• Farmer stall info\n• Pre-order guidance\n• Product availability\n\nWhat else can I help you with?`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full sm:w-[450px] h-[600px] max-h-full rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Chatbot Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 text-amber-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm font-heading">MarketBot AI Assistant</h3>
                <span className="bg-amber-400 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.2 rounded uppercase">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">Market timings, stall info & product lookup</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-2.5 bg-emerald-50/70 border-b border-emerald-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-emerald-900 whitespace-nowrap pl-1">Quick Ask:</span>
          {["Market Timings?", "How to Pre-Order?", "Payment Method?", "Farmer Stalls?"].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 transition shrink-0 shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 ${
                msg.sender === 'user' ? 'bg-slate-800' : 'bg-emerald-600'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-300" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-3.5 shadow-xs whitespace-pre-line leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-tr-xs font-medium'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs font-normal'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-2">
              <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>MarketBot is checking market inventory...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about market hours, farmers, or products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-100 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="btn-primary p-2.5 rounded-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
