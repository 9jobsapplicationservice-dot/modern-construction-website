# Aura Metricon-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the full Aura Developments Next.js site as a local-only construction-led property purchase and home-building platform.

**Architecture:** Keep the existing Next.js App Router structure and shared React components. Centralize repeated page content into a new local page-content module, then update route pages to use that consistent content system and the existing property data.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, lucide-react, framer-motion.

---

## File Structure

- Modify `src/app/page.tsx`: replace the current long homepage with a Metricon-inspired Aura journey.
- Modify `src/components/Header.tsx`: refine navigation, copy, utility actions, and local search behavior.
- Modify `src/components/Footer.tsx`: rewrite footer around construction services and purchase/build journeys.
- Modify `src/components/QuickSearch.tsx`: tune labels and filters for the buy/build journey.
- Modify `src/components/PropertyCard.tsx`: improve listing card copy and CTAs.
- Create `src/data/siteContent.ts`: reusable page metadata, journey steps, trust points, service cards, and construction timeline content.
- Modify route pages under `src/app/*/page.tsx`: refresh all visible content and route-specific sections while reusing existing data.
- Run `npm run lint`, `npm run build`, and local browser verification.

## Tasks

### Task 1: Add Shared Content

**Files:**
- Create: `src/data/siteContent.ts`

- [ ] Add arrays for navigation journeys, construction steps, trust points, service cards, and route page metadata.
- [ ] Keep copy specific to property purchase, land selection, home design, site checks, approvals, construction, and handover.
- [ ] Ensure no placeholder labels or empty CTA text.

### Task 2: Update Shared UI Shell

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] Update header copy to emphasize "Buy, build, track".
- [ ] Keep region selector, search submit, saved homes, and customer portal working.
- [ ] Update footer links, service areas, trust copy, and enquiry CTA.
- [ ] Preserve mobile menu and sticky mobile actions.

### Task 3: Update Search And Cards

**Files:**
- Modify: `src/components/QuickSearch.tsx`
- Modify: `src/components/PropertyCard.tsx`

- [ ] Tune tab labels and field labels to house-and-land, land, designs, display homes, development sites, and investments.
- [ ] Ensure search still routes to `/properties` with query params.
- [ ] Update card CTA copy and details to make property purchase and build next steps clear.
- [ ] Preserve save and compare local state.

### Task 4: Rewrite Homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] Build a Metricon-inspired first viewport with image/video background, two primary CTAs, and local region action.
- [ ] Add "I want to" journey cards.
- [ ] Add featured house-and-land, land estates, home designs, display homes, construction timeline, trust proof, testimonials, and enquiry CTA.
- [ ] Keep page responsive and avoid nested cards.

### Task 5: Rewrite Route Pages

**Files:**
- Modify: every `src/app/*/page.tsx` route that currently represents a public page.

- [ ] Give every route a construction-led hero and route-specific CTA.
- [ ] Use existing property, estate, design, display, development, and investment data.
- [ ] Add practical buyer/build content instead of generic filler.
- [ ] Preserve links, enquiries, and local-only behavior.

### Task 6: Verify Locally

**Files:**
- No source changes unless verification reveals issues.

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Start `npm run dev` on localhost only.
- [ ] Use Browser plugin to verify desktop and mobile homepage, search interaction, save/compare interaction, route navigation, and no visible framework overlay.
- [ ] Fix issues and rerun the relevant verification.
