import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from '@/shared/composables/useToast'
import { usePostContentItemMutation } from '../mutations/usePostContentItemMutation'
import { CreateContentItem } from '../schemas/content-item.schema'
import { ref, watch, nextTick } from 'vue'

export const useFormContentItem = (initialData?: any) => {
  const toast = useToast()
  const { mutate } = usePostContentItemMutation()

  const formHobby = {
    content_type_id: null,
    current_progress: 0,
    description: '',
    notes: '',
    progress_status_id: 1,
    rating: 1.0,
    segment_number: 0,
    segment_subnumber: 0,
    segment_type: undefined,
    segment_subtype: null,
    tags: [],
    total_progress: 0,
    viewing_started_at: '',
    viewing_finished_at: null,
    aired_from: null,
    aired_to: null,
  }

  const { handleSubmit, errors, values, defineField, setFieldValue, resetForm, setErrors } =
    useForm({
      validationSchema: toTypedSchema(CreateContentItem),
      validateOnMount: false,
      initialValues: formHobby,
    })

  const isResetting = ref(false)

  watch(
    () => initialData?.value,
    (newData) => {
      if (!newData) return
      const hobbyData = newData.data || newData
      isResetting.value = true
      resetForm({
        values: {
          title: hobbyData.title || '',
          description: hobbyData.description || '',
          notes: hobbyData.notes || '',
          content_type_id: hobbyData.type?.id || hobbyData.content_type_id || null,
          progress_status_id: hobbyData.progress_status?.id || hobbyData.progress_status_id || 1,
          current_progress: hobbyData.current_progress || 0,
          total_progress: hobbyData.total_progress || 0,
          progress_unit: hobbyData.progress_unit || '',
          segment_type: hobbyData.segment_type || undefined,
          segment_number: hobbyData.segment_number || 0,
          segment_subtype: hobbyData.segment_subtype || null,
          segment_subnumber: hobbyData.segment_subnumber || 0,
          viewing_started_at: hobbyData.viewing_started_at
            ? hobbyData.viewing_started_at.toString()
            : '',
          viewing_finished_at: hobbyData.viewing_finished_at || null,
          aired_from: hobbyData.aired_from || null,
          aired_to: hobbyData.aired_to || null,
          rating: hobbyData.rating || 1.0,
          day_of_week: hobbyData.day_of_week || null,
          tags: hobbyData.tags || [],
        },
      })
       // nextTick para que el watch de content_type_id en el componente ya haya corrido
       nextTick(() => { isResetting.value = false })
    },
    { immediate: true },
  )

  const formatBackendErrors = (backendErrors: Record<string, string | undefined>) => {
    const formatted: Record<string, string> = {}

    for (const key in backendErrors) {
      const message = backendErrors[key]

      if (message && message.includes('Ya existe un contenido')) {
        formatted[key] = 'Este contenido ya existe'
      } else if (message) {
        formatted[key] = message
      }
    }

    return formatted
  }

  const onSubmit = handleSubmit((formValues) => {
    console.log('Formulario válido:', formValues)
    console.log('Deberia enviar un submit')
    const tags = formValues.tags.map((tag) => tag.id)

    mutate(
      { ...formValues, tags },
      {
        onSuccess: (data) => {
          if (!data.success && data.errors) {
            const cleanErrors = formatBackendErrors(data.errors)
            setErrors(cleanErrors)
            toast.error('Error al crear el hobby')
            return
          }

          toast.success('hobby creado exitosamente')
        },
        onError: () => {
          toast.error('Error al crear el hobby')
        },
      },
    )
  })

  return {
    handleSubmit,
    errors,
    values,
    defineField,
    setFieldValue,
    resetForm,
    setErrors,
    onSubmit,
    isResetting,
  }
}
