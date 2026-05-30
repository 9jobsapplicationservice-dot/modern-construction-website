'use client';

import React from 'react';
import { useProperties, AustralianState } from '../context/PropertyContext';
import { MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LocationSelector: React.FC = () => {
  const {
    showLocationPopup,
    setShowLocationPopup,
    setSelectedState
  } = useProperties();

  const states: { code: AustralianState; name: string; desc: string }[] = [
    { code: 'VIC', name: 'Victoria', desc: 'Melbourne Metro & Regional centers' },
    { code: 'NSW', name: 'New South Wales', desc: 'Sydney Metro, Box Hill & Coastline' },
    { code: 'QLD', name: 'Queensland', desc: 'Brisbane, Gold Coast & Sunshine Coast' },
    { code: 'SA', name: 'South Australia', desc: 'Adelaide Metro & Premium Subdivisions' },
    { code: 'WA', name: 'Western Australia', desc: 'Perth Metro & Coastal Suburbs' }
  ];

  const handleSelect = (stateCode: AustralianState) => {
    setSelectedState(stateCode);
    setShowLocationPopup(false);
  };

  return (
    <AnimatePresence>
      {showLocationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLocationPopup(false)}
            className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-brand-bg border border-brand-border rounded-2xl w-full max-w-2xl overflow-hidden shadow-premiumHover z-10 animate-fade-in"
          >
            {/* Header image/banner decoration */}
            <div className="bg-brand-primary text-white p-8 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
              <button
                onClick={() => setShowLocationPopup(false)}
                className="absolute top-4 right-4 text-gray-200 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                <MapPin size={24} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-white font-medium tracking-tight">
                Where would you like to acquire or invest?
              </h2>
              <p className="text-xs text-white/80 tracking-widest uppercase mt-2 font-bold font-sans">
                MODERN-PROPERTY ACQUISITIONS & DEVELOPMENTS
              </p>
            </div>

            {/* Content Selection Grid */}
            <div className="p-6 md:p-8 flex flex-col gap-6 bg-white">
              <p className="text-center text-sm text-brand-textMuted max-w-md mx-auto leading-relaxed">
                Select your state of interest to access local acquisitions, subdivided allotments, development portfolios, and completed showcase properties.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {states.map((st) => (
                  <button
                    key={st.code}
                    onClick={() => handleSelect(st.code)}
                    className="flex flex-col text-left p-4 bg-brand-bg hover:bg-brand-sand border border-brand-border rounded-xl transition-all hover:border-brand-primary hover:shadow-premium group"
                  >
                    <div className="flex justify-between items-center w-full mb-1">
                      <span className="font-bold text-brand-charcoal text-base group-hover:text-brand-primary transition-colors">
                        {st.name}
                      </span>
                      <span className="text-xs bg-brand-sand border border-brand-border rounded px-2.5 py-1 font-sans font-bold text-brand-charcoal group-hover:bg-brand-primary group-hover:text-white transition-all">
                        {st.code}
                      </span>
                    </div>
                    <span className="text-xs text-brand-textMuted">
                      {st.desc}
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => handleSelect('ALL')}
                  className="text-xs font-bold text-brand-primary hover:text-brand-secondary underline underline-offset-4 decoration-brand-primary transition-colors"
                >
                  View All Australian Properties
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
