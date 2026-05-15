import { PRODUCT_PRICE } from './siteConfig';

export interface CartItem {
  colorId: string;
  colorName: string;
  image: string;
  price: number;
  quantity: number;
}

const STORAGE_KEY = 'fifth-stone-cart';

function normalizeCartItem(item: Partial<CartItem>): CartItem | null {
  if (!item.colorId || !item.colorName || !item.image) return null;

  return {
    colorId: item.colorId,
    colorName: item.colorName,
    image: item.image,
    price: PRODUCT_PRICE,
    quantity:
      typeof item.quantity === 'number' && Number.isFinite(item.quantity) && item.quantity > 0
        ? item.quantity
        : 1,
  };
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item: Partial<CartItem>) => normalizeCartItem(item))
      .filter((item): item is CartItem => Boolean(item));
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  const count = items.reduce((s, i) => s + i.quantity, 0);
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count } }));
}

export function addToCart(item: Omit<CartItem, 'quantity'>): void {
  const items = readCart();
  const existing = items.find(i => i.colorId === item.colorId);
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...item, quantity: 1 });
  }
  writeCart(items);
}

export function removeFromCart(colorId: string): void {
  writeCart(readCart().filter(i => i.colorId !== colorId));
}

export function updateQuantity(colorId: string, delta: number): void {
  const items = readCart();
  const item = items.find(i => i.colorId === colorId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(colorId);
    return;
  }
  writeCart(items);
}

export function clearCart(): void {
  writeCart([]);
}

export function getCart(): CartItem[] {
  return readCart();
}
