#!/usr/bin/env node
/**
 * Measures WCAG contrast for every text/background token pair the kit uses.
 * Prints a markdown table for the gate report.
 */
const T = {
  cream: '#FFFBF6', 'cream-soft': '#FAF4EB', 'cream-subtle': '#F5EEE4', surface: '#FFFFFF',
  ink: '#181411', 'ink-card': '#221B16', 'ink-soft': '#52463D', 'ink-faint': '#6E6257', 'ink-muted': '#8A7D71',
  ember: '#E85D1A', 'ember-deep': '#C4460E', 'ember-dark': '#8F3006', 'ember-light': '#FF783A',
  'ember-soft': '#FFF2EB', amber: '#F2C9A5', 'amber-soft': '#FDF3EA',
  white: '#FFFFFF', error: '#DC2626', success: '#15803D', warning: '#D97706',
};

function srgbToLin(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}
function luminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}
function blend(fgHex, bgHex, alpha) {
  const c = [1, 3, 5].map((i) =>
    Math.round(parseInt(fgHex.slice(i, i + 2), 16) * alpha + parseInt(bgHex.slice(i, i + 2), 16) * (1 - alpha))
  );
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
function ratio(fg, bg) {
  const l1 = luminance(fg), l2 = luminance(bg);
  return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
}

const PAIRS = [
  ['Body text', 'ink', 'cream', '4.5:1'], ['Body on card', 'ink', 'surface', '4.5:1'],
  ['Secondary text', 'ink-soft', 'cream', '4.5:1'], ['Secondary on card', 'ink-soft', 'surface', '4.5:1'],
  ['Secondary on tonal band', 'ink-soft', 'cream-soft', '4.5:1'],
  ['Meta text', 'ink-faint', 'cream', '4.5:1'], ['Meta on card', 'ink-faint', 'surface', '4.5:1'],
  ['ink-muted (placeholders only)', 'ink-muted', 'cream', '4.5:1 ⚠'],
  ['Accent large text (≥24px)', 'ember', 'cream', '3:1 (large)'],
  ['Accent safe / eyebrow', 'ember-deep', 'cream', '4.5:1'], ['Eyebrow on pill', 'ember-deep', 'amber-soft', '4.5:1'],
  ['Badge soft', 'ember-deep', 'ember-soft', '4.5:1'],
  ['Button cand. 1 (REC)', 'white', 'ember-deep', '4.5:1'], ['Button cand. 1 hover', 'white', 'ember-dark', '4.5:1'],
  ['Button cand. 2', 'ink', 'ember', '4.5:1'], ['Button cand. 2 hover', 'ink', 'ember-light', '4.5:1'],
  ["Today's primary (why we change)", 'white', 'ember', '4.5:1 ✗'],
  ['Footer body (70% white)', 'white@0.70', 'ink', '4.5:1'], ['Footer dim (50% white)', 'white@0.50', 'ink', '4.5:1 ⚠'],
  ['Footer accent', 'ember-light', 'ink', '4.5:1'], ['Footer amber', 'amber', 'ink', '4.5:1'],
  ['Badge ink / inverse card', 'cream', 'ink', '4.5:1'],
  ['Error text', 'error', 'cream', '4.5:1'], ['Error on white', 'error', 'surface', '4.5:1'],
  ['Success text', 'success', 'cream', '4.5:1'], ['Warning text', 'warning', 'cream', '4.5:1'],
];

console.log('| Pair | Foreground | Background | Ratio | Needs |');
console.log('|---|---|---|---|---|');
for (const [label, fg, bg, need] of PAIRS) {
  const m = fg.match(/^(\w+)@([\d.]+)$/);
  const fgHex = m ? blend(T[m[1]], T[bg], Number(m[2])) : T[fg];
  console.log(`| ${label} | ${fg} | ${bg} | **${ratio(fgHex, T[bg])}:1** | ${need} |`);
}
