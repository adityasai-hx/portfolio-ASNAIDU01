import React from 'react';

const BottomNav = () => {
  const sections = [
    { label: 'About Me', href: '#about' },
    { label: 'My Projects', href: '#writings' },
    { label: 'My Hobbies', href: '#hobbies' },
    { label: 'My Journey', href: '#achievements' },
    { label: 'V & M', href: '#vision' },
    { label: 'Connect', href: '#connect' },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full flex gap-1 shadow-xl z-[999] border border-white/20">
      {sections.map((section) => (
        <a 
          key={section.label}
          href={section.href} 
          className="text-gray-800 font-semibold text-[0.8rem] md:text-sm px-4 py-2 rounded-full transition-all hover:bg-gray-100 whitespace-nowrap"
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
};

export default BottomNav;
