<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEonet } from '../composables/useEonet'
import EonetMap from '../components/EonetMap.vue'
import EonetList from '../components/EonetList.vue'
import LoadingOrbit from '@/shared/ui/LoadingOrbit.vue'
import ErrorState from '@/shared/ui/ErrorState.vue'
import type { NaturalEvent } from '../../domain/natural-event.entity'
import { useLanguage } from '@/shared/i18n/language'

const { events, status, load } = useEonet()
const selected = ref<NaturalEvent | null>(null)
const { t } = useLanguage()

onMounted(load)

function select(event: NaturalEvent) {
  selected.value = event
}
</script>

<template>
  <section class="mx-auto max-w-[1160px] px-5 py-14 sm:px-8 sm:py-16">
    <div class="mb-2.5 font-mono text-xs tracking-[0.3em] text-aurora-500 uppercase">{{ t.eonet.eyebrow }}</div>
    <h2 class="m-0 mb-2 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.01em] text-star-100">
      {{ t.eonet.title }}
    </h2>
    <p class="m-0 mb-7.5 text-[15px] text-star-500">{{ t.eonet.subtitle }}</p>

    <LoadingOrbit v-if="status === 'loading'" :label="t.eonet.loading" />
    <ErrorState v-else-if="status === 'error'" @retry="load" />
    <div v-else-if="events.length === 0" class="py-16 text-center text-star-500">{{ t.eonet.empty }}</div>
    <div v-else class="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
      <EonetMap :events="events" :selected-id="selected?.id" @select="select" />
      <EonetList :events="events" :selected-id="selected?.id" @select="select" />
    </div>
  </section>
</template>
