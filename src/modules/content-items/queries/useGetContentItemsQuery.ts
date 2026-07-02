import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import { getContentItemsAction, type filterProps } from '../actions/get-content-items.action'
import type { ContentItemListResponse } from '../interfaces/contentItemListResponse'
import type { Ref } from 'vue'
import { computed, toValue } from 'vue'

interface Props {
  pageCurrent: Ref<number> | number
  perPage: Ref<number> | number
  filters?: filterProps
}

export const useGetContentItemsQuery = ({ pageCurrent, perPage, filters }: Props) => {
  return useQuery({
    queryKey: computed(() => [
      'content-item-list',
      toValue(pageCurrent),
      toValue(perPage),
      filters
        ? {
            search: filters.search,
            tags: [...(filters.tags ?? [])],
            content_type: [...(filters.content_type ?? [])],
            progress: [...(filters.progress ?? [])],
          }
        : {},
    ]),
    queryFn: async (): Promise<ContentItemListResponse> => {
      return getContentItemsAction(toValue(pageCurrent), toValue(perPage), filters)
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  })
}
