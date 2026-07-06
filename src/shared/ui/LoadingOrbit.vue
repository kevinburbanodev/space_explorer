<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Loading...' })
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-16 text-star-300">
    <div class="relative h-16 w-16">
      <div class="absolute inset-0 rounded-full border border-white/10" />
      <div class="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-nebula-400 border-r-nebula-400" />
      <div class="absolute inset-3 rounded-full bg-solar-400 shadow-[0_0_20px_4px_rgba(255,157,46,0.5)]" />
    </div>
    <p class="font-mono text-sm tracking-wide">{{ label }}</p>
  </div>
</template>
