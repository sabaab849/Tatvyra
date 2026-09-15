/**
 * Cart items -> the flat lines the summary and the stored order use.
 *
 * The cart holds a live product object; an order needs a snapshot that still
 * reads correctly after the cart is emptied, and after the catalogue changes.
 */
export function toOrderLines(items) {
  return items.map((line) => ({
    id: line.id,
    slug: line.product.slug,
    name: line.product.name,
    size: line.size,
    quantity: line.quantity,
    unitPrice: line.unitPrice,
    lineTotal: line.lineTotal,
  }))
}
