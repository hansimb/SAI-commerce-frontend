export interface ContactPageData {
  eyebrow: string;
  title: string;
  intro: string;
  contactMethods: {
    label: string;
    value: string;
    detail?: string;
  }[];
  studioTitle: string;
  studioText: string;
  inquiryTitle: string;
  inquiryText: string;
  ctaLabel: string;
}
