export type PlanetType = 'Terrestrial' | 'Gas giant' | 'Ice giant' | 'Dwarf planet'

export interface Planet {
  id: string
  name: string
  order: number
  type: PlanetType
  diameterKm: number
  distanceFromSunAu: number
  orbitalPeriodDays: number
  moons: number
  description: string
  color: string
  imageUrl?: string
}
