import test from "node:test";
import assert from "node:assert/strict";

import { getFixloopProjectName } from "./env.ts";

test("getFixloopProjectName returns the configured project name", () => {
  process.env.AGENTIC_FIX_LOOP_PROJECT_NAME =
    "Spectrum Audio Instruments storefront";

  assert.equal(
    getFixloopProjectName(),
    "Spectrum Audio Instruments storefront"
  );
});

test("getFixloopProjectName throws when the project name is missing", () => {
  delete process.env.AGENTIC_FIX_LOOP_PROJECT_NAME;

  assert.throws(() => getFixloopProjectName(), /Missing AGENTIC_FIX_LOOP_PROJECT_NAME/);
});
