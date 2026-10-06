# Aegion Dynamic Community — Multi-Page React Architecture Design

- **Date**: 2026-10-05
- **Status**: Approved
- **Scope**: Multi-page React 19 + TypeScript + Vite web application for Aegion Dynamic Community

---

## 1. Objectives & Identity
Transform the existing single-page HTML website into a modular, multi-page React application with world-class editorial aesthetic, responsive design, smooth micro-interactions, and zero photographic data loss.

### Core Brand Attributes
- **Visual Feel**: Editorial, warm, premium, community-driven, dynamic.
- **Typography Pairing**:
  - `Fraunces`: Editorial headlines with italic accents (`.serif-word`, `em`).
  - `Inter`: UI copy, navigation, body text.
  - `Space Mono`: Kickers, numbers, dates, tags, metadata badges.
- **Color Palette**:
  - Warm Ember: `--ember: #F2722F`, `--ember-deep: #C6501B`, `--ember-dark: #8F340D`
  - Amber Accents: `--amber: #FBDCC4`, `--amber-soft: #FDF0E4`, `--amber-border: rgba(242, 114, 47, 0.22)`
  - Cream Surfaces: `--cream: #FFFBF6`, `--cream-soft: #FAF4EB`, `--surface: #FFFFFF`
  - Ink & Contrast: `--ink: #1B1511`, `--ink-card: #231C17`, `--ink-soft: #5E534A`, `--ink-faint: #8E8378`
  - Lines: `--line: rgba(36, 28, 22, 0.08)`, `--line-strong: rgba(36, 28, 22, 0.14)`

---

## 2. Multi-Page Routing Architecture (`react-router-dom`)
The application is structured into 5 primary routes:
1. `/` — **Home**:
   - Distinct Aegion Hero (ambient glow, dashed orbit ring, animated SVG waves, live status badge, stats strip).
   - Infinite Brand Energy Ticker.
   - What We Do & Approach highlights.
   - Featured Events preview with 3D Tilt cards.
   - Community Story spotlight.
   - Call to Action card.
2. `/about` — **About**:
   - Detailed story of Aegion: student-led origins, peer-to-peer learning philosophy.
   - Editorial pullquotes.
   - Deep dive into Core Principles: *01 No Walls*, *02 Real Support*, *03 Real Growth*.
3. `/events` — **Events**:
   - Comprehensive event directory (Build Hours, Let's C, Proxima, City Decoded).
   - Filter pills (All, Weekly, Workshops, Flagship, Community).
   - Full photo galleries with interactive Lightbox zoom.
4. `/stories` — **Stories**:
   - Photo essay on community moments.
   - Member quotes and testimonials.
   - Video spotlight card.
5. `/contact` — **Contact**:
   - High-contrast ink cards for Email, Phone/WhatsApp, and Instagram.
   - Community meeting location details & FAQs.

---

## 3. Component Hierarchy & Modular Units

### Layout Components (`src/components/layout/`)
- `Header.tsx`: Glassmorphic sticky header with active route pill, brand logo, mobile hamburger trigger, and responsive drawer menu.
- `Footer.tsx`: Brand signature, quick route links, dynamic copyright year, and smooth "Back to top" button.
- `ScrollToTop.tsx`: Automatic window scroll reset on route changes.

### UI Primitives (`src/components/ui/`)
- `Reveal.tsx`: Reusable wrapper using `IntersectionObserver` to animate child elements into view on scroll with customizable delay.
- `TiltCard.tsx`: 3D perspective mouse tilt with cursor-following radial spotlight reflection physics.
- `BrandTicker.tsx`: Infinite CSS marquee banner with spinning glyphs and pause-on-hover.
- `Modal.tsx`: Accessible dialog for event details and image grids.
- `Lightbox.tsx`: Full-screen photo viewer with keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`) and image counters.

---

## 4. Asset Pipeline & Data Management
- Extract all 16 base64 image strings from `_assets_map.json` into disk assets inside `src/assets/images/`:
  - `logo-nav.png`, `logo-hero.png`, `community-feature.jpg`
  - `build-hours/image-1.jpg` through `image-7.jpg`
  - `proxima/image-1.jpg` through `image-6.jpg`
- Static metadata extracted into typed TypeScript files (`src/data/events.ts`, `src/data/testimonials.ts`).

---

## 5. Verification & Quality Gates
1. `npm run build` passes with 0 TypeScript/lint errors.
2. Route transitions function seamlessly across all 5 pages.
3. 3D perspective tilt and spotlight effects operate smoothly on desktop.
4. Mobile drawer operates cleanly on viewport resize (<900px).
5. Lightbox and modals display full resolution imagery with keyboard traps and navigation.
6. Reduced motion media queries (`prefers-reduced-motion`) respect user preferences.
