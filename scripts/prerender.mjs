import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://fifth-stone.cn';
const BRAND_NAME = 'The Fifth Stone';
const DEFAULT_IMAGE = '/hero-carousel/hero-1.webp';
const DEFAULT_IMAGE_ALT = 'The Fifth Stone symbolic crystal necklace collection';
const LASTMOD = '2026-05-17';

export const routeDefinitions = [
  {
    path: '/',
    title: 'The Fifth Stone | Myth-Inspired Crystal Necklaces',
    description:
      'Shop The Fifth Stone myth-inspired crystal necklaces in five symbolic colors. Choose any two stones for the May pair offer and receive free shipping from China.',
    image: DEFAULT_IMAGE,
    imageAlt: 'The Fifth Stone symbolic necklace worn in warm light',
    heading: 'The Fifth Stone',
    intro:
      'A necklace born from the Eastern myth of mending the sky, made for those seeking repair, protection, and rebirth.',
    body: [
      'The Fifth Stone creates symbolic crystal necklaces inspired by Nuwa mending the sky with five-colored stones.',
      'Choose from red, green, gold, white, and black stones, each carrying a distinct emotional meaning.',
    ],
    links: [
      { href: '/story', label: 'Read the full legend' },
      { href: '/collection', label: 'Explore the collection' },
    ],
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/story',
    title: 'The Legend | The Fifth Stone',
    description:
      'Discover the Eastern myth behind The Fifth Stone, a symbolic jewelry story of repair, protection, and rebirth.',
    image: '/home-story-carousel/story-teaser-1.webp',
    imageAlt: 'The Fifth Stone myth-inspired story scene in a sunlit stone hall',
    heading: 'The Story of the Fifth Stone',
    intro:
      'The sky was once broken. A goddess mended it with five sacred stones. This is the myth behind The Fifth Stone.',
    body: [
      'In the old story, Nuwa repaired the broken sky with five-colored stones and restored balance to the world.',
      'The Fifth Stone imagines the final stone as a quiet companion for anyone rebuilding after change, grief, uncertainty, or a season that asked too much.',
      'Every myth-inspired necklace carries a different emotional language, from courage and renewal to protection, warmth, and inner strength.',
    ],
    links: [
      { href: '/collection', label: 'Choose your stone' },
      { href: '/faq', label: 'Read common questions' },
    ],
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/collection',
    title: 'The Fifth Stone Collection | Symbolic Crystal Necklaces',
    description:
      'Explore The Fifth Stone symbolic crystal necklaces in red, green, gold, white, and black, each inspired by the myth of mending the sky.',
    image: '/product-images/gold-worn.webp',
    imageAlt: 'Gold Fifth Stone necklace worn as symbolic crystal jewelry',
    heading: 'The Fifth Stone Collection',
    intro:
      'Five symbolic necklaces, five ways to carry the story of mending, protection, repair, and rebirth.',
    body: [
      'The collection includes red stone, green stone, gold stone, white stone, and black stone necklaces.',
      'Each piece is designed as wearable symbolic jewelry rooted in Eastern mythology and personal meaning.',
      'The May pair offer lets you choose any two stones for a special bundle price.',
    ],
    links: [
      { href: '/story', label: 'Learn the myth' },
      { href: '/contact', label: 'Contact support' },
    ],
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/contact',
    title: 'Contact Us | The Fifth Stone',
    description:
      'Contact The Fifth Stone for order support, shipping questions, returns, collaborations, or general inquiries.',
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    heading: 'Contact Us',
    intro:
      'For order support, shipping questions, returns, collaborations, or general inquiries, contact The Fifth Stone.',
    body: [
      'Email support is available at s2898656752@gmail.com.',
      'Please include your order number when contacting us about an existing order.',
    ],
    links: [
      { href: '/policies/shipping-policy', label: 'Shipping policy' },
      { href: '/policies/refund-policy', label: 'Return and refund policy' },
    ],
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/policies/shipping-policy',
    title: 'Shipping Policy | The Fifth Stone',
    description:
      'Learn about The Fifth Stone order processing, shipping estimates, tracking, customs, and delivery information.',
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    heading: 'Shipping Policy',
    intro:
      'At The Fifth Stone, every piece is prepared with care before it begins its journey to you.',
    body: [
      'Orders are usually processed within 2-5 business days after payment confirmation.',
      'Orders are shipped from China, and estimated delivery times vary by destination, carrier, customs process, and local delivery conditions.',
      'International orders may be subject to customs duties, import taxes, VAT, or other local fees.',
    ],
    links: [
      { href: '/contact', label: 'Contact support' },
      { href: '/policies/refund-policy', label: 'Return and refund policy' },
    ],
    changefreq: 'monthly',
    priority: '0.6',
  },
  {
    path: '/policies/refund-policy',
    title: 'Return & Refund Policy | The Fifth Stone',
    description: 'Read The Fifth Stone return, refund, exchange, and damaged item policy.',
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    heading: 'Return & Refund Policy',
    intro:
      'We want you to feel confident when purchasing from The Fifth Stone. Please review our return and refund policy before placing your order.',
    body: [
      'Eligible no-reason return or exchange requests are accepted within 14 days after delivery.',
      'Returned items must be unused, unworn, undamaged, and sent back in the original packaging with all included materials.',
      'Customers are responsible for return shipping costs for no-reason returns or exchanges.',
    ],
    links: [
      { href: '/contact', label: 'Contact support' },
      { href: '/policies/shipping-policy', label: 'Shipping policy' },
    ],
    changefreq: 'monthly',
    priority: '0.6',
  },
  {
    path: '/policies/privacy-policy',
    title: 'Privacy Policy | The Fifth Stone',
    description:
      'Learn how The Fifth Stone collects, uses, protects, and manages customer information.',
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    heading: 'Privacy Policy',
    intro:
      'This Privacy Policy explains how The Fifth Stone collects, uses, protects, and manages customer information.',
    body: [
      'We may collect information needed to process orders, provide support, improve the site, and communicate with customers.',
      'Customer information is handled with care and used only for legitimate store, service, and legal purposes.',
    ],
    links: [
      { href: '/contact', label: 'Contact support' },
      { href: '/policies/terms-of-service', label: 'Terms of service' },
    ],
    changefreq: 'monthly',
    priority: '0.5',
  },
  {
    path: '/policies/terms-of-service',
    title: 'Terms of Service | The Fifth Stone',
    description:
      'Review The Fifth Stone terms of service, including purchases, product information, site use, and customer responsibilities.',
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    heading: 'Terms of Service',
    intro:
      'These Terms of Service govern your use of The Fifth Stone website and purchases from our store.',
    body: [
      'By using this website or placing an order, you agree to the terms, policies, and customer responsibilities described by The Fifth Stone.',
      'Product descriptions, pricing, availability, shipping details, and promotional offers may be updated from time to time.',
    ],
    links: [
      { href: '/contact', label: 'Contact support' },
      { href: '/policies/privacy-policy', label: 'Privacy policy' },
    ],
    changefreq: 'monthly',
    priority: '0.5',
  },
  {
    path: '/faq',
    title: 'FAQ | The Fifth Stone',
    description:
      'Find answers to common questions about The Fifth Stone necklaces, mythology, shipping, returns, and symbolic meanings.',
    image: DEFAULT_IMAGE,
    imageAlt: DEFAULT_IMAGE_ALT,
    heading: 'Frequently Asked Questions',
    intro:
      'Find answers to common questions about The Fifth Stone necklaces, mythology, shipping, returns, and symbolic meanings.',
    body: [
      'The Fifth Stone is a jewelry brand inspired by the Eastern myth of mending the sky.',
      'The necklaces are symbolic jewelry pieces, not medical, spiritual, or therapeutic claims.',
      'Each necklace comes in gift-ready packaging with a brand story card.',
    ],
    links: [
      { href: '/story', label: 'Read the legend' },
      { href: '/collection', label: 'Explore the collection' },
    ],
    changefreq: 'monthly',
    priority: '0.7',
  },
];

