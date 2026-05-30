import React from 'react';
import { CTASection, ConstructionTimeline, IconCardGrid, PageHero, SectionHeading } from '../../components/MarketingSections';
import { constructionSteps, pageHeroContent, serviceCards, trustPoints } from '../../data/siteContent';

export default function ConstructionServicesPage() {
  return (
    <div className="bg-white font-sans text-brand-text">
      <PageHero
        {...pageHeroContent.constructionServices}
        primaryHref="/contact?interest=Construction"
        primaryLabel="Request construction help"
        secondaryHref="/build-with-aura"
        secondaryLabel="See build journey"
      />

      <section className="mx-auto max-w-[1512px] px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Construction support for buyers and site owners"
          description="Modern-property supports feasibility, property acquisition, new builds, renovations, commercial/residential developments, and handover coordination."
        />
        <div className="mt-8">
          <IconCardGrid items={serviceCards} />
        </div>
      </section>

      <section className="border-y border-brand-border bg-brand-section/70 py-14">
        <div className="mx-auto max-w-[1512px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Delivery stages"
            title="A practical construction sequence"
            description="The same stage logic supports custom homes, house and land packages, renovations, and small development projects."
          />
          <div className="mt-8">
            <ConstructionTimeline steps={constructionSteps} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1512px] px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quality controls"
          title="Checks before and during the build"
          description="Modern-property keeps the key build risks visible: soil, slope, engineering, permits, supplier selections, supervisor updates, and handover documents."
        />
        <div className="mt-8">
          <IconCardGrid items={trustPoints} />
        </div>
      </section>

      <CTASection
        title="Need help with a construction scope?"
        description="Send your property address, land status, project type, and target timing. Modern-property will suggest the next local step."
        href="/contact?interest=Construction"
        label="Request construction scope"
      />
    </div>
  );
}
