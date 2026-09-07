<template>
  <div class="flex justify-end">
    <BaseDropdown>
      <template #trigger="{ toggle }">
        <button
          type="button"
          class="btn btn-sm btn-ghost"
          @click="toggle"
          aria-haspopup="true"
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
        </button>
      </template>

      <template #content>
        <ul
          class="w-56 p-2 rounded-2xl backdrop-blur-2xl border animate-fadeIn menu gap-1 border-base-content/5 bg-base-100/80 shadow-2xl"
        >
          <li>
            <label
              class="flex items-center gap-2.5 rounded-xl hover:bg-base-content/10 cursor-pointer px-2.5 py-1.5"
            >
              <input
                type="checkbox"
                v-model="model!.type"
                class="checkbox checkbox-sm checkbox-accent"
              />
              <span class="flex-1">Tipo</span>
              <span
                v-if="!model!.type && activeFilterCounts.type > 0"
                class="text-xs text-accent/70"
              >
                {{ activeFilterCounts.type }} activo(s)
              </span>
            </label>
          </li>
          <li>
            <label
              class="flex items-center gap-2.5 rounded-xl hover:bg-base-content/10 cursor-pointer px-2.5 py-1.5"
            >
              <input
                type="checkbox"
                v-model="model!.status"
                class="checkbox checkbox-sm checkbox-accent"
              />
              <span class="flex-1">Estado</span>
              <span
                v-if="!model!.status && activeFilterCounts.status > 0"
                class="text-xs text-accent/70"
              >
                {{ activeFilterCounts.status }} activo(s)
              </span>
            </label>
          </li>
          <li>
            <label
              class="flex items-center gap-2.5 rounded-xl hover:bg-base-content/10 cursor-pointer px-2.5 py-1.5"
            >
              <input
                type="checkbox"
                v-model="model!.progress"
                class="checkbox checkbox-sm checkbox-accent"
              />
              <span class="flex-1">Progreso</span>
              <span
                v-if="!model!.progress && activeFilterCounts.progress > 0"
                class="text-xs text-accent/70"
              >
                {{ activeFilterCounts.progress }} activo(s)
              </span>
            </label>
          </li>
          <li>
            <label
              class="flex items-center gap-2.5 rounded-xl hover:bg-base-content/10 cursor-pointer px-2.5 py-1.5"
            >
              <input
                type="checkbox"
                v-model="model!.day_of_week"
                class="checkbox checkbox-sm checkbox-accent"
              />
              <span class="flex-1">Día de emisión</span>
              <span
                v-if="!model!.day_of_week && activeFilterCounts.day_of_week > 0"
                class="text-xs text-accent/70"
              >
                {{ activeFilterCounts.day_of_week }} activo(s)
              </span>
            </label>
          </li>
          <li>
            <label
              class="flex items-center gap-2.5 rounded-xl hover:bg-base-content/10 cursor-pointer px-2.5 py-1.5"
            >
              <input
                type="checkbox"
                v-model="model!.tags"
                class="checkbox checkbox-sm checkbox-accent"
              />
              <span class="flex-1 flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 text-base-content/50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
                Filtro de tags
              </span>
              <span
                v-if="!model!.tags && activeFilterCounts.tags > 0"
                class="text-xs text-accent/70"
              >
                {{ activeFilterCounts.tags }} activo(s)
              </span>
            </label>
          </li>
        </ul>
      </template>
    </BaseDropdown>
  </div>
</template>

<script setup lang="ts">
import BaseDropdown from '@/shared/components/BaseDropdown.vue'
import type { ColumnStructure } from '../../composable/useFiltersColumns'

const model = defineModel<ColumnStructure>()

defineProps<{
  activeFilterCounts: Record<keyof ColumnStructure, number>
}>()
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.15s ease-out;
}
</style>