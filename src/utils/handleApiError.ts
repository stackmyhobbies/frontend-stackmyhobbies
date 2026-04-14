import axios from 'axios'

export interface ErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
  data?: any // 👈 opcional: lista de errores campo a campo
}

export function handleApiError(
  error: unknown,
  axiosMessage = 'Error en la solicitud',
  defaultMessage = 'Error desconocido',
): ErrorResponse {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any

    console.error(data, '📋 error instance of axios')

    // Si el backend envía errores de validación
    if (data?.errors) {
      const firstErrorKey = Object.keys(data.errors)[0]
      const firstErrorMsg = data.message || (data.errors[firstErrorKey]?.[0] ?? axiosMessage)

      return {
        success: false,
        message: firstErrorMsg, // muestra el primer error legible
        errors: data.errors || {},
        data: data.data || [],
      }
    }

    return {
      success: false,
      message: data?.message ?? axiosMessage,
      errors: data?.errors || {},
      data: data.data || [],
    }
  }

  if (error instanceof Error) {
    console.error(error, 'error instance of Error')
    return {
      success: false,
      message: error.message || defaultMessage,
    }
  }

  return { success: false, message: defaultMessage }
}
