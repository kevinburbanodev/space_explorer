import { computed, ref } from 'vue'
import type { SpaceWeatherEvent, SpaceWeatherEventType } from '../../domain/space-weather-event.entity'
import { NasaDonkiRepository } from '../../infrastructure/nasa-donki.repository'
import { addDays, toIsoDate } from '@/shared/lib/date'

const repository = new NasaDonkiRepository()

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useDonki() {
  const events = ref<SpaceWeatherEvent[]>([])
  const status = ref<Status>('idle')
  const filter = ref<SpaceWeatherEventType | 'all'>('all')

  const filteredEvents = computed(() =>
    filter.value === 'all' ? events.value : events.value.filter((e) => e.type === filter.value),
  )

  async function load() {
    status.value = 'loading'
    try {
      const endDate = toIsoDate(new Date())
      const startDate = addDays(endDate, -30)
      events.value = await repository.getRecentEvents(startDate, endDate)
      status.value = 'success'
    } catch {
      status.value = 'error'
    }
  }

  return { events, filteredEvents, filter, status, load }
}
