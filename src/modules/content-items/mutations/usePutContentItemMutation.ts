import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { updateContentItemDto } from '../dto/updateContentItemDto'
import { putContentItemAction } from '../actions/put-content-item.action'
import type { Hobby } from '../interfaces/contentItemListResponse'

export const usePutContentItemMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ payload, id }: { payload: updateContentItemDto; id: string | number }) =>
      putContentItemAction(payload, id),
    onMutate: async ({ payload, id }: { payload: updateContentItemDto; id: string | number }) => {
      await queryClient.cancelQueries({ queryKey: ['content-item-list'] })

      const previousData = queryClient.getQueryData(['content-item-list'])

      const contentItemOptimistic = {
        id,
        ...payload,
      }

      queryClient.setQueryData(['content-item-list'], (old: Hobby[] = []) => {
        return (
          old?.map((item) => (item.id === id ? { ...item, ...contentItemOptimistic } : item)) ?? old
        )
      })
      return { previousData, contentItemOptimistic }
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['content-item-list'], (old: Hobby[] | undefined) => {
        const newData = data.data
        if (!old) return [newData]

        return old.map((item) => (item.id === context?.contentItemOptimistic.id ? newData : item))
      })
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['content-item-list'], context?.previousData)
    },
    onSettled: (data, _err, variables) => {
      queryClient.invalidateQueries({ queryKey: ['content-item-list'] })
      queryClient.invalidateQueries({ queryKey: ['content-item', variables.id.toString()] })
    },
  })
}
