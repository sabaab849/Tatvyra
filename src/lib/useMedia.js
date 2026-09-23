import { useSyncExternalStore } from 'react'

/* Whether a media query matches, kept current as it changes. False on the
   server, where there is no viewport to ask. */
export default function useMedia(query) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
