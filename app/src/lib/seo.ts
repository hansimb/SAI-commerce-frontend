import type { Metadata } from "next";

const defaultSiteName = "Spectrum Audio Instruments";
const defaultDescription =
  "Handcrafted audio instruments, studio hardware, and workshop notes from Spectrum Audio Instruments.";
const defaultOgImage = "/logo_horizontal.png";

export function getSiteUrl(): URL {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  try {
    return new URL(rawUrl);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export function getMetadataBase(): URL {
  return getSiteUrl();
}

export function isProductionSite(): boolean {
  return process.env.NODE_ENV === "production" && getSiteUrl().hostname !== "localhost";
}

function normalizePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function normalizeImagePath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return normalizePath(path);
}

export function buildPageTitle(pageTitle?: string): string {
  return pageTitle ? `${pageTitle} | ${defaultSiteName}` : defaultSiteName;
}

export function createDescription(...parts: Array<string | undefined>): string {
  const description = parts
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return description || defaultDescription;
}

export function createMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image = defaultOgImage,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const canonicalPath = normalizePath(path);
  const imagePath = normalizeImagePath(image);
  const shouldIndex = !noIndex && isProductionSite();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: defaultSiteName,
      url: canonicalPath,
      title,
      description,
      images: [
        {
          url: imagePath,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
      },
    },
  };
}
