<template>
  <div class="grid grid-cols-12">
    <div
      class="col-span-12 md:col-span-4 hidden sm:flex justify-center md:justify-start items-center ps-0 md:ps-4 py-2 md:py-0"
    >
      {{ meta.total }} hobbies
    </div>

    <div
      class="col-span-12 md:col-span-8 flex flex-col md:flex-row justify-center md:justify-end items-center pe-0 md:pe-16 gap-2 md:gap-0"
    >
      <div class="col-span-12 w-full md:w-auto flex justify-center items-center">
        <span class="text-sm">Filas por página:</span>
        <select
          v-model="perPage"
          class="select select-md bg-base-200 text-base-content w-20 ms-2"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>

      <div
        class="col-span-12 w-full md:w-auto flex justify-center items-center mx-0 md:mx-3 py-1 md:py-0"
      >
        <p v-if="meta.total > 0">
          Página
          <span class="font-semibold text-base-content">{{ meta.current_page }}</span> de
          <span class="font-semibold text-base-content">{{ meta.last_page }}</span>
        </p>
        <p v-else>No hay elementos para mostrar</p>
      </div>

      <div class="col-span-12 w-full md:w-auto flex justify-center items-center">
        <AppPagination
          :current-page="meta.current_page"
          :last-page="meta.last_page ?? 1"
          @up-current-page="(page: number) => $emit('pageChange', page)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MetaData } from '../../interfaces/contentItemListResponse'
import AppPagination from '@/shared/components/AppPagination.vue'

const perPage = defineModel<number>('perPage', { required: true })

defineProps<{
  meta: MetaData
}>()

defineEmits<{
  pageChange: [page: number]
}>()
</script>
