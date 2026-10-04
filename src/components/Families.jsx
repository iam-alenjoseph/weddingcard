import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Families = () => {
  return (
    <section id="families" className="py-24 px-6 md:px-12 bg-cream text-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-champagne-dark font-medium flex items-center justify-center gap-2 mb-3">
            <Sparkles size={14} className="text-gold-dark" />
            With Blessings Of
            <Sparkles size={14} className="text-gold-dark" />
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-text-main font-normal">
            Our Beloved Families
          </h2>
          <div className="w-20 h-0.5 gold-gradient-bg mx-auto mt-6"></div>
        </motion.div>

        {/* Parents Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Groom's Parents */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-white p-10 rounded-2xl shadow-xl border border-champagne-dark/20 flex flex-col items-center relative group hover:border-gold-dark/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center text-charcoal font-serif text-2xl font-bold mb-6 shadow-md">
              S
            </div>
            
            <h3 className="text-xs uppercase tracking-[0.3em] text-champagne-dark font-semibold mb-6">
              Groom's Family
            </h3>
            
            <p className="font-serif text-3xl text-text-main font-medium">Thomas</p>
            <p className="font-script text-3xl text-gold-dark my-2">&</p>
            <p className="font-serif text-3xl text-text-main font-medium">Seleena</p>

            <div className="mt-6 pt-6 border-t border-champagne/40 w-full text-text-muted text-xs uppercase tracking-widest">
              With Love & Gratitude
            </div>
          </motion.div>

          {/* Bride's Parents */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white p-10 rounded-2xl shadow-xl border border-champagne-dark/20 flex flex-col items-center relative group hover:border-gold-dark/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center text-charcoal font-serif text-2xl font-bold mb-6 shadow-md">
              A
            </div>

            <h3 className="text-xs uppercase tracking-[0.3em] text-champagne-dark font-semibold mb-6">
              Bride's Family
            </h3>
            
            <p className="font-serif text-3xl text-text-main font-medium">Joseph K.T</p>
            <p className="font-script text-3xl text-gold-dark my-2">&</p>
            <p className="font-serif text-3xl text-text-main font-medium">Molsy T.J</p>

            <div className="mt-6 pt-6 border-t border-champagne/40 w-full text-text-muted text-xs uppercase tracking-widest">
              With Love & Joy
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Families;
