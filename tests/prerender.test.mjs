import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  injectRouteHtml,
  routeDefinitions,
  routeOutputPath,
} from '../scripts/prerender.mjs';

const baseHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>The Fifth Stone | Myth-Inspired Crystal Necklaces</title>
    <meta name="description" content="Home description" />
    <link rel="canonical" href="https://fifth-stone.cn/" />
    <meta property="og:title" content="Home title" />
    <meta property="og:description" content="Home OG description" />
    <meta property="og:url" content="https://fifth-stone.cn/" />
    <meta property="og:image" content="https://fifth-stone.cn/hero-carousel/hero-1.webp" />
    <meta property="og:image:alt" content="Home image" />
    <meta name="twitter:title" content="Home title" />
    <meta name="twitter:description" content="Home Twitter description" />
    <meta name="twitter:image" content="https://fifth-stone.cn/hero-carousel/hero-1.webp" />
    <meta name="twitter:image:alt" content="Home image" />
    <script type="module" crossorigin src="/assets/index-test.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>`;

test('defines static entries for every indexable sitemap page', () => {
  assert.deepEqual(
    routeDefinitions.map(route => route.path),
    [
      '/',
      '/story',
      '/collection',
      '/contact',
      '/policies/shipping-policy',
      '/policies/refund-policy',
      '/policies/privacy-policy',
      '/policies/terms-of-service',
      '/faq',
    ],
  );
});

test('injects route-specific metadata and fallback content', () => {
  const story = routeDefinitions.find(route => route.path === '/story');
  assert.ok(story);

  const html = injectRouteHtml(baseHtml, story);

  assert.match(html, /<title>The Legend \| The Fifth Stone<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/fifth-stone\.cn\/story" \/>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/fifth-stone\.cn\/story" \/>/);
  assert.match(html, /<h1>The Story of the Fifth Stone<\/h1>/);
  assert.match(html, /Nuwa repaired the broken sky/);
  assert.doesNotMatch(html, /<link rel="canonical" href="https:\/\/fifth-stone\.cn\/" \/>/);
});

test('maps clean routes to nested index.html files', () => {
  assert.equal(routeOutputPath('dist', '/'), 'dist/index.html');
  assert.equal(routeOutputPath('dist', '/story'), 'dist/story/index.html');
  assert.equal(
    routeOutputPath('dist', '/policies/privacy-policy'),
    'dist/policies/privacy-policy/index.html',
  );
});

test('vercel rewrites serve prerendered pages before the SPA fallback', () => {
  const vercelConfig = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  const rewrites = vercelConfig.rewrites;
  const fallbackIndex = rewrites.findIndex(rewrite => rewrite.source === '/(.*)');

  assert.ok(fallbackIndex > 0);

  for (const route of routeDefinitions.filter(item => item.path !== '/')) {
    const destination = `/${route.path.replace(/^\/+/, '')}/index.html`;
    const routeIndex = rewrites.findIndex(rewrite => (
      rewrite.source === route.path && rewrite.destination === destination
    ));

    assert.ok(routeIndex >= 0, `Missing rewrite for ${route.path}`);
    assert.ok(routeIndex < fallbackIndex, `${route.path} rewrite must come before the SPA fallback`);
  }
});
