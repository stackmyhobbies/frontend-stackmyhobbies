<template>
  <RouterView />
  <VueQueryDevtools />
</template>

<style scoped></style>
<script setup lang="ts">
import { watch } from 'vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { updateGlobalOptions } from 'vue3-toastify'
import { useThemeStore } from './stores/theme'
import { storeToRefs } from 'pinia'

const { currentTheme } = storeToRefs(useThemeStore())

watch(currentTheme, (theme) => {
  updateGlobalOptions({ theme: theme === 'pastel' ? 'light' : 'dark' })
})
</script>
