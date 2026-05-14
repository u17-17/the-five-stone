import type { PageComponent } from '../types';
import { getPageParams } from '../router';
import { addToCart } from '../cart';
import { analyticsEvents, trackEvent } from '../lib/analytics';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type GalleryImageKey = 'main' | 'worn' | 'detail' | 'packaging';
type GalleryViewKey = GalleryImageKey | 'all';

interface GalleryView {
  key: GalleryViewKey;
  label: string;
}

interface StoneColor {
  id: string;
  name: string;
  hex: string;
  subtitle: string;
  description: string;
  longDescription: string;
  gradient: string;
  image: string;
  images: Record<GalleryImageKey, string>;
}

interface ReviewData {
  name: string;
  rating: number;
  text: string;
  colorName: string;
}

interface FAQData {
  q: string;
  a: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const PRODUCT_ASSET_DIR = '/product-images';

const productAsset = (fileName: string): string => `${PRODUCT_ASSET_DIR}/${fileName}`;

const PRODUCT_IMAGE_DIMENSIONS: Record<string, ImageDimensions> = {
  'red-main.webp': { width: 1086, height: 1448 },
  'red-worn.webp': { width: 1122, height: 1402 },
  'red-detail.webp': { width: 1122, height: 1402 },
  'red-packaging.webp': { width: 1448, height: 1086 },
  'green-main.webp': { width: 1086, height: 1448 },
  'green-worn.webp': { width: 1122, height: 1402 },
  'green-detail.webp': { width: 1122, height: 1402 },
  'green-packaging.webp': { width: 1448, height: 1086 },
  'blue-main.webp': { width: 1086, height: 1448 },
  'blue-worn.webp': { width: 1122, height: 1402 },
  'blue-detail.webp': { width: 1122, height: 1402 },
  'blue-packaging.webp': { width: 1448, height: 1086 },
  'white-main.webp': { width: 1086, height: 1448 },
  'white-worn.webp': { width: 1122, height: 1402 },
  'white-detail.webp': { width: 1122, height: 1402 },
  'white-packaging.webp': { width: 1448, height: 1086 },
  'black-main.webp': { width: 1086, height: 1448 },
  'black-worn.webp': { width: 1122, height: 1402 },
  'black-detail.webp': { width: 1122, height: 1402 },
  'black-packaging.webp': { width: 1448, height: 1086 },
};

const IMAGE_VIEWS: GalleryView[] = [
  { key: 'main', label: 'Main' },
  { key: 'worn', label: 'Worn' },
  { key: 'detail', label: 'Detail' },
  { key: 'packaging', label: 'Packaging' },
  { key: 'all', label: 'All Colors' },
];

const STONE_COLORS: StoneColor[] = [
  {
    id: 'red',
    name: 'Red',
    hex: '#c0392b',
    subtitle: 'Passion / Courage / Life Force',
    description:
      'Red jasper — the stone of vitality. A reminder that you are alive, capable, and made for more than mere existence.',
    longDescription:
      'The Red Stone Necklace is a myth-inspired necklace for courage, momentum, and the return of life force. Its warm red tone gives this crystal necklace a grounded presence, making it feel powerful without becoming loud. Inspired by Eastern mythology jewelry and the image of fire sealed inside stone, Red is chosen by people entering a new chapter, protecting their energy, or remembering their own capacity to begin again. It is symbolic jewelry for days that ask for resolve and forward motion.',
    gradient: 'linear-gradient(135deg, #c0392b, #e74c3c, #c0392b)',
    image: productAsset('red-main.webp'),
    images: {
      main: productAsset('red-main.webp'),
      worn: productAsset('red-worn.webp'),
      detail: productAsset('red-detail.webp'),
      packaging: productAsset('red-packaging.webp'),
    },
  },
  {
    id: 'green',
    name: 'Green',
    hex: '#27ae60',
    subtitle: 'Healing / Renewal / Growth',
    description:
      'Green aventurine — the stone of renewal. A reminder that healing is not linear, and every ending holds a new beginning.',
    longDescription:
      'The Green Stone Necklace is designed around renewal, patience, and the slow intelligence of healing. As a symbolic crystal necklace, it carries a softer kind of strength: the kind that returns quietly after a difficult season. Green connects the collection to growth in nature and to Eastern mythology jewelry traditions where color often holds emotional meaning. Wear it as a myth-inspired necklace for restoration, gentleness, and the belief that what has been cracked can still become fertile again with trust.',
    gradient: 'linear-gradient(135deg, #27ae60, #2ecc71, #27ae60)',
    image: productAsset('green-main.webp'),
    images: {
      main: productAsset('green-main.webp'),
      worn: productAsset('green-worn.webp'),
      detail: productAsset('green-detail.webp'),
      packaging: productAsset('green-packaging.webp'),
    },
  },
  {
    id: 'blue',
    name: 'Blue',
    hex: '#2980b9',
    subtitle: 'Clarity / Peace / Inner Balance',
    description:
      'Blue lace agate — the stone of serenity. A reminder to breathe, to still the mind, and to trust the quiet voice within.',
    longDescription:
      'The Blue Stone Necklace is made for clarity, inner quiet, and the space between reaction and response. Its cool tone gives this crystal necklace a calm visual rhythm, while the story behind it keeps the piece emotionally anchored. Blue is for the wearer who wants symbolic jewelry that feels thoughtful, steady, and easy to return to during a crowded day. As a myth-inspired necklace shaped by Eastern mythology jewelry, it suggests still water, open sky, and the protection of a clear mind.',
    gradient: 'linear-gradient(135deg, #2980b9, #3498db, #2980b9)',
    image: productAsset('blue-main.webp'),
    images: {
      main: productAsset('blue-main.webp'),
      worn: productAsset('blue-worn.webp'),
      detail: productAsset('blue-detail.webp'),
      packaging: productAsset('blue-packaging.webp'),
    },
  },
  {
    id: 'white',
    name: 'White',
    hex: '#e8e0d8',
    subtitle: 'Protection / Purity / Light',
    description:
      'White moonstone — the stone of protection. A reminder that you are held, guided, and never truly alone.',
    longDescription:
      'The White Stone Necklace is the collection’s clearest protection necklace, made for those who want a piece that feels luminous, gentle, and close. Its pale stone gives the crystal necklace a quiet ritual quality, like light held in a small object. Inspired by Eastern mythology jewelry and the final stone left behind after the sky was repaired, White represents shelter, purity, and emotional steadiness. It is symbolic jewelry for travel, transition, gifting, and moments when softness itself becomes a form of strength.',
    gradient: 'linear-gradient(135deg, #e8e0d8, #f5f0eb, #d4ccc4)',
    image: productAsset('white-main.webp'),
    images: {
      main: productAsset('white-main.webp'),
      worn: productAsset('white-worn.webp'),
      detail: productAsset('white-detail.webp'),
      packaging: productAsset('white-packaging.webp'),
    },
  },
  {
    id: 'black',
    name: 'Black',
    hex: '#2c2c2c',
    subtitle: 'Mystery / Intuition / Spiritual Strength',
    description:
      'Black obsidian — the stone of truth. A reminder to look within, to shed what no longer serves, and to stand in your power.',
    longDescription:
      'The Black Stone Necklace is a myth-inspired necklace for intuition, boundaries, and quiet inner strength. Its deep tone brings a more mysterious energy to the crystal necklace collection, pairing easily with daily clothing while carrying a private symbolic weight. Black is chosen by wearers who want protection without ornament that feels obvious, and meaning without explanation. Rooted in Eastern mythology jewelry and the image of a stone that remained after repair, it becomes symbolic jewelry for truth, resilience, and self-possession.',
    gradient: 'linear-gradient(135deg, #2c2c2c, #4a4a4a, #2c2c2c)',
    image: productAsset('black-main.webp'),
    images: {
      main: productAsset('black-main.webp'),
      worn: productAsset('black-worn.webp'),
      detail: productAsset('black-detail.webp'),
      packaging: productAsset('black-packaging.webp'),
    },
  },
];

const REVIEWS: ReviewData[] = [
  {
    name: 'Elena R.',
    rating: 5,
    text: 'I\'ve worn mine every day since it arrived. The stone feels warm against my skin — like a quiet anchor in a chaotic world.',
    colorName: 'Red',
  },
  {
    name: 'Marcus T.',
    rating: 5,
    text: 'Bought the Blue for clarity during a difficult season. It\'s subtle enough for daily wear but meaningful enough to never take off.',
    colorName: 'Blue',
  },
  {
    name: 'Sophia L.',
    rating: 5,
    text: 'The Black obsidian is stunning. So many compliments. But more than that — I feel its weight in the best way. A daily reminder of my own strength.',
    colorName: 'Black',
  },
  {
    name: 'Aiko M.',
    rating: 4,
    text: 'Bought the White for my sister. She cried when she opened it. The packaging is beautiful and the stone feels intentional, not like an afterthought.',
    colorName: 'White',
  },
  {
    name: 'James K.',
    rating: 5,
    text: 'I was skeptical about "a stone on a string." But this piece carries meaning. The Green has become my quiet ritual — a touch before every meeting.',
    colorName: 'Green',
  },
];

const FAQS: FAQData[] = [
  {
    q: 'What is the chain made of?',
    a: 'Each necklace features a 14k gold-filled or sterling silver chain (your choice), measuring 18 inches with a 2-inch extender for adjustable length. Gold-filled is 100x thicker than standard gold plating, ensuring lasting wear without tarnish.',
  },
  {
    q: 'Can I wear it in water?',
    a: 'We recommend removing your necklace before swimming, showering, or exercising. While the chain is durable, prolonged exposure to moisture can affect the natural stone and the finish over time.',
  },
  {
    q: 'How do I choose my stone?',
    a: 'Choose the color that resonates with you most in this moment. Each stone carries a unique meaning, but there is no wrong choice — the stone chooses you as much as you choose it. If you\'re unsure, trust your first instinct.',
  },
  {
    q: 'Is this a real gemstone?',
    a: 'Yes. Each stone is a genuine semi-precious gemstone, hand-selected for its color and character. No two stones are exactly alike, which means your necklace is truly one of a kind.',
  },
  {
    q: 'What is the return policy?',
    a: 'We offer free returns within 30 days of delivery. The necklace must be unworn and in its original packaging. We believe in the Fifth Stone — but if it isn\'t yours, we\'ll make it right.',
  },
];

const SELLING_POINTS = [
  '14k gold-filled or sterling silver',
  'Hand-selected genuine gemstone',
  '18" chain with 2" extender',
  'Arrives in a keepsake box',
  'Free shipping worldwide',
];

const TRUST_BADGES = [
  { label: 'Secure checkout with PayPal', href: '/policies/privacy-policy' },
  { label: 'Tracked international shipping', href: '/policies/shipping-policy' },
  { label: 'Clear return policy', href: '/policies/refund-policy' },
  { label: 'Support contact available', href: '/contact' },
];

// ---------------------------------------------------------------------------
// Gallery helpers
// ---------------------------------------------------------------------------
function createGalleryImage(
  src: string,
  alt: string,
  className: string,
  options: { loading?: 'eager' | 'lazy'; fetchPriority?: 'high' | 'low' | 'auto' } = {},
): HTMLImageElement {
  const img = document.createElement('img');
  img.className = className;
  img.src = src;
  img.alt = alt;
  img.loading = options.loading ?? 'lazy';
  img.decoding = 'async';
  const fileName = src.split('/').pop();
  const dimensions = fileName ? PRODUCT_IMAGE_DIMENSIONS[fileName] : undefined;
  if (dimensions) {
    img.width = dimensions.width;
    img.height = dimensions.height;
  }
  if (options.fetchPriority) {
    img.setAttribute('fetchpriority', options.fetchPriority);
  }
  return img;
}

function createAllColorsGallery(className: string): HTMLDivElement {
  const grid = document.createElement('div');
  grid.className = className;

  for (const color of STONE_COLORS) {
    const item = document.createElement('div');
    item.className = 'product-all-colors-item';
    item.appendChild(
      createGalleryImage(
        color.images.main,
        `${color.name} Fifth Stone symbolic crystal necklace in the five-stone collection`,
        'product-all-colors-img',
      ),
    );
    grid.appendChild(item);
  }

  return grid;
}

function renderGalleryView(container: HTMLElement, color: StoneColor, viewIndex: number): void {
  const view = IMAGE_VIEWS[viewIndex];
  container.innerHTML = '';

  if (view.key === 'all') {
    container.appendChild(createAllColorsGallery('product-all-colors-gallery'));
    return;
  }

  container.appendChild(
      createGalleryImage(
        color.images[view.key],
        `${color.name} Fifth Stone Necklace ${view.label.toLowerCase()} image for myth-inspired symbolic jewelry`,
        'product-main-image-el',
        { loading: 'eager', fetchPriority: 'high' },
    ),
  );
}

function renderGalleryThumb(thumb: HTMLElement, color: StoneColor, viewIndex: number): void {
  const view = IMAGE_VIEWS[viewIndex];
  thumb.innerHTML = '';
  thumb.setAttribute(
    'aria-label',
    view.key === 'all'
      ? 'View all stone colors'
      : `View ${view.label.toLowerCase()} image for the ${color.name} Stone Necklace`,
  );

  if (view.key === 'all') {
    thumb.appendChild(createAllColorsGallery('product-thumb-mosaic'));
  } else {
    thumb.appendChild(
      createGalleryImage(
        color.images[view.key],
        `${color.name} Fifth Stone ${view.label.toLowerCase()} thumbnail for the product gallery`,
        'product-image-thumb-img',
      ),
    );
  }

  const label = document.createElement('span');
  label.className = 'product-image-thumb-label';
  label.textContent = view.label;
  thumb.appendChild(label);
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
const ProductPage: PageComponent = {
  seo: {
    title: 'The Fifth Stone Collection | Symbolic Stone Necklaces',
    description:
      'Choose your Fifth Stone necklace in red, green, blue, white, or black, each carrying a symbolic meaning inspired by the myth of mending the sky.',
  },

  render() {
    const page = document.createElement('div');
    page.className = 'product-page';

    /* ---- state ---- */
    const params = getPageParams();
    let selectedIndex = params.color
      ? Math.max(0, STONE_COLORS.findIndex(c => c.id === params.color))
      : 0;

    const getColor = (i: number): StoneColor => STONE_COLORS[i];
    const currentColor = (): StoneColor => getColor(selectedIndex);

    /* ====================================================================
     *  1. Product Hero
     * ==================================================================== */
    const heroSection = document.createElement('section');
    heroSection.className = 'product-hero';

    const heroInner = document.createElement('div');
    heroInner.className = 'product-hero-inner';

    /* -- Left: Image gallery -- */
    const heroImages = document.createElement('div');
    heroImages.className = 'product-hero-images';

    const mainImage = document.createElement('div');
    mainImage.className = 'product-main-image';
    renderGalleryView(mainImage, currentColor(), 0);

    const imageThumbsRow = document.createElement('div');
    imageThumbsRow.className = 'product-image-thumbs';

    for (let i = 0; i < IMAGE_VIEWS.length; i++) {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = `product-image-thumb${i === 0 ? ' active' : ''}`;
      thumb.dataset.view = String(i);
      renderGalleryThumb(thumb, currentColor(), i);
      imageThumbsRow.appendChild(thumb);
    }

    heroImages.appendChild(mainImage);
    heroImages.appendChild(imageThumbsRow);

    /* -- Right: Info -- */
    const heroInfo = document.createElement('div');
    heroInfo.className = 'product-hero-info';

    const productTitle = document.createElement('h1');
    productTitle.className = 'product-title';
    productTitle.textContent = 'The Fifth Stone Necklace';

    const productSubtitle = document.createElement('p');
    productSubtitle.className = 'product-subtitle';
    productSubtitle.textContent =
      'A semi-precious gemstone on a 14k gold-filled or sterling silver chain.';

    const priceEl = document.createElement('p');
    priceEl.className = 'product-price';
    priceEl.textContent = '$49.00';

    const divider = document.createElement('hr');
    divider.className = 'product-divider';

    /* Color picker */
    const colorLabel = document.createElement('p');
    colorLabel.className = 'product-color-picker-label';
    colorLabel.textContent = 'Choose your stone:';

    const colorThumbRow = document.createElement('div');
    colorThumbRow.className = 'product-color-thumbs';

    for (let i = 0; i < STONE_COLORS.length; i++) {
      const btn = document.createElement('button');
      btn.className = `product-color-thumb${i === selectedIndex ? ' active' : ''}`;
      btn.style.background = STONE_COLORS[i].gradient;
      btn.setAttribute('aria-label', STONE_COLORS[i].name);
      colorThumbRow.appendChild(btn);
    }

    const colorNameEl = document.createElement('p');
    colorNameEl.className = 'product-color-name';
    colorNameEl.textContent = currentColor().name;

    const colorSubtitleEl = document.createElement('p');
    colorSubtitleEl.className = 'product-color-subtitle';
    colorSubtitleEl.textContent = currentColor().subtitle;

    /* Buttons */
    const btnGroup = document.createElement('div');
    btnGroup.className = 'product-btn-group';

    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'btn product-add-cart';
    addToCartBtn.textContent = 'Add to Cart';

    const buyNowBtn = document.createElement('button');
    buyNowBtn.className = 'btn btn-outline product-buy-now';
    buyNowBtn.textContent = 'Buy Now';

    btnGroup.appendChild(addToCartBtn);
    btnGroup.appendChild(buyNowBtn);

    /* Trust badges */
    const trustBadges = document.createElement('div');
    trustBadges.className = 'product-trust-badges';
    trustBadges.setAttribute('aria-label', 'Checkout and customer support information');

    for (const badge of TRUST_BADGES) {
      const link = document.createElement('a');
      link.className = 'product-trust-badge';
      link.href = badge.href;
      link.textContent = badge.label;
      if (badge.href === '/contact') {
        link.addEventListener('click', () => {
          trackEvent(analyticsEvents.contactClick, { source: 'product_trust_badge' });
        });
      }
      trustBadges.appendChild(link);
    }

    /* Selling points */
    const sellingList = document.createElement('ul');
    sellingList.className = 'product-selling-points';
    for (const pt of SELLING_POINTS) {
      const li = document.createElement('li');
      li.textContent = pt;
      sellingList.appendChild(li);
    }

    heroInfo.appendChild(productTitle);
    heroInfo.appendChild(productSubtitle);
    heroInfo.appendChild(priceEl);
    heroInfo.appendChild(divider);
    heroInfo.appendChild(colorLabel);
    heroInfo.appendChild(colorThumbRow);
    heroInfo.appendChild(colorNameEl);
    heroInfo.appendChild(colorSubtitleEl);
    heroInfo.appendChild(btnGroup);
    heroInfo.appendChild(trustBadges);
    heroInfo.appendChild(sellingList);

    heroInner.appendChild(heroImages);
    heroInner.appendChild(heroInfo);
    heroSection.appendChild(heroInner);
    page.appendChild(heroSection);

    /* ====================================================================
     *  2. Product Meaning
     * ==================================================================== */
    const meaningSection = document.createElement('section');
    meaningSection.className = 'section section-center product-meaning';

    const meaningTitle = document.createElement('h2');
    meaningTitle.className = 'section-title';
    meaningTitle.textContent = 'The stone that stayed behind.';

    const meaningText = document.createElement('p');
    meaningText.className = 'section-subtitle';
    meaningText.innerHTML =
      'They say we carried five stones — each a gift, each a burden. One by one we let them go, until only the fifth remained. Not because we lacked the courage to release it, but because this one chose to stay.<br><br>The Fifth Stone is a symbol of what endures when everything else falls away. A reminder of the strength you forgot you had. It does not promise to change your life. It is simply there — a quiet weight against your chest — waiting for you to remember what matters.';

    meaningSection.appendChild(meaningTitle);
    meaningSection.appendChild(meaningText);
    page.appendChild(meaningSection);

    /* ====================================================================
     *  3. Choose Your Stone
     * ==================================================================== */
    const chooseSection = document.createElement('section');
    chooseSection.className = 'section section-center product-choose';

    const chooseTitle = document.createElement('h2');
    chooseTitle.className = 'section-title';
    chooseTitle.textContent = 'Choose Your Stone';

    const chooseSubtitle = document.createElement('p');
    chooseSubtitle.className = 'section-subtitle';
    chooseSubtitle.textContent =
      'Each stone carries a different meaning. Choose the one that speaks to you.';

    const chooseGrid = document.createElement('div');
    chooseGrid.className = 'choose-grid';

    for (let i = 0; i < STONE_COLORS.length; i++) {
      const c = STONE_COLORS[i];
      const card = document.createElement('div');
      card.className = `choose-card${i === selectedIndex ? ' active' : ''}`;

      const circle = document.createElement('div');
      circle.className = 'choose-circle';
      circle.style.background = c.gradient;

      const name = document.createElement('h3');
      name.className = 'choose-card-name';
      name.textContent = c.name;

      const sub = document.createElement('p');
      sub.className = 'choose-card-subtitle';
      sub.textContent = c.subtitle;

      card.appendChild(circle);
      card.appendChild(name);
      card.appendChild(sub);
      chooseGrid.appendChild(card);
    }

    const chooseDesc = document.createElement('p');
    chooseDesc.className = 'choose-description';
    chooseDesc.textContent = currentColor().description;

    chooseSection.appendChild(chooseTitle);
    chooseSection.appendChild(chooseSubtitle);
    chooseSection.appendChild(chooseGrid);
    chooseSection.appendChild(chooseDesc);
    page.appendChild(chooseSection);

    /* ====================================================================
     *  4. Stone Descriptions
     * ==================================================================== */
    const stoneDescriptionsSection = document.createElement('section');
    stoneDescriptionsSection.className = 'section product-stone-descriptions';

    const stoneDescriptionsHeader = document.createElement('div');
    stoneDescriptionsHeader.className = 'section-center';

    const stoneDescriptionsTitle = document.createElement('h2');
    stoneDescriptionsTitle.className = 'section-title';
    stoneDescriptionsTitle.textContent = 'Five symbolic necklaces, five ways to carry the story.';

    const stoneDescriptionsSubtitle = document.createElement('p');
    stoneDescriptionsSubtitle.className = 'section-subtitle';
    stoneDescriptionsSubtitle.textContent =
      'Each crystal necklace is part of one myth-inspired collection, but every color holds its own emotional language.';

    const stoneDescriptionsGrid = document.createElement('div');
    stoneDescriptionsGrid.className = 'stone-description-grid';

    for (const color of STONE_COLORS) {
      const card = document.createElement('article');
      card.className = 'stone-description-card';

      const title = document.createElement('h3');
      title.textContent = `${color.name} Stone Necklace`;

      const text = document.createElement('p');
      text.textContent = color.longDescription;

      card.appendChild(title);
      card.appendChild(text);
      stoneDescriptionsGrid.appendChild(card);
    }

    stoneDescriptionsHeader.appendChild(stoneDescriptionsTitle);
    stoneDescriptionsHeader.appendChild(stoneDescriptionsSubtitle);
    stoneDescriptionsSection.appendChild(stoneDescriptionsHeader);
    stoneDescriptionsSection.appendChild(stoneDescriptionsGrid);
    page.appendChild(stoneDescriptionsSection);

    /* ====================================================================
     *  5. Materials & Details
     * ==================================================================== */
    const materialSection = document.createElement('section');
    materialSection.className = 'section product-materials';

    const materialTitle = document.createElement('h2');
    materialTitle.className = 'section-title section-center';
    materialTitle.textContent = 'Materials & Details';

    const materialGrid = document.createElement('div');
    materialGrid.className = 'materials-grid';

    const MATERIALS = [
      {
        label: 'Stone',
        value:
          'Semi-precious gemstone, hand-selected for color and character. No two are alike.',
      },
      {
        label: 'Chain',
        value:
          '14k gold-filled or sterling silver. 18" with 2" extender. Hypoallergenic and nickel-free.',
      },
      {
        label: 'Clasp',
        value: 'Lobster claw closure with custom Fifth Stone tag.',
      },
      {
        label: 'Packaging',
        value: 'Arrives in a linen-lined keepsake box with a story card.',
      },
      {
        label: 'Dimensions',
        value:
          'Stone: approx. 10mm. Pendant drop: approx. 1.5". Chain: 18"–20" adjustable.',
      },
      {
        label: 'Care',
        value:
          'Avoid water, lotions, and perfumes. Wipe with a soft cloth. Store in the provided box.',
      },
    ];

    for (const m of MATERIALS) {
      const card = document.createElement('div');
      card.className = 'material-card';

      const label = document.createElement('h3');
      label.className = 'material-label';
      label.textContent = m.label;

      const val = document.createElement('p');
      val.className = 'material-value';
      val.textContent = m.value;

      card.appendChild(label);
      card.appendChild(val);
      materialGrid.appendChild(card);
    }

    materialSection.appendChild(materialTitle);
    materialSection.appendChild(materialGrid);
    page.appendChild(materialSection);

    /* ====================================================================
     *  6. Made to Wear Daily
     * ==================================================================== */
    const wearSection = document.createElement('section');
    wearSection.className = 'section product-wear';

    const wearInner = document.createElement('div');
    wearInner.className = 'product-wear-inner';

    const wearText = document.createElement('div');
    wearText.className = 'product-wear-text';

    const wearTitle = document.createElement('h2');
    wearTitle.className = 'section-title';
    wearTitle.textContent = 'Made to Wear Daily';

    const wearDesc = document.createElement('p');
    wearDesc.className = 'section-subtitle';
    wearDesc.innerHTML =
      'This is not a jewelry box keepsake. The Fifth Stone is meant to be worn — against your skin, under your shirt, through the ordinary hours of an ordinary day.<br><br>The chain is durable enough for daily life, the stone resilient enough to travel with you. Over time, it becomes part of you — a quiet ritual, a touchstone, a tether to what matters.<br><br>Wear it while you work. While you rest. While you remember who you are.';

    wearText.appendChild(wearTitle);
    wearText.appendChild(wearDesc);

    const wearImage = document.createElement('div');
    wearImage.className = 'product-wear-image';
    wearImage.appendChild(
      createGalleryImage(
        currentColor().images.worn,
        `${currentColor().name} Fifth Stone necklace worn as symbolic Eastern mythology jewelry`,
        'product-wear-image-el',
      ),
    );

    wearInner.appendChild(wearText);
    wearInner.appendChild(wearImage);
    wearSection.appendChild(wearInner);
    page.appendChild(wearSection);

    /* ====================================================================
     *  7. What's in the Box
     * ==================================================================== */
    const boxSection = document.createElement('section');
    boxSection.className = 'section section-center product-box';

    const boxTitle = document.createElement('h2');
    boxTitle.className = 'section-title';
    boxTitle.textContent = "What's in the Box";

    const boxList = document.createElement('div');
    boxList.className = 'box-list';

    const BOX_ITEMS = [
      { icon: '✦', text: 'The Fifth Stone Necklace — your chosen color' },
      { icon: '✦', text: 'Linen-lined keepsake box with magnetic closure' },
      { icon: '✦', text: 'Handwritten-style story card explaining the Fifth Stone' },
      { icon: '✦', text: 'Care guide with cleaning cloth' },
      { icon: '✦', text: 'Gold foil sticker set (bonus)' },
    ];

    for (const item of BOX_ITEMS) {
      const el = document.createElement('div');
      el.className = 'box-item';
      el.innerHTML = `<span class="box-icon">${item.icon}</span><span>${item.text}</span>`;
      boxList.appendChild(el);
    }

    boxSection.appendChild(boxTitle);
    boxSection.appendChild(boxList);
    page.appendChild(boxSection);

    /* ====================================================================
     *  8. Reviews
     * ==================================================================== */
    const reviewsSection = document.createElement('section');
    reviewsSection.className = 'section section-center product-reviews';

    const reviewsTitle = document.createElement('h2');
    reviewsTitle.className = 'section-title';
    reviewsTitle.textContent = 'What Others Are Saying';

    const reviewsGrid = document.createElement('div');
    reviewsGrid.className = 'reviews-grid';

    for (const r of REVIEWS) {
      const card = document.createElement('div');
      card.className = 'review-card';

      const stars = document.createElement('div');
      stars.className = 'review-stars';
      stars.textContent = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

      const text = document.createElement('p');
      text.className = 'review-text';
      text.textContent = `"${r.text}"`;

      const author = document.createElement('p');
      author.className = 'review-author';
      author.textContent = `${r.name} — ${r.colorName} Stone`;

      card.appendChild(stars);
      card.appendChild(text);
      card.appendChild(author);
      reviewsGrid.appendChild(card);
    }

    reviewsSection.appendChild(reviewsTitle);
    reviewsSection.appendChild(reviewsGrid);
    page.appendChild(reviewsSection);

    /* ====================================================================
     *  9. FAQ
     * ==================================================================== */
    const faqSection = document.createElement('section');
    faqSection.className = 'section section-center product-faq';

    const faqTitle = document.createElement('h2');
    faqTitle.className = 'section-title';
    faqTitle.textContent = 'Questions & Answers';

    const faqList = document.createElement('div');
    faqList.className = 'faq-list';

    for (const faq of FAQS) {
      const item = document.createElement('div');
      item.className = 'faq-item';

      const question = document.createElement('button');
      question.className = 'faq-question';

      const qSpan = document.createElement('span');
      qSpan.textContent = faq.q;

      const iconSpan = document.createElement('span');
      iconSpan.className = 'faq-icon';
      iconSpan.textContent = '+';

      question.appendChild(qSpan);
      question.appendChild(iconSpan);

      const answer = document.createElement('div');
      answer.className = 'faq-answer';
      answer.textContent = faq.a;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqList.querySelectorAll('.faq-item.open').forEach((el) => el.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });

      item.appendChild(question);
      item.appendChild(answer);
      faqList.appendChild(item);
    }

    faqSection.appendChild(faqTitle);
    faqSection.appendChild(faqList);
    page.appendChild(faqSection);

    /* ====================================================================
     *  10. Final CTA
     * ==================================================================== */
    const ctaSection = document.createElement('section');
    ctaSection.className = 'section section-center product-cta';

    const ctaTitle = document.createElement('h2');
    ctaTitle.className = 'section-title';
    ctaTitle.textContent = 'Find Your Fifth Stone';

    const ctaText = document.createElement('p');
    ctaText.className = 'section-subtitle';
    ctaText.textContent =
      'Every stone has a meaning. Which one speaks to you?';

    const ctaBtn = document.createElement('button');
    ctaBtn.className = 'btn product-cta-btn';
    ctaBtn.textContent = 'Add to Cart';

    const ctaThumbs = document.createElement('div');
    ctaThumbs.className = 'product-cta-thumbs';

    for (let i = 0; i < STONE_COLORS.length; i++) {
      const btn = document.createElement('button');
      btn.className = `product-color-thumb cta-thumb${i === selectedIndex ? ' active' : ''}`;
      btn.style.background = STONE_COLORS[i].gradient;
      btn.setAttribute('aria-label', STONE_COLORS[i].name);
      ctaThumbs.appendChild(btn);
    }

    ctaSection.appendChild(ctaTitle);
    ctaSection.appendChild(ctaText);
    ctaSection.appendChild(ctaBtn);
    ctaSection.appendChild(ctaThumbs);
    page.appendChild(ctaSection);

    /* ====================================================================
     *  Mobile Sticky Bar
     * ==================================================================== */
    const stickyBar = document.createElement('div');
    stickyBar.className = 'product-sticky-bar';

    const stickyPrice = document.createElement('span');
    stickyPrice.className = 'sticky-price';
    stickyPrice.textContent = '$49.00';

    const stickyBtn = document.createElement('button');
    stickyBtn.className = 'btn sticky-cart-btn';
    stickyBtn.textContent = 'Add to Cart';

    stickyBar.appendChild(stickyPrice);
    stickyBar.appendChild(stickyBtn);
    page.appendChild(stickyBar);

    /* ====================================================================
     *  Interaction wiring
     * ==================================================================== */

    /* ---- Add-to-cart (per-button) ---- */
    function wireAddToCart(btn: HTMLButtonElement): void {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        const color = currentColor();
        addToCart({
          colorId: color.id,
          colorName: color.name,
          image: color.image,
          price: 49,
        });
        const original = btn.textContent;
        btn.textContent = 'Added ✓';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 2000);
      });
    }
    wireAddToCart(addToCartBtn);
    wireAddToCart(ctaBtn);
    wireAddToCart(stickyBtn);

    /* ---- Buy Now ---- */
    buyNowBtn.addEventListener('click', () => {
      const color = currentColor();
      trackEvent(analyticsEvents.buyNowClick, {
        source: 'product_detail',
        product_id: color.id,
        product_name: `${color.name} Stone Necklace`,
      });
      addToCart({
        colorId: color.id,
        colorName: color.name,
        image: color.image,
        price: 49,
      });
      window.dispatchEvent(new CustomEvent('toggle-cart'));
    });

    /* ---- Color selection ---- */
    const heroColorThumbs = colorThumbRow.querySelectorAll<HTMLButtonElement>(
      '.product-color-thumb',
    );
    const imageViewThumbs =
      imageThumbsRow.querySelectorAll<HTMLButtonElement>('.product-image-thumb');
    const chooseCards = chooseGrid.querySelectorAll<HTMLDivElement>('.choose-card');
    const ctaThumbEls = ctaThumbs.querySelectorAll<HTMLButtonElement>('.cta-thumb');

    function selectColor(index: number): void {
      selectedIndex = index;
      const color = getColor(index);

      /* Hero main image */
      renderGalleryView(mainImage, color, 0);

      /* Color info */
      colorNameEl.textContent = color.name;
      colorSubtitleEl.textContent = color.subtitle;

      /* Hero color thumbs */
      heroColorThumbs.forEach((t, i) => t.classList.toggle('active', i === index));

      /* Image view thumbs — reset to view 0, update gradients */
      imageViewThumbs.forEach((t, i) => {
        t.classList.toggle('active', i === 0);
        renderGalleryThumb(t, color, i);
      });

      /* Choose cards */
      chooseCards.forEach((t, i) => t.classList.toggle('active', i === index));

      /* Description */
      chooseDesc.textContent = color.description;

      /* CTA thumbs */
      ctaThumbEls.forEach((t, i) => t.classList.toggle('active', i === index));

      /* Daily wear image */
      wearImage.innerHTML = '';
      wearImage.appendChild(
        createGalleryImage(
          color.images.worn,
          `${color.name} Fifth Stone necklace worn as symbolic Eastern mythology jewelry`,
          'product-wear-image-el',
        ),
      );
    }

    heroColorThumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => selectColor(i));
    });

    chooseCards.forEach((card, i) => {
      card.addEventListener('click', () => selectColor(i));
    });

    ctaThumbEls.forEach((thumb, i) => {
      thumb.addEventListener('click', () => selectColor(i));
    });

    /* ---- Image view selection ---- */
    imageViewThumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const i = Number(thumb.dataset.view);
        if (Number.isNaN(i)) return;
        const color = currentColor();
        renderGalleryView(mainImage, color, i);
        imageViewThumbs.forEach((t) => t.classList.toggle('active', t === thumb));
      });
    });

    return page;
  },

  cleanup() {
    /* All timeouts are self-contained on their buttons; no global state to clear. */
  },
};

export default ProductPage;
