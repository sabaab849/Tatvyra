import { useEffect } from 'react'

/**
 * Shared behaviour for drawers and overlays: lock the page behind them, close
 * on Escape, and move focus into the panel so keyboard users are not stranded
 * at the top of the document.
 */
export function useOverlay(isOpen, onClose, panelRef) {
  useEffect(() => {
    if (!isOpen) return

    const body = document.body
    const previouslyFocused = document.activeElement
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    body.dataset.scrollLocked = 'true'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef?.current) return

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    const focusTimer = window.setTimeout(() => {
      panelRef?.current
        ?.querySelector('[data-autofocus], button, a[href], input')
        ?.focus({ preventScroll: true })
    }, 40)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(focusTimer)
      delete body.dataset.scrollLocked
      body.style.paddingRight = ''
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [isOpen, onClose, panelRef])
}
