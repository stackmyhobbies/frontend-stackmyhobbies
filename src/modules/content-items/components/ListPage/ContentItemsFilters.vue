<template>
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
        :items="tagsOptions"
        placeholder="Filtrar tags..."
      />
    </div>
    <div class="col-span-6 md:col-span-3">
      <AppSelectComboBox
        v-model="selectedTypes"
        :items="typesOptions"
        placeholder="Filtrar tipos..."
      />
    </div>
    <div class="col-span-6 md:col-span-3">
      <AppSelectComboBox
        v-model="selectedProgresses"
        :items="progressesOptions"
        placeholder="Filtrar progreso..."
      />
    </div>
    <FilterColumns v-model="visibleColumns" />
  </form>
</template>

<script setup lang="ts">
import type { Tag } from '../../interfaces/TagResponse'
import type { Type } from '../../interfaces/ContentTypeResponse'
import type { ProgressStatus } from '../../interfaces/progressStatusResponse'
import type { ColumnStructure } from '../../composable/useFiltersColumns'
import AppInput from '@/shared/components/AppInput.vue'
import AppSelectComboBox from '@/shared/components/AppSelectComboBox.vue'
import FilterColumns from './FilterColumns.vue'

const searchTerm = defineModel<string>('search', { required: true })
const selectedTags = defineModel<Tag[]>('tags', { required: true })
const selectedTypes = defineModel<Type[]>('types', { required: true })
const selectedProgresses = defineModel<ProgressStatus[]>('progresses', { required: true })
const visibleColumns = defineModel<ColumnStructure>('columns', { required: true })

defineProps<{
  tagsOptions: Tag[]
  typesOptions: Type[]
  progressesOptions: ProgressStatus[]
}>()
</script>
