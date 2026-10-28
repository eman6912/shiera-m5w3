
import { request } from "./http";

const BASE_URL = "https://dummyjson.com";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
};

export type ProductListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export function getProducts(
  page: number,
  limit = 12,
): Promise<ProductListResponse> {
  const skip = (page - 1) * limit;

  return request<ProductListResponse>(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`,
  );
}

export function searchProducts(
  query: string,
): Promise<ProductListResponse> {
  return request<ProductListResponse>(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=100`,
  );
}

export function getProduct(id: number): Promise<Product> {
  return request<Product>(`${BASE_URL}/products/${id}`);
}
