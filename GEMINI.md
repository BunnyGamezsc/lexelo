# AGENTS.md

This document provides guidance for AI coding assistants (Claude, ChatGPT, Cursor, etc.) working on this project.

## Project Overview

This project uses modern web technologies and follows industry best practices. When working on this codebase, please adhere to the following guidelines and conventions.

## Package Manager

**Always use `pnpm` instead of `npm` or `yarn`.**

All package installations, script executions, and dependency management should use `pnpm`.

## Build/Test Commands (most projects!)
- `pnpm dev` - Start the development server
    [Note: Don't use this unless you are otherwise told to!]
- `pnpm lint` - Some sort of linting (ie. oxlint, eslint, etc.) (also reports TypeScript errors)
- `pnpm lint --fix` - Apply fixes for autofixable lint issues
- `pnpm app` - For desktop apps (like Tauri, Electron, etc.) - runs a "dev" mode for the desktop app
- `pnpm build` - Build the project (don't do this unless you are otherwise told to!)

** Do not run ** `pnpm dev` (assume already running), `pnpm build` (CI only)

## Code Style & Conventions

### General Guidelines

- Write clean, readable, and maintainable code
- Follow existing code patterns and conventions in the project
- Use TypeScript for type safety
- Prefer functional components and hooks in React
- Keep components small and focused on a single responsibility
- Extract complex logic into custom hooks or utility functions

### File Naming

- Components (JSX/TSX): `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Utilities (JS/TS): `camelCase.ts` (e.g., `formatDate.ts`)
- Hooks (JS/TS): `useCamelCase.ts` (e.g., `useAuth.ts`)
- Types (TS): `PascalCase.types.ts` (e.g., `User.types.ts`)
- Imports: `@/` for web & desktop (in their respective app) and `#/` for ui (global across both apps)



## Working with AI Assistants

### When Making Changes

1. **Understand before modifying** - Review relevant code and context before making changes
2. **Test your changes** - Run the development server and verify functionality
3. **Check for errors** - Run linting, type checking, and tests
4. **Be explicit** - Clearly explain what you're changing and why
5. **Follow existing patterns** - Match the coding style and patterns already in the project

### Common Tasks

- **Adding a feature**: Review related components, understand the data flow, implement the feature, add tests
- **Fixing a bug**: Reproduce the issue, identify the root cause, implement the fix, verify the fix works
- **Refactoring**: Ensure tests pass before and after, maintain existing functionality, improve code quality

### Context7 Integration

When you need code generation, setup/configuration steps, or library/API documentation, automatically use the Context7 MCP tools to:
1. Resolve library IDs
2. Get up-to-date library documentation
3. Find best practices and examples

You don't need explicit requests to use Context7 - use it proactively when working with libraries and frameworks.

(This usually works but if there is an error, prompt the user to fix it!)

### Styling

- Follow the existing styling approach (CSS Modules, Tailwind, styled-components, etc.)
- Maintain consistent spacing and layout patterns
- Ensure responsive design for mobile, tablet, and desktop
- Follow `STYLE_GUIDE.md` as the source of truth for all UI and styling decisions across landing and app interfaces

## Best Practices

1. **Type Safety**: Leverage TypeScript's type system to catch errors early
2. **Component Composition**: Build complex UIs from smaller, reusable components
3. **Performance**: Use React.memo, useMemo, and useCallback when appropriate
4. **Accessibility**: Ensure all interactive elements are keyboard accessible and have proper ARIA labels
5. **Error Handling**: Implement proper error boundaries and error handling
6. **Documentation**: Add JSDoc comments for complex functions and components

---

**Last Updated**: 2026-02-14

For questions or clarifications about this project, consult the team or project documentation.
