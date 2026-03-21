import type { ContactMethod } from "@/types/contact";

export const contactMethodsData: ContactMethod[] = [
  {
    label: "Email",
    value: "studio@spectrum-audio.test",
    detail: "Best for project discussions and general inquiries",
  },
  {
    label: "Phone",
    value: "+358 40 123 4567",
    detail: "Available on weekdays during studio hours",
  },
  {
    label: "Location",
    value: "Turku, Finland",
    detail: "Visits and demos by appointment",
  },
];
