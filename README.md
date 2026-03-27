# SAI-commerce-frontend

Spectrum Audio Instrument's official e-commerce frontend.

Check project initiall planning docs form [here](/docs/project-planning/) to learn more about the project.

Project design prototype is located in [design-prototype/](/design-prototype/).

Frontend application stack is located in [app/](/app/).

Check README.md in each folder for more info.

## Use mock data or your own data

Project is using mock data or Shopify storefrint API data. data/loaders is deciding witch one to use, based on your .env variables.

Add following env variables:

```
NEXT_PUBLIC_DATA_SOURCE= # mock or shopify
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_API_VERSION=
SHOPIFY_STOREFRONT_PUBLIC_TOKEN=

```
