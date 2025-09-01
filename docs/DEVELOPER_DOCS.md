## Developer Docs (Project)

This folder contains minimal, high-signal docs for maintenance and future work.

### Files
- `FUTURE_IMPLEMENTATION_GUIDE.md` — Guidelines for performance, animations, accessibility, and structure
- `TODO_OVERVIEW_REFACTOR.md` — Project-wide follow-ups and known inconsistencies

### Current Project State
- Paths alias: `@/*` → `./src/*` (use `@` instead of relative `../../` imports)
- Hooks: `useInView`, `useScrollProgress`, `useThrottledScroll`, `useExitAnimation`, `useReducedMotion`, `useDarkMode`
  - Canonical dark mode hook: `src/hooks/useDarkMode.ts` (duplicate removed)
- Lib: minimal set — `src/lib/data.ts`, `src/lib/types.ts`, `src/lib/utils.ts` (`cx` helper lives here)

### Animations Policy
- Use CSS for simple interactions (hover/tap scale, basic in-view fades/slides) with `useInView`
- Keep Framer Motion for complex cases (Modal enter/exit via `AnimatePresence`, ThemeToggle sparkles, non-trivial stagger/loops)

### Overview Tab
- `Hero`, `FeaturedProject`, `Experience`: using `useInView` + CSS transitions (duration 700ms)
- Container-level delays standardized to none; per-item staggering retained where needed

### Actionable Follow-ups (see TODO file for details)
- Replace any remaining trivial Framer Motion usages with CSS + `useInView`
- Standardize imports of `cx` from `src/lib/utils.ts`
- Decide and apply a single approach for `Card` animation (FM inside Card vs CSS at call-sites)

### Quick Reference
- Bundle size: ~70.3KB
- Animation approach: CSS for simple, Framer Motion for complex
- Import style: `@/module/path`


