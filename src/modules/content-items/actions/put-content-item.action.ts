import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { convertJsonToFormData } from '@/utils/convertJsontoFormdata'
import { handleApiError } from '@/utils/handleApiError'
import type { updateContentItemDto } from '../dto/updateContentItemDto'
import type { ContentItemResponse } from '../interfaces/contentItemResponse'

export const putContentItemAction = async (payload: updateContentItemDto, id: string | number) => {
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
    console.log(payload, 'payload')
    console.log({ update: data })
    return data
  } catch (error) {
    return handleApiError(error)
  }
}
