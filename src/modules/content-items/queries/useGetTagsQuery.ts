import { useQuery } from '@tanstack/vue-query'
import type { Tag } from '../interfaces/TagResponse'
import { tagAction } from '../actions/tag.action'

export const useGetTagsQuery = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async (): Promise<Tag[]> => {
      const response = await tagAction()
      // Mapeamos los items directamente desde el objeto data
      if (!response.success) return []

      return response.data
    },
    staleTime: 1000 * 60 * 3,
    // M
  })
}
