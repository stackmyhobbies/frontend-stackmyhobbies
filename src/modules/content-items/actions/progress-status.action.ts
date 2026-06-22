import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { throwApiError, ApiError } from '@/utils/handleApiError'
import type { ProgressStatusResponse } from '../interfaces/progressStatusResponse'

/**
 *
 *  TODO IMPLEMENTAR EN EL BACKEN LOS COLORES
 *
 */
export const progressStatusAction = async (): Promise<ProgressStatusResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.get<ProgressStatusResponse>('progress-statuses')
    if (!data.success) {
      throw new ApiError(data.message)
    }
    return data
  } catch (error: unknown) {
    throwApiError(error)
  }
}
