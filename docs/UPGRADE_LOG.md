# Upgrade Log — Aegion Dynamic Community

## Project Decisions Log
- **2026-10-06:** Baseline commit created at `0a9974f` on branch `redesign`. Full backup verified at `Aegion Dynamic Community-backup-2026-10-06`.
- **2026-10-06:** Confirmed theme direction: 100% LIGHT THEME ONLY (`color-scheme: light`). Footer and About-page CTA card intentionally remain dark charcoal.
- **2026-10-06:** Pre-approved Step 0: Complete reversal of dark-theme toggles, theme initialization scripts, prefers-color-scheme rules, dark CSS variables, and dark utility classes.
- **2026-10-06:** Phase 1 (Baseline & Audit) approved by user. Baseline screenshots (375/768/1440) and copy dumps for all 5 routes live in `docs/baseline/`.
- **2026-10-06:** Phase 2 (Foundation) partially landed earlier: design tokens (incl. text-safe ember `--ember-deep #C4460E`, measured 4.8:1 on cream) and fonts (Bricolage Grotesque / Plus Jakarta Sans / Space Mono). The remaining Phase-2 items — container system, shadcn init, real Reveal/Stagger — were absorbed into **Gate A** with user approval.
- **2026-10-06:** Master prompt Phase 3 replaced by the component-kit plan (kit first at dev-only `/__kit`, then page assembly). Phase 4 (performance, SEO, QA) unchanged.
- **2026-10-06:** Dark-surface decision: footer + About CTA card stay dark charcoal. Home final CTA may stay dark via shared CTABand **only if** it does not merge with the dark footer above it; otherwise it becomes light with an ember accent (check at Gate D/F1).
- **2026-10-06:** Dead-code retirement approved: delete `YearInEvents`, `works-wheel`, `Card3D`, `BrandTicker`, `TiltCard`, `Spotlight`, `BorderBeam`, `MagneticButton`, `BlurText`, `GooeyNav` (+css) **only in the gate that replaces each**, after grepping for imports. gsap/lenis removal deferred to Phase 4.
- **2026-10-06:** Contact form: build UI with clearly marked placeholder submit handler; NO fake success in production builds. User picks the backend (Formspree / Web3Forms / serverless Discord webhook) before Gate E.
- **2026-10-06:** A6 Button primary: kit shows two candidates — (1) white on `#C4460E` (4.96:1, recommended), (2) ink on `#E85D1A`. User decides after seeing the kit.
- **2026-10-06:** Library install table approved (cva, Radix slot/label/radio-group/toggle-group/tooltip/dialog, sonner, react-hook-form + zod + resolvers, @icons-pack/react-simple-icons, vite-imagetools, playwright + @axe-core/playwright).

## Open Content Issues (awaiting user's correct values — DO NOT FIX)
1. Stat conflict: metric detail says "12+ regional institutions"; About timeline says "6 engineering colleges".
2. PROXIMA dated "March 2025" in `src/data/events.ts`, but About timeline says "Jul 2026 — Hackathon Proxima 1.0".
3. `src/data/events.ts`: "workshops, and swags" ("swag" is uncountable).
4. Unused imports in `src/pages/About.tsx` (Clock, CheckCircle2, Users2, Calendar); dead `.glass-card` styles; 188KB `src/assets/images/logo.svg` (optimize in Phase 4).
5. `--ink-muted` (3.88:1) is used for 11px meta text (below AA 4.5:1); remap to a passing token during component migration.

## Open Decisions / Pending Microcopy
- **A6 primary color:** user decides between the two kit candidates at Gate A review.
- **Microcopy pending approval:** "(opens in a new tab)" sr-only suffix on external links (A5). Validation/success/error strings arrive at Gate B.
- **Contact backend:** user chooses before Gate E.

## Completed Steps
- **Step 0 — Safety Check & Dark Theme Revert:**
  - Verified clean working tree on `redesign`.
  - Created `docs/UPGRADE_RULES.md` and `docs/UPGRADE_LOG.md`.
  - Reverted dark theme code in `index.html`, `src/styles/globals.css`, and `src/components/layout/Header.tsx`.
- **Phase 1 — Baseline & Audit:** route screenshots + copy dumps in `docs/baseline/`; inventory delivered 2026-10-06 (component map, duplication tally, install table, typo list). Approved.

## Bundle Baseline (commit `7aeeca5`, pre-Gate-A)
- JS: index 129.98KB gz, vendor-motion 35.31KB, vendor-gsap 32.74KB, vendor-react 17.48KB, vendor-icons 3.06KB → **~219KB gz total**
- CSS: 69.32KB (12.50KB gz). Largest image: community-feature.jpg 216KB. logo.svg 188KB.

## Current Step
- **Gate A — Foundations A1–A10** (+ container system, shadcn init, Reveal/Stagger, light-only guard, dev-only `/__kit`). In progress.
