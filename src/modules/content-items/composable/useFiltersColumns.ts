import { useMediaQuery, type RemovableRef } from '@vueuse/core'
import { computed, type Ref } from 'vue'

export interface ColumnStructure {
  type: boolean
  progress: boolean
  status: boolean
}
export const useFilterColumns = (visibleColumns: Ref<Record<string, boolean>>) => {
  const isMobile = useMediaQuery('(max-width: 767px)')

  const showStatus = computed(() => !isMobile.value || visibleColumns.value.status)
  const showType = computed(() => !isMobile.value || visibleColumns.value.type)
  const showProgress = computed(() => !isMobile.value || visibleColumns.value.progress)

  const visibleColumnCount = computed(() => {
    let count = 2 // title + actions
    if (showStatus.value) count++
    if (showType.value) count++
    if (showProgress.value) count++
    return count
  })

  return {
    isMobile,
    visibleColumnCount,
    showProgress,
    showStatus,
    showType,
  }
}
