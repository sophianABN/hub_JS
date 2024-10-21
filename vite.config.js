import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync(resolve(__dirname, 'src', '**/*.html')).map(file => [
          file.replace(/^.*[\\\/]/, '').replace(/\.html$/, ''),
          file
        ])
      ),
    },
  },
  server: {
    open: '/index.html'
  }
})
