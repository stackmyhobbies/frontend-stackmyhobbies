import { useQuery, useQueryClient, type QueryClient } from '@tanstack/vue-query'
import type { Tag } from '../interfaces/TagResponse'
import { tagAction } from '../actions/tag.action'

export function tagsQueryOptions(queryClient: QueryClient) {
  return {
    queryKey: ['tags'],
    queryFn: async (): Promise<Tag[]> => {
      const response = await tagAction()
      return response.data
    },
    staleTime: 1000 * 60 * 3,
  }
}

export const useGetTagsQuery = () => {
  const queryClient = useQueryClient()
  return useQuery(tagsQueryOptions(queryClient))
}
