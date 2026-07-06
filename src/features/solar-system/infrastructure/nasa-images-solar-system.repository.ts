import { nasaImagesHttp } from '@/shared/lib/http'
import type { SolarSystemRepository } from '../domain/solar-system.repository'
import type { Planet } from '../domain/planet.entity'
import { PLANET_FACTS } from '../domain/planet-facts.data'

interface NasaImageSearchResponse {
  collection: {
    items: Array<{
      links?: Array<{ href: string }>
      data?: Array<{ title?: string }>
    }>
  }
}

// The NASA Image Library also indexes unrelated content whose titles happen to mention a
// planet name in passing — a town called "Mars, Pennsylvania", exoplanets like "Kepler-20e",
// etc. Scoping to center=JPL (planetary science) and requiring the planet name in the title
// filters those out; without both, Mars searches return "Mars Celebration" photos of a
// small-town festival instead of the actual planet.
const IRRELEVANT_TERMS = ['kepler', 'trappist', 'proxima', 'exoplanet', 'hd ', 'pennsylvania']

function isRelevantTitle(title: string, planetName: string): boolean {
  const lower = title.toLowerCase()
  if (!lower.includes(planetName.toLowerCase())) return false
  return !IRRELEVANT_TERMS.some((term) => lower.includes(term))
}

async function fetchPlanetImage(name: string): Promise<string | undefined> {
  try {
    const { data } = await nasaImagesHttp.get<NasaImageSearchResponse>('/search', {
      params: { q: `${name} planet`, media_type: 'image', center: 'JPL' },
    })
    const match = data.collection.items.find(
      (item) => item.links?.[0]?.href && isRelevantTitle(item.data?.[0]?.title ?? '', name),
    )
    return match?.links?.[0]?.href
  } catch {
    return undefined
  }
}

export class NasaImagesSolarSystemRepository implements SolarSystemRepository {
  async getPlanets(): Promise<Planet[]> {
    const images = await Promise.all(PLANET_FACTS.map((planet) => fetchPlanetImage(planet.name)))
    return PLANET_FACTS.map((planet, index) => ({ ...planet, imageUrl: images[index] }))
  }
}
