<template>
  <div class="join flex justify-center py-4">
    <button
      type="button"
      class="join-item btn"
      @click="backPage()"
      :disabled="page <= 1"
    >
      «
    </button>
    <button type="button" class="join-item btn">Page {{ page }}</button>
    <button
      type="button"
      @click="nextPage()"
      class="join-item btn"
      :disabled="page >= lastPage"
    >
      »
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  lastPage: number
}>()

const emit = defineEmits(['up-current-page'])

const page = computed(() => props.currentPage)

const nextPage = () => {
  if (page.value >= props.lastPage) return
  emit('up-current-page', page.value + 1)
}

const backPage = () => {
  if (page.value <= 1) return
  emit('up-current-page', page.value - 1)
}
</script>

<style scoped></style>
