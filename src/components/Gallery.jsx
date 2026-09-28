import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({ src, alt, speed }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return (
    <div className="overflow-hidden h-[400px] md:h-[600px] w-full">
      <motion.img 
        style={{ y, scale: 1.15 }}
        src={src} 
        alt={alt} 
        className="w-full h-[120%] object-cover object-center"
      />
    </div>
  );
};

const Gallery = () => {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-champagne-dark mb-4">Memories</h2>
          <p className="font-serif text-4xl md:text-5xl text-text-main">Our Gallery</p>
          <div className="w-16 h-px bg-champagne-dark mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Replace src with actual photos */}
          <div className="mt-0 md:mt-24">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
              alt="Gallery image 1" 
              speed={100}
            />
          </div>
          <div>
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop" 
              alt="Gallery image 2" 
              speed={-50}
            />
          </div>
          <div className="md:-mt-24">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop" 
              alt="Gallery image 3" 
              speed={80}
            />
          </div>
          <div className="mt-0 md:mt-12">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1542042161784-26ab9e041e89?q=80&w=2070&auto=format&fit=crop" 
              alt="Gallery image 4" 
              speed={-80}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
