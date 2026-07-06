<script setup lang="ts">
import type { NaturalEvent } from '../../domain/natural-event.entity'
import { categoryStyle } from '../category-style'

defineProps<{ events: NaturalEvent[]; selectedId?: string }>()
defineEmits<{ select: [event: NaturalEvent] }>()

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="flex max-h-[480px] flex-col gap-2.5 overflow-y-auto pr-1.5">
    <button
      v-for="event in events"
      :key="event.id"
      type="button"
      class="flex items-center gap-3.5 rounded-[14px] border px-[18px] py-3.5 text-left transition-colors"
      :class="selectedId === event.id ? 'border-nebula-500/55 bg-nebula-500/10' : 'border-white/8 bg-white/[0.025] hover:border-nebula-500/50'"
      @click="$emit('select', event)"
    >
      <span
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base"
        :style="{ backgroundColor: `${categoryStyle(event.categoryId).color}22` }"
      >
        {{ categoryStyle(event.categoryId).icon }}
      </span>
      <div class="min-w-0 flex-1">
        <div class="truncate font-display text-sm font-semibold text-star-100">{{ event.title }}</div>
        <div class="font-mono text-xs text-star-500">{{ event.categoryTitle }} · {{ formatDate(event.date) }}</div>
      </div>
    </button>
  </div>
</template>
