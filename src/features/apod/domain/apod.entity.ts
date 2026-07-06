export interface ApodEntry {
  date: string
  title: string
  explanation: string
  mediaType: 'image' | 'video'
  url: string
  hdUrl?: string
  copyright?: string
}
