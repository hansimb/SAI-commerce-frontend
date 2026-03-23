# Shopify Data and API Management

Date updated: 2026-03-24

Status:

- active plan
- current project direction

---

## 1. What This Means In Practice

This project uses Shopify as the source of commerce data and merchant-managed custom content.

The workflow is:

- schema is defined in this repo
- schema is created in Shopify through Admin API scripts
- merchant edits content in Shopify admin UI
- loaders map Shopify data into frontend component data

In short:

- Shopify = content and commerce building blocks
- loaders = transform Shopify data into component-ready frontend data
- components = render app-specific typed data, not raw Shopify responses

---

## 2. What Lives Where

### In Shopify native product data

Keep basic commerce data in native Shopify product fields whenever possible.

Examples:

- title
- handle
- description
- price
- variants
- images

Shopify docs:

- https://shopify.dev/docs/apps/build/custom-data/metafields
- https://shopify.dev/docs/apps/build/metaobjects

### In Shopify custom data

Put merchant-editable presentation data into metafields and metaobjects.

Examples:

- product page component content
- highlights
- key specs
- customization card content
- references between product and page objects

Only put custom data in metafields/metaobjects if the merchant needs to edit it there.

### In this repo

This repo stores:

- schema definitions
- API scripts
- GraphQL queries
- loaders
- frontend types

This repo does not store Shopify as the live source of truth for merchant content.

It stores the shape and logic around that content.

---

## 3. Decided Architecture

These are the current project decisions.

### 3.1 Schema as code

Metafield definitions and metaobject definitions should be managed from this repo, not manually clicked into Shopify one by one.

That means:

- definitions are designed in code
- Admin API scripts create or update them
- setup should be repeatable

Shopify docs:

- MetafieldDefinition:
  https://shopify.dev/docs/api/admin-graphql/latest/objects/MetafieldDefinition
- metaobjectDefinitionCreate:
  https://shopify.dev/docs/api/admin-graphql/2024-04/mutations/metaobjectDefinitionCreate

### 3.2 Merchant edits content in Shopify admin

Once schema exists, merchant-managed content should be edited in Shopify admin UI.

That means:

- no developer needed for normal content changes
- naming must stay clear
- content objects must be understandable in admin lists

Shopify docs:

- https://shopify.dev/docs/apps/build/metaobjects

### 3.3 Loaders shape frontend data

This is already the project pattern and remains the plan going forward.

Loaders:

- fetch Shopify data
- combine native product data and custom content
- map it into frontend-friendly shapes

Components should receive data that matches the UI, not raw Shopify structures.

This is how the app stays maintainable even if Shopify data is more "lego-like".

---

## 4. Naming Rule

Shopify has no real folder structure for these definitions, so naming is the structure.

That means naming must be systematic.

Use prefixes like:

- `component_`
- `page_`
- `global_`

Examples:

- `component_text_content_block`
- `component_product_hero`
- `component_large_image`
- `component_key_specs`
- `component_highlights`
- `component_customization_card`
- `page_product`

Shopify docs:

- https://shopify.dev/docs/apps/build/custom-data/metafields

---

## 5. API Split

### Admin API

Use Shopify Admin GraphQL API for:

- creating definitions
- creating metaobject entries
- updating metaobject entries
- linking products to page objects
- seeding initial content
- bulk content operations if needed

Shopify docs:

- https://shopify.dev/docs/api/admin-graphql/latest
- https://shopify.dev/docs/api/admin-graphql/2023-01/mutations/metaobjectCreate
- https://shopify.dev/docs/api/admin-graphql/2025-07/mutations/metaobjectupsert
- https://shopify.dev/docs/api/admin-graphql/2024-10/mutations/metafieldsSet
- https://shopify.dev/api/usage/bulk-operations/imports

### Storefront API

Use Shopify Storefront API for storefront reads.

Shopify docs:

- https://shopify.dev/docs/api/storefront

---

## 6. Core Docs

- Metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields
- Metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects
- Admin GraphQL API:
  https://shopify.dev/docs/api/admin-graphql/latest
- Storefront API:
  https://shopify.dev/docs/api/storefront
- MetafieldDefinition:
  https://shopify.dev/docs/api/admin-graphql/latest/objects/MetafieldDefinition
- metaobjectDefinitionCreate:
  https://shopify.dev/docs/api/admin-graphql/2024-04/mutations/metaobjectDefinitionCreate
- metaobjectCreate:
  https://shopify.dev/docs/api/admin-graphql/2023-01/mutations/metaobjectCreate
- metaobjectUpsert:
  https://shopify.dev/docs/api/admin-graphql/2025-07/mutations/metaobjectupsert
- metafieldsSet:
  https://shopify.dev/docs/api/admin-graphql/2024-10/mutations/metafieldsSet
- Bulk imports:
  https://shopify.dev/api/usage/bulk-operations/imports
