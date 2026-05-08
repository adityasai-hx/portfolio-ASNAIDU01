import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../assets/img prof 2.png';

const Navbar = ({ toggleSidebar }) => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-0 left-0 w-full p-5 md:px-12 flex justify-between items-center z-[1000]"
    >
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={logoImg} alt="Logo" className="h-10 w-10 rounded-full object-cover shadow-md border border-white/10 transition-transform hover:scale-110" />
        <div className="font-black text-xl tracking-[0.2em] text-white drop-shadow-lg uppercase transition-colors hover:text-gray-300">
          ASN
        </div>
      </div>
      
      <button 
        onClick={toggleSidebar}
        className="w-12 h-12 bg-black rounded-full flex flex-col justify-center items-center gap-1 cursor-pointer transition-transform hover:scale-110"
      >
        <div className="w-[18px] h-[2px] bg-white transition-all"></div>
        <div className="w-[24px] h-[2px] bg-white transition-all"></div>
      </button>
    </motion.header>
  );
};

export default Navbar;
