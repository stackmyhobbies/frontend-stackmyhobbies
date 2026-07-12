import { computed, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Type } from '../interfaces/ContentTypeResponse'

export function useContentTypeCalculations(
  data: Ref<Type[] | undefined | null>,
  content_type_id: Ref<number | string | null | undefined>,
  current_progress: Ref<number | null | undefined>,
  total_progress: Ref<number | null | undefined>,
) {
  const { t } = useI18n({ useScope: 'global' })
  // 1. Buscamos el tipo seleccionado basado en el ID
  const selectedTypeData = computed<Type | null>(() => {
    if (!data.value || !content_type_id.value) return null
    return data.value.find((t) => t.id === Number(content_type_id.value)) ?? null
  })

  // 2. Mapeo de propiedades del tipo seleccionado
  const allowedSegmentType = computed(
    () =>
      selectedTypeData.value?.allowed_segment_types.map((s) => ({
        id: s,
        name: t(`contentItem.segmentType.${s}`),
      })) ?? [],
  )
  const allowedSubsegmentType = computed(() =>
    selectedTypeData.value?.allowed_subsegment_types.map((s) => ({
      id: s,
      name: t(`contentItem.subSegmentType.${s}`),
    })),
  )
  const allowedUnits = computed(
    () =>
      selectedTypeData.value?.allowed_units.map((s) => ({
        id: s,
        name: t(`contentItem.unit.${s}`),
      })) ?? [],
  )

  // 3. Cálculo de progreso (Lógica de negocio)
  const progressPercent = computed<number>(() => {
    const total = total_progress.value
    if (!total || total === 0) return 0
    const current = current_progress.value ?? 0
    return Math.round((current / total) * 100)
  })

  return {
    selectedTypeData,
    allowedSegmentType,
    allowedSubsegmentType,
    allowedUnits,
    progressPercent,
  }
}
