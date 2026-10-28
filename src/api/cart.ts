
import type { Product } from "./products";
import { request } from "./http";

const CART_STORAGE_KEY = "form-field-cart";

export type CartItem = {
  product: Product;
  quantity: number;
};

type DummyCartResponse = {
  id: number;
  userId: number;
  products: {
    id: number;
    quantity: number;
  }[];
};

export function getCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): CartItem[] {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  return items;
}

export async function addToCart(
  product: Product,
): Promise<CartItem[]> {
  await request<DummyCartResponse>(
    "https://dummyjson.com/carts/add",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        products: [{ id: product.id, quantity: 1 }],
      }),
    },
  );

  const current = getCart();
  const existing = current.find(
    (item) => item.product.id === product.id,
  );

  const next = existing
    ? current.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    : [...current, { product, quantity: 1 }];

  return saveCart(next);
}

export function removeFromCart(productId: number): CartItem[] {
  const next = getCart().filter(
    (item) => item.product.id !== productId,
  );

  return saveCart(next);
}
