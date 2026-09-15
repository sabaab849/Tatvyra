/**
 * The delivery details captured on /checkout, held between that page and
 * /checkout/payment.
 *
 * sessionStorage rather than localStorage: these are somebody's name, address
 * and phone number, and they should not outlive the tab. Router state alone
 * would not survive a refresh on the payment page.
 */
const KEY = 'tatvyra.checkout.v1'

export function saveDraft(details) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(details))
  } catch {
    /* private mode — the payment page will send them back to the details step */
  }
  return details
}

export function getDraft() {
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(KEY) ?? 'null')
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export function clearDraft() {
  try {
    window.sessionStorage.removeItem(KEY)
  } catch {
    /* nothing to clear */
  }
}
