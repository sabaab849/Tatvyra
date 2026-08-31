/* Line icons drawn to a single 1.5px stroke weight so the UI stays quiet.
   Decorative by default — every interactive use supplies its own label. */

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const SearchIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="9" r="5.5" />
    <path d="M13.2 13.2 17 17" />
  </svg>
)

export const AccountIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="10" cy="6.75" r="3.25" />
    <path d="M3.75 16.75c.9-3 3.3-4.5 6.25-4.5s5.35 1.5 6.25 4.5" />
  </svg>
)

export const BagIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4.4 6.25h11.2l.9 10.5H3.5z" />
    <path d="M7.25 8.4V5.6a2.75 2.75 0 0 1 5.5 0v2.8" />
  </svg>
)

export const MenuIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 6h14M3 10h14M3 14h14" />
  </svg>
)

export const CloseIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 5l10 10M15 5 5 15" />
  </svg>
)

export const ArrowIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3.5 10h13M11.5 5l5 5-5 5" />
  </svg>
)

export const MinusIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 10h10" />
  </svg>
)

export const PlusIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M10 5v10M5 10h10" />
  </svg>
)

export const MailIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="2.75" y="4.75" width="14.5" height="10.5" rx="1" />
    <path d="m3.25 5.5 6.75 5 6.75-5" />
  </svg>
)

export const PhoneIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M6.4 3.4 8 6.2 6.6 7.9c.7 1.6 1.9 2.8 3.5 3.5l1.7-1.4 2.8 1.6-.5 2.4c-.2.8-1 1.3-1.8 1.1C7.9 14.2 5.1 11.4 3.7 6.6c-.2-.8.3-1.6 1.1-1.8z" />
  </svg>
)

export const PinIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M10 17.25s5-4.6 5-8.5a5 5 0 0 0-10 0c0 3.9 5 8.5 5 8.5Z" />
    <circle cx="10" cy="8.6" r="1.9" />
  </svg>
)
