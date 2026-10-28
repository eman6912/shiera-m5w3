
import { queryOptions } from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  searchProducts,
} from "../api/products";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (page: number) =>
    [...productKeys.lists(), page] as const,
  searches: () => [...productKeys.all, "search"] as const,
  search: (query: string) =>
    [...productKeys.searches(), query] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) =>
    [...productKeys.details(), id] as const,
};

export const productsQuery = (page: number) =>
  queryOptions({
    queryKey: productKeys.list(page),
    queryFn: () => getProducts(page),
    staleTime: 60_000,
  });

export const searchProductsQuery = (query: string) =>
  queryOptions({
    queryKey: productKeys.search(query),
    queryFn: () => searchProducts(query),
    enabled: query.trim().length > 0,
    staleTime: 60_000,
  });

export const productQuery = (id: number) =>
  queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
    enabled: Number.isInteger(id) && id > 0,
    staleTime: 5 * 60_000,
  });
