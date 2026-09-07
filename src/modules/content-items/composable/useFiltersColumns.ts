import { computed, type Ref } from 'vue'

export interface ColumnStructure {
  type: boolean
  status: boolean
  progress: boolean
  day_of_week: boolean
  tags: boolean
}

export const useFilterColumns = (visibleColumns: Ref<ColumnStructure>) => {
  const showStatus = computed(() => visibleColumns.value.status)
  const showType = computed(() => visibleColumns.value.type)
  const showProgress = computed(() => visibleColumns.value.progress)
  const showDayOfWeek = computed(() => visibleColumns.value.day_of_week)
  const showTags = computed(() => visibleColumns.value.tags)

  const visibleColumnCount = computed(() => {
    let count = 2
    if (showStatus.value) count++
    if (showType.value) count++
    if (showProgress.value) count++
    if (showDayOfWeek.value) count++
    return count
  })

  return {
    visibleColumnCount,
    showProgress,
    showStatus,
    showType,
    showDayOfWeek,
    showTags,
  }
}
