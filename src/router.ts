import type { PageComponent, PageName, PageSeo } from './types';
import { trackPageView } from './lib/analytics';
import { PRODUCT_PRICE, SUPPORT_EMAIL } from './siteConfig';

type PageParams = Record<string, string>;

const SITE_URL = 'https://fifth-stone.cn';
const BRAND_NAME = 'The Fifth Stone';
const DEFAULT_SEO_IMAGE = '/hero-carousel/hero-1.webp';
const DEFAULT_SEO_IMAGE_ALT = 'The Fifth Stone myth-inspired crystal necklace collection';

const routes: Record<PageName, () => Promise<PageComponent>> = {
  home: () => import('./pages/home').then(m => m.default),
  story: () => import('./pages/story').then(m => m.default),
  collection: () => import('./pages/product').then(m => m.default),
  product: () => import('./pages/product').then(m => m.default),
  'shipping-policy': () => import('./pages/shippingPolicy').then(m => m.default),
  'return-refund-policy': () => import('./pages/returnRefundPolicy').then(m => m.default),
  'privacy-policy': () => import('./pages/privacyPolicy').then(m => m.default),
  'terms-of-service': () => import('./pages/termsOfService').then(m => m.default),
  contact: () => import('./pages/contact').then(m => m.default),
  faq: () => import('./pages/faq').then(m => m.default),
};

let currentPage: PageComponent | null = null;

const DEFAULT_SEO: PageSeo = {
  title: 'The Fifth Stone | Myth-Inspired Crystal Necklaces',
  description:
    'Shop myth-inspired crystal necklaces and symbolic jewelry from The Fifth Stone, created around Eastern mythology, protection, repair, and rebirth.',
  image: DEFAULT_SEO_IMAGE,
  imageAlt: DEFAULT_SEO_IMAGE_ALT,
};

const pageSeo: Partial<Record<PageName, PageSeo>> = {
  home: DEFAULT_SEO,
  story: {
    title: 'The Legend | The Fifth Stone',
    description:
      'Discover the Eastern myth behind The Fifth Stone, a symbolic jewelry story of repair, protection, and rebirth.',
    image: '/home-story-carousel/story-teaser-1.webp',
    imageAlt: 'The Fifth Stone myth-inspired story scene in a sunlit stone hall',
  },
  product: {
    title: 'The Fifth Stone Collection | Symbolic Crystal Necklaces',
    description:
      'Explore The Fifth Stone symbolic crystal necklaces in red, green, gold, white, and black, each inspired by the myth of mending the sky.',
    image: '/product-images/gold-worn.webp',
    imageAlt: 'Gold Fifth Stone necklace worn as symbolic crystal jewelry',
  },
  collection: {
    title: 'The Fifth Stone Collection | Symbolic Crystal Necklaces',
    description:
      'Explore The Fifth Stone symbolic crystal necklaces in red, green, gold, white, and black, each inspired by the myth of mending the sky.',
    image: '/product-images/gold-worn.webp',
    imageAlt: 'Gold Fifth Stone necklace worn as symbolic crystal jewelry',
  },
};

const collectionItems = [
  {
    name: 'Red Stone Necklace',
    color: 'Red',
    url: '/collection?color=red',
    image: '/product-images/red-main.webp',
  },
  {
    name: 'Green Stone Necklace',
    color: 'Green',
    url: '/collection?color=green',
    image: '/product-images/green-main.webp',
  },
  {
    name: 'Gold Stone Necklace',
    color: 'Gold',
    url: '/collection?color=gold',
    image: '/product-images/gold-main.webp',
  },
  {
    name: 'White Stone Necklace',
    color: 'White',
    url: '/collection?color=white',
    image: '/product-images/white-main.webp',
  },
  {
    name: 'Black Stone Necklace',
    color: 'Black',
    url: '/collection?color=black',
    image: '/product-images/black-main.webp',
  },
];

const pathRoutes: Record<string, PageName> = {
  '/story': 'story',
  '/collection': 'collection',
  '/product': 'collection',
  '/shipping': 'shipping-policy',
  '/returns': 'return-refund-policy',
  '/privacy': 'privacy-policy',
  '/terms': 'terms-of-service',
  '/policies/shipping-policy': 'shipping-policy',
  '/policies/refund-policy': 'return-refund-policy',
  '/policies/privacy-policy': 'privacy-policy',
  '/policies/terms-of-service': 'terms-of-service',
  '/shipping-policy': 'shipping-policy',
  '/return-refund-policy': 'return-refund-policy',
  '/privacy-policy': 'privacy-policy',
  '/terms-of-service': 'terms-of-service',
  '/contact': 'contact',
  '/faq': 'faq',
};

const cleanPathPages = new Set<PageName>([
  'story',
  'collection',
  'shipping-policy',
  'return-refund-policy',
  'privacy-policy',
  'terms-of-service',
  'contact',
  'faq',
]);

