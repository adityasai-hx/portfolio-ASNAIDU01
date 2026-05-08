import React from 'react';
import { Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import profImg from '../assets/img prof 2.png';

const Connect = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="connect" className="bg-[#F4F6F7] py-24 md:py-32">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ staggerChildren: 0.2 }}
        className="max-w-7xl mx-auto px-6 text-center"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">Let's Connect</motion.h2>
        
        <motion.div variants={itemVariants} className="mx-auto w-40 h-40 rounded-full overflow-hidden shadow-2xl mb-8 border-4 border-white">
          <img src={profImg} alt="Aditya Sai" className="w-full h-full object-cover" />
        </motion.div>
        
        <motion.h3 variants={itemVariants} className="text-3xl font-extrabold text-prime mb-8 tracking-tight">Aditya Sai Nandyala</motion.h3>
        
        <motion.a 
          variants={itemVariants}
          href="https://www.linkedin.com/in/aditya-sai-nandyala-346178268/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-[#0060ba] text-white px-12 py-5 rounded-full font-bold text-lg transition-all hover:bg-[#004a8f] hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(74,118,168,0.4)]"
        >
          <Linkedin size={24} />
          Connect on LinkedIn
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Connect;
