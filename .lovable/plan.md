

# AutronisGroup Marketing Website — Updated Color & Build Plan

## Color System (derived from logo)
- **Primary background**: Near-black (#0A0A0A / #111111)
- **Foreground/text**: White (#FFFFFF) + muted gray (#A1A1AA)
- **Accent**: Turquoise from logo center ring — **#16BBAD** as primary accent, with lighter variant (#4DD8CB) for hover glows and darker variant (#0E8A7F) for pressed states
- **Circuit/line elements**: Black (#1A1A1A) on dark backgrounds, with turquoise pulse accents
- **Cards/surfaces**: Dark gray (#18181B) with subtle borders

## Logo Usage
- The uploaded butterfly-gear-circuit logo will be used as the site logo in navigation and footer
- The circuit-wing motif will inspire background SVG patterns (hero section, section dividers)

## Build Order (Phase 1 — Foundation)

### Step 1: Design System & Global Styles
- Update CSS variables to the dark theme color system above
- Set up typography (Inter font), spacing scale, button variants with turquoise glow
- Add animation keyframes (pulse, fade-up, gear-rotate) with `prefers-reduced-motion` support

### Step 2: Sticky Navigation
- Logo (uploaded image) on the left
- Nav links: Home, Services, Case Studies, Demo, Over Ons, Resources, Contact
- Primary CTA button: "Plan Automation Scan" (turquoise)
- Language switcher with flag icons (NL active, EN placeholder)
- Transparent → solid on scroll transition
- Mobile hamburger menu

### Step 3: Footer
- 4-column layout with logo, links, social icons, newsletter placeholder
- Legal links (Privacy, Cookies)

### Step 4: Home Page — Hero
- Bold Dutch headline + outcome-driven subhead
- Two CTAs: "Plan Automation Scan" (turquoise fill) + "Bekijk 2-min demo" (outlined)
- Circuit-line data-pulse SVG animation in background
- Proof strip: metric counters + client logo placeholders

### Step 5: Home Page — Remaining Sections
- "Wat we automatiseren" — 6 domain cards with icons
- "Hoe het werkt" — 4-step process timeline
- Case study preview — 3 cards with outcomes
- Demo block — video placeholder + CTA
- FAQ — 8–10 accordion items (Dutch)
- Final CTA block

### Step 6: Core Pages
- /services, /case-studies, /case-studies/[slug], /demo, /book (with pre-qualification form), /about, /resources, /resources/[slug], /contact, /privacy, /cookies

### Step 7: Polish & Interactivity
- Chatbot widget placeholder (turquoise bubble)
- Event tracking hooks (console.log)
- Scroll animations, button microinteractions
- SEO meta tags (Dutch), OpenGraph, lazy-loading

