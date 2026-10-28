
import { queryOptions } from "@tanstack/react-query";
import { getCart } from "../api/cart";

export const cartKey = ["cart"] as const;

export const cartQuery = queryOptions({
  queryKey: cartKey,
  queryFn: getCart,
  staleTime: Infinity,
});
