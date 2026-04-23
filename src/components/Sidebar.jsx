import React from 'react';
import { X, Linkedin, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1999]"
          />
          
          {/* Sidebar Panel */}
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-[320px] md:w-[400px] h-full bg-white z-[2000] p-10 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-3 text-[#070067] font-extrabold text-xl leading-tight">
                <img src="/src/assets/img prof 2.png" alt="Logo" className="h-10 w-auto rounded-full" />
                <div>A.S.<br />Naidu</div>
              </div>
              <button onClick={onClose} className="text-4xl text-gray-800 hover:text-accent transition-colors">
                <X size={32} />
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-6">
                {['Home', 'Biography', 'My Hobbies', 'My Projects', 'Contact Me'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase().replace(/\s/g, '')}`}
                      onClick={onClose}
                      className="text-2xl font-semibold text-gray-800 hover:text-accent transition-colors block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto flex gap-6">
              <a href="#" className="text-gray-800 hover:text-accent transition-all hover:scale-110">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-800 hover:text-accent transition-all hover:scale-110">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-800 hover:text-accent transition-all hover:scale-110">
                <Facebook size={24} />
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
