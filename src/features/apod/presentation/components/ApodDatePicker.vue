<script setup lang="ts">
import { computed } from 'vue'
import { addDays, APOD_EPOCH, toIsoDate } from '@/shared/lib/date'
import { useLanguage } from '@/shared/i18n/language'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const { t } = useLanguage()

const today = toIsoDate(new Date())
const isAtEpoch = computed(() => props.modelValue <= APOD_EPOCH)
const isToday = computed(() => props.modelValue >= today)

function go(delta: number) {
  emit('update:modelValue', addDays(props.modelValue, delta))
}

function randomDate() {
  const start = new Date(APOD_EPOCH).getTime()
  const end = new Date(today).getTime()
  const random = new Date(start + Math.random() * (end - start))
  emit('update:modelValue', toIsoDate(random))
}

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="mb-6.5 flex flex-wrap items-center gap-3">
    <button
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-[11px] border border-white/14 bg-white/[0.03] text-lg text-star-100 transition hover:border-nebula-500/60 disabled:cursor-not-allowed disabled:opacity-30"
      :disabled="isAtEpoch"
      aria-label="Previous day"
      @click="go(-1)"
    >
      ‹
    </button>

    <label
      class="relative flex h-11 items-center gap-2.5 rounded-[11px] border border-white/14 bg-white/[0.03] px-4 font-mono text-[15px] tracking-[0.04em] text-star-100"
    >
      <span class="text-[13px] text-star-500">📅</span>{{ modelValue
      }}<input
        type="date"
        :min="APOD_EPOCH"
        :max="today"
        :value="modelValue"
        class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        @input="onInput"
      />
    </label>

    <button
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-[11px] border border-white/14 bg-white/[0.03] text-lg text-star-100 transition hover:border-nebula-500/60 disabled:cursor-not-allowed disabled:opacity-30"
      :disabled="isToday"
      aria-label="Next day"
      @click="go(1)"
    >
      ›
    </button>

    <button
      type="button"
      class="flex h-11 items-center gap-2 rounded-[11px] border border-solar-500/40 bg-solar-500/9 px-[18px] font-display text-sm font-semibold text-solar-500 transition hover:bg-solar-500/16"
      @click="randomDate"
    >
      {{ t.apod.surpriseMe }}
    </button>
  </div>
</template>
