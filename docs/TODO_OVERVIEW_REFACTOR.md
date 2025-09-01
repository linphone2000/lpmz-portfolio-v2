## Overview Tab Refactor - Follow-ups and Inconsistencies

This file tracks future cleanups after the Overview tab refactor. The goal is to standardize patterns across all tabs without over-engineering.

### Current Status
- Overview tab: using `useInView` + CSS transitions for enter animations; simple hovers via CSS.
- Portfolio & Education tabs: partially migrated; some Framer Motion usages remain for simple effects.

### Known Inconsistencies (to align later)
- Mixed animation approaches (Framer Motion vs CSS) across tabs.
- Local `cx` utilities duplicated in components while a shared `cx` exists in `src/lib/utils.ts`.
- Some components still rely on `motion.div` for trivial `whileHover` / `whileInView`.
- Unused component: `src/components/Common/AnimatedSection.tsx`.

### Future To-Dos
1) Replace trivial Framer Motion with CSS
   - Badge-like hover/tap: use `transition-transform`, `hover:scale-*`, `active:scale-*`.
   - Simple in-view fades: use `useInView` + CSS classes.

2) Standardize enter animations
   - Adopt a small set of CSS utility classes for fade/slide-in.
   - Ensure `prefers-reduced-motion` is respected.

3) Consolidate `cx` utility
   - Import `cx` from `src/lib/utils.ts` instead of redefining locally.

4) Audit remaining Framer Motion usages
   - Keep for: Modal (AnimatePresence), ThemeToggle sparkles, any complex stagger/loop.
   - Consider replacing in: Certifications list, SectionDivider, simple list reveals.

5) Remove or repurpose unused components
   - `src/components/Common/AnimatedSection.tsx` if still unused.

6) Documentation updates
   - Record the chosen animation patterns and when to use FM vs CSS.

### Nice-to-Haves (Low Priority)
- Small helper for common in-view class toggling.
- Centralize optional `animation-delay-*` utilities if used repeatedly.

### Definition of Done
- All simple hovers and in-view reveals implemented with CSS + hooks.
- Framer Motion reserved for complex transitions/effects only.
- No local duplicates of `cx`; imports come from `src/lib/utils.ts`.
- Unused components removed.

