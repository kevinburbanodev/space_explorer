import { nasaHttp } from '@/shared/lib/http'
import type { MarsRoverRepository, RoverPhotoQuery } from '../domain/mars-rover.repository'
import type { RoverPhoto } from '../domain/rover-photo.entity'

interface NasaRoverPhotoResponse {
  photos: Array<{
    id: number
    img_src: string
    earth_date: string
    sol: number
    camera: { name: string; full_name: string }
    rover: { name: string }
  }>
}

export class NasaMarsRoverRepository implements MarsRoverRepository {
  async getPhotos(query: RoverPhotoQuery): Promise<RoverPhoto[]> {
    const { data } = await nasaHttp.get<NasaRoverPhotoResponse>(`/mars-photos/api/v1/rovers/${query.rover}/photos`, {
      params: { earth_date: query.earthDate, camera: query.camera || undefined },
    })
    return data.photos.map((photo) => ({
      id: photo.id,
      imgSrc: photo.img_src,
      earthDate: photo.earth_date,
      sol: photo.sol,
      cameraName: photo.camera.name,
      cameraFullName: photo.camera.full_name,
      roverName: photo.rover.name,
    }))
  }
}
