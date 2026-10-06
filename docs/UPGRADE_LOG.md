# Upgrade Log — Aegion Dynamic Community

## Project Decisions Log
- **2026-10-06:** Baseline commit created at `0a9974f` on branch `redesign`. Full backup verified at `Aegion Dynamic Community-backup-2026-10-06`.
- **2026-10-06:** Confirmed theme direction: 100% LIGHT THEME ONLY (`color-scheme: light`). Footer and About-page CTA card intentionally remain dark charcoal (`var(--ink)` / `#140E0A`).
- **2026-10-06:** Pre-approved Step 0: Complete reversal of dark-theme toggles, theme initialization scripts, prefers-color-scheme rules, dark CSS variables, and dark utility classes.

## Completed Steps
- **Step 0 — Safety Check & Dark Theme Revert:**
  - Verified clean working tree on `redesign`.
  - Created `docs/UPGRADE_RULES.md` and `docs/UPGRADE_LOG.md`.
  - Reverted dark theme code in `index.html`, `src/styles/globals.css`, and `src/components/layout/Header.tsx`.

## Next Step
- **Phase 1 — Baseline & Audit:**
  - Route screenshots (375, 768, 1440) in `docs/baseline/`.
  - Route copy dumps in `docs/baseline/copy-<route>.txt`.
  - Full inventory & audit table (P0/P1/P2).
  - Proposal (token plan, 2 font options rendered on temporary page, dependency table, section-by-section plan).
  - Stop and await user approval before Phase 2.
