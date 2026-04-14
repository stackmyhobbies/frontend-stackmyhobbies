import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { handleApiError, type ErrorResponse } from '@/utils/handleApiError'
import type { TagResponse } from '../interfaces/TagResponse'

export const tagAction = async (): Promise<TagResponse | ErrorResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.get<TagResponse>('tags')
    return data
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
