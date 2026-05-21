<template>
  <div class="relative h-full flex flex-col">
    <form class="sticky top-0 z-20 bg-base-200 grid grid-cols-12 gap-4 px-3 py-2">
      <div class="col-span-12 md:col-span-3">
        <AppInput
          v-model="searchTerm"
          type="text"
          name="search"
          placeholder="Buscar..."
        />
      </div>
      <div class="col-span-6 md:col-span-3">
        <AppSelectComboBox
          v-model="selectedTags"
          :items="tagsData ?? []"
          placeholder="Filtrar tags..."
        />
      </div>

      <div class="col-span-6 md:col-span-3">
        <AppSelectComboBox
          v-model="selectedTypes"
          :items="typesData ?? []"
          placeholder="Filtrar tipos..."
        />
      </div>

      <div class="col-span-6 md:col-span-3">
        <AppSelectComboBox
          v-model="selectedProgresses"
          :items="progressesData ?? []"
          placeholder="Filtrar progreso..."
        />
      </div>

      <FilterColumns v-model="visibleColumns" />

      <!-- En el template del Padre Sin vi model -->
      <!-- <FilterColumns
        :visible-columns="visibleColumns"
        @update:columns="visibleColumns = $event"
      /> -->
    </form>

    <progress
      class="progress progress-primary absolute top-12 left-0 right-0 z-30 rounded-none h-0.5 transition-opacity duration-150"
      :class="isFetching && !isLoading ? 'opacity-100' : 'opacity-0'"
    />

    <div class="flex-1 overflow-auto">
      <table class="table table-pin-rows bg-base-200">
        <thead>
          <tr class="text-white capitalize">
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
            <tr
              v-for="hobby in hobbies"
              :key="hobby.id"
              class="group"
              :class="activeId === hobby.id ? 'ring-1 ring-inset ring-white/10' : ''"
            >
              <td
                class="transition-colors duration-150 group-hover:bg-base-content/5"
                :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
              >
                <div class="flex flex-row gap-4 items-center w-full min-w-0">
                  <div class="w-14 h-14">
                    <img
                      v-image-fallback="hobby.thumbnail_url"
                      alt="not_found"
                      class="w-full h-full object-cover rounded-lg border-transparent"
                    />
                  </div>
                  <div class="flex flex-col min-w-0 flex-1">
                    <div>
                      <span class="inline-block font-bold text-white mb-1">
                        {{ `${hobby.title} ${hobby.segment_label}` }}
                      </span>
                    </div>
                    <div>
                      <span
                        class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-white inset-ring inset-ring-gray-400/20"
                      >
                        {{
                          hobby.tags
                            .slice(0, 2)
                            .map((h) => h.name)
                            .join('/')
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td
                v-if="showStatus"
                class="transition-colors duration-150 group-hover:bg-base-content/5"
                :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
              >
                <div
                  v-if="hobby.progress_status?.name"
                  v-status-badge="hobby.progress_status.name"
                >
                  {{ hobby.progress_status.name }}
                </div>
                <div v-else>
                  <span>No status</span>
                </div>
              </td>
              <td
                v-if="showType"
                class="transition-colors duration-150 group-hover:bg-base-content/5"
                :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
              >
                {{ hobby.type.name }}
              </td>
              <td
                v-if="showProgress"
                class="transition-colors duration-150 group-hover:bg-base-content/5"
                :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
              >
                <div class="flex items-center gap-2 flex-col">
                  <div class="self-start">
                    <span class="text-sm font-bold me-2">{{ hobby.progress_percent }}%</span>
                    <span>
                      {{ hobby.current_progress }}/{{ hobby.total_progress }}
                      {{ hobby.progress_unit }}
                    </span>
                  </div>
                  <progress
                    class="progress progress-success w-full"
                    :value="hobby.current_progress"
                    :max="hobby.total_progress"
                  ></progress>
                </div>
              </td>

              <!--Actions-->
              <td
                class="transition-colors duration-150 group-hover:bg-base-content/5"
                :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
              >
                <DropdownActionContentItem
                  :hobby="hobby"
                  @focus="activeId = $event"
                  @blur="activeId = null"
                />
              </td>
            </tr>
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

    <div class="grid grid-cols-12">
      <div
        class="col-span-12 md:col-span-4 hidden sm:flex justify-center md:justify-start items-center ps-0 md:ps-4 py-2 md:py-0"
      >
        {{ hobbiesMeta.total }} hobbies
      </div>

      <div
        class="col-span-12 md:col-span-8 flex flex-col md:flex-row justify-center md:justify-end items-center pe-0 md:pe-16 gap-2 md:gap-0"
      >
        <div class="col-span-12 w-full md:w-auto flex justify-center items-center">
          <span class="text-sm">Filas por página:</span>
          <select
            v-model="per_page"
            class="select select-md bg-base-200 text-white w-20 ms-2"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
        </div>
        <!--info 2-->
        <div
          class="col-span-12 w-full md:w-auto flex justify-center items-center mx-0 md:mx-3 py-1 md:py-0"
        >
          <p v-if="hobbiesMeta.total > 0">
            Página <span class="font-semibold text-white">{{ hobbiesMeta.current_page }}</span> de
            <span class="font-semibold text-white">{{ hobbiesMeta.last_page }}</span>
          </p>
          <p v-else>No hay elementos para mostrar</p>
        </div>
        <!--Paginator-->
        <div class="col-span-12 w-full md:w-auto flex justify-center items-center">
          <AppPagination
            :current-page="hobbiesMeta.current_page"
            :last-page="hobbiesMeta.last_page ?? 1"
            @up-current-page="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useGetContentItemsQuery } from '../queries/useGetContentItemsQuery'
import { useGetTagsQuery } from '../queries/useGetTagsQuery'
import { useGetContentTypesQuery } from '../queries/useGetContentTypesQuery'
import { useProgressStatusesQuery } from '../queries/useGetProgressStatusesQuery'
import { useContentFilters } from '../composable/useContentFilters'
import { computed, ref } from 'vue'
import { useLocalStorage, useMediaQuery } from '@vueuse/core'
import { vStatusBadge } from '../directives/v-status-badge'
import { vImageFallback } from '../directives/v-image-fallback'
import type { Hobby, MetaData } from '../interfaces/contentItemListResponse'
import DropdownActionContentItem from '../components/DropdownActionContentItem.vue'
import AppPagination from '@/shared/components/AppPagination.vue'
import AppSelectComboBox from '@/shared/components/AppSelectComboBox.vue'
import AppInput from '@/shared/components/AppInput.vue'
import FilterColumns from '../components/ListPage/FilterColumns.vue'
import { useFilterColumns } from '../composable/useFiltersColumns'

const { data: tagsData } = useGetTagsQuery()
const { data: typesData } = useGetContentTypesQuery()
const { data: progressesData } = useProgressStatusesQuery()

const {
  currentPage,
  searchTerm,
  filters,
  selectedTags,
  selectedTypes,
  selectedProgresses,
  per_page,
} = useContentFilters(tagsData, typesData, progressesData)

const { data, isLoading, isFetching, isError, error } = useGetContentItemsQuery({
  pageCurrent: currentPage,
  perPage: per_page,
  filters,
})

const visibleColumns = useLocalStorage<{
  type: boolean
  status: boolean
  progress: boolean
}>('content-items-columns', {
  type: true,
  status: false,
  progress: false,
})
const { showProgress, showStatus, showType, isMobile, visibleColumnCount } =
  useFilterColumns(visibleColumns)

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const hobbies = computed<Hobby[]>(() => data.value?.data.items ?? [])
const hobbiesMeta = computed<MetaData>(
  () =>
    data.value?.data.meta_data ?? {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
      filters_applied: [],
      next_page_url: null,
      prev_page_url: null,
    },
)

// Calcula el primer elemento de la página actual (Ej: En pág 1 con per_page 10 -> 1)
const fromItem = computed(() => {
  if (hobbiesMeta.value.total === 0) return 0
  return (hobbiesMeta.value.current_page - 1) * hobbiesMeta.value.per_page + 1
})

// Calcula el último elemento de la página actual (Ej: Si hay 9 totales, no debe decir 10, sino 9)
const toItem = computed(() => {
  const currentMax = hobbiesMeta.value.current_page * hobbiesMeta.value.per_page
  return currentMax > hobbiesMeta.value.total ? hobbiesMeta.value.total : currentMax
})

const activeId = ref<number | null>(null)
</script>
<style lang="css" scoped>
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
