import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import photo2 from '../assets/photo2.jpeg';
import photo5 from '../assets/photo5.jpeg';

const Story = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="story" className="py-24 px-6 md:px-12 bg-ivory relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-champagne/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-gold-light/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-champagne-dark font-medium flex items-center justify-center gap-2 mb-3">
            <Sparkles size={14} className="text-gold-dark" />
            Love & Harmony
            <Sparkles size={14} className="text-gold-dark" />
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-text-main font-normal">
            Our Love Story
          </h2>
          <div className="w-20 h-0.5 gold-gradient-bg mx-auto mt-6"></div>
        </motion.div>

        {/* Story Grid with Photos & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Photo Cards Stack */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative Frame border */}
              <div className="absolute -inset-4 rounded-2xl border border-champagne-dark/30 transform -rotate-3 pointer-events-none" />
              
              {/* Main Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group">
                <img 
                  src={photo2} 
                  alt="Shanto & Anagha Story" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-serif text-lg italic">"Every love story is beautiful, but ours is my favorite."</p>
                </div>
              </div>

              {/* Inset Secondary Photo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-8 -right-6 w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <img 
                  src={photo5} 
                  alt="Shanto & Anagha Moment" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Story Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <span className="font-script text-4xl text-champagne-dark">
              Two Hearts, One Journey
            </span>

            <p className="font-cormorant text-2xl md:text-3xl text-text-main italic leading-relaxed">
              "Somewhere between ordinary moments and unexpected smiles, Shanto and Anagha found something extraordinary."
            </p>

            <p className="text-text-muted text-base md:text-lg leading-relaxed font-light">
              What started as two separate lives slowly became one beautiful journey. Somewhere between the little moments, endless conversations, shared dreams, and being there for each other, they found something worth holding on to for a lifetime.
            </p>

            <p className="text-text-muted text-base md:text-lg leading-relaxed font-light">
              And now, with God’s blessings and surrounded by the love of their family and friends, they’re ready to begin a new chapter together, choosing each other today, tomorrow, and for all the days to come.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <div className="p-3 rounded-full gold-gradient-bg text-charcoal shadow-md">
                <Heart size={20} className="fill-charcoal" />
              </div>
              <div>
                <p className="font-serif text-lg font-medium text-text-main">Shanto & Anagha</p>
                <p className="text-xs uppercase tracking-widest text-champagne-dark">The Forever Promise</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
