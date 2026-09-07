import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { patchContentItemProgressAction } from '../actions/patch-content-item-progress.action'
import type { Hobby } from '../interfaces/contentItemListResponse'

export const usePatchContentItemProgressMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: { current_progress: number }
      id: string | number
    }) => patchContentItemProgressAction(id, payload),

    onMutate: async ({ payload, id }) => {
      await queryClient.cancelQueries({ queryKey: ['content-item-list'] })

      const previousList = queryClient.getQueryData(['content-item-list'])

      queryClient.setQueryData(['content-item-list'], (old: Hobby[] = []) => {
        return old.map((item) =>
          item.id === id ? { ...item, ...payload } : item,
        )
      })

      return { previousList }
    },

    onSuccess: (data) => {
      const updated = data.data
      queryClient.setQueryData(['content-item-list'], (old: Hobby[] = []) =>
        old.map((item) => (item.id === updated.id ? updated : item)),
      )
      queryClient.setQueryData(['content-item', updated.slug], updated)
    },

    onError: (_err, _variables, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(['content-item-list'], context.previousList)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['content-item-list'] })
      queryClient.invalidateQueries({ queryKey: ['content-item'] })
    },
  })
}
