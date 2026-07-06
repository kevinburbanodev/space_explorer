<script setup lang="ts">
import { ref } from 'vue'
import type { RoverPhoto } from '../../domain/rover-photo.entity'

defineProps<{ photos: RoverPhoto[] }>()
const active = ref<RoverPhoto | null>(null)
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3.5">
    <button
      v-for="(photo, index) in photos"
      :key="photo.id"
      type="button"
      class="animate-fade-up relative aspect-[4/3] overflow-hidden rounded-[14px] border border-white/7 bg-space-800 transition-transform hover:scale-[1.02]"
      :style="{ animationDelay: `${Math.min(index, 12) * 40}ms` }"
      @click="active = photo"
    >
      <img
        :src="photo.imgSrc"
        :alt="`${photo.roverName} - ${photo.cameraFullName}`"
        loading="lazy"
        class="h-full w-full object-cover"
      />
      <div
        class="absolute right-0 bottom-0 left-0 flex justify-between p-2.5 font-mono text-[10px] tracking-[0.06em] text-white/85"
        style="background: linear-gradient(0deg, rgba(5, 6, 15, 0.75), transparent)"
      >
        <span>{{ photo.cameraName }}</span><span>{{ photo.id }}</span>
      </div>
    </button>
  </div>

  <Transition name="fade">
    <div
      v-if="active"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(3,4,10,0.9)] p-[5vw] backdrop-blur-sm"
      @click="active = null"
    >
      <div class="relative w-[min(900px,92vw)] max-h-[88vh] overflow-hidden rounded-[18px] border border-white/12">
        <img :src="active.imgSrc" :alt="active.cameraFullName" class="aspect-[4/3] w-full object-cover" />
        <div class="flex justify-between bg-space-950/85 px-5 py-4 font-mono text-[13px] text-star-300">
          <span>{{ active.cameraFullName }}</span><span>{{ active.id }}</span>
        </div>
      </div>
      <button
        type="button"
        class="fixed top-5.5 right-6.5 text-3xl leading-none text-white"
        aria-label="Close"
        @click="active = null"
      >
        ×
      </button>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-up {
  animation: fadeUp 0.4s ease both;
}
</style>
