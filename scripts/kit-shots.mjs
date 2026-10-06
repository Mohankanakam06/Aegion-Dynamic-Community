#!/usr/bin/env node
/**
 * Gate verification: screenshots of /__kit (375 + 1440), real interaction
 * states (hover/focus/active via Playwright), and an axe audit.
 * Usage: start `npm run dev` first, then `node scripts/kit-shots.mjs [gateName]`.
 * Exits 1 when axe finds serious/critical violations.
 */
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BASE = process.env.KIT_URL ?? 'http://localhost:5173';
const GATE = process.argv[2] ?? 'gate-a';
const OUT = join(ROOT, 'docs', 'gates', GATE);
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const results = { shots: [], axe: null };

async function newPage(width, height) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log(`  [console.error] ${msg.text()}`);
  });
  page.on('pageerror', (err) => console.log(`  [pageerror] ${err.message}`));
  await page.goto(`${BASE}/__kit`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  return { ctx, page };
}

async function shotBlock(page, selector, name) {
  const block = page.locator(selector).locator('xpath=ancestor-or-self::section[1]');
  await block.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  const path = join(OUT, name);
  await block.screenshot({ path });
  results.shots.push(name);
  console.log(`  ✓ ${name}`);
}

try {
  // ---- 1440 full page ----
  const { ctx, page } = await newPage(1440, 900);
  await page.screenshot({ path: join(OUT, 'kit-1440.png'), fullPage: true });
  results.shots.push('kit-1440.png');
  console.log('  ✓ kit-1440.png (full page)');

  // ---- Interaction states ----
  // Hover on primary candidate
  await page.hover('[data-shot="btn-primary"]');
  await page.waitForTimeout(250);
  await shotBlock(page, '[data-shot="btn-primary"]', 'state-btn-hover.png');

  // Focus-visible ring on primary
  await page.locator('[data-shot="btn-primary"]').focus();
  await page.waitForTimeout(250);
  await shotBlock(page, '[data-shot="btn-primary"]', 'state-btn-focus.png');

  // Active (pressed) on secondary
  const secondary = await page.locator('[data-shot="btn-secondary"]').boundingBox();
  if (secondary) {
    await page.mouse.move(secondary.x + secondary.width / 2, secondary.y + secondary.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(150);
    await shotBlock(page, '[data-shot="btn-secondary"]', 'state-btn-active.png');
    await page.mouse.up();
  }

  // Card: hover spotlight + lift
  await page.hover('[data-shot="card-interactive"]', { position: { x: 120, y: 80 } });
  await page.waitForTimeout(300);
  await shotBlock(page, '[data-shot="card-interactive"]', 'state-card-hover.png');

  // Card: focus ring lands on the card (:has(a:focus-visible))
  await page.locator('[data-shot="card-interactive"] a').first().focus();
  await page.waitForTimeout(250);
  await shotBlock(page, '[data-shot="card-interactive"]', 'state-card-focus.png');

  // Inverse button hover on charcoal
  await page.hover('[data-shot="btn-inverse"]');
  await page.waitForTimeout(250);
  await shotBlock(page, '[data-shot="btn-inverse"]', 'state-inverse-hover.png');

  // ---- axe audit (scoped to the kit surface in <main>; the legacy Header/Footer
  // chrome around it has two KNOWN contrast violations fixed at Gate C) ----
  const axe = await new AxeBuilder({ page }).include('main').withTags(['wcag2a', 'wcag2aa']).analyze();
  const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const v of axe.violations) counts[v.impact ?? 'minor'] = (counts[v.impact ?? 'minor'] ?? 0) + 1;
  results.axe = counts;
  console.log(`\n  axe /__kit → critical:${counts.critical} serious:${counts.serious} moderate:${counts.moderate} minor:${counts.minor}`);
  for (const v of axe.violations) {
    if (v.impact === 'critical' || v.impact === 'serious') {
      console.log(`    ✗ [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
      for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(' ')}`);
    }
  }
  await ctx.close();

  // ---- 375 full page ----
  const { ctx: ctx375, page: page375 } = await newPage(375, 812);
  await page375.screenshot({ path: join(OUT, 'kit-375.png'), fullPage: true });
  results.shots.push('kit-375.png');
  console.log('  ✓ kit-375.png (full page)');
  await ctx375.close();
} finally {
  await browser.close();
}

console.log(`\nShots saved to docs/gates/${GATE}/`);
if (results.axe && (results.axe.critical > 0 || results.axe.serious > 0)) {
  console.error('Gate check FAILED: axe serious/critical violations above.');
  process.exit(1);
}
console.log('Gate check passed: no axe serious/critical violations.');
