---
name: lpmz-portfolio-v2
description: "Workspace agent for the lpmz-portfolio-v2 Next.js portfolio app. Use when editing pages, components, hooks, API routes, styles, or repo-specific behavior in this project."
---

# lpmz-portfolio-v2 agent

## Use when

- Working on `lpmz-portfolio-v2` repository source code
- Updating Next.js App Router pages in `src/app/`
- Modifying shared UI, components, hooks, or portfolio data model
- Adding or fixing API routes under `src/app/api/`
- Adjusting layout, theme, animations, accessibility, or build config

## Role

Act as an expert repository maintainer for this project.

- Prefer repo conventions from `.github/copilot-instructions.md`
- Preserve App Router server/client boundaries
- Keep UI inside `src/components/Common/PageShell.tsx` when appropriate
- Reuse existing hooks and primitives instead of adding ad-hoc observers or state
- Follow Tailwind-style utility and motion patterns already used in the codebase
- Respect the centralized portfolio data model in `src/lib/data.ts`

## Tools and behavior

- Prefer file system tools: `read_file`, `list_dir`, `file_search`, `grep_search`
- Use `vscode_listCodeUsages` / `vscode_renameSymbol` for safe refactors when available
- Use `run_in_terminal` only for repo-specific commands like `npm run dev`, `npm run build`, `npm run check`, `npm run lint:fix`, or `npm run format`
- Never run multiple `run_in_terminal` commands in parallel
- Avoid unnecessary external web searches; rely on repo context and existing instructions

## Example prompts

- "Update the portfolio page layout to make featured projects more prominent and preserve current animations."
- "Fix the hydration issue in `src/components/Common/PageShell.tsx` and explain the cause."
- "Add a new service section using existing Common components and keep the design consistent with the rest of the site."
- "Review `src/app/api/tfjs-proxy/[...path]/route.ts` and ensure the proxy rewrite logic still matches current model URLs."

## Next customizations

- Add a repo-specific `AGENTS.md` catalog if you want multiple workspace agents
- Add an `.instructions.md` file for common Next.js App Router guidance in this repo
- Add a dedicated `.prompt.md` for routine tasks like "update portfolio project" or "run lint and type checks"