import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ProjectDashboard } from '../components/ProjectDashboard';
import { InteractiveMap } from '../components/InteractiveMap';
import { EventsSection } from '../components/EventsSection';
import { GamificationSection } from '../components/GamificationSection';
export const Home = () => {
  return <>
      <Hero />
      <Features />
      <ProjectDashboard />
      <InteractiveMap />
      <EventsSection />
      <GamificationSection />
    </>;
};


export default Home;