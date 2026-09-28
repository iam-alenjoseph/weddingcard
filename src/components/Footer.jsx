import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative py-32 px-6 md:px-12 bg-[#2a2a2a] text-center overflow-hidden">
      {/* Background Image subtle overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop')" }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-serif text-2xl md:text-4xl text-white italic leading-relaxed mb-12">
            "With hearts full of love and joy, <br className="hidden md:block"/>
            we invite you to celebrate our beginning."
          </p>
          
          <h2 className="font-serif text-5xl md:text-7xl text-champagne mb-4 drop-shadow-md">
            Shanto & Anagha
          </h2>
          
          <div className="w-px h-16 bg-champagne-dark/50 mx-auto my-8"></div>
          
          <p className="text-sm tracking-[0.3em] uppercase text-white/70">
            See you there
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
