import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const html = readFileSync('dist/index.html', 'utf8');
const base = '/triple9-interactive/';
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Homepage must have one h1');
assert(html.includes(`https://highimdreww.github.io${base}`), 'Incorrect canonical');
assert(!/[\u2014\u2190-\u21ff\u27f0-\u27ff]/u.test(html), 'Banned glyph in built page');
assert(!/\b(?:ChatGPT|Muse)\b|\bAI[ -](?:powered|generated)\b/i.test(html), 'Banned credit');
assert(!/\b00[1-9]\b/.test(html), 'Editorial numbering');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const [, attr, url] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
  if (url.startsWith('#')) assert(ids.has(url.slice(1)), `Broken anchor: ${url}`);
  if (url.startsWith('/') && !url.startsWith('//')) {
    assert(url.startsWith(base), `Missing project base: ${url}`);
    const path = url.slice(base.length);
    assert(existsSync(`dist/${path || 'index.html'}`), `Missing ${attr} asset: ${path}`);
  }
}
assert(!html.includes('"workingTitle"'), 'Internal data leaked');
console.log('Built page passed: canonical, base paths, local assets, anchors, h1, banned glyphs and credits.');
