import { useQuery, useQueryClient, type QueryClient } from '@tanstack/vue-query'
import type { Type } from '../interfaces/ContentTypeResponse'
import { contentTypeAction } from '../actions/content-type.action'

export function contentTypesQueryOptions(queryClient: QueryClient) {
  return {
    queryKey: ['content-type'],
    queryFn: async (): Promise<Type[]> => {
      const response = await contentTypeAction()
      return response.data
    },
  }
}

export const useGetContentTypesQuery = () => {
  const queryClient = useQueryClient()
  return useQuery(contentTypesQueryOptions(queryClient))
}
