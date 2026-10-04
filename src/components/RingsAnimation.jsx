import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RingsAnimation = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax convergence: Ring S (left) and Ring A (right) approach & interlock gracefully
  const ringLeftX = useTransform(scrollYProgress, [0.1, 0.5], ["-35vw", "-18px"]);
  const ringRightX = useTransform(scrollYProgress, [0.1, 0.5], ["35vw", "18px"]);
  
  const ringLeftRotate = useTransform(scrollYProgress, [0.1, 0.5], [-180, 0]);
  const ringRightRotate = useTransform(scrollYProgress, [0.1, 0.5], [180, 0]);

  // Parallax depth for text & quote
  const textY = useTransform(scrollYProgress, [0.35, 0.65], [40, -10]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#140C24] text-white overflow-hidden py-28 border-y border-champagne-dark/20"
    >
      {/* Title Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center mb-10"
      >
        <span className="text-xs uppercase tracking-[0.4em] text-champagne-dark font-medium">
          The Holy Covenant
        </span>
      </motion.div>

      {/* Parallax Rings Container Stage */}
      <div className="relative w-full max-w-lg mx-auto h-[260px] md:h-[320px] flex items-center justify-center z-20">

        {/* Left Groom Ring S */}
        <motion.div
          style={{ x: ringLeftX, rotate: ringLeftRotate }}
          className="absolute z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex items-center justify-center drop-shadow-lg"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="ringMatteLavender" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E9D5FF" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6B21A8" />
              </linearGradient>
            </defs>
            {/* Outer Lavender Band */}
            <circle cx="50" cy="50" r="41" fill="none" stroke="url(#ringMatteLavender)" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#F4EFF9" strokeWidth="0.8" strokeOpacity="0.4" />
            {/* Monogram S */}
            <text 
              x="50" 
              y="56" 
              textAnchor="middle" 
              fill="#E9E1F5" 
              fontSize="20" 
              fontFamily="Playfair Display" 
              fontWeight="600"
            >
              S
            </text>
          </svg>
        </motion.div>

        {/* Right Bride Ring A with Solitaire Diamond */}
        <motion.div
          style={{ x: ringRightX, rotate: ringRightRotate }}
          className="absolute z-20 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex items-center justify-center drop-shadow-lg"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="ringLavenderSparkle" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>
            </defs>
            {/* Outer Lavender Band */}
            <circle cx="50" cy="50" r="41" fill="none" stroke="url(#ringLavenderSparkle)" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.5" />
            
            {/* Solitaire Diamond Setting */}
            <polygon points="50,4 56,12 50,20 44,12" fill="#FFFFFF" stroke="#C084FC" strokeWidth="0.5" />
            
            {/* Monogram A */}
            <text 
              x="50" 
              y="56" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontSize="20" 
              fontFamily="Playfair Display" 
              fontWeight="600"
            >
              A
            </text>
          </svg>
        </motion.div>
      </div>

      {/* Parallax Text Content */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="text-center z-30 max-w-2xl px-6 flex flex-col items-center mt-6"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-champagne mb-4 tracking-tight font-normal">
          Two Hearts Bound In Love
        </h2>

        <p className="font-cormorant text-xl md:text-2xl text-white/80 italic leading-relaxed font-light mb-6 max-w-lg">
          "What therefore God has joined together, let no man put asunder."
        </p>

        <div className="w-16 h-0.5 gold-gradient-bg opacity-70"></div>
      </motion.div>
    </section>
  );
};

export default RingsAnimation;
