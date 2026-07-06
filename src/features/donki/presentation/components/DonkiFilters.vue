<script setup lang="ts">
import type { SpaceWeatherEventType } from '../../domain/space-weather-event.entity'
import { useLanguage } from '@/shared/i18n/language'

defineProps<{ modelValue: SpaceWeatherEventType | 'all'; counts: Record<string, number> }>()
defineEmits<{ 'update:modelValue': [value: SpaceWeatherEventType | 'all'] }>()

const { t } = useLanguage()
</script>

<template>
  <div class="mb-7 flex flex-wrap gap-2.5">
    <button
      v-for="option in [
        { key: 'all', label: t.donki.all },
        { key: 'flare', label: t.donki.flares },
        { key: 'cme', label: t.donki.cmes },
        { key: 'storm', label: t.donki.storms },
      ]"
      :key="option.key"
      type="button"
      class="rounded-full border px-[18px] py-2.5 font-display text-sm font-semibold transition-colors"
      :class="
        modelValue === option.key
          ? 'border-nebula-500/50 bg-nebula-500/16 text-star-100'
          : 'border-white/10 bg-white/[0.03] text-star-300'
      "
      @click="$emit('update:modelValue', option.key as SpaceWeatherEventType | 'all')"
    >
      {{ option.label }} <span class="ml-1 text-star-500">{{ counts[option.key] ?? 0 }}</span>
    </button>
  </div>
</template>
