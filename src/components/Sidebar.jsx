import React from 'react';
import { X, Linkedin, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/img prof 2.png';

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
                <img src={logoImg} alt="Logo" className="h-10 w-auto rounded-full" />
                <div>A.S.<br />Naidu</div>
              </div>
              <button onClick={onClose} className="text-4xl text-gray-800 hover:text-accent transition-colors">
                <X size={32} />
              </button>
            </div>

            <nav className="flex-1">
              <motion.ul 
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                }}
              >
                {['Home', 'Biography', 'My Hobbies', 'My Projects', 'Contact Me'].map((item) => (
                  <motion.li 
                    key={item}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                    }}
                  >
                    <a 
                      href={`#${item.toLowerCase().replace(/\s/g, '')}`}
                      onClick={onClose}
                      className="text-2xl font-semibold text-gray-800 hover:text-accent transition-colors block"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
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
