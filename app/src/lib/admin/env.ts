export function getAdminAppUrl() {
  const url = process.env.ADMIN_APP_URL?.trim();

  if (!url) {
    throw new Error("Missing ADMIN_APP_URL.");
  }

  return url;
}
