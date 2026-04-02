# Data Layer

This project keeps all route and shared app data under `app/src/data`.

## Goal

- UI components should not know where data comes from.
- Loaders choose the source and return app-ready data.
- `mock/` is only for mock mode and testing.
- `fallback/` is optional secondary data for real app content when Shopify data is missing.
- Never use `mock/` as a Shopify fallback.

## Source Switch

- `app/src/data/source.ts` reads `NEXT_PUBLIC_DATA_SOURCE`
- Supported values:
  - `mock`
  - `shopify`
- In `mock` mode, loaders may return `mock/` data.
- In `shopify` mode, loaders must return:
  - Shopify API data
  - `contents/` data
  - optional `fallback/` data
  - or safe empty data when a field/section has no data and no fallback exists

## Folder Rules

- `loaders/`
  - Route or shared data entry points.
  - Fetch, choose source, combine results.
  - No mapping logic beyond very small orchestration.
- `mappers/`
  - Convert Shopify responses into app domain types.
  - Keep mapping logic out of loaders.
- `contents/`
  - Stable app-owned content used in all modes.
  - Examples: labels, CTA text, static intros, navigation.
- `fallback/`
  - Secondary non-mock fallback content for Shopify mode when explicitly needed.
  - Must be safe to show in the real app.
  - If no fallback is defined, loaders should return safe empty values that keep UI stable and render nothing.
- `mock/`
  - Mock-only data.
  - Never import this into Shopify fallback paths.
- `shopify/metaobjects/`
  - Central place for Shopify metaobject types, handles and field keys.
  - Do not hardcode metaobject names or field keys in loaders.

## Current Structure

- `contents/`
- `fallback/`
- `loaders/`
- `mappers/`
- `mock/`
- `shopify/metaobjects/`

## Data Flow

1. Route or layout calls a loader from `data/loaders/`.
2. Loader checks the active source.
3. Loader fetches Shopify data or reads mock/content data.
4. Loader passes raw Shopify data into `mappers/`.
5. Loader returns app-ready typed data.

## Practical Rules

- Add new loader files only under `data/loaders/`.
- Add reusable transforms only under `data/mappers/`.
- Add shared static UI text under `data/contents/`.
- Add real fallback content only under `data/fallback/`.
- Add test/mock-only examples under `data/mock/`.
- Add Shopify identifiers only under `data/shopify/metaobjects/`.
- If data is page-specific, name files by page purpose.
- If mapper logic gets large, split it into smaller files by domain.

## Do Not Do These

- Do not import `mock/` into Shopify fallback logic.
- Do not hardcode Shopify metaobject handles in loaders.
- Do not place mapper functions inside loaders.
- Do not place static content inside loaders.
- Do not use `fallback/` as a default replacement for everything.
- Do not pass raw missing Shopify field data straight to UI if the UI expects a stable object/array shape.
- Do not create unclear mixed folders like old `products/` data loaders + mappers in one place.

## Adding New Data

When adding a new page or shared data feature:

1. Add domain types in `app/src/types` if needed.
2. Add stable app text to `contents/` if needed.
3. Add Shopify keys to `shopify/metaobjects/` if needed.
4. Add mapper functions to `mappers/`.
5. Add loader entry point to `loaders/`.
6. Add mock data only if mock mode really needs it.

When Shopify field data is missing:

1. Use `contents/` if the value is stable app-owned content.
2. Use `fallback/` only if a real secondary fallback is intentionally defined.
3. Otherwise normalize to safe empty data such as empty strings, empty arrays or empty objects that make UI render nothing without crashing.
4. Reserve `undefined` for cases where the whole entity truly does not exist, such as a missing detail page route.

## Quick Check Before Merging

- Is the file in the correct folder?
- Does Shopify mode avoid `mock/` completely?
- Are loaders only loading/orchestrating?
- Are mappers only mapping?
- Are metaobject names centralized?
- Is the returned data safe and intentional for the active source?
