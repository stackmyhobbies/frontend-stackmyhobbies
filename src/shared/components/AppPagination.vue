<template>
  <div class="join flex justify-center py-4">
    <button
      class="join-item btn"
      @click="backPage()"
      :disabled="page <= 1"
    >
      «
    </button>
    <button class="join-item btn">Page {{ page }}</button>
    <button
      @click="nextPage()"
      class="join-item btn"
      :disabled="page >= lastPage"
    >
      »
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  currentPage: number
  lastPage: number
}>()

const emit = defineEmits(['up-current-page'])

const page = ref<number>(props.currentPage)

const nextPage = () => {
  if (page.value >= props.lastPage) return
  page.value++
  emit('up-current-page', page.value)
}

const backPage = () => {
  if (page.value <= 1) return
  page.value--
  emit('up-current-page', page.value)
}
</script>

<style scoped></style>
