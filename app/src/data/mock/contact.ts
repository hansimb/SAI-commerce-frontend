import { contactMethodsData } from "@/data/contact";
import type { ContactPageData } from "@/types/contact";

export const contactPageMockData: ContactPageData = {
  eyebrow: "Contact",
  title: "Talk to the workshop",
  intro:
    "This page is intentionally still an early first pass, but it already shows the structure we could later connect to a proper inquiry flow or Shopify-backed contact experience.",
  contactMethods: contactMethodsData,
  studioTitle: "Studio and consultation",
  studioText:
    "We can later expand this into a fuller section about showroom visits, demo listening, build lead times, and consultation availability.",
  inquiryTitle: "Inquiry outline",
  inquiryText:
    "A future version of this page could include a structured contact form, project type selection, and product interest routing.",
  ctaLabel: "Start a conversation",
};
