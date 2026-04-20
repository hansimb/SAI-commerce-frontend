import test from "node:test";
import assert from "node:assert/strict";

import { getAdminAppUrl, hasAdminAppUrl } from "./env.ts";

test("getAdminAppUrl returns the configured admin URL", () => {
  process.env.ADMIN_APP_URL = "https://sai-backoffice-mrp.vercel.app";

  assert.equal(getAdminAppUrl(), "https://sai-backoffice-mrp.vercel.app");
});

test("getAdminAppUrl returns undefined when ADMIN_APP_URL is missing", () => {
  delete process.env.ADMIN_APP_URL;

  assert.equal(getAdminAppUrl(), undefined);
});

test("hasAdminAppUrl is false when ADMIN_APP_URL is missing", () => {
  delete process.env.ADMIN_APP_URL;

  assert.equal(hasAdminAppUrl(), false);
});
