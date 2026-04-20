export function getAdminAppUrl() {
  const url = process.env.ADMIN_APP_URL?.trim();

  return url || undefined;
}

export function hasAdminAppUrl() {
  return Boolean(getAdminAppUrl());
}
