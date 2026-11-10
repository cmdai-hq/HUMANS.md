// Checks that every term in schema/terms.json is listed in VOCABULARY.md, so the spec and the tools never drift,
// and that no instruction sentence contains one of those terms (SPEC § 6.4).
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { specDir, terms, instructionSentences, agentDirectedSentences } from "./lib.mjs";

const spec = readFileSync(join(specDir, "VOCABULARY.md"), "utf8");
const missing = Object.values(terms).flatMap((byLang) => Object.values(byLang).flat()).filter((t) => !spec.includes(`\`${t}\``));
console.log(missing.length ? `FAIL terms missing from VOCABULARY.md: ${missing.join(", ")}` : "ok   every term of schema/terms.json is listed in VOCABULARY.md");
const directed = agentDirectedSentences();
console.log(directed.length ? `FAIL instruction sentences with an agent-directed term: ${directed.join(", ")}` : `ok   none of the ${instructionSentences().length} instruction sentences holds an agent-directed term`);
process.exit(missing.length || directed.length ? 1 : 0);
