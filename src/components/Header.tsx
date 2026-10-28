
import { Link, NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { cartQuery } from "../queries/cart";

export default function Header() {
  const { data = [] } = useQuery(cartQuery);

  const count = data.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          to="/"
          className="brand"
          aria-label="Form and Field home"
        >
          <span className="brand-mark">f.</span>
          <span>
            form & field
            <small>thoughtful everyday goods</small>
          </span>
        </Link>

        <nav className="nav-actions" aria-label="Main navigation">
          <NavLink className="nav-link" to="/">
            Shop all
          </NavLink>

          <Link className="cart-link" to="/cart">
            Bag
            <span className="cart-count">{count}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
