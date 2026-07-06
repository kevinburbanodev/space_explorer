import type { Planet } from './planet.entity'

export interface SolarSystemRepository {
  getPlanets(): Promise<Planet[]>
}
