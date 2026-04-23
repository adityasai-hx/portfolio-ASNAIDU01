import React from 'react';
import { Linkedin } from 'lucide-react';

const Connect = () => {
  return (
    <section id="connect" className="bg-[#F4F6F7] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">Let's Connect</h2>
        
        <div className="mx-auto w-40 h-40 rounded-full overflow-hidden shadow-2xl mb-8 border-4 border-white">
          <img src="/src/assets/img prof 2.png" alt="Aditya Sai" className="w-full h-full object-cover" />
        </div>
        
        <h3 className="text-3xl font-extrabold text-prime mb-4 tracking-tight">Aditya Sai Nandyala</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-12 font-medium">
          Thanks for visiting! I'm always open to discussing technology, trading, and collaboration.
          Send a connection request on LinkedIn.
        </p>
        
        <a 
          href="https://www.linkedin.com/in/aditya-sai-nandyala-346178268/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-[#0060ba] text-white px-12 py-5 rounded-full font-bold text-lg transition-all hover:bg-[#004a8f] hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(74,118,168,0.4)]"
        >
          <Linkedin size={24} />
          Connect on LinkedIn
        </a>
      </div>
    </section>
  );
};

export default Connect;
