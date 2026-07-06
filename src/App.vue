<script setup lang="ts">
import StarField from '@/shared/ui/StarField.vue'
import AppHeader from '@/shared/layout/AppHeader.vue'
</script>

<template>
  <StarField />
  <div class="relative flex min-h-screen flex-col">
    <AppHeader />
    <main class="relative z-10 flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
