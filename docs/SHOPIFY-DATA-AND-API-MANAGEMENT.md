# Shopify Data and API Management Plan

Date created: 2026-03-24

Status:

- draft
- planning document
- intended as a practical recommendation set, not final locked architecture

Purpose:

- define how content and data should be organized in Shopify
- define how the frontend should communicate with Shopify
- define what should be managed manually in admin and what should be automated through API
- define a maintainable workflow where the merchant can update content without developer help

---

## 1. Main Goal

The goal is not just to "connect Shopify".

The real goal is:

- stable data model
- understandable naming
- predictable API integration
- repeatable schema setup
- merchant-editable content

This project should avoid two common problems:

1. Shopify admin turns into an unstructured pile of metafields and metaobjects
2. Frontend code becomes tightly coupled to random Shopify field names

So the plan must separate:

- schema management
- content management
- frontend data mapping
- operational workflows

---

## 2. Core Principles

### 2.1 Native Shopify first

If Shopify already has a native field for something important, prefer that first.

Examples:

- product title
- handle
- description
- price
- variants
- product media
- availability

Do not duplicate native commerce data into custom objects unless there is a clear reason.

Shopify docs:

- About metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields
- About metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects

### 2.2 Custom data for structured presentation

Use metafields and metaobjects for structured custom content and references beyond native product fields.

Typical use cases include:

- page-specific storytelling data
- reusable component-shaped content
- product customization content
- references between product and page content

Shopify docs:

- About metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields
- About metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects

### 2.3 Schema should be automated

Creating definitions manually in the Shopify UI does not scale well once the schema grows. Shopify provides Admin GraphQL support for creating and managing metafield and metaobject definitions programmatically.

Definitions should be:

- designed once
- stored in repo
- created or updated through the Admin API

Shopify docs:

- MetafieldDefinition:
  https://shopify.dev/docs/api/admin-graphql/latest/objects/MetafieldDefinition
- metaobjectDefinitionCreate:
  https://shopify.dev/docs/api/admin-graphql/2024-04/mutations/metaobjectDefinitionCreate
- metaobjectCreate:
  https://shopify.dev/docs/api/admin-graphql/2023-01/mutations/metaobjectCreate

### 2.4 Content should be editable in Shopify admin

After schema exists, the merchant should be able to edit entries in Shopify admin without needing a developer.

That means:

- clear labels
- clear naming
- minimal ambiguity
- no random `field_1` or `section_7`

Shopify docs:

- About metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects

### 2.5 Frontend should map Shopify data into app-specific view models

The frontend should not spread raw Shopify naming everywhere.

Recommended pattern:

- Shopify API fetchers retrieve raw data
- loaders map raw Shopify data into typed frontend data
- components render only typed frontend data

This is a project recommendation, not a Shopify rule.

---

## 3. Recommended Conceptual Data Layers

For this project, product-related content should be thought of as three layers.

### 3.1 Product basic data

Source:

- native Shopify product fields
- optionally a few simple product metafields

Contains:

- title
- subtitle if needed
- description
- price
- featured media
- card specs if those are truly product-level facts

### 3.2 Product page data

Source:

- product metafield referencing a `page_product` metaobject

Contains:

- hero content if not native
- large image section content
- key specs section content
- highlights section content
- horizontal and vertical detail sections

### 3.3 Product customization data

Source:

- product metafield referencing a customization metaobject or a page sub-reference

Contains:

- customization card title
- image
- option groups
- options

Shopify docs:

- About metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields
- About metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects

---

## 4. Recommended Shopify Modeling Strategy

At a high level, the simplest manageable approach seems to be:

- component-shaped metaobjects
- page-shaped metaobjects that reference components
- products reference pages through product metafields

In other words:

- component = one structured object
- page = composition object
- product = native commerce object + reference to page object

This is close to the frontend mental model and makes Shopify naming easier to keep under control.

### Why this is attractive

- clear 1:1 mapping between frontend component concepts and Shopify content objects
- easy to reason about in admin lists
- page composition is explicit
- easier to migrate than one giant all-in-one product metaobject

