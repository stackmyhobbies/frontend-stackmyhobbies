import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'

import { handleApiError, type ErrorResponse } from '@/utils/handleApiError'
import type { ContentItemListResponse } from '../interfaces/contentItemListResponse'

/**
 *  TODO IMEPLEMENTAR PAGINACION
 * */
export const getContentItemsAction = async (): Promise<ContentItemListResponse | ErrorResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.get<ContentItemListResponse>(
      '/content-items?per_page=9&page=1',
    )
    console.log(data, 'ContentItem data')
    return data
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
