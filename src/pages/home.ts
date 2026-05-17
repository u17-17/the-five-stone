import type { PageComponent } from '../types';
import { getPageParams, navigateTo } from '../router';
import { analyticsEvents, trackEvent } from '../lib/analytics';
import { getCountdownState } from '../lib/countdown';
import { PAIR_BUNDLE_PRICE, PAIR_CAMPAIGN_END_AT } from '../siteConfig';

const products = [
  {
    id: 'red',
    name: 'Red Stone Necklace',
    meaning: 'Passion & Life Force',
    color: '#c0392b',
    image: '/product-images/red-main.webp',
    hoverImage: '/product-images/red-worn.webp',
    alt: 'Red Fifth Stone myth-inspired crystal necklace for courage and life force',
  },
  {
    id: 'gold',
    name: 'Gold Stone Necklace',
    meaning: 'Warmth & Protection',
    color: '#c49a42',
    image: '/product-images/gold-main.webp',
    hoverImage: '/product-images/gold-worn.webp',
    alt: 'Gold Fifth Stone Golden Crystal necklace for warmth, protection, and light',
  },
  {
    id: 'green',
    name: 'Green Stone Necklace',
    meaning: 'Healing & Renewal',
    color: '#4a7c59',
    image: '/product-images/green-main.webp',
    hoverImage: '/product-images/green-worn.webp',
    alt: 'Green Fifth Stone Eastern mythology jewelry necklace for renewal',
  },
  {
    id: 'white',
    name: 'White Stone Necklace',
    meaning: 'Protection & Purity',
    color: '#d4ccc0',
    image: '/product-images/white-main.webp',
    hoverImage: '/product-images/white-worn.webp',
    alt: 'White Fifth Stone protection necklace with luminous symbolic stone',
  },
  {
    id: 'black',
    name: 'Black Stone Necklace',
    meaning: 'Mystery & Inner Strength',
    color: '#3d3a35',
    image: '/product-images/black-main.webp',
    hoverImage: '/product-images/black-worn.webp',
    alt: 'Black Fifth Stone symbolic jewelry necklace for inner strength',
  },
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
    quote: 'I chose Gold during a dim season. It has become the piece I touch before stepping back into the world.',
    author: 'Avery C.',
    stone: 'Gold Stone',
  },
  {
    quote: 'The packaging, the story card, the weight of the stone - everything feels quietly sacred.',
    author: 'Noelle R.',
    stone: 'Black Stone',
  },
];

const trustHighlights = [
  'Secure Payment',
  'Tracked Shipping',
  'Clear Returns',
  'Myth-Inspired Design',
];

const heroSlides = [
  {
    label: 'Golden Stone',
    desktop: '/hero-carousel/hero-1.webp',
    mobile: '/hero-carousel/hero-1-mobile.webp',
  },
  {
    label: 'Red Stone',
    desktop: '/hero-carousel/hero-2.webp',
    mobile: '/hero-carousel/hero-2-mobile.webp',
  },
  {
    label: 'White Stone',
    desktop: '/hero-carousel/hero-3.webp',
    mobile: '/hero-carousel/hero-3-mobile.webp',
  },
  {
    label: 'Black Stone',
    desktop: '/hero-carousel/hero-4.webp',
    mobile: '/hero-carousel/hero-4-mobile.webp',
  },
  {
    label: 'Green Stone',
    desktop: '/hero-carousel/hero-5.webp',
    mobile: '/hero-carousel/hero-5-mobile.webp',
  },
];

const storyTeaserSlides = [
  {
    label: 'Column Hall',
    desktop: '/home-story-carousel/story-teaser-1.webp',
    mobile: '/home-story-carousel/story-teaser-1-mobile.webp',
  },
  {
    label: 'Ancient Ruins',
    desktop: '/home-story-carousel/story-teaser-2.webp',
    mobile: '/home-story-carousel/story-teaser-2-mobile.webp',
  },
];

