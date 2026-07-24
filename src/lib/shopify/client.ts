import "server-only";

type ShopifyFetchOptions<TVariables> = {
  query: string;
  variables?: TVariables;
  tags?: string[];
  revalidate?: number;
};

type ShopifyGraphQLError = {
  message: string;
};

type ShopifyGraphQLResponse<TData> = {
  data?: TData;
  errors?: ShopifyGraphQLError[];
};

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion =
  process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-07";

export const isShopifyConfigured = Boolean(domain && token);

export async function shopifyFetch<
  TData,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>({
  query,
  variables,
  tags = [],
  revalidate = 60,
}: ShopifyFetchOptions<TVariables>): Promise<TData> {
  if (!domain || !token) {
    throw new Error(
      "Shopify is not configured. Add the Storefront domain and access token.",
    );
  }

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate,
      tags,
    },
  });

  const body = (await response.json()) as ShopifyGraphQLResponse<TData>;

  if (!response.ok || body.errors?.length || !body.data) {
    const message =
      body.errors?.map((error) => error.message).join("; ") ||
      `Shopify request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return body.data;
}
