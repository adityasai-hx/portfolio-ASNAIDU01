import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Plus, Trash2, X, Eye, EyeOff } from 'lucide-react';

const EMPTY = { symbol: '', name: '', price: '', trend: '', category: '', note: '' };

export default function AdminPanel({ 
  isAdmin, 
  onLogin, 
  onLogout, 
  onAdd, 
  market, 
  showLogin, 
  setShowLogin, 
  showAdd, 
  setShowAdd 
}) {
  const [pw,        setPw]        = useState('');
  const [showPw,    setShowPw]    = useState(false);
  const [error,     setError]     = useState('');
  const [form,      setForm]      = useState(EMPTY);

  const handleLogin = () => {
    const ok = onLogin(pw);
    if (ok) { setShowLogin(false); setPw(''); setError(''); }
    else { setError('Incorrect password.'); }
  };

  const handleAdd = () => {
    if (!form.symbol || !form.name || !form.price || !form.trend) return;
    onAdd(market, form);
    setForm(EMPTY);
    setShowAdd(false);
  };

  return (
    <>
      {/* Floating admin button — bottom right */}
      <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end gap-3">
        <AnimatePresence>
          {isAdmin && (
            <>
              <motion.button
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => setShowAdd(true)}
                className="w-11 h-11 rounded-full bg-[#c5a059] text-black flex items-center justify-center shadow-lg shadow-[#c5a059]/30 hover:scale-110 transition-transform"
                title="Add stock"
              >
                <Plus size={18} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={onLogout}
                className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white/60 flex items-center justify-center hover:bg-white/20 transition-colors"
                title="Logout"
              >
                <Unlock size={15} />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {!isAdmin && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setShowLogin(true)}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/20 hover:text-white/50 flex items-center justify-center transition-colors"
            title="Admin"
          >
            <Lock size={13} />
          </motion.button>
        )}
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showLogin && (
          <Modal onClose={() => { setShowLogin(false); setError(''); setPw(''); }}>
            <h3 className="font-playfair text-2xl mb-2 text-white">Admin Access</h3>
            <p className="text-white/30 text-xs mb-8 tracking-wide">Enter your password to manage suggestions.</p>
            <div className="relative mb-3">
              <input
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={e => setPw(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c5a059]/60 pr-12 placeholder:text-white/20 transition-colors"
                autoFocus
              />
              <button onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mb-4">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-[0.2em] py-3 rounded-lg hover:bg-amber-400 transition-colors mt-2"
            >
              Unlock
            </button>
          </Modal>
        )}
      </AnimatePresence>

      {/* Add Stock Modal */}
      <AnimatePresence>
        {showAdd && (
          <Modal onClose={() => { setShowAdd(false); setForm(EMPTY); }}>
            <h3 className="font-playfair text-2xl mb-6 text-white">Add Stock</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                ['symbol', 'Ticker (e.g. INFY)'],
                ['name',   'Company Name'],
                ['price',  'Price (e.g. ₹1,200)'],
                ['trend',  'Trend (e.g. +2.5%)'],
                ['category','Category'],
                ['note',   'Short note'],
              ].map(([key, ph]) => (
                <input
                  key={key}
                  value={form[key]}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={ph}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#c5a059]/60 placeholder:text-white/20 col-span-1 transition-colors"
                />
              ))}
            </div>
            <button
              onClick={handleAdd}
              className="w-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-[0.2em] py-3 rounded-lg hover:bg-amber-400 transition-colors"
            >
              Add to {market === 'indian' ? 'Indian' : 'Global'} Market
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

function Modal({ children, onClose }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[420px] z-[210] bg-[#0a0f3c] border border-white/10 rounded-2xl p-8"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <X size={16} />
        </button>
        {children}
      </motion.div>
    </>
  );
}
