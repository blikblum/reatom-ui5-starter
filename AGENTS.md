## Project overview

This project is a starter template for building applications using Lit, Reatom and UI5

## Dev environment

- Package manager: Yarn
- Start dev server: `yarn dev`
- Production build: `yarn build`

## Testing and Code style

Testing is done with vitest. Prefer narrowing failures first (e.g., a specific test file) via Vitest CLI options when applicable.
Code style is enforced by oxlint and oxfmt.
Demoing is done with storybook. Each component must be accompanied by a corresponding colocated stories file.

After completing development tasks, always run `lint` and `format` scripts

## Project structure (high-level)

- App entry: `src/main.ts`
- Pages: `src/pages/*` - high level views
- Components: `src/components/*` - shared UI components
- State/store: `src/stores/*`
- APIs: `src/api/*` - domain logic types, functions and classes
- Setup/integration glue: `src/setup/*` (router, services, ui5 setup, etc.)
- Styling: `src/styles/main.scss` (and per-page scss)

## UI framework notes

- UI uses UI5 Web Components; Bootstrap utilities and grid system. Keep markup consistent with existing components already used in pages.
- Prefer small, incremental changes that match existing patterns (Lit components + Reatom state).
- Prefer composing existing page/component patterns over introducing new architectural layers.
