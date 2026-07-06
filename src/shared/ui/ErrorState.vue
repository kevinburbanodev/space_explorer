<script setup lang="ts">
import { useLanguage } from '@/shared/i18n/language'

const props = defineProps<{ message?: string }>()
defineEmits<{ retry: [] }>()

const { t } = useLanguage()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-16 text-center text-star-300">
    <span class="text-4xl">🛰️</span>
    <p class="max-w-sm font-sans text-sm text-star-300">{{ props.message ?? t.common.signalLost }}</p>
    <button
      type="button"
      class="rounded-full border border-white/15 bg-space-800 px-5 py-2 font-mono text-xs tracking-wide text-star-100 transition hover:border-nebula-400 hover:text-nebula-400"
      @click="$emit('retry')"
    >
      {{ t.common.retryTransmission }}
    </button>
  </div>
</template>
