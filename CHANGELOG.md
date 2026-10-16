# Changelog

## Integrations — 2026-10-16

Not a change to the format or its contract id.

- The humans-md Claude Code plugin 0.1.0 and the command line `@humans-md/cli` 0.1.0 (npm) are published from [cmdai-hq/humans-md-plugins](https://github.com/cmdai-hq/humans-md-plugins), for contract `0.3-draft.2026-10-15.1`. They load the owner's own `~/.humans/HUMANS.md` only: no colleague's profile, no group merge, no MCP server.
- Evidence: a real session, asked without tools, quoted a value from an invented profile in the Claude Code CLI 2.1.301 with the plugin installed from GitHub. Claude Desktop 2.42304 and the VS Code extension 2.1.300 quoted it with an earlier build of 0.1.0; extension 2.1.89 did not load it. macOS only, 16 October 2026. Codex, Cursor and Copilot CLI hooks are documented, not tested. None of this establishes how closely a model follows the preferences.

## 0.3-draft.2026-10-15.1 — 2026-10-15

Unpublished draft; no stable release or tag is introduced.

- The personal profile is `~/.humans/HUMANS.md`, replacing `~/.humans/me.md`: the file carries the format's name, in its own directory like `~/.codex/AGENTS.md`. Adapters load it from that fixed path and never search repositories for it. Free text moves from `~/.humans/me.source.md` to `~/.humans/source.md`; `~/.humans/people/<id>.md` and repository `humans/<id>.md` are unchanged. The `id` filename exception applies to a file named exactly `HUMANS.md`. Fields are unchanged: migrate with `mv ~/.humans/me.md ~/.humans/HUMANS.md` and `mv ~/.humans/me.source.md ~/.humans/source.md`. A repository-root `HUMANS.md` is still not a profile location.
- New declared version `humans: "0.3"`. It adds fields and values and renames one value (next item): a valid 0.2 profile becomes a valid 0.3 profile by changing its `humans` string and, if present, `visibility: public`. Readers read `"0.2"` as `"0.3"`; writers write `"0.3"`. Schema identifiers move to `/schema/0.3/` and group output declares `humans_group: "0.3"`.
- `visibility: public` is renamed `anyone_with_file`, with the same meaning: any reader who has the file, with no check by the consumer, so where the file is stored controls access. There is no `public` alias: in `"0.3"` it is an unknown visibility and the profile is absent. A reader still maps `public` in a `"0.2"` profile. The compiler preview states plainly who can read the profile.
- `reading.close_with: next_action | one_question | nothing` says what the last line holds. An agent never invents an action or a question to fill it.
- `reading.lead_with: next_action` opens with the recipient's next action. `reading.structure: numbered` numbers steps and questions.
- `deciding.question_style: open | multiple_choice | yes_confirms_recommendation` sets the shape of each question, and so the effort to answer it. Without a recommendation, `yes_confirms_recommendation` falls back to `multiple_choice`.
- `interrupting.progress_updates: every_message | phase_changes | end_only` sets how a long task reports where it stands in its own conversation. It never justifies a message elsewhere.
- `avoid` accepts `recap` and `idioms`.
- `interrupting.quiet_hours` gives a daily range and whole weekdays, in a time zone from a pinned list (IANA tz database 2026e `zone.tab` names plus `UTC`), when no agent interrupts the owner. It holds interruptions, never work, and states times, never a reason. A reader omits it when its time zone is unknown; groups and stored variants omit it. Like every optional list, `all_day: []` is valid, means no whole quiet day and is omitted from projections.
- Group merging uses a majority for the new fields, with fallbacks `nothing`, `multiple_choice` and `phase_changes`. `lead_with: next_action` joins the majority vote after the `tldr` and `decision_needed` rules. Stored variants accept the new fields and stay inactive.
- `schema/instructions.json` fixes one English sentence per projected preference value, and one each for `max_words` and `quiet_hours`. An adapter may append them, in a fixed order, after the JSON line of a text rendering; no profile value is interpolated and the 16 KiB bound covers them. Translations use the same keys. Sentences carry the cross-field rules of § 3 that apply to their value, such as a closing question counting toward `asks_per_message` or `format: options_only` taking precedence over `default_answer`.
- A compiler writes a fixed three-line YAML comment header at the top of `HUMANS.md` (SPEC § 10) for agents that read the raw file. Readers ignore it, never project it, and validators never require it. Its 288 bytes count toward the frontmatter limit; a compiler that cannot fit the fields with the header reports the overflow.
- `out_of_scope_steps` keeps its name; its meaning now says explicitly that it decides whether to list follow-ups outside the task in closing lines, never whether to do them.
- SPEC § 1 lists files that share the name or the idea but are not profiles: contributor lists, guidance for humans, output-style skills, working-hours guards, per-repository collaboration rules and files kept from agents.
- The frontmatter limit rises from 6,144 to 20,480 bytes (20 KiB), and the bounded read from 10,253 to 24,589 bytes. The 4 KiB body limit and the 16 KiB rendering limit are unchanged. A profile with every field at its maximum length, all four stored variants and the header now fits (7,482 bytes in ASCII).
- The projection and group schemas are self-contained: they no longer reference `humans.schema.json`, and their local `$defs` are copies that the structural check keeps identical.
- `CONTRACT.json` no longer names a baseline commit; consumers pin the canonical commit that contains the listed files.

## 0.2-draft.2026-10-13.1 — 2026-10-13

Revision of the unpublished, untagged 0.2 draft; no stable release or tag is introduced.

- Replace the medical blacklist with owner choice. Voluntary medical statements are valid notes. No inferred diagnosis, mandatory diagnosis or silent sanitization.
- Define a shared, bounded projection for structured consumers and adapters, retaining scoped notes and excluding comments, body, identity/directory prose and unknown fields. Separate validity from withholding warnings and model behavior.
- Describe hosted compilation/provider processing and normal owner approval accurately. Recommend explicit private sharing for new profiles and preserve existing sharing on update.
- Fix byte limits, fatal UTF-8, BOM, CRLF accounting, scalar values and calendar dates. Distinguish strict writes, permissive reads of known 0.2 and absence for unsupported future versions.
- Deactivate stored variants and reject caller state selectors everywhere. Keep group merging experimental; clarify empty-list abstention, conservative common knowledge, numeric conflicts and per-field contributor counts without anonymity claims.
- Apply max_words to the entire message, appendices included. Preserve all 21 preference fields while separating core and extension conformance.
- Add a complete personal example, expected projection/byte/group vectors, contribution policy, source integrity manifest and successors for all 17 historical MUST occurrences.

The delivered reference tools cover bounded byte reading, strict validation and supported-version parsing, withholding, experimental group merging, and presence-based selector rejection, with executable vectors and CLI regressions. Native-adapter and model trials remain separate pending evidence; this entry makes no claim of deployment or measured productivity improvement.
