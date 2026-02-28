

## Autronis Website Restructure — Implementation Plan

This is a comprehensive redesign shifting positioning from "AI agency" to "system architecture & automation partner." The plan covers all 11 sections from the prompt.

---

### Technical Architecture

```text
PAGES (new/modified):
  /              → Index.tsx (full rewrite of sections)
  /services      → Services.tsx (restructured into 4 categories + tool stack)
  /process       → Process.tsx (NEW — full process page)
  /team          → Team.tsx (NEW — dedicated team page)
  /about         → About.tsx (updated)

COMPONENTS (new/modified/deleted):
  DELETE: MetamorphosisAnimation.tsx, AuroraBackground.tsx
  NEW:   HeroBackground.tsx (flowing wave canvas/SVG animation)
         ProblemSolutionSection.tsx
         StatisticsBlock.tsx (replaces proof strip)
         ServicePillars.tsx (3 pillars for home)
         TeamBlock.tsx (full-width founders section)
         SecurityBlock.tsx
         ToolStackBlock.tsx
  MODIFY: ProcessSection.tsx (5 phases + hover glow)
          WhyAutronisSection.tsx (4 new pillars)
          FinalCTA.tsx (remove butterfly SVG)
          Navbar.tsx (add Process + Team links)
          Footer.tsx (update copy + links)
```

---

### Implementation Steps

**Step 1 — Hero Background Animation**
Create `src/components/home/HeroBackground.tsx`: a full-screen absolute-positioned SVG/canvas animation with slow-moving flowing light waves on a deep black base. Uses framer-motion for smooth sine-wave paths with turquoise (#23C6B7) glow accents. Stays behind content with `z-0`. No particles, no grids. Architectural, systemic feel inspired by image-13.

**Step 2 — Rewrite Hero Section (Index.tsx)**
- Remove team photo, MetamorphosisAnimation import, AnimatedCounter import
- Centered layout with strong typographic hierarchy
- New headline, subtext, single CTA "Plan een Automation Scan"
- HeroBackground behind content
- Dark background base

**Step 3 — Statistics Block**
Replace proof strip with new `StatisticsBlock.tsx`: 3-column dark cards with subtle turquoise glow border. Metrics: "50+" workflows, "500+" uur, "Groeiende MKB-bedrijven". Uses AnimatedCounter for the numeric ones. Premium card design inspired by image-11.

**Step 4 — Problem → Solution Section**
New `ProblemSolutionSection.tsx` with two halves:
- PROBLEEM: label, headline, body, 3 structured card blocks (Gefragmenteerde systemen, Handmatige afhankelijkheid, Gebrek aan realtime inzicht)
- OPLOSSING: label, headline, body, 3 pillar cards (Process Automation, System Integrations, Data & Reporting)
- CTA with microcopy (30 min intake / Concrete optimalisaties / Inzicht in verwachte impact)
- Dark subtle gradient background, no heavy animation

**Step 5 — Services Pillars on Home**
Replace `DomainsSection.tsx` with `ServicePillars.tsx`: only 3 strategic pillars (Process Automation, System Integrations, Data & Reporting). Short descriptions. CTA: "Bekijk onze services →"

**Step 6 — Process Section (Home version)**
Rewrite `ProcessSection.tsx`: label "AANPAK", 5 phases (Analyse & Prioritering, Architectuur & Blueprint, Bouw & Integratie, Validatie & Overdracht, Monitoring & Optimalisatie). Hover: subtle turquoise glow/flood effect on each phase card. Security line underneath. CTA: "Bekijk ons volledige proces →"

**Step 7 — Why Autronis**
Rewrite `WhyAutronisSection.tsx` with 4 new pillars: Architectuur vóór automatisering, Meetbare impact, Direct met de bouwers, Eigendom & controle. Mature tone, no fluff headlines.

**Step 8 — Team Block on Home**
New `TeamBlock.tsx`: full-width section using the existing team photo. Headline "Werk met de mensen die het bouwen." Body text. Primary CTA "Plan een kennismaking", secondary link "Bekijk ons team →"

**Step 9 — Security Block**
New `SecurityBlock.tsx`: 5 items (minimale toegangsrechten, logging & monitoring, AVG-proof aanpak, geen vendor lock-in, documentatie & overdracht). Enterprise confidence tone. Minimal design with icon list.

**Step 10 — FinalCTA Update**
Remove butterfly SVG animation. Update copy to match new positioning. Keep clean CTA.

**Step 11 — Index.tsx Assembly**
New section order: Hero → Statistics → Problem/Solution → Service Pillars → Process → Why Autronis → Team Block → Case Studies → Security → FAQ → Final CTA. Remove DemoBlock from homepage.

**Step 12 — Services Page Restructure**
- New hero copy as specified
- Add `ToolStackBlock.tsx` after hero (title, sub, API line)
- Restructure 14 services into 4 categories: Revenue & Sales, Operations & Workflow, Finance & Reporting, Customer & Service
- Professional grouped layout

**Step 13 — New Process Page (`/process`)**
Full standalone process page with label "AANPAK", all 5 phases with deliverables expanded. CTA at bottom.

**Step 14 — New Team Page (`/team`)**
Dedicated team page with founder cards (reuse existing photos), descriptions, and CTA.

**Step 15 — Routing & Navigation Updates**
- `App.tsx`: add routes for `/process` and `/team`
- `Navbar.tsx`: update nav links (add "Ons Proces", replace "Over Ons" with dropdown or separate "Team" link, remove "Demo" from main nav)
- `Footer.tsx`: update copy from "AI-gedreven automatiseringen" to system partner language, update links

**Step 16 — Theme & Styling**
- Ensure dark mode is default and looks premium
- Update `FinalCTA` background
- Remove MetamorphosisAnimation.tsx file
- Remove AuroraBackground.tsx file
- Clean up unused animation CSS variables (anim-wing, anim-wing-soft, anim-body)

**Step 17 — Mobile Responsiveness**
All new components built mobile-first. Statistics cards stack vertically. Problem/Solution cards stack. Process phases become vertical timeline on mobile. Team block adjusts image sizing.