const canonicalPaths: Record<PageName, string> = {
  home: '/',
  story: '/story',
  collection: '/collection',
  product: '/collection',
  'shipping-policy': '/policies/shipping-policy',
  'return-refund-policy': '/policies/refund-policy',
  'privacy-policy': '/policies/privacy-policy',
  'terms-of-service': '/policies/terms-of-service',
  contact: '/contact',
  faq: '/faq',
};

const pageLabels: Record<PageName, string> = {
  home: 'Home',
  story: 'Our Story',
  collection: 'Collection',
  product: 'Collection',
  'shipping-policy': 'Shipping',
  'return-refund-policy': 'Returns',
  'privacy-policy': 'Privacy',
  'terms-of-service': 'Terms',
  contact: 'Contact',
  faq: 'FAQ',
};

const faqSchemaItems = [
  {
    question: 'What is The Fifth Stone?',
    answer:
      'The Fifth Stone is a jewelry brand inspired by the Eastern myth of mending the sky. Our pieces are designed around repair, protection, and rebirth as symbolic reminders for people moving through change.',
  },
  {
    question: 'Is the necklace based on a real myth?',
    answer:
      'Yes. The concept is inspired by the myth of Nuwa mending the sky with five-colored stones. The Fifth Stone imagines the final stone as something left for those seeking their own form of repair and protection.',
  },
  {
    question: 'Does the necklace have healing powers?',
    answer:
      'No. The Fifth Stone is a symbolic jewelry piece. References to mending, protection, or rebirth are artistic and emotional expressions, not medical, spiritual, or therapeutic claims.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Orders ship from China. Shipping time depends on destination, carrier, customs process, and local delivery conditions. Please review the Shipping Policy for details.',
  },
  {
    question: 'Can I return my order?',
    answer:
      'Eligible no-reason return or exchange requests are accepted within 14 days after delivery. Return shipping is paid by the customer and is currently $10.',
  },
];

/* ---- Cross-page params store ---- */
let pendingParams: PageParams = {};
let currentParams: PageParams = {};

export function getPageParams(): PageParams {
  return { ...currentParams };
}

function readSearchParams(search: string): PageParams {
  const params: PageParams = {};
  const usp = new URLSearchParams(search);
  usp.forEach((v, k) => { params[k] = v; });
  return params;
}

function parseHash(): { page: PageName; params: PageParams } {
  const raw = location.hash.replace('#', '') || 'home';
  const [pagePart, query] = raw.split('?');
  const page = (pagePart in routes ? pagePart : 'home') as PageName;
  const params: PageParams = {};
  if (query) {
    const usp = new URLSearchParams(query);
    usp.forEach((v, k) => { params[k] = v; });
  }
  return { page, params };
}

function parseRoute(): { page: PageName; params: PageParams } {
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';

  if (normalizedPath !== '/' && pathRoutes[normalizedPath]) {
    return {
      page: pathRoutes[normalizedPath],
      params: readSearchParams(location.search),
    };
  }

  return parseHash();
}

function buildUrl(page: PageName, params?: PageParams): string {
  if (page === 'product') {
    page = 'collection';
  }

  const hasParams = params && Object.keys(params).length > 0;

  if (cleanPathPages.has(page)) {
    let url = canonicalPaths[page];
    if (hasParams) {
      url += '?' + new URLSearchParams(params).toString();
    }
    return url;
  }

  let url = `/#${page}`;
  if (hasParams) {
    url += '?' + new URLSearchParams(params).toString();
  }
  return url;
}

function absoluteUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function setCanonical(path: string): void {
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = absoluteUrl(path);
}

