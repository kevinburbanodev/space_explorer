<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: string; availableDates: string[] }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const index = computed(() => props.availableDates.indexOf(props.modelValue))
const isAtStart = computed(() => index.value <= 0)
const isAtEnd = computed(() => index.value === -1 || index.value >= props.availableDates.length - 1)

function go(delta: number) {
  const next = index.value + delta
  if (next < 0 || next >= props.availableDates.length) return
  emit('update:modelValue', props.availableDates[next])
}
</script>

<template>
  <div class="mb-6.5 flex flex-wrap items-center gap-3">
    <button
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-[11px] border border-white/14 bg-white/[0.03] text-lg text-star-100 transition hover:border-nebula-500/60 disabled:cursor-not-allowed disabled:opacity-30"
      :disabled="isAtStart"
      aria-label="Previous day"
      @click="go(-1)"
    >
      ‹
    </button>

    <div class="flex h-11 items-center gap-2.5 rounded-[11px] border border-white/14 bg-white/[0.03] px-4 font-mono text-[15px] tracking-[0.04em] text-star-100">
      <span class="text-[13px] text-star-500">📅</span>{{ modelValue }}
    </div>

    <button
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-[11px] border border-white/14 bg-white/[0.03] text-lg text-star-100 transition hover:border-nebula-500/60 disabled:cursor-not-allowed disabled:opacity-30"
      :disabled="isAtEnd"
      aria-label="Next day"
      @click="go(1)"
    >
      ›
    </button>
  </div>
</template>
