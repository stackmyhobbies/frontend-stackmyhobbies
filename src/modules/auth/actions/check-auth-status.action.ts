import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import type { AuthResponse } from '../interfaces/auth.response'
import { handleApiError } from '@/utils/handleApiError'

export const checkAuthStatusAction = async (): Promise<AuthResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.get<AuthResponse>('/auth/check-session')
    console.log({ 'check status': data })
    return data
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
