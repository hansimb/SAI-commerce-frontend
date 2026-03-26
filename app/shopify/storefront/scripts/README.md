# Shopify Storefront Debug Scripts

Use these scripts to inspect the raw Storefront API payloads before changing loaders or mappers.

## Print one metaobject

```bash
npm run shopify:metaobject -- products_page products-page
```

Arguments:

- first: metaobject type
- second: metaobject handle

## Print one product

```bash
npm run shopify:product -- tremola-mki-optical-tremolo
```

You can also target a specific metafield:

```bash
npm run shopify:product -- tremola-mki-optical-tremolo custom product_card_specs_list
```

The product script fetches:

- basic product fields
- featured image
- price range
- one chosen product metafield
- both `reference` and `references`, so it works for single and list reference fields

This is the easiest way in this repo to inspect how Shopify data is actually shaped before mapping it into the app.
