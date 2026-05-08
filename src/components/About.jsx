import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Linkedin } from 'lucide-react';
import img0527 from '../assets/IMG_0527.jpg';
import img2096 from '../assets/IMG_2096_2.jpg';

const About = () => {
  const [isFullBio, setIsFullBio] = useState(false);

  const toggleBio = () => {
    setIsFullBio(!isFullBio);
    if (isFullBio) {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="bg-[#f9f9f9] py-24 md:py-32 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!isFullBio ? (
            <motion.div 
              key="summary"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl"
            >
              <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="block text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Biography</motion.span>
              <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="text-4xl md:text-5xl font-extrabold text-[#0e074a] mb-8">About Me</motion.h2>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="text-lg leading-relaxed text-gray-600 space-y-6">
                <p>
                  I am a Computer Science and Engineering student passionate about problem-solving, 
                  systems thinking, and building efficient software. I focus on strong fundamentals 
                  in programming and computer science, and I enjoy understanding how systems work 
                  at a deeper level.
                </p>
                <p>
                  Alongside my technical interests, I actively contribute to college events through 
                  photography, videography, and video editing, combining creativity with technology. 
                  My goal is to grow into a high-impact engineer through continuous learning 
                  and disciplined practice... 
                  <button 
                    onClick={toggleBio}
                    className="ml-2 font-bold text-accent hover:underline decoration-2 underline-offset-4"
                  >
                    Read More
                  </button>
                </p>
              </motion.div>
              
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <a 
                  href="https://www.linkedin.com/in/aditya-sai-nandyala-346178268/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#0060ba] text-white px-8 py-4 rounded-lg font-bold transition-all hover:bg-[#004a8f] hover:scale-105 active:scale-95 shadow-lg"
                >
                  <Linkedin size={20} />
                  Connect on LinkedIn
                </a>
                <p className="text-sm font-bold text-gray-400 italic md:text-right">— A.S.Naidu</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16 pb-8 border-b border-gray-200">
                <h2 className="text-5xl md:text-7xl font-extrabold text-black leading-tight">
                  Aditya Sai<br />
                  <span className="text-[#050b50]">Nandyala</span>
                </h2>
                <div className="max-w-md border-l-4 border-prime pl-8">
                  <p className="text-lg font-semibold text-gray-800 leading-relaxed italic">
                    "I strive to understand not just what works, but why it works. My goal is to work in high-impact technical roles where performance and precision matter."
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="relative w-full lg:w-[45%] aspect-[1/1.2] shrink-0">
                  <div className="absolute top-0 left-0 w-[80%] h-[70%] rounded-2xl overflow-hidden shadow-2xl z-0">
                    <img src={img0527} alt="Casual" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-[75%] h-[60%] rounded-2xl overflow-hidden shadow-2xl z-10 border-8 border-white">
                    <img src={img2096} alt="Portrait" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex-1 text-lg leading-relaxed text-gray-600 space-y-6">
                  <p>
                    I am a Computer Science and Engineering student with a deep passion for problem-solving, 
                    systems thinking, and building efficient, scalable software. I am naturally curious 
                    about how technology works beneath the surface...
                  </p>
                  <p>
                    My academic journey has helped me build strong foundations in programming, mathematics, 
                    and logical reasoning. I place great importance on strengthening these fundamentals...
                  </p>
                  <p>
                    Alongside my technical pursuits, I have developed strong skills in video editing, 
                    photography, and videography. I actively contribute to college events by managing 
                    visual documentation...
                  </p>

                  <div className="pt-8">
                    <button 
                      onClick={toggleBio}
                      className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-3 rounded-full font-bold transition-all hover:bg-accent hover:scale-105 active:scale-95"
                    >
                      <ArrowUp size={18} />
                      Back to Summary
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
