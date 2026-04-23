import React from 'react';

const VisionMission = () => {
  return (
    <>
      {/* Vision Section */}
      <section 
        id="vision" 
        className="relative min-h-[400px] md:h-[600px] flex items-center justify-center py-24 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-right text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 italic drop-shadow-lg">My Vision</h2>
          <p className="text-lg md:text-2xl leading-relaxed max-w-3xl ml-auto opacity-90 drop-shadow-md">
            To build a career at the intersection of technology, mathematics, and decision-making, 
            becoming a highly skilled Quant Trader and software engineer who creates efficient, 
            data-driven systems. I aim to work on problems where performance, precision, and 
            clarity of thought matter.
          </p>
        </div>
      </section>

      <div className="h-[2px] bg-white/20" />

      {/* Mission Section */}
      <section 
        id="mission" 
        className="relative min-h-[400px] md:h-[600px] flex items-center py-24 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/95 to-[#0a192f]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 italic drop-shadow-lg">My Mission</h2>
          <p className="text-lg md:text-2xl leading-relaxed max-w-3xl text-blue-50/90 border-l-4 border-[#64ffda] pl-8 font-light drop-shadow-md">
            My mission is to build strong foundations in computer science, mathematics, and 
            programming while sharpening my problem-solving and analytical skills. I aim to 
            develop efficient, high-performance software and prepare for quant trading roles 
            that require precision and data-driven thinking.
          </p>
        </div>
      </section>
    </>
  );
};

export default VisionMission;
