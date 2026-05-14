import type { PageComponent } from '../types';
import { getPageParams, navigateTo } from '../router';

const products = [
  { id: 'red', name: 'Red Stone Necklace', meaning: 'Passion & Life Force', color: '#c0392b', image: '/product-images/red-main.webp' },
  { id: 'blue', name: 'Blue Stone Necklace', meaning: 'Clarity & Inner Peace', color: '#2c6e91', image: '/product-images/blue-main.webp' },
  { id: 'green', name: 'Green Stone Necklace', meaning: 'Healing & Renewal', color: '#4a7c59', image: '/product-images/green-main.webp' },
  { id: 'white', name: 'White Stone Necklace', meaning: 'Protection & Purity', color: '#d4ccc0', image: '/product-images/white-main.webp' },
  { id: 'black', name: 'Black Stone Necklace', meaning: 'Mystery & Inner Strength', color: '#3d3a35', image: '/product-images/black-main.webp' },
];

const concepts = [
  { title: 'Repair', desc: 'For those healing after the storm.', note: 'A quiet vow to return to yourself.' },
  { title: 'Protection', desc: 'A stone worn close to the heart.', note: 'A small shield for the days that ask too much.' },
  { title: 'Rebirth', desc: 'A reminder that broken skies can be mended.', note: 'Proof that your next sky can still open.' },
];

const testimonials = [
  {
    quote: 'The White Stone feels calm and intentional, like carrying a little light under my collarbone.',
    author: 'Mira L.',
    stone: 'White Stone',
  },
  {
    quote: 'I chose Blue during a noisy season. It has become the piece I touch before hard conversations.',
    author: 'Avery C.',
    stone: 'Blue Stone',
  },
  {
    quote: 'The packaging, the story card, the weight of the stone - everything feels quietly sacred.',
    author: 'Noelle R.',
    stone: 'Black Stone',
  },
];

let _observer: IntersectionObserver | null = null;

