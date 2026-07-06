import { nasaHttp } from '@/shared/lib/http'
import { env } from '@/shared/config/env'
import type { EpicRepository } from '../domain/epic.repository'
import type { EpicImage } from '../domain/epic-image.entity'

interface NasaEpicImageResponse {
  identifier: string
  caption: string
  image: string
  date: string
  centroid_coordinates: { lat: number; lon: number }
}

export function buildEpicImageUrl(image: EpicImage): string {
  const [year, month, day] = image.date.split(' ')[0].split('-')
  return `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/jpg/${image.imageName}.jpg?api_key=${env.nasaApiKey || 'DEMO_KEY'}`
}

export class NasaEpicRepository implements EpicRepository {
  async getAvailableDates(): Promise<string[]> {
    const { data } = await nasaHttp.get<string[]>('/EPIC/api/natural/available')
    return data
  }

  async getImagesForDate(date: string): Promise<EpicImage[]> {
    const { data } = await nasaHttp.get<NasaEpicImageResponse[]>(`/EPIC/api/natural/date/${date}`)
    return data.map((item) => ({
      identifier: item.identifier,
      caption: item.caption,
      imageName: item.image,
      date: item.date,
      lat: item.centroid_coordinates.lat,
      lon: item.centroid_coordinates.lon,
    }))
  }
}
