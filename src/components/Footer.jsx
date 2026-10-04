import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Check } from 'lucide-react';

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Shanto & Anagha Wedding Invitation',
        text: 'Join us in celebrating the wedding of Shanto & Anagha on October 24, 2026!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <footer className="relative py-24 px-6 md:px-12 bg-charcoal text-white text-center overflow-hidden border-t border-gold/20">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-dark/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          {/* Monogram */}
          <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center text-charcoal font-serif text-2xl font-bold mb-6 shadow-xl">
            S <span className="font-script text-3xl">&</span> A
          </div>

          <p className="font-cormorant text-2xl md:text-4xl text-champagne italic leading-relaxed mb-8 max-w-2xl">
            "With all our love and happiness, we can’t wait to have you with us as we begin this beautiful new chapter of our lives."
          </p>
          
          <h2 className="font-serif text-5xl md:text-7xl text-white font-normal mb-4 tracking-tight">
            Shanto <span className="font-script gold-gradient-text text-5xl md:text-7xl">&</span> Anagha
          </h2>
          
          <div className="w-24 h-0.5 gold-gradient-bg mx-auto my-8"></div>
          
          <p className="text-xs tracking-[0.3em] uppercase text-champagne/80 mb-8 font-light">
            24 October 2026 &bull; Thrissur, Kerala
          </p>

          <div className="flex items-center justify-center">
            <button
              onClick={handleShare}
              className="px-8 py-3.5 rounded-full gold-gradient-bg text-charcoal font-semibold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              {copied ? <Check size={16} className="text-charcoal" /> : <Share2 size={16} className="text-charcoal" />}
              {copied ? 'Link Copied!' : 'Share Invitation'}
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
