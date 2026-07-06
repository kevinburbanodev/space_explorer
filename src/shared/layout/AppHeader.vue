<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLanguage } from '@/shared/i18n/language'

const route = useRoute()
const menuOpen = ref(false)
const { lang, t, toggleLang } = useLanguage()

const links = computed(() => [
  { to: '/', label: t.value.nav.home },
  { to: '/apod', label: t.value.nav.apod },
  { to: '/solar-system', label: t.value.nav.solarSystem },
  { to: '/mars-rover', label: t.value.nav.marsRover },
  { to: '/near-earth-objects', label: t.value.nav.neo },
  { to: '/earth', label: t.value.nav.epic },
  { to: '/space-weather', label: t.value.nav.donki },
  { to: '/natural-events', label: t.value.nav.eonet },
])

function isActive(path: string) {
  return route.path === path
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-40 flex items-center justify-between border-b border-white/6 bg-space-950/72 px-5 py-4 backdrop-blur-[14px] sm:px-8"
  >
    <RouterLink to="/" class="flex items-center gap-[11px]" @click="closeMenu">
      <span class="text-[26px] leading-none drop-shadow-[0_0_10px_rgba(109,90,255,0.6)]">🪐</span>
      <span class="font-display text-[19px] font-bold tracking-[0.04em] text-star-100">Space Explorer</span>
    </RouterLink>

    <nav class="hidden flex-wrap items-center justify-end gap-1.5 xl:flex">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="rounded-[9px] border px-3 py-2 font-display text-[13px] whitespace-nowrap transition-colors"
        :class="
          isActive(link.to)
            ? 'border-nebula-500/50 bg-nebula-500/16 text-star-100'
            : 'border-white/9 text-star-500 hover:border-nebula-500/50 hover:text-star-100'
        "
      >
        {{ link.label }}
      </RouterLink>
    </nav>

    <div class="flex items-center gap-2.5">
      <button
        type="button"
        class="rounded-[9px] border border-white/10 px-3 py-1.5 font-mono text-xs tracking-wide text-star-100 transition hover:border-nebula-500/50"
        :aria-label="lang === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'"
        @click="toggleLang"
      >
        {{ lang === 'en' ? 'EN' : 'ES' }}
      </button>

      <button
        type="button"
        class="flex flex-col gap-[5px] rounded-[9px] border border-white/12 p-2.5 xl:hidden"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="h-0.5 w-5 rounded-full bg-star-100" />
        <span class="h-0.5 w-5 rounded-full bg-star-100" />
        <span class="h-0.5 w-5 rounded-full bg-star-100" />
      </button>
    </div>
  </header>

  <Transition name="fade">
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-space-950/92 p-6 backdrop-blur-[18px] xl:hidden"
    >
      <div class="flex justify-end">
        <button type="button" class="text-[26px] leading-none text-star-100" aria-label="Close menu" @click="closeMenu">
          ×
        </button>
      </div>
      <nav class="mt-6 flex flex-col gap-2">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-xl border px-[18px] py-4 text-left font-display text-[22px] transition-colors"
          :class="
            isActive(link.to)
              ? 'border-nebula-500/50 bg-nebula-500/16 text-star-100'
              : 'border-white/9 text-star-500'
          "
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </Transition>
</template>
