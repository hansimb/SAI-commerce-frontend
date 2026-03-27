export interface ContactMethod {
  label: string;
  value: string;
  detail?: string;
}

export interface ContactPageData {
  eyebrow: string;
  title: string;
  intro: string;
  contactMethods: ContactMethod[];
}
