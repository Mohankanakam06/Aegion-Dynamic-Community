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
- **2026-10-06:** **User-directed copy change (approved):** the weekly sprint moved from Saturday to Sunday. All 25 occurrences updated (`Saturday(s)` → `Sunday(s)`), incl. ICS calendar (`BYDAY=SA` → `SU`, DTSTART/DTEND 2026-10-10 → 2026-10-11, filename `aegion-sunday-sprint.ics`). `docs/baseline/copy-*.txt` intentionally NOT touched — the Gate F copy diff will show exactly this rename.
- **2026-10-06:** **Sprint time change (approved):** Sundays 4:00–8:15 PM → **11:00 AM–3:15 PM IST** (15 spots, −5h shift; ICS DTSTART/DTEND moved accordingly).
- **2026-10-06:** **Label style change request (approved exception to copy-freeze):** remove the "//" separator + mono-caps-wide-tracking label style site-wide; words stay exactly as they are. Eyebrow (A2) rebuilt to `lead`/`tail` props + `LabelSeparator`; Badge (A7) and media caption labels follow the single `LABEL_STYLE` switch in `src/components/brand/label-style.ts`. **User picks A | B | C from `/__kit#labels`** (may differ for pills vs section labels), then all 20 listed call sites migrate in one commit: `replace // label style`. JetBrains Mono loaded for option C — remove the font link + `.font-mono-alt` if C is not picked.
- **2026-10-06:** Library install table approved (cva, Radix slot/label/radio-group/toggle-group/tooltip/dialog, sonner, react-hook-form + zod + resolvers, @icons-pack/react-simple-icons, vite-imagetools, playwright + @axe-core/playwright).

## Open Content Issues (awaiting user's correct values — DO NOT FIX)
1. Stat conflict: metric detail says "12+ regional institutions"; About timeline says "6 engineering colleges".
2. PROXIMA dated "March 2025" in `src/data/events.ts`, but About timeline says "Jul 2026 — Hackathon Proxima 1.0".
3. `src/data/events.ts`: "workshops, and swags" ("swag" is uncountable).
4. Unused imports in `src/pages/About.tsx` (Clock, CheckCircle2, Users2, Calendar); dead `.glass-card` styles; 188KB `src/assets/images/logo.svg` (optimize in Phase 4).
5. `--ink-muted` (3.88:1) is used for 11px meta text (below AA 4.5:1); remap to a passing token during component migration.

## Open Decisions / Pending Microcopy
- **A6 primary color:** user decides between the two kit candidates at Gate A review (kit block `buttons`: candidate 1 white-on-#C4460E 4.97:1 recommended; candidate 2 ink-on-#E85D1A 5.24:1).
- **Microcopy pending approval:** "(opens in a new tab)" sr-only suffix on external links (A5). Validation/success/error strings arrive at Gate B.
- **Contact backend:** user chooses before Gate E.
- **Gate B heads-up:** `--color-warning` (#D97706) is 3.09:1 on cream — fails AA; a darker warning text token needs approval with the Gate B swatches. `--ink-muted` (3.88:1) must not carry real text.

## Gate A Notes
- LazyMotion wired with `domAnimation` (zero bundle cost today: legacy `motion.*` components already include those features). **Switch to `domMax` at Gate C** for layoutId pills — one-line change in `src/App.tsx`.
- `vite-imagetools@10.0.1` pinned (v11+ requires Vite ≥8; we stay on Vite 7 per rules).
- Tailwind v4 hover/translate gotcha encoded in components: v4 sets standalone `translate`/`scale` properties, so transition lists include `translate,scale` (not `transform`).
- axe on /__kit scoped to `main`: 0 serious/critical. Two KNOWN violations live in the legacy chrome (Header CTA white-on-ember 3.49:1; footer white/40 label 3.9:1) — fixed at Gates C1/C2.
- Existing pages now get real Reveal via the shim (`ui/Reveal.tsx` → `motion/Reveal.tsx`); pages migrate fully during assembly gates, shim deleted then.

## Label Style Migration (2026-10-06, commit `replace // label style`)
- **Final styles:** hero pills → B (split pill: lead ink, 16px hairline, tail ember-deep / ember-light on dark); everything else → A (dot separator, sans medium 13px, title case). Option C rejected; JetBrains Mono removed.
- **NumberTag:** number ember-deep + label ink, no separator. Principles number-first (`01 Code First`); cadence keeps word order (`Phase 01`).
- **Migrated (18 live sites + test fixture):** Home hero pill/caption/bento eyebrow/4 bento tags (BentoCard now takes `tagNum`/`tagLabel`), header drawer line, About pill/milestone chip/4 phase tags/photo caption, Stories pill/caption, Events pill, Contact pill. Dead-code files (`works-wheel`, `YearInEvents`) skipped — removed in their gates.
- **Schedule FINAL: Sunday, 11:00 AM IST.** Repo sweep confirmed zero remaining "Saturday"/"4:00 PM" outside `docs/UPGRADE_LOG.md` (history) and `docs/baseline/` (frozen).
- **Still on old label style by design (migrate with their gates):** other section eyebrows ("Community Voices", "Our Bedrock", "Origins & Vision", "The Architecture of a Build", "Flagships & Gatherings" plain span, stat labels, footer labels, modal/gallery labels, marquee). Each becomes `Eyebrow` when its section assembles in Gates C–F.

## Completed Steps
- **Step 0 — Safety Check & Dark Theme Revert:**
  - Verified clean working tree on `redesign`.
  - Created `docs/UPGRADE_RULES.md` and `docs/UPGRADE_LOG.md`.
  - Reverted dark theme code in `index.html`, `src/styles/globals.css`, and `src/components/layout/Header.tsx`.
- **Phase 1 — Baseline & Audit:** route screenshots + copy dumps in `docs/baseline/`; inventory delivered 2026-10-06 (component map, duplication tally, install table, typo list). Approved.
- **Gate A — Foundations A1–A10 (commit pending):**
  - Built: Container, Section, Eyebrow, Accent, SectionHeader, Link, Button (+IconButton, Spinner), Badge, IconTile, Card, Photo, motion/Reveal, motion/Stagger; `components.json` (shadcn, manual init — CLI never touches globals.css); `scripts/check-light-only.mjs` as `prebuild`; dev-only `/__kit` (excluded from prod bundle, verified); `scripts/kit-shots.mjs` (Playwright states + axe), `scripts/contrast.mjs`.
  - Absorbed Phase-2 gaps: container tokens, shadcn init, real Reveal/Stagger.
  - Verified: tsc ✓, 28/28 tests ✓, build ✓ (guard passes), axe /__kit 0 serious/critical, shots at 375/1440 in `docs/gates/gate-a/`.
  - Bundle delta: index +0.25KB gz, vendor-motion +0.01KB gz, CSS +1.48KB gz → **≈ +1.7KB gz total**.

## Bundle Baseline (commit `7aeeca5`, pre-Gate-A)
- JS: index 129.98KB gz, vendor-motion 35.31KB, vendor-gsap 32.74KB, vendor-react 17.48KB, vendor-icons 3.06KB → **~219KB gz total**
- CSS: 69.32KB (12.50KB gz). Largest image: community-feature.jpg 216KB. logo.svg 188KB.

## Current Step
- **Gate A — Foundations A1–A10** (+ container system, shadcn init, Reveal/Stagger, light-only guard, dev-only `/__kit`). In progress.
