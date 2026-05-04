import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { type MaybeRefOrGetter, toValue } from 'vue'
import { getContentItemAction } from '../actions/get-content-item.action'
import type { Hobby } from '../interfaces/contentItemResponse'

export const useGetContentItemQuery = (
  idOrSlug: MaybeRefOrGetter<string>,
  options: { enabled?: MaybeRefOrGetter<boolean> },
) => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['content-item', toValue(idOrSlug)],

    queryFn: async (): Promise<Hobby> => {
      const val = toValue(idOrSlug)
      console.log(val)
      const response = await getContentItemAction(val)

      if (!response.success) {
        throw new Error('No se pudo cargar el hobby')
      }

      return response.data
    },
    placeholderData: () => {
      if (!toValue(options.enabled)) {
        return undefined
      }

      const targetValue = toValue(idOrSlug)
      if (!targetValue) return undefined

      const allCache = queryClient.getQueriesData({ queryKey: ['content-item-list'] })

      for (const [, cacheValue] of allCache) {
        const items = cacheValue as Hobby[]
        if (!items || !Array.isArray(items)) continue

        const item = items.find((h) => h.slug === targetValue || h.id.toString() === targetValue)

        if (item) {
          return item
        }
      }

      return undefined
    },
    // Solo se ejecuta si tenemos un valor
    enabled: toValue(options.enabled),
    staleTime: 1000 * 60,
  })
}
