import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '../assets/IMG_3029 2.png';

const Hero = () => {
  const { scrollYProgress } = useScroll();

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <section id="home" className="relative h-screen bg-[#050b51] overflow-hidden flex items-end justify-center">
      {/* Radial Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-[#820e0e]/15 rounded-full blur-[100px]" />
      <div className="absolute bottom-[10%] left-[40%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

      {/* Floating geometric shapes */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 90, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[45%] opacity-30 hidden md:block"
      >
        <div className="w-20 h-20 border border-white/20 rounded-full" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -20, 0], rotate: [0, -45, 0] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[35%] left-[10%] opacity-20 hidden md:block"
      >
        <div className="w-16 h-16 border border-white/30 rotate-45" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.4, 0.1] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] left-[5%] hidden md:block"
      >
        <div className="w-3 h-3 bg-[#820e0e] rounded-full" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl px-6 flex flex-col md:flex-row items-end justify-center h-full"
      >
        {/* Text Section */}
        <motion.div 
          style={{ y: yText }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-20 mb-[10vh] md:mb-[30vh] text-left"
        >
          <h1 className="text-5xl md:text-8xl font-extrabold leading-[0.9] uppercase tracking-tighter overflow-hidden">
            <motion.span variants={textVariants} className="text-[#820e0e] block">Nandyala</motion.span>
            <motion.span variants={textVariants} className="text-white block">Aditya</motion.span>
            <motion.span variants={textVariants} className="text-white block">Sai</motion.span>
          </h1>
          
          <motion.div variants={textVariants} className="mt-10 flex items-center gap-5">
            <div className="h-[2px] w-16 bg-[#820e0e]"></div>
            <p className="text-white/80 tracking-[0.25em] uppercase text-xs md:text-sm font-medium">
              Creative Developer & Innovator
            </p>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:-mr-[50px] z-10"
        >
          <img 
            src={heroImage} 
            alt="Aditya Sai" 
            className="max-h-[70vh] md:max-h-[85vh] w-auto object-contain pointer-events-none"
          />
        </motion.div>
      </motion.div>

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
