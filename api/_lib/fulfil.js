import { quoteLines } from '../../src/lib/pricing.js'
import { parcelForOrder } from './parcels.js'
import { decodeCart, razorpay } from './razorpay.js'
import { pickupLocation, shiprocket, shiprocketConfig } from './shiprocket.js'

/**
 * What happens after Razorpay's signature checks out.
 *
 * Everything here reads from Razorpay's own records (the order and its notes,
 * written by api/razorpay/order.js), never from the browser — so what is
 * captured and shipped is exactly what was paid for.
 */

/**
 * Captures the payment if it is only authorised, so it is kept regardless of
 * the dashboard's auto-capture setting. Returns the payment.
 */
export async function capturePayment(orderId, paymentId) {
  let payment = await razorpay(`/payments/${paymentId}`)
  if (payment.order_id !== orderId) throw new Error('payment does not belong to this order')
  if (payment.status === 'authorized') {
    try {
      payment = await razorpay(`/payments/${paymentId}/capture`, {
        method: 'POST',
        body: { amount: payment.amount, currency: payment.currency },
      })
    } catch {
      // Auto-capture may have won the race; read back the real state.
      payment = await razorpay(`/payments/${paymentId}`)
    }
  }
  return payment
}

const istTimestamp = () => {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString()
  return `${ist.slice(0, 10)} ${ist.slice(11, 16)}`
}

const phoneDigits = (value = '') => String(value).replace(/\D/g, '').slice(-10)

/**
 * Creates the Shiprocket order for a captured payment, once. The Razorpay
 * order's `shiprocket` note records the Shiprocket order id, so a repeat call
 * does nothing. Returns { status: 'skipped' | 'exists' | 'created', ... }.
 */
export async function sendToShiprocket(orderId, payment) {
  const config = shiprocketConfig()
  if (!config) return { status: 'skipped', reason: 'shiprocket not configured' }
  if (payment.status !== 'captured') return { status: 'skipped', reason: `payment ${payment.status}` }

  const order = await razorpay(`/orders/${orderId}`)
  const notes = order.notes ?? {}
  if (notes.shiprocket) return { status: 'exists', shiprocketOrderId: notes.shiprocket }

  const quote = quoteLines(decodeCart(notes))
  if (quote.items.length === 0) throw new Error(`order ${orderId} has no readable cart notes`)

  const [firstName, ...rest] = String(notes.name ?? 'Customer').trim().split(/\s+/)
  const parcel = parcelForOrder(quote.items)

  const created = await shiprocket(config, '/orders/create/adhoc', {
    method: 'POST',
    body: {
      order_id: notes.reference || order.receipt || orderId,
      order_date: istTimestamp(),
      pickup_location: await pickupLocation(config),
      comment: `Razorpay ${payment.id}`,
      billing_customer_name: firstName,
      billing_last_name: rest.join(' '),
      billing_address: notes.address || '-',
      billing_address_2: notes.address2 || '',
      billing_city: notes.city || '',
      billing_pincode: notes.pin || '',
      billing_state: notes.state || '',
      billing_country: 'India',
      billing_email: notes.email || '',
      billing_phone: phoneDigits(notes.phone),
      shipping_is_billing: true,
      order_items: quote.items.map((i) => ({
        name: i.size ? `${i.product.name} (${i.size})` : i.product.name,
        sku: i.size ? `${i.product.sku}-${i.size.replace(/\s+/g, '')}` : i.product.sku,
        units: i.quantity,
        selling_price: i.unitPrice,
      })),
      payment_method: 'Prepaid',
      sub_total: quote.total,
      ...parcel,
    },
  })

  const shiprocketOrderId = String(created.order_id ?? created.shipment_id ?? 'created')
  try {
    await razorpay(`/orders/${orderId}`, {
      method: 'PATCH',
      body: { notes: { ...notes, shiprocket: shiprocketOrderId } },
    })
  } catch (error) {
    // The Shiprocket order exists; failing to mark it only risks a duplicate
    // on a retry, which the team can cancel. Never fail the customer for it.
    console.error('Could not mark Razorpay order as sent to Shiprocket', error.message)
  }
  return { status: 'created', shiprocketOrderId, shipmentId: created.shipment_id }
}
