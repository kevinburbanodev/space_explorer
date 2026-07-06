<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDonki } from '../composables/useDonki'
import DonkiFilters from '../components/DonkiFilters.vue'
import DonkiTimeline from '../components/DonkiTimeline.vue'
import LoadingOrbit from '@/shared/ui/LoadingOrbit.vue'
import ErrorState from '@/shared/ui/ErrorState.vue'
import { useLanguage } from '@/shared/i18n/language'

const { events, filteredEvents, filter, status, load } = useDonki()
const { t } = useLanguage()

const counts = computed(() => ({
  all: events.value.length,
  flare: events.value.filter((e) => e.type === 'flare').length,
  cme: events.value.filter((e) => e.type === 'cme').length,
  storm: events.value.filter((e) => e.type === 'storm').length,
}))

onMounted(load)
</script>

<template>
  <section class="mx-auto max-w-[1160px] px-5 py-14 sm:px-8 sm:py-16">
    <div class="mb-2.5 font-mono text-xs tracking-[0.3em] text-aurora-500 uppercase">{{ t.donki.eyebrow }}</div>
    <h2 class="m-0 mb-2 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.01em] text-star-100">
      {{ t.donki.title }}
    </h2>
    <p class="m-0 mb-7.5 text-[15px] text-star-500">{{ t.donki.subtitle }}</p>

    <LoadingOrbit v-if="status === 'loading'" :label="t.donki.loading" />
    <ErrorState v-else-if="status === 'error'" @retry="load" />
    <template v-else>
      <DonkiFilters v-model="filter" :counts="counts" />
      <div v-if="filteredEvents.length === 0" class="py-16 text-center text-star-500">{{ t.donki.empty }}</div>
      <DonkiTimeline v-else :events="filteredEvents" />
    </template>
  </section>
</template>
