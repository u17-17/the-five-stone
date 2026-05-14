import { navigateTo } from '../router';
import { getCart } from '../cart';

export function renderHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-inner">
      <a href="#home" class="logo" data-nav="home">
        <span class="logo-mark" aria-hidden="true">
          <img src="/brand-logo-mark.webp" alt="" width="555" height="540" decoding="async">
        </span>
        <span>THE FIFTH STONE</span>
      </a>
      <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav" aria-label="Primary navigation">
        <a href="#collection" data-home-section="collection">COLLECTION</a>
        <a href="#story" data-home-section="story">ABOUT</a>
        <a href="#story" data-nav="story">THE LEGEND</a>
        <a href="#contact" data-home-section="contact">CONTACT</a>
      </nav>
      <button class="header-cart-btn" id="cart-toggle-btn" aria-label="Open cart">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span class="cart-badge" id="cart-badge" style="display:none;">0</span>
      </button>
    </div>
  `;

  const toggle = header.querySelector('.mobile-menu-toggle')!;
  const nav = header.querySelector('.main-nav')!;
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* ---- Cart badge ---- */
  function updateBadge(): void {
    const items = getCart();
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const badge = header.querySelector('#cart-badge') as HTMLElement | null;
    if (!badge) return;
    if (count > 0) {
      badge.textContent = String(count);
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }

  updateBadge();
  window.addEventListener('cart-updated', updateBadge);

  header.querySelector('#cart-toggle-btn')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('toggle-cart'));
  });

  header.querySelectorAll('[data-home-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');

      const section = (link as HTMLElement).dataset.homeSection;
      if (!section) return;

      if (location.hash.startsWith('#home')) {
        document
          .getElementById(section)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      navigateTo('home', { section });
    });
  });

  header.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const page = (link as HTMLElement).dataset.nav as 'home' | 'story' | 'product';
      navigateTo(page);
    });
  });

  return header;
}
