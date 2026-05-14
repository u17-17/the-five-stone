import type { PageComponent } from '../types';

let _observer: IntersectionObserver | null = null;

const PRODUCT_ASSET_DIR = '/产品展示图';
const productAsset = (fileName: string): string => `${PRODUCT_ASSET_DIR}/${fileName}`;

const StoryPage: PageComponent = {
  render() {
    const container = document.createElement('div');

    /* ===== Page-specific styles ===== */
    const style = document.createElement('style');
    style.textContent = `
      /* Hero */
      .story-hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        padding: 120px 24px 80px;
        overflow: hidden;
        background:
          linear-gradient(180deg, rgba(250,246,240,0.34) 0%, rgba(250,246,240,0.58) 48%, rgba(250,246,240,0.7) 100%),
          radial-gradient(ellipse 46% 32% at 50% 48%, rgba(250,246,240,0.76), rgba(250,246,240,0.3) 58%, transparent 78%),
          url('/story-hero-bg.png');
        background-color: var(--color-ivory);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .story-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 0;
        background:
          linear-gradient(180deg, rgba(250,246,240,0.3) 0%, transparent 34%, rgba(250,246,240,0.5) 100%),
          radial-gradient(ellipse 58% 36% at 50% 52%, rgba(255,255,255,0.52), transparent 72%);
        pointer-events: none;
      }

      .story-hero::after {
        content: '';
        position: absolute;
        width: min(760px, 92vw);
        height: 360px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -46%);
        border-radius: 50%;
        z-index: 0;
        background: radial-gradient(ellipse at center, rgba(250,246,240,0.58), rgba(250,246,240,0.28) 46%, transparent 72%);
        opacity: 0.72;
        filter: blur(14px);
        pointer-events: none;
      }

      .story-hero-content {
        position: relative;
        z-index: 1;
        max-width: 720px;
      }

      .story-hero-content h1 {
        font-size: 3rem;
        font-weight: 400;
        letter-spacing: 0.06em;
        margin-bottom: 20px;
        color: var(--color-dark);
      }

      .story-hero-content p {
        font-size: 1.05rem;
        color: var(--color-text-light);
        line-height: 1.8;
        margin-bottom: 40px;
        font-family: var(--font-serif);
        font-style: italic;
      }

      /* Fade-in animation */
      .fade-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }

      .fade-section.visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* Myth two-column layout */
      .story-myth-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 64px;
        align-items: center;
      }

      .story-myth-screen {
        max-width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
        background:
          linear-gradient(90deg, rgba(250,246,240,0.96) 0%, rgba(250,246,240,0.82) 44%, rgba(250,246,240,0.32) 72%, rgba(250,246,240,0.14) 100%),
          linear-gradient(180deg, rgba(250,246,240,0.22) 0%, rgba(250,246,240,0.08) 46%, rgba(250,246,240,0.34) 100%),
          url('/story-second-bg.png');
        background-color: var(--color-ivory);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .story-myth-screen .story-myth-layout {
        width: min(100%, var(--max-width));
        margin: 0 auto;
        grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
      }

      .story-myth-screen .story-myth-text {
        max-width: 760px;
        padding: 24px 0;
      }

      .story-myth-screen .section-title {
        font-size: clamp(3.7rem, 5.4vw, 5.6rem);
        line-height: 0.98;
        margin-bottom: 28px;
        max-width: 820px;
        letter-spacing: 0.01em;
      }

      .story-myth-screen .story-myth-text p {
        max-width: 760px;
        font-size: clamp(1.18rem, 1.28vw, 1.38rem);
        line-height: 1.85;
        color: #3a342e;
      }

      .story-myth-screen .myth-image {
        display: none;
      }

      .story-fifth-screen {
        max-width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
        background:
          linear-gradient(90deg, rgba(250,246,240,0.18) 0%, rgba(250,246,240,0.16) 38%, rgba(250,246,240,0.66) 72%, rgba(250,246,240,0.9) 100%),
          linear-gradient(180deg, rgba(250,246,240,0.12) 0%, transparent 42%, rgba(250,246,240,0.38) 100%),
          url('/story-third-bg.png');
        background-color: var(--color-ivory);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .story-fifth-screen .story-myth-layout {
        width: min(100%, var(--max-width));
        margin: 0 auto;
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      }

      .story-fifth-screen .story-myth-text {
        max-width: 600px;
        justify-self: end;
        padding: 24px 0;
      }

      .story-fifth-screen .section-title {
        font-size: clamp(3.45rem, 5vw, 5.15rem);
        line-height: 1;
        margin-bottom: 28px;
        letter-spacing: 0.01em;
      }

      .story-fifth-screen .story-myth-text p {
        max-width: 600px;
        font-size: clamp(1.14rem, 1.2vw, 1.32rem);
        line-height: 1.86;
        color: #3a342e;
      }

      .story-fifth-screen .fifth-stone-image {
        display: none;
      }

      .story-myth-text p {
        font-size: 1rem;
        line-height: 1.9;
        color: var(--color-text);
        font-family: var(--font-serif);
      }

      .story-image-placeholder {
        aspect-ratio: 4 / 3;
        border-radius: var(--radius-lg);
        position: relative;
        overflow: hidden;
        background: var(--color-cream);
        border: 1px solid rgba(184,160,124,0.24);
        box-shadow: 0 22px 60px rgba(126,105,76,0.1);
      }

      .story-image-placeholder img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: transform 0.5s ease, filter 0.5s ease;
      }

      .story-image-placeholder::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
      }

      .story-image-placeholder:hover img {
        transform: scale(1.025);
      }

      .myth-image img {
        filter: saturate(0.66) contrast(0.82) brightness(1.08);
        object-position: 58% center;
      }

      .myth-image::before {
        background:
          linear-gradient(90deg, rgba(250,246,240,0.2), rgba(250,246,240,0.5)),
          radial-gradient(ellipse 76% 62% at 62% 30%, rgba(255,255,255,0.56), transparent 68%),
          linear-gradient(116deg, transparent 0 51%, rgba(190,160,104,0.24) 51.1%, transparent 51.45% 100%),
          linear-gradient(70deg, transparent 0 55%, rgba(190,160,104,0.13) 55.15%, transparent 55.45% 100%);
        mix-blend-mode: screen;
      }

      .myth-image::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        background:
          linear-gradient(180deg, rgba(250,246,240,0.42), transparent 32%, rgba(250,246,240,0.48)),
          radial-gradient(ellipse 70% 28% at 50% 100%, rgba(250,246,240,0.78), transparent 74%);
      }

      .fifth-stone-image img {
        filter: saturate(0.7) contrast(0.9) brightness(1.05);
        object-position: center;
      }

      .fifth-stone-image::before {
        background:
          radial-gradient(ellipse 34% 30% at 50% 46%, rgba(212,196,168,0.26), transparent 68%),
          radial-gradient(ellipse 92% 46% at 50% 100%, rgba(250,246,240,0.66), transparent 72%),
          linear-gradient(180deg, rgba(250,246,240,0.12), rgba(250,246,240,0.44));
      }

      .fifth-stone-image::after {
        content: '';
        position: absolute;
        left: 18%;
        right: 18%;
        bottom: 8%;
        height: 22px;
        z-index: 2;
        border-radius: 50%;
        background: rgba(126,105,76,0.13);
        filter: blur(18px);
        pointer-events: none;
      }

      /* Transformation section */
      .story-transformation {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        margin-top: 48px;
        flex-wrap: wrap;
      }

      .story-transformation-step {
        flex: 1;
        min-width: 200px;
        max-width: 300px;
        text-align: center;
        padding: 32px 20px;
        background: rgba(248,242,234,0.72);
        border-radius: var(--radius-md);
        border: 1px solid rgba(184,160,124,0.22);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.52);
        transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      }

      .story-transformation-step:hover {
        transform: translateY(-5px);
        border-color: rgba(184,160,124,0.42);
        background: rgba(250,246,240,0.86);
        box-shadow: 0 18px 38px rgba(126,105,76,0.09);
      }

      .story-transformation-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 16px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 50% 38%, rgba(255,255,255,0.78), transparent 62%),
          rgba(250,246,240,0.62);
        border: 1px solid rgba(184,160,124,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #8b714d;
      }

      .story-icon-svg {
        width: 32px;
        height: 32px;
        display: block;
        stroke: currentColor;
        fill: none;
        stroke-width: 1.25;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .story-transformation-step h4 {
        font-size: 1rem;
        margin-bottom: 8px;
        font-weight: 500;
      }

      .story-transformation-step p {
        font-size: 0.85rem;
        color: var(--color-text-light);
        line-height: 1.6;
      }

      .story-transformation-arrow {
        font-size: 1.5rem;
        color: var(--color-muted-gold);
        flex-shrink: 0;
      }

      /* Five colors grid */
      .color-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 18px;
        margin: 0 0 48px;
      }

      .color-card {
        text-align: center;
        padding: 16px 14px 28px;
        background: linear-gradient(180deg, rgba(250,246,240,0.76), rgba(248,242,234,0.64));
        border-radius: var(--radius-md);
        border: 1px solid rgba(184,160,124,0.22);
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .color-card:hover {
        transform: translateY(-6px);
        border-color: rgba(184,160,124,0.44);
        background: linear-gradient(180deg, rgba(250,246,240,0.9), rgba(248,242,234,0.74));
        box-shadow: 0 18px 40px rgba(126,105,76,0.1);
      }

      .color-swatch {
        width: 100%;
        aspect-ratio: 1 / 1.18;
        border-radius: var(--radius-sm);
        margin: 0 auto 18px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.58);
        border: 1px solid rgba(184,160,124,0.18);
        overflow: hidden;
        background: var(--color-cream);
        position: relative;
      }

      .color-swatch::after {
        content: '';
        position: absolute;
        inset: 0;
        background:
          linear-gradient(180deg, rgba(250,246,240,0.06), rgba(250,246,240,0.24)),
          radial-gradient(ellipse 74% 24% at 50% 100%, rgba(126,105,76,0.1), transparent 72%);
        pointer-events: none;
      }

      .color-swatch img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.05);
        filter: saturate(0.78) contrast(0.92) brightness(1.04);
        transition: transform 0.45s ease, filter 0.45s ease;
      }

      .color-card:hover .color-swatch img {
        transform: scale(1.1);
        filter: saturate(0.84) contrast(0.96) brightness(1.05);
      }

      .color-swatch.red img { object-position: center; }
      .color-swatch.green img { object-position: center; }
      .color-swatch.blue img { object-position: center; }
      .color-swatch.white img { object-position: center; }
      .color-swatch.black img { object-position: center; }

      .color-card h3 {
        font-size: 1rem;
        margin-bottom: 6px;
        font-weight: 500;
      }

      .color-card p {
        font-size: 0.8rem;
        color: var(--color-text-light);
        letter-spacing: 0.04em;
      }

      /* Meaning section */
      .story-meaning {
        max-width: 700px;
        margin: 0 auto;
      }

      .story-meaning-image {
        width: 132px;
        height: 132px;
        margin: 0 auto 32px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 50% 44%, rgba(212,196,168,0.18), transparent 60%),
          rgba(248,242,234,0.72);
        border: 1px solid rgba(184,160,124,0.28);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        box-shadow: 0 18px 42px rgba(126,105,76,0.09);
      }

      .story-meaning-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.18);
        filter: saturate(0.68) contrast(0.9) brightness(1.08);
      }

      /* Philosophy section (full-width) */
      .story-philosophy {
        text-align: center;
        padding: 120px 24px;
        background: linear-gradient(180deg, transparent 0%, rgba(184,160,124,0.05) 50%, transparent 100%);
      }

      .story-philosophy-inner {
        max-width: var(--max-width);
        margin: 0 auto;
      }

      .story-philosophy .section-title {
        font-size: 2.8rem;
        max-width: 600px;
        margin: 0 auto 24px;
      }

      .story-philosophy p {
        font-size: 1rem;
        color: var(--color-text-light);
        max-width: 560px;
        margin: 0 auto;
        line-height: 1.9;
        font-family: var(--font-serif);
      }

      /* CTA */
      .story-cta {
        padding: 120px 24px;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        margin-top: 0;
      }

      .story-cta::before {
        content: '';
        position: absolute;
        width: min(520px, 82vw);
        aspect-ratio: 1;
        top: 14px;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
        background:
          radial-gradient(ellipse 70% 52% at 50% 50%, rgba(250,246,240,0.4), transparent 70%),
          url('/产品展示图/red-worn-lifestyle.png');
        background-position: center 42%;
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0.08;
        filter: saturate(0.6) contrast(0.88);
        border-radius: 50%;
        mask-image: radial-gradient(circle at 50% 48%, #000 0%, rgba(0,0,0,0.68) 38%, transparent 70%);
      }

      .story-cta::after {
        content: '';
        position: absolute;
        left: 18%;
        right: 18%;
        top: 86px;
        height: 1px;
        z-index: -1;
        background: linear-gradient(90deg, transparent, rgba(184,160,124,0.28), transparent);
      }

      .story-cta .section-title {
        font-size: 2.4rem;
        margin-bottom: 40px;
      }

      .story-cta-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }

      /* ===== Responsive ===== */
      @media (max-width: 1100px) {
        .color-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 768px) {
        .story-hero {
          min-height: 100svh;
          background:
            linear-gradient(180deg, rgba(250,246,240,0.48) 0%, rgba(250,246,240,0.7) 48%, rgba(250,246,240,0.82) 100%),
            radial-gradient(ellipse 70% 42% at 50% 50%, rgba(250,246,240,0.74), transparent 76%),
            url('/story-hero-bg-mobile.png');
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .story-hero-content h1 {
          font-size: 2rem;
        }

        .story-myth-layout {
          grid-template-columns: 1fr;
          gap: 32px;
        }

        .story-myth-screen {
          min-height: 100svh;
          background:
            linear-gradient(180deg, rgba(250,246,240,0.96) 0%, rgba(250,246,240,0.84) 58%, rgba(250,246,240,0.44) 100%),
            url('/story-second-bg-mobile.png');
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .story-myth-screen .story-myth-layout {
          grid-template-columns: 1fr;
        }

        .story-myth-screen .story-myth-text {
          max-width: 100%;
        }

        .story-myth-screen .section-title {
          font-size: clamp(2.65rem, 10vw, 4rem);
          line-height: 1.03;
        }

        .story-myth-screen .story-myth-text p {
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .story-fifth-screen {
          min-height: 100svh;
          background:
            linear-gradient(180deg, rgba(250,246,240,0.94) 0%, rgba(250,246,240,0.7) 46%, rgba(250,246,240,0.2) 100%),
            url('/story-third-bg-mobile.png');
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .story-fifth-screen .story-myth-layout {
          grid-template-columns: 1fr;
        }

        .story-fifth-screen .story-myth-text {
          max-width: 100%;
          justify-self: stretch;
        }

        .story-fifth-screen .section-title {
          font-size: clamp(2.55rem, 9.4vw, 3.85rem);
          line-height: 1.04;
        }

        .story-fifth-screen .story-myth-text p {
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .color-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .color-card:last-child {
          grid-column: 1 / -1;
          max-width: 280px;
          margin: 0 auto;
        }

        .story-philosophy .section-title {
          font-size: 2rem;
        }

        .story-cta .section-title {
          font-size: 1.8rem;
        }

        .story-transformation {
          flex-direction: column;
        }

        .story-transformation-arrow {
          transform: rotate(90deg);
        }
      }

      @media (max-width: 480px) {
        .color-grid {
          grid-template-columns: 1fr;
        }

        .color-card:last-child {
          grid-column: auto;
          max-width: none;
        }
      }
    `;
    container.appendChild(style);

    /* ===== 1. Story Hero ===== */
    const hero = document.createElement('section');
    hero.className = 'story-hero';
    hero.innerHTML = `
      <div class="story-hero-content">
        <h1>The Story of the Fifth Stone</h1>
        <p>A forgotten stone from an ancient myth — left for those still learning how to mend what was broken.</p>
        <button class="btn" id="discover-myth-btn">Discover the Myth</button>
      </div>
    `;
    container.appendChild(hero);

    /* ===== 2. The Ancient Myth ===== */
    const mythSection = document.createElement('section');
    mythSection.id = 'story-ancient-myth';
    mythSection.className = 'section fade-section story-myth-screen';
    mythSection.innerHTML = `
      <div class="story-myth-layout">
        <div class="story-myth-text">
          <h2 class="section-title">When the sky was broken</h2>
          <p>Long before the world had names for its sorrow, the sky was said to have broken. Light fell through the cracks. The earth trembled. Rivers rose, and the people looked upward, searching for protection. Then came Nuwa, the ancient goddess of creation. She gathered five sacred stones, each carrying a color of the world, and melted them into light strong enough to mend the heavens.</p>
        </div>
        <div class="story-image-placeholder myth-image">
          <img src="/story-myth-bg.png" alt="An elegant Eastern myth scene with clouds, sacred stones, and soft golden light" loading="lazy">
        </div>
      </div>
    `;
    container.appendChild(mythSection);

    /* ===== 3. The Fifth Stone ===== */
    const fifthSection = document.createElement('section');
    fifthSection.className = 'section fade-section story-fifth-screen';
    fifthSection.innerHTML = `
      <div class="story-myth-layout">
        <div class="story-image-placeholder fifth-stone-image">
          <img src="${productAsset('ChatGPT Image 2026年5月14日 15_43_59 (8).png')}" alt="A luminous Fifth Stone necklace resting in soft ivory light" loading="lazy">
        </div>
        <div class="story-myth-text">
          <h2 class="section-title">But one stone remained.</h2>
          <p>When the sky was mended, one stone was left behind. It did not return to the heavens. It stayed with the world — quiet, luminous, waiting. Some say it was never forgotten. It was left for those who would one day need their own kind of mending.</p>
        </div>
      </div>
    `;
    container.appendChild(fifthSection);

    /* ===== 4. From Myth to Necklace ===== */
    const transformSection = document.createElement('section');
    transformSection.className = 'section section-center fade-section';
    transformSection.innerHTML = `
      <h2 class="section-title">From a sacred stone to a symbol you can wear.</h2>
      <p class="section-subtitle">What was once a myth is now a tangible reminder — a bridge between ancient legend and your own journey. Each necklace carries the energy of the fifth stone, the one that stayed behind to mend what the heavens forgot.</p>
      <div class="story-transformation">
        <div class="story-transformation-step">
          <div class="story-transformation-icon" aria-hidden="true">
            <svg class="story-icon-svg" viewBox="0 0 40 40">
              <path d="M7 16.5C10.5 10.5 15 7.5 20 7.5C25 7.5 29.5 10.5 33 16.5" />
              <path d="M12 22.5H28" />
              <path d="M19.5 12.5L17.5 18.5L21 18.5L18.5 25.5" />
              <path d="M10 27.5C16.5 31 23.5 31 30 27.5" />
            </svg>
          </div>
          <h4>Ancient Myth</h4>
          <p>The legend of Nuwa mending the sky with five sacred stones.</p>
        </div>
        <div class="story-transformation-arrow">&rarr;</div>
        <div class="story-transformation-step">
          <div class="story-transformation-icon" aria-hidden="true">
            <svg class="story-icon-svg" viewBox="0 0 40 40">
              <path d="M20 6L31 17L20 34L9 17L20 6Z" />
              <path d="M9 17H31" />
              <path d="M15 17L20 34L25 17" />
              <path d="M16 12.5L20 17L24 12.5" />
              <path d="M20 3.5V1.5M20 38.5V36.5M35.5 20H37.5M2.5 20H4.5" />
            </svg>
          </div>
          <h4>Sacred Symbol</h4>
          <p>The fifth stone becomes a symbol of resilience and repair.</p>
        </div>
        <div class="story-transformation-arrow">&rarr;</div>
        <div class="story-transformation-step">
          <div class="story-transformation-icon" aria-hidden="true">
            <svg class="story-icon-svg" viewBox="0 0 40 40">
              <path d="M12 8C15 4.5 25 4.5 28 8" />
              <path d="M20 8V13" />
              <path d="M16 13H24" />
              <path d="M20 13C15.5 17 14 21 14 25.5C14 30 16.7 33.5 20 33.5C23.3 33.5 26 30 26 25.5C26 21 24.5 17 20 13Z" />
              <path d="M17.2 26.5C18.3 28 21.7 28 22.8 26.5" />
            </svg>
          </div>
          <h4>Wearable Art</h4>
          <p>Handcrafted into a necklace that carries the story with you.</p>
        </div>
      </div>
    `;
    container.appendChild(transformSection);

    /* ===== 5. Five Colors, Five Meanings ===== */
    const colorsSection = document.createElement('section');
    colorsSection.className = 'section fade-section';
    colorsSection.innerHTML = `
      <div class="section-center">
        <h2 class="section-title">Five stones. Five energies. One ancient promise.</h2>
        <p class="section-subtitle">Each color of the original five stones carries a distinct energy — a fragment of the sky's memory, waiting to be worn.</p>
      </div>
      <div class="color-grid">
        <div class="color-card">
          <div class="color-swatch red">
            <img src="${productAsset('红 (1).png')}" alt="Red Fifth Stone necklace concept" loading="lazy">
          </div>
          <h3>Red Stone</h3>
          <p>Passion / Life Force</p>
        </div>
        <div class="color-card">
          <div class="color-swatch green">
            <img src="${productAsset('绿.png')}" alt="Green Fifth Stone necklace concept" loading="lazy">
          </div>
          <h3>Green Stone</h3>
          <p>Healing / Renewal</p>
        </div>
        <div class="color-card">
          <div class="color-swatch blue">
            <img src="${productAsset('蓝.png')}" alt="Blue Fifth Stone necklace concept" loading="lazy">
          </div>
          <h3>Blue Stone</h3>
          <p>Clarity / Inner Peace</p>
        </div>
        <div class="color-card">
          <div class="color-swatch white">
            <img src="${productAsset('白.png')}" alt="White Fifth Stone necklace concept" loading="lazy">
          </div>
          <h3>White Stone</h3>
          <p>Protection / Purity</p>
        </div>
        <div class="color-card">
          <div class="color-swatch black">
            <img src="${productAsset('黑.png')}" alt="Black Fifth Stone necklace concept" loading="lazy">
          </div>
          <h3>Black Stone</h3>
          <p>Mystery / Inner Strength</p>
        </div>
      </div>
      <div class="section-center">
        <a href="#product" class="btn">Explore the Collection</a>
      </div>
    `;
    container.appendChild(colorsSection);

    /* ===== 6. Meaning of Wearing ===== */
    const meaningSection = document.createElement('section');
    meaningSection.className = 'section section-center fade-section';
    meaningSection.innerHTML = `
      <div class="story-meaning">
        <div class="story-meaning-image" aria-hidden="true">
          <img src="${productAsset('白.png')}" alt="">
        </div>
        <h2 class="section-title">For those who are still becoming whole.</h2>
        <p class="section-subtitle">Wearing the fifth stone is not about perfection. It is about acknowledging the cracks — in the sky, in the world, in ourselves — and choosing to mend them. It is for the ones who carry hidden fractures, who are quietly rebuilding, who believe that broken things can become beautiful again.</p>
      </div>
    `;
    container.appendChild(meaningSection);

    /* ===== 7. Brand Philosophy ===== */
    const philosophySection = document.createElement('section');
    philosophySection.className = 'story-philosophy fade-section';
    philosophySection.innerHTML = `
      <div class="story-philosophy-inner">
        <h2 class="section-title">Mend the sky within.</h2>
        <p>This is our calling. To remind each other that what is fractured can be made whole. That the fifth stone was left behind not by accident, but by design — for all of us who are still learning how to mend.</p>
      </div>
    `;
    container.appendChild(philosophySection);

    /* ===== 8. CTA ===== */
    const ctaSection = document.createElement('section');
    ctaSection.className = 'section section-center story-cta fade-section';
    ctaSection.innerHTML = `
      <h2 class="section-title">Wear the Stone That Mends the Sky.</h2>
      <div class="story-cta-buttons">
        <a href="#product" class="btn">Shop the Collection</a>
        <a href="#home" class="btn btn-outline">Return Home</a>
      </div>
    `;
    container.appendChild(ctaSection);

    /* ===== Intersection Observer for fade-in ===== */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    _observer = observer;

    const fadeSections = container.querySelectorAll('.fade-section');
    fadeSections.forEach((s) => observer.observe(s));

    /* ===== Discover the Myth scroll button ===== */
    const discoverBtn = container.querySelector('#discover-myth-btn');
    discoverBtn?.addEventListener('click', () => {
      const target = document.getElementById('story-ancient-myth');
      target?.scrollIntoView({ behavior: 'smooth' });
    });

    return container;
  },

  cleanup() {
    if (_observer) {
      _observer.disconnect();
      _observer = null;
    }
  },
};

export default StoryPage;
