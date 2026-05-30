'use client';

import React, { useState } from 'react';
import { Sparkles, History } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
  afterImage = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  beforeLabel = 'Before: Original Site',
  afterLabel = 'After: Completed Build'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-3 select-none w-full font-sans">
      {/* Slider Visual Container (Rectangular style) */}
      <div 
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-[#DADDE2] shadow-xs"
      >
        {/* After Image (Background) */}
        <img 
          src={afterImage} 
          alt="After Renovation" 
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-4 right-4 bg-[#0B2341] text-white text-[10px] font-sans font-bold tracking-wider uppercase px-3 py-1.5 flex items-center gap-1 shadow-xs border border-[#1C4D8C]">
          <Sparkles size={11} className="text-brand-yellow" />
          {afterLabel}
        </div>

        {/* Before Image (Overlay clipped by slider position) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <img 
            src={beforeImage} 
            alt="Before Renovation" 
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute bottom-4 left-4 bg-white text-[#222222] text-[10px] font-sans font-bold tracking-wider uppercase px-3 py-1.5 flex items-center gap-1 shadow-xs whitespace-nowrap border border-[#DADDE2]">
            <History size={11} className="text-[#1C4D8C]" />
            {beforeLabel}
          </div>
        </div>

        {/* Sliding vertical line */}
        <div 
          className="absolute inset-y-0 w-1 bg-white shadow-xs pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular handle - rethemed to navy */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0B2341] text-white border-4 border-white shadow-sm flex items-center justify-center font-bold text-base pointer-events-none">
            |
          </div>
        </div>

        {/* Hidden Range Input spanning full width for dragging */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderPosition} 
          onChange={handleSliderChange}
          className="slider-handle-input absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      <div className="text-center">
        <p className="text-[11px] text-[#667085] font-semibold uppercase tracking-wider">
          Drag slider to view home transformation
        </p>
      </div>
    </div>
  );
};
