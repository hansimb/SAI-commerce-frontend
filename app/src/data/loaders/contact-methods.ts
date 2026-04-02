import type { ContactMethod } from "@/types/contact";
import { isShopifyDataSource } from "../source";
import { contactMethodsFallbackData } from "../fallback/contact-fallback";
import { storefrontQuery } from "../shopify/storefront-client";
import { getMetaobjectTextValue } from "../mappers";
import { normalizeContactMethods } from "../predicates";
import {
  contactFieldKeys,
  shopifySharedMetaobjects,
} from "../shopify/metaobjects/shared";

interface ShopifySharedContactQueryData {
  metaobject: {
    fields: Array<{
      key: string;
      value: string | null;
    }>;
  } | null;
}

const sharedContactQuery = `
  query SharedContact($handle: String!) {
    metaobject(handle: { type: "${shopifySharedMetaobjects.contact.type}", handle: $handle }) {
      fields {
        key
        value
      }
    }
  }
`;

export async function getContactMethodsData(): Promise<ContactMethod[]> {
  if (!isShopifyDataSource()) {
    return normalizeContactMethods(contactMethodsFallbackData);
  }

  const data = await storefrontQuery<ShopifySharedContactQueryData>(
    sharedContactQuery,
    {
      handle: shopifySharedMetaobjects.contact.handle,
    },
  );

  if (!data.metaobject) {
    return normalizeContactMethods(contactMethodsFallbackData);
  }

  const email = getMetaobjectTextValue(data.metaobject.fields, contactFieldKeys.email);
  const phone = getMetaobjectTextValue(data.metaobject.fields, contactFieldKeys.phone);
  const address = getMetaobjectTextValue(
    data.metaobject.fields,
    contactFieldKeys.address,
  );

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

  return items.length > 0
    ? normalizeContactMethods(items)
    : normalizeContactMethods(contactMethodsFallbackData);
}
