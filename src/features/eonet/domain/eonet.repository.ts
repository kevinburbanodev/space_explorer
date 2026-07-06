import type { NaturalEvent } from './natural-event.entity'

export interface EonetRepository {
  getOpenEvents(): Promise<NaturalEvent[]>
}
