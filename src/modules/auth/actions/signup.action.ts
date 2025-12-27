import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import type { AuthRegister } from '../interfaces/auth-register.interface'
import type { AuthResponse } from '../interfaces/auth.response'
import { handleApiError } from '@/utils/handleApiError'

export const signUpAction = async (userRegister: AuthRegister): Promise<AuthResponse> => {
  try {
    const { data } = await stackMyHobbiesApi.post<AuthResponse>('/auth/sign-up', {
      ...userRegister,
    })

    console.log(data)
    return data
  } catch (error: unknown) {
    console.log(error)
    return handleApiError(error, 'Error al registrar')
  }
}
