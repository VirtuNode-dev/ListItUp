# Repo Operating System

ListItUp will keep durable project context in root-level guidance files and the `docs/` directory: `CONTEXT.md` for domain language, `Brand.md` for product voice, `DESIGN.md` for interface direction, `AGENTS.md` for agent behavior, and `docs/` for QnA, specs, ADRs, templates, and agent configuration. This makes the repo usable by AI agents without hiding project knowledge in chat history.

## Status

accepted

## Consequences

- Agents should read the repo docs before planning or implementation.
- Specs and decisions should be committed as markdown when they affect future work.
- GitHub Issues remain the active tracker, while `docs/` keeps durable project history.
