import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useGetContentItemsQuery } from '../queries/useGetContentItemsQuery'
import { useGetTagsQuery } from '../queries/useGetTagsQuery'
import { useGetContentTypesQuery } from '../queries/useGetContentTypesQuery'
import { useProgressStatusesQuery } from '../queries/useGetProgressStatusesQuery'
import { useContentFilters, type DayOption } from './useContentFilters'
import { useFilterColumns } from './useFiltersColumns'
import { DayOfWeekValues } from '../enum/dayOfWeek.enum'
import { slugifyKey } from '@/shared/utils/slugifyKey'
import type { Hobby, MetaData } from '../interfaces/contentItemListResponse'

export function useContentItemsList() {
  const { data: tagsData } = useGetTagsQuery()
  const { data: typesData } = useGetContentTypesQuery()
  const { data: progressesData } = useProgressStatusesQuery()

  const { t } = useI18n({ useScope: 'global' })

  const translatedDaysData = computed<DayOption[]>(() =>
    DayOfWeekValues.map((id) => ({
      id,
      name: t(`common.days.${id}`),
    })),
  )

  const {
    currentPage,
    searchTerm,
    filters,
    selectedTags,
    selectedTypes,
    selectedProgresses,
    selectedDays,
    per_page,
  } = useContentFilters(tagsData, typesData, progressesData, translatedDaysData)

  const { data, isLoading, isFetching, isError, error } = useGetContentItemsQuery({
    pageCurrent: currentPage,
    perPage: per_page,
    filters,
  })

  const visibleColumns = useLocalStorage<{
    type: boolean
    status: boolean
    progress: boolean
    day_of_week: boolean
    tags: boolean
  }>('content-items-columns', {
    type: true,
    status: true,
    progress: true,
    day_of_week: true,
    tags: false,
  })

  const { showProgress, showStatus, showType, showDayOfWeek, showTags, visibleColumnCount } =
    useFilterColumns(visibleColumns)

  const translatedTagsData = computed(
    () =>
      tagsData.value?.map((tag) => ({
        ...tag,
        name: t(`contentItem.tag.${slugifyKey(tag.name)}`),
      })) ?? [],
  )

  const translatedTypesData = computed(
    () =>
      typesData.value?.map((type) => ({
        ...type,
        name: t(`contentItem.type.${slugifyKey(type.name)}`),
      })) ?? [],
  )

  const translatedProgressesData = computed(
    () =>
      progressesData.value?.map((progress) => ({
        ...progress,
        name: t(`contentItem.status.${slugifyKey(progress.name)}`),
      })) ?? [],
  )

  const filtersCollapsed = useLocalStorage<boolean>('content-items-filters-collapsed', false)

  const activeFilterCount = computed(
    () =>
      (searchTerm.value ? 1 : 0) +
      selectedTags.value.length +
      selectedTypes.value.length +
      selectedProgresses.value.length +
      selectedDays.value.length,
  )

  const activeFilterCounts = computed(() => ({
    type: selectedTypes.value.length,
    status: selectedProgresses.value.length,
    progress: selectedProgresses.value.length,
    day_of_week: selectedDays.value.length,
    tags: selectedTags.value.length,
  }))

  const errorMessage = computed(() => error.value?.message ?? null)

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

  const handlePageChange = (page: number) => {
    currentPage.value = page
  }

  return {
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
    error: errorMessage,
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
  }
}