### Risk to watch

If taken too far, this can create too many tiny metaobject definitions.

So this approach should be used with discipline:

- one metaobject per meaningful component type
- not one metaobject per tiny UI helper

Shopify docs:

- About metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects
- About metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields

---

## 5. Recommended Naming Strategy

Because Shopify doesn't provide a true folder structure for metafield definitions and metaobject definitions in admin, naming effectively becomes the organizing structure.

This is the most important governance rule in the whole system.

### 5.1 Prefix by role

Recommended prefixes:

- `component_`
- `page_`
- `template_` if needed later
- `global_` for shared site-wide content if needed later

Examples:

- `component_text_content_block`
- `component_product_hero`
- `component_large_image`
- `component_key_specs`
- `component_highlights`
- `component_customization_card`
- `component_image_specs_horizontal`
- `component_image_specs_vertical`
- `page_product`

This works well in Shopify admin lists because definitions and entries are primarily discovered and scanned by label, type, and name rather than folder hierarchy.

### 5.2 Use stable machine names

Recommended style:

- lowercase
- snake_case
- no instance numbers unless truly semantic
- no vague suffixes like `_new`, `_test`, `_final`

Bad:

- `component_x`
- `page_x_x`
- `hero2`
- `custom_stuff`

Good:

- `component_product_hero`
- `component_highlights`
- `page_product`

### 5.3 Admin labels should be human-readable

Recommended admin labels:

- `Component / Product hero`
- `Component / Large image`
- `Component / Key specs`
- `Component / Highlights`
- `Component / Customization card`
- `Page / Product`

The merchant should understand these without looking at code.

### 5.4 Metafield namespace and key should also be structured

Recommended namespace:

- `sai`

Recommended keys:

- `page_product`
- `page_home`
- `page_articles`

Examples:

- `sai.page_product`

This makes product-level references easy to locate, and aligns with Shopify's namespace/key metafield model.

Shopify docs:

- About metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields

---

## 6. Merchant-Owned vs App-Owned Custom Data

This is an important decision area.

There are two main directions in Shopify custom data ownership models:

### Option A: Merchant-owned definitions and entries

Pros:

- simpler mental model inside Shopify admin
- merchant has direct control
- easier to inspect and edit manually

Cons:

- less control over schema ownership
- more risk of manual drift if definitions are edited casually

### Option B: App-owned definitions

Pros:

- stronger ownership and control
- more predictable schema management
- safer for automation

Cons:

- slightly more app-centric mental model
- may feel more technical depending on how setup is done

### Working recommendation for this project

For a merchant-managed storefront with a custom frontend, consider this split:

- product and page content entries should remain merchant-editable
- schema creation should still be automated by app/scripts
- ownership choice should be decided after testing one real setup flow

This decision should be made deliberately, not accidentally.

Things to compare before locking it:

- admin usability
- token and app setup complexity
- long-term portability
- how strictly schema drift must be prevented

Shopify docs:

- About metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields
- About metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects

---

## 7. Recommended API Architecture

The Shopify Admin GraphQL API should be used for schema and content management automation.

The Shopify Storefront API should be used for storefront reads if it provides the needed data shape efficiently.

In practice, this project likely needs both:

- Admin API for setup, schema, seeding, maintenance scripts
- Storefront API for public storefront rendering

Potential exception:

- early development can temporarily use Admin API for prototyping if it speeds up iteration
- production storefront reads should still be reviewed carefully with access, security, and data shape in mind

Shopify docs:

- Admin GraphQL API reference:
  https://shopify.dev/docs/api/admin-graphql/latest
- Storefront API reference:
  https://shopify.dev/docs/api/storefront

### 7.1 Admin API responsibilities

Use Admin GraphQL API for:

- create metafield definitions
- create metaobject definitions
- update definitions when schema evolves
- create and update metaobject entries
- set product metafields linking products to page objects
- bulk import large content sets

Shopify docs:

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
- bulkOperationRunMutation:
  https://shopify.dev/docs/api/admin-graphql/2024-04/mutations/bulkOperationRunMutation

### 7.2 Storefront API responsibilities

