export interface RoverPhoto {
  id: number
  imgSrc: string
  earthDate: string
  sol: number
  cameraName: string
  cameraFullName: string
  roverName: string
}

export interface RoverInfo {
  id: 'curiosity' | 'opportunity' | 'spirit' | 'perseverance'
  label: string
  status: 'active' | 'complete'
  landingDate: string
  defaultEarthDate: string
  cameras: Array<{ code: string; name: string }>
}

export const ROVERS: RoverInfo[] = [
  {
    id: 'curiosity',
    label: 'Curiosity',
    status: 'active',
    landingDate: '2012-08-06',
    defaultEarthDate: '2015-06-03',
    cameras: [
      { code: 'FHAZ', name: 'Front Hazard Avoidance' },
      { code: 'NAVCAM', name: 'Navigation Camera' },
      { code: 'MAST', name: 'Mast Camera' },
      { code: 'CHEMCAM', name: 'Chemistry Camera' },
    ],
  },
  {
    id: 'perseverance',
    label: 'Perseverance',
    status: 'active',
    landingDate: '2021-02-18',
    defaultEarthDate: '2021-03-01',
    cameras: [
      { code: 'NAVCAM_LEFT', name: 'Navigation Camera' },
      { code: 'MCZ_LEFT', name: 'Mastcam-Z' },
      { code: 'FRONT_HAZCAM_LEFT_A', name: 'Front Hazard Avoidance' },
    ],
  },
  {
    id: 'opportunity',
    label: 'Opportunity',
    status: 'complete',
    landingDate: '2004-01-25',
    defaultEarthDate: '2004-07-01',
    cameras: [
      { code: 'FHAZ', name: 'Front Hazard Avoidance' },
      { code: 'NAVCAM', name: 'Navigation Camera' },
      { code: 'PANCAM', name: 'Panoramic Camera' },
    ],
  },
  {
    id: 'spirit',
    label: 'Spirit',
    status: 'complete',
    landingDate: '2004-01-04',
    defaultEarthDate: '2004-03-01',
    cameras: [
      { code: 'FHAZ', name: 'Front Hazard Avoidance' },
      { code: 'NAVCAM', name: 'Navigation Camera' },
      { code: 'PANCAM', name: 'Panoramic Camera' },
    ],
  },
]
