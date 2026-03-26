interface ShopifyStorefrontResponse<TData> {
  data?: TData;
  errors?: Array<{
    message: string;
  }>;
}

export async function storefrontQuery<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN;
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2025-01";

  if (!storeDomain) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN");
  }

  if (!storefrontToken) {
    throw new Error("Missing SHOPIFY_STOREFRONT_PUBLIC_TOKEN");
  }

  const response = await fetch(
    `https://${storeDomain}/api/${apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    },
  );

  const json = (await response.json()) as ShopifyStorefrontResponse<TData>;

  if (!response.ok || json.errors?.length) {
    const firstError = json.errors?.[0]?.message || "Unknown Shopify error";
    throw new Error(firstError);
  }

  if (!json.data) {
    throw new Error("Missing Shopify response data");
  }

  return json.data;
}
