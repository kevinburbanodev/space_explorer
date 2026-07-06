import axios from 'axios'
import { env } from '@/shared/config/env'

export const nasaHttp = axios.create({
  baseURL: 'https://api.nasa.gov',
})

nasaHttp.interceptors.request.use((config) => {
  config.params = { ...config.params, api_key: env.nasaApiKey || 'DEMO_KEY' }
  return config
})

export const nasaImagesHttp = axios.create({
  baseURL: 'https://images-api.nasa.gov',
})

// EONET is a public NASA-affiliated data service hosted outside api.nasa.gov —
// it doesn't require (or accept) the api.nasa.gov API key.
export const eonetHttp = axios.create({
  baseURL: 'https://eonet.gsfc.nasa.gov/api/v3',
})
