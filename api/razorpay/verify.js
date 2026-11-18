import { createHmac, timingSafeEqual } from 'node:crypto'
import { capturePayment, sendToShiprocket } from '../_lib/fulfil.js'
import { razorpayKeys, readJson, send } from '../_lib/http.js'

/**
 * POST /api/razorpay/verify
 *
 * Confirms a payment really came from Razorpay. Checkout hands the browser an
 * order id, a payment id and a signature; only someone holding the key secret
 * can produce that signature, so a forged "payment succeeded" fails here.
 *
 * Once verified it captures the payment (so it is kept whatever the dashboard's
 * auto-capture setting) and creates the Shiprocket order. Neither step can
 * fail the customer: the signature already proves they paid, and anything that
 * goes wrong is logged for the team to finish by hand.
 *
 * Body:  { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 * Reply: { verified: true, paymentId } or 400 { verified: false }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' })

  const keys = razorpayKeys()
  if (!keys) return send(res, 500, { error: 'Payments are not configured on the server.' })

  let body
  try {
    body = await readJson(req)
  } catch {
    return send(res, 400, { verified: false })
  }

  const orderId = String(body.razorpay_order_id ?? '')
  const paymentId = String(body.razorpay_payment_id ?? '')
  const signature = String(body.razorpay_signature ?? '')
  if (!orderId || !paymentId || !signature) return send(res, 400, { verified: false })

  const expected = createHmac('sha256', keys.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  const verified = a.length === b.length && timingSafeEqual(a, b)

  if (!verified) return send(res, 400, { verified })

  try {
    const payment = await capturePayment(orderId, paymentId)
    const shipment = await sendToShiprocket(orderId, payment)
    if (shipment.status === 'skipped') console.warn(`Shiprocket skipped for ${orderId}: ${shipment.reason}`)
  } catch (error) {
    console.error(`Post-payment step failed for ${orderId} / ${paymentId}:`, error.message)
  }

  return send(res, 200, { verified, paymentId })
}
