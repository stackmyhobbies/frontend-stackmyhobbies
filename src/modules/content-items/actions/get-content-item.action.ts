import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'

import { handleApiError, type ErrorResponse } from '@/utils/handleApiError'
import type { ContentItemListResponse } from '../interfaces/contentItemListResponse'
import type { ContentItemResponse } from '../interfaces/contentItemResponse'

export const getContentItemAction = async (
  slug: string,
): Promise<ContentItemResponse | ErrorResponse> => {
  try {
    console.log('get content item', slug)
    const { data } = await stackMyHobbiesApi.get<ContentItemResponse>(`/content-items/${slug}`)
    console.log(data, 'getContentItem.show')
    return data
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
