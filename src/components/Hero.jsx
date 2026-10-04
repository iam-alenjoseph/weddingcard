import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Heart, ChevronDown } from 'lucide-react';
import { downloadICS } from '../utils/calendarHelper';

const Hero = ({ openRSVP }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  // Target date: October 24, 2026 12:00:00
  const targetDate = new Date('2026-10-24T12:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const weddingEvent = {
    title: 'Shanto & Anagha Wedding',
    description: 'Join us to celebrate the wedding of Shanto and Anagha at Mary Immaculate Church, Kundoor.',
    location: 'Mary Immaculate Church, Kundoor, Thrissur, Kerala',
    startDate: '20261024T120000Z',
    endDate: '20261024T160000Z',
  };

  const textY = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-charcoal text-white pt-24 pb-12">
      {/* Background Image with Parallax & Dark Overlay */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-black/60 z-10" />
        <img 
          src="./couple.png" 
          alt="Shanto & Anagha" 
          className="w-full h-full object-cover object-top scale-110 filter brightness-85 blur-md saturate-105"
        />
      </motion.div>

      {/* Decorative Golden Ambient Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/80" />

      {/* Top Tagline & Main Names with Parallax */}
      <motion.div style={{ y: textY }} className="relative z-20 flex flex-col items-center justify-center max-w-5xl mx-auto px-6 text-center mt-12 md:mt-20">
        {/* Couple Names */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 font-normal tracking-tight text-white drop-shadow-2xl"
        >
          Shanto <span className="font-script gold-gradient-text text-5xl sm:text-7xl md:text-8xl font-normal px-2">&</span> Anagha
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-cormorant text-xl md:text-3xl text-champagne tracking-widest italic mb-8"
        >
          Are Getting Married
        </motion.p>

        {/* Date Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-3 text-champagne mb-12"
        >
          <Calendar size={18} className="text-gold" />
          <span className="font-serif text-lg md:text-xl tracking-[0.2em] uppercase font-light drop-shadow-md">
            October 24
          </span>
        </motion.div>

        {/* Countdown Timer Grid (Clean floating numbers, no tinted boxes/borders) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl w-full mb-10"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center justify-center text-center py-2"
            >
              <span className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold gold-gradient-text drop-shadow-lg">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-champagne/80 mt-1 font-light">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons (Clean look) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={openRSVP}
            className="px-8 py-3.5 rounded-full gold-gradient-bg text-charcoal font-semibold text-sm uppercase tracking-widest shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
          >
            <Heart size={16} className="fill-charcoal" />
            Send Wishes
          </button>

          <button
            onClick={() => downloadICS(weddingEvent)}
            className="px-6 py-3.5 rounded-full text-champagne hover:text-white font-medium text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
          >
            <Calendar size={16} className="text-gold" />
            Add to Calendar
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="relative z-20 flex flex-col items-center mt-8 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => {
          document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-2">Explore Our Journey</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="p-2 rounded-full border border-gold/30 text-gold bg-black/30 backdrop-blur-sm"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
