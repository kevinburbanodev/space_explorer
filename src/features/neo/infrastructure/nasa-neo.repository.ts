import { nasaHttp } from '@/shared/lib/http'
import type { NeoRepository } from '../domain/neo.repository'
import type { NearEarthObject } from '../domain/near-earth-object.entity'

interface NasaNeoResponse {
  near_earth_objects: Record<
    string,
    Array<{
      id: string
      name: string
      is_potentially_hazardous_asteroid: boolean
      estimated_diameter: { kilometers: { estimated_diameter_min: number; estimated_diameter_max: number } }
      close_approach_data: Array<{
        close_approach_date: string
        relative_velocity: { kilometers_per_hour: string }
        miss_distance: { kilometers: string }
      }>
    }>
  >
}

export class NasaNeoRepository implements NeoRepository {
  async getFeedForDate(date: string): Promise<NearEarthObject[]> {
    const { data } = await nasaHttp.get<NasaNeoResponse>('/neo/rest/v1/feed', {
      params: { start_date: date, end_date: date },
    })
    const objects = data.near_earth_objects[date] ?? []
    return objects
      .map((neo): NearEarthObject => {
        const approach = neo.close_approach_data[0]
        return {
          id: neo.id,
          name: neo.name,
          isHazardous: neo.is_potentially_hazardous_asteroid,
          diameterMinKm: neo.estimated_diameter.kilometers.estimated_diameter_min,
          diameterMaxKm: neo.estimated_diameter.kilometers.estimated_diameter_max,
          closeApproachDate: approach?.close_approach_date ?? date,
          velocityKmH: Number(approach?.relative_velocity.kilometers_per_hour ?? 0),
          missDistanceKm: Number(approach?.miss_distance.kilometers ?? 0),
        }
      })
      .sort((a, b) => a.missDistanceKm - b.missDistanceKm)
  }
}
