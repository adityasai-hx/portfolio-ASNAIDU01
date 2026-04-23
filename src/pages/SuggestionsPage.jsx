import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ChevronRight, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import GrainOverlay from '../components/GrainOverlay';

const stocks = [
  { symbol: 'NVDA', name: 'Nvidia Corporation', price: '$145.20', trend: '+2.4%', up: true, category: 'Tech / Growth' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: '$202.15', trend: '-0.8%', up: false, category: 'Finance / Value' },
];

const tickerItems = ['AAPL +1.2%', 'TSLA -0.5%', 'NVDA +2.8%', 'MSFT +0.9%', 'AMZN +1.5%'];

const SuggestionsPage = () => {
  return (
    <div className="min-h-screen bg-[#0d0e0e] text-white font-inter relative overflow-hidden">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative">
        <nav className="absolute top-10 flex items-center gap-12 text-[0.7rem] uppercase tracking-[0.3em] font-medium text-white/60">
          <Link to="/" className="hover:text-white transition-colors">Portfolio</Link>
          <div className="border border-gold text-gold px-7 py-3 rounded-full font-playfair text-xl tracking-wider">ASN</div>
          <a href="#suggestions" className="hover:text-white transition-colors">Suggestions</a>
        </nav>

        <h1 className="font-playfair text-7xl md:text-[8rem] font-light tracking-tight mb-4">AS Naidu</h1>
        
        <div className="flex items-center gap-6 opacity-40 text-[0.7rem] uppercase tracking-[0.4em]">
          <div className="w-10 h-[1px] bg-white"></div>
          Strategic Growth — Informed Wealth
          <div className="w-10 h-[1px] bg-white"></div>
        </div>

        {/* Custom Stock Ticker */}
        <div className="absolute bottom-0 w-full bg-white/5 py-4 overflow-hidden border-t border-white/10">
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="text-sm font-medium tracking-widest text-white/80">{item}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section id="suggestions" className="py-32 px-12 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-playfair mb-4">Current Suggestions</h2>
          <p className="text-white/40 tracking-wide">Curated assets for the 2026 fiscal year.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stocks.map((stock, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-[#161717] p-12 border border-white/5 hover:border-gold transition-all duration-500 group"
            >
              <div className="text-[0.6rem] uppercase tracking-[0.2em] text-gold mb-6">{stock.category}</div>
              <h3 className="text-4xl font-playfair mb-2 tracking-tight">{stock.symbol}</h3>
              <p className="text-white/40 mb-8">{stock.name}</p>
              
              <div className="text-2xl font-medium mb-12 flex items-center gap-4">
                {stock.price}
                <span className={`text-sm flex items-center gap-1 ${stock.up ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stock.trend}
                </span>
              </div>

              <button className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] px-8 py-3 border border-white/20 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all font-bold">
                Full Report
                <ChevronRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center opacity-20 text-xs tracking-widest uppercase">
        © 2026 AS Naidu Financial Collective
      </footer>
    </div>
  );
};

export default SuggestionsPage;
