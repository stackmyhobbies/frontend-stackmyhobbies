<template>
  <div class="min-h-dvh grid grid-rows-[auto_1fr_auto] overflow-x-hidden">
    <div class="grid" id="header-settings">
      <SwitchThemeComponent />
    </div>
    <RouterView />
    <div>
      footer
    </div>
  </div>
</template>

<script lang="ts" setup>
import SwitchThemeComponent from '@/shared/components/SwitchThemeComponent.vue';
import { RouterView } from 'vue-router'
</script>

<style lang="css" scoped></style>
