import type { NearEarthObject } from './near-earth-object.entity'

export interface NeoRepository {
  getFeedForDate(date: string): Promise<NearEarthObject[]>
}
