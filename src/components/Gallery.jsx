import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryPhotos = [
  { id: 1, src: '/couple.png', title: 'Shanto & Anagha', category: 'Portrait' },
  { id: 2, src: '/photos/photo2.jpeg', title: 'Pre-Wedding Bliss', category: 'Moments' },
  { id: 3, src: '/photos/photo3.jpeg', title: 'Romantic Walks', category: 'Memories' },
  { id: 4, src: '/photos/photo4.jpeg', title: 'Celebration of Love', category: 'Moments' },
  { id: 5, src: '/photos/photo5.jpeg', title: 'Hand in Hand', category: 'Portrait' },
  { id: 6, src: '/photos/photo6.jpeg', title: 'Cherished Memories', category: 'Memories' },
  { id: 7, src: '/photos/photo7.jpeg', title: 'Golden Smiles', category: 'Portrait' },
  { id: 8, src: '/photos/photo8.jpeg', title: 'The Covenant', category: 'Moments' },
];

const Gallery = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Portrait', 'Moments', 'Memories'];

  const filteredPhotos = activeTab === 'All' 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === activeTab);

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="bg-ivory py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-champagne-dark font-medium flex items-center justify-center gap-2 mb-3">
            <Sparkles size={14} className="text-gold-dark" />
            Visual Memories
            <Sparkles size={14} className="text-gold-dark" />
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-text-main font-normal">
            Our Photo Gallery
          </h2>
          <div className="w-20 h-0.5 gold-gradient-bg mx-auto mt-6"></div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                activeTab === cat 
                  ? 'gold-gradient-bg text-charcoal shadow-md scale-105' 
                  : 'bg-white border border-champagne-dark/30 text-text-muted hover:border-gold-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg border border-champagne/40 bg-white aspect-[3/4] cursor-pointer"
                onClick={() => setSelectedPhotoIndex(index)}
              >
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Overlay with Title & Icon on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="font-serif text-lg font-medium text-champagne">{photo.title}</p>
                      <p className="text-xs uppercase tracking-wider text-white/70">{photo.category}</p>
                    </div>
                    <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-gold hover:text-charcoal transition-colors">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Modal Content container */}
            <div 
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Prev button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-gold hover:text-charcoal text-white transition-all"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-gold hover:text-charcoal text-white transition-all"
              >
                <ChevronRight size={28} />
              </button>

              {/* Display Photo */}
              <motion.div 
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[75vh] max-w-full overflow-hidden rounded-xl border border-white/20 shadow-2xl"
              >
                <img 
                  src={filteredPhotos[selectedPhotoIndex].src} 
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  className="max-h-[75vh] w-auto object-contain rounded-xl"
                />
              </motion.div>

              {/* Photo Caption & Counter */}
              <div className="mt-4 text-center text-white">
                <h3 className="font-serif text-2xl text-champagne">
                  {filteredPhotos[selectedPhotoIndex].title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-white/60 mt-1">
                  Photo {selectedPhotoIndex + 1} of {filteredPhotos.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
