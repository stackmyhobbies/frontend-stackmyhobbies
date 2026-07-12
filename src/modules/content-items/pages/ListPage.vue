<template>
  <div class="relative h-full flex flex-col">
    <ContentItemsFilters
      v-model:search="searchTerm"
      v-model:tags="selectedTags"
      v-model:types="selectedTypes"
      v-model:progresses="selectedProgresses"
      :tags-options="translatedTagsData"
      :types-options="translatedTypesData"
      :progresses-options="translatedProgressesData"
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
  translatedTagsData,
  translatedTypesData,
  translatedProgressesData,
  visibleColumns,
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
  visibleColumnCount,
  per_page,
  handlePageChange,
} = useContentItemsList()
</script>
