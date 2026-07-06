import type { ApodRepository } from './apod.repository'
import type { ApodEntry } from './apod.entity'
import { APOD_EPOCH, toIsoDate } from '@/shared/lib/date'

export class GetApodByDate {
  private readonly repository: ApodRepository

  constructor(repository: ApodRepository) {
    this.repository = repository
  }

  async execute(date: string): Promise<ApodEntry> {
    const today = toIsoDate(new Date())
    if (date < APOD_EPOCH || date > today) {
      throw new Error(`Date must be between ${APOD_EPOCH} and ${today}.`)
    }
    return this.repository.getByDate(date)
  }
}
