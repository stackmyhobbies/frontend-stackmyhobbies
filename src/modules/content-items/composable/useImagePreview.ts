import { ref, watch, onUnmounted, type Ref } from 'vue'

export function useImagePreview<TField extends string>(
  imageValue: Ref<unknown>, // Referencia reactiva al archivo
  setFieldValue: (field: TField, value: unknown) => void,
  fieldName: TField = 'image' as TField,
) {
  const previewUrl = ref<string | null>(null)

  // Función para limpiar la URL de memoria
  const cleanup = () => {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = null
    }
  }

  // Observamos cambios en el archivo para actualizar la preview
  watch(
    () => imageValue.value,
    (newFile) => {
      cleanup() // Limpiamos la anterior siempre

      if (newFile instanceof File) {
        previewUrl.value = URL.createObjectURL(newFile)
      }
    },
    { immediate: true },
  )

  // Manejador del input file
  const handleImageUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      setFieldValue(fieldName, file)
    }
  }

  // Limpieza automática al desmontar el componente
  onUnmounted(() => cleanup())

  return {
    previewUrl,
    handleImageUpload,
  }
}
