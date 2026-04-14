import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'

import { handleApiError, type ErrorResponse } from '@/utils/handleApiError'
import type { ContentTypeResponse } from '../interfaces/ContentTypeResponse'

export const contentTypeAction = async (): Promise<ContentTypeResponse | ErrorResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.get<ContentTypeResponse>('/content-types')

    return data
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
