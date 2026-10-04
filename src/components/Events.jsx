import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Sparkles, Navigation } from 'lucide-react';
import { downloadICS } from '../utils/calendarHelper';

const EventCard = ({ title, date, time, venue, location, imageSrc, mapUrl, icsEvent, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
    className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-champagne-dark/20 flex flex-col group hover:-translate-y-2 transition-all duration-500 h-full"
  >
    {/* Card Header Image */}
    <div className="relative h-56 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>

    {/* Card Details Body */}
    <div className="p-7 flex flex-col flex-grow justify-between text-center items-center">
      <div className="w-full">
        <h3 className="font-serif text-2xl text-text-main mb-4 font-medium">{title}</h3>
        
        <div className="flex flex-col gap-3 text-text-muted font-light mb-6">
          {/* Date */}
          <div className="flex items-center justify-center gap-2.5 text-text-main font-medium">
            <Calendar size={18} className="text-gold-dark shrink-0" />
            <span className="text-sm md:text-base">{date}</span>
          </div>
          
          {/* Time */}
          {time && (
            <div className="flex items-center justify-center gap-2.5 text-text-muted">
              <Clock size={16} className="text-gold-dark shrink-0" />
              <span className="text-xs md:text-sm">{time}</span>
            </div>
          )}
          
          {/* Venue & Location */}
          <div className="flex flex-col items-center gap-1 pt-4 border-t border-champagne/40">
            <MapPin size={20} className="text-gold-dark mb-1 shrink-0" />
            <span className="font-serif text-base font-semibold text-text-main">{venue}</span>
            {location && <span className="text-xs text-text-muted">{location}</span>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-3 pt-4 border-t border-champagne/40 justify-center items-center">
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 text-text-main hover:text-gold-dark text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <Navigation size={14} className="text-gold-dark" />
            Google Maps
          </a>
        )}

        <button
          onClick={() => downloadICS(icsEvent)}
          className="py-2 px-3 text-text-main hover:text-gold-dark text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <Calendar size={14} className="text-gold-dark" />
          Add to Calendar
        </button>
      </div>
    </div>
  </motion.div>
);

const Events = () => {
  const engagementChurchEvent = {
    title: 'Engagement Ceremony',
    description: 'The Ring Exchange & Engagement Ceremony of Shanto Thomas & Anagha Joseph.',
    location: 'St. Jude Church, Judes Mount, Vellamunda 8/4',
    startDate: '20261019T113000Z',
    endDate: '20261019T133000Z',
  };

  const engagementReceptionEvent = {
    title: 'Engagement Reception',
    description: 'Engagement Reception Celebration at Kaippani Residency.',
    location: 'Kaippani Residency, Vellamunda 8/4',
    startDate: '20261019T133000Z',
    endDate: '20261019T170000Z',
  };

  const weddingEvent = {
    title: 'Holy Matrimony & Nuptials',
    description: 'The Holy Matrimony & Wedding Celebration of Shanto Thomas & Anagha Joseph.',
    location: 'Mary Immaculate Church, Kundoor, Thrissur',
    startDate: '20261024T120000Z',
    endDate: '20261024T160000Z',
  };

  return (
    <section id="events" className="py-24 px-6 md:px-12 bg-cream relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-champagne-dark font-medium flex items-center justify-center gap-2 mb-3">
            <Sparkles size={14} className="text-gold-dark" />
            Wedding Schedule
            <Sparkles size={14} className="text-gold-dark" />
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-text-main font-normal">
            Dates & Venues
          </h2>
          <div className="w-20 h-0.5 gold-gradient-bg mx-auto mt-6"></div>
        </motion.div>

        {/* 3 Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <EventCard 
            title="Engagement Ceremony"
            date="Monday, 19 October 2026"
            time="11:30 AM"
            venue="St. Jude Church, Judes Mount"
            location="Vellamunda 8/4"
            imageSrc="./photos/photo3.jpeg"
            mapUrl="https://maps.app.goo.gl/BQx1nZnEZxc53ZGW9?g_st=aw"
            icsEvent={engagementChurchEvent}
            delay={0.1}
          />

          <EventCard 
            title="Engagement Reception"
            date="Monday, 19 October 2026"
            venue="Kaippani Residency"
            location="Vellamunda 8/4"
            imageSrc="./photos/photo4.jpeg"
            mapUrl="https://maps.app.goo.gl/iqSGocDitqhrdwDQ8?g_st=aw"
            icsEvent={engagementReceptionEvent}
            delay={0.2}
          />

          <EventCard 
            title="Holy Wedding Nuptials"
            date="Saturday, 24 October 2026"
            time="12:00 PM (Noon)"
            venue="Mary Immaculate Church"
            location="Kundoor, Thrissur"
            imageSrc="./photos/photo6.jpeg"
            mapUrl="https://maps.google.com/?q=Mary+Immaculate+Church+Kundoor+Thrissur"
            icsEvent={weddingEvent}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default Events;
