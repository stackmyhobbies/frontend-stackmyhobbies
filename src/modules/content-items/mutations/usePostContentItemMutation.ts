import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { CreateContentItemDto } from '../dto/CreateContentItemDto'
import { postContentItemAction } from '../actions/post-content-item.action'
import type { Hobby } from '../interfaces/contentItemListResponse'

export const usePostContentItemMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (createContentItem: CreateContentItemDto) =>
      postContentItemAction(createContentItem),
    onMutate: async (createContentItem: CreateContentItemDto) => {
      await queryClient.cancelQueries({ queryKey: ['content-item-list'] })

      const previousData = queryClient.getQueryData(['content-item-list'])

      const contentItemOptimistic = {
        id: Math.floor(Math.random() * 1000000),
        ...createContentItem,
      }

      queryClient.setQueryData(['content-item-list'], (old: Hobby[] = []) => {
        return old ? [contentItemOptimistic, ...old] : [contentItemOptimistic]
      })
      return { previousData, contentItemOptimistic }
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['content-item-list'], (old: Hobby[] | undefined) => {
        if (!old) return [data]

        return old.map((item) => (item.id === context?.contentItemOptimistic.id ? data : item))
      })
    },
    onError: (err, newContentItem, context) => {
      queryClient.setQueryData(['content-item-list'], context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['content-item-list'] })
    },
  })
}
