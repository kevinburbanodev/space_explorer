<script setup lang="ts">
import type { NearEarthObject } from '../../domain/near-earth-object.entity'
import { useLanguage } from '@/shared/i18n/language'

defineProps<{ objects: NearEarthObject[]; selectedId?: string }>()
defineEmits<{ select: [neo: NearEarthObject] }>()

const { t } = useLanguage()

function formatKm(value: number) {
  return `${Math.round(value).toLocaleString()} km`
}
</script>

<template>
  <div class="flex max-h-[560px] flex-col gap-2.5 overflow-y-auto pr-1.5">
    <button
      v-for="neo in objects"
      :key="neo.id"
      type="button"
      class="rounded-[14px] border px-[18px] py-4 text-left transition-colors"
      :class="selectedId === neo.id ? 'border-nebula-500/55 bg-nebula-500/10' : 'border-white/8 bg-white/[0.025] hover:border-nebula-500/50'"
      @click="$emit('select', neo)"
    >
      <div class="mb-3 flex items-center justify-between gap-2.5">
        <div class="flex items-center gap-2.25">
          <span
            class="h-2.5 w-2.5 rounded-full"
            :style="{ backgroundColor: neo.isHazardous ? '#ff4d5e' : '#2ecfae' }"
          />
          <span class="font-display text-base font-semibold text-star-100">{{ neo.name }}</span>
        </div>
        <span
          v-if="neo.isHazardous"
          class="shrink-0 rounded-full bg-danger-500/15 px-2.25 py-[3px] font-mono text-[10px] tracking-[0.08em] text-danger-400"
        >
          {{ t.neo.hazardBadge }}
        </span>
      </div>
      <div class="grid grid-cols-3 gap-2.5">
        <div>
          <div class="mb-[3px] text-[10px] tracking-[0.08em] text-star-500 uppercase">{{ t.neo.diameter }}</div>
          <div class="font-mono text-sm text-star-100">
            {{ neo.diameterMaxKm >= 1 ? `${neo.diameterMaxKm.toFixed(1)} km` : `${Math.round(neo.diameterMaxKm * 1000)} m` }}
          </div>
        </div>
        <div>
          <div class="mb-[3px] text-[10px] tracking-[0.08em] text-star-500 uppercase">{{ t.neo.missDistance }}</div>
          <div class="font-mono text-sm text-star-100">{{ formatKm(neo.missDistanceKm) }}</div>
        </div>
        <div>
          <div class="mb-[3px] text-[10px] tracking-[0.08em] text-star-500 uppercase">{{ t.neo.velocity }}</div>
          <div class="font-mono text-sm text-star-100">{{ Math.round(neo.velocityKmH).toLocaleString() }} km/h</div>
        </div>
      </div>
    </button>
  </div>
</template>
