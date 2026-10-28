
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import ProductCard from "../components/ProductCard";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../components/States";
import {
  productsQuery,
  searchProductsQuery,
} from "../queries/products";

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);

  const [searchInput, setSearchInput] = useState(
    params.get("q") ?? "",
  );
  const [search, setSearch] = useState(
    params.get("q") ?? "",
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const value = searchInput.trim();
      setSearch(value);

      const next = new URLSearchParams(
        window.location.search,
      );

      if (value) {
        next.set("q", value);
      } else {
        next.delete("q");
      }

      next.delete("page");
      setParams(next, { replace: true });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput, setParams]);

  const isSearching = search.length > 0;

  const listQuery = useQuery({
    ...productsQuery(page),
    enabled: !isSearching,
    placeholderData: (previous) => previous,
  });

  const searchQuery = useQuery({
    ...searchProductsQuery(search),
    enabled: isSearching,
  });

  const active = isSearching ? searchQuery : listQuery;
  const products = active.data?.products ?? [];
  const total = active.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / 12));

  function changePage(nextPage: number) {
    const next = new URLSearchParams(params);
    next.set("page", String(nextPage));
    setParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-panel">
          <div>
            <div className="eyebrow">
              A little better, every day
            </div>

            <h1>
              Good things for
              <br />
              everyday living.
            </h1>

            <p>
              Useful, considered pieces for your home and
              routine. Find something you’ll love using.
            </p>
          </div>

          <label className="search-box">
            <span aria-hidden="true">⌕</span>

            <input
              value={searchInput}
              onChange={(event) =>
                setSearchInput(event.target.value)
              }
              placeholder="Search products…"
              aria-label="Search products"
            />

            {searchInput && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchInput("")}
              >
                ×
              </button>
            )}
          </label>
        </div>
      </section>

      <main className="container">
        <div className="section-row">
          <h2>
            {isSearching
              ? `Results for “${search}”`
              : "Shop the collection"}
          </h2>

          <span className="muted">
            {active.isLoading ? "Loading…" : `${total} items`}
          </span>
        </div>

        {active.isLoading ? (
          <LoadingState />
        ) : active.isError ? (
          <ErrorState
            onRetry={() => void active.refetch()}
          />
        ) : products.length === 0 ? (
          <EmptyState
            title="No products found"
            message="Try another search term."
          />
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {!isSearching &&
          !active.isError &&
          !active.isLoading &&
          total > 0 && (
            <div className="pagination">
              <button
                onClick={() => changePage(page - 1)}
                disabled={page <= 1}
              >
                ← Previous
              </button>

              <span className="muted">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => changePage(page + 1)}
                disabled={page >= totalPages}
              >
                Next →
              </button>
            </div>
          )}
      </main>
    </>
  );
}
