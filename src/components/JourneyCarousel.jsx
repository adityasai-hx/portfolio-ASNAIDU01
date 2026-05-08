import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import img4746 from '../assets/IMG_4746.jpg';
import presentation from '../assets/presentation.jpg';
import rename from '../assets/rename.png';
import img0527 from '../assets/IMG_0527.jpg';
import j1 from '../assets/j1.jpg';
import j2 from '../assets/j2.jpg';

const achievementImages = [
  { id: 1, src: img4746, title: "Leadership Excellence", desc: "Leading teams to deliver high-impact software solutions and driving technical vision." },
  { id: 2, src: presentation, title: "Tech Symposium", desc: "Delivering a keynote presentation on modern architectural patterns and best practices." },
  { id: 3, src: rename, title: "Global Recognition", desc: "Awarded for outstanding contributions and innovative problem solving in the tech community." },
  { id: 4, src: img0527, title: "Team Collaboration", desc: "Fostering an environment of continuous learning, innovation, and rapid growth." },
  { id: 5, src: j1, title: "Hackathon Victory", desc: "Secured first place in the international coding championship against top developers." },
  { id: 6, src: j2, title: "Product Launch", desc: "Successfully orchestrated the deployment and scaling of our flagship application." }
];

const JourneyCarousel = () => {
  const [active, setActive] = useState(0);

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % achievementImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <section id="achievements" className="bg-[#050b51] py-24 md:py-32 overflow-hidden selection:bg-white/20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              My <span className="text-[#820e0e] italic font-serif">Journey</span>
            </h2>
            <p className="text-white/60 mt-6 max-w-xl text-lg font-light">
              A dynamic timeline of milestones, achievements, and memorable moments that have shaped my career trajectory.
            </p>
          </div>
          
          {/* Custom Navigation */}
          <div className="flex gap-4">
             <button 
                onClick={() => setActive(prev => (prev - 1 + achievementImages.length) % achievementImages.length)}
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-sm"
             >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
             </button>
             <button 
                onClick={() => setActive(prev => (prev + 1) % achievementImages.length)}
                className="w-14 h-14 rounded-full border border-[#820e0e] bg-[#820e0e]/10 flex items-center justify-center hover:bg-[#820e0e] transition-colors shadow-[0_0_20px_rgba(130,14,14,0.3)]"
             >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
             </button>
          </div>
        </motion.div>
        
        {/* Expanding Cards Container */}
        <div className="flex w-full h-[55vh] md:h-[70vh] gap-3 md:gap-5">
          {achievementImages.map((img, index) => {
            const isActive = active === index;
            
            return (
              <div 
                key={img.id}
                onClick={() => setActive(index)}
                className="relative rounded-3xl overflow-hidden cursor-pointer group"
                style={{ 
                  flex: isActive ? 10 : 1,
                  transition: "flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {/* Image */}
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  style={{ transformOrigin: 'center center' }}
                />
                
                {/* Overlays */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? 'opacity-10' : 'opacity-70 group-hover:opacity-50'}`} />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#050b51]/90 via-[#050b51]/10 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Active Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute bottom-0 left-0 p-6 md:p-8 w-[85vw] md:w-[600px] pointer-events-none"
                    >
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="w-10 h-10 rounded-full bg-[#820e0e] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(130,14,14,0.6)]"
                      >
                        <span className="text-white font-bold text-sm">0{index + 1}</span>
                      </motion.div>
                      
                      <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight leading-[1.1]">
                        {img.title}
                      </h3>
                      
                      <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-lg hidden md:block">
                        {img.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Vertical Text for Inactive State */}
                <div className={`absolute inset-0 flex items-end justify-center pb-10 transition-opacity duration-500 delay-100 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                   <span 
                      className="text-white/60 group-hover:text-white font-bold tracking-[0.3em] uppercase text-xs md:text-sm whitespace-nowrap transition-colors duration-300" 
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                   >
                      {img.title}
                   </span>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  );
};

export default JourneyCarousel;

