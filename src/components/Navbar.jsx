import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Heart } from 'lucide-react';

const Navbar = ({ isPlaying, toggleMusic, openRSVP }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Events', href: '#events' },
    { name: 'Families', href: '#families' },
    { name: 'Send Wishes', href: '#rsvp' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-cream/90 backdrop-blur-md shadow-md py-3 border-b border-champagne-dark/20' 
            : 'bg-gradient-to-b from-black/60 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Monogram */}
          <a href="#" className="flex items-center gap-2 group">
            <span className={`font-serif text-2xl font-bold tracking-wider ${scrolled ? 'text-text-main' : 'text-white'}`}>
              S <span className="font-script text-champagne-dark text-3xl">&</span> A
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm tracking-widest uppercase font-medium transition-colors hover:text-champagne-dark ${
                  scrolled ? 'text-text-main' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions: Music toggle & Send Wishes CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMusic}
              className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                scrolled 
                  ? 'bg-champagne/50 hover:bg-champagne text-champagne-dark' 
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              }`}
              title={isPlaying ? "Mute Background Music" : "Play Ambient Wedding Music"}
            >
              {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
            </button>

            <button
              onClick={openRSVP}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full gold-gradient-bg text-charcoal font-medium text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Heart size={14} className="fill-charcoal" />
              Send Wishes
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-text-main' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-cream/95 backdrop-blur-xl border-b border-champagne-dark/20 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col py-6 px-8 gap-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-text-main text-base uppercase tracking-widest font-serif py-2 border-b border-champagne/30"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRSVP();
                }}
                className="mt-4 py-3 rounded-full gold-gradient-bg text-charcoal font-medium text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <Heart size={16} className="fill-charcoal" />
                Send Wishes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
