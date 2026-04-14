import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { handleApiError } from '@/utils/handleApiError'
import type { AuthResponse } from '../interfaces/auth.response'

export const ResetPasswordAction = async (
  token: string,
  email: string,
  password: string,
  password_confirmation: string,
): Promise<any> => {
  try {
    const { data } = await stackMyHobbiesApi.post<AuthResponse>('/auth/reset-password', {
      token,
      email,
      password,
      password_confirmation,
    })
    console.log({ data }, 'Deberia llegar aqui')
    return data
  } catch (error: unknown) {
    console.log(error)
    return handleApiError(error, 'Error al restablecer contraseña')
  }
}
