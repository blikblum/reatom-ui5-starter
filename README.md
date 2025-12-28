# reatom-ui5-starter

Starter template for Lit + Reatom + UI5 Web Components.

## Requirements

- Node.js
- Yarn

## Quick start

```bash
yarn install
yarn dev
```

## Scripts

```bash
yarn dev            # start dev server
yarn build          # production build
yarn preview        # preview production build
yarn test           # run unit tests
yarn storybook      # start Storybook
yarn build-storybook
```

## Project structure

```
src/
  api/          # shared types and API models
  helpers/      # domTask utilities and helpers
  pages/        # page components (Lit)
  setup/        # router, UI5, Reatom, services wiring
  stores/       # Reatom atoms and service logic
  styles/       # global styles
```

## Pages and routing

Routes are defined in `src/main.ts`. Each page is a Lit component under `src/pages/<name>/`.

## DOM tasks (events)

The app uses DOM events as "tasks" to decouple UI components from services:

- Define task params/returns in `src/setup/tasks.ts`
- Register handlers in `src/setup/services.ts`
- Dispatch from components via `dispatchTask` in `src/helpers/domTask.ts`

## Storybook

Stories live alongside pages: `src/pages/<name>/<name>-page.stories.ts`.

## Testing

Run `yarn test`. Use Vitest CLI flags to narrow failures when needed.
