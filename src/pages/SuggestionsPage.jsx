import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowLeft, ExternalLink, Trash2, Plus, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminStocks } from '../hooks/useAdminStocks';
import AdminPanel from '../components/AdminPanel';
import { fetchStockData } from '../utils/stockApi';

/* ─── Data ──────────────────────────────────────────────────── */
const TICKER = [
  'AAPL +1.2%', 'TSLA -0.5%', 'NVDA +2.8%', 'MSFT +0.9%',
  'RELIANCE +1.5%', 'TATAMOTORS +3.2%', 'ZOMATO +4.8%', 'JPM -0.8%',
  'HDFCBANK -0.4%', 'MSFT +1.8%',
];

/* ─── Floating ambient orbs ────────────────────────────────── */
function Orbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#820e0e]/10 blur-[140px]" />
      <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-[#050b51]/40 blur-[120px]" />
      <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-[#c5a059]/5 blur-[100px]" />
    </div>
  );
}

/* ─── Animated number counter ──────────────────────────────── */
function AnimatedTicker({ items }) {
  return (
    <div className="overflow-hidden relative w-full py-3.5">
      {/* Left & right fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050b51] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050b51] to-transparent z-10 pointer-events-none" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="flex gap-10 whitespace-nowrap w-max"
      >
        {[...items, ...items].map((item, i) => {
          const isUp = item.includes('+');
          return (
            <span key={i} className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] font-medium">
              <span className="text-white/50">{item.split(' ')[0]}</span>
              <span className={isUp ? 'text-emerald-400' : 'text-red-400'}>{item.split(' ')[1]}</span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── Stock card ────────────────────────────────────────────── */
function StockCard({ stock, index, isAdmin, onDelete, onAuthTrigger }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="relative group overflow-hidden bg-white/[0.03] border border-white/8 rounded-xl p-8 cursor-default"
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isAdmin) onDelete(stock.id);
          else onAuthTrigger();
        }}
        className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isAdmin ? 'bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white' : 'bg-white/5 text-white/20 hover:text-white/50'}`}
        title={isAdmin ? "Delete stock" : "Admin login required"}
      >
        {isAdmin ? <Trash2 size={14} /> : <Lock size={12} />}
      </button>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(197,160,89,0.08) 0%, transparent 70%)' }}
      />
      {/* Top accent line */}
      <div className={`absolute top-0 left-8 right-8 h-[1px] ${stock.up ? 'bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent' : 'bg-gradient-to-r from-transparent via-red-400/40 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Category */}
        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-[#c5a059]/80 mb-5 font-medium">{stock.category}</p>

        {/* Symbol + trend */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-playfair text-4xl md:text-5xl tracking-tight text-white group-hover:text-[#c5a059] transition-colors duration-500">{stock.symbol}</h3>
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mt-2 ${stock.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {stock.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {stock.trend}
          </span>
        </div>

        <p className="text-white/35 text-sm mb-6">{stock.name}</p>

        {/* Price */}
        <div className="text-2xl font-semibold text-white mb-4 tracking-tight">{stock.price}</div>

        {/* Note */}
        <p className="text-white/30 text-xs leading-relaxed mb-8 flex-1 italic">{stock.note}</p>

        {/* CTA */}
        <button className="flex items-center gap-2.5 text-[0.65rem] uppercase tracking-[0.25em] font-bold text-white/50 hover:text-[#c5a059] transition-colors duration-300 group/btn">
          View Analysis
          <ExternalLink size={11} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function SuggestionsPage() {
  const [activeTab, setActiveTab] = useState('indian');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const { indian, global, isAdmin, login, logout, addStock, deleteStock } = useAdminStocks();
  const [showLogin, setShowLogin] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [liveData, setLiveData] = useState({});
  
  const currentStocks = activeTab === 'global' ? global : indian;

  useEffect(() => {
    const fetchLive = async () => {
      const symbols = currentStocks.map(s => {
        if (activeTab === 'indian' && !s.symbol.includes('.')) return `${s.symbol}.NS`;
        return s.symbol;
      });

      const results = await Promise.all(symbols.map(s => fetchStockData(s)));
      const dataMap = {};
      results.forEach(r => {
        if (r) {
          // Map back to original symbol
          const originalSymbol = r.symbol.replace('.NS', '');
          dataMap[originalSymbol] = r;
        }
      });
      setLiveData(prev => ({ ...prev, ...dataMap }));
    };

    fetchLive();
    const interval = setInterval(fetchLive, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [activeTab, currentStocks.length]); // Refresh on tab change or when stocks are added/removed

  // Stagger chars animation for hero title
  const words = ['Strategic', 'Markets.'];

  return (
    <div className="min-h-screen bg-[#050b51] text-white font-inter relative overflow-x-hidden">
      <Orbs />

      {/* ─── Nav ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-6 md:px-14 py-6"
        style={{ background: 'linear-gradient(to bottom, rgba(5,11,81,0.95), transparent)', backdropFilter: 'blur(4px)' }}>
        <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 text-xs uppercase tracking-[0.3em] font-medium">
          <ArrowLeft size={13} />
          Portfolio
        </Link>
        <span className="font-playfair text-base tracking-widest bg-gradient-to-r from-[#c5a059] to-amber-300 bg-clip-text text-transparent">ASN</span>
        <Link to="/photography" className="text-white/50 hover:text-white transition-colors duration-300 text-xs uppercase tracking-[0.3em] font-medium hidden md:block">
          Photography
        </Link>
      </nav>

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="text-center relative z-10 px-6">

          {/* Pre-label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="w-8 h-[1px] bg-[#c5a059]/50" />
            <p className="text-[0.6rem] uppercase tracking-[0.55em] text-[#c5a059]/80 font-medium">Market Intelligence · 2026</p>
            <div className="w-8 h-[1px] bg-[#c5a059]/50" />
          </motion.div>

          {/* Hero heading with mask reveal */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-[14vw] md:text-[9vw] lg:text-[8rem] font-light tracking-tight leading-[0.9] bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent"
            >
              Strategic
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-[14vw] md:text-[9vw] lg:text-[8rem] font-light tracking-tight leading-[0.9] italic bg-gradient-to-br from-[#c5a059] to-amber-200 bg-clip-text text-transparent"
            >
              Markets.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="mt-10 text-white/40 text-sm md:text-base max-w-md mx-auto leading-relaxed font-light tracking-wide"
          >
            Curated picks informed by fundamentals, trends, and disciplined conviction.
          </motion.p>
        </motion.div>

        {/* Ticker bar */}
        <div className="absolute bottom-0 inset-x-0 border-t border-white/8 bg-[#050b51]/60">
          <AnimatedTicker items={TICKER} />
        </div>
      </section>

      {/* ─── Suggestions Grid ─────────────────────────────────── */}
      <section id="suggestions" className="py-28 md:py-40 px-6 md:px-14 max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 pb-10 border-b border-white/8"
        >
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.45em] text-[#c5a059]/80 mb-4 font-medium">Current Positions</p>
            <div className="flex items-center gap-6 flex-wrap">
              <h2 className="font-playfair text-5xl md:text-6xl font-light tracking-tight leading-none">
                My Picks<span className="italic text-white/30">.</span>
              </h2>
              <button 
                onClick={() => isAdmin ? setShowAdd(true) : setShowLogin(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all group"
              >
                <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                Add Suggestion
              </button>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 self-start md:self-auto">
            {['indian', 'global'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-7 py-2.5 rounded-full text-[0.65rem] tracking-[0.2em] uppercase font-bold transition-colors duration-300 ${activeTab === tab ? 'text-black' : 'text-white/40 hover:text-white'}`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-[#c5a059]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab === 'indian' ? 'India' : 'Global'}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {currentStocks.map((stock, i) => {
              const live = liveData[stock.symbol];
              const displayStock = live ? {
                ...stock,
                price: `${live.currency === 'INR' ? '₹' : '$'}${live.price}`,
                trend: live.trend,
                up: live.up
              } : stock;

              return (
                <StockCard
                  key={stock.id || `${activeTab}-${stock.symbol}`}
                  stock={displayStock}
                  index={i}
                  isAdmin={isAdmin}
                  onDelete={(id) => deleteStock(activeTab, id)}
                  onAuthTrigger={() => setShowLogin(true)}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Admin badge when active */}
        {isAdmin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-[#c5a059]/20" />
            <p className="text-[0.55rem] uppercase tracking-[0.3em] text-[#c5a059]/50">Admin Mode Active — Use + to add, 🗑 to delete</p>
            <div className="h-[1px] w-16 bg-[#c5a059]/20" />
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-[0.55rem] uppercase tracking-[0.3em] text-white/15 text-center leading-relaxed max-w-xl mx-auto"
        >
          Not financial advice. All suggestions are for informational purposes only.
          Past performance is not indicative of future results.
        </motion.p>
      </section>

      <AdminPanel 
        isAdmin={isAdmin} 
        onLogin={login} 
        onLogout={logout} 
        onAdd={addStock} 
        market={activeTab} 
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        showAdd={showAdd}
        setShowAdd={setShowAdd}
      />

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="py-16 px-6 md:px-14 flex items-center justify-between border-t border-white/5 text-white/20 text-[0.6rem] uppercase tracking-[0.35em]">
        <span>© 2026 AS Naidu</span>
        <span className="font-playfair text-base not-italic normal-case bg-gradient-to-r from-[#c5a059] to-amber-300 bg-clip-text text-transparent">ASN</span>
        <span>Financial Collective</span>
      </footer>
    </div>
  );
}

