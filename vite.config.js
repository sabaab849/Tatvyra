import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      /*
       * This project lives inside a OneDrive folder, which locks files while it
       * syncs them. Vite's watcher treats that lock as a fatal EBUSY and takes
       * the whole dev server down with it — the crash looks unrelated to the
       * app, because nothing in the app caused it.
       *
       * `product images/` is working source art that nothing imports (the
       * served copies are converted into public/images/), so there is no
       * reason to watch it and every reason not to: it is the largest folder
       * in the project and the one OneDrive touches most.
       */
      ignored: ['**/product images/**'],
    },
  },
})
