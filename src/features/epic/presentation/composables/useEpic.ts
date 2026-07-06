import { ref } from 'vue'
import type { EpicImage } from '../../domain/epic-image.entity'
import { NasaEpicRepository } from '../../infrastructure/nasa-epic.repository'

const repository = new NasaEpicRepository()

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useEpic() {
  const images = ref<EpicImage[]>([])
  const availableDates = ref<string[]>([])
  const selectedDate = ref('')
  const status = ref<Status>('idle')

  async function init() {
    status.value = 'loading'
    try {
      availableDates.value = await repository.getAvailableDates()
      const latest = availableDates.value[availableDates.value.length - 1]
      await fetchDate(latest)
    } catch {
      status.value = 'error'
    }
  }

  async function fetchDate(date: string) {
    selectedDate.value = date
    status.value = 'loading'
    try {
      images.value = await repository.getImagesForDate(date)
      status.value = 'success'
    } catch {
      status.value = 'error'
    }
  }

  return { images, availableDates, selectedDate, status, init, fetchDate }
}
