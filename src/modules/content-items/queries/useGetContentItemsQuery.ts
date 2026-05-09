import { useQuery } from '@tanstack/vue-query'
import { getContentItemsAction } from '../actions/get-content-items.action'
import type { ContentItemListResponse } from '../interfaces/contentItemListResponse'
import type { ErrorResponse } from '@/utils/handleApiError'
import type { Ref } from 'vue'
import { toValue } from 'vue'

interface Props {
  pageCurrent: Ref<number> | number // 👈 acepta ref o número plano
}

export const useGetContentItemsQuery = ({ pageCurrent }: Props) => {
  return useQuery({
    queryKey: ['content-item-list', pageCurrent], // 👈 página en la key
    queryFn: async (): Promise<ContentItemListResponse | ErrorResponse> => {
      const response = await getContentItemsAction(toValue(pageCurrent)) // 👈 toValue() resuelve ref o number
      if (!response.success) {
        return {
          success: false,
          data: [],
          message: '',
          errors: {},
        }
      }
      return response
    },
    staleTime: 1000 * 60,
  })
}
