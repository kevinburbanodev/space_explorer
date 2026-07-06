export const CATEGORY_STYLE: Record<string, { icon: string; color: string }> = {
  wildfires: { icon: '🔥', color: '#ff4d5e' },
  volcanoes: { icon: '🌋', color: '#ff9d2e' },
  severeStorms: { icon: '🌀', color: '#6d5aff' },
  seaLakeIce: { icon: '🧊', color: '#9fe3e0' },
  drought: { icon: '🏜️', color: '#e6c07a' },
  dustHaze: { icon: '🌫️', color: '#9a9ab5' },
  floods: { icon: '🌊', color: '#2ecfae' },
  landslides: { icon: '⛰️', color: '#b8b8c0' },
  manmade: { icon: '🏭', color: '#9a9ab5' },
  snow: { icon: '❄️', color: '#e8e9f3' },
  tempExtremes: { icon: '🌡️', color: '#ff4d5e' },
  waterColor: { icon: '💧', color: '#4a90d9' },
  earthquakes: { icon: '🌍', color: '#ff9d2e' },
}

export function categoryStyle(id: string) {
  return CATEGORY_STYLE[id] ?? { icon: '📍', color: '#9a9ab5' }
}
