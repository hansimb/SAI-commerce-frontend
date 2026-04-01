# SAI-commerce-frontend

This repo has been originally made for Spectrum Audio Instruments  e-commerce frontend.

However this same project may be used and customized for any project, using shopify storefront API or other e-commerce backend.

Project architecture is inspired by clean architectural desgin. UI components and routes being content/data source agnostic. Data is coming form mock data or shopify storefront API.

## Structure

- `app/` Next.js application
- `docs/` project notes and planning docs
- `design-prototype/` early design material

## Data

- data source is selected with `NEXT_PUBLIC_DATA_SOURCE`
- supported values: `mock` or `shopify`
- Shopify content is loaded through Storefront API
- shared Shopify metaobject constants live in `app/src/data/shopify/metaobjects.ts`

## Main Shopify content

- `shared_brand_data`
- `shared_contact_data`
- `home_page`
- `products_page`
- `product_details_page`

## Env

Set these in `app/` env files:

```env
NEXT_PUBLIC_DATA_SOURCE=mock|shopify
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_API_VERSION=
SHOPIFY_STOREFRONT_PUBLIC_TOKEN=
```

## Commands

```bash
cd app
npm run dev
npm run lint
npm run build
```