function absoluteUrl(routePath) {
  return routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
}

function absoluteAssetUrl(assetPath) {
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    return assetPath;
  }

  return `${SITE_URL}${assetPath.startsWith('/') ? assetPath : `/${assetPath}`}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function upsertHeadTag(html, matcher, tag) {
  if (matcher.test(html)) {
    return html.replace(matcher, tag);
  }

  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function setTitle(html, title) {
  return upsertHeadTag(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`,
  );
}

function setMeta(html, attribute, key, content) {
  const matcher = new RegExp(`<meta\\s+${attribute}="${escapeRegExp(key)}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
  return upsertHeadTag(
    html,
    matcher,
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
  );
}

function setCanonical(html, canonicalUrl) {
  return upsertHeadTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
  );
}

function renderFallbackPage(route) {
  const body = route.body
    .map(paragraph => `        <p>${escapeHtml(paragraph)}</p>`)
    .join('\n');
  const links = route.links
    .map(link => `          <li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`)
    .join('\n');

  return `
      <main class="seo-fallback" data-prerender-route="${escapeHtml(route.path)}">
        <h1>${escapeHtml(route.heading)}</h1>
        <p>${escapeHtml(route.intro)}</p>
${body}
        <nav aria-label="Related pages">
          <ul>
${links}
          </ul>
        </nav>
      </main>
    `;
}

function jsonLdForRoute(route) {
  const pageUrl = absoluteUrl(route.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: BRAND_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/brand-logo-mark.webp`,
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: route.title,
        description: route.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
      },
    ],
  };
}