let _observer: IntersectionObserver | null = null;
let _heroCarouselTimer: number | null = null;
let _storyCarouselTimer: number | null = null;
let _pairCountdownTimer: number | null = null;

const HomePage: PageComponent = {
  seo: {
    title: 'The Fifth Stone | Myth-Inspired Crystal Necklaces',
    description:
      'Shop The Fifth Stone myth-inspired crystal necklaces in five symbolic colors. Choose any two stones for the May pair offer and receive free shipping from China.',
    image: '/hero-carousel/hero-1.webp',
    imageAlt: 'The Fifth Stone symbolic necklace worn in warm light',
  },

  render() {
    if (_heroCarouselTimer !== null) {
      window.clearInterval(_heroCarouselTimer);
      _heroCarouselTimer = null;
    }
    if (_storyCarouselTimer !== null) {
      window.clearInterval(_storyCarouselTimer);
      _storyCarouselTimer = null;
    }
    if (_pairCountdownTimer !== null) {
      window.clearInterval(_pairCountdownTimer);
      _pairCountdownTimer = null;
    }

    const page = document.createElement('div');
    page.className = 'home-page';

    page.innerHTML = `
      <!-- ===== Screen 1: Hero ===== -->
      <section id="hero" class="home-hero" aria-labelledby="hero-title">
        <div class="hero-carousel" aria-hidden="true">
          ${heroSlides.map((slide, index) => `
            <picture class="hero-slide${index === 0 ? ' active' : ''}">
              <source media="(max-width: 768px)" srcset="${slide.mobile}">
              <img
                src="${slide.desktop}"
                alt=""
                width="1600"
                height="900"
                loading="${index === 0 ? 'eager' : 'lazy'}"
                fetchpriority="${index === 0 ? 'high' : 'low'}"
                decoding="async"
                draggable="false"
              >
            </picture>
          `).join('')}
        </div>
        <div class="hero-content">
          <div class="hero-brand-mark" aria-hidden="true">
            <img src="/brand-logo-mark.webp" alt="" width="555" height="540" decoding="async">
          </div>
          <p class="hero-brand-slogan">THE FIFTH STONE</p>
          <h1 id="hero-title" class="hero-title">Wear the Stone <br>That Mends the Sky.</h1>
          <div class="hero-rule" aria-hidden="true"></div>
          <p class="hero-tagline">Five sacred stones. One ancient promise.</p>
          <p class="hero-desc">Inspired by the legend of Nüwa, crafted for the journey within.</p>
          <div class="hero-actions">
            <button class="btn hero-primary" data-scroll="collection">Shop the Collection</button>
            <button class="btn btn-outline hero-secondary" data-scroll="story">Discover the Origin</button>
          </div>
        </div>
        <div class="hero-carousel-controls" aria-label="Hero image gallery">
          ${heroSlides.map((slide, index) => `
            <button
              class="hero-carousel-dot${index === 0 ? ' active' : ''}"
              type="button"
              data-hero-slide="${index}"
              aria-label="Show ${slide.label} hero image"
              aria-current="${index === 0 ? 'true' : 'false'}"
            >
              ${String(index + 1).padStart(2, '0')}
            </button>
          `).join('')}
        </div>
      </section>

      <!-- ===== Screen 2: Story Teaser ===== -->
      <section id="story" class="home-story fade-section" aria-labelledby="story-title">
        <div class="story-teaser-carousel" aria-hidden="true">
          ${storyTeaserSlides.map((slide, index) => `
            <picture class="story-teaser-slide${index === 0 ? ' active' : ''}">
              <source media="(max-width: 768px)" srcset="${slide.mobile}">
              <img
                src="${slide.desktop}"
                alt=""
                width="1600"
                height="900"
                loading="lazy"
                decoding="async"
                draggable="false"
              >
            </picture>
          `).join('')}
        </div>
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
              <span class="story-link-mark" aria-hidden="true"></span>
            </button>
            <div class="story-teaser-controls" aria-label="Story image gallery">
              ${storyTeaserSlides.map((slide, index) => `
                <button
                  class="story-teaser-dot${index === 0 ? ' active' : ''}"
                  type="button"
                  data-story-slide="${index}"
                  aria-label="Show ${slide.label} story image"
                  aria-current="${index === 0 ? 'true' : 'false'}"
                >
                  ${String(index + 1).padStart(2, '0')}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Brand Introduction ===== -->
      <section class="home-brand-intro section section-center fade-section" aria-labelledby="brand-intro-title">
        <div class="deco-divider"></div>
        <h2 id="brand-intro-title" class="section-title">A necklace for the sky within.</h2>
        <div class="home-brand-intro-copy">
          <p>The Fifth Stone began with a simple image: a final sacred stone left behind after the sky was mended. From that image we create symbolic jewelry for people who want beauty with meaning, not noise. Each myth-inspired necklace is shaped around the language of repair, protection, and rebirth, drawing from Eastern mythology jewelry traditions while staying quiet enough for daily wear.</p>
          <p>Our crystal necklace collection is made to feel like a private ritual. Red carries courage, green suggests renewal, gold holds warmth, white becomes a protection necklace, and black holds mystery and inner strength. The piece is not a promise of magic; it is a wearable reminder. For a gift, a turning point, or an ordinary morning, The Fifth Stone offers a small story about what can be restored, guarded, and begun again. Every detail is meant to make the necklace feel personal before it ever becomes visible to anyone else.</p>
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
                <img class="product-card-image-main" src="${p.image}" alt="${p.alt}" width="1086" height="1448" loading="lazy" decoding="async">
                <img class="product-card-image-worn" src="${p.hoverImage}" alt="" width="1122" height="1402" loading="lazy" decoding="async" aria-hidden="true">
              </div>
              <h3 class="product-card-name">${p.name}</h3>
              <p class="product-card-meaning">${p.meaning}</p>
              <button class="btn btn-outline product-card-btn" data-product="${p.id}">View Details</button>
            </div>
          `).join('')}
        </div>
        <button class="btn collection-cta" data-action="product">Choose Your Stone</button>
      </section>

      <!-- ===== Pair Offer ===== -->
      <section class="home-pair-offer section fade-section" aria-labelledby="pair-offer-title">
        <div class="pair-offer-inner">
          <div class="pair-offer-copy">
            <p class="pair-offer-kicker">May Pair Offer</p>
            <h2 id="pair-offer-title" class="pair-offer-title">Build Your Pair</h2>
            <p class="pair-offer-lede">
              Choose any two stones for <strong>$${PAIR_BUNDLE_PRICE}.00</strong>.
              A gift-ready pairing for protection, renewal, warmth, courage, or quiet strength.
            </p>
            <p class="pair-offer-note">
              Pair two meanings for one story, or keep one close and send one to someone who needs a little sky mended.
              Free shipping from China is included during the offer.
            </p>
            <button class="btn pair-offer-cta" data-action="product">Choose Two Stones</button>
          </div>
          <aside class="pair-countdown" aria-label="May pair offer countdown">
            <span class="pair-countdown-label">May Pair Offer Ends In</span>
            <div class="pair-countdown-grid" aria-live="polite">
              <span class="pair-countdown-unit">
                <strong data-countdown-part="days">00</strong>
                <small>Days</small>
              </span>
              <span class="pair-countdown-unit">
                <strong data-countdown-part="hours">00</strong>
                <small>Hours</small>
              </span>
              <span class="pair-countdown-unit">
                <strong data-countdown-part="minutes">00</strong>
                <small>Minutes</small>
              </span>
              <span class="pair-countdown-unit">
                <strong data-countdown-part="seconds">00</strong>
                <small>Seconds</small>
              </span>
            </div>
            <p class="pair-countdown-expired">Pair styling is still available. Choose the two stones that belong together.</p>
          </aside>
        </div>
      </section>

      <!-- ===== Trust Section ===== -->
      <section class="home-trust-section section section-center fade-section" aria-label="Trust and service highlights">
        <div class="home-trust-grid">
          ${trustHighlights.map((item, index) => `
            <div class="home-trust-item">
              <span class="home-trust-number">0${index + 1}</span>
              <h3>${item}</h3>
            </div>
          `).join('')}
        </div>
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
          <p class="signup-status" role="status" aria-live="polite"></p>
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
        if (target === 'collection') {
          trackEvent(analyticsEvents.collectionClick, { source: 'hero_shop' });
        } else if (target === 'story') {
          trackEvent(analyticsEvents.storyCtaClick, { source: 'hero_discover_origin' });
        }
        if (target) {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    page.querySelectorAll('[data-action="story"]').forEach(btn => {
      btn.addEventListener('click', () => {
        trackEvent(analyticsEvents.storyCtaClick, { source: 'home_story_teaser' });
        navigateTo('story');
      });
    });
    page.querySelectorAll('[data-action="product"]').forEach(btn => {
      btn.addEventListener('click', () => {
        trackEvent(analyticsEvents.collectionClick, { source: 'home_collection_cta' });
        navigateTo('collection');
      });
    });
    page.querySelectorAll('[data-product]').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = (btn as HTMLElement).dataset.product;
        trackEvent(analyticsEvents.productCardClick, {
          source: 'home_collection_preview',
          product_id: color,
        });
        navigateTo('collection', color ? { color } : undefined);
      });
    });

    const pairCountdown = page.querySelector<HTMLElement>('.pair-countdown');
    const pairCountdownParts = Array.from(
      page.querySelectorAll<HTMLElement>('[data-countdown-part]'),
    );
    const updatePairCountdown = () => {
      if (!pairCountdown) return;
      const state = getCountdownState(PAIR_CAMPAIGN_END_AT);

      pairCountdown.classList.toggle('expired', state.expired);
      for (const el of pairCountdownParts) {
        const key = el.dataset.countdownPart as keyof typeof state.parts | undefined;
        if (!key) continue;
        el.textContent = String(state.parts[key]).padStart(2, '0');
      }

      if (state.expired && _pairCountdownTimer !== null) {
        window.clearInterval(_pairCountdownTimer);
        _pairCountdownTimer = null;
      }
    };
    updatePairCountdown();
    if (pairCountdown && !pairCountdown.classList.contains('expired')) {
      _pairCountdownTimer = window.setInterval(updatePairCountdown, 1000);
    }

    const hero = page.querySelector('.home-hero');
    const heroSlideEls = Array.from(page.querySelectorAll<HTMLElement>('.hero-slide'));
    const heroButtons = Array.from(page.querySelectorAll<HTMLButtonElement>('[data-hero-slide]'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeHeroSlide = 0;

    const setHeroSlide = (nextIndex: number) => {
      activeHeroSlide = (nextIndex + heroSlideEls.length) % heroSlideEls.length;
      heroSlideEls.forEach((slide, index) => {
        slide.classList.toggle('active', index === activeHeroSlide);
      });
      heroButtons.forEach((button, index) => {
        const isActive = index === activeHeroSlide;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-current', String(isActive));
      });
    };

    const stopHeroCarousel = () => {
      if (_heroCarouselTimer !== null) {
        window.clearInterval(_heroCarouselTimer);
        _heroCarouselTimer = null;
      }
    };

    const startHeroCarousel = () => {
      if (prefersReducedMotion || heroSlideEls.length < 2 || _heroCarouselTimer !== null) return;
      _heroCarouselTimer = window.setInterval(() => {
        setHeroSlide(activeHeroSlide + 1);
      }, 5200);
    };

    heroButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const nextSlide = Number(button.dataset.heroSlide);
        stopHeroCarousel();
        setHeroSlide(nextSlide);
        startHeroCarousel();
      });
    });

    hero?.addEventListener('mouseenter', stopHeroCarousel);
    hero?.addEventListener('mouseleave', startHeroCarousel);
    hero?.addEventListener('focusin', stopHeroCarousel);
    hero?.addEventListener('focusout', startHeroCarousel);
    startHeroCarousel();

    const storyTeaser = page.querySelector('.home-story');
    const storySlideEls = Array.from(page.querySelectorAll<HTMLElement>('.story-teaser-slide'));
    const storyButtons = Array.from(page.querySelectorAll<HTMLButtonElement>('[data-story-slide]'));
    let activeStorySlide = 0;

    const setStorySlide = (nextIndex: number) => {
      activeStorySlide = (nextIndex + storySlideEls.length) % storySlideEls.length;
      storySlideEls.forEach((slide, index) => {
        slide.classList.toggle('active', index === activeStorySlide);
      });
      storyButtons.forEach((button, index) => {
        const isActive = index === activeStorySlide;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-current', String(isActive));
      });
    };

    const stopStoryCarousel = () => {
      if (_storyCarouselTimer !== null) {
        window.clearInterval(_storyCarouselTimer);
        _storyCarouselTimer = null;
      }
    };

    const startStoryCarousel = () => {
      if (prefersReducedMotion || storySlideEls.length < 2 || _storyCarouselTimer !== null) return;
      _storyCarouselTimer = window.setInterval(() => {
        setStorySlide(activeStorySlide + 1);
      }, 5800);
    };

    storyButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const nextSlide = Number(button.dataset.storySlide);
        stopStoryCarousel();
        setStorySlide(nextSlide);
        startStoryCarousel();
      });
    });

    storyTeaser?.addEventListener('mouseenter', stopStoryCarousel);
    storyTeaser?.addEventListener('mouseleave', startStoryCarousel);
    storyTeaser?.addEventListener('focusin', stopStoryCarousel);
    storyTeaser?.addEventListener('focusout', startStoryCarousel);
    startStoryCarousel();

    const form = page.querySelector('.signup-form') as HTMLFormElement | null;
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('.signup-input') as HTMLInputElement;
      const status = page.querySelector('.signup-status') as HTMLElement | null;
      const btn = form.querySelector('.signup-btn') as HTMLButtonElement;
      const email = input.value.trim();
      if (!input.checkValidity() || !email.includes('@')) {
        if (status) status.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }

      btn.textContent = 'Joining...';
      btn.disabled = true;
      if (status) status.textContent = '';

      try {
        const response = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'home_signup' }),
        });

        const result = (await response.json().catch(() => ({}))) as { error?: string };

        if (!response.ok) {
          throw new Error(result.error || 'Unable to join right now. Please try again later.');
        }

        trackEvent(analyticsEvents.newsletterSubmit, { source: 'home_signup' });
        if (status) {
          status.textContent = 'Thank you. You are in.';
        }
        btn.textContent = 'Joined';
        input.value = '';
      } catch (error) {
        if (status) {
          status.textContent =
            error instanceof Error
              ? error.message
              : 'Unable to join right now. Please try again later.';
        }
        btn.textContent = 'Enter the Circle';
        btn.disabled = false;
        return;
      }

      setTimeout(() => {
        btn.textContent = 'Enter the Circle';
        btn.disabled = false;
      }, 3000);
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
    if (_heroCarouselTimer !== null) {
      window.clearInterval(_heroCarouselTimer);
      _heroCarouselTimer = null;
    }
    if (_storyCarouselTimer !== null) {
      window.clearInterval(_storyCarouselTimer);
      _storyCarouselTimer = null;
    }
    if (_pairCountdownTimer !== null) {
      window.clearInterval(_pairCountdownTimer);
      _pairCountdownTimer = null;
    }
  },
};

export default HomePage;
