
import { Link, Outlet, Route, Routes } from "react-router";
import Header from "./components/Header";
import ProductsPage from "./routes/ProductsPage";
import ProductDetailPage from "./routes/ProductDetailPage";
import CartPage from "./routes/CartPage";

function Layout() {
  return (
    <>
      <Header />

      <Outlet />

      <footer className="site-footer">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span>© 2026 form & field</span>
          <span>
            Thoughtful everyday goods · A learning project
          </span>
        </div>
      </footer>
    </>
  );
}

function NotFound() {
  return (
    <main className="container">
      <div
        className="status"
        style={{ marginTop: 50 }}
      >
        <h2>We couldn’t find that page.</h2>

        <p>
          The page may have moved or the link may be incorrect.
        </p>

        <Link className="button" to="/">
          Back to the collection
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductsPage />} />

        <Route
          path="/products/:id"
          element={<ProductDetailPage />}
        />

        <Route path="/cart" element={<CartPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
