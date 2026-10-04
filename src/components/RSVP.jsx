import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, MessageSquare, Sparkles, User, Users } from 'lucide-react';

const RSVP = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'Both',
    guests: '1',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [wishesList, setWishesList] = useState(() => {
    const saved = localStorage.getItem('wedding_wishes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 1, name: 'Fr. Mathew & Parishioners', message: 'Wishing Shanto & Anagha a lifetime of divine grace, peace, and endless love!', date: 'Oct 4, 2026' },
      { id: 2, name: 'The Joseph Family', message: 'Congratulations! May your home be filled with joy, laughter, and light.', date: 'Oct 4, 2026' },
      { id: 3, name: 'Friends & Family', message: 'So thrilled to celebrate your special day! Here is to forever together.', date: 'Oct 4, 2026' },
    ];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const newWish = {
      id: Date.now(),
      name: formData.name,
      message: formData.message,
      attendance: formData.attendance,
      guests: formData.guests,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updatedList = [newWish, ...wishesList];
    setWishesList(updatedList);
    localStorage.setItem('wedding_wishes', JSON.stringify(updatedList));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', attendance: 'Both', guests: '1', message: '' });
      if (onClose) onClose();
    }, 3000);
  };

  return (
    <section id="rsvp" className="py-24 px-6 md:px-12 bg-ivory relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-champagne-dark font-medium flex items-center justify-center gap-2 mb-3">
            <Sparkles size={14} className="text-gold-dark" />
            Celebration & Wishes
            <Sparkles size={14} className="text-gold-dark" />
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-text-main font-normal">
            Send Wishes
          </h2>
          <p className="font-cormorant text-xl text-text-muted mt-3 italic">
            Please let us know if you will be joining our special day.
          </p>
          <div className="w-20 h-0.5 gold-gradient-bg mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-champagne-dark/20 relative"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full gold-gradient-bg flex items-center justify-center text-charcoal mb-6 shadow-xl animate-bounce">
                  <Heart size={36} className="fill-charcoal" />
                </div>
                <h3 className="font-serif text-3xl text-text-main mb-2">Thank You!</h3>
                <p className="text-text-muted text-base max-w-xs">
                  Your blessings and attendance confirmation have been recorded. Shanto & Anagha can't wait to see you!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="font-serif text-2xl text-text-main border-b border-champagne/40 pb-4 flex items-center gap-2">
                  <Heart size={20} className="text-gold-dark" />
                  Invitation & Wishes Form
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-2">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-dark" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John & Mary Joseph"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-champagne-dark/30 focus:border-gold-dark focus:ring-1 focus:ring-gold-dark outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Attendance selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-2">
                      Attending Event
                    </label>
                    <select
                      value={formData.attendance}
                      onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-champagne-dark/30 focus:border-gold-dark outline-none text-sm bg-white"
                    >
                      <option value="Both">Attending Both</option>
                      <option value="Wedding">Wedding Only (Oct 24)</option>
                      <option value="Engagement">Engagement Only (Oct 19)</option>
                      <option value="Regretfully Decline">Regretfully Decline</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-2">
                      No. of Guests
                    </label>
                    <div className="relative">
                      <Users size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-dark" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-champagne-dark/30 focus:border-gold-dark outline-none text-sm bg-white"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4+">4+ Persons</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message / Blessings */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-2">
                    Your Warm Wishes & Blessings *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your wishes for Shanto & Anagha..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl border border-champagne-dark/30 focus:border-gold-dark outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl gold-gradient-bg text-charcoal font-semibold text-sm uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={16} className="fill-charcoal" />
                  Send Invitation Wishes
                </button>
              </form>
            )}
          </motion.div>

          {/* Wishes Wall List */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <h3 className="font-serif text-2xl text-text-main flex items-center gap-2 border-b border-champagne/40 pb-4">
              <MessageSquare size={20} className="text-gold-dark" />
              Blessings & Wishes Wall
            </h3>

            <div className="flex flex-col gap-4 max-h-[520px] overflow-y-auto pr-2 no-scrollbar">
              {wishesList.map((wish) => (
                <div 
                  key={wish.id}
                  className="bg-white p-5 rounded-2xl border border-champagne/50 shadow-sm flex flex-col gap-2 relative group hover:border-gold-dark/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-semibold text-text-main text-base">{wish.name}</span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider">{wish.date}</span>
                  </div>
                  <p className="font-cormorant text-lg text-text-muted italic leading-relaxed">
                    "{wish.message}"
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
