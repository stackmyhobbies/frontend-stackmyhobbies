<template>
  <div class="min-h-screen relative flex flex-col">
    <div
      class="absolute top-2 right-4 flex items-center gap-2 z-50"
      id="header-settings"
    >
      <SwitchLangComponent />
      <SwitchThemeComponent />
    </div>
    <main class="flex-1">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<script lang="ts" setup>
import FooterComponent from '@/shared/components/FooterComponent.vue'
import SwitchLangComponent from '@/shared/components/SwitchLangComponent.vue'
import SwitchThemeComponent from '@/shared/components/SwitchThemeComponent.vue'
import { RouterView } from 'vue-router'
</script>

<style lang="css" scoped></style>
