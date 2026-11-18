import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

/*
 * Serves the Vercel functions in api/ from the Vite dev server, so
 * `npm run dev` runs the real Razorpay checkout end to end without the Vercel
 * CLI. In production Vercel serves api/ itself and this plugin does nothing.
 *
 * Server-only variables from .env.local (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
 * are copied onto process.env for the functions; they are not VITE_ variables,
 * so they never reach the browser bundle.
 */
function devApi() {
  return {
    name: 'tatvyra-dev-api',
    apply: 'serve',
    configureServer(server) {
      Object.assign(
        process.env,
        loadEnv(server.config.mode, process.cwd(), ['RAZORPAY_', 'SHIPROCKET_']),
      )

      server.middlewares.use('/api', async (req, res, next) => {
        const route = (req.url ?? '').split('?')[0].replace(/^\/+|\/+$/g, '')
        if (!/^[a-z0-9/-]+$/i.test(route) || route.split('/').some((p) => p.startsWith('_'))) {
          return next()
        }
        let mod
        try {
          mod = await server.ssrLoadModule(`/api/${route}.js`)
        } catch {
          return next()
        }
        try {
          await mod.default(req, res)
        } catch (error) {
          server.config.logger.error(`[api/${route}] ${error?.stack ?? error}`)
          if (!res.headersSent) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Server error' }))
          }
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApi()],
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
