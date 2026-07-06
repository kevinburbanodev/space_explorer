<script setup lang="ts">
import { computed } from 'vue'
import type { Planet } from '../../domain/planet.entity'

const props = defineProps<{ planets: Planet[]; selectedId?: string }>()
defineEmits<{ select: [planet: Planet] }>()

const RADII = [60, 86, 114, 146, 184, 226, 272, 315]
const SIZES = [8, 12, 12, 10, 26, 22, 16, 16]
const DURATIONS = [14, 20, 28, 38, 54, 74, 96, 120]
const BOX = RADII[7] * 2 + 40

const pct = (value: number) => `${(value / BOX) * 100}%`

const sunSize = pct(46)

const rings = computed(() =>
  props.planets.map((planet, index) => ({
    planet,
    diameter: pct(RADII[index] * 2),
    size: pct(SIZES[index]),
    duration: `${DURATIONS[index]}s`,
  })),
)
</script>

<template>
  <div class="relative mx-auto aspect-square w-full" :style="{ maxWidth: `${BOX}px` }">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_34px_8px_rgba(255,157,46,0.55)]"
      :style="{ width: sunSize, height: sunSize, background: 'radial-gradient(circle at 40% 38%, #ffd98a, #ff9d2e 55%, #e5661a)' }"
      aria-hidden="true"
    />

    <div
      v-for="ring in rings"
      :key="ring.planet.id"
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/7"
      :style="{ width: ring.diameter, height: ring.diameter }"
    >
      <div class="pointer-events-none absolute inset-0" :style="{ animation: `orbit-spin ${ring.duration} linear infinite` }">
        <button
          type="button"
          class="pointer-events-auto absolute rounded-full transition-transform"
          :class="selectedId !== ring.planet.id && 'hover:scale-125'"
          :style="{
            width: ring.size,
            height: ring.size,
            backgroundColor: ring.planet.color,
            top: '50%',
            right: '0',
            transform: selectedId === ring.planet.id ? 'translate(50%, -50%) scale(1.9)' : 'translate(50%, -50%)',
            boxShadow:
              selectedId === ring.planet.id
                ? `0 0 0 3px rgba(255,255,255,0.85), 0 0 16px ${ring.planet.color}`
                : `0 0 10px ${ring.planet.color}`,
            zIndex: selectedId === ring.planet.id ? 5 : 1,
          }"
          :aria-label="ring.planet.name"
          @click="$emit('select', ring.planet)"
        />
      </div>
    </div>
  </div>
</template>

<style>
@keyframes orbit-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
