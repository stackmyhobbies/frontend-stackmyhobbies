import { useQuery } from '@tanstack/vue-query'
import { getContentItemsAction } from '../actions/get-content-items.action'
import type { Hobby } from '../interfaces/contentItemListResponse'

export const useGetContentItemsQuery = () => {
  return useQuery({
    queryKey: ['content-item-list'],
    queryFn: async (): Promise<Hobby[]> => {
      const response = await getContentItemsAction()
      // Mapeamos los items directamente desde el objeto data
      if (!response.success) return []

      return response.data.items
    },
    staleTime: 1000 * 60,
  })
}
