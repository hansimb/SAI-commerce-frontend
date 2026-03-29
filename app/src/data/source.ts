export const DATA_SOURCES = ["mock", "shopify"] as const;

export type DataSource = (typeof DATA_SOURCES)[number];

const DEFAULT_DATA_SOURCE: DataSource = "mock";

export function getDataSource(): DataSource {
  const rawValue = process.env.NEXT_PUBLIC_DATA_SOURCE ?? DEFAULT_DATA_SOURCE;

  if (rawValue === "mock" || rawValue === "shopify") {
    return rawValue;
  }

  return DEFAULT_DATA_SOURCE;
}

export function isShopifyDataSource(): boolean {
  return getDataSource() === "shopify";
}
