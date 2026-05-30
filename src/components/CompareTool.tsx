'use client';

import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { X, BarChart2, Check, RefreshCw, Trash2, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CompareTool: React.FC = () => {
  const {
    properties,
    comparedProperties,
    toggleCompareProperty
  } = useProperties();

  const [showCompareDialog, setShowCompareDialog] = useState(false);

  const selectedProperties = properties.filter((p) => comparedProperties.includes(p.id));

  if (comparedProperties.length === 0) return null;

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(2)}M`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getPropertyTypeName = (type: string) => {
    switch (type) {
      case 'house-land': return 'House & Land';
      case 'land-only': return 'Land Only';
      case 'renovated': return 'Renovated Home';
      case 'old-home': return 'Development Site';
      case 'new-build': return 'New Build';
      case 'investment': return 'Investment';
      case 'display': return 'Display Home';
      default: return 'Residential';
    }
  };

  return (
    <>
      {/* Floating Bottom Comparison Tray */}
      <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white border border-brand-border text-brand-charcoal rounded-2xl shadow-premiumHover px-4 py-3 flex items-center gap-4 md:gap-6 w-[95%] max-w-xl font-sans bg-white">
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-brand-primary">
          <BarChart2 size={18} className="rotate-90" />
          <span>Compare tray ({comparedProperties.length}/4)</span>
        </div>

        {/* Small thumbnail images */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-grow">
          {selectedProperties.map((prop) => (
            <div key={prop.id} className="relative w-8 h-8 rounded overflow-hidden bg-gray-100 border border-brand-border flex-shrink-0">
              <img src={prop.image} alt={prop.title} className="object-cover w-full h-full" />
              <button
                onClick={() => toggleCompareProperty(prop.id)}
                className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-600 text-white rounded-bl flex items-center justify-center font-bold text-[8px] focus:outline-none"
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 font-bold">
          <button
            onClick={() => setShowCompareDialog(true)}
            className="bg-brand-primary hover:bg-brand-secondary text-white text-[10px] md:text-xs py-2 px-4 rounded-full transition-colors whitespace-nowrap"
          >
            Compare Now
          </button>
          
          <button
            onClick={() => {
              comparedProperties.forEach((id) => toggleCompareProperty(id));
            }}
            className="text-brand-textMuted hover:text-brand-charcoal p-1"
            title="Clear all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Comparison Grid Modal */}
      <AnimatePresence>
        {showCompareDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompareDialog(false)}
              className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-sm"
            />

            {/* Comparison Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-premiumHover z-10 max-h-[92vh] flex flex-col border border-brand-border"
            >
              {/* Header */}
              <div className="p-6 bg-brand-primary text-white flex justify-between items-center">
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-white flex items-center gap-2">
                    <BarChart2 size={22} className="rotate-90" />
                    Property Comparison Grid
                  </h2>
                  <p className="text-xs text-white/80 mt-1">
                    Compare pricing, layouts, and specifications side-by-side to make the right choice.
                  </p>
                </div>
                <button
                  onClick={() => setShowCompareDialog(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close Comparison"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable comparison area */}
              <div className="overflow-x-auto overflow-y-auto flex-grow p-6">
                <table className="w-full min-w-[700px] border-collapse font-sans text-xs md:text-sm text-left">
                  <thead>
                    <tr className="border-b border-brand-border">
                      <th className="py-4 w-48 text-brand-textMuted uppercase font-bold text-[9px] tracking-wider">Specifications</th>
                      {selectedProperties.map((prop) => (
                        <th key={prop.id} className="py-4 px-4 w-64 align-top">
                          <div className="flex flex-col gap-2 relative">
                            <button
                              onClick={() => toggleCompareProperty(prop.id)}
                              className="absolute top-0 right-0 p-1 rounded-full bg-brand-sand hover:bg-red-500 hover:text-white transition-colors text-brand-charcoal"
                              title="Remove"
                            >
                              <X size={12} />
                            </button>

                            <div className="aspect-[16/10] rounded-lg overflow-hidden bg-gray-100 border border-brand-border w-full">
                              <img src={prop.image} alt={prop.title} className="object-cover w-full h-full" />
                            </div>

                            <span className="text-[9px] text-brand-primary uppercase font-bold tracking-wider mt-1 block">
                              {getPropertyTypeName(prop.type)}
                            </span>
                            <span className="font-serif font-bold text-sm text-brand-charcoal leading-tight">
                              {prop.title}
                            </span>
                            <span className="text-[10px] text-brand-textMuted leading-none">
                              {prop.suburb}, {prop.state}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Price */}
                    <tr className="border-b border-brand-border hover:bg-brand-sand/50">
                      <td className="py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Guide Price</td>
                      {selectedProperties.map((prop) => (
                        <td key={prop.id} className="py-4 px-4 text-base font-bold text-brand-primary">
                          {formatPrice(prop.price)}
                        </td>
                      ))}
                    </tr>

                    {/* Build Status */}
                    <tr className="border-b border-brand-border hover:bg-brand-sand/50">
                      <td className="py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Build Status</td>
                      {selectedProperties.map((prop) => (
                        <td key={prop.id} className="py-4 px-4 font-bold text-brand-secondary">
                          {prop.buildStatus}
                        </td>
                      ))}
                    </tr>

                    {/* Bedrooms */}
                    <tr className="border-b border-brand-border hover:bg-brand-sand/50">
                      <td className="py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Bedrooms</td>
                      {selectedProperties.map((prop) => (
                        <td key={prop.id} className="py-4 px-4 font-semibold">
                          {prop.bedrooms > 0 ? `${prop.bedrooms} Bed` : 'Land'}
                        </td>
                      ))}
                    </tr>

                    {/* Bathrooms */}
                    <tr className="border-b border-brand-border hover:bg-brand-sand/50">
                      <td className="py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Bathrooms</td>
                      {selectedProperties.map((prop) => (
                        <td key={prop.id} className="py-4 px-4 font-semibold">
                          {prop.bathrooms > 0 ? `${prop.bathrooms} Bath` : 'N/A'}
                        </td>
                      ))}
                    </tr>

                    {/* Car Spaces */}
                    <tr className="border-b border-brand-border hover:bg-brand-sand/50">
                      <td className="py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Car Spaces</td>
                      {selectedProperties.map((prop) => (
                        <td key={prop.id} className="py-4 px-4 font-semibold">
                          {prop.cars > 0 ? `${prop.cars} Car` : 'N/A'}
                        </td>
                      ))}
                    </tr>

                    {/* Land Size */}
                    <tr className="border-b border-brand-border hover:bg-brand-sand/50">
                      <td className="py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Land Area</td>
                      {selectedProperties.map((prop) => (
                        <td key={prop.id} className="py-4 px-4 font-semibold">
                          {prop.landSize} sqm
                        </td>
                      ))}
                    </tr>

                    {/* House Size */}
                    <tr className="border-b border-brand-border hover:bg-brand-sand/50">
                      <td className="py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">House Size</td>
                      {selectedProperties.map((prop) => (
                        <td key={prop.id} className="py-4 px-4 font-semibold">
                          {prop.houseSize ? `${prop.houseSize} sqm` : 'N/A'}
                        </td>
                      ))}
                    </tr>

                    {/* Features checklist */}
                    <tr className="border-b border-brand-border hover:bg-brand-sand/50">
                      <td className="py-4 font-bold text-brand-charcoal text-xs uppercase tracking-wider">Inclusions</td>
                      {selectedProperties.map((prop) => (
                        <td key={prop.id} className="py-4 px-4">
                          <div className="flex flex-col gap-1.5 text-xs text-brand-charcoal/90">
                            {prop.features.map((feat, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 font-medium">
                                <Check size={12} className="text-brand-primary flex-shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Call to action */}
                    <tr>
                      <td className="py-6"></td>
                      {selectedProperties.map((prop) => (
                        <td key={prop.id} className="py-6 px-4">
                          <a
                            href={`/contact?id=${prop.id}&title=${encodeURIComponent(prop.title)}`}
                            onClick={() => setShowCompareDialog(false)}
                            className="bg-brand-primary hover:bg-brand-secondary text-white py-3 px-4 rounded font-bold text-center block transition-all shadow-sm flex items-center justify-center gap-1.5"
                          >
                            Enquire About Site
                            <ArrowUpRight size={12} />
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
