# Lexelo UI Style Guide

## 1) Title and Purpose
This guide is the canonical UI standard for Lexelo across:
- Website/marketing landing experiences.
- Desktop and web app product interfaces.

This document exists to prevent visual drift where the landing and app look like different products. The rule is shared core, tuned surfaces.

## 2) Design Principles
- One product, two surfaces: both surfaces use the same token system and interaction grammar.
- Readability first: educational/product workflows prioritize clarity over decoration.
- Brand continuity: warm Lexelo identity appears consistently in both surfaces.
- Predictable interaction: hover, focus, active, and disabled behavior is consistent.
- Accessibility is non-negotiable: color contrast, keyboard support, and reduced-motion support are required.

## 3) Brand Core (Shared Across Landing + App)
Lexelo's brand base uses warm neutrals and gold accents:
- `--lexelo-grey: #3A3A3A`
- `--lexelo-light: #F5F0E6`
- `--lexelo-dark: #D4B896`
- `--lexelo-semi: #E8DCC0`
- `--lexelo-lightmode: #FDFBF9`
- `--lexelo-lightgradient: linear-gradient(127deg in oklab, oklch(0.9891 0.0034 67.78) 0%, oklch(0.9563 0.0143 84.58) 100%)`

Source locations:
- `packages/ui/src/styles/globals.css`
- `packages/ui/src/frontend/style.css`

## 4) Token Architecture
Use a two-layer model:

### 4.1 Brand Tokens
Brand tokens represent visual identity (`--lexelo-*`). They should not be used directly for every component state.

