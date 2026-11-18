/**
 * The payment seam.
 *
 * Nothing in the checkout pages knows about a specific provider. A provider is
 * any object shaped like the contract below; the checkout renders whatever
 * methods the active provider advertises and calls one function to take a
 * payment.
 *
 * The live provider is Razorpay (razorpay.js), backed by the server functions
 * in api/razorpay/. Its keys are server environment variables
 * (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) — never VITE_ variables, which would
 * ship the secret to every browser. mockGateway.js is kept for demos: return
 * it from getPaymentGateway() to take the checkout offline.
 *
 * PROVIDER CONTRACT
 *   id       string   short identifier, e.g. 'mock'
 *   label    string   shown to the customer on the review line
 *   isDemo   boolean  true renders the demo notice in the payment UI
 *   methods  array    [{ id, label, hint, fields: [...] }]
 *   pay(request) -> Promise<PaymentResult>
 *
 *     request  { amount, currency, method, fields, reference, lines, customer, onStage }
 *       amount    rupees; a few MRPs carry paise, so it is not always whole.
 *                 Display only for a server-priced provider like Razorpay,
 *                 which re-prices `lines` itself.
 *       method    the chosen method id
 *       fields    { [fieldName]: value } for that method
 *       reference the order reference, for reconciliation
 *       lines     [{ slug, size, quantity, ... }] the basket
 *       customer  the delivery details from /checkout
 *       onStage   optional (stage) => void, for progress copy
 *
 *     PaymentResult { status, reference, method, message, code, paymentId? }
 *       status  one of PaymentStatus.Succeeded | PaymentStatus.Failed
 *       code    machine-readable failure reason, null when succeeded
 *       message customer-facing sentence
 */
import { razorpayGateway } from './razorpay'

/** The states the payment UI can be in. */
export const PaymentStatus = {
  Idle: 'idle',
  Processing: 'processing',
  Succeeded: 'succeeded',
  Failed: 'failed',
}

/** The active provider. */
export function getPaymentGateway() {
  return razorpayGateway
}
