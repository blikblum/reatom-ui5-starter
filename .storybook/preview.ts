import type { Preview } from '@storybook/web-components-vite'

import '../src/styles/main.scss'

import '../src/setup/storybook-preset'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
