<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNeoFeed } from '../composables/useNeoFeed'
import NeoRadar from '../components/NeoRadar.vue'
import NeoList from '../components/NeoList.vue'
import LoadingOrbit from '@/shared/ui/LoadingOrbit.vue'
import ErrorState from '@/shared/ui/ErrorState.vue'
import type { NearEarthObject } from '../../domain/near-earth-object.entity'
import { toIsoDate } from '@/shared/lib/date'
import { useLanguage } from '@/shared/i18n/language'

const { date, objects, status, fetchDate } = useNeoFeed()
const selected = ref<NearEarthObject | null>(null)
const { t } = useLanguage()

onMounted(() => fetchDate(date.value))

function select(neo: NearEarthObject) {
  selected.value = neo
}
</script>

<template>
  <section class="mx-auto max-w-[1160px] px-5 py-14 sm:px-8 sm:py-16">
    <div class="mb-2.5 font-mono text-xs tracking-[0.3em] text-aurora-500 uppercase">{{ t.neo.eyebrow }}</div>
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="m-0 mb-2 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.01em] text-star-100">
          {{ t.neo.title }}
        </h2>
        <p class="m-0 max-w-xl text-[15px] text-star-500">{{ t.neo.subtitle }}</p>
      </div>
      <input
        type="date"
        :max="toIsoDate(new Date())"
        :value="date"
        class="h-11 rounded-[11px] border border-white/13 bg-white/[0.03] px-4 font-mono text-sm text-star-100 [color-scheme:dark]"
        @input="fetchDate(($event.target as HTMLInputElement).value)"
      />
    </div>

    <LoadingOrbit v-if="status === 'loading'" :label="t.neo.loading" />
    <ErrorState v-else-if="status === 'error'" @retry="fetchDate(date)" />
    <div v-else-if="objects.length === 0" class="py-16 text-center text-star-500">
      {{ t.neo.empty }}
    </div>
    <div v-else class="grid items-start gap-7.5 md:grid-cols-[460px_1fr]">
      <div class="flex flex-col items-center gap-4.5">
        <NeoRadar :objects="objects" :selected-id="selected?.id" @select="select" />
        <div class="flex gap-4.5 font-mono text-xs text-star-500">
          <span class="flex items-center gap-1.75"><span class="h-2.25 w-2.25 rounded-full bg-danger-500" />{{ t.neo.hazardous }}</span>
          <span class="flex items-center gap-1.75"><span class="h-2.25 w-2.25 rounded-full bg-aurora-500" />{{ t.neo.safePass }}</span>
        </div>
      </div>

      <NeoList :objects="objects" :selected-id="selected?.id" @select="select" />
    </div>
  </section>
</template>
