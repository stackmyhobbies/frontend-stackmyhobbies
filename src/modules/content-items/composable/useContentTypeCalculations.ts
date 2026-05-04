import { computed, type Ref } from 'vue'
import type { Type } from '../interfaces/ContentTypeResponse'

interface FormValues {
  content_type_id?: number | string | null
  total_progress?: number | null
  current_progress?: number | null
}

export function useContentTypeCalculations(
  data: Ref<Type[] | undefined | null>,
  values: FormValues,
) {
  // 1. Buscamos el tipo seleccionado basado en el ID
  const selectedTypeData = computed<Type | null>(() => {
    if (!data.value || !values.content_type_id) return null
    return data.value.find((t) => t.id === Number(values.content_type_id)) ?? null
  })

  // 2. Mapeo de propiedades del tipo seleccionado
  const allowedSegmentType = computed(
    () => selectedTypeData.value?.allowed_segment_types.map((s) => ({ id: s, name: s })) ?? [],
  )
  const allowedSubsegmentType = computed(() =>
    selectedTypeData.value?.allowed_subsegment_types.map((s) => ({ id: s, name: s })),
  )
  const allowedUnits = computed(
    () => selectedTypeData.value?.allowed_units.map((s) => ({ id: s, name: s })) ?? [],
  )

  // 3. Cálculo de progreso (Lógica de negocio)
  const progressPercent = computed<number>(() => {
    if (!values.total_progress || values.total_progress === 0) return 0
    const current = values.current_progress ?? 0
    return Math.round((current / values.total_progress) * 100)
  })

  return {
    selectedTypeData,
    allowedSegmentType,
    allowedSubsegmentType,
    allowedUnits,
    progressPercent,
  }
}
