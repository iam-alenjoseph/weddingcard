import React from 'react';
import { motion } from 'framer-motion';

const Families = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-ivory text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-champagne-dark mb-4">Blessings</h2>
          <p className="font-serif text-4xl md:text-5xl text-text-main">Our Families</p>
          <div className="w-16 h-px bg-champagne-dark mx-auto mt-6"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-lg uppercase tracking-[0.2em] text-text-muted mb-4">Groom's Parents</h3>
            <p className="font-serif text-2xl md:text-3xl text-text-main mb-2">Thomas</p>
            <p className="text-champagne-dark italic font-serif">&</p>
            <p className="font-serif text-2xl md:text-3xl text-text-main mt-2">Seleena</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-lg uppercase tracking-[0.2em] text-text-muted mb-4">Bride's Parents</h3>
            <p className="font-serif text-2xl md:text-3xl text-text-main mb-2">Joseph K.T</p>
            <p className="text-champagne-dark italic font-serif">&</p>
            <p className="font-serif text-2xl md:text-3xl text-text-main mt-2">Molsy T.J</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Families;
