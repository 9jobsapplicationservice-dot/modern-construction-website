# Aura Metricon-Style Redesign Design

## Goal

Convert the full Aura Developments website into a local-only, construction-led property platform inspired by Metricon's structure: customers can buy land, buy a house-and-land package, choose a home design, book display inspections, enquire, and understand the construction journey from purchase through handover.

## Reference Direction

The Metricon reference uses a practical builder-site rhythm: utility bar, region selection, strong hero, clear CTAs, intent-based journey cards, search/filter panels, home design and house-and-land sections, display-home booking, trust proof, guidance content, and enquiry prompts. Aura will follow that structure without copying Metricon's logo, exact copy, assets, or brand identity.

## Visual System

Use a crisp Australian builder aesthetic: white and cool-gray backgrounds, deep navy header and CTAs, steel-blue secondary actions, and small warm yellow accents for emphasis. Keep cards rectangular or lightly rounded, image-led, and information-dense enough for property shoppers. Avoid decorative gradients, orbs, nested cards, and generic marketing-only sections.

## Content Model

The core message is: "Buy the right property. Choose your home. Build with Aura." The site should explain five customer paths: buy house and land, buy land only, choose home designs, inspect display homes, and purchase development or investment sites. Content should emphasize site checks, fixed-price build estimates, approvals, construction milestones, build portal updates, and handover.

## Routes And Components

Update shared components first:

- `Header.tsx`: Metricon-style utility bar, main nav, region selector, search, saved homes, customer portal, enquiry CTA.
- `Footer.tsx`: builder-focused sitemap, phone, service areas, trust links, and CTA.
- `QuickSearch.tsx`: tabbed search for house and land, designs, display homes, land, development sites, and investments.
- `PropertyCard.tsx`: consistent image-led cards with type, location, status, specs, price, save, compare, and view CTA.

Rewrite page content across the existing Next.js app routes:

- Homepage: full buying and building journey.
- Listing pages: route-specific hero, filters, cards, and enquiry CTA.
- Detail page: buyer/build-ready content, inclusions, specs, and enquiry CTA.
- Build/construction pages: process steps from site purchase to handover.
- Contact/customer portal: working local UI with form-style and milestone content.

## Interaction Requirements

Existing local state should continue working for saved properties, compare properties, selected region, search routing, display filters, enquiry form interactions, and build portal-style UI. Buttons may navigate locally or show existing local feedback, but visible controls should not feel inert.

## Testing

Run lint and build where possible. Start the local Next.js dev server only on localhost. Use the Browser plugin to verify the app loads, the homepage is not blank, no framework overlay is visible, console health is acceptable, search/filter interactions respond, save/compare state changes, and mobile layout does not overflow.

## Constraints

Keep the project local only. Do not deploy. Do not require network services for normal page rendering beyond existing remote image URLs. The workspace is not currently a git repository, so design/plan files can be written but cannot be committed here.
