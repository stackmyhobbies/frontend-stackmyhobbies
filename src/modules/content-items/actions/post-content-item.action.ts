import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { handleApiError, type ErrorResponse } from '@/utils/handleApiError'
import type { CreateContentItemDto } from '../dto/CreateContentItemDto'
import type { Hobby } from '../interfaces/contentItemListResponse'
import { convertJsonToFormData } from '@/utils/convertJsontoFormdata'

export const postContentItemAction = async (
  payload: CreateContentItemDto,
): Promise<any | ErrorResponse> => {
  try {
    const formData = convertJsonToFormData(payload)
    const { data } = await stackMyHobbiesApi.post<any>('/content-items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(payload, 'payload')
    console.log({ create: data })
    return data
  } catch (error: unknown) {
    console.log('error')
    return handleApiError(error)
  }
}
