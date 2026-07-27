import assert from "node:assert/strict";
import Home from "./page";

let digest = "";

try {
  Home();
  assert.fail("expected Home() to redirect");
} catch (error) {
  digest = (error as { digest?: string }).digest ?? "";
}

assert.match(digest, /^NEXT_REDIRECT;.*\/sign-in;/);

console.log("page smoke test passed");
