import { stackMyHobbiesApi } from '@/api/stackMyHobbiesApi'
import { handleApiError } from '@/utils/handleApiError'

export const resendEmailVerificationAction = async (
  email: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await stackMyHobbiesApi.post<{ success: boolean; message: string }>(
      '/email/verify/resend',
      {
        email,
      },
    )
    return data
  } catch (error: unknown) {
    console.log(error)
    return handleApiError(error, 'Error al reenviar correo electronico')
  }
}
