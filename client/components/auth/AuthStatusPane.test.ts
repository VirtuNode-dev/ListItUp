import assert from "node:assert/strict";

import { scrambleWordmark } from "./AuthStatusPane";

assert.equal(
  scrambleWordmark(0, () => 0),
  "AAAAAAAA"
);
assert.equal(
  scrambleWordmark(4, () => 0),
  "ListAAAA"
);
assert.equal(
  scrambleWordmark(8, () => 0),
  "ListItUp"
);

console.log("auth wordmark scramble test passed");
