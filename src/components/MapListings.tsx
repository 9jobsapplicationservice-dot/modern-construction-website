'use client';

import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from './PropertyCard';
import { MockMap } from './MockMap';
import { Grid, Map as MapIcon, Info } from 'lucide-react';
import { ScrollAnimate, StaggerContainer } from './ScrollReveal';

interface MapListingsProps {
  mode?: 'all' | 'saved' | 'compare';
}

export const MapListings: React.FC<MapListingsProps> = ({ mode = 'all' }) => {
  const { properties, searchFilters, savedProperties, comparedProperties } = useProperties();
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  // Filter properties based on search query filters
  const filteredProperties = properties.filter((prop) => {
    if (mode === 'saved' && !savedProperties.includes(prop.id)) {
      return false;
    }

    if (mode === 'compare' && !comparedProperties.includes(prop.id)) {
      return false;
    }

    // State Filter
    if (searchFilters.state !== 'ALL' && prop.state !== searchFilters.state) {
      return false;
    }
    // Type Filter
    if (searchFilters.type !== 'ALL' && prop.type !== searchFilters.type) {
      return false;
    }
    // Suburb Filter
    if (searchFilters.suburb && !prop.suburb.toLowerCase().includes(searchFilters.suburb.toLowerCase())) {
      return false;
    }
    // Price Filter
    if (searchFilters.maxPrice && prop.price > Number(searchFilters.maxPrice)) {
      return false;
    }
    // Bedrooms Filter
    if (searchFilters.bedrooms) {
      const beds = Number(searchFilters.bedrooms);
      if (beds === 0) {
        if (prop.bedrooms !== 0) return false;
      } else {
        if (prop.bedrooms < beds) return false;
      }
    }
    // Build Status Filter
    if (searchFilters.buildStatus !== 'ALL' && prop.buildStatus !== searchFilters.buildStatus) {
      return false;
    }

    return true;
  });

  return (
    <div className="font-sans flex flex-col gap-8 w-full max-w-[1512px] mx-auto px-4 md:px-0">
      
      {/* Search statistics summary bar */}
      <div className="flex justify-between items-center text-xs md:text-sm text-brand-textMuted border-b border-brand-border pb-3">
        <span>
          Showing <strong className="text-brand-charcoal font-bold">{filteredProperties.length}</strong> Modern-property options matching your selection
        </span>

        {/* Mobile View Toggle Buttons */}
        <div className="lg:hidden flex border border-brand-border rounded overflow-hidden bg-white">
          <button
            onClick={() => setMobileView('list')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold transition-all focus:outline-none ${
              mobileView === 'list' ? 'bg-brand-primary text-white' : 'text-brand-charcoal hover:bg-brand-sand'
            }`}
          >
            <Grid size={14} />
            List
          </button>
          <button
            onClick={() => setMobileView('map')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold transition-all focus:outline-none ${
              mobileView === 'map' ? 'bg-brand-primary text-white' : 'text-brand-charcoal hover:bg-brand-sand'
            }`}
          >
            <MapIcon size={14} />
            Map
          </button>
        </div>
      </div>

      {/* Main Listings Grid (prioritizes homes first, full width on desktop) */}
      <div className={`${mobileView === 'list' ? 'block' : 'hidden lg:block'}`}>
        {filteredProperties.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </StaggerContainer>
        ) : (
          <ScrollAnimate variant="fadeIn" className="text-center bg-white border border-[#DADDE2] rounded-none p-12 flex flex-col items-center justify-center gap-3">
            <Info className="text-[#0B2341]" size={32} />
            <h4 className="font-serif text-lg font-bold text-[#071d38]">No properties match your current search</h4>
            <p className="text-xs text-[#667085] max-w-sm">
              Try widening your budget filter, checking a different Australian state, clearing suburb search, or saving properties before opening the saved view.
            </p>
          </ScrollAnimate>
        )}
      </div>

      {/* Map Section (moved lower on the page, taking full-width container on desktop) */}
      <ScrollAnimate 
        variant="fadeUp"
        className={`border-t border-[#DADDE2] pt-8 flex flex-col gap-4 ${
          mobileView === 'map' ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="text-center md:text-left">
          <h3 className="font-serif text-xl font-bold text-[#071d38]">
            Geographic Allotment Map
          </h3>
          <p className="text-xs text-[#667085] mt-1">
            Map coordinates showing ready-to-build estates, development sites, land releases, and active displays.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <MockMap />
          </div>
          <div className="bg-brand-sand border border-brand-border rounded-none p-5 text-xs leading-relaxed text-brand-textMuted shadow-xs h-fit font-medium">
            <h4 className="font-serif font-bold text-sm text-[#071d38] mb-2">Regional Development Boundaries</h4>
            <p className="mb-3">
              Hover over glowing marker coordinates representing custom construction builds or subdivided land parcels across major Australian metropolitan sites.
            </p>
            <p>
              Click any state vector on the map shape to filter properties dynamically to that state.
            </p>
          </div>
        </div>
      </ScrollAnimate>

    </div>
  );
};
