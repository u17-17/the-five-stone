import './style.css';
import { initRouter } from './router';
import { getCart, removeFromCart, updateQuantity } from './cart';
import { PAIR_BUNDLE_PRICE, PAIR_BUNDLE_SIZE, PRODUCT_PRICE, SUPPORT_EMAIL } from './siteConfig';
import { initAnalytics } from './lib/analytics';

function initApp() {
  const app = document.getElementById('app')!;
  app.innerHTML = '';

  document.addEventListener('page-rendered', () => {
    if (!app.querySelector('.site-footer')) {
      import('./components/Footer').then(m => {
        app.appendChild(m.renderFooter());
      });
    }
  });

  /* ---- Cart drawer ---- */
  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cart-overlay';

  const drawer = document.createElement('div');
  drawer.className = 'cart-drawer';
  drawer.id = 'cart-drawer';
  drawer.innerHTML = `
    <div class="cart-drawer-header">
      <h2>Your Cart</h2>
      <button class="cart-close-btn" id="cart-close-btn" aria-label="Close cart">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="cart-drawer-items" id="cart-items"></div>
    <div class="cart-drawer-footer">
      <div class="cart-summary-card" aria-label="Cart summary">
        <div class="cart-pair-promo" id="cart-pair-promo" role="status" aria-live="polite"></div>
        <div class="cart-total">
          <span class="cart-total-label">
            <span id="cart-total-title">Cart subtotal</span>
            <small id="cart-total-note">Before checkout confirmation</small>
          </span>
          <strong id="cart-total-price">$0.00</strong>
        </div>
      </div>
      <button class="btn cart-checkout-btn" id="cart-checkout-btn">Checkout</button>
      <p class="cart-checkout-note" id="cart-checkout-note" hidden></p>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  const itemsContainer = drawer.querySelector('#cart-items')!;
  const totalPriceEl = drawer.querySelector('#cart-total-price')!;
  const totalTitleEl = drawer.querySelector('#cart-total-title') as HTMLElement | null;
  const totalNoteEl = drawer.querySelector('#cart-total-note') as HTMLElement | null;
  const pairPromoEl = drawer.querySelector('#cart-pair-promo') as HTMLElement | null;
  const checkoutNote = drawer.querySelector('#cart-checkout-note') as HTMLElement | null;

  function renderCartItem(item: ReturnType<typeof getCart>[number]): HTMLElement {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.colorName} Stone" class="cart-item-image" width="1086" height="1448" loading="lazy">
      <div class="cart-item-info">
        <h4>${item.colorName} Stone</h4>
        <p>$${item.price.toFixed(2)}</p>
        <div class="cart-item-actions">
          <button class="cart-qty-btn" data-cart-dec="${item.colorId}">−</button>
          <span class="cart-qty">${item.quantity}</span>
          <button class="cart-qty-btn" data-cart-inc="${item.colorId}">+</button>
          <button class="cart-item-remove" data-cart-remove="${item.colorId}">Remove</button>
        </div>
      </div>
      <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    return el;
  }

  function refreshCart(): void {
    const items = getCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const pairCount = Math.floor(itemCount / PAIR_BUNDLE_SIZE);
    const pairDiscount = (PRODUCT_PRICE * PAIR_BUNDLE_SIZE) - PAIR_BUNDLE_PRICE;
    if (pairPromoEl) {
      pairPromoEl.classList.toggle('unlocked', itemCount >= PAIR_BUNDLE_SIZE);
      if (itemCount === 0) {
        pairPromoEl.textContent =
          `Choose any ${PAIR_BUNDLE_SIZE} stones to unlock the $${PAIR_BUNDLE_PRICE}.00 pair offer.`;
      } else if (itemCount < PAIR_BUNDLE_SIZE) {
        pairPromoEl.textContent =
          `Add ${PAIR_BUNDLE_SIZE - itemCount} more stone to unlock the $${PAIR_BUNDLE_PRICE}.00 pair offer.`;
      } else {
        pairPromoEl.textContent =
          `Pair offer ready: any ${PAIR_BUNDLE_SIZE} stones for $${PAIR_BUNDLE_PRICE}.00. Checkout pricing is being connected.`;
      }
    }
    if (items.length === 0) {
      itemsContainer.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><p class="cart-empty-subtext">Choose a stone that speaks to you.</p></div>';
      if (totalTitleEl) totalTitleEl.textContent = 'Cart subtotal';
      if (totalNoteEl) totalNoteEl.textContent = 'Before checkout confirmation';
      totalPriceEl.textContent = '$0.00';
      return;
    }
    itemsContainer.innerHTML = '';
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity;
      itemsContainer.appendChild(renderCartItem(item));
    }
    if (pairCount > 0) {
      const estimatedOfferTotal = total - (pairDiscount * pairCount);
      if (totalTitleEl) totalTitleEl.textContent = 'Estimated pair subtotal';
      if (totalNoteEl) totalNoteEl.textContent = 'Offer shown before checkout confirmation';
      totalPriceEl.innerHTML = `
        <span class="cart-total-original">$${total.toFixed(2)}</span>
        <span class="cart-total-offer">$${estimatedOfferTotal.toFixed(2)}</span>
      `;
    } else {
      if (totalTitleEl) totalTitleEl.textContent = 'Cart subtotal';
      if (totalNoteEl) totalNoteEl.textContent = 'Before checkout confirmation';
      totalPriceEl.textContent = `$${total.toFixed(2)}`;
    }
  }

  function openCart(): void {
    refreshCart();
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart(): void {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---- Cart event wiring ---- */
  window.addEventListener('toggle-cart', () => {
    if (drawer.classList.contains('open')) {
      closeCart();
    } else {
      openCart();
    }
  });

  window.addEventListener('cart-updated', refreshCart);

  overlay.addEventListener('click', closeCart);
  drawer.querySelector('#cart-close-btn')?.addEventListener('click', closeCart);

  itemsContainer.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const dec = target.dataset.cartDec;
    const inc = target.dataset.cartInc;
    const remove = target.dataset.cartRemove;
    if (dec) updateQuantity(dec, -1);
    else if (inc) updateQuantity(inc, 1);
    else if (remove) removeFromCart(remove);
  });

  drawer.querySelector('#cart-checkout-btn')?.addEventListener('click', () => {
    if (!checkoutNote) return;
    checkoutNote.hidden = false;
    checkoutNote.textContent =
      `Checkout is being connected. For order help, contact ${SUPPORT_EMAIL}.`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAnalytics();
  initApp();
  initRouter();
});
