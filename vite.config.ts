import { defineConfig } from 'vite'

import autoprefixer from 'autoprefixer'

export default defineConfig(({ mode }) => {
  // todo: configure sourcemaps
  const devModes = ['development', 'remote']
  return {
    root: 'src',
    build: {
      // Relative to the root
      outDir: '../dist',
    },
    publicDir: '../public',
    envDir: '..',
    resolve: {
      tsconfigPaths: true,
    },
    css: {
      postcss: { plugins: [autoprefixer()] },
    },
  }
})
