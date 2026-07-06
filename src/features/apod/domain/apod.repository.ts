import type { ApodEntry } from './apod.entity'

export interface ApodRepository {
  getByDate(date: string): Promise<ApodEntry>
}
