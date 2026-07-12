<template>
  <div class="h-screen grid grid-rows-[auto_1fr_auto] overflow-hidden">
    <div
      class="flex justify-end items-end"
      id="header-settings"
    >
      <SwitchLangComponent />
      <SwitchThemeComponent />
    </div>
    <RouterView />
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
