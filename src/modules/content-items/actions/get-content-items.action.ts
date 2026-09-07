import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'

import { throwApiError, ApiError } from '@/utils/handleApiError'
import type { ContentItemListResponse } from '../interfaces/contentItemListResponse'

export interface filterProps {
  search?: string
  tags: string[]
  content_type: string[]
  progress: string[]
  day_of_week: string[]
}

export const getContentItemsAction = async (
  pageCurrent: number,
  per_page: number,
  filters?: filterProps,
): Promise<ContentItemListResponse> => {
  try {
    const params: Record<string, unknown> = { per_page: per_page, page: pageCurrent }
    if (filters?.search) params.search = filters.search
    if (filters?.tags?.length) params.tags = filters.tags.join(',')
    if (filters?.content_type?.length) params.content_type = filters.content_type.join(',')
    if (filters?.progress?.length) params.progress = filters.progress.join(',')
    if (filters?.day_of_week?.length) params.day_of_week = filters.day_of_week.join(',')

    const { data } = await stackMyHobbiesApi.get<ContentItemListResponse>('/content-items', {
      params,
    })
    if (!data.success) {
      throw new ApiError(data.message)
    }
    return data
  } catch (error: unknown) {
    throwApiError(error)
  }
}
