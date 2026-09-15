/**
 * The payment seam.
 *
 * The gateway has not been chosen yet, so nothing in this folder — and nothing
 * in the checkout pages — knows about a specific provider. A provider is any
 * object shaped like the contract below; the checkout renders whatever methods
 * the active provider advertises and calls one function to take a payment.
 *
 * TO CONNECT THE REAL GATEWAY LATER
 *   1. Add src/payments/<provider>.js exporting the same shape as mockGateway.
 *   2. Return it from getPaymentGateway() below.
 * Nothing else changes: no page imports a provider directly, and the payment
 * UI is driven by `provider.methods`, so a provider that offers different
 * methods renders different fields without the checkout being redesigned.
 *
 * Keys and secrets belong in the provider module, read from environment
 * variables at build time. None exist yet and none are invented here.
 *
 * PROVIDER CONTRACT
 *   id       string   short identifier, e.g. 'mock'
 *   label    string   shown to the customer on the review line
 *   isDemo   boolean  true renders the demo notice in the payment UI
 *   methods  array    [{ id, label, hint, fields: [...] }]
 *   pay(request) -> Promise<PaymentResult>
 *
 *     request  { amount, currency, method, fields, reference, onStage }
 *       amount    integer, whole rupees
 *       method    the chosen method id
 *       fields    { [fieldName]: value } for that method
 *       reference the order reference, for reconciliation
 *       onStage   optional (stage) => void, for progress copy
 *
 *     PaymentResult { status, reference, method, message, code }
 *       status  one of PaymentStatus.Succeeded | PaymentStatus.Failed
 *       code    machine-readable failure reason, null when succeeded
 *       message customer-facing sentence
 */
import { mockGateway } from './mockGateway'

/** The states the payment UI can be in. */
export const PaymentStatus = {
  Idle: 'idle',
  Processing: 'processing',
  Succeeded: 'succeeded',
  Failed: 'failed',
}

/**
 * The active provider. Swap the return value when the client confirms theirs.
 */
export function getPaymentGateway() {
  return mockGateway
}
