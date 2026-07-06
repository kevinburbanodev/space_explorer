<script setup lang="ts">
import { computed } from 'vue'
import type { NearEarthObject } from '../../domain/near-earth-object.entity'

const props = defineProps<{ objects: NearEarthObject[]; selectedId?: string }>()
defineEmits<{ select: [neo: NearEarthObject] }>()

function hashAngle(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) % 360
  return hash
}

const points = computed(() => {
  const maxDistance = Math.max(...props.objects.map((o) => o.missDistanceKm), 1)
  return props.objects.map((neo) => {
    const radiusRatio = Math.log10(neo.missDistanceKm + 1) / Math.log10(maxDistance + 1)
    const radiusPercent = 6 + radiusRatio * 44
    const angleDeg = hashAngle(neo.id)
    const angleRad = (angleDeg * Math.PI) / 180
    const left = 50 + radiusPercent * Math.cos(angleRad)
    const top = 50 + radiusPercent * Math.sin(angleRad)
    const size = Math.max(6, Math.min(13, 5 + Math.log10(Math.max(neo.diameterMaxKm, 1)) * 2))
    return { neo, left, top, size }
  })
})
</script>

<template>
  <div class="relative mx-auto aspect-square w-full max-w-[420px]">
    <div
      v-for="ring in [0.25, 0.5, 0.75, 1]"
      :key="ring"
      class="absolute inset-0 m-auto rounded-full border border-aurora-500/16"
      :style="{ width: `${ring * 100}%`, height: `${ring * 100}%` }"
    />

    <div
      class="absolute inset-0 animate-spin rounded-full"
      style="background: conic-gradient(from 0deg, rgba(46, 207, 174, 0.22), transparent 42%); animation-duration: 5s"
    />

    <div
      class="absolute top-1/2 left-1/2 z-[3] h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_18px_rgba(74,144,217,0.6)]"
      style="background: radial-gradient(circle at 38% 36%, #6fb0f0, #2a5fa8)"
    />

    <button
      v-for="point in points"
      :key="point.neo.id"
      type="button"
      class="absolute z-[4] rounded-full transition-transform hover:scale-125"
      :class="[point.neo.isHazardous && 'animate-hazard-pulse', selectedId === point.neo.id && 'outline outline-2 outline-white/90 outline-offset-2']"
      :style="{
        width: `${point.size}px`,
        height: `${point.size}px`,
        left: `${point.left}%`,
        top: `${point.top}%`,
        transform: selectedId === point.neo.id ? 'translate(-50%, -50%) scale(1.9)' : 'translate(-50%, -50%)',
        backgroundColor: point.neo.isHazardous ? '#ff4d5e' : '#2ecfae',
      }"
      :aria-label="point.neo.name"
      @click="$emit('select', point.neo)"
    />
  </div>
</template>
