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

/* No preservatives — a laboratory flask, a line of liquid in it. */
export const FlaskIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M9.4 3.6h5.2" />
    <path d="M10.3 3.6v5.3l-5 8.7a2 2 0 0 0 1.7 3h10a2 2 0 0 0 1.7-3l-5-8.7V3.6" />
    <path d="M7.5 14.6h9" />
  </svg>
)

/* No added sugar — a sugar cube. */
export const SugarCubeIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M12 3.4 19.4 7.7v8.6L12 20.6l-7.4-4.3V7.7z" />
    <path d="M4.6 7.7 12 12l7.4-4.3M12 12v8.6" />
  </svg>
)

/* A certified process — a shield carrying a tick. */
export const ShieldCheckIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M12 3 19 5.6v5.3c0 4.5-3 7.9-7 9.6-4-1.7-7-5.1-7-9.6V5.6z" />
    <path d="m8.9 11.9 2.2 2.2 4.1-4.3" />
  </svg>
)

/* Immunity — a shield carrying a cross. */
export const ShieldCrossIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M12 3 19 5.6v5.3c0 4.5-3 7.9-7 9.6-4-1.7-7-5.1-7-9.6V5.6z" />
    <path d="M12 8.6v6.2M8.9 11.7h6.2" />
  </svg>
)

/* Topical use — a plaster, its pad dotted. */
export const PlasterIcon = (p) => (
  <svg {...mark} {...p}>
    <g transform="rotate(-45 12 12)">
      <rect x="2.2" y="8" width="19.6" height="8" rx="4" />
      <path d="M9.2 8v8M14.8 8v8" />
      <path d="M11 10.9h.01M13 10.9h.01M11 13.1h.01M13 13.1h.01" />
    </g>
  </svg>
)

/* Antioxidants — three bonded atoms. */
export const MoleculeIcon = (p) => (
  <svg {...mark} {...p}>
    <circle cx="12" cy="4.9" r="2.1" />
    <circle cx="5.2" cy="17.6" r="2.1" />
    <circle cx="18.8" cy="17.6" r="2.1" />
    <path d="M12 7v5M12 12l-5.1 4.2M12 12l5.1 4.2" />
  </svg>
)

/* Cough and cold — a pair of lungs. */
export const LungsIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M12 3.5v8.2M12 11.7c-.9 1.3-2 2-3.3 2.2M12 11.7c.9 1.3 2 2 3.3 2.2" />
    <path d="M8.6 7.2c-2.7.2-5 4.5-5.1 9.2-.05 2.2 1 3.4 2.8 3.4 1.5 0 2.7-.6 3.5-1.6.5-.7.7-1.6.7-2.5V8.9c0-1-.8-1.8-1.9-1.7z" />
    <path d="M15.4 7.2c2.7.2 5 4.5 5.1 9.2.05 2.2-1 3.4-2.8 3.4-1.5 0-2.7-.6-3.5-1.6-.5-.7-.7-1.6-.7-2.5V8.9c0-1 .8-1.8 1.9-1.7z" />
  </svg>
)

/* Plant protein — a flexed arm, fist raised, the biceps creased. */
export const ArmIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M6.2 20.4c-1.8 0-2.9-1.3-2.9-3.3 0-3.7 1.6-7.1 3.6-10.2l1.1-1.8c.4-.7 1.3-.9 2-.4l1 .7c.6.5.7 1.3.2 1.9l-1 1.2.3 3.2c1.3-1.2 3-1.7 4.8-1.3 1.9.4 3.3 1.8 3.9 3.5 1.2 0 2.1.9 2.1 2.1v1c0 1.9-1.5 3.4-3.4 3.4z" />
    <path d="M12.4 14.3c1.4.1 2.5.9 3 2.1" />
  </svg>
)

/* Healthy fats — a heart. */
export const HeartIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M12 19.6c-4.6-3-7.6-6.1-7.6-9.5A4.1 4.1 0 0 1 8.5 6c1.5 0 2.8.8 3.5 2 .7-1.2 2-2 3.5-2a4.1 4.1 0 0 1 4.1 4.1c0 3.4-3 6.5-7.6 9.5z" />
  </svg>
)

/* Liver — the organ in outline, with its lobe line. */
export const LiverIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M3.4 8.6c0-2 1.6-3.3 3.6-3.2 3.6.2 7.3 1 10.8.3 2-.4 3.3 1 3.1 2.9-.3 3.6-2.8 6.1-6.2 7.8-2.3 1.2-4.2 2.3-5.7 3.9-.5.5-1.3.3-1.4-.4-.7-3.9-4.2-6.3-4.2-11.3z" />
    <path d="M12.6 5.9c-.4 2.6-1.8 4.8-4 6.5" />
  </svg>
)

/* --- Brand facts ----------------------------------------------------------
   The homepage brand card's three rows: company, ranges, standards. */

/* Company — an office tower beside a lower block, its windows lit. */
export const BuildingIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M3.6 20.4h16.8" />
    <path d="M9.4 20.4V4.6c0-.6.4-1 1-1h7c.6 0 1 .4 1 1v15.8" />
    <path d="M9.4 9.4H6.4c-.6 0-1 .4-1 1v10" />
    <path d="M12.2 7h.9M14.9 7h.9M12.2 10.4h.9M14.9 10.4h.9M12.2 13.8h.9M14.9 13.8h.9M7.2 13h.4M7.2 16.2h.4" />
    <path d="M12.9 20.4v-2.9h2.3v2.9" />
  </svg>
)

/* Ranges — two leaves from one stem. */
export const LeavesIcon = (p) => (
  <svg {...mark} {...p}>
    <path d="M11.3 19.4C5.9 18.8 3.7 14.6 4.5 8.5c5.3.7 7.8 4.5 6.8 10.9z" />
    <path d="M12.7 19.4c5.4-.6 7.6-4.8 6.8-10.9-5.3.7-7.8 4.5-6.8 10.9z" />
    <path d="M11.3 19.4 7.3 12.2M12.7 19.4l4-7.2M12 19.4v1.8" />
  </svg>
)

/* Standards — a seal on two ribbon tails. */
export const SealIcon = (p) => (
  <svg {...mark} {...p}>
    <circle cx="12" cy="9.4" r="5.9" />
    <circle cx="12" cy="9.4" r="3.2" />
    <path d="M8.7 14.3 7.3 20.5l2.4-1 1.6 2 .9-5.4M15.3 14.3l1.4 6.2-2.4-1-1.6 2-.9-5.4" />
  </svg>
)
