import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'

import { throwApiError, ApiError } from '@/utils/handleApiError'
import type { ContentTypeResponse } from '../interfaces/ContentTypeResponse'

export const contentTypeAction = async (): Promise<ContentTypeResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.get<ContentTypeResponse>('/content-types')
    if (!data.success) {
      throw new ApiError(data.message)
    }
    return data
  } catch (error: unknown) {
    throwApiError(error)
  }
}
