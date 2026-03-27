# Data Notes

## Basic idea

- pages and components should not know where data comes from
- loaders choose the source
- source is either `mock` or `shopify`

## Source switch

- `src/data/source.ts` reads `NEXT_PUBLIC_DATA_SOURCE`
- if value is `mock`, loaders return mock data
- if value is `shopify`, loaders fetch from Storefront API

## Structure

- `src/data/loaders/*`
  shared layout/support loaders
- `src/data/mock/*`
  local mock content
- `src/data/products/products-page.ts`
  `/products` route data loading
- `src/data/products/product-detail-page.ts`
  `/products/[slug]` route data loading
- `src/data/products/mappers.ts`
  converts raw Shopify/mock product data into shared product domain types
- `src/data/shopify/*`
  Storefront API client + Shopify response types

## Current products model

Use one shared product base model:

- `ProductSummary`

This is the common shape for:

- mock product list data
- Shopify product list data
- base product data used by the product detail page

`ProductSummary` contains only the reusable product basics:

- slug
- category
- title
- subtitle
- description
- image
- price
- specs

The detail page adds two separate pieces on top of that:

- `detail`
  page-specific content like highlights and extra specs sections
- `customization`
  customization card content

So the detail page shape is:

- `product`
- `detail`
- `customization`
- `ctaLabel`

## Products page flow

`getProductsPageData()` in `src/data/products/products-page.ts` does this:

1. checks active source
2. if `mock`: returns local products mock data
3. if `shopify`: fetches one `products_page` metaobject

The `products_page` metaobject gives:

- intro text block via `products_intro_text_content_block`
- curated product list via `products_list`

Important:

- `products_list` only gives product references
- product references do not automatically include all product metafields
- needed product metafields must be explicitly queried inside the `Product` selection

Current product list query also asks each product for:

- native product fields:
  `title`, `handle`, `description`, `productType`, `featuredImage`, `priceRange`
- custom metafields:
  `custom.product_card_specs_list`
  `custom.product_subtitle`

## Why mappers exist

Shopify response shape is still too raw to use directly.

Mappers exist to convert:

- Shopify response -> `ProductSummary`
- mock data -> `ProductSummary`

The goal is not to create many UI-only shapes.
The goal is to keep one small shared domain shape and map into that.

## Route split

Products list and product detail are intentionally separate now.

- `products-page.ts`
  owns `/products`
- `product-detail-page.ts`
  owns `/products/[slug]`

This is easier to reason about than one large `products` loader file.

## Current limitation

- products list uses Shopify
- product detail page still uses mock data in shopify mode
