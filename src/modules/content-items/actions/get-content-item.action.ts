import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'

import { throwApiError, ApiError } from '@/utils/handleApiError'
import type { ContentItemResponse } from '../interfaces/contentItemResponse'

export const getContentItemAction = async (
  slug: string,
): Promise<ContentItemResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.get<ContentItemResponse>(`/content-items/${slug}`)
    if (!data.success) {
      throw new ApiError(data.message, data.errors)
    }
    return data
  } catch (error: unknown) {
    throwApiError(error)
  }
}
