import { ref } from 'vue'
import type { Planet } from '../../domain/planet.entity'
import { NasaImagesSolarSystemRepository } from '../../infrastructure/nasa-images-solar-system.repository'

const repository = new NasaImagesSolarSystemRepository()

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useSolarSystem() {
  const planets = ref<Planet[]>([])
  const status = ref<Status>('idle')

  async function load() {
    status.value = 'loading'
    try {
      planets.value = await repository.getPlanets()
      status.value = 'success'
    } catch {
      status.value = 'error'
    }
  }

  return { planets, status, load }
}
