import fs from "node:fs";
import path from "node:path";

// Single source of truth: the entry lives in entry.txt, so the printed line
// can never drift from the submitted file. Fall back to the built-in line
// when entry.txt is absent (e.g. a bare checkout of main.ts alone).
const fallback = "I didn't break production — I just gave it a surprise feature rollout at 3 AM. The rollback is a feature too: it's called learning.";
let entry = fallback;
try {
  entry = fs.readFileSync(new URL("./entry.txt", import.meta.url), "utf8").replace(/\r?\n$/, "");
} catch {
  // keep the built-in line
}
if (entry.length === 0 || entry.length > 180) {
  console.error(`entry is ${entry.length} characters, must be 1-180`);
  process.exit(1);
}
const outDir = process.env.OUTPUT_DIR ?? "output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), entry);
console.log(entry);
