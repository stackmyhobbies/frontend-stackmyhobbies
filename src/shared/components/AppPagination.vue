<template>
  <div class="join flex justify-center py-4">
    <button
      type="button"
      class="join-item btn"
      @click="backPage()"
      :disabled="currentPage <= 1"
    >
      «
    </button>
    <button
      type="button"
      class="join-item btn"
    >
      Page
    </button>

    <input
      type="number"
      min="1"
      class="w-10 me-1 border-gray-400/30 border-solid border-1 text-center"
      :value="inputValue"
      @input="changePage($event)"
      :max="lastPage"
    />
    <button
      type="button"
      @click="nextPage()"
      class="join-item btn"
      :disabled="currentPage >= lastPage"
    >
      »
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  currentPage: number
  lastPage: number
}>()

const emit = defineEmits(['up-current-page'])

const inputValue = ref(props.currentPage.toString())

watch(
  () => props.currentPage,
  (v) => {
    inputValue.value = v.toString()
  },
)

function validate(pageValue: number): number {
  if (isNaN(pageValue) || pageValue < 1) return 1
  if (pageValue > props.lastPage) return props.lastPage
  return pageValue
}

const changePage = ($event: Event) => {
  const el = $event.target as HTMLInputElement
  let pageValue = Number(el.value)
  pageValue = validate(pageValue)
  inputValue.value = pageValue.toString()
  if (pageValue !== props.currentPage) {
    emit('up-current-page', pageValue)
  }
}

const nextPage = () => {
  if (props.currentPage >= props.lastPage) return
  emit('up-current-page', props.currentPage + 1)
}

const backPage = () => {
  if (props.currentPage <= 1) return
  emit('up-current-page', props.currentPage - 1)
}
</script>

<style scoped></style>
