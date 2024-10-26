import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
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
    define: {
      'import.meta.env.VITE_FIREBASE_TODOLIST_API_KEY': JSON.stringify(env.VITE_FIREBASE_TODOLIST_API_KEY),
      'import.meta.env.VITE_FIREBASE_TODOLIST_AUTH_DOMAIN': JSON.stringify(env.VITE_FIREBASE_TODOLIST_AUTH_DOMAIN),
      'import.meta.env.VITE_FIREBASE_TODOLIST_DATABASE_URL': JSON.stringify(env.VITE_FIREBASE_TODOLIST_DATABASE_URL),
      'import.meta.env.VITE_FIREBASE_TODOLIST_PROJECT_ID': JSON.stringify(env.VITE_FIREBASE_TODOLIST_PROJECT_ID),
      'import.meta.env.VITE_FIREBASE_TODOLIST_STORAGE_BUCKET': JSON.stringify(env.VITE_FIREBASE_TODOLIST_STORAGE_BUCKET),
      'import.meta.env.VITE_FIREBASE_TODOLIST_MESSAGING_SENDER_ID': JSON.stringify(env.VITE_FIREBASE_TODOLIST_MESSAGING_SENDER_ID),
      'import.meta.env.VITE_FIREBASE_TODOLIST_APP_ID': JSON.stringify(env.VITE_FIREBASE_TODOLIST_APP_ID),
      'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify(env.VITE_FIREBASE_API_KEY),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN),
      'import.meta.env.VITE_FIREBASE_DATABASE_URL': JSON.stringify(env.VITE_FIREBASE_DATABASE_URL),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(env.VITE_FIREBASE_STORAGE_BUCKET),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify(env.VITE_FIREBASE_APP_ID),
    },
    server: {
      open: '/index.html',
      headers: {
        'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com;"
      }
    }
  }
})
