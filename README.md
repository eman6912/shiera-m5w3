# Form & Field — Product Catalog

A responsive product catalog built with React, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS, and DummyJSON.

## Features

- Paginated product listing with the page in the URL
- Product search
- Product detail pages
- Hover and keyboard-focus prefetching
- Shopping cart stored in localStorage
- DummyJSON POST request when adding a product
- Optimistic cart updates with rollback
- Loading, error, empty, and not-found states
- Cart count and total calculation
- TanStack Query Devtools
- Responsive design
- Vercel SPA rewrite configuration

## Requirements

- Node.js
- pnpm

## Run locally

```bash
pnpm install
pnpm dev
```

## Build for production

```bash
pnpm build
pnpm preview
```

## API

This project uses the DummyJSON Products API.

https://dummyjson.com/docs/products

DummyJSON simulates write requests. The cart is saved in localStorage so that it persists in the browser.

## Deployment

Import the project repository into Vercel. The included vercel.json file supports client-side routes.
