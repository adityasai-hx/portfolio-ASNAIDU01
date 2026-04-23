import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 w-full p-5 md:px-12 flex justify-between items-center z-[1000]">
      <div className="flex items-center gap-2 font-extrabold text-lg leading-tight text-white drop-shadow-md">
        <img src="/src/assets/img prof 2.png" alt="Logo" className="h-10 w-auto rounded-full" />
        <div>
          Aditya<br />Nandyala
        </div>
      </div>
      
      <button 
        onClick={toggleSidebar}
        className="w-12 h-12 bg-black rounded-full flex flex-col justify-center items-center gap-1 cursor-pointer transition-transform hover:scale-110"
      >
        <div className="w-[18px] h-[2px] bg-white transition-all"></div>
        <div className="w-[24px] h-[2px] bg-white transition-all"></div>
      </button>
    </header>
  );
};

export default Navbar;
