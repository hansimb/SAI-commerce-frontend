export const shopifySharedMetaobjects = {
  brand: {
    type: "shared_brand_data",
    handle: "spectrum-audio-instruments",
  },
  contact: {
    type: "shared_contact_data",
    handle: "shared-contact-data",
  },
} as const;

export const brandFieldKeys = {
  name: "name",
  slogan: "slogan",
  logoVertical: ["logo_vertical", "logo-vertical"],
  logoHorizontal: ["logo_horizontal", "logo-horizontal"],
} as const;

export const contactFieldKeys = {
  email: "email",
  phone: "phone",
  address: "address",
} as const;
