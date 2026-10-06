# Aegion Dynamic Community — Multi-Page React Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Aegion Dynamic Community website into a modular multi-page React 19 + TypeScript + Vite application with world-class editorial aesthetic, 3D tilt cards, accessible galleries, and zero loss of photography.

**Architecture:** A Vite + React Router v7 application with 5 routes (`/`, `/about`, `/events`, `/stories`, `/contact`), extracted clean image assets from `_assets_map.json`, a cohesive CSS design system with Fraunces + Inter + Space Mono typography, and reusable UI physics components (`TiltCard`, `Reveal`, `BrandTicker`, `Lightbox`).

**Tech Stack:** React 19, TypeScript, Vite 7, React Router 7, Tailwind CSS v4 / CSS Custom Properties, Lucide React icons.

**Spec:** `docs/superpowers/specs/2026-10-05-aegion-react-multipage-design.md`

## Global Constraints
- Work strictly inside `D:\claude\Claude Code Projects\Aegion\Aegion Dynamic Community\`.
- Do not modify, rename, or delete `pearl-panda-site-main`.
- Preserve 100% of the 16 base64 photos from `_assets_map.json` by exporting them to `src/assets/images/`.
- Preserve Aegion's authentic identity, mission, and distinct hero design.

## Review Focus
1. **Asset extraction integrity**: Every base64 photo extracted to disk with valid header/binary format.
2. **Type safety**: Strict TypeScript compilation with 0 errors across all routes and components.
3. **Route transitions**: Scroll resets to (0, 0) on navigation using `ScrollToTop`.
4. **Modal & Lightbox traps**: Keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`) and focus trap behavior without background page scrolling.
5. **Mobile drawer navigation**: Full responsive support under 900px viewport.

---

### Task 1: Scaffolding Vite + React + TypeScript and Asset Pipeline

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `extract-assets.js`
- Test: `npm run build`

**Interfaces:**
- Produces: Project root config and extracted images in `src/assets/images/` (`logo-nav.png`, `logo-hero.png`, `community-feature.jpg`, `build-hours/1-7.jpg`, `proxima/1-6.jpg`).

- [ ] **Step 1: Write package.json, tsconfig files, and vite.config.ts**
- [ ] **Step 2: Write asset extraction script to export all 16 base64 images from _assets_map.json into individual files**
- [ ] **Step 3: Run asset extraction script and install dependencies (`npm install`)**
- [ ] **Step 4: Verify all images exist on disk and verify basic Vite setup**

---

### Task 2: Design System, Tokens, Typography & Global Styles

**Files:**
- Create: `src/styles/globals.css`
- Create: `src/data/events.ts`
- Create: `src/data/testimonials.ts`

**Interfaces:**
- Produces: CSS custom properties (`--ember`, `--amber`, `--cream`, `--ink`, `--line`), font face declarations (`Fraunces`, `Inter`, `Space Mono`), and strongly-typed data structures for Events & Testimonials.

- [ ] **Step 1: Create `src/styles/globals.css` with font imports, reset, custom scrollbars, animations, and utility tokens**
- [ ] **Step 2: Create `src/data/events.ts` with typed event interfaces, dates, tags, and image asset imports**
- [ ] **Step 3: Create `src/data/testimonials.ts` with quote interfaces, author details, and photo assets**
- [ ] **Step 4: Verify data imports and types compile cleanly**

---

### Task 3: Interactive UI Primitives (`Reveal`, `TiltCard`, `BrandTicker`, `Modal`, `Lightbox`)

**Files:**
- Create: `src/components/ui/Reveal.tsx`
- Create: `src/components/ui/TiltCard.tsx`
- Create: `src/components/ui/BrandTicker.tsx`
- Create: `src/components/ui/Modal.tsx`
- Create: `src/components/ui/Lightbox.tsx`

