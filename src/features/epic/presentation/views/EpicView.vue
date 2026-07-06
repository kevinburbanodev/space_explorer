<script setup lang="ts">
import { onMounted } from 'vue'
import { useEpic } from '../composables/useEpic'
import EpicDatePicker from '../components/EpicDatePicker.vue'
import EpicGallery from '../components/EpicGallery.vue'
import LoadingOrbit from '@/shared/ui/LoadingOrbit.vue'
import ErrorState from '@/shared/ui/ErrorState.vue'
import { useLanguage } from '@/shared/i18n/language'

const { images, availableDates, selectedDate, status, init, fetchDate } = useEpic()
const { t } = useLanguage()

onMounted(init)
</script>

<template>
  <section class="mx-auto max-w-[1160px] px-5 py-14 sm:px-8 sm:py-16">
    <div class="mb-2.5 font-mono text-xs tracking-[0.3em] text-aurora-500 uppercase">{{ t.epic.eyebrow }}</div>
    <h2 class="m-0 mb-2 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.01em] text-star-100">
      {{ t.epic.title }}
    </h2>
    <p class="m-0 mb-7.5 text-[15px] text-star-500">{{ t.epic.subtitle }}</p>

    <EpicDatePicker v-if="availableDates.length" :model-value="selectedDate" :available-dates="availableDates" @update:model-value="fetchDate" />

    <LoadingOrbit v-if="status === 'loading'" :label="t.epic.loading" />
    <ErrorState v-else-if="status === 'error'" @retry="fetchDate(selectedDate)" />
    <div v-else-if="images.length === 0" class="py-16 text-center text-star-500">{{ t.epic.empty }}</div>
    <EpicGallery v-else :images="images" />
  </section>
</template>
