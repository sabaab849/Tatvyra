import * as THREE from 'three'

/**
 * The plants the jungle is grown from. Every leaf is a photograph.
 *
 * The files in public/images/jungle/ are single leaves cut from photo-scanned
 * plants: for each, its colour (-c), its cut-out mask (-a), its surface
 * normals (-n) and its roughness (-r). The mask gives the leaf its real
 * outline — the fern's teeth, the anthurium's wavering margin — and the other
 * two are what let the light find its veins and its waxy sheen.
 *
 * SOURCES, all public domain (CC0), so free to use commercially with no credit
 * required:
 *   fern, anthurium, calathea, pachira — Poly Haven (polyhaven.com): the
 *     models fern_02, anthurium_botany_01, calathea_orbifolia_01 and
 *     pachira_aquatica_01, from which only the leaf textures are used.
 *   vine — built from the ivy leaves of ambientCG's LeafSet017 (ambientcg.com),
 *     set down a drawn stem.
 *
 * `aspect` is each leaf's width over its height. `kind` picks how it is
 * planted (see PLANTING in JungleScene).
 */
const DIR = '/images/jungle/'

export const LEAVES = [
  { name: 'fern-1', kind: 'fern', aspect: 0.194 },
  { name: 'fern-2', kind: 'fern', aspect: 0.22 },
  { name: 'fern-3', kind: 'fern', aspect: 0.178 },
  { name: 'anthurium-1', kind: 'anthurium', aspect: 0.373 },
  { name: 'anthurium-2', kind: 'anthurium', aspect: 0.361 },
  { name: 'calathea-1', kind: 'calathea', aspect: 0.872 },
  { name: 'calathea-2', kind: 'calathea', aspect: 0.956 },
  { name: 'pachira-1', kind: 'pachira', aspect: 0.867 },
  { name: 'pachira-2', kind: 'pachira', aspect: 0.845 },
  { name: 'vine-1', kind: 'vine', aspect: 0.25 },
]

/* Starts every leaf's four pictures loading and hands back the textures at
   once; each fills in as it arrives. `changed` is called as they do. */
export function loadLeaves(changed) {
  const loader = new THREE.TextureLoader()
  const get = (file, colour) => {
    const texture = loader.load(DIR + file, changed)
    if (colour) texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 4
    return texture
  }
  return LEAVES.map((leaf) => ({
    ...leaf,
    map: get(`${leaf.name}-c.webp`, true),
    alphaMap: get(`${leaf.name}-a.webp`),
    normalMap: get(`${leaf.name}-n.webp`),
    roughnessMap: get(`${leaf.name}-r.webp`),
  }))
}

/* A blade for a leaf to lie on: rooted at its stem, drooping along its length
   and cupped across it, with enough facets for the bend and the wind to
   show. One unit tall and one wide; the planting gives it the leaf's own
   proportion. */
export function blade(droop, cup, across = 6, along = 14) {
  const geometry = new THREE.PlaneGeometry(1, 1, across, along)
  geometry.translate(0, 0.5, 0)
  const position = geometry.attributes.position
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const y = position.getY(i)
    position.setZ(i, -droop * y * y + cup * 4 * x * x * (0.3 + 0.7 * Math.sin(Math.PI * y)))
  }
  geometry.computeVertexNormals()
  return geometry
}
