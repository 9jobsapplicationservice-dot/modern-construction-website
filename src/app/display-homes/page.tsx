'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BedDouble, Bath, Calendar, Car, Eye, MapPin } from 'lucide-react';
import { CTASection, PageHero, SectionHeading } from '../../components/MarketingSections';
import { pageHeroContent } from '../../data/siteContent';
import { displayHomesData } from '../../data/properties';

const states = ['ALL', 'VIC', 'NSW', 'QLD', 'SA', 'WA'] as const;

export default function DisplayHomesPage() {
  const [selectedState, setSelectedState] = useState<(typeof states)[number]>('ALL');

  const displays = displayHomesData.filter((home) => selectedState === 'ALL' || home.state === selectedState);

  const formatPrice = (price: number) =>
    price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });

  return (
    <div className="bg-white font-sans text-brand-text">
      <PageHero
        {...pageHeroContent.displayHomes}
        primaryHref="/contact?interest=Display"
        primaryLabel="Book inspection"
        secondaryHref="/house-designs"
        secondaryLabel="Browse designs"
      />

      <section className="mx-auto max-w-[1512px] px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit before you build"
          title="Display homes by region"
          description="Inspect room proportions, kitchen selections, ceiling heights, facade materials, and upgrade options before choosing your build path."
        />
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-extrabold">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={`border px-4 py-2 uppercase tracking-wider transition-colors ${
                selectedState === state
                  ? 'border-[#0B2341] bg-[#0B2341] text-white'
                  : 'border-brand-border bg-white text-[#0B2341] hover:border-brand-secondary'
              }`}
            >
              {state === 'ALL' ? 'All regions' : state}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displays.map((home) => (
            <article key={home.id} className="border border-brand-border bg-white">
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img src={home.image} alt={home.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-brand-secondary">
                  <MapPin size={12} />
                  {home.suburb}, {home.state}
                </div>
                <h3 className="mt-3 font-serif text-xl font-bold text-[#0B2341]">{home.name}</h3>
                <p className="mt-3 text-xs font-medium leading-6 text-brand-muted">{home.description}</p>
                <div className="mt-4 grid grid-cols-4 gap-3 border-y border-brand-border py-4 text-xs font-bold text-[#0B2341]">
                  <span className="inline-flex items-center gap-1"><BedDouble size={14} />{home.bedrooms}</span>
                  <span className="inline-flex items-center gap-1"><Bath size={14} />{home.bathrooms}</span>
                  <span className="inline-flex items-center gap-1"><Car size={14} />{home.cars}</span>
                  <span>{formatPrice(home.price)}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#0B2341]">
                  <Calendar size={14} className="text-brand-secondary" />
                  {home.hours}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    href={`/contact?display=${home.slug}&title=${encodeURIComponent(home.name)}`}
                    className="inline-flex items-center justify-center gap-2 bg-[#0B2341] px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-brand-secondary"
                  >
                    Book
                    <ArrowRight size={13} />
                  </Link>
                  <a
                    href={home.virtualTourLink}
                    className="inline-flex items-center justify-center gap-2 border border-brand-border px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-[#0B2341] hover:border-brand-secondary"
                  >
                    <Eye size={13} />
                    Tour
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Want to inspect finishes before choosing?"
        description="Book a local display appointment or virtual tour, then Modern-property can match what you liked to a land or package option."
        href="/contact?interest=Display"
        label="Book display visit"
      />
    </div>
  );
}
