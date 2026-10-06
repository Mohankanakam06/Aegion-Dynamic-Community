#!/usr/bin/env node
/**
 * Light-only guard (UPGRADE_RULES.md rule 1).
 * Fails the build if src/ or index.html contains dark-mode machinery:
 * `dark:` utility classes, `.dark` selectors, prefers-color-scheme,
 * data-theme attributes, or `color-scheme: dark`.
 * Patterns are tuned so legit names (--ember-dark, prefers-reduced-motion) pass.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

const PATTERNS = [
  { name: 'dark: utility class', re: /(?<![\w-])dark:/ },
  { name: '.dark selector', re: /\.dark(?![\w-])/ },
  { name: 'prefers-color-scheme', re: /prefers-color-scheme/ },
  { name: 'data-theme attribute', re: /data-theme/ },
  { name: 'color-scheme: dark', re: /color-scheme:\s*dark/ },
];

const SCAN_EXT = new Set(['.ts', '.tsx', '.css', '.html', '.js', '.jsx', '.mjs']);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (SCAN_EXT.has(entry.slice(entry.lastIndexOf('.')))) yield full;
  }
}

const files = [...walk(join(ROOT, 'src')), join(ROOT, 'index.html')];
let failures = 0;

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const { name, re } of PATTERNS) {
      if (re.test(line)) {
        console.error(`✗ ${name} — ${relative(ROOT, file)}:${i + 1}: ${line.trim()}`);
        failures++;
      }
    }
  });
}

if (failures > 0) {
  console.error(`\nLight-only guard failed: ${failures} violation(s). This project is LIGHT THEME ONLY.`);
  process.exit(1);
}
console.log('✓ Light-only guard passed (no dark-mode machinery in src/ or index.html).');
