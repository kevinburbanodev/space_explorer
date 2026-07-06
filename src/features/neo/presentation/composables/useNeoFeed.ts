import { ref } from 'vue'
import type { NearEarthObject } from '../../domain/near-earth-object.entity'
import { GetNeoFeed } from '../../domain/get-neo-feed.usecase'
import { NasaNeoRepository } from '../../infrastructure/nasa-neo.repository'
import { toIsoDate } from '@/shared/lib/date'

const getNeoFeed = new GetNeoFeed(new NasaNeoRepository())

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useNeoFeed() {
  const date = ref(toIsoDate(new Date()))
  const objects = ref<NearEarthObject[]>([])
  const status = ref<Status>('idle')

  async function fetchDate(nextDate: string) {
    date.value = nextDate
    status.value = 'loading'
    try {
      objects.value = await getNeoFeed.execute(nextDate)
      status.value = 'success'
    } catch {
      status.value = 'error'
    }
  }

  return { date, objects, status, fetchDate }
}
