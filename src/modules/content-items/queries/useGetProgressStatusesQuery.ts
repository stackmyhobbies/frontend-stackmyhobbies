import { useQuery } from '@tanstack/vue-query'
import { progressStatusAction } from '../actions/progress-status.action'
import type { ProgressStatus } from '../interfaces/progressStatusResponse'

export const useProgressStatusesQuery = () => {
  return useQuery({
    queryKey: ['progress-statuses'],
    queryFn: async (): Promise<ProgressStatus[]> => {
      const response = await progressStatusAction()
      return response.data
    },
  })
}
