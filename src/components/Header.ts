import { navigateTo } from '../router';

export function renderHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-inner">
      <a href="#home" class="logo" data-nav="home">THE FIFTH STONE</a>
      <button class="mobile-menu-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav">
        <a href="#home" data-nav="home">HOME</a>
        <a href="#story" data-nav="story">THE LEGEND</a>
        <a href="#product" data-nav="product">COLLECTION</a>
      </nav>
    </div>
  `;

  const toggle = header.querySelector('.mobile-menu-toggle')!;
  const nav = header.querySelector('.main-nav')!;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  header.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      nav.classList.remove('open');
      const page = (link as HTMLElement).dataset.nav as 'home' | 'story' | 'product';
      navigateTo(page);
    });
  });

  return header;
}
