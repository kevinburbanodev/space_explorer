<script setup lang="ts">
import { computed } from 'vue'
import { ROVERS } from '../../domain/rover-photo.entity'
import { useLanguage } from '@/shared/i18n/language'

const props = defineProps<{ roverId: string; earthDate: string; camera: string }>()
const emit = defineEmits<{
  'update:roverId': [value: string]
  'update:earthDate': [value: string]
  'update:camera': [value: string]
}>()

const { t } = useLanguage()
const activeRover = computed(() => ROVERS.find((r) => r.id === props.roverId) ?? ROVERS[0])
</script>

<template>
  <div class="mb-5.5 flex flex-wrap gap-2.5">
    <button
      v-for="rover in ROVERS"
      :key="rover.id"
      type="button"
      class="flex items-center gap-2.5 rounded-full border px-[18px] py-2.5 font-display text-sm font-semibold transition-colors"
      :class="
        rover.id === roverId
          ? 'border-nebula-500/50 bg-nebula-500/16 text-star-100'
          : 'border-white/10 bg-white/[0.03] text-star-300'
      "
      @click="emit('update:roverId', rover.id)"
    >
      {{ rover.label }}
      <span
        class="rounded-full px-2 py-[3px] font-mono text-[10px] tracking-[0.08em] uppercase"
        :class="rover.status === 'active' ? 'bg-aurora-500/16 text-aurora-500' : 'bg-solar-500/14 text-solar-500'"
      >
        {{ rover.status === 'active' ? t.marsRover.active : t.marsRover.complete }}
      </span>
    </button>
  </div>

  <div class="mb-7 flex flex-wrap items-center gap-3">
    <label class="relative flex h-[42px] items-center gap-2.5 rounded-[10px] border border-white/13 bg-white/[0.03] px-3.5 font-mono text-sm text-star-100">
      <span class="text-xs text-star-500">📅 {{ t.marsRover.earthDate }}</span>{{ earthDate
      }}<input
        type="date"
        :min="activeRover.landingDate"
        :value="earthDate"
        class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        @input="emit('update:earthDate', ($event.target as HTMLInputElement).value)"
      />
    </label>

    <div class="flex flex-wrap gap-1.75">
      <button
        type="button"
        class="rounded-[9px] border px-3.5 py-2 font-mono text-xs tracking-[0.04em] transition-colors"
        :class="
          camera === ''
            ? 'border-aurora-500/50 bg-aurora-500/14 text-star-100'
            : 'border-white/9 bg-white/[0.03] text-star-500'
        "
        @click="emit('update:camera', '')"
      >
        {{ t.marsRover.allCameras }}
      </button>
      <button
        v-for="cam in activeRover.cameras"
        :key="cam.code"
        type="button"
        class="rounded-[9px] border px-3.5 py-2 font-mono text-xs tracking-[0.04em] transition-colors"
        :class="
          camera === cam.code
            ? 'border-aurora-500/50 bg-aurora-500/14 text-star-100'
            : 'border-white/9 bg-white/[0.03] text-star-500'
        "
        @click="emit('update:camera', cam.code)"
      >
        {{ cam.code }}
      </button>
    </div>
  </div>
</template>
