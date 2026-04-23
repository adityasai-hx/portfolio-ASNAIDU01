import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen bg-[#050b51] overflow-hidden flex items-end justify-center">
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col md:flex-row items-end justify-center h-full">
        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-20 mb-[10vh] md:mb-[30vh] text-left"
        >
          <h1 className="text-5xl md:text-8xl font-extrabold leading-[0.9] uppercase tracking-tighter">
            <span className="text-[#820e0e] block">Nandyala</span>
            <span className="text-white block">Aditya<br />Sai</span>
          </h1>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative md:-mr-[50px] z-10"
        >
          <img 
            src="/src/assets/IMG_3029 2.png" 
            alt="Aditya Sai" 
            className="max-h-[70vh] md:max-h-[85vh] w-auto object-contain pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Scroll indicator (Optional enhancement) */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 hidden md:flex">
        <span className="[writing-mode:vertical-rl] rotate-180 text-white text-xs tracking-[0.2em] font-medium uppercase opacity-60">
          Scroll Down
        </span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 w-full h-1/3 bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
