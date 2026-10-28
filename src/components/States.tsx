
import type { ReactNode } from "react";

export function LoadingState({
  label = "Loading products…",
}: {
  label?: string;
}) {
  return (
    <div className="product-grid" aria-label={label}>
      {Array.from({ length: 8 }, (_, index) => (
        <div className="product-card" key={index}>
          <div className="product-image skeleton" />

          <div className="product-info">
            <div
              className="skeleton"
              style={{
                height: 10,
                width: "45%",
                borderRadius: 5,
              }}
            />

            <div
              className="skeleton"
              style={{
                height: 16,
                margin: "12px 0",
                borderRadius: 5,
              }}
            />

            <div
              className="skeleton"
              style={{
                height: 16,
                width: "55%",
                borderRadius: 5,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div className="status" role="alert">
      <h2>That didn’t load.</h2>
      <p>Check your connection and try again.</p>
      <button className="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

export function EmptyState({
  title,
  message,
  children,
}: {
  title: string;
  message: string;
  children?: ReactNode;
}) {
  return (
    <div className="status">
      <h2>{title}</h2>
      <p>{message}</p>
      {children}
    </div>
  );
}