export function injectRouteHtml(baseHtml, route) {
  const canonicalUrl = absoluteUrl(route.path);
  const imageUrl = absoluteAssetUrl(route.image ?? DEFAULT_IMAGE);
  const imageAlt = route.imageAlt ?? DEFAULT_IMAGE_ALT;
  let html = baseHtml;

  html = setTitle(html, route.title);
  html = setMeta(html, 'name', 'description', route.description);
  html = setMeta(html, 'name', 'robots', 'index, follow');
  html = setCanonical(html, canonicalUrl);
  html = setMeta(html, 'property', 'og:type', route.path === '/' ? 'website' : 'article');
  html = setMeta(html, 'property', 'og:site_name', BRAND_NAME);
  html = setMeta(html, 'property', 'og:title', route.title);
  html = setMeta(html, 'property', 'og:description', route.description);
  html = setMeta(html, 'property', 'og:url', canonicalUrl);
  html = setMeta(html, 'property', 'og:image', imageUrl);
  html = setMeta(html, 'property', 'og:image:alt', imageAlt);
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', route.title);
  html = setMeta(html, 'name', 'twitter:description', route.description);
  html = setMeta(html, 'name', 'twitter:image', imageUrl);
  html = setMeta(html, 'name', 'twitter:image:alt', imageAlt);

  const jsonLd = `<script type="application/ld+json" data-prerender-jsonld>${JSON.stringify(jsonLdForRoute(route))}</script>`;
  html = upsertHeadTag(html, /<script\s+type="application\/ld\+json"\s+data-prerender-jsonld>[\s\S]*?<\/script>/i, jsonLd);

  return html.replace(
    /<div id="app"><\/div>/i,
    `<div id="app">${renderFallbackPage(route)}</div>`,
  );
}

export function routeOutputPath(distDir, routePath) {
  if (routePath === '/') {
    return path.posix.join(distDir, 'index.html');
  }

  return path.posix.join(distDir, routePath.replace(/^\/+/, ''), 'index.html');
}

export function sitemapXml(routes = routeDefinitions) {
  const urls = routes
    .map(route => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function writeRouteFiles(distDir) {
  const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');

  await Promise.all(routeDefinitions.map(async (route) => {
    const outputPath = routeOutputPath(distDir, route.path);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, injectRouteHtml(baseHtml, route), 'utf8');
  }));

  await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml(), 'utf8');
}

async function main() {
  const scriptPath = fileURLToPath(import.meta.url);
  const projectRoot = path.resolve(path.dirname(scriptPath), '..');
  const distDir = path.join(projectRoot, 'dist');
  await writeRouteFiles(distDir);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
