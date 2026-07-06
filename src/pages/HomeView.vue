<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '@/shared/i18n/language'
import { useApod } from '@/features/apod/presentation/composables/useApod'
import { useNeoFeed } from '@/features/neo/presentation/composables/useNeoFeed'
import { ROVERS } from '@/features/mars-rover/domain/rover-photo.entity'
import { toIsoDate } from '@/shared/lib/date'

const router = useRouter()
const { t } = useLanguage()

const today = toIsoDate(new Date())
const { entry: apodEntry, fetchDate: fetchApod } = useApod()
const { objects: neoObjects, fetchDate: fetchNeo } = useNeoFeed()
const roversOnline = ROVERS.filter((r) => r.status === 'active').length

onMounted(() => {
  fetchApod(today)
  fetchNeo(today)
})
</script>

<template>
  <section class="mx-auto max-w-[1160px] px-5 pt-6 pb-24 sm:px-8 sm:pt-8">
    <div
      class="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-b border-white/7 pb-6 font-mono text-xs tracking-[0.08em] text-star-500 sm:mb-14"
    >
      <span class="flex items-center gap-2 text-aurora-500">
        <span class="h-[7px] w-[7px] rounded-full bg-aurora-500 shadow-[0_0_8px_#2ecfae]" />
        {{ t.home.statusBar.signalLive }}
      </span>
      <span class="opacity-35">/</span>
      <span>{{ t.home.statusBar.apod }} <span class="text-star-100">{{ today }}</span></span>
      <span class="opacity-35">/</span>
      <span>{{ t.home.statusBar.neoTracked }} <span class="text-star-100">{{ String(neoObjects.length).padStart(2, '0') }}</span></span>
      <span class="opacity-35">/</span>
      <span
        >{{ t.home.statusBar.roversOnline }}
        <span class="text-solar-500">{{ String(roversOnline).padStart(2, '0') }} / {{ String(ROVERS.length).padStart(2, '0') }}</span></span
      >
    </div>

    <div class="mb-13 grid items-center gap-7 sm:mb-24 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
      <div>
        <div class="mb-5 font-mono text-xs tracking-[0.32em] text-aurora-500 uppercase">{{ t.home.eyebrow }}</div>
        <h1
          class="m-0 max-w-[14ch] bg-clip-text font-display text-[clamp(38px,5.6vw,68px)] leading-[1.02] font-bold tracking-[-0.02em] text-transparent"
          style="background-image: linear-gradient(180deg, #ffffff, #c9c6f2 62%, #8f8ca8)"
        >
          {{ t.home.title }}
        </h1>
        <p class="my-6 max-w-[46ch] text-[clamp(15px,1.6vw,17px)] leading-[1.62] text-star-500">
          {{ t.home.subtitle }}
        </p>
        <div class="flex flex-wrap gap-3">
          <button
            type="button"
            class="rounded-[11px] bg-nebula-500 px-6.5 py-3.5 font-display text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(109,90,255,0.4)] transition-transform hover:-translate-y-0.5"
            @click="router.push('/apod')"
          >
            {{ t.home.ctaPrimary }}
          </button>
          <button
            type="button"
            class="rounded-[11px] border border-white/16 bg-white/[0.03] px-6.5 py-3.5 font-display text-[15px] font-semibold text-star-100 transition-colors hover:border-aurora-500/50"
            @click="router.push('/solar-system')"
          >
            {{ t.home.ctaSecondary }}
          </button>
        </div>
      </div>

      <button
        type="button"
        class="group relative block aspect-[4/5] min-h-[320px] overflow-hidden rounded-[20px] border border-white/10 bg-space-800 text-left shadow-[0_24px_60px_rgba(0,0,0,0.42)] transition-transform hover:-translate-y-1"
        @click="router.push('/apod')"
      >
        <img
          v-if="apodEntry?.mediaType === 'image'"
          :src="apodEntry.url"
          :alt="apodEntry.title"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div class="absolute inset-0" style="background-image: linear-gradient(180deg, transparent 38%, rgba(5, 6, 15, 0.85))" />
        <div class="absolute inset-x-0 bottom-0 p-6.5">
          <div class="mb-3 font-mono text-[11px] tracking-[0.18em] text-[#c9c0ff]">
            {{ t.home.apodPreviewLabel }} · {{ apodEntry?.date ?? today }}
          </div>
          <div class="font-display text-[23px] leading-[1.14] font-semibold text-white">
            {{ apodEntry?.title ?? '···' }}
          </div>
          <div class="mt-4 font-mono text-xs tracking-[0.08em] text-aurora-500">{{ t.home.openFeed }}</div>
        </div>
      </button>
    </div>

    <div class="mb-4.5 flex items-baseline justify-between">
      <h2 class="m-0 font-display text-[clamp(20px,2.4vw,26px)] font-semibold tracking-[-0.01em] text-star-100">
        {{ t.home.modulesHeading }}
      </h2>
      <span class="font-mono text-xs tracking-[0.14em] text-star-500">{{ t.home.modulesTag }}</span>
    </div>

    <div class="grid auto-rows-[minmax(148px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
      <button
        type="button"
        class="group relative col-span-1 row-span-2 overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-nebula-500/16 to-white/[0.012] p-7 text-left transition-all hover:-translate-y-1 hover:border-aurora-500/60 md:col-span-2"
        @click="router.push('/solar-system')"
      >
        <div class="absolute -top-15 -right-15 h-60 w-60 rounded-full border border-aurora-500/18" />
        <div class="absolute -top-1 -right-1 h-[150px] w-[150px] rounded-full border border-aurora-500/28" />
        <div class="absolute top-12 right-12 h-5 w-5 rounded-full bg-solar-500 shadow-[0_0_22px_#ff9d2e]" />
        <div class="relative flex h-full min-h-[220px] flex-col justify-end">
          <div class="mb-3.5 text-3xl">🪐</div>
          <h3 class="m-0 mb-2 font-display text-[26px] font-semibold text-star-100">{{ t.home.cards.solarSystem.title }}</h3>
          <p class="m-0 max-w-[34ch] text-[14.5px] leading-normal text-star-500">{{ t.home.cards.solarSystem.description }}</p>
          <div class="mt-4.5 font-mono text-xs tracking-[0.14em] text-aurora-500">{{ t.home.cards.solarSystem.tag }}</div>
        </div>
      </button>

      <button
        type="button"
        class="group relative overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-white/[0.045] to-white/[0.012] p-5.5 text-left transition-all hover:-translate-y-1 hover:border-nebula-500"
        @click="router.push('/apod')"
      >
        <div class="text-2xl">🌌</div>
        <h3 class="my-3.5 font-display text-lg font-semibold text-star-100">{{ t.home.cards.apod.title }}</h3>
        <div class="font-mono text-[11px] tracking-[0.14em] text-nebula-500">{{ t.home.cards.apod.tag }}</div>
      </button>

      <button
        type="button"
        class="group relative overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-[#d1573c]/18 to-white/[0.012] p-5.5 text-left transition-all hover:-translate-y-1 hover:border-solar-500"
        @click="router.push('/mars-rover')"
      >
        <div class="absolute -right-8.5 -bottom-8.5 h-30 w-30 rounded-full opacity-55" style="background: radial-gradient(circle at 40% 40%, #c96a3e, #6e3418)" />
        <div class="relative">
          <div class="text-2xl">🤖</div>
          <h3 class="my-3.5 font-display text-lg font-semibold text-star-100">{{ t.home.cards.marsRover.title }}</h3>
          <div class="font-mono text-[11px] tracking-[0.14em] text-solar-500">{{ t.home.cards.marsRover.tag }}</div>
        </div>
      </button>

      <button
        type="button"
        class="group relative overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-white/[0.045] to-white/[0.012] p-5.5 text-left transition-all hover:-translate-y-1 hover:border-aurora-500"
        @click="router.push('/earth')"
      >
        <div class="text-2xl">🌍</div>
        <h3 class="my-3.5 font-display text-lg font-semibold text-star-100">{{ t.home.cards.epic.title }}</h3>
        <div class="font-mono text-[11px] tracking-[0.14em] text-aurora-500">{{ t.home.cards.epic.tag }}</div>
      </button>

      <button
        type="button"
        class="group relative overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-solar-500/16 to-white/[0.012] p-5.5 text-left transition-all hover:-translate-y-1 hover:border-solar-500"
        @click="router.push('/space-weather')"
      >
        <div class="text-2xl">☀️</div>
        <h3 class="my-3.5 font-display text-lg font-semibold text-star-100">{{ t.home.cards.donki.title }}</h3>
        <div class="font-mono text-[11px] tracking-[0.14em] text-solar-500">{{ t.home.cards.donki.tag }}</div>
      </button>

      <button
        type="button"
        class="group relative overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-danger-500/14 to-white/[0.012] p-5.5 text-left transition-all hover:-translate-y-1 hover:border-danger-500"
        @click="router.push('/natural-events')"
      >
        <div class="text-2xl">🌋</div>
        <h3 class="my-3.5 font-display text-lg font-semibold text-star-100">{{ t.home.cards.eonet.title }}</h3>
        <div class="font-mono text-[11px] tracking-[0.14em] text-danger-400">{{ t.home.cards.eonet.tag }}</div>
      </button>

      <button
        type="button"
        class="group relative col-span-1 flex items-center justify-between gap-5 overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-white/[0.045] to-white/[0.012] p-6 py-6.5 text-left transition-all hover:-translate-y-1 hover:border-danger-500 md:col-span-3"
        @click="router.push('/near-earth-objects')"
      >
        <div class="absolute -top-7.5 -right-7.5 h-32 w-32 rounded-full" style="background: conic-gradient(from 0deg, rgba(46, 207, 174, 0.32), transparent 45%)" />
        <div class="relative flex items-center gap-4">
          <span class="text-2xl">☄️</span>
          <div>
            <h3 class="m-0 mb-0.5 font-display text-[19px] font-semibold text-star-100">{{ t.home.cards.neo.title }}</h3>
            <p class="m-0 text-[13.5px] text-star-500">{{ t.home.cards.neo.description }}</p>
          </div>
        </div>
        <div class="relative flex items-center gap-2 whitespace-nowrap">
          <span class="h-[9px] w-[9px] rounded-full bg-danger-500 shadow-[0_0_8px_#ff4d5e]" />
          <span class="font-mono text-xs tracking-[0.14em] text-danger-400">{{ t.home.cards.neo.tag }}</span>
        </div>
      </button>
    </div>
  </section>
</template>
