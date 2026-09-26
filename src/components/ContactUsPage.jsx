import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Leaf, ChevronDown, ChevronUp, Store, Users, Sparkles, Camera, AtSign, Globe, Headphones, AlertCircle, ShieldCheck } from 'lucide-react';

const FAQS = [
  { id: 1, question: 'How do I cancel or modify a pre-order?', answer: 'You can cancel or modify your pre-order up to 24 hours before your chosen market pickup window. Contact the farmer directly via MarketBot AI, or email us at support@marketlink.pk with your Order ID. Full release of reservation is granted with zero penalty fees.' },
  { id: 2, question: 'I want to list my farm on MarketLink. How do I sign up?', answer: 'We welcome verified local growers! Click Become a Farmer in the navbar, fill out the Farmer Registration form, and our team will verify your Regional Grower Certification within 3 to 5 business days. You will need your CNIC, farm address, and recent produce photos.' },
  { id: 3, question: 'Are the products on MarketLink actually organic and pesticide-free?', answer: 'All MarketLink farmers undergo our Regional Grower Verification process. Items tagged as Organic are certified pesticide-free with documentation on file. Non-organic items are still grown with minimal chemical use and all credentials are visible on each farmer profile page.' },
  { id: 4, question: 'What payment methods are accepted at the stalls?', answer: 'Payment is always settled in person at the farmer stall on pickup day. Accepted methods include Cash (PKR), JazzCash, EasyPaisa, and contactless debit cards. No online advance card payment is required.' },
  { id: 5, question: 'My pickup was missed - what should I do?', answer: 'Contact the farmer directly via our MarketBot AI assistant (available 24/7) or reach us at support@marketlink.pk within 48 hours. Depending on the farmer inventory, we will arrange a reschedule for the next market day.' },
  { id: 6, question: 'Which Karachi regions do you currently serve?', answer: 'MarketLink currently operates in Clifton & DHA South, Gulshan-e-Iqbal & East Karachi, Malir Agricultural Zone, North Nazimabad, PECHS & Central Karachi, and Bahria Town. We are expanding to Landhi and Korangi soon.' }
];

