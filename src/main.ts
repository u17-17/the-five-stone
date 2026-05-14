import './style.css';
import { initRouter } from './router';
import { getCart, removeFromCart, updateQuantity } from './cart';
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
      <div class="cart-total">
        <span>Total</span>
        <span id="cart-total-price">$0.00</span>
      </div>
      <button class="btn cart-checkout-btn" id="cart-checkout-btn">Checkout</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  const itemsContainer = drawer.querySelector('#cart-items')!;
  const totalPriceEl = drawer.querySelector('#cart-total-price')!;

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
    if (items.length === 0) {
      itemsContainer.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><p style="margin-top:8px;font-size:0.85rem;">Choose a stone that speaks to you.</p></div>';
      totalPriceEl.textContent = '$0.00';
      return;
    }
    itemsContainer.innerHTML = '';
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity;
      itemsContainer.appendChild(renderCartItem(item));
    }
    totalPriceEl.textContent = `$${total.toFixed(2)}`;
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
    alert('Thank you! Checkout will be available soon.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAnalytics();
  initApp();
  initRouter();
});
