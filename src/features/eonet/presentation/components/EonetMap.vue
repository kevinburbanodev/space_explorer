<script setup lang="ts">
import { computed } from 'vue'
import type { NaturalEvent } from '../../domain/natural-event.entity'
import { categoryStyle } from '../category-style'

const props = defineProps<{ events: NaturalEvent[]; selectedId?: string }>()
defineEmits<{ select: [event: NaturalEvent] }>()

const points = computed(() =>
  props.events.map((event) => ({
    event,
    left: ((event.lon + 180) / 360) * 100,
    top: ((90 - event.lat) / 180) * 100,
  })),
)

const meridians = [0, 20, 40, 60, 80, 100]
const parallels = [0, 25, 50, 75, 100]
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-[16px] border border-white/9 bg-white/[0.02]" style="aspect-ratio: 2 / 1">
    <div v-for="m in meridians" :key="`m-${m}`" class="absolute top-0 bottom-0 border-l border-white/5" :style="{ left: `${m}%` }" />
    <div v-for="p in parallels" :key="`p-${p}`" class="absolute right-0 left-0 border-t border-white/5" :style="{ top: `${p}%` }" />
    <div class="absolute top-1/2 right-0 left-0 border-t border-aurora-500/20" />

    <button
      v-for="point in points"
      :key="point.event.id"
      type="button"
      class="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform hover:scale-150"
      :class="selectedId === point.event.id && 'outline outline-2 outline-white/90 outline-offset-2'"
      :style="{
        left: `${point.left}%`,
        top: `${point.top}%`,
        backgroundColor: categoryStyle(point.event.categoryId).color,
        boxShadow: `0 0 8px ${categoryStyle(point.event.categoryId).color}`,
        transform: selectedId === point.event.id ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%)',
      }"
      :aria-label="point.event.title"
      @click="$emit('select', point.event)"
    />
  </div>
</template>
