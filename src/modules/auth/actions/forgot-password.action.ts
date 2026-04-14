import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { handleApiError } from '@/utils/handleApiError'
import type { AuthResponse } from '../interfaces/auth.response'

export const ForgotPasswordAction = async (email: string): Promise<AuthResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.post<AuthResponse>('/auth/forgot-password', {
      email: email,
    })
    console.log({ data }, 'Aqui revisando por que success no carga el toast')
    return data
  } catch (error: unknown) {
    return handleApiError(error, 'Error al enviar email de recuperación')
  }
}
