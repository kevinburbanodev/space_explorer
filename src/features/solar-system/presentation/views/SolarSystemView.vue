<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSolarSystem } from '../composables/useSolarSystem'
import OrbitView from '../components/OrbitView.vue'
import PlanetDetailPanel from '../components/PlanetDetailPanel.vue'
import LoadingOrbit from '@/shared/ui/LoadingOrbit.vue'
import ErrorState from '@/shared/ui/ErrorState.vue'
import type { Planet } from '../../domain/planet.entity'
import { useLanguage } from '@/shared/i18n/language'

const { planets, status, load } = useSolarSystem()
const selected = ref<Planet | null>(null)
const { t } = useLanguage()

onMounted(async () => {
  await load()
  selected.value = planets.value.find((p) => p.id === 'earth') ?? planets.value[0] ?? null
})
</script>

<template>
  <section class="mx-auto max-w-[1160px] px-5 py-14 sm:px-8 sm:py-16">
    <div class="mb-2.5 font-mono text-xs tracking-[0.3em] text-aurora-500 uppercase">{{ t.solarSystem.eyebrow }}</div>
    <h2 class="m-0 mb-2 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.01em] text-star-100">
      {{ t.solarSystem.title }}
    </h2>
    <p class="m-0 mb-7.5 text-[15px] text-star-500">{{ t.solarSystem.subtitle }}</p>

    <LoadingOrbit v-if="status === 'loading'" :label="t.solarSystem.loading" />
    <ErrorState v-else-if="status === 'error'" @retry="load" />
    <div v-else class="grid items-start gap-8.5 md:grid-cols-2">
      <div class="flex items-center justify-center">
        <OrbitView :planets="planets" :selected-id="selected?.id" @select="selected = $event" />
      </div>
      <Transition name="fade" mode="out-in">
        <PlanetDetailPanel v-if="selected" :key="selected.id" :planet="selected" />
      </Transition>
    </div>
  </section>
</template>
