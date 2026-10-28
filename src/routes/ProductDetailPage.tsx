
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { productQuery } from "../queries/products";
import { useAddToCart } from "../features/cart/useCart";
import {
  EmptyState,
  ErrorState,
} from "../components/States";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const validId =
    Number.isInteger(productId) && productId > 0;

  const query = useQuery(
    productQuery(validId ? productId : 0),
  );

  const addMutation = useAddToCart();

  if (!validId) {
    return (
      <main className="container">
        <EmptyState
          title="Product not found"
          message="That product address is not valid."
        />
      </main>
    );
  }

  if (query.isLoading) {
    return (
      <main className="container">
        <div className="status">
          Loading product details…
        </div>
      </main>
    );
  }

  if (query.isError) {
    return (
      <main className="container">
        <ErrorState
          onRetry={() => void query.refetch()}
        />
      </main>
    );
  }

  if (!query.data) {
    return (
      <main className="container">
        <EmptyState
          title="Product not found"
          message="We couldn’t find this product."
        />
      </main>
    );
  }

  const product = query.data;

  return (
    <main className="container">
      <div style={{ paddingTop: 28 }}>
        <Link to="/" className="muted">
          ← Back to collection
        </Link>
      </div>

      <div className="detail-layout">
        <div className="detail-photo">
          <img
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
          />
        </div>

        <section className="detail-copy">
          <div className="eyebrow">
            {product.category}
          </div>

          <h1>{product.title}</h1>

          <div className="rating">
            ★ {product.rating.toFixed(1)} ·{" "}
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </div>

          <div className="detail-price">
            ${product.price.toFixed(2)}
          </div>

          <p>{product.description}</p>

          {product.brand && (
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
          )}

          <div className="detail-actions">
            <button
              className="button"
              disabled={
                addMutation.isPending || product.stock <= 0
              }
              onClick={() => addMutation.mutate(product)}
            >
              {addMutation.isPending
                ? "Adding…"
                : "Add to bag"}
            </button>

            <Link to="/cart" className="button secondary">
              View bag
            </Link>
          </div>

          {addMutation.isSuccess && (
            <p role="status">Added to your bag.</p>
          )}

          {addMutation.isError && (
            <p role="alert">
              Couldn’t add the item. Please try again.
            </p>
          )}

          <div className="muted">
            Secure demo checkout · Easy everyday essentials
          </div>
        </section>
      </div>
    </main>
  );
}
