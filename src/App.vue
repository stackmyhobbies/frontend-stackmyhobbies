<template>
  <RouterView />
  <VueQueryDevtools />
</template>

<style scoped></style>
<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
// import { useAuthStore } from './modules/auth/stores/auth.store';
// const AuthStore = useAuthStore()
// AuthStore.checkAuthStatus()
</script>
