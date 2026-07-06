export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function formatLongDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** NASA's APOD archive starts on this date. */
export const APOD_EPOCH = '1995-06-16'

export function addDays(isoDate: string, delta: number): string {
  const date = new Date(`${isoDate}T00:00:00`)
  date.setDate(date.getDate() + delta)
  return toIsoDate(date)
}
