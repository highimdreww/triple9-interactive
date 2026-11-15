import { readFileSync, readdirSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const data = JSON.parse(readFileSync('src/content/titles.json', 'utf8'));
const site = JSON.parse(readFileSync('src/content/site.json', 'utf8'));
const ids = data.titles.map(title => title.id);
assert.equal(new Set(ids).size, ids.length, 'Title IDs must be unique');
assert(ids.includes(data.featuredTitleId), 'Featured title must exist');
assert(new Set(data.spotlightIds).size === data.spotlightIds.length, 'Duplicate spotlight');
for (const id of data.spotlightIds) assert(ids.includes(id), `Unknown spotlight: ${id}`);
for (const title of data.titles) {
  assert(title.publicTitle && title.line && title.platforms.length, `Incomplete title: ${title.id}`);
  assert(['game', 'app'].includes(title.kind), 'Unknown title kind');
  if (title.pagePath) assert(existsSync(`src/pages/${title.pagePath.replace(/\/$/, '')}.astro`) || existsSync(`src/pages/${title.pagePath}index.astro`), `Missing title page: ${title.pagePath}`);
  for (const [slot, spec] of Object.entries(data.artSpecs)) {
    const art = title.art[slot];
    assert(art, `Missing slot ${slot} for ${title.id}`);
    const safe = spec.safeArea;
    assert(safe.x >= 0 && safe.y >= 0 && safe.x + safe.width <= spec.width && safe.y + safe.height <= spec.height, `Invalid safe area: ${slot}`);
    if (art.src) {
      assert(!art.src.startsWith('/') && !art.src.includes('..'), 'Use public-relative art paths');
      assert(existsSync(`public/${art.src}`), `Missing art: ${art.src}`);
      assert(art.alt.trim(), `Write alt text for ${art.src}`);
    }
  }
}
for (const url of [site.newsletter.action, site.newsletter.privacyUrl, site.supportUrl, site.legalUrl, ...site.socials.map(social => social.url)].filter(Boolean)) {
  assert(new URL(url).protocol === 'https:', 'External configuration URLs must use HTTPS');
}
assert(Boolean(site.newsletter.action) === Boolean(site.newsletter.privacyUrl), 'Newsletter needs both a provider action and privacy URL');

function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? files(`${dir}/${item.name}`) : [`${dir}/${item.name}`]);
}
const targets = [...files('src'), ...files('scripts'), 'astro.config.mjs', 'tailwind.config.mjs'];
const banned = /\u2014|[\u2190-\u21ff\u27f0-\u27ff]|linear-gradient|radial-gradient|conic-gradient|<marquee|\b(?:ChatGPT|Muse)\b|\bAI[ -](?:powered|generated)\b/i;
for (const file of targets) {
  if (file.startsWith('scripts/')) continue;
  assert(!banned.test(readFileSync(file, 'utf8')), `Banned content in ${file}`);
}
console.log(`Content valid: ${ids.length} titles. Banned source scan passed.`);
