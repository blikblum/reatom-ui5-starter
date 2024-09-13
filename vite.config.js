import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
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
    plugins: [tsConfigPaths()],
    css: {
      postcss: { plugins: [autoprefixer()] },
    },
  }
})
