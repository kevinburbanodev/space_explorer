import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import ApodView from '@/features/apod/presentation/views/ApodView.vue'
import SolarSystemView from '@/features/solar-system/presentation/views/SolarSystemView.vue'
import MarsRoverView from '@/features/mars-rover/presentation/views/MarsRoverView.vue'
import NeoView from '@/features/neo/presentation/views/NeoView.vue'
import EpicView from '@/features/epic/presentation/views/EpicView.vue'
import DonkiView from '@/features/donki/presentation/views/DonkiView.vue'
import EonetView from '@/features/eonet/presentation/views/EonetView.vue'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/apod', name: 'apod', component: ApodView },
    { path: '/solar-system', name: 'solar-system', component: SolarSystemView },
    { path: '/mars-rover', name: 'mars-rover', component: MarsRoverView },
    { path: '/near-earth-objects', name: 'neo', component: NeoView },
    { path: '/earth', name: 'epic', component: EpicView },
    { path: '/space-weather', name: 'donki', component: DonkiView },
    { path: '/natural-events', name: 'eonet', component: EonetView },
  ],
})
