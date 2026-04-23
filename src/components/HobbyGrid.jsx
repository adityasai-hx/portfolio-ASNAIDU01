import React from 'react';
import { BookOpen, Camera, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';

const hobbies = [
  {
    title: 'A.S.N-Suggests',
    icon: <BookOpen />,
    path: '/suggestions',
    className: 'bg-gradient-to-br from-[#C0392B] to-[#E74C3C]'
  },
  {
    title: "A.S.N's Photography",
    icon: <Camera />,
    path: '/photography',
    className: 'bg-gradient-to-br from-[#D4AC0D] to-[#F1C40F]'
  },
  {
    title: "A.S.N's Activities",
    icon: <ListChecks />,
    path: '/activities',
    className: 'bg-gradient-to-br from-[#2980B9] to-[#5499C7]'
  }
];

const HobbyGrid = () => {
  return (
    <section id="hobbies" className="bg-[#f9f9f9] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0e074a] text-center mb-16">My Hobbies</h2>
        
        <div className="flex flex-wrap justify-center gap-10">
          {hobbies.map((hobby, index) => (
            <Link 
              key={index}
              to={hobby.path}
              className={`w-full md:w-[300px] h-[250px] rounded-2xl flex flex-col items-center justify-center text-white shadow-2xl transition-all hover:scale-105 active:scale-95 ${hobby.className}`}
            >
              <div className="text-5xl mb-6 drop-shadow-md">
                {hobby.icon}
              </div>
              <h3 className="text-xl font-bold tracking-wide">{hobby.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HobbyGrid;
