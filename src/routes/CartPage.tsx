
import { Link } from "react-router";
import {
  useCart,
  useRemoveFromCart,
} from "../features/cart/useCart";
import { EmptyState } from "../components/States";

export default function CartPage() {
  const { items, count, total } = useCart();
  const removeMutation = useRemoveFromCart();

  return (
    <main className="container">
      <div style={{ paddingTop: 40 }}>
        <div className="eyebrow">Your picks</div>

        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-.06em",
            margin: "10px 0 4px",
          }}
        >
          Your bag
        </h1>

        <p className="muted">
          {count} {count === 1 ? "item" : "items"} in your bag
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Your bag is taking a little break"
          message="Explore the collection and add something you like."
        >
          <Link to="/" className="button">
            Explore products
          </Link>
        </EmptyState>
      ) : (
        <div className="cart-layout">
          <section aria-label="Cart items">
            {items.map(({ product, quantity }) => (
              <article
                className="cart-item"
                key={product.id}
              >
                <img src={product.thumbnail} alt="" />

                <div className="cart-item-copy">
                  <h3>{product.title}</h3>

                  <div className="muted">
                    Qty {quantity}
                  </div>

                  <div
                    style={{ marginTop: 8, fontWeight: 800 }}
                  >
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeMutation.mutate(product.id)
                  }
                  disabled={removeMutation.isPending}
                >
                  Remove
                </button>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2 style={{ margin: 0 }}>
              Order summary
            </h2>

            <div className="summary-line">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-line total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="button full"
              onClick={() =>
                window.alert(
                  "This is a demo catalog. Checkout is not connected yet.",
                )
              }
            >
              Continue to checkout
            </button>

            <p
              className="muted"
              style={{ lineHeight: 1.6 }}
            >
              Demo checkout only. Your bag is saved in this
              browser.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
