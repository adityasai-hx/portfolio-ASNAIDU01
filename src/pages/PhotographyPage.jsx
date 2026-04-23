import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GrainOverlay from '../components/GrainOverlay';

const photos = [
  'v1.jpeg', 'v2.jpeg', 'v3.jpeg', 'v4.jpeg', 'v5.png', 'v6.jpeg', 
  'v7.jpeg', 'v8.jpeg', 'v9.jpeg', 'v10.jpeg', 'i1.jpeg', 'i2.jpeg', 
  'i3.jpeg', 'i4.jpeg', 'i5.jpeg', 'i6.jpeg', 'i7.jpeg'
];

const PhotographyPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-inter relative overflow-hidden">
      <GrainOverlay />
      
      {/* Hero Section */}
      <section 
        className="h-[80vh] flex flex-col items-center justify-center relative text-center bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80')" }}
      >
        <nav className="absolute top-10 flex items-center gap-12 text-[0.7rem] uppercase tracking-[0.3em] font-medium text-white/60">
          <Link to="/" className="hover:text-white transition-colors">Portfolio</Link>
          <div className="border border-white text-white px-7 py-3 rounded-full font-playfair text-xl tracking-wider">ASN</div>
          <Link to="/suggestions" className="hover:text-white transition-colors">Suggestions</Link>
        </nav>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-playfair text-6xl md:text-[7rem] font-light tracking-tighter mb-4"
        >
          AS Naidu
        </motion.h1>
        
        <div className="flex items-center gap-6 opacity-40 text-[0.6rem] uppercase tracking-[0.5em]">
          <div className="w-10 h-[1px] bg-white"></div>
          Enchanting Frames — Endless Memories
          <div className="w-10 h-[1px] bg-white"></div>
        </div>

        <div className="absolute bottom-10 text-[0.6rem] uppercase tracking-[0.3em] opacity-40 animate-bounce">
          Scroll
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-playfair mb-16 tracking-wide">Photography</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] overflow-hidden bg-gray-900 group cursor-pointer"
            >
              <img 
                src={`/src/assets/${src}`} 
                alt={`Photo ${i}`} 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Videography placeholder */}
      <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-white/5">
        <h2 className="text-3xl font-playfair mb-16 tracking-wide">Videography</h2>
        <div className="aspect-video w-full bg-black flex items-center justify-center text-white/20 uppercase tracking-[1em] text-sm italic">
          Coming Soon
        </div>
      </section>

      <footer className="py-20 text-center opacity-20 text-xs tracking-widest uppercase">
        © 2026 AS Naidu Visual Arts
      </footer>
    </div>
  );
};

export default PhotographyPage;
