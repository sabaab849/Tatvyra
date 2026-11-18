/**
 * Tiny request/response helpers shared by the payment functions.
 *
 * Written against plain Node req/res so the same handler runs on Vercel and
 * inside the Vite dev server (see the devApi plugin in vite.config.js).
 * Folders starting with "_" are not turned into routes by Vercel.
 */

export async function readJson(req) {
  // Vercel pre-parses JSON bodies; the Vite dev server hands over the raw stream.
  if (req.body !== undefined) {
    return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body
  }
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

export function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

/** The keys, read on every call so a changed env var needs no code change. */
export function razorpayKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  return keyId && keySecret ? { keyId, keySecret } : null
}
