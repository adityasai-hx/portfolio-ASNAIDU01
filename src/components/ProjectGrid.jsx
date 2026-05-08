import React from 'react';
import { Github, ExternalLink, Activity, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

import gamfi from '../assets/gamfi.jpeg';
import finalImg from '../assets/final.jpeg';
import invent from '../assets/invent.jpeg';

const projects = [
  {
    title: 'Gamified Learning Platform',
    date: 'May 12, 2025',
    description: 'An immersive educational platform that uses game mechanics to enhance user engagement and learning retention.',
    image: gamfi,
    github: 'https://github.com/adityasai-hx/1ST-GAMIFIED',
    live: '#',
    status: 'Live',
    tech: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'Game Engine Architecture',
    date: 'November 7, 2024',
    description: 'A custom 3D game engine showcasing advanced rendering techniques, physics simulation, and optimal memory management.',
    image: finalImg,
    github: 'https://github.com/adityasai-hx/game',
    live: '#',
    status: 'Featured',
    tech: ['C++', 'OpenGL', 'Physics']
  },
  {
    title: 'Smart Inventory System',
    date: 'October 31, 2024',
    description: 'A scalable inventory management dashboard with real-time analytics, predictive stocking, and modern UI.',
    image: invent,
    github: 'https://github.com/adityasai-hx/portfolio-as01',
    live: '#',
    status: 'Updated',
    tech: ['Next.js', 'Tailwind', 'Firebase']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 } 
  }
};

const ProjectGrid = () => {
  return (
    <section id="writings" className="relative bg-[#EEEEEE] py-32 overflow-hidden selection:bg-[#050b50]/20">
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-[#050b50] mb-6 tracking-tight">
            Projects Showcase
          </h2>

        </motion.div>

        
        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.div key={project.title} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.9 }}>
                <Tilt 
                  tiltMaxAngleX={5} 
                  tiltMaxAngleY={5} 
                  scale={1.02} 
                  transitionSpeed={2000} 
                  className="h-full"
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="24px"
                >
                  <div className="group h-full flex flex-col bg-white/90 backdrop-blur-md border border-gray-100 rounded-[24px] overflow-hidden transition-all duration-500 relative shadow-lg hover:shadow-2xl hover:shadow-[#050b50]/10 hover:-translate-y-2 hover:border-[#050b50]/20">
                    
                    {/* Image Section */}
                    <div className="relative h-60 overflow-hidden border-b border-gray-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent z-10" />
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-90 group-hover:opacity-100 group-hover:scale-105"
                      />
                      
                      <div className="absolute top-5 right-5 z-20">
                        <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-xs font-bold text-gray-800 shadow-sm">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col bg-white relative z-20">
                      <h3 className="text-2xl font-extrabold text-[#050b50] mb-4 tracking-tight transition-all duration-500 group-hover:text-blue-600 group-hover:translate-x-1">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 text-[15px] leading-relaxed mb-8 flex-1">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2.5 mb-8">
                        {project.tech.map(tech => (
                          <div key={tech} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/50 border border-blue-100 text-[13px] text-blue-700 font-medium transition-colors duration-300 group-hover:bg-blue-100/50 group-hover:border-blue-200">
                            <Terminal size={14} className="text-blue-500" />
                            {tech}
                          </div>
                        ))}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group/btn flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-sm font-semibold transition-all duration-300 hover:shadow-sm active:scale-95"
                        >
                          <Github size={18} className="transition-transform duration-300 group-hover/btn:-rotate-12 group-hover/btn:scale-110" />
                          Source
                        </a>
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group/btn flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#050b50] hover:bg-[#0a1580] text-white text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#050b50]/20 active:scale-95"
                        >
                          <ExternalLink size={18} className="transition-transform duration-300 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                          Live Demo
                        </a>
                      </div>
                    </div>

                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        
      </div>
    </section>
  );
};

export default ProjectGrid;
