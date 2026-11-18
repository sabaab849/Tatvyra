/**
 * Shiprocket API client.
 *
 * Configured by server env vars:
 *   SHIPROCKET_EMAIL     the API user's email (Settings -> API in Shiprocket;
 *                        it must differ from the main login email)
 *   SHIPROCKET_PASSWORD  that API user's password
 *   SHIPROCKET_PICKUP    optional: the pickup location name, exactly as saved
 *                        in Settings -> Pickup Addresses. Left unset, the
 *                        account's primary (or only) pickup address is used.
 * Until the email and password are set, shiprocketConfig() returns null and
 * paid orders are simply not sent — payments are never affected.
 */
const BASE = 'https://apiv2.shiprocket.in/v1/external'

export function shiprocketConfig() {
  const email = process.env.SHIPROCKET_EMAIL
  const password = process.env.SHIPROCKET_PASSWORD
  const pickup = process.env.SHIPROCKET_PICKUP || null
  return email && password ? { email, password, pickup } : null
}

/**
 * The pickup location to ship from: the configured name, else the account's
 * primary address, else its first. Throws when the account has none yet.
 */
export async function pickupLocation(config) {
  if (config.pickup) return config.pickup
  const data = await shiprocket(config, '/settings/company/pickup')
  const list = data?.data?.shipping_address ?? []
  const chosen = list.find((a) => a.is_primary_location) ?? list[0]
  if (!chosen?.pickup_location) throw new Error('no pickup address in the Shiprocket account yet')
  return chosen.pickup_location
}

/* Shiprocket tokens last ten days; a warm function reuses one for a day. */
let cached = { token: null, until: 0 }

async function token(config) {
  if (cached.token && Date.now() < cached.until) return cached.token
  const response = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: config.email, password: config.password }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.token) {
    throw new Error(`Shiprocket login failed: ${response.status} ${data.message ?? ''}`)
  }
  cached = { token: data.token, until: Date.now() + 24 * 60 * 60 * 1000 }
  return data.token
}

export async function shiprocket(config, path, { method = 'GET', body } = {}) {
  const response = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await token(config)}` },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    if (response.status === 401) cached = { token: null, until: 0 }
    const detail = data.errors ? JSON.stringify(data.errors) : data.message ?? ''
    throw new Error(`Shiprocket ${method} ${path} failed: ${response.status} ${detail}`)
  }
  return data
}