function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand-logo-mark.webp`,
    email: SUPPORT_EMAIL,
  };
}

function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BRAND_NAME,
    url: `${SITE_URL}/`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  };
}

function getBreadcrumbSchema(page: PageName, path: string) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE_URL}/`,
    },
  ];

  if (page !== 'home') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: pageLabels[page],
      item: absoluteUrl(path),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function getFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq#faq`,
    mainEntity: faqSchemaItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/collection#the-fifth-stone-necklace`,
    name: 'The Fifth Stone Necklace',
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    image: [
      `${SITE_URL}/product-images/red-main.webp`,
      `${SITE_URL}/product-images/green-main.webp`,
      `${SITE_URL}/product-images/gold-main.webp`,
      `${SITE_URL}/product-images/white-main.webp`,
      `${SITE_URL}/product-images/black-main.webp`,
    ],
    description:
      'A myth-inspired crystal necklace collection from The Fifth Stone, designed as symbolic jewelry rooted in Eastern mythology, protection, repair, and rebirth.',
    material:
      'Certified red Liuli glass, green peridot, golden crystal, white crystal, and black obsidian materials with handmade silver-wrapped copper chain and hot-stamped finish',
    category: 'Jewelry > Necklaces',
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/collection`,
      priceCurrency: 'USD',
      price: `${PRODUCT_PRICE}.00`,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    hasVariant: collectionItems.map(item => ({
      '@type': 'Product',
      name: item.name,
      color: item.color,
      image: absoluteAssetUrl(item.image),
      url: absoluteUrl(item.url),
      brand: {
        '@type': 'Brand',
        name: BRAND_NAME,
      },
      offers: {
        '@type': 'Offer',
        url: absoluteUrl(item.url),
        priceCurrency: 'USD',
        price: `${PRODUCT_PRICE}.00`,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
      },
    })),
  };
}

function getCollectionItemListSchema(page: PageName) {
  const itemListElement = collectionItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: item.name,
      color: item.color,
      image: absoluteAssetUrl(item.image),
      url: absoluteUrl(item.url),
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: `${PRODUCT_PRICE}.00`,
        availability: 'https://schema.org/InStock',
      },
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': page === 'home' ? 'ItemList' : 'CollectionPage',
    '@id': `${SITE_URL}${page === 'home' ? '/#stone-collection' : '/collection#stone-collection'}`,
    name: 'The Fifth Stone symbolic crystal necklace collection',
    itemListElement,
  };
}

function applyStructuredData(page: PageName, canonicalPath: string): void {
  document
    .querySelectorAll<HTMLScriptElement>('script[data-seo-jsonld]')
    .forEach(script => script.remove());

  const schemas: unknown[] = [
    getOrganizationSchema(),
    getWebsiteSchema(),
    getBreadcrumbSchema(page, canonicalPath),
  ];

  if (page === 'faq') schemas.push(getFaqSchema());
  if (page === 'home') schemas.push(getCollectionItemListSchema(page));
  if (page === 'collection' || page === 'product') schemas.push(getProductSchema());
  if (page === 'collection' || page === 'product') schemas.push(getCollectionItemListSchema(page));

  schemas.forEach((schema, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonld = String(index);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

function applySeo(page: PageName, seo?: PageSeo): void {
  const resolvedSeo = seo ?? pageSeo[page] ?? DEFAULT_SEO;
  const canonicalPath = canonicalPaths[page] ?? '/';
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteAssetUrl(resolvedSeo.image ?? DEFAULT_SEO_IMAGE);
  const imageAlt = resolvedSeo.imageAlt ?? DEFAULT_SEO_IMAGE_ALT;
  document.title = resolvedSeo.title;

  let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  description.content = resolvedSeo.description;

  setMetaTag('property', 'og:type', page === 'home' ? 'website' : 'article');
  setMetaTag('property', 'og:site_name', BRAND_NAME);
  setMetaTag('property', 'og:title', resolvedSeo.title);
  setMetaTag('property', 'og:description', resolvedSeo.description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:image', imageUrl);
  setMetaTag('property', 'og:image:alt', imageAlt);
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', resolvedSeo.title);
  setMetaTag('name', 'twitter:description', resolvedSeo.description);
  setMetaTag('name', 'twitter:image', imageUrl);
  setMetaTag('name', 'twitter:image:alt', imageAlt);

  setCanonical(canonicalPath);
  applyStructuredData(page, canonicalPath);
}

function setMetaTag(attribute: 'name' | 'property', key: string, content: string): void {
  let meta = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export async function navigateTo(page: PageName, params?: PageParams) {
  pendingParams = params ?? {};
  const url = buildUrl(page, params);
  const currentUrl = `${location.pathname}${location.search}${location.hash}`;

  if (currentUrl !== url) {
    history.pushState({ page }, '', url);
  }

  await handleRouteChange();
}

export async function handleRouteChange() {
  const { page, params } = parseRoute();
  pendingParams = params;
  await renderPage(page);
}

async function renderPage(page: PageName) {
  if (currentPage?.cleanup) {
    currentPage.cleanup();
  }

  let contentArea = document.getElementById('page-content');
  if (!contentArea) {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = '';
    const header = await import('./components/Header').then(m => m.renderHeader());
    app.appendChild(header);
    contentArea = document.createElement('main');
    contentArea.id = 'page-content';
    app.appendChild(contentArea);
  }

  contentArea.innerHTML = '<div class="route-status route-loading">Loading...</div>';

  try {
    currentParams = { ...pendingParams };
    pendingParams = {};

    const module = await routes[page]();
    currentPage = module;
    applySeo(page, module.seo);
    const content = module.render();
    contentArea.innerHTML = '';
    contentArea.appendChild(content);

    document.dispatchEvent(new CustomEvent('page-rendered', { detail: { page } }));
    trackPageView(canonicalPaths[page] ?? '/');

    // Always scroll to top on page navigation
    window.scrollTo(0, 0);
  } catch (err) {
    console.error('Page load error:', err);
    contentArea.innerHTML = '<div class="route-status route-error"><p>Page failed to load. Please try again.</p></div>';
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  window.addEventListener('popstate', handleRouteChange);
  handleRouteChange();
}
