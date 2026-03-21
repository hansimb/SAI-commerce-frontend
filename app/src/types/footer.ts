import type { ContactMethod } from "@/types/contact";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterData {
  linkGroups: FooterLinkGroup[];
  contactItems: ContactMethod[];
}
