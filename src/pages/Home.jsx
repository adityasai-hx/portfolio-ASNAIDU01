import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectGrid from '../components/ProjectGrid';
import HobbyGrid from '../components/HobbyGrid';
import JourneyCarousel from '../components/JourneyCarousel';
import VisionMission from '../components/VisionMission';
import Connect from '../components/Connect';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <ProjectGrid />
      <HobbyGrid />
      <JourneyCarousel />
      <VisionMission />
      <Connect />
    </Layout>
  );
};

export default Home;
