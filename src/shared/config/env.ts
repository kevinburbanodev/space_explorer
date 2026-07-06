export const env = {
  nasaApiKey: import.meta.env.VITE_NASA_API_KEY as string,
} as const

if (!env.nasaApiKey) {
  console.warn('VITE_NASA_API_KEY is not set — falling back to NASA "DEMO_KEY" (heavily rate-limited).')
}
