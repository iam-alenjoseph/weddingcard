import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RingsAnimation = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Left ring animation
  const leftX = useTransform(scrollYProgress, [0, 1], ["-50vw", "-10px"]);
  const leftY = useTransform(scrollYProgress, [0, 1], ["-200px", "0px"]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [-180, 0]);
  
  // Right ring animation
  const rightX = useTransform(scrollYProgress, [0, 1], ["50vw", "10px"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-200px", "0px"]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [180, 0]);

  // Glow and text animation
  const glowOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.9, 1], [20, 0]);

  return (
    <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center bg-ivory relative overflow-hidden py-24">
      
      <div className="relative w-full max-w-lg mx-auto h-[250px] md:h-[300px] flex items-center justify-center mb-8">
        {/* Glow effect behind rings */}
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-champagne-dark/20 rounded-full blur-3xl"
        />

        {/* Left Ring */}
        <motion.div
          style={{ x: leftX, y: leftY, rotate: leftRotate }}
          className="absolute border-[6px] md:border-[8px] border-champagne-dark w-24 h-24 md:w-32 md:h-32 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.5)] z-10"
        />

        {/* Right Ring */}
        <motion.div
          style={{ x: rightX, y: rightY, rotate: rightRotate }}
          className="absolute border-[6px] md:border-[8px] border-champagne w-24 h-24 md:w-32 md:h-32 rounded-full shadow-[0_0_15px_rgba(247,231,206,0.5)] z-20 mix-blend-multiply"
        />
      </div>

      <motion.div 
        style={{ opacity: textOpacity, y: textY }}
        className="text-center z-30"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-champagne-dark mb-4">
          Two Hearts
        </h2>
        <div className="w-12 h-px bg-text-muted mx-auto mb-4"></div>
        <h2 className="font-serif text-4xl md:text-5xl text-text-main">
          One Promise
        </h2>
      </motion.div>
    </section>
  );
};

export default RingsAnimation;
