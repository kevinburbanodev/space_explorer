import type { NeoRepository } from './neo.repository'
import type { NearEarthObject } from './near-earth-object.entity'

export class GetNeoFeed {
  private readonly repository: NeoRepository

  constructor(repository: NeoRepository) {
    this.repository = repository
  }

  execute(date: string): Promise<NearEarthObject[]> {
    return this.repository.getFeedForDate(date)
  }
}
