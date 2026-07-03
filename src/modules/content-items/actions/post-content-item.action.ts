import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { throwApiError, ApiError } from '@/utils/handleApiError'
import type { createContentItemDto } from '../dto/createContentItemDto'
import { convertJsonToFormData } from '@/utils/convertJsontoFormdata'
import type { ContentItemResponse } from '../interfaces/contentItemResponse'

export const postContentItemAction = async (
  payload: createContentItemDto,
): Promise<ContentItemResponse> => {
  try {
    const formData = convertJsonToFormData(payload)
    const { data } = await stackMyHobbiesApi.post<ContentItemResponse>('/content-items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (!data.success) {
      throw new ApiError(data.message, data.errors)
    }
    return data
  } catch (error: unknown) {
    throwApiError(error)
  }
}
