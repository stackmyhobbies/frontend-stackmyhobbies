import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { handleApiError, type ErrorResponse } from '@/utils/handleApiError'
import type { createContentItemDto } from '../dto/createContentItemDto'
import { convertJsonToFormData } from '@/utils/convertJsontoFormdata'
import type { ContentItemResponse } from '../interfaces/contentItemResponse'

export const postContentItemAction = async (
  payload: createContentItemDto,
): Promise<ContentItemResponse | ErrorResponse> => {
  try {
    const formData = convertJsonToFormData(payload)
    const { data } = await stackMyHobbiesApi.post<ContentItemResponse>('/content-items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(payload, 'payload')
    console.log({ createResponse: data })
    return data
  } catch (error: unknown) {
    console.log('error')
    return handleApiError(error)
  }
}
