import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useGetContentItemsQuery } from '../queries/useGetContentItemsQuery'
import { useGetTagsQuery } from '../queries/useGetTagsQuery'
import { useGetContentTypesQuery } from '../queries/useGetContentTypesQuery'
import { useProgressStatusesQuery } from '../queries/useGetProgressStatusesQuery'
import { useContentFilters } from './useContentFilters'
import { useFilterColumns } from './useFiltersColumns'
import { slugifyKey } from '@/shared/utils/slugifyKey'
import type { Hobby, MetaData } from '../interfaces/contentItemListResponse'

export function useContentItemsList() {
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

  const { showProgress, showStatus, showType, visibleColumnCount } =
    useFilterColumns(visibleColumns)

  const { t } = useI18n({ useScope: 'global' })

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
    translatedTagsData,
    translatedTypesData,
    translatedProgressesData,
    visibleColumns,
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
    visibleColumnCount,
    per_page,
    handlePageChange,
  }
}
