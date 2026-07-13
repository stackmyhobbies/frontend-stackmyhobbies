import { useQuery, useQueryClient, type QueryClient } from '@tanstack/vue-query'
import { type MaybeRefOrGetter, toValue, computed } from 'vue'
import { getContentItemAction } from '../actions/get-content-item.action'
import type { Hobby } from '../interfaces/contentItemResponse'

function findInListCache(queryClient: QueryClient, slug: string): Hobby | undefined {
  const allCache = queryClient.getQueriesData({ queryKey: ['content-item-list'] })

  for (const [, cacheValue] of allCache) {
    const items = cacheValue as Hobby[]
    if (!Array.isArray(items)) continue

    const item = items.find((h) => h.slug === slug || h.id.toString() === slug)
    if (item) return item
  }

  return undefined
}

export function contentItemQueryOptions(queryClient: QueryClient, slug: string) {
  return {
    queryKey: ['content-item', slug],
    queryFn: async (): Promise<Hobby> => {
      const response = await getContentItemAction(slug)
      return response.data
    },
    placeholderData: () => (slug ? findInListCache(queryClient, slug) : undefined),
    staleTime: 1000 * 60,
  }
}

export const useGetContentItemQuery = (
  idOrSlug: MaybeRefOrGetter<string>,
  options: { enabled?: MaybeRefOrGetter<boolean> } = {},
) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: computed(() => ['content-item', toValue(idOrSlug)]),
    queryFn: async (): Promise<Hobby> => {
      const slug = toValue(idOrSlug)
      const response = await getContentItemAction(slug)
      return response.data
    },
    placeholderData: () => {
      const slug = toValue(idOrSlug)
      return slug ? findInListCache(queryClient, slug) : undefined
    },
    enabled: options.enabled,
    staleTime: 1000 * 60,
  })
}
