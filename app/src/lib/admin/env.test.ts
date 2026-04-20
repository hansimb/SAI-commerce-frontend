import test from "node:test";
import assert from "node:assert/strict";

import { getAdminAppUrl } from "./env.ts";

test("getAdminAppUrl returns the configured admin URL", () => {
  process.env.ADMIN_APP_URL = "https://sai-backoffice-mrp.vercel.app";

  assert.equal(getAdminAppUrl(), "https://sai-backoffice-mrp.vercel.app");
});

test("getAdminAppUrl throws when ADMIN_APP_URL is missing", () => {
  delete process.env.ADMIN_APP_URL;

  assert.throws(() => getAdminAppUrl(), /Missing ADMIN_APP_URL/);
});
