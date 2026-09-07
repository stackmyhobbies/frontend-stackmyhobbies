<template>
  <form
    class="z-20 bg-base-200 px-3 py-2 flex flex-col"
    :class="filtersCollapsed ? '' : 'gap-2'"
  >
    <div class="flex items-center justify-between gap-3">
      <button
        type="button"
        class="btn btn-sm btn-ghost gap-2"
        :aria-expanded="!filtersCollapsed"
        @click="filtersCollapsed = !filtersCollapsed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
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
        <span>{{ filtersCollapsed ? 'Mostrar filtros' : 'Ocultar filtros' }}</span>
        <span
          v-if="activeFilterCount > 0 && filtersCollapsed"
          class="badge badge-accent badge-sm"
        >{{ activeFilterCount }}</span>
      </button>
      <FilterColumns
        v-model="visibleColumns"
        :active-filter-counts="activeFilterCounts"
      />
    </div>

    <Transition
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div
        v-if="!filtersCollapsed"
        class="filter-collapse-content grid grid-cols-12 gap-4 pt-2"
      >
        <div class="col-span-12 md:col-span-3">
          <AppInput
            v-model="searchTerm"
            type="text"
            name="search"
            placeholder="Buscar..."
          />
        </div>
        <div
          v-show="showTags"
          class="col-span-6 md:col-span-3"
        >
          <AppSelectComboBox
            v-model="selectedTags"
            :items="tagsOptions"
            placeholder="Filtrar tags..."
          />
        </div>
        <div
          v-show="showType"
          class="col-span-6 md:col-span-3"
        >
          <AppSelectComboBox
            v-model="selectedTypes"
            :items="typesOptions"
            placeholder="Filtrar tipos..."
          />
        </div>
        <div
          v-show="showStatus"
          class="col-span-6 md:col-span-3"
        >
          <AppSelectComboBox
            v-model="selectedProgresses"
            :items="progressesOptions"
            placeholder="Filtrar progreso..."
          />
        </div>
        <div
          v-show="showDayOfWeek"
          class="col-span-6 md:col-span-3"
        >
          <AppSelectComboBox
            v-model="selectedDays"
            :items="daysOptions"
            placeholder="Día de emisión..."
          />
        </div>
      </div>
    </Transition>
  </form>
</template>

<script setup lang="ts">
import type { Tag } from '../../interfaces/TagResponse'
import type { Type } from '../../interfaces/ContentTypeResponse'
import type { ProgressStatus } from '../../interfaces/progressStatusResponse'
import type { ColumnStructure } from '../../composable/useFiltersColumns'
import type { DayOption } from '../../composable/useContentFilters'
import AppInput from '@/shared/components/AppInput.vue'
import AppSelectComboBox from '@/shared/components/AppSelectComboBox.vue'
import FilterColumns from './FilterColumns.vue'

const searchTerm = defineModel<string>('search', { required: true })
const selectedTags = defineModel<Tag[]>('tags', { required: true })
const selectedTypes = defineModel<Type[]>('types', { required: true })
const selectedProgresses = defineModel<ProgressStatus[]>('progresses', { required: true })
const selectedDays = defineModel<DayOption[]>('days', { required: true })
const visibleColumns = defineModel<ColumnStructure>('columns', { required: true })
const filtersCollapsed = defineModel<boolean>('filtersCollapsed', { required: true })

defineProps<{
  tagsOptions: Tag[]
  typesOptions: Type[]
  progressesOptions: ProgressStatus[]
  daysOptions: DayOption[]
  activeFilterCount: number
  activeFilterCounts: Record<keyof ColumnStructure, number>
  showStatus: boolean
  showType: boolean
  showDayOfWeek: boolean
  showTags: boolean
}>()

function onBeforeEnter(el: Element) {
  const e = el as HTMLElement
  e.style.height = '0'
  e.style.overflow = 'hidden'
}

function onEnter(el: Element, done: () => void) {
  const e = el as HTMLElement
  e.style.transition = 'height 0.2s ease-out'
  void e.offsetHeight
  e.style.height = `${e.scrollHeight}px`
  const onEnd = (ev: TransitionEvent) => {
    if (ev.propertyName !== 'height') return
    e.removeEventListener('transitionend', onEnd)
    done()
  }
  e.addEventListener('transitionend', onEnd)
  setTimeout(() => {
    e.removeEventListener('transitionend', onEnd)
    done()
  }, 260)
}

function onBeforeLeave(el: Element) {
  const e = el as HTMLElement
  e.style.height = `${e.scrollHeight}px`
  e.style.overflow = 'hidden'
}

function onLeave(el: Element, done: () => void) {
  const e = el as HTMLElement
  void e.offsetHeight
  e.style.transition = 'height 0.2s ease-out'
  e.style.height = '0'
  const onEnd = (ev: TransitionEvent) => {
    if (ev.propertyName !== 'height') return
    e.removeEventListener('transitionend', onEnd)
    done()
  }
  e.addEventListener('transitionend', onEnd)
  setTimeout(() => {
    e.removeEventListener('transitionend', onEnd)
    done()
  }, 260)
}
</script>