Use Storefront API for public storefront reads such as:

- reading native product commerce data
- reading published content needed on the storefront
- product pages and collection pages
- cart and commerce flows

Shopify docs:

- Storefront API reference:
  https://shopify.dev/docs/api/storefront

### 7.3 Frontend integration layers

Recommended internal architecture:

1. `shopify/admin/`
   - Admin API clients
   - schema scripts
   - seed scripts
2. `shopify/storefront/`
   - Storefront API queries
   - storefront mapping helpers
3. `src/data/loaders/`
   - app-specific data mapping for routes/pages
4. `src/types/`
   - frontend view model types

This keeps setup automation separate from runtime storefront reads.

This is a project recommendation, not a Shopify requirement.

---

## 8. Recommended Operational Split

### 8.1 What should be created by script

These should be automated:

- metafield definitions
- metaobject definitions
- initial required content objects for a new store
- pinning product metafields in admin
- optional seed content for development

Shopify docs:

- metaobjectCreate:
  https://shopify.dev/docs/api/admin-graphql/2023-01/mutations/metaobjectCreate
- metaobjectUpsert:
  https://shopify.dev/docs/api/admin-graphql/2025-07/mutations/metaobjectupsert
- Bulk import data with the GraphQL Admin API:
  https://shopify.dev/api/usage/bulk-operations/imports
- metafieldDefinitionPin:
  https://shopify.dev/docs/api/admin-graphql/2023-10/mutations/metafielddefinitionpin

### 8.2 What should be edited in admin UI

These should usually be merchant-managed:

- page content
- highlights
- text blocks
- customization options
- page component references

### 8.3 What should remain developer-managed

These should stay in code:

- GraphQL queries
- schema bootstrap scripts
- data mapping logic
- validation logic in loaders
- fallback behavior when content is missing

---

## 9. Recommended Implementation Phases

### Phase 1: Naming and schema design

Decide and freeze:

- all component type names
- all page type names
- all metafield namespace/key names
- all field keys inside definitions

Output:

- one schema spec file in repo

### Phase 2: Schema bootstrap automation

Build a script that:

- authenticates to Shopify Admin API
- creates missing metafield definitions
- creates missing metaobject definitions
- optionally checks for incompatible schema drift
- pins important metafield definitions

Output:

- repeatable setup command for a new store or environment

Shopify docs:

- Generate access tokens for custom apps in the Shopify admin:
  https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/generate-app-access-tokens-admin
- MetafieldDefinition:
  https://shopify.dev/docs/api/admin-graphql/latest/objects/MetafieldDefinition
- metaobjectDefinitionCreate:
  https://shopify.dev/docs/api/admin-graphql/2024-04/mutations/metaobjectDefinitionCreate
- metafieldDefinitionPin:
  https://shopify.dev/docs/api/admin-graphql/2023-10/mutations/metafielddefinitionpin

### Phase 3: Seed content

Build a script that:

- creates example component entries
- creates example `page_product` entries
- links products to pages through product metafields

Output:

- a store that is usable without manual clicking of every object

Shopify docs:

- metaobjectCreate:
  https://shopify.dev/docs/api/admin-graphql/2023-01/mutations/metaobjectCreate
- metaobjectUpsert:
  https://shopify.dev/docs/api/admin-graphql/2025-07/mutations/metaobjectupsert
- metafieldsSet:
  https://shopify.dev/docs/api/admin-graphql/2024-10/mutations/metafieldsSet

### Phase 4: Frontend runtime integration

Build read paths that:

- fetch product basic data
- fetch referenced page metaobject references
- fetch referenced component metaobjects
- map into frontend types

Output:

- production-ready loaders replacing mock product data

Shopify docs:

- About metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields
- About metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects
- Storefront API reference:
  https://shopify.dev/docs/api/storefront

### Phase 5: Validation and editor rules

Add safeguards:

- missing reference handling
- required field checks
- logging and diagnostics for broken page setups
- optional preview validation tooling later

---

## 10. Recommended Script Inventory

The repo will likely benefit from scripts like these:

