import { ref } from 'vue'
import type { RoverPhoto } from '../../domain/rover-photo.entity'
import { ROVERS } from '../../domain/rover-photo.entity'
import { NasaMarsRoverRepository } from '../../infrastructure/nasa-mars-rover.repository'

const repository = new NasaMarsRoverRepository()

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useMarsRover() {
  const roverId = ref(ROVERS[0].id)
  const earthDate = ref(ROVERS[0].defaultEarthDate)
  const camera = ref('')
  const photos = ref<RoverPhoto[]>([])
  const status = ref<Status>('idle')

  async function search() {
    status.value = 'loading'
    try {
      photos.value = await repository.getPhotos({
        rover: roverId.value,
        earthDate: earthDate.value,
        camera: camera.value,
      })
      status.value = 'success'
    } catch {
      status.value = 'error'
    }
  }

  function selectRover(id: string) {
    const rover = ROVERS.find((r) => r.id === id)
    if (!rover) return
    roverId.value = rover.id
    earthDate.value = rover.defaultEarthDate
    camera.value = ''
    search()
  }

  return { roverId, earthDate, camera, photos, status, search, selectRover }
}
