<script setup lang="ts">
import type { SpaceWeatherEvent } from '../../domain/space-weather-event.entity'

defineProps<{ events: SpaceWeatherEvent[] }>()

const TYPE_STYLE: Record<SpaceWeatherEvent['type'], { color: string; icon: string }> = {
  flare: { color: '#ff9d2e', icon: '☀️' },
  cme: { color: '#6d5aff', icon: '🌊' },
  storm: { color: '#ff4d5e', icon: '🧲' },
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <a
      v-for="event in events"
      :key="event.id"
      :href="event.link"
      target="_blank"
      rel="noreferrer"
      class="flex items-center gap-4 rounded-[14px] border border-white/8 bg-white/[0.025] px-[18px] py-3.5 transition-colors hover:border-nebula-500/50"
    >
      <span
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base"
        :style="{ backgroundColor: `${TYPE_STYLE[event.type].color}22` }"
      >
        {{ TYPE_STYLE[event.type].icon }}
      </span>
      <div class="min-w-0 flex-1">
        <div class="font-display text-sm font-semibold text-star-100">{{ event.headline }}</div>
        <div class="font-mono text-xs text-star-500">{{ event.detail }}</div>
      </div>
      <div class="shrink-0 font-mono text-[11px] tracking-[0.06em] text-star-500">{{ formatTime(event.time) }} UTC</div>
    </a>
  </div>
</template>
