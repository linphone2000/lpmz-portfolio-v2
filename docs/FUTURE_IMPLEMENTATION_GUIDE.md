## Future Implementation Guide

This is the living guide for future changes to this portfolio. It encodes the conventions we now follow so work stays fast, simple, and consistent.

### Core Principles
- Prefer simplicity over abstraction; avoid over‑engineering
- Favor CSS + small hooks for UI behavior; keep JS light
- Consistent imports via `@/` alias; avoid `../../`
- Strict TypeScript and clear prop types; minimal runtime logic

### Stack & Paths
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS (+ a few custom utilities)
- Icons: `@heroicons/react`
- Paths alias: `@/*` → `./src/*`

### Animations Strategy
- Default: CSS transitions with `useInView` for enter animations
  - Pattern:
    - `const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true })`
    - Container classes: `transition-all duration-700 ease-out`
    - Visible vs hidden: `opacity-100 translate-y-0` vs `opacity-0 translate-y-6`
    - Per-item stagger: `animation-delay-${index * 100}` (optional)
- Keep Framer Motion only when beneficial:
  - Modal enter/exit (`AnimatePresence`)
  - ThemeToggle sparkles
  - Complex staggered/looping sequences that are hard in pure CSS

### Hooks
- `useInView(options)` — IntersectionObserver wrapper
  - Use for on-enter transitions; set `triggerOnce: true` for one-shot
- `useReducedMotion()` — respect OS preferences; disable fancy effects when true
- `useThrottledScroll(cb, { throttleMs })` / `useScrollProgress({ throttleMs })` — use sparingly; throttle by default
- `useDarkMode()` — canonical implementation in `src/hooks/useDarkMode.ts`

### Lib & Utilities
- Data source: `src/lib/data.ts`
- Types: `src/lib/types.ts`
- Utilities: `src/lib/utils.ts`
  - `cx(...classes)` — use instead of custom/local `cx` copies

### Components & Conventions
- Prefer Server Components by default; mark interactive UI as Client (`'use client'`)
- Props typing: explicit, minimal, and stable (avoid `any`)
- Memoization:
  - `React.memo` for pure presentational components with heavy children
  - `useMemo`/`useCallback` for expensive maps or callbacks reused in children
- Imports:
  - Use `@/components/...`, `@/hooks/...`, `@/lib/...`
  - Local sibling imports allowed (e.g., `./index` within a feature folder)

### Overview Tab Guidelines
- Current standard:
  - `Hero`, `FeaturedProject`, `Experience` use `useInView` + CSS (700ms)
  - No container-level delay; per-item stagger allowed
- If adding a new block:
  - Use the same enter pattern and timing
  - Keep hovers with Tailwind (`hover:scale-105`, `active:scale-95`)

### Portfolio/Education Tabs (When Revisited)
- Replace simple `motion.div` reveals with `useInView` + CSS
- Consolidate to shared `cx`; remove local duplicates
- Keep FM only where UI quality clearly benefits

### Performance Checklist (pre-PR)
- No unnecessary re-renders (memoize where it matters)
- Transitions use GPU-friendly transforms, not layout-changing properties
- Avoid large inline style objects; prefer classes
- Limit listeners; throttle or requestAnimationFrame when needed
- Test on mobile/low-power device if possible

### Accessibility Checklist
- Respect `prefers-reduced-motion`
- Buttons/links have clear labels and roles
- Keyboard focus states visible; no focus traps
- Sufficient color contrast; semantic headings

### Testing & Verification
- `npm run build` locally; confirm no type or lint errors
- Quick visual sanity across light/dark and mobile widths
- Verify route still prerenders static as expected

### Documentation & Housekeeping
- Update `docs/DEVELOPER_DOCS.md` and `docs/TODO_OVERVIEW_REFACTOR.md` when patterns change
- Keep TODOs high-signal and project-wide; avoid long narratives

### Examples

In‑view container pattern:

```tsx
const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

return (
  <div
    ref={ref}
    className={`transition-all duration-700 ease-out ${
      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`}
  >
    {...}
  </div>
);
```

Staggered list items:

```tsx
{items.map((item, index) => (
  <div key={item.id} className={`transition-all duration-500 ease-out animation-delay-${index * 100}`}>
    {...}
  </div>
))}
```

That’s it — keep it simple, consistent, and fast.


