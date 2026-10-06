#!/usr/bin/env node
/**
 * Full-page screenshots of every route at 375 and 1440.
 * Usage: start `npm run dev` first, then `node scripts/page-shots.mjs [folderName]`.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BASE = process.env.SITE_URL ?? 'http://localhost:5173';
const OUT = join(ROOT, 'docs', 'gates', process.argv[2] ?? 'pages');
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ['/', 'home'],
  ['/about', 'about'],
  ['/events', 'events'],
  ['/stories', 'stories'],
  ['/contact', 'contact'],
];
const VIEWPORTS = [
  [375, 812, '375'],
  [1440, 900, '1440'],
];

const browser = await chromium.launch();
for (const [w, h, tag] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    // Deterministic captures: disables Lenis/smooth-scroll and CSS animations
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  for (const [path, name] of ROUTES) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
    // Trigger lazy loading through the whole page before the full-page capture
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight * 0.8;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 120);
          else { window.scrollTo(0, 0); setTimeout(resolve, 300); }
        };
        step();
      });
    });
    await page.screenshot({ path: join(OUT, `${name}-${tag}.png`), fullPage: true });
    console.log(`  ✓ ${name}-${tag}.png`);
  }
  await ctx.close();
}
await browser.close();
console.log(`Saved to docs/gates/${process.argv[2] ?? 'pages'}/`);
