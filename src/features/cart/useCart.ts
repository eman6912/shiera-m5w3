
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addToCart,
  removeFromCart,
  type CartItem,
} from "../../api/cart";
import type { Product } from "../../api/products";
import { cartKey, cartQuery } from "../../queries/cart";

export function useCart() {
  const query = useQuery(cartQuery);
  const items = query.data ?? [];

  return {
    ...query,
    items,
    count: items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    ),
    total: items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ),
  };
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) => addToCart(product),

    onMutate: async (product) => {
      await queryClient.cancelQueries({
        queryKey: cartKey,
      });

      const previous =
        queryClient.getQueryData<CartItem[]>(cartKey) ?? [];

      const existing = previous.find(
        (item) => item.product.id === product.id,
      );

      const optimistic = existing
        ? previous.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...previous, { product, quantity: 1 }];

      queryClient.setQueryData(cartKey, optimistic);

      return { previous };
    },

    onError: (_error, _product, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cartKey, context.previous);
      }
    },

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: cartKey,
      }),
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) =>
      removeFromCart(productId),

    onMutate: async (productId) => {
      await queryClient.cancelQueries({
        queryKey: cartKey,
      });

      const previous =
        queryClient.getQueryData<CartItem[]>(cartKey) ?? [];

      queryClient.setQueryData(
        cartKey,
        previous.filter(
          (item) => item.product.id !== productId,
        ),
      );

      return { previous };
    },

    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cartKey, context.previous);
      }
    },

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: cartKey,
      }),
  });
}
