import type { ContactPageData } from "@/types/contact";

export const contactPageMockData: ContactPageData = {
  eyebrow: "Contact",
  title: "Talk to the workshop",
  intro:
    "This page is intentionally still an early first pass, but it already shows the structure we could later connect to a proper inquiry flow or Shopify-backed contact experience.",
  contactMethods: [
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
  ],
  studioTitle: "Studio and consultation",
  studioText:
    "We can later expand this into a fuller section about showroom visits, demo listening, build lead times, and consultation availability.",
  inquiryTitle: "Inquiry outline",
  inquiryText:
    "A future version of this page could include a structured contact form, project type selection, and product interest routing.",
  ctaLabel: "Start a conversation",
};
