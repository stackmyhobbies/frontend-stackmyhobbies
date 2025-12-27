import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import type { AuthResponse } from '../interfaces/auth.response'
import { handleApiError } from '@/utils/handleApiError'

export const signInAction = async (login: string, password: string): Promise<AuthResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.post<AuthResponse>('/auth/sign-in', {
      login: login,
      password: password,
    })

    return data
  } catch (error: unknown) {
    return handleApiError(error, 'Error al iniciar sesión')
  }
}
