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

/* The bag from the Figma refresh — a flap bag, not the trapezoid BagIcon
   above, so it is drawn from the exported path rather than reusing that one.
   Its 20px box and 2px stroke are the designed weight; stroke is currentColor
   so it inherits the header's forest green. */
export const ShoppingBagIcon = (p) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M13.3333 8.3332C13.3333 9.21733 12.9821 10.0652 12.357 10.6904C11.7319 11.3156 10.8841 11.6668 10 11.6668C9.11594 11.6668 8.2681 11.3156 7.64298 10.6904C7.01786 10.0652 6.66667 9.21733 6.66667 8.3332M2.58545 5.02809H17.4138M2.83333 4.5554C2.61696 4.84391 2.5 5.19483 2.5 5.55548V16.6672C2.5 17.1093 2.67559 17.5332 2.98816 17.8458C3.30072 18.1584 3.72464 18.334 4.16667 18.334H15.8333C16.2754 18.334 16.6993 18.1584 17.0118 17.8458C17.3244 17.5332 17.5 17.1093 17.5 16.6672V5.55548C17.5 5.19483 17.383 4.84391 17.1667 4.5554L15.5 2.33272C15.3448 2.12571 15.1434 1.95769 14.912 1.84197C14.6806 1.72625 14.4254 1.666 14.1667 1.666H5.83333C5.57459 1.666 5.3194 1.72625 5.08798 1.84197C4.85655 1.95769 4.65525 2.12571 4.5 2.33272L2.83333 4.5554Z" />
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

/* --- Benefit & on-pack-mark glyphs ----------------------------------------
   Drawn on a 24 grid at a slightly heavier weight than the UI icons above,
   because these sit inside a 44px disc rather than a control. */

const mark = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

/* High protein. */
export const DumbbellIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M3.6 9.6v4.8M6.6 7.4v9.2M17.4 7.4v9.2M20.4 9.6v4.8M6.6 12h10.8" />
  </svg>
)

/* Nothing added — a droplet struck through. */
export const NoDropIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M12 3.4c3.3 3.9 5 6.5 5 8.8a5 5 0 0 1-10 0c0-2.3 1.7-4.9 5-8.8z" />
    <path d="M5.4 18.6 18.6 5.4" />
  </svg>
)

/* Micronutrients — a sprout putting out two leaves. */
export const SproutIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M12 20.4v-7.6" />
    <path d="M12.1 12.8c-.5-3.3 1.9-5.7 5.5-5.7.3 3.6-2.1 6.1-5.5 5.7z" />
    <path d="M11.9 15.2c-.4-2.7-2.5-4.3-5.3-4.1.1 2.8 2.1 4.4 5.3 4.1z" />
  </svg>
)

/* Clean label — a single leaf with its midrib. */
export const LeafMarkIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M18.6 4.6c.5 7.7-4.2 12.4-10.9 12.9C6.1 10.7 11 5.2 18.6 4.6z" />
    <path d="M7.7 17.5c2.6-3.7 5.7-6.6 9.3-8.7" />
  </svg>
)
