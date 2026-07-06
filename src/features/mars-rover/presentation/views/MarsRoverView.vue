<script setup lang="ts">
import { onMounted } from 'vue'
import { useMarsRover } from '../composables/useMarsRover'
import RoverFilters from '../components/RoverFilters.vue'
import RoverGallery from '../components/RoverGallery.vue'
import LoadingOrbit from '@/shared/ui/LoadingOrbit.vue'
import ErrorState from '@/shared/ui/ErrorState.vue'
import { useLanguage } from '@/shared/i18n/language'

const { roverId, earthDate, camera, photos, status, search, selectRover } = useMarsRover()
const { t } = useLanguage()

onMounted(search)
</script>

<template>
  <section class="mx-auto max-w-[1160px] px-5 py-14 sm:px-8 sm:py-16">
    <div class="mb-2.5 font-mono text-xs tracking-[0.3em] text-aurora-500 uppercase">{{ t.marsRover.eyebrow }}</div>
    <h2 class="m-0 mb-6 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.01em] text-star-100">
      {{ t.marsRover.title }}
    </h2>

    <RoverFilters
      :rover-id="roverId"
      :earth-date="earthDate"
      :camera="camera"
      @update:rover-id="selectRover"
      @update:earth-date="(value) => { earthDate = value; search() }"
      @update:camera="(value) => { camera = value; search() }"
    />

    <LoadingOrbit v-if="status === 'loading'" :label="t.marsRover.loading" />
    <ErrorState v-else-if="status === 'error'" @retry="search" />
    <template v-else>
      <div class="mb-3.5 font-mono text-xs text-star-500">{{ t.marsRover.frames(photos.length) }}</div>
      <div v-if="photos.length === 0" class="py-16 text-center text-star-500">
        {{ t.marsRover.empty }}
      </div>
      <RoverGallery v-else :photos="photos" />
    </template>
  </section>
</template>
