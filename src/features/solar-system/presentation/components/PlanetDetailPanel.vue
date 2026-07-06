<script setup lang="ts">
import { computed } from 'vue'
import type { Planet } from '../../domain/planet.entity'
import { useLanguage } from '@/shared/i18n/language'

const props = defineProps<{ planet: Planet }>()
const { t } = useLanguage()

const name = computed(() => t.value.solarSystem.planetNames[props.planet.id] ?? props.planet.name)
const description = computed(() => t.value.solarSystem.descriptions[props.planet.id] ?? props.planet.description)
const imageLabel = computed(() => `${name.value.toUpperCase()} ${t.value.solarSystem.imageLabelSuffix}`)

const distanceMillionKm = computed(() => Math.round(props.planet.distanceFromSunAu * 149.6 * 10) / 10)

const period = computed(() => {
  const days = props.planet.orbitalPeriodDays
  if (days >= 365) return { value: (days / 365).toFixed(1), unit: t.value.solarSystem.units.earthYears }
  return { value: `${days}`, unit: t.value.solarSystem.units.earthDays }
})

const stats = computed(() => [
  { key: 'diameterKm', label: t.value.solarSystem.stats.diameter, value: props.planet.diameterKm.toLocaleString(), unit: t.value.solarSystem.units.km },
  {
    key: 'distanceFromSunAu',
    label: t.value.solarSystem.stats.distance,
    value: distanceMillionKm.value.toLocaleString(),
    unit: t.value.solarSystem.units.millionKm,
  },
  { key: 'orbitalPeriodDays', label: t.value.solarSystem.stats.orbitalPeriod, value: period.value.value, unit: period.value.unit },
  {
    key: 'moons',
    label: t.value.solarSystem.stats.moons,
    value: `${props.planet.moons}`,
    unit: props.planet.moons === 1 ? t.value.solarSystem.units.satellite : t.value.solarSystem.units.satellites,
  },
])
</script>

<template>
  <div class="overflow-hidden rounded-[20px] border border-white/9 bg-white/[0.025]">
    <div class="relative h-[150px] bg-space-800">
      <img v-if="planet.imageUrl" :src="planet.imageUrl" :alt="name" class="h-full w-full object-cover" />
      <div
        class="absolute bottom-3 left-4 rounded-[7px] bg-space-950/50 px-2.5 py-1 font-mono text-[11px] tracking-[0.14em] text-white/80"
      >
        {{ imageLabel }}
      </div>
    </div>
    <div class="p-6">
      <div class="mb-1.5 flex items-center gap-2.5">
        <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: planet.color }" />
        <h3 class="m-0 font-display text-[26px] font-bold text-star-100">{{ name }}</h3>
      </div>
      <p class="my-1.5 mb-5.5 text-[14.5px] leading-[1.65] text-star-300">{{ description }}</p>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="stat in stats" :key="stat.key" class="rounded-xl border border-white/6 bg-white/[0.03] p-3.5">
          <div class="mb-1.5 text-[11px] tracking-[0.1em] text-star-500 uppercase">{{ stat.label }}</div>
          <div class="font-mono text-lg font-medium text-star-100">{{ stat.value }}</div>
          <div class="mt-0.5 font-mono text-[11px] text-nebula-500">{{ stat.unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
