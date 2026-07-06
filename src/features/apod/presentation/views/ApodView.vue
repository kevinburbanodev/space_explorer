<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useApod } from '../composables/useApod'
import ApodDatePicker from '../components/ApodDatePicker.vue'
import LoadingOrbit from '@/shared/ui/LoadingOrbit.vue'
import ErrorState from '@/shared/ui/ErrorState.vue'
import { useLanguage } from '@/shared/i18n/language'

const { entry, status, selectedDate, fetchDate } = useApod()
const { t } = useLanguage()

onMounted(() => fetchDate(selectedDate.value))
watch(selectedDate, (date) => fetchDate(date))
</script>

<template>
  <section class="mx-auto max-w-[1040px] px-5 py-14 sm:px-8 sm:py-16">
    <div class="mb-2.5 font-mono text-xs tracking-[0.3em] text-aurora-500 uppercase">{{ t.apod.eyebrow }}</div>
    <h2 class="m-0 mb-7 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.01em] text-star-100">
      {{ t.apod.title }}
    </h2>

    <ApodDatePicker :model-value="selectedDate" @update:model-value="fetchDate" />

    <Transition name="fade" mode="out-in">
      <LoadingOrbit v-if="status === 'loading'" key="loading" :label="t.apod.loading" />
      <ErrorState v-else-if="status === 'error'" key="error" @retry="fetchDate(selectedDate)" />
      <div v-else-if="entry" :key="entry.date" class="overflow-hidden rounded-[20px] border border-white/9 bg-white/[0.02]">
        <div class="relative aspect-video w-full bg-space-800">
          <img
            v-if="entry.mediaType === 'image'"
            :src="entry.url"
            :alt="entry.title"
            class="h-full w-full object-cover"
          />
          <iframe
            v-else
            :src="entry.url"
            :title="entry.title"
            class="h-full w-full"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
          <div
            class="absolute top-3.5 left-3.5 rounded-[7px] bg-space-950/50 px-2.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-white/75"
          >
            {{ entry.mediaType === 'video' ? t.apod.mediaVideo : t.apod.mediaImage }}
          </div>
        </div>
        <div class="p-[clamp(22px,3vw,34px)]">
          <h3 class="m-0 mb-2 font-display text-[clamp(22px,2.6vw,30px)] font-semibold text-star-100">{{ entry.title }}</h3>
          <div class="mb-4.5 font-mono text-[13px] text-star-500">{{ entry.date }} · {{ entry.copyright ?? 'NASA' }}</div>
          <p class="m-0 mb-6 max-w-[70ch] text-[15.5px] leading-[1.72] text-star-300">{{ entry.explanation }}</p>
          <a
            v-if="entry.hdUrl"
            :href="entry.hdUrl"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 font-display text-sm font-semibold text-nebula-500"
          >
            {{ t.apod.viewFullResolution }}
          </a>
        </div>
      </div>
    </Transition>
  </section>
</template>
