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

    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ La solicitud tardó demasiado')
      return {
        success: false,
        message: 'La solicitud tardó demasiado. Verifica tu conexión.',
        errors: {},
        data: undefined,
      }
    }

    console.error(data, '📋 error instance of axios')

    // Si el backend envía errores de validación
    if (data?.errors) {
      const firstErrorKey = Object.keys(data.errors)[0]
      const firstErrorMsg = data.message || (data.errors[firstErrorKey]?.[0] ?? axiosMessage)

      return {
        success: false,
        message: firstErrorMsg,
        errors: data.errors || {},
        data: data.data,
      }
    }

    return {
      success: false,
      message: data?.message ?? axiosMessage,
      errors: data?.errors || {},
      data: data.data,
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

export class ApiError extends Error {
  success = false
  errors?: Record<string, string | string[] | undefined>
  status?: number

  constructor(message: string, errors?: Record<string, string | string[] | undefined>, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.errors = errors
    this.status = status
  }
}

export function throwApiError(
  error: unknown,
  axiosMessage = 'Error en la solicitud',
  defaultMessage = 'Error desconocido',
): never {
  if (error instanceof ApiError) {
    throw error
  }

  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any
    const status = error.response?.status

    if (error.code === 'ECONNABORTED') {
      throw new ApiError('La solicitud tardó demasiado. Verifica tu conexión.', {}, undefined)
    }

    if (data?.errors) {
      const firstErrorKey = Object.keys(data.errors)[0]
      const message = data.message || (data.errors[firstErrorKey]?.[0] ?? axiosMessage)
      throw new ApiError(message, data.errors || {}, status)
    }

    throw new ApiError(data?.message ?? axiosMessage, data?.errors || {}, status)
  }

  if (error instanceof Error) {
    throw new ApiError(error.message || defaultMessage)
  }

  throw new ApiError(defaultMessage)
}