const CONTACT_INFO = [
  { icon: Mail, label: 'Email Us', value: 'support@marketlink.pk', sub: 'We reply within 24 hours', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', href: 'mailto:support@marketlink.pk' },
  { icon: Phone, label: 'Call / WhatsApp', value: '+92 300 1234 567', sub: 'Mon - Sat, 9 AM - 7 PM PKT', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', href: 'tel:+923001234567' },
  { icon: MapPin, label: 'Head Office', value: 'Block 7, Clifton, Karachi', sub: 'By appointment only', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', href: 'https://maps.google.com/?q=Clifton+Karachi' },
  { icon: Clock, label: 'Support Hours', value: 'Mon - Sat', sub: '9:00 AM - 7:00 PM PKT', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', href: null }
];

export default function ContactUsPage({ onNavigate, onOpenAiBot }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'general', message: '', userType: 'customer' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address';
    if (!formData.message.trim()) errs.message = 'Message is required';
    else if (formData.message.trim().length < 15) errs.message = 'Message must be at least 15 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); setFormData({ name: '', email: '', phone: '', subject: 'general', message: '', userType: 'customer' }); }, 1000);
  };
  return (
    <div className='space-y-16 pb-20 animate-fadeIn'>
      {/* 1. HERO HEADER */}
      <section className='relative bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white py-20 px-4 lg:px-8 overflow-hidden'>
        <div className='absolute inset-0 opacity-20 pointer-events-none'>
          <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
            <pattern id='contact-grid' width='40' height='40' patternUnits='userSpaceOnUse'>
              <path d='M 40 0 L 0 0 0 40' fill='none' stroke='#22c55e' strokeWidth='0.8' opacity='0.4' />
            </pattern>
            <rect width='100%' height='100%' fill='url(#contact-grid)' />
          </svg>
        </div>
        <div className='absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute -bottom-10 -left-16 w-72 h-72 bg-amber-400/8 rounded-full blur-2xl pointer-events-none' />
        <div className='max-w-4xl mx-auto text-center relative z-10 space-y-4'>
          <div className='inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2'>
            <Headphones className='w-3.5 h-3.5 text-emerald-400' /><span>24/7 Community & Vendor Support</span>
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight drop-shadow-md' style={{ color: '#ffffff' }}>
            We Are Here to <span className='text-emerald-400'>Help You</span>
          </h1>
          <p className='text-slate-200 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed pt-1'>
            Got a question about pre-ordering, a farmer listing inquiry, or feedback on your last pickup experience? Our dedicated support team is ready.
          </p>
          <div className='pt-4 flex flex-wrap items-center justify-center gap-4'>
            <button onClick={onOpenAiBot} className='btn-golden px-6 py-3 text-xs font-extrabold shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform'>
              <Sparkles className='w-4 h-4' /><span>Ask MarketBot AI Instant Answers</span>
            </button>
            <a href='#contact-form' className='px-6 py-3 text-xs font-extrabold text-white border border-white/30 hover:bg-white/10 rounded-xl transition flex items-center gap-2 cursor-pointer hover:scale-105'>
              <Send className='w-4 h-4 text-emerald-300' /><span>Send Message</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFO CARDS */}
      <section className='max-w-7xl mx-auto px-4 lg:px-8 -mt-8 relative z-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {CONTACT_INFO.map((info) => {
            const IconComp = info.icon;
            const Tag = info.href ? 'a' : 'div';
            const extraProps = info.href ? { href: info.href, target: '_blank', rel: 'noreferrer' } : {};
            return (
              <Tag key={info.label} {...extraProps} className='group bg-slate-50/90 hover:bg-white rounded-2xl p-5 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-4 hover-card-3d'>
                <div className={'w-11 h-11 rounded-xl ' + info.bg + ' ' + info.color + ' flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm'}><IconComp className='w-5 h-5' /></div>
                <div><p className='text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5'>{info.label}</p><p className={'text-sm font-extrabold ' + info.color + ' font-heading leading-snug'}>{info.value}</p><p className='text-[11px] text-slate-500 font-medium mt-0.5'>{info.sub}</p></div>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* 3. FORM + SIDEBAR */}
      <section id='contact-form' className='max-w-7xl mx-auto px-4 lg:px-8 mt-14'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
          <div className='lg:col-span-3'>
            <div className='bg-slate-50/90 hover:bg-white rounded-3xl border border-slate-200/90 shadow-md p-8 hover-card-3d transition-all duration-300'>
              <div className='mb-7'><span className='text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-block mb-2'>SEND A MESSAGE</span><h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-heading'>How Can We Help You?</h2><p className='text-slate-500 text-xs sm:text-sm mt-1'>Fill in the form below and our team will get back to you within 24 business hours.</p></div>
              {submitted ? (
                <div className='bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-fadeIn'>
                  <div className='w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-md shadow-emerald-500/20 animate-bounce'><CheckCircle2 className='w-10 h-10' /></div>
                  <div><span className='bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider'>Message Received</span><h3 className='text-xl font-extrabold text-slate-900 font-heading mt-2'>Thank You!</h3><p className='text-slate-600 text-xs mt-1 max-w-sm mx-auto leading-relaxed'>We have received your message. Our support team is reviewing it and will respond to your email address shortly.</p></div>
                  <button onClick={() => setSubmitted(false)} className='btn-primary text-xs px-6 py-2.5 shadow-md'>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-5'>
                  <div><label className='text-xs font-bold text-slate-700 block mb-2'>I am a:</label><div className='grid grid-cols-3 gap-2'>
                    {[{ id: 'customer', label: 'Shopper / Buyer' }, { id: 'farmer', label: 'Local Farmer' }, { id: 'partner', label: 'Market Organizer' }].map((type) => (
                      <button key={type.id} type='button' onClick={() => setFormData(prev => ({ ...prev, userType: type.id }))} className={'py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ' + (formData.userType === type.id ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300')}>{type.label}</button>
                    ))}</div></div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div><label className='text-xs font-bold text-slate-700 block mb-1.5'>Your Full Name *</label><input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='e.g. Ayesha Khan' className={'w-full px-4 py-2.5 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ' + (errors.name ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white')} />{errors.name && (<p className='text-rose-500 text-[11px] font-semibold mt-1 flex items-center gap-1'><AlertCircle className='w-3 h-3' /> {errors.name}</p>)}</div>
                    <div><label className='text-xs font-bold text-slate-700 block mb-1.5'>Email Address *</label><input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='ayesha@example.com' className={'w-full px-4 py-2.5 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ' + (errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white')} />{errors.email && (<p className='text-rose-500 text-[11px] font-semibold mt-1 flex items-center gap-1'><AlertCircle className='w-3 h-3' /> {errors.email}</p>)}</div>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div><label className='text-xs font-bold text-slate-700 block mb-1.5'>Phone / WhatsApp (Optional)</label><input type='tel' name='phone' value={formData.phone} onChange={handleChange} placeholder='+92 300 1234567' className='w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition' /></div>
                    <div><label className='text-xs font-bold text-slate-700 block mb-1.5'>Subject / Topic</label><select name='subject' value={formData.subject} onChange={handleChange} className='w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer'><option value='general'>General Inquiry</option><option value='preorder'>Pre-Order / Pickup Issue</option><option value='farmer'>Farmer Registration & Verification</option><option value='market'>Market Location / Schedule Inquiry</option><option value='feedback'>Feedback & Suggestions</option><option value='technical'>Technical Support</option></select></div>
                  </div>
                  <div><label className='text-xs font-bold text-slate-700 block mb-1.5'>Your Message *</label><textarea name='message' rows={5} value={formData.message} onChange={handleChange} placeholder='Describe your query in detail - include your Order ID if relevant...' className={'w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none ' + (errors.message ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white')} />{errors.message && (<p className='text-rose-500 text-[11px] font-semibold mt-1 flex items-center gap-1'><AlertCircle className='w-3 h-3' /> {errors.message}</p>)}</div>
                  <div className='bg-slate-100 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-600'><ShieldCheck className='w-4 h-4 text-emerald-600 shrink-0 mt-0.5' /><span>Your privacy is protected. We will never share your email address or contact info.</span></div>
                  <button type='submit' disabled={loading} className='btn-primary w-full py-3 text-sm font-extrabold shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] transition'>{loading ? (<div className='flex items-center gap-2'><span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' /><span>Sending Message...</span></div>) : (<><Send className='w-4 h-4' /><span>Submit Message</span></>)}</button>
                </form>
              )}
            </div>
          </div>
          <div className='lg:col-span-2 space-y-6'>
            <div className='bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-emerald-500/30 hover-card-3d transition-all duration-300 relative overflow-hidden'>
              <div className='flex items-start gap-3'><div className='w-12 h-12 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center text-amber-300 shrink-0 shadow-inner'><Sparkles className='w-6 h-6' /></div><div><span className='bg-emerald-400/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider border border-emerald-400/30'>Instant AI Support</span><h3 className='font-extrabold text-white font-heading text-base mt-1.5'>Try MarketBot AI Assistant</h3><p className='text-emerald-100/80 text-xs mt-1 leading-relaxed'>For quick answers on market hours, product stock, or pre-order guidance - our MarketBot AI responds in seconds, 24/7.</p><button onClick={onOpenAiBot} className='mt-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-md cursor-pointer hover:scale-105'><Sparkles className='w-3.5 h-3.5' /><span>Open MarketBot AI</span></button></div></div>
            </div>
            <div className='bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 border border-emerald-500/30 text-white rounded-3xl p-6 shadow-xl hover-card-3d transition-all duration-300 relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl pointer-events-none' />
              <div className='flex items-start gap-3 mb-4 relative z-10'><div className='w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0'><Store className='w-5 h-5 text-emerald-400' /></div><div><h3 className='font-extrabold text-white font-heading text-sm'>Register as a Farmer</h3><p className='text-emerald-100/80 text-xs mt-0.5 leading-relaxed'>Are you a local grower looking to reach urban customers? Join MarketLink verified farm network.</p></div></div>
              <ul className='space-y-2 text-xs text-emerald-100/90 font-medium mb-4 relative z-10'>
                {['Free listing on our network', 'Pre-order management dashboard', 'Direct customer communication', 'Zero platform commission fees'].map(item => (<li key={item} className='flex items-center gap-2'><CheckCircle2 className='w-3.5 h-3.5 text-emerald-400 shrink-0' /><span>{item}</span></li>))}
              </ul>
              <button type='button' onClick={() => onNavigate('about-us')} className='btn-golden w-full py-2.5 text-xs font-extrabold shadow-md cursor-pointer relative z-10 hover:scale-105 transition'><Users className='w-3.5 h-3.5' /><span>Learn About Farmer Registration</span></button>
            </div>
            <div className='bg-slate-50/90 hover:bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md hover-card-3d transition-all duration-300'>
              <h3 className='font-extrabold text-slate-900 font-heading text-sm mb-1'>Follow Us</h3><p className='text-slate-500 text-xs mb-4'>Get harvest updates, market schedules, and seasonal promotions on social media.</p>
              <div className='flex items-center gap-3'>{[{ icon: Camera, label: 'Instagram', color: 'hover:bg-pink-500', href: '#' }, { icon: Globe, label: 'Facebook', color: 'hover:bg-blue-600', href: '#' }, { icon: AtSign, label: 'Twitter / X', color: 'hover:bg-slate-800', href: '#' }, { icon: MessageSquare, label: 'WhatsApp', color: 'hover:bg-green-500', href: 'https://wa.me/923001234567' }].map((social) => { const Icon = social.icon; return (<a key={social.label} href={social.href} title={social.label} className={'w-10 h-10 rounded-xl bg-white text-slate-600 border border-slate-200 flex items-center justify-center transition ' + social.color + ' hover:text-white hover:scale-110 shadow-sm'}><Icon className='w-4 h-4' /></a>); })}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQS */}
      <section className='max-w-4xl mx-auto px-4 lg:px-8 space-y-6'>
        <div className='text-center space-y-2'><span className='text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 inline-block mb-2'>FREQUENTLY ASKED QUESTIONS</span><h2 className='text-3xl font-extrabold text-slate-900 font-heading'>Got Questions? We Have Answers.</h2><p className='text-slate-500 text-xs sm:text-sm max-w-xl mx-auto'>Everything you need to know about placing weekend pre-orders, visiting pickup stalls, and joining our farmer network.</p></div>
        <div className='space-y-3'>{FAQS.map((faq) => { const isOpen = openFaq === faq.id; return (<div key={faq.id} className={'bg-slate-50/90 hover:bg-white border rounded-2xl shadow-sm transition-all overflow-hidden hover-card-3d ' + (isOpen ? 'border-emerald-400 shadow-md shadow-emerald-500/10 bg-white' : 'border-slate-200/90')}><button type='button' onClick={() => setOpenFaq(isOpen ? null : faq.id)} className='w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer'><span className='font-extrabold text-sm text-slate-900 font-heading leading-snug'>{faq.question}</span><div className={'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ' + (isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600')}>{isOpen ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}</div></button>{isOpen && (<div className='px-5 pb-5 text-xs text-slate-600 leading-relaxed font-normal animate-fadeIn'><div className='h-px bg-emerald-100 mb-4' /><p>{faq.answer}</p></div>)}</div>); })}</div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className='max-w-7xl mx-auto px-4 lg:px-8'>
        <div className='bg-gradient-to-r from-emerald-950 via-emerald-800 to-slate-900 rounded-3xl p-10 text-white text-center relative overflow-hidden shadow-2xl border border-emerald-500/30 hover-card-3d transition-all duration-300'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none' />
          <div className='absolute bottom-0 left-0 w-48 h-48 bg-amber-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl pointer-events-none' />
          <div className='relative z-10 max-w-xl mx-auto space-y-4'>
            <div className='inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1'><Leaf className='w-3.5 h-3.5 text-emerald-400' /><span>Direct From Local Malir & Thatta Fields</span></div>
            <h3 className='text-2xl sm:text-3xl font-extrabold font-heading text-white'>Skip the Queue. Pre-Order Your Fresh Harvest Today.</h3>
            <p className='text-emerald-100/80 text-xs sm:text-sm font-medium'>Join thousands of Karachi families who reserve morning-picked organic fruits, vegetables, and dairy before Sunday market opens.</p>
            <div className='pt-3 flex flex-wrap items-center justify-center gap-3'>
              <button type='button' onClick={() => onNavigate('browse-markets')} className='btn-golden px-7 py-3 text-xs font-extrabold shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition'><Store className='w-4 h-4' /><span>Browse All Markets</span></button>
              <button type='button' onClick={() => onNavigate('home')} className='bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-7 py-3 rounded-xl border border-white/30 transition hover:scale-105 flex items-center gap-2 cursor-pointer'><ShoppingBag className='w-4 h-4 text-emerald-300' /><span>Shop Fresh Produce</span></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
