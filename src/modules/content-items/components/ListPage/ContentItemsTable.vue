<template>
  <div class="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
    <table class="table table-pin-rows bg-base-200">
      <thead>
        <tr class="text-base-content capitalize">
          <th class="bg-base-200">Title</th>
          <th
            v-if="showStatus"
            class="bg-base-200"
          >
            Status
          </th>
          <th
            v-if="showType"
            class="bg-base-200"
          >
            Type
          </th>
          <th
            v-if="showProgress"
            class="bg-base-200"
          >
            progress
          </th>
          <th class="bg-base-200"></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isError">
          <tr>
            <td
              :colspan="visibleColumnCount"
              class="text-center text-error py-8"
            >
              Error: {{ error }}
            </td>
          </tr>
        </template>

        <template v-else-if="!data">
          <tr
            v-for="n in 8"
            :key="n"
          >
            <td>
              <div class="flex flex-row gap-4">
                <div class="skeleton w-14 h-14 rounded-lg shrink-0"></div>
                <div class="flex flex-col gap-2 w-full">
                  <div class="skeleton h-4 w-48"></div>
                  <div class="skeleton h-5 w-24 rounded-md"></div>
                </div>
              </div>
            </td>
            <td v-if="showStatus"><div class="skeleton h-6 w-20 rounded-md"></div></td>
            <td v-if="showType"><div class="skeleton h-4 w-16"></div></td>
            <td v-if="showProgress">
              <div class="flex flex-col gap-2">
                <div class="skeleton h-4 w-24"></div>
                <div class="skeleton h-2 w-full rounded-full"></div>
              </div>
            </td>
            <td><div class="skeleton w-8 h-8 rounded-full"></div></td>
          </tr>
        </template>

        <template v-else-if="hobbies.length > 0">
          <ContentItemsTableRow
            v-for="hobby in hobbies"
            :key="hobby.id"
            :hobby="hobby"
            :show-status="showStatus"
            :show-type="showType"
            :show-progress="showProgress"
            :active-id="activeId"
            @focus="activeId = $event"
            @blur="activeId = null"
          />
        </template>

        <template v-else>
          <tr>
            <td
              :colspan="visibleColumnCount"
              class="text-center text-base-content/50 py-12"
            >
              No se encontraron resultados
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContentItemsTableRow from './ContentItemsTableRow.vue'
import type { ContentItemListResponse, Hobby } from '../../interfaces/contentItemListResponse'

defineProps<{
  hobbies: Hobby[]
  isError: boolean
  error: string | null
  showStatus: boolean
  showType: boolean
  showProgress: boolean
  visibleColumnCount: number
  data: ContentItemListResponse | undefined
}>()

const activeId = ref<number | null>(null)
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}
</style>
