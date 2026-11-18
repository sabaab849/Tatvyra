import { PaymentStatus } from './gateway'

/**
 * Razorpay, through its hosted Checkout window.
 *
 * Razorpay's own window collects UPI, card, netbanking and wallet details, so
 * none of them ever touch this site. The flow:
 *   1. POST /api/razorpay/order  — the server prices the basket and opens an order
 *   2. open Checkout with that order id
 *   3. POST /api/razorpay/verify — the server checks Razorpay's signature
 * Only a verified signature counts as paid.
 *
 * The keys live on the server (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET); the
 * public key id reaches the browser in the order reply, the secret never does.
 */

const SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

let scriptPromise = null
function loadCheckout() {
  if (typeof window !== 'undefined' && window.Razorpay) return Promise.resolve()
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        scriptPromise = null
        reject(new Error('checkout script failed'))
      }
      document.body.appendChild(script)
    })
  }
  return scriptPromise
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json().catch(() => ({}))
  return { ok: response.ok, data }
}

const failed = (reference, code, message) => ({
  status: PaymentStatus.Failed,
  reference,
  method: 'razorpay',
  code,
  message,
})

export const razorpayGateway = {
  id: 'razorpay',
  label: 'Razorpay',
  isDemo: false,

  methods: [
    {
      id: 'razorpay',
      label: 'UPI, cards, netbanking & wallets',
      hint: 'You will pay in Razorpay’s secure window.',
      fields: [],
    },
  ],

  async pay({ reference, lines = [], customer = {}, onStage }) {
    const stage = (text) => onStage?.(text)

    stage('Reaching the payment gateway')
    try {
      await loadCheckout()
    } catch {
      return failed(reference, 'unavailable', 'We could not load the payment window. Check your connection and try again. Nothing has been charged.')
    }

    const order = await postJson('/api/razorpay/order', {
      reference,
      lines: lines.map(({ slug, size, quantity }) => ({ slug, size, quantity })),
      customer,
    }).catch(() => ({ ok: false, data: {} }))

    if (!order.ok || !order.data.orderId) {
      return failed(reference, 'order_failed', order.data.error ?? 'We could not start the payment. Nothing has been charged.')
    }

    stage('Complete the payment in the Razorpay window')

    const outcome = await new Promise((resolve) => {
      let lastError = null
      const rzp = new window.Razorpay({
        key: order.data.keyId,
        order_id: order.data.orderId,
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'Tatvyra',
        description: `Order ${reference}`,
        image: `${window.location.origin}/brand/tatvyra-logo-mark.png`,
        prefill: { name: customer.name, email: customer.email, contact: customer.phone },
        notes: { reference },
        theme: { color: '#f26422' },
        handler: (response) => resolve({ paid: true, response }),
        modal: {
          // Closing the window ends the attempt. Razorpay lets the customer
          // retry inside the window after a decline, so a failure is only
          // reported once they give up and close it.
          ondismiss: () => resolve({ paid: false, error: lastError }),
        },
      })
      rzp.on('payment.failed', (response) => {
        lastError = response?.error ?? null
      })
      rzp.open()
    })

    if (!outcome.paid) {
      return outcome.error
        ? failed(reference, 'declined', outcome.error.description || 'The payment did not go through. No money has left your account.')
        : failed(reference, 'cancelled', 'You closed the payment window before paying. Nothing has been charged.')
    }

    stage('Confirming your payment')
    const check = await postJson('/api/razorpay/verify', outcome.response).catch(() => ({ ok: false, data: {} }))

    if (!check.ok || !check.data.verified) {
      return failed(
        reference,
        'unverified',
        `We could not confirm this payment. If money has left your account, quote ${reference} and payment ID ${outcome.response.razorpay_payment_id} when you contact us.`,
      )
    }

    return {
      status: PaymentStatus.Succeeded,
      reference,
      method: 'razorpay',
      methodLabel: 'Razorpay',
      paymentId: outcome.response.razorpay_payment_id,
      orderId: outcome.response.razorpay_order_id,
      code: null,
      message: 'Payment received.',
    }
  },
}
