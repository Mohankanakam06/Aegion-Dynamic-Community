# Aegion Dynamic Community

> Open ecosystem for curious minds, student builders, creators, and technologists in Vizag. Weekly build hours, peer code review, and prototype sprints.

**Connect. Build. Grow.** — Sundays, 11:00 AM IST at the Vizag Innovation Hub & Discord.

---

## Tech Stack

| Area | Choice |
|---|---|
| Framework | React 19 + TypeScript + Vite 7 |
| Styling | Tailwind CSS 4 (token-driven, CSS custom properties) |
| Routing | React Router 7 (SPA) |
| Animation | Motion (`motion/react`), LazyMotion, CSS keyframes |
| UI primitives | Radix UI (Dialog, Sheet, RadioGroup, Tooltip, Slot) · shadcn pattern |
| Forms | react-hook-form + zod (Gate E) |
| Toasts | Sonner |
| Icons | lucide-react + simple-icons |
| Images | vite-imagetools (AVIF → WebP → JPEG srcsets) |
| Testing | Vitest + Testing Library · Playwright + axe-core |

## Getting Started

```bash
npm install        # requires Node ^20.19 || >=22.12
npm run dev        # http://localhost:5173
npm run build      # typecheck + light-only guard + production build → dist/
npm run preview    # serve the production build locally
npm test           # vitest (28 tests)
```

### Component kit (dev only)

While `npm run dev` is running, open **http://localhost:5173/__kit** — every
component with all variants, sizes and states on cream, plus a Surfaces block on
charcoal. The kit route is excluded from the production build entirely.

Verification helpers (used at every gate):

```bash
node scripts/kit-shots.mjs <gate>   # kit screenshots (375/1440), real hover/focus/active states, axe audit
node scripts/page-shots.mjs <name>  # full-page screenshots of all 5 routes at 375/1440
node scripts/contrast.mjs           # measured WCAG contrast table for every token pair
```

## Project Structure

```
src/
├── components/
│   ├── brand/      Eyebrow, Accent, SectionHeader, NumberTag, label-style
│   ├── layout/     Container, Section, Header, Footer, ScrollToTop
│   ├── motion/     Reveal, Stagger
│   ├── ui/         Button, IconButton, Badge, IconTile, Card, Photo, Link,
│   │               Field, Input, Textarea, ChoiceChips, Toaster, Tooltip,
│   │               Skeleton, Spinner, EmptyState, Dialog, Sheet (+ legacy)
│   └── sections/   (page assemblies land here in Gates D–F)
├── kit/            dev-only kit blocks (one file per component family)
├── pages/          Home, About, Events, Stories, Contact, __kit (dev only)
├── data/           events, testimonials (+ community metrics)
├── lib/            utils (cn), motion tokens, confetti
├── styles/         globals.css — all design tokens live here
└── test/           vitest setup + suites
scripts/            check-light-only, kit-shots, page-shots, contrast
docs/
├── UPGRADE_RULES.md  hard rules (read first)
├── UPGRADE_LOG.md    decisions, open issues, gate history
├── baseline/         pre-upgrade screenshots + copy dumps (frozen)
└── gates/            per-gate verification screenshots
```

## Design System

- **Light theme only.** The footer and CTA bands are the only intentional charcoal surfaces. `scripts/check-light-only.mjs` runs as `prebuild` and fails the build on any dark-mode machinery.
- **Tokens over literals:** color, spacing (4px grid), radius, shadow, and motion scales live in `src/styles/globals.css`. Components use `var(--*)` tokens only.
- **Typography:** Bricolage Grotesque (display) · Plus Jakarta Sans (body) · Space Mono (mono accents only — never for emails/handles).
- **Labels:** sans, medium, 13px, title case. Pills use the split style (lead · hairline · ember tail); everything else uses a dot separator. No `//`, no mono-caps-with-wide-tracking.
- **Motion budget:** five signature effects site-wide; micro-interactions 120–200ms; reveals ≤ 450ms; `prefers-reduced-motion` honored everywhere.
- **Accessibility:** WCAG AA measured (4.5:1 text / 3:1 large & UI), 44px+ touch targets, visible focus rings (ember on light, cream on charcoal), full keyboard support, axe-clean kit.

## Deployment

Build output is `dist/` (gitignored). SPA fallback configs are included:

- **Vercel** — `vercel.json` (framework `vite`, rewrite `/(.*) → /index.html`)
- **Netlify** — `public/_redirects` (`/* /index.html 200`)

For any other static host: serve `dist/`, route all paths to `index.html`.

## Process

This project is being rebuilt gate-by-gate on the `redesign` branch (kit first,
then page assembly). Read `docs/UPGRADE_RULES.md` and `docs/UPGRADE_LOG.md`
before touching anything: copy is frozen, routes/nav/logo are frozen, one
commit per approved gate.

---

© Aegion Dynamic Community · Built with ♥ by makers in Vizag.
