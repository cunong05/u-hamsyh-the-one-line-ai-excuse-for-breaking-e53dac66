import fs from "node:fs";
import path from "node:path";

const entry = "I didn't break production — I just gave it a surprise feature rollout at 3 AM. The rollback is a feature too: it's called learning.";
const outDir = process.env.OUTPUT_DIR ?? "output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), entry);
console.log(entry);
