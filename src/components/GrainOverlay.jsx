import React from 'react';

const GrainOverlay = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-[100] opacity-[0.04]"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
      }}
    />
  );
};

export default GrainOverlay;
