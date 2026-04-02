import { storefrontQuery } from "@/data/shopify/storefront-client";
import { shopifyMetaobjects } from "@/data/shopify/metaobjects";
import { isShopifyDataSource } from "@/data/source";
import type { ContactMethod } from "@/types/contact";

interface ShopifySharedContactQueryData {
  metaobject: {
    fields: Array<{
      key: string;
      value: string | null;
    }>;
  } | null;
}

export const contactMethodsFallbackData: ContactMethod[] = [
  {
    label: "",
    value: "",
    detail: "Best for project discussions and general inquiries",
  },
  {
    label: "",
    value: "",
    detail: "Available on weekdays during studio hours",
  },
  {
    label: "Address",
    value: "Turku, Finland",
    detail: "Visits and demos by appointment",
  },
];

const sharedContactQuery = `
  query SharedContact($handle: String!) {
    metaobject(handle: { type: "${shopifyMetaobjects.sharedContactData.type}", handle: $handle }) {
      fields {
        key
        value
      }
    }
  }
`;

export async function getContactMethodsData(): Promise<ContactMethod[]> {
  if (!isShopifyDataSource()) {
    return contactMethodsFallbackData;
  }

  const data = await storefrontQuery<ShopifySharedContactQueryData>(
    sharedContactQuery,
    {
      handle: shopifyMetaobjects.sharedContactData.handle,
    },
  );

  if (!data.metaobject) {
    return contactMethodsFallbackData;
  }

  const email = getFieldValue(data.metaobject.fields, "email");
  const phone = getFieldValue(data.metaobject.fields, "phone");
  const address = getFieldValue(data.metaobject.fields, "address");

  const items: ContactMethod[] = [];

  if (email) {
    items.push({
      label: "Email",
      value: email,
      detail: "Best for project discussions and general inquiries",
    });
  }

  if (phone) {
    items.push({
      label: "Phone",
      value: phone,
      detail: "Available on weekdays during studio hours",
    });
  }

  if (address) {
    items.push({
      label: "Address",
      value: address,
      detail: "Visits and demos by appointment",
    });
  }

  return items.length > 0 ? items : contactMethodsFallbackData;
}

function getFieldValue(
  fields: Array<{
    key: string;
    value: string | null;
  }>,
  key: string,
): string | undefined {
  return fields.find((field) => field.key === key)?.value ?? undefined;
}
