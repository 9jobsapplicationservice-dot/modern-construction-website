'use client';

import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BedDouble, Bath, Car, Maximize, ArrowRight, Building2, TrendingUp, Cpu } from 'lucide-react';

interface MockMapProps {
  variant?: 'dark' | 'light';
}

type VicRegion = 'MELB WEST' | 'MELB NORTH' | 'MELB EAST' | 'MELB SOUTH' | 'REGIONAL VIC' | 'ALL';

interface RegionStat {
  title: string;
  sitesCount: number;
  avgRoi: string;
  suburbs: string;
  desc: string;
}

export const MockMap: React.FC<MockMapProps> = () => {
  const { properties, setActivePropertyForModal } = useProperties();
  const [selectedRegion, setSelectedRegion] = useState<VicRegion>('ALL');
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);

  // Filter properties to Victoria (VIC) only
  const vicProperties = properties.filter((p) => p.state === 'VIC');

  const getVictorianRegion = (suburb: string): VicRegion => {
    switch (suburb) {
      case 'Point Cook':
      case 'Werribee':
        return 'MELB WEST';
      case 'Preston':
        return 'MELB NORTH';
      case 'Mulgrave':
      case 'Glen Waverley':
        return 'MELB EAST';
      case 'Brighton':
        return 'MELB SOUTH';
      default:
        return 'REGIONAL VIC';
    }
  };

  // Compressed Y coordinates by 44% compared to original (multiplied by 0.56) to fit 190px height
  const getMarkerCoords = (id: string) => {
    switch (id) {
      case 'hl-2': // Point Cook (West)
        return { x: 155, y: 98 };
      case 'inv-3': // Point Cook (West)
        return { x: 135, y: 110 };
      case 'lo-3': // Werribee (West)
        return { x: 95, y: 104 };
      case 'ren-3': // Preston (North)
        return { x: 290, y: 62 };
      case 'dev-1': // Preston (North)
        return { x: 265, y: 74 };
      case 'dh-1': // Mulgrave (East)
        return { x: 360, y: 76 };
      case 'ren-1': // Brighton (South)
        return { x: 290, y: 116 };
      default:
        return null;
    }
  };

  const regionPaths = [
    {
      code: 'REGIONAL VIC' as VicRegion,
      name: 'Regional Victoria',
      path: 'M 10,11 L 490,11 L 490,180 L 395,180 L 365,158 L 135,158 L 105,180 L 10,180 Z',
      labelX: 95,
      labelY: 31,
    },
    {
      code: 'MELB WEST' as VicRegion,
      name: 'Melbourne West',
      path: 'M 135,68 L 230,68 L 230,124 L 175,124 L 135,95 Z',
      labelX: 185,
      labelY: 93,
    },
    {
      code: 'MELB NORTH' as VicRegion,
      name: 'Melbourne North',
      path: 'M 230,34 L 310,34 L 310,90 L 230,90 Z',
      labelX: 270,
      labelY: 59,
    },
    {
      code: 'MELB EAST' as VicRegion,
      name: 'Melbourne East',
      path: 'M 310,34 L 410,45 L 390,113 L 310,113 Z',
      labelX: 355,
      labelY: 71,
    },
    {
      code: 'MELB SOUTH' as VicRegion,
      name: 'Melbourne South',
      path: 'M 230,90 L 310,90 L 310,140 L 260,140 L 230,118 Z',
      labelX: 270,
      labelY: 116,
    },
  ];

  // Victoria regional statistics mappings
  const regionStats: Record<VicRegion, RegionStat> = {
    ALL: {
      title: 'Victoria Growth Corridor',
      sitesCount: 7,
      avgRoi: '16.2%',
      suburbs: 'Point Cook, Werribee, Preston, Brighton, Mulgrave',
      desc: 'Modern-Property targets high-yield developments across Victoria, spanning masterplanned house & land packages, co-living layouts, and premium unit subdivisions.',
    },
    'MELB WEST': {
      title: 'Melbourne West Corridor',
      sitesCount: 3,
      avgRoi: '12.1%',
      suburbs: 'Point Cook, Werribee',
      desc: 'Rapidly growing western employment hub. Targets ready-to-build family allotments and positive cash-flow SMSF dual-key packages.',
    },
    'MELB NORTH': {
      title: 'Melbourne North Corridor',
      sitesCount: 2,
      avgRoi: '25.5%',
      suburbs: 'Preston',
      desc: 'High-density urban infill zones. Ideal for architectural townhouses and multi-unit subdivisions with superior exit values.',
    },
    'MELB EAST': {
      title: 'Melbourne East Corridor',
      sitesCount: 1,
      avgRoi: '9.8%',
      suburbs: 'Mulgrave',
      desc: 'Established family suburbs showcasing premium display suites and masterbuilt luxury home developments.',
    },
    'MELB SOUTH': {
      title: 'Melbourne South / Bayside',
      sitesCount: 1,
      avgRoi: '22.4%',
      suburbs: 'Brighton',
      desc: 'Elite bayside developments targeting mid-century restorations, character home extensions, and luxury coastal residences.',
    },
    'REGIONAL VIC': {
      title: 'Regional Victoria',
      sitesCount: 0,
      avgRoi: '--',
      suburbs: 'Geelong, Ballarat, Bendigo',
      desc: 'Securing pipeline land releases in regional employment nodes for future townhouse and housing estate development projects.',
    },
  };

  const activeStat = regionStats[selectedRegion];

  const handleRegionClick = (region: VicRegion) => {
    setSelectedRegion(region);
    setActivePropertyId(null);
  };

  const getRegionStyle = (regionCode: VicRegion) => {
    const isSelected = selectedRegion === regionCode;
    if (isSelected) {
      return {
        fill: 'rgba(28, 77, 140, 0.45)',
        stroke: '#1C4D8C',
        strokeWidth: 2,
      };
    }
    return {
      fill: '#06162a',
      stroke: '#152f52',
      strokeWidth: 1,
    };
  };

  const activeProperty = vicProperties.find((p) => p.id === activePropertyId);
  const activePropertyCoords = activeProperty ? getMarkerCoords(activeProperty.id) : null;

  return (
    <div 
      onClick={() => setActivePropertyId(null)}
      className="w-full bg-[#0B2341] text-white border border-white/10 p-5 md:p-6 flex flex-col gap-6 shadow-[0_20px_50px_rgba(4,16,30,0.35)] overflow-hidden mx-auto select-none rounded-none relative"
    >
      {/* 1. HUD-style Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow animate-pulse" />
            <span className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-brand-yellow">
              /VICTORIA SITE MAP
            </span>
          </div>
          <h3 className="text-xs font-semibold text-white/90 mt-1 uppercase tracking-wider">
            Select VIC Region to Filter Projects
          </h3>
        </div>
        
        {/* Tech stats HUD badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[8px] font-extrabold text-white/40 bg-white/5 px-2.5 py-1 border border-white/5">
            <Cpu size={10} className="text-brand-yellow" />
            <span>ACTIVE CORE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[8px] font-extrabold text-white/40 bg-white/5 px-2.5 py-1 border border-white/5">
            <span>PIPELINE: V2.5</span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-stretch">
        
        {/* Left Side: Victoria Map (Height-reduced blueprint container) */}
        <div className="w-full lg:w-[65%] flex flex-col items-center justify-center relative min-h-[170px] sm:min-h-[190px] bg-slate-950/30 border border-white/5 p-3 overflow-hidden">
          {/* Subtle blueprint grid background lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          {/* Victoria Map SVG */}
          <svg viewBox="0 0 500 190" className="h-full w-full select-none max-h-[190px] relative z-10">
            {/* Architectural Grid ticks */}
            <g opacity="0.05">
              <line x1="50" y1="0" x2="50" y2="190" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="150" y1="0" x2="150" y2="190" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="250" y1="0" x2="250" y2="190" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="350" y1="0" x2="350" y2="190" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="450" y1="0" x2="450" y2="190" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="0" y1="40" x2="500" y2="40" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* Region paths */}
            <g>
              {regionPaths.map((region) => {
                const style = getRegionStyle(region.code);
                return (
                  <g 
                    key={region.code} 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      handleRegionClick(region.code); 
                    }} 
                    className="cursor-pointer group"
                  >
                    <path
                      d={region.path}
                      className="transition-all duration-300 hover:brightness-125 group-hover:opacity-90"
                      style={{
                        fill: style.fill,
                        stroke: style.stroke,
                        strokeWidth: style.strokeWidth,
                      }}
                    />
                    <text
                      x={region.labelX}
                      y={region.labelY}
                      textAnchor="middle"
                      className="pointer-events-none text-[7.5px] font-extrabold tracking-wider transition-colors duration-300 fill-slate-500 group-hover:fill-white"
                      style={{
                        fill: selectedRegion === region.code ? '#EAF3FC' : undefined,
                      }}
                    >
                      {region.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Pins/Markers */}
            <g>
              {vicProperties.map((prop) => {
                const region = getVictorianRegion(prop.suburb);
                if (selectedRegion !== 'ALL' && region !== selectedRegion) return null;

                const coords = getMarkerCoords(prop.id);
                if (!coords) return null;

                const isActive = activePropertyId === prop.id;

                return (
                  <g 
                    key={prop.id} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePropertyId(isActive ? null : prop.id);
                    }} 
                    className="group/marker cursor-pointer"
                  >
                    {/* Ping ring */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="6"
                      className="animate-ping"
                      style={{
                        fill: isActive ? 'rgba(28, 77, 140, 0.45)' : 'rgba(28, 77, 140, 0.2)',
                        animationDuration: '3s',
                      }}
                    />
                    {/* Active Outer Ring */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isActive ? "5" : "3.5"}
                      className="transition-all duration-300"
                      style={{
                        fill: isActive ? '#FFFFFF' : '#1C4D8C',
                        stroke: '#1C4D8C',
                        strokeWidth: isActive ? 2 : 1,
                      }}
                    />
                    {/* Inner dot */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="1.5"
                      className="fill-[#1C4D8C]"
                      style={{ display: isActive ? 'block' : 'none' }}
                    />

                    {/* SVG Micro-Tooltip (Hover only) */}
                    {!isActive && (
                      <foreignObject
                        x={coords.x - 45}
                        y={coords.y - 30}
                        width="90"
                        height="26"
                        className="pointer-events-none opacity-0 transition-opacity duration-200 group-hover/marker:opacity-100"
                      >
                        <div className="bg-[#0B2341]/95 border border-white/10 text-white text-[7px] font-extrabold px-1.5 py-0.5 text-center shadow-md">
                          <span className="block truncate">{prop.suburb}</span>
                          <span className="block text-brand-yellow font-sans">${(prop.price / 1000000).toFixed(2)}M</span>
                        </div>
                      </foreignObject>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Floating Detailed Preview Card (Anchored directly over Pin) */}
          <AnimatePresence>
            {activeProperty && activePropertyCoords && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -12, x: '-50%' }}
                animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, scale: 0.85, y: -12, x: '-50%' }}
                transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                style={{
                  left: `${(activePropertyCoords.x / 500) * 100}%`,
                  top: `${(activePropertyCoords.y / 190) * 100}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-[108%] w-[210px] border p-2 flex flex-col gap-1.5 bg-[#0B2341]/95 border-white/20 text-white shadow-[0_20px_45px_rgba(0,0,0,0.5)] z-20"
              >
                {/* Downward pointing arrow */}
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#0B2341] border-r border-b border-white/20" />

                {/* Close trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePropertyId(null);
                  }}
                  className="absolute top-1.5 right-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={10} />
                </button>

                {/* Card Content */}
                <div className="flex gap-2 pt-1">
                  <div className="w-14 h-11 bg-slate-900 overflow-hidden shrink-0">
                    <img src={activeProperty.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-4 text-left">
                    <span className="text-[6px] uppercase font-bold tracking-wider text-brand-yellow truncate">
                      {activeProperty.suburb}, VIC
                    </span>
                    <span className="text-[8px] font-serif font-bold tracking-tight line-clamp-1 mt-0.5">
                      {activeProperty.title}
                    </span>
                    <span className="text-[8.5px] font-extrabold font-sans text-brand-yellow mt-0.5">
                      ${(activeProperty.price / 1000000).toFixed(2)}M
                    </span>
                  </div>
                </div>

                {/* Specifications */}
                <div className="flex items-center justify-between text-[7px] font-bold text-gray-300 border-t border-white/10 pt-1">
                  {activeProperty.bedrooms > 0 && (
                    <span className="flex items-center gap-0.5">
                      <BedDouble size={8} className="text-[#1C4D8C]" />
                      {activeProperty.bedrooms} <span className="text-gray-400 font-normal">Beds</span>
                    </span>
                  )}
                  {activeProperty.bathrooms > 0 && (
                    <span className="flex items-center gap-0.5">
                      <Bath size={8} className="text-[#1C4D8C]" />
                      {activeProperty.bathrooms} <span className="text-gray-400 font-normal">Baths</span>
                    </span>
                  )}
                  {activeProperty.cars > 0 && (
                    <span className="flex items-center gap-0.5">
                      <Car size={8} className="text-[#1C4D8C]" />
                      {activeProperty.cars} <span className="text-gray-400 font-normal">Cars</span>
                    </span>
                  )}
                  <span className="flex items-center gap-0.5">
                    <Maximize size={8} className="text-[#1C4D8C]" />
                    {activeProperty.landSize} <span className="text-gray-400 font-normal">sqm</span>
                  </span>
                </div>

                {/* Action CTA */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePropertyForModal(activeProperty);
                    setActivePropertyId(null);
                  }}
                  className="w-full bg-[#1C4D8C] hover:bg-[#153B6C] text-white text-[7px] font-extrabold uppercase py-1 text-center transition-colors flex items-center justify-center gap-0.5"
                >
                  Quick view build path
                  <ArrowRight size={8} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset filter control */}
          <div className="absolute bottom-1 right-2 z-10 flex items-center gap-2 text-[7.5px] font-bold text-white/50">
            <span>
              Selected Filter: <strong className="text-brand-yellow">{selectedRegion === 'ALL' ? 'All Victoria' : selectedRegion}</strong>
            </span>
            {selectedRegion !== 'ALL' && (
              <button
                onClick={(e) => { e.stopPropagation(); handleRegionClick('ALL'); }}
                className="underline text-white hover:text-brand-yellow font-extrabold"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Unique Dashboard stats card (Glassmorphic) */}
        <div className="w-full lg:w-[35%] flex flex-col justify-between border border-white/10 bg-white/5 p-4 relative z-10 shrink-0 text-left backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[8px] font-extrabold uppercase tracking-[0.24em] text-emerald-400">
                Region Metrics Active
              </span>
            </div>

            <motion.div
              key={selectedRegion}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-serif text-base font-bold leading-tight tracking-tight text-white mb-2">
                {activeStat.title}
              </h3>
              <p className="text-[10px] leading-relaxed text-white/70 mb-4 min-h-[44px]">
                {activeStat.desc}
              </p>

              {/* Suburb coverage */}
              <div className="mb-4">
                <span className="text-[7.5px] uppercase tracking-wider font-bold text-slate-400 block">
                  Target Suburbs
                </span>
                <span className="text-[9.5px] font-bold text-white tracking-tight mt-0.5 block truncate">
                  {activeStat.suburbs}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 mt-auto">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                <Building2 size={10} className="text-brand-yellow" />
                <span>Active Sites</span>
              </div>
              <span className="text-base font-serif font-bold text-white mt-0.5">
                {activeStat.sitesCount}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                <TrendingUp size={10} className="text-brand-yellow" />
                <span>Average Yield</span>
              </div>
              <span className="text-base font-serif font-bold text-brand-yellow mt-0.5">
                {activeStat.avgRoi}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
