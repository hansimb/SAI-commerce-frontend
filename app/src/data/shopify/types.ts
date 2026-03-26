export interface ShopifyScalarMetaobjectField {
  key: string;
  value: string | null;
  type: string;
}

export interface ShopifyReferencedMetaobject {
  __typename: "Metaobject";
  id?: string;
  type?: string;
  handle?: string;
  fields: ShopifyScalarMetaobjectField[];
}

export interface ShopifyMetaobjectField {
  key: string;
  value: string | null;
  type: string;
  reference: ShopifyReferencedMetaobject | null;
  references: {
    nodes: ShopifyProductNode[];
  } | null;
}

export interface ShopifyProductMetafield {
  type: string;
  value: string | null;
  reference: ShopifyReferencedMetaobject | null;
}

export interface ShopifyProductNode {
  __typename: "Product";
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  cardSpecsMetafield: ShopifyProductMetafield | null;
  subtitleMetafield: ShopifyProductMetafield | null;
}

export interface ShopifyProductsPageQueryData {
  metaobject: {
    id: string;
    type: string;
    handle: string;
    fields: ShopifyMetaobjectField[];
  } | null;
}
