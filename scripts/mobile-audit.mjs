#!/usr/bin/env node
/**
 * GATE M — Step 1 mobile audit (read-only). Real device contexts (touch + UA + DPR),
 * every route × device matrix. Checks: horizontal overflow, console errors, tap
 * targets <44px, sibling target gaps <8px, input font <16px, images w/o dimensions,
 * text-zoom 130/200% overflow, Slow-4G + 4x CPU metrics (LCP, long tasks, bytes).
 * Outputs docs/gates/gate-m-audit/*.png + audit.json. Does NOT modify the site.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BASE = process.env.SITE_URL ?? 'http://localhost:5173';
const OUT = join(ROOT, 'docs', 'gates', 'gate-m-audit');
mkdirSync(OUT, { recursive: true });

const UA_IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const UA_ANDROID =
  'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
const UA_IPAD =
  'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

const DEVICES = [
  { name: '320', w: 320, h: 568, dpr: 2, ua: UA_IPHONE },
  { name: '360', w: 360, h: 800, dpr: 3, ua: UA_ANDROID },
  { name: '375', w: 375, h: 667, dpr: 2, ua: UA_IPHONE },
  { name: '390', w: 390, h: 844, dpr: 3, ua: UA_IPHONE },
  { name: '412', w: 412, h: 915, dpr: 2.625, ua: UA_ANDROID },
  { name: '430', w: 430, h: 932, dpr: 3, ua: UA_IPHONE },
  { name: 'landscape', w: 844, h: 390, dpr: 3, ua: UA_IPHONE },
  { name: 'tablet', w: 768, h: 1024, dpr: 2, ua: UA_IPAD },
];
const ROUTES = [
  ['/', 'home'],
  ['/about', 'about'],
  ['/events', 'events'],
  ['/stories', 'stories'],
  ['/contact', 'contact'],
];

const report = { routes: {}, textZoom: {}, slow4g: {} };
const browser = await chromium.launch();

const AUDIT_JS = `(() => {
  const vw = window.innerWidth;
  const out = { overflow: null, targets: [], gaps: [], inputs: [], imagesMissingDims: 0, ctaViewports: null, docHeightVh: 0 };
  const se = document.scrollingElement;
  out.docHeightVh = +(se.scrollHeight / vw).toFixed(1);
  if (se.scrollWidth > vw + 1) {
    const offenders = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width && (r.right > vw + 1 || r.left < -1) && offenders.length < 6) {
        offenders.push((el.tagName.toLowerCase() + '.' + String(el.className).split(' ').slice(0, 3).join('.')).slice(0, 90) + ' right:' + Math.round(r.right));
      }
    });
    out.overflow = { scrollWidth: se.scrollWidth, vw, offenders };
  }
  const interactive = [...document.querySelectorAll('a[href], button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && el.offsetParent !== null; });
  for (const el of interactive) {
    const r = el.getBoundingClientRect();
    if ((r.width < 44 || r.height < 44) && out.targets.length < 10) {
      const label = (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().slice(0, 40);
      out.targets.push(label + ' — ' + Math.round(r.width) + 'x' + Math.round(r.height));
    }
  }
  const seen = new Set();
  for (const el of interactive) {
    if (!el.parentElement || seen.has(el.parentElement)) continue;
    const sibs = [...el.parentElement.querySelectorAll('a[href], button, [role="button"], input, select, textarea')].filter((s) => s.offsetParent !== null);
    for (let i = 0; i < sibs.length - 1; i++) {
      const a = sibs[i].getBoundingClientRect(), b = sibs[i + 1].getBoundingClientRect();
      const gapX = b.left - a.right, gapY = b.top - a.bottom;
      if (((gapX >= 0 && gapX < 8 && Math.abs(a.top - b.top) < 4) || (gapY >= 0 && gapY < 8 && Math.abs(a.left - b.left) < 4)) && out.gaps.length < 8) {
        out.gaps.push((sibs[i].getAttribute('aria-label') || sibs[i].textContent || '?').trim().slice(0, 30) + ' → gap ' + Math.round(Math.max(gapX, gapY)) + 'px');
      }
    }
    seen.add(el.parentElement);
  }
  document.querySelectorAll('input, textarea, select').forEach((el) => {
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 16 && out.inputs.length < 6) out.inputs.push((el.placeholder || el.id || el.type) + ' — ' + fs + 'px');
  });
  document.querySelectorAll('img').forEach((img) => { if (!img.getAttribute('width') || !img.getAttribute('height')) out.imagesMissingDims++; });
  const cta = [...document.querySelectorAll('a, button')].find((el) => /join (next )?sunday sprint/i.test(el.textContent || ''));
  if (cta) out.ctaViewports = +((cta.getBoundingClientRect().top + se.scrollTop) / vw).toFixed(1);
  return out;
})()`;

for (const device of DEVICES) {
  for (const [path, name] of ROUTES) {
    const ctx = await browser.newContext({
      viewport: { width: device.w, height: device.h },
      deviceScaleFactor: device.dpr,
      isMobile: true,
      hasTouch: true,
      userAgent: device.ua,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text().slice(0, 120)));
    page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message.slice(0, 120)));
    try {
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 45000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(700);
      const audit = await page.evaluate(AUDIT_JS);
      const key = `${name}@${device.name}`;
      report.routes[key] = { ...audit, consoleErrors };
      await page.screenshot({ path: join(OUT, `${name}-${device.name}.png`), fullPage: true });
      console.log(`✓ ${key}${audit.overflow ? '  ⚠ OVERFLOW' : ''}${audit.targets.length ? '  ⚠ targets' : ''}${consoleErrors.length ? '  ⚠ console' : ''}`);
    } catch (e) {
      report.routes[`${name}@${device.name}`] = { error: e.message.slice(0, 160) };
      console.log(`✗ ${name}@${device.name}: ${e.message.slice(0, 120)}`);
    }
    await ctx.close();
  }
}

// ---- Text zoom 130% / 200% at 375 (home + contact) ----
for (const [path, name] of [ROUTES[0], ROUTES[4]]) {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 667 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA_IPHONE, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  for (const pct of [130, 200]) {
    await page.evaluate((p) => { document.documentElement.style.fontSize = (16 * p) / 100 + 'px'; }, pct);
    await page.waitForTimeout(400);
    const ov = await page.evaluate(() => {
      const se = document.scrollingElement;
      return se.scrollWidth > window.innerWidth + 1 ? { scrollWidth: se.scrollWidth, vw: window.innerWidth } : null;
    });
    report.textZoom[`${name}-${pct}`] = { overflow: ov };
    await page.screenshot({ path: join(OUT, `textzoom-${name}-${pct}.png`), fullPage: true });
    console.log(`✓ textzoom ${name} ${pct}%${ov ? '  ⚠ OVERFLOW' : ''}`);
  }
  await ctx.close();
}

// ---- Slow 4G + 4x CPU (home, events, contact @ 360) ----
for (const [path, name] of [ROUTES[0], ROUTES[2], ROUTES[4]]) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: UA_ANDROID });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.__lcp = 0; window.__longTasks = 0;
    try {
      new PerformanceObserver((l) => { const e = l.getEntries(); if (e.length) window.__lcp = e[e.length - 1].startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => { window.__longTasks += l.getEntries().length; }).observe({ type: 'longtask', buffered: true });
    } catch {}
  });
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const t0 = Date.now();
  await page.goto(`${BASE}${path}`, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(4000);
  const metrics = await page.evaluate(() => {
    const res = performance.getEntriesByType('resource');
    const byType = {};
    for (const r of res) {
      const type = r.initiatorType === 'script' ? 'js' : r.initiatorType === 'img' ? 'img' : r.initiatorType === 'css' ? 'css' : r.initiatorType === 'link' ? 'font' : 'other';
      byType[type] = (byType[type] ?? 0) + (r.transferSize || 0);
    }
    return { lcp: Math.round(window.__lcp), longTasks: window.__longTasks, resources: res.length, bytesKB: Math.round(res.reduce((a, r) => a + (r.transferSize || 0), 0) / 1024), byType: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, Math.round(v / 1024) + 'KB'])) };
  });
  report.slow4g[name] = { ...metrics, wallMs: Date.now() - t0 };
  console.log(`✓ slow4g ${name}: LCP ${metrics.lcp}ms, ${metrics.bytesKB}KB total, JS ${metrics.byType.js ?? 0}, long tasks ${metrics.longTasks}`);
  await ctx.close();
}

writeFileSync(join(OUT, 'audit.json'), JSON.stringify(report, null, 2));
await browser.close();
console.log('\nSaved audit.json + screenshots to docs/gates/gate-m-audit/');
