import { nasaHttp } from '@/shared/lib/http'
import type { ApodRepository } from '../domain/apod.repository'
import type { ApodEntry } from '../domain/apod.entity'

interface NasaApodResponse {
  date: string
  title: string
  explanation: string
  media_type: 'image' | 'video'
  url: string
  hdurl?: string
  copyright?: string
}

export class NasaApodRepository implements ApodRepository {
  async getByDate(date: string): Promise<ApodEntry> {
    const { data } = await nasaHttp.get<NasaApodResponse>('/planetary/apod', {
      params: { date },
    })
    return {
      date: data.date,
      title: data.title,
      explanation: data.explanation,
      mediaType: data.media_type,
      url: data.url,
      hdUrl: data.hdurl,
      copyright: data.copyright,
    }
  }
}
