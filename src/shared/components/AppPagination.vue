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
      :value="currentPage"
      @input="changePage($event)"
      :max="lastPage"
    />
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

const changePage = ($event: Event) => {
  const el = $event.target as HTMLInputElement

  // 1. Convertimos el valor a número para validar
  let pageValue = Number(el.value)

  // 2. Si el usuario borra el input o escribe texto, por defecto va a la página 1
  if (isNaN(pageValue) || pageValue < 1) {
    pageValue = 1
  }

  // 3. Evitamos que supere la última página
  if (pageValue > props.lastPage) {
    pageValue = props.lastPage
  }

  // 4. Sincronizamos el valor VISUAL del input en el navegador
  el.value = pageValue.toString()

  // 5. Emitimos el valor final validado al componente padre
  emit('up-current-page', pageValue)
}

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
