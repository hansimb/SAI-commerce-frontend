export interface NavigationLinkItem {
  label: string;
  href: string;
}

export function getNavigationLinks(
  hasArticles: boolean,
): NavigationLinkItem[] {
  return [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    ...(hasArticles
      ? [{ label: "Technical writing", href: "/articles" }]
      : []),
    { label: "Contact", href: "/contact" },
  ];
}
