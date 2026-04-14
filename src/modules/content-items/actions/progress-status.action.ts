import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { handleApiError, type ErrorResponse } from '@/utils/handleApiError'
import type { ProgressStatusResponse } from '../interfaces/progressStatusResponse'

/**
 *
 *  TODO IMPLEMENTAR EN EL BACKEN LOS COLORES
 *
 */
export const progressStatusAction = async (): Promise<ProgressStatusResponse | ErrorResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.get<ProgressStatusResponse>('progress-statuses')
    return data
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
