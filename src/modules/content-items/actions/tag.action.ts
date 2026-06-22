import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { throwApiError, ApiError } from '@/utils/handleApiError'
import type { TagResponse } from '../interfaces/TagResponse'

export const tagAction = async (): Promise<TagResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.get<TagResponse>('tags')
    if (!data.success) {
      throw new ApiError(data.message)
    }
    return data
  } catch (error: unknown) {
    throwApiError(error)
  }
}
