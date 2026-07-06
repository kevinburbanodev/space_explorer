import { ref } from 'vue'
import type { ApodEntry } from '../../domain/apod.entity'
import { GetApodByDate } from '../../domain/get-apod.usecase'
import { NasaApodRepository } from '../../infrastructure/nasa-apod.repository'
import { toIsoDate } from '@/shared/lib/date'

const getApodByDate = new GetApodByDate(new NasaApodRepository())

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useApod() {
  const entry = ref<ApodEntry | null>(null)
  const status = ref<Status>('idle')
  const errorMessage = ref('')
  const selectedDate = ref(toIsoDate(new Date()))

  async function fetchDate(date: string) {
    selectedDate.value = date
    status.value = 'loading'
    try {
      entry.value = await getApodByDate.execute(date)
      status.value = 'success'
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
      status.value = 'error'
    }
  }

  return {
    entry,
    status,
    errorMessage,
    selectedDate,
    fetchDate,
  }
}
