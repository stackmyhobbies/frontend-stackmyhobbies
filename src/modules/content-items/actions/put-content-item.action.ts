import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { convertJsonToFormData } from '@/utils/convertJsontoFormdata'
import { throwApiError, ApiError } from '@/utils/handleApiError'
import type { updateContentItemDto } from '../dto/updateContentItemDto'
import type { ContentItemResponse } from '../interfaces/contentItemResponse'

export const putContentItemAction = async (payload: updateContentItemDto, id: string | number): Promise<ContentItemResponse> => {
  try {
    const formData = convertJsonToFormData({ ...payload, _method: 'PUT' })
    const { data } = await stackMyHobbiesApi.post<ContentItemResponse>(
      `/content-items/${id}/edit`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    if (!data.success) {
      throw new ApiError(data.message, data.errors)
    }
    return data
  } catch (error) {
    throwApiError(error)
  }
}
