import type { PageComponent, PageName } from './types';

const routes: Record<PageName, () => Promise<PageComponent>> = {
  home: () => import('./pages/home').then(m => m.default),
  story: () => import('./pages/story').then(m => m.default),
  product: () => import('./pages/product').then(m => m.default),
};

let currentPage: PageComponent | null = null;
let currentAnchor: string | null = null;

function getPageFromHash(): PageName {
  const hash = location.hash.replace('#', '') || 'home';
  if (hash in routes) return hash as PageName;
  return 'home';
}

export async function navigateTo(page: PageName, anchor?: string) {
  if (anchor) {
    history.pushState(null, '', `#${page}`);
    currentAnchor = anchor;
  } else {
    location.hash = `#${page}`;
    return;
  }
  await renderPage(page);
}

export async function handleRouteChange() {
  const page = getPageFromHash();
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
    const module = await routes[page]();
    currentPage = module;
    const content = module.render();
    contentArea.innerHTML = '';
    contentArea.appendChild(content);

    // Remove stale footer if exists, it'll be re-added
    const oldFooter = document.querySelector('.site-footer');
    if (oldFooter) oldFooter.remove();

    document.dispatchEvent(new CustomEvent('page-rendered', { detail: { page } }));

    if (currentAnchor) {
      setTimeout(() => {
        const el = document.getElementById(currentAnchor!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        currentAnchor = null;
      }, 100);
    }
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
