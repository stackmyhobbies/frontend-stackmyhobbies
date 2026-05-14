import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import type { AuthResponse } from '../interfaces/auth.response'
import { handleApiError } from '@/utils/handleApiError'

export const checkAuthStatusAction = async (): Promise<AuthResponse | null> => {
  try {
    const { data } = await stackMyHobbiesApi.get<AuthResponse>('/auth/check-session')

    return data
  } catch (error: unknown) {
    console.log('Error interno del servidor')
    return null
    // return handleApiError(error)
  }
}
