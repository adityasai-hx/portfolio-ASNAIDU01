import { useState, useEffect } from 'react';

const PASS = 'Aditya*75699';
const KEY_INDIAN = 'asn_indian_stocks';
const KEY_GLOBAL = 'asn_global_stocks';

const DEFAULT_INDIAN = [
  { id: 'r1', symbol: 'RELIANCE',   name: 'Reliance Industries', price: '₹2,950.40', trend: '+1.5%', up: true,  category: 'Conglomerate',    note: 'Jio platform & green energy pivot.' },
  { id: 'r2', symbol: 'TATAMOTORS', name: 'Tata Motors Ltd.',    price: '₹980.15',   trend: '+3.2%', up: true,  category: 'Auto · EV',       note: 'JLR recovery + domestic EV surge.' },
  { id: 'r3', symbol: 'HDFCBANK',   name: 'HDFC Bank Ltd.',      price: '₹1,445.60', trend: '-0.4%', up: false, category: 'Finance · Value', note: 'Post-merger consolidation phase.' },
  { id: 'r4', symbol: 'ZOMATO',     name: 'Zomato Ltd.',         price: '₹185.30',   trend: '+4.8%', up: true,  category: 'Tech · Growth',   note: 'Quick-commerce expansion story.' },
];

const DEFAULT_GLOBAL = [
  { id: 'g1', symbol: 'NVDA', name: 'Nvidia Corporation',   price: '$145.20', trend: '+2.4%', up: true,  category: 'Tech · Growth',    note: 'AI infrastructure dominant player.' },
  { id: 'g2', symbol: 'JPM',  name: 'JPMorgan Chase & Co.', price: '$202.15', trend: '-0.8%', up: false, category: 'Finance · Value',  note: 'Rate-resilient earnings powerhouse.' },
  { id: 'g3', symbol: 'AAPL', name: 'Apple Inc.',            price: '$173.50', trend: '+1.1%', up: true,  category: 'Tech · Blue Chip', note: 'Services flywheel in full motion.' },
  { id: 'g4', symbol: 'MSFT', name: 'Microsoft Corp.',       price: '$415.32', trend: '+1.8%', up: true,  category: 'Tech · Cloud',     note: 'Copilot monetisation accelerating.' },
];

function load(key, fallback) {
  try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : fallback; }
  catch { return fallback; }
}

export function useAdminStocks() {
  const [indian, setIndian] = useState(() => load(KEY_INDIAN, DEFAULT_INDIAN));
  const [global, setGlobal] = useState(() => load(KEY_GLOBAL, DEFAULT_GLOBAL));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => { localStorage.setItem(KEY_INDIAN, JSON.stringify(indian)); }, [indian]);
  useEffect(() => { localStorage.setItem(KEY_GLOBAL, JSON.stringify(global)); }, [global]);

  const login = (pw) => { if (pw === PASS) { setIsAdmin(true); return true; } return false; };
  const logout = () => setIsAdmin(false);

  const addStock = (market, stock) => {
    const entry = { ...stock, id: Date.now().toString(), up: stock.trend.startsWith('+') };
    if (market === 'indian') setIndian(p => [...p, entry]);
    else setGlobal(p => [...p, entry]);
  };

  const deleteStock = (market, id) => {
    if (market === 'indian') setIndian(p => p.filter(s => s.id !== id));
    else setGlobal(p => p.filter(s => s.id !== id));
  };

  return { indian, global, isAdmin, login, logout, addStock, deleteStock };
}
