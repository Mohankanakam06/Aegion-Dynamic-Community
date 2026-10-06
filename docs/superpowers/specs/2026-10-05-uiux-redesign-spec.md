# Aegion Dynamic Community — UI/UX Redesign & Motion System Spec

**Date:** 2026-10-05  
**Audience:** College students (16–25) in Vizag & Andhra Pradesh, engineering mentors, organizers.  
**Brand Aesthetic:** Warm editorial paper meets modern kinetic typography, electric ember accents (`#E85D1A`), high-energy builder vibe, proof-of-work culture.

---

## 1. Architecture & Core Libraries

- **Framework:** React 19 + TypeScript + Vite 7
- **Styling:** Tailwind CSS v4 + Design Tokens in `src/styles/globals.css`
- **Motion & Physics Engine:**
  - `motion` (`framer-motion`): Component transitions, `AnimatePresence`, layout animations (`layoutId`), shared variants.
  - `lenis`: Smooth momentum scrolling in root layout, strictly disabled under `prefers-reduced-motion`.
  - `gsap` + `ScrollTrigger`: One pinned storytelling section ("Our Year in Events") with scrub synchronization to Lenis.
  - `canvas-confetti`: Micro-interaction for RSVP / Contact submission.
- **Component Libraries (Copy-paste / headless architecture):**
  - **Magic UI:** `Marquee`, `BentoGrid`, `NumberTicker`, `BorderBeam` / `ShineBorder`, `BlurFade`.
  - **Aceternity UI:** `Spotlight`, `3D Card` (`CardContainer`, `CardBody`, `CardItem`), `Timeline`.
  - **React Bits:** `BlurText` (kinetic hero headline), `AuroraBackground` (ambient hero lighting), `MagneticButton`.

---

## 2. Design Tokens & Color System

- **Background & Canvas:**
  - Light mode: `--cream: #FFFBF6`, `--surface: #FFFFFF`, `--surface-glass: rgba(255, 251, 246, 0.92)`
  - Dark mode support: `--surface-dark: #181411`, `--surface-dark-elevated: #221B16`
- **Primary & Secondary Accents:**
  - `--ember: #E85D1A` (Electric Warm Ember)
  - `--ember-deep: #C4460E`
  - `--ember-light: #FF783A`
  - `--ember-soft: #FFF2EB`
  - `--amber: #F2C9A5` (Terracotta / Sand Amber)
- **Ink & Contrast:**
  - `--ink: #181411`
  - `--ink-soft: #574D45` (WCAG AAA for body text)
  - `--ink-faint: #72665C` (WCAG AA for meta and captions)

---

## 3. Section-by-Section Implementation Plan

### Phase 1: Foundation
1. Install dependencies: `motion`, `lenis`, `gsap`, `canvas-confetti`, `@types/canvas-confetti`.
2. Create `src/lib/motion.ts` with shared reusable variants (`fadeUp`, `staggerContainer`, `scaleIn`, `reducedMotionSafe`).
3. Set up `Lenis` provider in `src/App.tsx` synced with `gsap.ticker` and guarded by `window.matchMedia('(prefers-reduced-motion: reduce)')`.

### Phase 2: Hero Section Enhancement
1. Create `src/components/ui/AuroraBackground.tsx` and `src/components/ui/Spotlight.tsx`.
2. Create `src/components/ui/BlurText.tsx` for kinetic headline reveal.
3. Create `src/components/ui/MagneticButton.tsx`.
4. Create `src/components/ui/NumberTicker.tsx` for stats strip.
5. Upgrade `Home.tsx` Hero with the unified atmospheric background, kinetic headline, and animated ticker metrics.

### Phase 3: Event Highlights Bento Grid & Featured Card
1. Create `src/components/ui/BentoGrid.tsx` and `src/components/ui/BorderBeam.tsx`.
2. Add a dynamic Bento Grid section showcasing weekly build hours, project incubations, hardware labs, and demo circles.
3. Add `BorderBeam` on the featured upcoming gathering.

### Phase 4: Social Proof & Testimonials Marquee
1. Create `src/components/ui/Marquee.tsx`.
2. Add a dual-track interactive infinite marquee (builder quotes and university partner badges: GITAM, AU, GVP, Vignan) on `Home.tsx` and `Stories.tsx`.

### Phase 5: 3D Event Cards & Timeline
1. Create `src/components/ui/Card3D.tsx` (Aceternity 3D tilt).
2. Create `src/components/ui/Timeline.tsx`.
3. Apply `Card3D` to events on `Events.tsx` and integrate `Timeline` for past milestones and build cycles on `About.tsx` / `Events.tsx`.

### Phase 6: Pinned Storytelling Scroll Experience (GSAP)
1. Create `src/components/ui/YearInEvents.tsx` with pinned GSAP ScrollTrigger scrubbing through photography moments.
2. Integrate into `About.tsx` or `Home.tsx`.

### Phase 7: RSVP & Micro-Interactions
1. Create `src/lib/confetti.ts` trigger.
2. Upgrade `Contact.tsx` RSVP submission with celebratory confetti, "Add to Calendar" (.ics export), and share links.
3. Verify test suite and production build.

---

## 4. Verification & Testing
- Unit & Layout tests: `npm test`
- Production build: `npm run build`
- Reduced motion test: verifying all animations gracefully degrade when `prefers-reduced-motion: reduce` is active.
