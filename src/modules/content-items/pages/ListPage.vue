<template>
  <div class="relative h-full flex flex-col">
    <ContentItemsFilters
      v-model:search="searchTerm"
      v-model:tags="selectedTags"
      v-model:types="selectedTypes"
      v-model:progresses="selectedProgresses"
      v-model:days="selectedDays"
      v-model:filters-collapsed="filtersCollapsed"
      :tags-options="translatedTagsData"
      :types-options="translatedTypesData"
      :progresses-options="translatedProgressesData"
      :days-options="translatedDaysData"
      :active-filter-count="activeFilterCount"
      :active-filter-counts="activeFilterCounts"
      :show-status="showStatus"
      :show-type="showType"
      :show-day-of-week="showDayOfWeek"
      :show-tags="showTags"
      v-model:columns="visibleColumns"
    />

    <progress
      class="progress progress-primary absolute top-12 left-0 right-0 z-30 rounded-none h-0.5 transition-opacity duration-150"
      :class="isFetching && !isLoading ? 'opacity-100' : 'opacity-0'"
    />

    <ContentItemsTable
      :hobbies="hobbies"
      :is-error="isError"
      :error="error"
      :show-status="showStatus"
      :show-type="showType"
      :show-progress="showProgress"
      :show-day-of-week="showDayOfWeek"
      :visible-column-count="visibleColumnCount"
      :data="data"
    />

    <ContentItemsPagination
      v-model:per-page="per_page"
      :meta="hobbiesMeta"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useContentItemsList } from '../composable/useContentItemsList'
import ContentItemsFilters from '../components/ListPage/ContentItemsFilters.vue'
import ContentItemsTable from '../components/ListPage/ContentItemsTable.vue'
import ContentItemsPagination from '../components/ListPage/ContentItemsPagination.vue'

const {
  searchTerm,
  selectedTags,
  selectedTypes,
  selectedProgresses,
  selectedDays,
  translatedTagsData,
  translatedTypesData,
  translatedProgressesData,
  translatedDaysData,
  visibleColumns,
  filtersCollapsed,
  activeFilterCount,
  activeFilterCounts,
  isLoading,
  isFetching,
  isError,
  error,
  hobbies,
  hobbiesMeta,
  data,
  showProgress,
  showStatus,
  showType,
  showDayOfWeek,
  showTags,
  visibleColumnCount,
  per_page,
  handlePageChange,
} = useContentItemsList()
</script>
