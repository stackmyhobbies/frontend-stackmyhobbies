import axios from 'axios'
import { handleApiError } from '@/utils/handleApiError'

/**
 * Reenvía el correo de verificación al usuario.
 *
 * Endpoint público — NO debe enviar token de autenticación.
 *
 * stackMyHobbiesApi inyecta automáticamente el token de localStorage
 * en todas las peticiones, lo que provoca un error 401 "No autenticado"
 * cuando el usuario tiene un token viejo/expirado y necesita reenviar
 * la verificación. Por eso usamos una instancia limpia de axios.
 */
export const resendEmailVerificationAction = async (
  email: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await axios.post<{ success: boolean; message: string }>(
      `${import.meta.env.VITE_STACKMYHOBBIES_BASE_URL}/email/verify/resend`,
      { email },
    )
    return data
  } catch (error: unknown) {
    return handleApiError(error, 'Error al reenviar correo electronico')
  }
}
