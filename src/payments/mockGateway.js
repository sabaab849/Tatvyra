import { PaymentStatus } from './gateway'

/**
 * A stand-in provider, so the whole checkout can be demonstrated before the
 * client picks a real one.
 *
 * It talks to nothing. There is no network call, no key, no SDK — the delays
 * and stages below exist purely so the processing, success and failure states
 * can be shown and reviewed. Deleting this file and returning a real provider
 * from getPaymentGateway() is the only change the swap needs.
 *
 * Outcomes are deterministic so a demo can be driven on purpose:
 *   - a card number ending 0000
 *   - a UPI ID beginning "fail"
 *   - the "Bank that declines" netbanking option
 * decline. Anything else is authorised.
 */

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Digits only, so "4242 4242 4242 4242" and "4242424242424242" behave alike. */
const digits = (value = '') => value.replace(/\D/g, '')

export const mockGateway = {
  id: 'mock',
  label: 'Demo gateway',
  isDemo: true,

  methods: [
    {
      id: 'upi',
      label: 'UPI',
      hint: 'Approve the request in your UPI app.',
      fields: [
        {
          name: 'vpa',
          label: 'UPI ID',
          placeholder: 'name@bank',
          autoComplete: 'off',
          required: true,
          validate: (v) => (/^[\w.-]{2,}@[a-z]{2,}$/i.test(v.trim()) ? null : 'Enter a UPI ID like name@bank.'),
        },
      ],
    },
    {
      id: 'card',
      label: 'Card',
      hint: 'Credit or debit card.',
      fields: [
        {
          name: 'number',
          label: 'Card number',
          placeholder: '4242 4242 4242 4242',
          inputMode: 'numeric',
          autoComplete: 'off',
          required: true,
          validate: (v) => (digits(v).length >= 12 ? null : 'Enter a card number.'),
        },
        {
          name: 'expiry',
          label: 'Expiry',
          placeholder: 'MM / YY',
          inputMode: 'numeric',
          autoComplete: 'off',
          required: true,
          half: true,
          validate: (v) => (/^\d{2}\s*\/?\s*\d{2}$/.test(v.trim()) ? null : 'Use MM / YY.'),
        },
        {
          name: 'cvv',
          label: 'CVV',
          placeholder: '123',
          inputMode: 'numeric',
          autoComplete: 'off',
          required: true,
          half: true,
          validate: (v) => (/^\d{3,4}$/.test(v.trim()) ? null : 'Three or four digits.'),
        },
      ],
    },
    {
      id: 'netbanking',
      label: 'Netbanking',
      hint: 'You would continue on your bank’s page.',
      fields: [
        {
          name: 'bank',
          label: 'Bank',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Choose your bank' },
            { value: 'demo-1', label: 'Demo Bank' },
            { value: 'demo-2', label: 'Second Demo Bank' },
            { value: 'decline', label: 'Bank that declines (demo)' },
          ],
          validate: (v) => (v ? null : 'Choose a bank.'),
        },
      ],
    },
  ],

  async pay({ amount, method, fields = {}, reference, onStage }) {
    const stage = (text) => onStage?.(text)

    stage('Reaching the payment gateway')
    await wait(700)

    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        status: PaymentStatus.Failed,
        reference,
        method,
        code: 'invalid_amount',
        message: 'That order total could not be charged. Please try again from the cart.',
      }
    }

    stage(method === 'upi' ? 'Waiting for approval in your UPI app' : 'Authorising with your bank')
    await wait(1100)

    const declined =
      (method === 'card' && digits(fields.number).endsWith('0000')) ||
      (method === 'upi' && fields.vpa?.trim().toLowerCase().startsWith('fail')) ||
      (method === 'netbanking' && fields.bank === 'decline')

    if (declined) {
      return {
        status: PaymentStatus.Failed,
        reference,
        method,
        code: 'declined',
        message: 'Your bank declined the payment. No money has left your account.',
      }
    }

    stage('Confirming your order')
    await wait(600)

    return {
      status: PaymentStatus.Succeeded,
      reference,
      method,
      code: null,
      message: 'Payment authorised.',
    }
  },
}
