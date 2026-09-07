import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { throwApiError, ApiError } from '@/utils/handleApiError'
import type { ContentItemResponse } from '../interfaces/contentItemResponse'

export const patchContentItemProgressAction = async (
  id: string | number,
  payload: { current_progress: number },
): Promise<ContentItemResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.patch<ContentItemResponse>(
      `/content-items/${id}/progress`,
      payload,
    )
    if (!data.success) {
      throw new ApiError(data.message, data.errors)
    }
    return data
  } catch (error) {
    throwApiError(error)
  }
}
