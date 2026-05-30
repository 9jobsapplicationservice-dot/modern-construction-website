import React from 'react';
import { CTASection, IconCardGrid, PageHero, SectionHeading } from '../../components/MarketingSections';
import { brand, mainJourneys, pageHeroContent, trustPoints } from '../../data/siteContent';

const stats = [
  { label: 'Operating states', value: '5' },
  { label: 'Buyer paths', value: '4' },
  { label: 'Build stages tracked', value: '6' },
  { label: 'Local support line', value: brand.phone },
];

export default function AboutPage() {
  return (
    <div className="bg-white font-sans text-brand-text">
      <PageHero
        {...pageHeroContent.about}
        primaryHref="/contact"
        primaryLabel="Talk to Modern-Property"
        secondaryHref="/build-with-aura"
        secondaryLabel="How we build"
      />

      <section className="mx-auto max-w-[1512px] px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who we are"
          title="A property acquisition, development, and construction firm"
          description="Modern-property is designed for property buyers and investors seeking a complete acquisition, construction, and development lifecycle. We identify high-potential sites, manage the planning and subdivision processes, build to premium standards, and sell completed residential and commercial properties directly."
        />
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-brand-border bg-brand-border md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6">
              <div className="font-serif text-3xl font-bold text-[#0B2341]">{stat.value}</div>
              <div className="mt-2 text-[10px] font-extrabold uppercase tracking-widest text-brand-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-brand-border bg-brand-section/70 py-14">
        <div className="mx-auto max-w-[1512px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What Modern-property helps with"
            title="Start from the path that fits you"
            description="Whether you are acquiring a site, investing in a development project, or buying completed residential or commercial properties, Modern-property turns the opportunity into a premium completed build."
          />
          <div className="mt-8">
            <IconCardGrid items={mainJourneys} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1512px] px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our promise"
          title="Make the hidden build details visible"
          description="Good property decisions depend on build reality: soil, services, approvals, design fit, construction sequence, and handover documents."
        />
        <div className="mt-8">
          <IconCardGrid items={trustPoints} />
        </div>
      </section>

      <section className="mx-auto max-w-[1512px] px-4 py-14 sm:px-6 lg:px-8">
        <CTASection
          title="Tell Modern-Property your property and investment goals"
          description="We acquire, build, and sell premium properties. Contact us today to explore upcoming projects or register your investment brief."
          href="/contact"
          label="Start conversation"
        />
      </section>
    </div>
  );
}
