import { useQuery } from '@tanstack/vue-query'
import { getContentItemsAction, type filterProps } from '../actions/get-content-items.action'
import type { ContentItemListResponse } from '../interfaces/contentItemListResponse'
import type { Ref } from 'vue'
import { computed, toValue } from 'vue'

interface Props {
  pageCurrent: Ref<number> | number
  filters?: filterProps
}

export const useGetContentItemsQuery = ({ pageCurrent, filters }: Props) => {
  return useQuery({
    queryKey: computed(() => ['content-item-list', toValue(pageCurrent), { ...filters }]),
    queryFn: async (): Promise<ContentItemListResponse> => {
      const response = await getContentItemsAction(toValue(pageCurrent), filters)
      if (!response.success) throw new Error(response.message || 'Error al cargar')
      console.log(response, 'useQuery')
      return response
    },
    staleTime: 1000 * 60,
  })
}
