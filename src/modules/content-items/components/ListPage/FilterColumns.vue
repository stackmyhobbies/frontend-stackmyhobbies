<template>
  <div class="col-span-12 md:hidden flex justify-end">
    <div class="dropdown dropdown-end">
      <label
        tabindex="0"
        class="btn btn-sm btn-ghost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 2v14h4V5H5zm6 0v14h2V5h-2zm4 0v14h4V5h-4z"
          />
        </svg>
        <span>Columnas</span>
      </label>
      <ul
        tabindex="0"
        class="dropdown-content z-50 mt-2 w-48 p-2 rounded-2xl backdrop-blur-2xl border animate-fadeIn menu gap-1 border-base-content/5 bg-base-100/10 shadow-2xl"
      >
        <li>
          <label
            class="flex items-center gap-3 rounded-xl hover:bg-base-content/10 cursor-pointer px-3 py-2"
          >
            <input
              type="checkbox"
              v-model="model!.type"
              class="checkbox checkbox-sm checkbox-accent"
            />
            <span>Tipo</span>
          </label>
        </li>
        <li>
          <label
            class="flex items-center gap-3 rounded-xl hover:bg-base-content/10 cursor-pointer px-3 py-2"
          >
            <input
              type="checkbox"
              v-model="model!.status"
              class="checkbox checkbox-sm checkbox-accent"
            />
            <span>Estado</span>
          </label>
        </li>
        <li>
          <label
            class="flex items-center gap-3 rounded-xl hover:bg-base-content/10 cursor-pointer px-3 py-2"
          >
            <input
              type="checkbox"
              v-model="model!.progress"
              class="checkbox checkbox-sm checkbox-accent"
            />
            <span>Progreso</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColumnStructure } from '../../composable/useFiltersColumns'

const model = defineModel<ColumnStructure>()

/** Version con props y emit
 *
 *
interface ColumnStructure {
  type: boolean
  progress: boolean
  status: boolean
}

interface Props {
  visibleColumns: ColumnStructure
}

const props = defineProps<Props>()

// Definimos el evento personalizado para avisar al padre
const emit = defineEmits<{
  (e: 'update:columns', value: ColumnStructure): void
}>()

// Copiamos el objeto existente, cambiamos la propiedad que mutó y la emitimos
const emitChange = (key: keyof ColumnStructure, checked: boolean) => {
  emit('update:columns', {
    ...props.visibleColumns,
    [key]: checked
  })
} **/
</script>

<style scoped></style>
