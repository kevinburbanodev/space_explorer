import type { SpaceWeatherEvent } from './space-weather-event.entity'

export interface DonkiRepository {
  getRecentEvents(startDate: string, endDate: string): Promise<SpaceWeatherEvent[]>
}
