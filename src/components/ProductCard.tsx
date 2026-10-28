
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { Product } from "../api/products";
import { productQuery } from "../queries/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const queryClient = useQueryClient();

  function prefetchProduct() {
    void queryClient.prefetchQuery(productQuery(product.id));
  }

  return (
    <Link
      className="product-card"
      to={`/products/${product.id}`}
      onMouseEnter={prefetchProduct}
      onFocus={prefetchProduct}
      aria-label={`View ${product.title}`}
    >
      <div className="product-image">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <div className="category">{product.category}</div>

        <h3 className="product-name">{product.title}</h3>

        <div className="product-meta">
          <span className="price">
            ${product.price.toFixed(2)}
          </span>

          <span className="rating">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
