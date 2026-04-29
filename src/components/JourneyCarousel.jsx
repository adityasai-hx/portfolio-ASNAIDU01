import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const achievementImages = [
  '/src/assets/IMG_4746.jpg',
  '/src/assets/presentation.jpg',
  '/src/assets/rename.png',
  '/src/assets/IMG_0527.jpg',
  '/src/assets/j1.jpg',
  '/src/assets/j2.jpg'
];

const JourneyCarousel = () => {
  const [centerIndex, setCenterIndex] = useState(0);

  const nextSlide = () => {
    setCenterIndex((prev) => (prev + 1) % achievementImages.length);
  };

  const prevSlide = () => {
    setCenterIndex((prev) => (prev - 1 + achievementImages.length) % achievementImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="achievements" className="bg-[#EEEEEE] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#050b50] text-center mb-16">My Journey</h2>
        </motion.div>
        
        <div className="relative h-[400px] md:h-[600px] flex justify-center items-center perspective-[1200px]">
          <div className="relative w-full h-full flex justify-center items-center transform-style-3d">
            <AnimatePresence initial={false}>
              {achievementImages.map((src, index) => {
                const total = achievementImages.length;
                let diff = index - centerIndex;
                
                // Handle circular logic for diff
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                const absDiff = Math.abs(diff);
                const isCenter = diff === 0;

                // 3D Coverflow Calculations
                const x = diff * (window.innerWidth < 768 ? 120 : 250); // horizontal spread
                const z = -absDiff * 150; // push back in 3D space
                const rotateY = diff * -45; // turn towards center at 45 degrees
                const scale = 1 - (absDiff * 0.1); 
                const opacity = 1 - (absDiff * 0.25);
                const zIndex = 10 - absDiff;

                return (
                  <motion.div
                    key={index}
                    animate={{
                      x,
                      z,
                      rotateY,
                      scale,
                      opacity,
                      zIndex,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30, 
                      mass: 0.8 
                    }}
                    className={`absolute w-[280px] md:w-[600px] aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-gray-900 ${isCenter ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={() => {
                      if (!isCenter) setCenterIndex(index);
                    }}
                    whileHover={isCenter ? { scale: 1.05, shadow: "0 25px 60px rgba(0,0,0,0.5)" } : {}}
                  >
                    {/* Dark overlay for side images */}
                    <motion.div 
                      className="absolute inset-0 bg-black z-10"
                      animate={{ opacity: isCenter ? 0 : 0.4 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    <img 
                      src={src} 
                      alt={`Journey ${index}`} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out" 
                      style={{ transform: isCenter ? 'scale(1)' : 'scale(1.1)' }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Left Navigation Button */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#050b50] hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Right Navigation Button */}
            <button 
              onClick={nextSlide}
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#050b50] hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyCarousel;

