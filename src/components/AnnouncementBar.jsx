/**
 * Only verified brand facts appear here — the range, the certification stated
 * in the catalogue, and the brand line. No offers or shipping promises are
 * invented.
 */
export default function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="announce__inner shell">
        <p className="announce__item">Nut Butters · Moringa · Spirulina · Raw Honey</p>
        <p className="announce__item announce__item--center">Rise. Nourish. Thrive.</p>
        <p className="announce__item announce__item--end">FSSAI-certified process behind every batch</p>
      </div>
    </div>
  )
}
