import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from '@/shared/composables/useToast'
import { usePostContentItemMutation } from '../mutations/usePostContentItemMutation'
import { usePutContentItemMutation } from '../mutations/usePutContentItemMutation'
import { CreateContentItem } from '../schemas/content-item.schema'
import { ref, watch, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useFormContentItem = (initialData?: any) => {
  const toast = useToast()
  const { mutate: createMutate } = usePostContentItemMutation()
  const { mutate: updateMutate } = usePutContentItemMutation()

  const contentItemId = computed(() => {
    const data = initialData?.value
    if (!data) return null
    const hobbyData = data.data || data
    return hobbyData.id ?? null
  })
  const isEdit = computed(() => !!contentItemId.value)

  const formHobby = {
    content_type_id: null,
    current_progress: 0,
    description: '',
    notes: '',
    progress_status_id: 1,
    rating: 1.0,
    segment_number: 0,
    segment_subnumber: null,
    segment_type: undefined,
    segment_subtype: null,
    tags: [],
    total_progress: 0,
    viewing_started_at: '',
    viewing_finished_at: null,
    aired_from: null,
    aired_to: null,
    detail_url: '',
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

      console.log()
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
          segment_subnumber: hobbyData.segment_subnumber ?? undefined,
          viewing_started_at: hobbyData.viewing_started_at
            ? hobbyData.viewing_started_at.toString()
            : '',
          viewing_finished_at: hobbyData.viewing_finished_at || null,
          aired_from: hobbyData.aired_from || null,
          aired_to: hobbyData.aired_to || null,
          rating: Number(hobbyData.rating) >= 1.0 ? Number(hobbyData.rating) : 1.0,
          day_of_week: hobbyData.day_of_week || null,
          tags: hobbyData.tags || [],
        },
      })
      // nextTick para que el watch de content_type_id en el componente ya haya corrido
      nextTick(() => {
        isResetting.value = false
      })
    },
    { immediate: true },
  )

  const formatBackendErrors = (backendErrors: Record<string, string | string[] | undefined>) => {
    const formatted: Record<string, string> = {}

    for (const key in backendErrors) {
      const raw = backendErrors[key]
      const message = Array.isArray(raw) ? raw[0] : raw

      if (message && message.includes('Ya existe un contenido')) {
        formatted[key] = 'Este contenido ya existe'
      } else if (message) {
        formatted[key] = message
      }
    }

    return formatted
  }

  const router = useRouter()

  const onSubmit = handleSubmit((formValues) => {
    console.log('Formulario válido:', formValues)
    console.log('Deberia enviar un submit')
    const tags = formValues.tags.map((tag) => tag.id)
    const rating = Number(formValues.rating).toFixed(1)

    const successMessage = isEdit.value
      ? 'hobby actualizado exitosamente'
      : 'hobby creado exitosamente'
    const errorMessage = isEdit.value ? 'Error al actualizar el hobby' : 'Error al crear el hobby'

    const mutationFn = isEdit.value
      ? () =>
          updateMutate(
            {
              payload: { ...formValues, tags, rating },
              id: contentItemId.value!,
            },
            {
              onSuccess: (data) => {
                console.log('Editado con exito')
                if (!data.success && data.errors) {
                  const cleanErrors = formatBackendErrors(data.errors)
                  setErrors(cleanErrors)
                  toast.error(errorMessage)
                  return
                }
                toast.success(successMessage)
                const newSlug = (data.data as any)?.slug
                if (newSlug) {
                  router.replace({ name: 'content-item-edit', params: { slug: newSlug } })
                }
                router.push({ name: 'content-item-list' })
              },
              onError: () => {
                toast.error(errorMessage)
              },
            },
          )
      : () =>
          createMutate(
            { ...formValues, tags, rating },
            {
              onSuccess: (data) => {
                if (!data.success && data.errors) {
                  const cleanErrors = formatBackendErrors(data.errors)
                  setErrors(cleanErrors)
                  toast.error(errorMessage)
                  return
                }
                toast.success(successMessage)
                router.push({ name: 'content-item-list' })
              },
              onError: () => {
                toast.error(errorMessage)
              },
            },
          )

    mutationFn()
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
    isEdit,
  }
}
