import { nasaHttp } from '@/shared/lib/http'
import type { DonkiRepository } from '../domain/donki.repository'
import type { SpaceWeatherEvent } from '../domain/space-weather-event.entity'

interface FlareResponse {
  flrID: string
  beginTime: string
  classType: string
  sourceLocation: string
  link: string
}

interface CmeResponse {
  activityID: string
  startTime: string
  sourceLocation: string
  link: string
  cmeAnalyses?: Array<{ speed: number; isMostAccurate: boolean }> | null
}

interface StormResponse {
  gstID: string
  startTime: string
  link: string
  allKpIndex: Array<{ kpIndex: number }>
}

export class NasaDonkiRepository implements DonkiRepository {
  async getRecentEvents(startDate: string, endDate: string): Promise<SpaceWeatherEvent[]> {
    const params = { startDate, endDate }
    const [flares, cmes, storms] = await Promise.all([
      nasaHttp.get<FlareResponse[]>('/DONKI/FLR', { params }),
      nasaHttp.get<CmeResponse[]>('/DONKI/CME', { params }),
      nasaHttp.get<StormResponse[]>('/DONKI/GST', { params }),
    ])

    const flareEvents: SpaceWeatherEvent[] = flares.data.map((f) => ({
      id: f.flrID,
      type: 'flare',
      time: f.beginTime,
      headline: `${f.classType} Solar Flare`,
      detail: f.sourceLocation ? `Source region ${f.sourceLocation}` : 'Source region unknown',
      link: f.link,
    }))

    const cmeEvents: SpaceWeatherEvent[] = cmes.data.map((c) => {
      const speed = c.cmeAnalyses?.find((a) => a.isMostAccurate)?.speed ?? c.cmeAnalyses?.[0]?.speed
      return {
        id: c.activityID,
        type: 'cme',
        time: c.startTime,
        headline: 'Coronal Mass Ejection',
        detail: speed ? `${Math.round(speed).toLocaleString()} km/s` : (c.sourceLocation ?? 'Speed unknown'),
        link: c.link,
      }
    })

    const stormEvents: SpaceWeatherEvent[] = storms.data.map((s) => {
      const maxKp = Math.max(...s.allKpIndex.map((k) => k.kpIndex), 0)
      return {
        id: s.gstID,
        type: 'storm',
        time: s.startTime,
        headline: 'Geomagnetic Storm',
        detail: `Max Kp ${maxKp.toFixed(1)}`,
        link: s.link,
      }
    })

    return [...flareEvents, ...cmeEvents, ...stormEvents].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
    )
  }
}
