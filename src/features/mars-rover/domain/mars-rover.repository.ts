import type { RoverPhoto } from './rover-photo.entity'

export interface RoverPhotoQuery {
  rover: string
  earthDate: string
  camera?: string
}

export interface MarsRoverRepository {
  getPhotos(query: RoverPhotoQuery): Promise<RoverPhoto[]>
}
