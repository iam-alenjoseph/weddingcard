import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RingsAnimation from './components/RingsAnimation';
import Story from './components/Story';
import Events from './components/Events';
import Families from './components/Families';
import Footer from './components/Footer';
import FallingPetals from './components/FallingPetals';
import { weddingAudio } from './utils/audioSynth';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleMusic = async () => {
    const active = await weddingAudio.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="font-sans text-text-main bg-ivory overflow-x-hidden min-h-screen selection:bg-gold-light selection:text-charcoal relative">
      <FallingPetals />
      <Navbar 
        isPlaying={isPlaying} 
        toggleMusic={toggleMusic} 
      />
      <Hero />
      <RingsAnimation />
      <Story />
      <Events />
      <Families />
      <Footer />
    </div>
  );
}

export default App;
