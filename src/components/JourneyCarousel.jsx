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
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#050b50] text-center mb-16">My Journey</h2>
        
        <div className="relative h-[400px] md:h-[500px] flex justify-center items-center perspective-[1000px]">
          <div className="relative w-full h-full flex justify-center items-center transform-style-3d">
            {achievementImages.map((src, index) => {
              const total = achievementImages.length;
              let diff = index - centerIndex;
              
              // Handle circular logic for diff
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isCenter = diff === 0;
              const isLeft = diff === -1 || (centerIndex === 0 && index === total - 1);
              const isRight = diff === 1 || (centerIndex === total - 1 && index === 0);

              let x = 0;
              let scale = 0.5;
              let rotateY = 0;
              let zIndex = 0;
              let opacity = 0;

              if (isCenter) {
                x = 0;
                scale = 1;
                rotateY = 0;
                zIndex = 10;
                opacity = 1;
              } else if (isLeft) {
                x = -300;
                scale = 0.8;
                rotateY = 45;
                zIndex = 5;
                opacity = 0.6;
              } else if (isRight) {
                x = 300;
                scale = 0.8;
                rotateY = -45;
                zIndex = 5;
                opacity = 0.6;
              }

              return (
                <motion.div
                  key={index}
                  animate={{
                    x,
                    scale,
                    rotateY,
                    zIndex,
                    opacity,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute w-[300px] md:w-[500px] aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-800"
                >
                  <img src={src} alt={`Journey ${index}`} className="w-full h-full object-cover" />
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 z-20">
            <button onClick={prevSlide} className="text-white hover:scale-125 transition-transform"><ChevronLeft size={24} /></button>
            <div className="flex gap-2">
              {achievementImages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCenterIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === centerIndex ? 'bg-white scale-150 shadow-[0_0_10px_white]' : 'bg-white/30'}`}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="text-white hover:scale-125 transition-transform"><ChevronRight size={24} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyCarousel;
