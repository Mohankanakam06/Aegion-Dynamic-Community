# Upgrade Hard Rules — Aegion Dynamic Community

These rules override everything else in every phase and step of this project.

1. **LIGHT ONLY.**
   No dark mode, no theme toggle, no prefers-color-scheme rules, no data-theme / class="dark" logic, no theme code in localStorage. `color-scheme` is light. If unsure about ANY color decision, ask the user. The footer and About CTA card stay dark charcoal on purpose. Everything else is light.

2. **COPY IS FROZEN.**
   Do not rewrite, shorten, translate or "improve" text. Never invent content (no fake testimonials, stats, logos, sponsors or dates). List typos or content problems for the user instead of fixing them silently.

3. **STRUCTURE IS FROZEN.**
   Routes, URLs, nav labels, page order, form fields, external links, logo. Layout changes are PROPOSALS that need user approval. Do not reformat or rename files without reason; diffs must stay reviewable.

4. **NO SURPRISES.**
   Before editing, state which files you will touch and what will change. Work ONE section per step. STOP after each step and wait for approval. Commit each approved step on the `redesign` branch.

5. **DEPENDENCIES.**
   Never upgrade React, Vite, Tailwind or TypeScript major versions. Never run `npm audit fix --force`, delete folders, or run any destructive command. Prefer copy-in source components (shadcn/ui, Magic UI) over npm packages. Show approval table before installing anything.

6. **VERIFY, DON'T ASSUME.**
   Read the official docs for the INSTALLED version of every library before using it (never guess an API). After every step: typecheck, lint (if configured), `npm run build`, open site in browser, check console for errors and screenshot at 375, 768 and 1440 px. Show before/after. Trust user screenshots over assumptions. If anything breaks, stop immediately, explain, fix, then continue.

7. **TASTE GUARDRAILS.**
   Maximum five signature effects site-wide. No purple/blue gradients, neon glows, glassmorphism (except existing header blur), emoji icons, stock or placeholder images, scroll-hijacking, cursor-hijacking, or autoplay media. Hover effects only inside `@media (hover: hover)`. Prefer animating transform and opacity only.

8. **ACCESSIBILITY AND MOTION ARE NON-NEGOTIABLE.**
   Wrap the app in `<MotionConfig reducedMotion="user">` and honor `prefers-reduced-motion` in CSS; WCAG AA contrast (4.5:1 text, 3:1 large text and UI); visible `:focus-visible` rings; full keyboard use; touch targets of 44px or more; semantic landmarks and a skip-to-content link.

9. **MEMORY.**
   Keep `docs/UPGRADE_LOG.md` current (decisions approved, what is done, what is next) and consult both `docs/UPGRADE_RULES.md` and `docs/UPGRADE_LOG.md` at the start of any new session.
