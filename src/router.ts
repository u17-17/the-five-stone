import type { PageComponent, PageName, PageSeo } from './types';

type PageParams = Record<string, string>;

const routes: Record<PageName, () => Promise<PageComponent>> = {
  home: () => import('./pages/home').then(m => m.default),
  story: () => import('./pages/story').then(m => m.default),
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
  title: 'The Fifth Stone — Wear the Stone That Mends the Sky',
  description:
    'A necklace born from the Eastern myth of mending the sky — made for those seeking repair, protection, and rebirth.',
};

const pageSeo: Partial<Record<PageName, PageSeo>> = {
  home: DEFAULT_SEO,
  story: {
    title: 'The Legend | The Fifth Stone',
    description:
      'Discover the Eastern myth behind The Fifth Stone, a symbolic jewelry story of repair, protection, and rebirth.',
  },
  product: {
    title: 'Collection | The Fifth Stone',
    description:
      'Explore The Fifth Stone symbolic necklaces inspired by the myth of mending the sky.',
  },
};

const pathRoutes: Record<string, PageName> = {
  '/story': 'story',
  '/product': 'product',
  '/shipping-policy': 'shipping-policy',
  '/return-refund-policy': 'return-refund-policy',
  '/privacy-policy': 'privacy-policy',
  '/terms-of-service': 'terms-of-service',
  '/contact': 'contact',
  '/faq': 'faq',
};

const cleanPathPages = new Set<PageName>([
  'shipping-policy',
  'return-refund-policy',
  'privacy-policy',
  'terms-of-service',
  'contact',
  'faq',
]);

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
  const hasParams = params && Object.keys(params).length > 0;

  if (cleanPathPages.has(page)) {
    let url = `/${page}`;
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

function applySeo(page: PageName, seo?: PageSeo): void {
  const resolvedSeo = seo ?? pageSeo[page] ?? DEFAULT_SEO;
  document.title = resolvedSeo.title;

  let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  description.content = resolvedSeo.description;
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

  contentArea.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;color:#b8a07c;">Loading…</div>';

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

    // Always scroll to top on page navigation
    window.scrollTo(0, 0);
  } catch (err) {
    console.error('Page load error:', err);
    contentArea.innerHTML = '<div style="padding:8rem 2rem;text-align:center;color:#999;"><p>Page failed to load. Please try again.</p></div>';
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  window.addEventListener('popstate', handleRouteChange);
  handleRouteChange();
}
