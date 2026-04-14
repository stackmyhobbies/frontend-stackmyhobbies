import { useQuery } from '@tanstack/vue-query'
import type { Type } from '../interfaces/ContentTypeResponse'
import { contentTypeAction } from '../actions/content-type.action'
export const useGetContentTypesQuery = () => {
  return useQuery({
    queryKey: ['content-type'],
    queryFn: async (): Promise<Type[]> => {
      const response = await contentTypeAction()
      // Mapeamos los items directamente desde el objeto data
      if (!response.success) return []

      return response.data
    },
    // M
  })
}
