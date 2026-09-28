import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import RingsAnimation from './components/RingsAnimation';
import Story from './components/Story';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Families from './components/Families';
import Footer from './components/Footer';

function App() {
  // Ensure smooth scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-ivory overflow-x-hidden min-h-screen">
      <Hero />
      <RingsAnimation />
      <Story />
      <Events />
      <Gallery />
      <Families />
      <Footer />
    </div>
  );
}

export default App;
