export type SpaceWeatherEventType = 'flare' | 'cme' | 'storm'

export interface SpaceWeatherEvent {
  id: string
  type: SpaceWeatherEventType
  time: string
  headline: string
  detail: string
  link: string
}
