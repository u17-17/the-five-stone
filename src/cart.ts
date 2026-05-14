export interface CartItem {
  colorId: string;
  colorName: string;
  image: string;
  price: number;
  quantity: number;
}

const STORAGE_KEY = 'fifth-stone-cart';

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
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
