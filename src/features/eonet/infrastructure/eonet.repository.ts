import { eonetHttp } from '@/shared/lib/http'
import type { EonetRepository } from '../domain/eonet.repository'
import type { NaturalEvent } from '../domain/natural-event.entity'

interface EonetEventResponse {
  id: string
  title: string
  link: string
  categories: Array<{ id: string; title: string }>
  geometry: Array<{ date: string; coordinates: [number, number] | [number, number, number] }>
}

interface EonetEventsResponse {
  events: EonetEventResponse[]
}

export class NasaEonetRepository implements EonetRepository {
  async getOpenEvents(): Promise<NaturalEvent[]> {
    const { data } = await eonetHttp.get<EonetEventsResponse>('/events', {
      params: { status: 'open', limit: 100 },
    })
    return data.events
      .filter((event) => event.geometry.length > 0)
      .map((event) => {
        const latest = event.geometry[event.geometry.length - 1]
        return {
          id: event.id,
          title: event.title,
          categoryId: event.categories[0]?.id ?? 'other',
          categoryTitle: event.categories[0]?.title ?? 'Other',
          lon: latest.coordinates[0],
          lat: latest.coordinates[1],
          date: latest.date,
          link: event.link,
        }
      })
  }
}
