export const convertJsonToFormData = (payload: Record<string, any>): FormData => {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    // Si el valor es un array (por ejemplo, para tags o múltiples archivos)
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item))
    }
    // Si el valor es un archivo o blob
    else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value)
    }
    // Para el resto de valores que no sean nulos
    else if (value !== null && value !== undefined) {
      formData.append(key, String(value))
    }
  })

  return formData
}
