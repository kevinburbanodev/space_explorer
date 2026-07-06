import { ref } from 'vue'
import type { NaturalEvent } from '../../domain/natural-event.entity'
import { NasaEonetRepository } from '../../infrastructure/eonet.repository'

const repository = new NasaEonetRepository()

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useEonet() {
  const events = ref<NaturalEvent[]>([])
  const status = ref<Status>('idle')

  async function load() {
    status.value = 'loading'
    try {
      events.value = await repository.getOpenEvents()
      status.value = 'success'
    } catch {
      status.value = 'error'
    }
  }

  return { events, status, load }
}
