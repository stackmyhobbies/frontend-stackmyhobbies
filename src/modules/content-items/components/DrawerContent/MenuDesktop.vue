<template>
  <button class="btn btn-square btn-ghost hidden lg:block" @click="emitirCollapsed">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggleCollapsed'): void }>()

const emitirCollapsed = () => {
  emit('toggleCollapsed')
}
</script>

<style lang="scss" scoped></style>