- `shopify:schema:bootstrap`
- `shopify:schema:check`
- `shopify:seed:products`
- `shopify:seed:pages`
- `shopify:seed:customization`

Possible future scripts:

- `shopify:sync:pull`
- `shopify:sync:validate`
- `shopify:content:audit`

The important idea is:

- schema scripts and content seed scripts should be separate

This is a project recommendation.

---

## 11. Suggested Repo Organization

One possible future organization:

```text
app/
  shopify/
    admin/
      client.ts
      mutations/
      schema/
      scripts/
    storefront/
      client.ts
      queries/
      mappers/
  src/
    data/
      loaders/
    types/
```

Suggested responsibilities:

- `shopify/admin/schema/`
  - schema definitions as code
- `shopify/admin/scripts/`
  - bootstrap and seed commands
- `shopify/storefront/queries/`
  - public storefront GraphQL queries
- `shopify/storefront/mappers/`
  - convert Shopify response into frontend-friendly shape

This is a recommendation, not a requirement.

---

## 12. Important Concepts To Learn

Useful concepts for deeper study:

- Shopify Admin GraphQL API
- Shopify Storefront API
- metafield definitions
- metafield namespaces and keys
- metaobject definitions
- metaobject entries
- reference metafields
- `metaobject_reference`
- `list.metaobject_reference`
- schema bootstrap
- seed data
- bulk operations
- staged uploads
- GraphQL query cost
- merchant-owned vs app-owned custom data

These terms are worth understanding well before implementation is locked.

Shopify docs:

- About metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields
- About metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects
- Admin GraphQL API reference:
  https://shopify.dev/docs/api/admin-graphql/latest
- Storefront API reference:
  https://shopify.dev/docs/api/storefront

---

## 13. Key Decisions Still Open

These should be decided before implementation begins:

1. Should definitions be merchant-owned or app-owned?
2. Should the public storefront read page/customization content through Storefront API only, or is any Admin API usage acceptable during transition?
3. How granular should component metaobjects be?
4. Should every product have a required `page_product` reference?
5. Should missing page/component references fail loudly or fall back gracefully?

---

## 14. Working Recommendation

A practical v1 path would be:

1. Freeze naming conventions first
2. Create only the minimum necessary metaobject definitions
3. Automate schema setup through Admin GraphQL API
4. Seed one real product end-to-end
5. Build frontend fetchers only after that shape feels good in Shopify admin
6. Let the merchant edit entries in admin

This reduces the risk of overengineering before the admin editing experience has been validated.

Shopify docs:

- Admin GraphQL API reference:
  https://shopify.dev/docs/api/admin-graphql/latest
- metaobjectDefinitionCreate:
  https://shopify.dev/docs/api/admin-graphql/2024-04/mutations/metaobjectDefinitionCreate
- metaobjectCreate:
  https://shopify.dev/docs/api/admin-graphql/2023-01/mutations/metaobjectCreate
- Storefront API reference:
  https://shopify.dev/docs/api/storefront

---

## 15. Core Shopify Documentation

- About metafields and metaobjects:
  https://shopify.dev/docs/apps/build/custom-data/metafields
- About metaobjects:
  https://shopify.dev/docs/apps/build/metaobjects
- Admin GraphQL API reference:
  https://shopify.dev/docs/api/admin-graphql/latest
- Storefront API reference:
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
- bulkOperationRunMutation:
  https://shopify.dev/docs/api/admin-graphql/2024-04/mutations/bulkOperationRunMutation
- Bulk import data with the GraphQL Admin API:
  https://shopify.dev/api/usage/bulk-operations/imports
- metafieldDefinitionPin:
  https://shopify.dev/docs/api/admin-graphql/2023-10/mutations/metafielddefinitionpin
- Generate access tokens for custom apps in the Shopify admin:
  https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/generate-app-access-tokens-admin

---

## 16. Final Note

The most important thing to keep clean is not the frontend code first.

It is the naming and schema discipline inside Shopify.

If naming stays consistent and schema creation is automated, the rest becomes manageable.

If naming drifts and schema is created ad hoc through admin clicks, the whole system will become expensive to maintain very quickly.