**Interfaces:**
- Produces:
  - `Reveal`: `<Reveal delay={1 | 2 | 3 | 4}>{children}</Reveal>`
  - `TiltCard`: `<TiltCard className="..." onClick={...}>{children}</TiltCard>`
  - `BrandTicker`: `<BrandTicker items={string[]} />`
  - `Modal`: `<Modal isOpen={boolean} onClose={() => void} tag={string} title={string} desc={string} images={string[]} onImageClick={(idx) => void} />`
  - `Lightbox`: `<Lightbox isOpen={boolean} onClose={() => void} images={string[]} currentIndex={number} onIndexChange={(idx) => void} />`

- [ ] **Step 1: Implement `Reveal.tsx` with `IntersectionObserver` and smooth cubic-bezier transitions**
- [ ] **Step 2: Implement `TiltCard.tsx` with 3D pointer physics and radial spotlight reflection**
- [ ] **Step 3: Implement `BrandTicker.tsx` with infinite marquee loop and pause-on-hover**
- [ ] **Step 4: Implement `Modal.tsx` and `Lightbox.tsx` with keyboard handling (`Escape`, `ArrowLeft`, `ArrowRight`) and scroll lock**
- [ ] **Step 5: Verify UI components compile with strict TypeScript**

---

### Task 4: Layout Components (`Header`, `Footer`, `ScrollToTop`)

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/ScrollToTop.tsx`

**Interfaces:**
- Produces:
  - `Header`: Sticky glassmorphic nav, active route indicators (`NavLink`), brand logo, and animated mobile drawer.
  - `Footer`: Brand identity, quick navigation links, copyright, and smooth back-to-top handler.
  - `ScrollToTop`: React Router listener resetting `window.scrollTo(0, 0)` on route changes.

- [ ] **Step 1: Implement `ScrollToTop.tsx` using `useLocation` from `react-router-dom`**
- [ ] **Step 2: Implement `Header.tsx` with sticky scroll observer, mobile hamburger toggle, and NavLink active styling**
- [ ] **Step 3: Implement `Footer.tsx` with responsive grid, back-to-top trigger, and dynamic year**
- [ ] **Step 4: Verify navigation layout responsiveness**

---

### Task 5: Core Pages (`Home`, `About`, `Events`, `Stories`, `Contact`)

**Files:**
- Create: `src/pages/Home.tsx`
- Create: `src/pages/About.tsx`
- Create: `src/pages/Events.tsx`
- Create: `src/pages/Stories.tsx`
- Create: `src/pages/Contact.tsx`
- Create: `src/App.tsx`
- Create: `src/main.tsx`

**Interfaces:**
- Produces: Complete 5-route React application with deep modal/lightbox integration, editorial pullquotes, interactive event directory, community stories, and direct contact channels.

- [ ] **Step 1: Implement `Home.tsx` featuring Aegion hero, brand ticker, about preview, 3D tilt event cards, and CTA**
- [ ] **Step 2: Implement `About.tsx` with narrative layout, pullquotes, and 3 core principles**
- [ ] **Step 3: Implement `Events.tsx` with filter tabs, card grid, interactive modal galleries, and full-screen lightbox**
- [ ] **Step 4: Implement `Stories.tsx` with featured photography, member quotes, and video teaser**
- [ ] **Step 5: Implement `Contact.tsx` with direct email, WhatsApp, Instagram cards, and location metadata**
- [ ] **Step 6: Configure `App.tsx` and `main.tsx` with `BrowserRouter`, `Routes`, and `Route` definitions**

---

### Task 6: Build Verification, Quality Audit & Execution Check

**Files:**
- Build test: `npm run build`
- Dev server test: `npm run preview`

**Interfaces:**
- Produces: Production-ready distribution in `dist/` with 0 warnings, flawless asset loading, smooth route navigation, and verified micro-interactions.

- [ ] **Step 1: Run TypeScript compiler and Vite production build (`npm run build`)**
- [ ] **Step 2: Verify asset sizes and routing integrity**
- [ ] **Step 3: Launch preview server and verify all 5 pages, tilt cards, modal/lightbox, and mobile drawer in browser**
- [ ] **Step 4: Clean up any temporary utility scripts**
