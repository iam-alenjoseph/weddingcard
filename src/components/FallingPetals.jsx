import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FallingPetals = () => {
  const [particles] = useState(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // % across screen width
      size: Math.random() * 12 + 8, // size in px
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 10,
      rotate: Math.random() * 360,
      isPetal: i % 2 === 0,
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            y: '-10vh', 
            x: `${p.x}vw`, 
            opacity: 0, 
            rotate: p.rotate 
          }}
          animate={{ 
            y: '110vh', 
            x: [`${p.x}vw`, `${p.x + (p.id % 2 === 0 ? 8 : -8)}vw`, `${p.x}vw`],
            opacity: [0, 0.8, 0.8, 0], 
            rotate: p.rotate + 360 
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: p.size, height: p.size, willChange: 'transform' }}
          className="absolute pointer-events-none"
        >
          {p.isPetal ? (
            // Soft Rose Petal SVG
            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-sm opacity-75">
              <path 
                d="M15 3C20 8 27 12 25 20C23 28 15 28 12 24C9 20 10 12 15 3Z" 
                fill="url(#petalGradient)" 
              />
              <defs>
                <linearGradient id="petalGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F7E7CE" />
                  <stop offset="50%" stopColor="#E6C594" />
                  <stop offset="100%" stopColor="#C5A059" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            // Golden Sparkle Star
            <div className="w-full h-full rounded-full bg-gold-light/80 shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-pulse" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingPetals;
