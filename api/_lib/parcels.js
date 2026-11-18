/**
 * Packed weight and box size per pack, for Shiprocket.
 *
 * PLACEHOLDERS: Tatvyra has not supplied packed weights or carton sizes yet.
 * These are estimates — net weight plus jar or pouch plus packing — so orders
 * can flow into Shiprocket now. Couriers bill on the larger of actual and
 * volumetric weight, so replace these with measured figures as soon as they
 * exist. Shiprocket also lets the team correct an order before booking.
 *
 * weight in kg, box [length, breadth, height] in cm. Keyed by category, then
 * by pack size; `default` covers any size not listed.
 */
export const PARCELS = {
  'nut-butters': {
    '250g': { weight: 0.45, box: [10, 10, 10] },
    '500g': { weight: 0.8, box: [11, 11, 13] },
    '1000g': { weight: 1.4, box: [13, 13, 16] },
    default: { weight: 0.8, box: [11, 11, 13] },
  },
  'raw-honey': {
    '250g': { weight: 0.45, box: [9, 9, 11] },
    '500g': { weight: 0.8, box: [10, 10, 14] },
    default: { weight: 0.8, box: [10, 10, 14] },
  },
  moringa: {
    '100g pouch': { weight: 0.2, box: [18, 12, 4] },
    default: { weight: 0.25, box: [8, 8, 12] },
  },
  spirulina: {
    '100g pouch': { weight: 0.2, box: [18, 12, 4] },
    default: { weight: 0.25, box: [8, 8, 12] },
  },
}

const FALLBACK = { weight: 0.5, box: [15, 15, 10] }

const parcelFor = (product, size) => {
  const byCategory = PARCELS[product?.category]
  return byCategory?.[size] ?? byCategory?.default ?? FALLBACK
}

/**
 * One parcel for the whole order. Weights add up. A single pack ships in its
 * own box; several are packed into a cube holding their combined volume plus
 * 15% for packing, never smaller than the largest pack. A rough rule — the
 * team can adjust it in Shiprocket before booking.
 */
export function parcelForOrder(lines) {
  let weight = 0
  let volume = 0
  let units = 0
  let largest = [1, 1, 1]
  for (const line of lines) {
    const p = parcelFor(line.product, line.size)
    weight += p.weight * line.quantity
    volume += p.box[0] * p.box[1] * p.box[2] * line.quantity
    units += line.quantity
    largest = largest.map((d, i) => Math.max(d, p.box[i]))
  }
  const side = Math.ceil(Math.cbrt(volume * 1.15))
  const [length, breadth, height] = units === 1 ? largest : largest.map((d) => Math.max(d, side))
  return { weight: Math.max(0.1, Math.round(weight * 100) / 100), length, breadth, height }
}
