import React from 'react';
import { Clock } from 'lucide-react';

const projects = [
  {
    title: 'Gamified Learning',
    date: 'May 12, 2025',
    image: '/src/assets/gamfi.jpeg',
    link: 'https://github.com/adityasai-hx/1ST-GAMIFIED'
  },
  {
    title: 'FINAL PROJECT',
    date: 'November 7, 2024',
    image: '/src/assets/final.jpeg',
    link: 'https://github.com/adityasai-hx/game'
  },
  {
    title: 'Inventory Management',
    date: 'October 31, 2024',
    image: '/src/assets/invent.jpeg',
    link: 'https://github.com/adityasai-hx/portfolio-as01'
  }
];

const ProjectGrid = () => {
  return (
    <section id="writings" className="bg-[#EEEEEE] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-prime text-center mb-4">My Projects</h2>
        <p className="text-center text-gray-500 mb-16 font-medium">(takes through GitHub)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <a 
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-[400px] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-gold transition-colors">{project.title}</h3>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <Clock size={16} />
                  <span>{project.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
