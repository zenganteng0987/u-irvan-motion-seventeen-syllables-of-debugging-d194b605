// Seventeen Syllables of Debugging — make.fun entry.
// Writes one original haiku about debugging to the output file.
// Deterministic, no network, no reads outside this repo.
// The haiku is 3 lines, 5-7-5 syllables, under 200 characters, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const HAIKU =
  "The red stack trace burns\n" +
  "each frame points at my own code\n" +
  "still, I blame the tests";
// Chosen haiku: 5-7-5 syllables, 83 characters, no trailing newline in the output.

if (HAIKU.length < 1 || HAIKU.length > 200) {
  console.error(
    `error: haiku must be 1-200 characters, got ${HAIKU.length}`,
  );
  process.exit(1);
}

const candidates: string[] = [];
if (process.env.MAKEFUN_OUTPUT_DIR) {
  candidates.push(join(process.env.MAKEFUN_OUTPUT_DIR, "entry.txt"));
}
candidates.push("/output/entry.txt");
candidates.push("./entry.txt");

for (const target of candidates) {
  try {
    try {
      mkdirSync(dirname(target), { recursive: true });
    } catch {
      // Best-effort: the directory may already exist or be read-only.
    }
    writeFileSync(target, HAIKU, "utf8");
    break;
  } catch {
    // Best-effort: try the next candidate.
  }
}