const HomePage: PageComponent = {
  render() {
    const page = document.createElement('div');
    page.className = 'home-page';

    page.innerHTML = `
      <!-- ===== Screen 1: Hero ===== -->
      <section id="hero" class="home-hero" aria-labelledby="hero-title">
        <div class="hero-content">
          <div class="hero-brand-mark" aria-hidden="true">
            <img src="/brand-logo-mark.webp" alt="" width="555" height="540" decoding="async">
          </div>
          <p class="hero-brand-slogan">THE FIFTH STONE</p>
          <h1 id="hero-title" class="hero-title">Wear the Stone<br>That Mends the Sky.</h1>
          <div class="hero-rule" aria-hidden="true"></div>
          <p class="hero-tagline">Five sacred stones. One ancient promise.</p>
          <p class="hero-desc">Inspired by the legend of Nüwa, crafted for the journey within.</p>
          <div class="hero-actions">
            <button class="btn hero-primary" data-scroll="collection">Shop the Collection</button>
            <button class="btn btn-outline hero-secondary" data-scroll="story">Discover the Origin</button>
          </div>
        </div>
      </section>

      <!-- ===== Screen 2: Story Teaser ===== -->
      <section id="story" class="home-story fade-section" aria-labelledby="story-title">
        <div class="story-atmosphere story-atmosphere-left" aria-hidden="true"></div>
        <div class="story-atmosphere story-atmosphere-right" aria-hidden="true"></div>
        <div class="story-layout">
          <div class="story-copy">
            <p class="story-kicker">THE LEGEND</p>
            <h2 id="story-title" class="story-verse">The sky was once broken.<br>A goddess mended it with five sacred stones.</h2>
            <div class="story-rule" aria-hidden="true"></div>
            <p class="story-body">
              But legend says the final stone was never returned to the heavens.<br>
              It was left behind —<br>
              for those still searching for repair, protection, and rebirth...
            </p>
            <p class="story-signoff">This is the story of The Fifth Stone.</p>
            <button class="story-link" data-action="story">
              <span>Read the Full Myth</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ===== Screen 3: Product Concept ===== -->
      <section class="home-concepts section section-center fade-section">
        <div class="deco-divider"></div>
        <h2 class="section-title">The Meaning Behind the Stone</h2>
        <p class="section-subtitle">More than a necklace — a symbol of what mends us.</p>
        <div class="concepts-grid">
          ${concepts.map(c => `
            <div class="concept-card">
              <div class="concept-icon">✦</div>
              <h3 class="concept-title">${c.title}</h3>
              <p class="concept-desc">${c.desc}</p>
              <p class="concept-note">${c.note}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- ===== Screen 4: Collection Preview ===== -->
      <section id="collection" class="home-collection section section-center fade-section">
        <div class="deco-divider"></div>
        <h2 class="section-title">The Five Sacred Stones</h2>
        <p class="section-subtitle">Each stone carries a color, a meaning, and a story waiting to be worn.</p>
        <div class="collection-grid">
          ${products.map(p => `
            <div class="product-card">
              <div class="product-card-image">
                <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
              </div>
              <h3 class="product-card-name">${p.name}</h3>
              <p class="product-card-meaning">${p.meaning}</p>
              <button class="btn btn-outline product-card-btn" data-product="${p.id}">View Details</button>
            </div>
          `).join('')}
        </div>
        <button class="btn collection-cta" data-action="product">Choose Your Stone</button>
      </section>

      <!-- ===== Screen 5: Testimonials ===== -->
      <section id="reviews" class="home-testimonials section section-center fade-section" aria-labelledby="testimonials-title">
        <div class="deco-divider"></div>
        <h2 id="testimonials-title" class="section-title">Loved by Stone Seekers</h2>
        <p class="section-subtitle">Short notes from those who found a stone that stayed with them.</p>
        <div class="testimonials-grid">
          ${testimonials.map(t => `
            <article class="testimonial-card">
              <p class="testimonial-quote">“${t.quote}”</p>
              <div class="testimonial-meta">
                <span>${t.author}</span>
                <span>${t.stone}</span>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- ===== Screen 6: Email Signup ===== -->
      <section id="contact" class="home-signup section section-center fade-section">
        <div class="signup-card">
          <div class="deco-divider"></div>
          <h2 class="section-title">Join the Circle of the Fifth Stone</h2>
          <p class="section-subtitle">Be the first to receive new stones, stories, and early access.</p>
          <form class="signup-form" novalidate>
            <input type="email" class="signup-input" placeholder="Enter your email" required aria-label="Email address">
            <button type="submit" class="btn signup-btn">Enter the Circle</button>
          </form>
          <p class="signup-note">Join a growing circle of stone seekers.</p>
        </div>
      </section>
    `;

    // --- Scroll-triggered fade-in ---
    _observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    page.querySelectorAll('.fade-section').forEach((el) => {
      _observer!.observe(el);
    });

    // --- Event listeners ---
    page.querySelectorAll('[data-scroll]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = (btn as HTMLElement).dataset.scroll;
        if (target) {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    page.querySelectorAll('[data-action="story"]').forEach(btn => {
      btn.addEventListener('click', () => navigateTo('story'));
    });
    page.querySelectorAll('[data-action="product"]').forEach(btn => {
      btn.addEventListener('click', () => navigateTo('product'));
    });
    page.querySelectorAll('[data-product]').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = (btn as HTMLElement).dataset.product;
        navigateTo('product', color ? { color } : undefined);
      });
    });

    const form = page.querySelector('.signup-form') as HTMLFormElement | null;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.signup-input') as HTMLInputElement;
      if (input.value && input.value.includes('@')) {
        // TODO: Integrate with backend email subscription service
        const btn = form.querySelector('.signup-btn') as HTMLButtonElement;
        btn.textContent = 'Thank you!';
        btn.disabled = true;
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Enter the Circle';
          btn.disabled = false;
        }, 3000);
      }
    });

    const params = getPageParams();
    if (params.section) {
      requestAnimationFrame(() => {
        document
          .getElementById(params.section)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    return page;
  },

  cleanup() {
    if (_observer) {
      _observer.disconnect();
      _observer = null;
    }
  },
};

export default HomePage;
