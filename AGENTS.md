## Project overview

This project is a starter template for building applications using Lit, Reatom and UI5

## Dev environment

- Node.js project managed with Yarn

## Setup commands

- Install dependencies: `yarn install`
- Start dev server: `yarn dev`
- Production build: `yarn build`
- Preview build: `yarn preview`

## Testing

- Run unit tests: `yarn test`
- Prefer narrowing failures first (e.g., a specific test file) via Vitest CLI options when applicable.

## Storybook

- Run Storybook: `yarn storybook`
- Build Storybook: `yarn build-storybook`

## Code style and conventions

- TypeScript is strict (`tsconfig.json` has `strict: true`).
- Treat TypeScript + ESLint issues as build-quality problems; keep changes type-safe.
- Avoid introducing unused locals/params (enabled in `tsconfig.json`).
- Prefer small, incremental changes that match existing patterns (Lit components + Reatom state).

## Project structure (high-level)

- App entry: `src/main.ts`, HTML: `src/index.html`
- Pages: `src/pages/*`
- State/store: `src/stores/*`
- APIs: `src/api/*`
- Setup/integration glue: `src/setup/*` (router, services, ui5 setup, etc.)
- Styling: `src/styles/main.scss` (and per-page scss)

## UI framework notes

- UI uses UI5 Web Components; keep markup consistent with existing components already used in pages.
- Components are authored with Lit; prefer composing existing page/component patterns over introducing new architectural layers.
