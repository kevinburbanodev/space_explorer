import type { EpicImage } from './epic-image.entity'

export interface EpicRepository {
  getAvailableDates(): Promise<string[]>
  getImagesForDate(date: string): Promise<EpicImage[]>
}
