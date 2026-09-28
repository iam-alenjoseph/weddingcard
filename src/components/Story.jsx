import React from 'react';
import { motion } from 'framer-motion';

const Story = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-cream min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } }
          }}
          className="flex flex-col gap-10"
        >
          <motion.h3 variants={textVariants} className="text-sm uppercase tracking-[0.3em] text-champagne-dark">
            Our Story
          </motion.h3>

          <motion.p variants={textVariants} className="font-serif text-2xl md:text-4xl text-text-main italic leading-relaxed">
            "Two hearts, two journeys, one beautiful beginning."
          </motion.p>

          <motion.div variants={textVariants} className="flex justify-center">
            <div className="w-px h-16 bg-champagne-dark/50"></div>
          </motion.div>

          <motion.p variants={textVariants} className="text-text-muted text-lg md:text-xl leading-loose font-light">
            Somewhere between ordinary moments and unexpected smiles, <strong className="text-text-main font-medium">Shanto and Anagha</strong> found something extraordinary — a bond that grew with every conversation, every shared moment, and every memory.
          </motion.p>

          <motion.p variants={textVariants} className="text-text-muted text-lg md:text-xl leading-loose font-light">
            What began as two individual journeys slowly became a journey together. Through laughter, dreams, little adventures, and countless memories, their relationship blossomed into a promise of forever.
          </motion.p>

          <motion.p variants={textVariants} className="text-text-muted text-lg md:text-xl leading-loose font-light">
            Now, surrounded by the love of their families and friends, they are ready to begin their next chapter together.
          </motion.p>

          <motion.p variants={textVariants} className="font-serif text-xl md:text-3xl text-champagne-dark mt-8">
            Two hearts. One promise. Forever together.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
