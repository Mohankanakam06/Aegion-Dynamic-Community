import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../docs/gates/gate-m/', import.meta.url));
mkdirSync(OUT, { recursive: true });
const UA_IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const UA_ANDROID =
  'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';

const browser = await chromium.launch();
const results = [];

for (const [w, h, ua, tag] of [
  [320, 568, UA_IPHONE, '320x568'],
  [740, 400, UA_ANDROID, '740x400-short'],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: ua });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
  await page.click('[aria-controls="mobile-nav"]');
  await page.waitForTimeout(800);
  const geo = await page.evaluate(() => {
    const sheet = document.querySelector('#mobile-nav');
    const nav = sheet.querySelector('[data-sheet-scroll]');
    const cta = sheet.querySelector('a[href="/contact"]');
    const links = [...sheet.querySelectorAll('nav a')];
    const sr = sheet.getBoundingClientRect();
    const cr = cta.getBoundingClientRect();
    return {
      sheetH: Math.round(sr.height),
      limitH: Math.round(window.innerHeight * 0.9),
      linksVisible: links.filter((l) => { const r = l.getBoundingClientRect(); return r.top >= sr.top && r.bottom <= sr.bottom + 1; }).length,
      ctaVisible: cr.top >= sr.top && cr.bottom <= window.innerHeight + 1,
      navScrollable: nav.scrollHeight > nav.clientHeight,
    };
  });
  results.push([`sheet @${tag}`, `${geo.linksVisible}/5 links visible (scrollable: ${geo.navScrollable}) · CTA visible: ${geo.ctaVisible} · height ${geo.sheetH}/${geo.limitH}`]);
  await page.screenshot({ path: `${OUT}m2-sheet-${tag}.png` });

  await page.evaluate(() => { document.querySelector('#mobile-nav [data-sheet-scroll]').scrollTop = 100; });
  const listKept = await page.evaluate(() => {
    const el = document.querySelector('#mobile-nav');
    const list = el.querySelector('[data-sheet-scroll]');
    const opts = (y) => ({ bubbles: true, cancelable: true, clientX: 200, clientY: y, pointerType: 'touch', pointerId: 1, isPrimary: true });
    list.dispatchEvent(new PointerEvent('pointerdown', opts(200)));
    list.dispatchEvent(new PointerEvent('pointermove', opts(320)));
    list.dispatchEvent(new PointerEvent('pointerup', opts(320)));
    return { transform: el.style.transform, scrollTop: list.scrollTop };
  });
  results.push([`list scrolls, no hijack @${tag}`, `transform: "${listKept.transform}" · scrollTop: ${listKept.scrollTop}`]);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  const back = await page.evaluate(() => document.activeElement?.getAttribute('aria-controls') === 'mobile-nav');
  results.push([`focus returns to menu button @${tag}`, String(back)]);
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 667 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA_IPHONE });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  results.push(['skip link first tab stop', `"${first}"`]);
  await ctx.close();
}

for (const [w, h, tag] of [[320, 568, '320'], [360, 800, '360'], [430, 932, '430']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA_ANDROID, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  let clean = true;
  for (const path of ['/', '/about', '/events', '/stories', '/contact']) {
    await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    if (await page.evaluate(() => document.scrollingElement.scrollWidth > window.innerWidth + 1)) { results.push(['✗ OVERFLOW', `${path} @${tag}`]); clean = false; }
  }
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.click('[aria-controls="mobile-nav"]');
  await page.waitForTimeout(700);
  if (await page.evaluate(() => document.scrollingElement.scrollWidth > window.innerWidth + 1)) { results.push(['✗ OVERFLOW sheet open', `@${tag}`]); clean = false; }
  results.push([`overflow clean @${tag}`, clean ? 'all 5 routes + sheet open' : 'FAILURES above']);
  await ctx.close();
}

for (const [w, h, tag] of [[375, 667, '375'], [430, 932, '430']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA_IPHONE });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/__kit#stickybar', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}m3-stickybar-${tag}.png` });
  await ctx.close();
}
results.push(['m3 renders', '375 + 430 captured']);

await browser.close();
console.log('\n== M2/M3 verification ==');
results.forEach(([k, v]) => console.log(`✓ ${k}: ${v}`));
