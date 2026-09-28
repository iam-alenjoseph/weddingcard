import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';

const EventCard = ({ title, date, time, venue, location, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
    className="bg-white p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-champagne/30 text-center flex flex-col items-center group hover:-translate-y-2 transition-transform duration-500 w-full"
  >
    <h3 className="font-serif text-2xl md:text-3xl text-text-main mb-6">{title}</h3>
    
    <div className="flex flex-col gap-4 text-text-muted font-light">
      <div className="flex items-center justify-center gap-2">
        <Calendar size={18} className="text-champagne-dark shrink-0" />
        <span className="text-sm md:text-base">{date}</span>
      </div>
      
      {time && (
        <div className="flex items-center justify-center gap-2">
          <Clock size={18} className="text-champagne-dark shrink-0" />
          <span className="text-sm md:text-base">{time}</span>
        </div>
      )}
      
      <div className="flex flex-col items-center gap-1 mt-4">
        <MapPin size={22} className="text-champagne-dark mb-2 shrink-0" />
        <span className="font-medium text-text-main text-sm md:text-base">{venue}</span>
        <span className="text-sm md:text-base">{location}</span>
      </div>
    </div>
  </motion.div>
);

const Events = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-ivory">
      <div className="max-w-6xl mx-auto relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#C5A059] mb-4">Celebration</h2>
          <p className="font-serif text-3xl md:text-5xl text-text-main">Dates & Location</p>
          <div className="w-12 md:w-16 h-px bg-[#C5A059] mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <EventCard 
            title="Engagement"
            date="19 October 2026"
            venue="St. Jude Church, Jude's Mount"
            location="Vellamunda, Wayanad"
            delay={0.1}
          />
          <EventCard 
            title="Wedding"
            date="24 October 2026"
            time="12:00 PM"
            venue="Mary Immaculate Church"
            location="Kundoor, Thrissur"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default Events;