### 4.2 Semantic Tokens
Semantic tokens drive component styling and theme behavior:
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--border`, `--input`, `--ring`
- `--sidebar-*` tokens for app shell navigation regions

Implementation requirements:
- New UI work must prefer semantic tokens for component color behavior.
- Brand tokens are used to tune semantic values or for intentional brand accents.
- Do not introduce a new hardcoded hex color if an existing token can express the same intent.
- If a new color role is needed, add a token first, then use it.

## 5) Typography Standards
- Primary family across landing + app: `Poppins`.
- Serif usage is optional and limited to selected landing display accents.
- Product UI (desktop/web app interface) stays sans-first for readability and density.
- Typography intent:
- Headings: high contrast, concise, semibold/bold.
- Body: medium contrast, normal weight, comfortable line-height.
- UI labels/captions: muted semantic foreground tokens, not arbitrary greys.

## 6) Spacing, Radius, Shadows, and Borders
- Base spacing rhythm follows the established Tailwind/token scale.
- Radius standard:
- Global base radius comes from `--radius` (`0.625rem` currently).
- Components use semantic radius tiers (`sm`, `md`, `lg`, `xl`) from token calculations.
- Borders:
- Use `--border`/`border-border` utilities and semantic opacity variants.
- Avoid ad hoc border colors in new code.
- Shadows:
- Use existing tokenized shadow levels (`--shadow-xs` through `--shadow-2xl`).
- Landing may use stronger shadows for hero/feature emphasis.
- App surfaces should remain subtle to preserve data clarity.

## 7) Motion and Interaction Standards
- Motion should communicate hierarchy and affordance, not decoration for its own sake.
- Landing allows richer motion (float, shimmer, reveal), but timing must stay controlled.
- App motion should be restrained and fast.
- Interaction state requirements:
- `hover`: subtle elevation, contrast, or underline progression.
- `active`: slight press/scale feedback where appropriate.
- `focus-visible`: always visible via tokenized ring/border; never removed.
- `disabled`: reduced opacity plus pointer-event/cursor constraints.
- Respect user preferences:
- Provide `prefers-reduced-motion` fallbacks for non-essential animations.

## 8) Lexelo Website (Landing) Standards
Landing is expressive, but still bound by shared rules:
- Keep warm cream/gold/charcoal palette and gradient language.
- Decorative backgrounds and ambient motion are allowed.
- Components must still use token intent and consistent interaction grammar.
- Hero and CTA areas may carry stronger visual treatment than app UI.
- Landing typography remains Poppins-first; serif accent only for deliberate display moments.

Allowed emphasis examples:
- Gradient headline accents.
- Soft glassmorphism cards.
- Ambient floating shapes and section transitions.

Disallowed drift:
- Introducing unrelated palette families for core UI structure.
- Building component styles that conflict with app interaction patterns.

## 9) Desktop/Web App Interface Standards
App surfaces prioritize usability and task completion:
- Use semantic tokens and shared primitives (`button`, `card`, `input`, `dropdown`, `sheet`, `tabs`, `table`).
- Keep layout dense and legible with restrained decoration.
- Maintain clear hierarchy for navigation, content, and controls.
- Use brand accents intentionally without reducing contrast or readability.

App-specific behavior:
- Sidebar/header/table/card surfaces should remain clean and data-forward.
- Motion should be limited to utility transitions and direct feedback.
- Strong decorative effects from landing should not be copied directly into dense data views.

## 10) Shared Component Rules
These rules apply in both landing and app where components are reused.

### Buttons
- Default/primary buttons use semantic primary tokens.
- Outline buttons use border/input/background tokens with consistent hover elevation.
- Ghost buttons maintain clear focus-visible states.
- Do not create one-off button styles when existing variants can satisfy intent.

### Cards
- Use semantic `card`/`card-foreground` colors and tokenized radius/shadows.
- Landing cards may add stronger blur/gradient accents.
- App cards should optimize scanability and hierarchy.

### Inputs and Controls
- Inputs must keep semantic border/background and ring states.
- Placeholder and muted text should use semantic muted tokens.
- Focus-visible ring is required and token-driven.

### Navigation
- Top nav and side nav share state logic for hover/active/focus.
- Landing nav may use translucency and backdrop blur.
- App nav must preserve contrast and orientation at all viewport sizes.

## 11) Dark Mode Standards (Required for Both Surfaces)
- Dark mode is required for both landing and app.
- Every new UI section/component must define light and dark token behavior.
- Do not ship new landing/app UI that is light-only unless explicitly accepted as temporary and logged in backlog.

Dark mode implementation rules:
- Use semantic dark token mappings from `.dark` in shared stylesheets.
- Ensure text/background contrast remains readable for body and small labels.
- Keep interactive controls visually distinct in all states.
- Focus rings must remain visible in dark mode.

## 12) Accessibility Standards
- All interactive controls must be keyboard reachable and focus-visible.
- Contrast targets:
- Body text and primary controls must meet accessible contrast levels.
- Muted text must remain readable on both light and dark surfaces.
- Icon-only controls require accessible labels (`aria-label`/`sr-only`).
- Motion-heavy experiences must support reduced-motion behavior.
- Never communicate state using color alone.

## 13) Implementation Rules and Anti-Patterns
Required rules:
- Reuse existing semantic tokens before creating new color values.
- Reuse shared UI primitives before creating one-off component foundations.
- Keep `/src/frontend/style.css` and `/src/styles/globals.css` token intent aligned.
- Keep typography and interaction states consistent across surfaces.

Anti-patterns:
- Hardcoded color duplication across multiple files when tokens exist.
- Landing-only UI behavior that breaks established app interaction grammar.
- Inconsistent hover/focus/active states across similar controls.
- Excessive animation in dense product workflows.

## 14) Migration Backlog (Forward-Only Enforcement)
This guide is strict for new and edited UI work. Existing mismatches are tracked here and resolved incrementally.

### Backlog Items
1. Replace repeated hardcoded landing colors with tokenized equivalents.
2. Normalize semantic token usage across:
- `packages/ui/src/frontend/style.css`
- `packages/ui/src/styles/globals.css`
3. Align app-shell visual accents with brand tokens where readability remains strong.
4. Add or verify dark-mode parity for landing sections that are currently light-first.

### Priority
1. Token normalization and hardcoded color reduction.
2. Dark-mode parity for landing.
3. Accent harmonization across app shell surfaces.

## 15) Validation and Acceptance Criteria
This style guide is considered applied when:
1. This file remains the referenced UI source of truth.
2. Root README links to this file.
3. Landing and app sections are both present and enforce shared core rules.
4. Dark mode requirements are explicitly documented for both surfaces.
5. Migration backlog and PR checklist are present with pass/fail language.

## 16) Test Cases and Scenarios
1. A new landing PR references semantic and/or `--lexelo-*` tokens and passes checklist.
2. A new app dashboard PR uses shared button/card/input patterns and passes checklist.
3. A dark-theme change can be evaluated directly against this document's contrast/focus requirements.
4. A reviewer can reject a PR introducing non-token hardcoded colors without explicit justification and token proposal.

## 17) PR Checklist (Pass/Fail)
Mark each item `PASS` or `FAIL` in PR review notes.

1. `PASS/FAIL`: Uses existing semantic tokens for color roles before adding new values.
2. `PASS/FAIL`: Avoids new hardcoded hex/rgb values where token equivalents exist.
3. `PASS/FAIL`: Maintains Poppins-first typography and only uses serif as approved accent usage.
4. `PASS/FAIL`: Applies consistent hover/focus/active/disabled behavior.
5. `PASS/FAIL`: Supports both light and dark mode for new/changed UI.
6. `PASS/FAIL`: Preserves accessibility for keyboard navigation and visible focus rings.
7. `PASS/FAIL`: Keeps landing expressive and app restrained without breaking shared design core.
8. `PASS/FAIL`: Adds migration note if temporary deviation is intentionally introduced.

## 18) Assumptions and Defaults
1. This pass defines documentation standards only, not a full UI refactor.
2. Existing inconsistencies remain functional and are resolved through backlog-driven updates.
3. No runtime APIs, component props, or type contracts are changed by this document.
