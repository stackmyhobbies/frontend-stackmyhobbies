<template>
  <div
    class="dropdown dropdown-end"
    @mouseenter="prefetchEditData(hobby.slug)"
    @focusin="$emit('focus', hobby.id)"
    @focusout="$emit('blur')"
  >
    <label
      tabindex="0"
      class="btn btn-ghost btn-sm btn-circle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 opacity-70"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle
          cx="12"
          cy="5"
          r="2"
        />
        <circle
          cx="12"
          cy="12"
          r="2"
        />
        <circle
          cx="12"
          cy="19"
          r="2"
        />
      </svg>
    </label>

    <ul
      tabindex="0"
      class="dropdown-content z-50 mt-2 w-38 p-2 rounded-2xl backdrop-blur-2xl border animate-fadeIn menu gap-1 border-white/5 bg-white/10 shadow-2xl"
    >
      <li>
        <RouterLink
          :to="{ name: 'content-item-edit', params: { slug: hobby.slug } }"
          class="flex items-center gap-3 rounded-xl hover:bg-white/10 hover:text-amber-300 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>
          Editar
        </RouterLink>
      </li>

      <li>
        <a class="flex items-center gap-3 rounded-xl hover:bg-white/10 hover:text-info transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            />
          </svg>
          Ver detalle
        </a>
      </li>

      <li>
        <a class="flex items-center gap-3 rounded-xl text-error hover:bg-white/10 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
          Eliminar
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'
import { getContentItemAction } from '../actions/get-content-item.action'

defineProps<{ hobby: { id: number; title: string; slug: string } }>()
defineEmits<{ focus: [id: number]; blur: [] }>()

const queryClient = useQueryClient()

const prefetchEditData = (slug: string) => {
  queryClient.prefetchQuery({
    queryKey: ['content-item', slug],
    queryFn: () => getContentItemAction(slug).then((res) => {
      if (!res.success) throw new Error('No se pudo cargar el hobby')
      return res.data
    }),
    staleTime: 1000 * 60,
  })
}
</script>

<style scoped></style>
