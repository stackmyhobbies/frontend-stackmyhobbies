<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

//** Queries **//
import { useGetContentTypesQuery } from '@content-queries/useGetContentTypesQuery'
import { useProgressStatusesQuery } from '@content-queries/useGetProgressStatusesQuery'
import { useGetTagsQuery } from '@content-queries/useGetTagsQuery'

/** components */
import AppDatePicker from '@shared-components/AppDatePicker.vue'
import AppInput from '@shared-components/AppInput.vue'
import AppSelect from '@shared-components/AppSelect.vue'
import AppRating from '@shared-components/AppRating.vue'

/** Composables  */
import { useContentTypeCalculations } from '../composable/useContentTypeCalculations'
import { useTagsManager } from '../composable/useTagsManager'
import { useImagePreview } from '../composable/useImagePreview'
import { useFormContentItem } from '../composable/useFormContentItem'
import AppSelectComboBox from '@/shared/components/AppSelectComboBox.vue'

/** Enum */
import { DayOfWeekValues, DayOfWeek } from '@/modules/content-items/enum/dayOfWeek.enum'
import type { Hobby, ProgressStatus } from '../interfaces/contentItemListResponse'
import IndentitySection from './SectionsForm/IndentitySection.vue'
import ProgressMetricsSection from './SectionsForm/ProgressMetricsSection.vue'
import EvaluationSection from './SectionsForm/EvaluationSection.vue'

import { useThemeStore } from '@/stores/theme'
import { useGetContentItemQuery } from '../queries/useGetContentItemQuery'

enum actionform {
  create = 'create',
  update = 'edit',
}

const props = defineProps<{
  action: actionform | string
  idOrSlug?: string | number
  contentItem?: Hobby
}>()

const { data } = useGetContentTypesQuery()
const { data: progressStatuses } = useProgressStatusesQuery()
const { data: data_tags } = useGetTagsQuery()
const { isLightTheme } = useThemeStore()
const { t } = useI18n({ useScope: 'global' })

// 1. Definimos la lógica de activación
const isUpdating = computed(() => props.action === 'update')
const hasId = computed(() => !!props.idOrSlug && props.idOrSlug.toString() !== '')

// 2. Solo habilitamos si es edición Y tiene un ID válido
const canFetch = computed(() => isUpdating.value && hasId.value)

// 3. Pasamos canFetch como opción 'enabled'
const { data: contentItemData, isPlaceholderData } = useGetContentItemQuery(
  () => props.idOrSlug?.toString() ?? '',
  { enabled: canFetch }, // <-- Pasamos el booleano reactivo aquí
)
console.log({ contentItemDataShow: contentItemData.value })

const {
  handleSubmit,
  errors,
  values,
  defineField,
  setFieldValue,
  resetForm,
  setErrors,
  onSubmit,
  isResetting,
} = useFormContentItem(computed(() => contentItemData.value))

const [title, titleAttrs] = defineField('title', { validateOnModelUpdate: true })
const [description, descriptionAttrs] = defineField('description')
const [notes, notesAttrs] = defineField('notes')
const [content_type_id, content_type_idAttrs] = defineField('content_type_id')
const [progress_status_id, progress_status_idAttrs] = defineField('progress_status_id')
const [current_progress, current_progressAttrs] = defineField('current_progress')
const [total_progress, total_progressAttrs] = defineField('total_progress')
const [progress_unit, progress_unitAttrs] = defineField('progress_unit')
const [segment_type, segment_typeAttrs] = defineField('segment_type')
const [segment_number, segment_numberAttrs] = defineField('segment_number')
const [segment_subtype, segment_subtypeAttrs] = defineField('segment_subtype')
const [segment_subnumber, segment_subnumberAttrs] = defineField('segment_subnumber')
const [viewing_started_at, viewing_started_atAttrs] = defineField('viewing_started_at')
const [viewing_finished_at, viewing_finished_atAttrs] = defineField('viewing_finished_at')
const [aired_from, aired_fromAttrs] = defineField('aired_from')
const [aired_to, aired_toAttrs] = defineField('aired_to')
const [rating, ratingAttrs] = defineField('rating')
const [tags, tagsAttrs] = defineField('tags')
const [day_of_week, day_of_weekAttrs] = defineField('day_of_week')
const [image, imageAttrs] = defineField('image')

const {
  progressPercent,
  allowedSegmentType,
  allowedSubsegmentType,
  allowedUnits,
  selectedTypeData,
} = useContentTypeCalculations(data, values)

const selectedProgressStatus = computed<ProgressStatus | null>(() => {
  if (!progressStatuses.value || !values.progress_status_id) return null
  return progressStatuses.value.find((t) => t.id === Number(values.progress_status_id)) ?? null
})

const AIRED_STATUSES = ['en emisión', 'finalizado', 'abandonado']
const CONTENT_TYPE_HOBBY = ['anime', 'serie']

const showAiredFields = computed(
  () =>
    AIRED_STATUSES.includes(selectedProgressStatus.value?.name ?? '') &&
    CONTENT_TYPE_HOBBY.includes(selectedTypeData.value?.name ?? ''),
)

const { previewUrl, handleImageUpload } = useImagePreview(
  computed(() => values.image),
  setFieldValue as (field: string, value: unknown) => void,
)

const advancedSegmentSubtypes = ref<boolean>(false)

watch(content_type_id, () => {
  if (isResetting.value) return
  setFieldValue('segment_type', undefined)
  setFieldValue('segment_subtype', null)
})

const crossFieldError = computed(() => {
  const c = Number(current_progress.value)
  const t = Number(total_progress.value)
  return !isNaN(c) && !isNaN(t) && c > t
    ? 'El progreso actual no puede ser mayor al total'
    : undefined
})
</script>

<template>
  <div class="min-h-screen p-4 md:p-6 flex justify-center items-start text-gray-300">
    <div class="w-full rounded-3xl p-1">
      <div v-if="isPlaceholderData || (!contentItemData && isUpdating)" class="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
        <div class="lg:col-span-5 flex flex-col gap-4">
          <div class="skeleton aspect-[3/4] rounded-2xl"></div>
        </div>
        <div class="lg:col-span-7 flex flex-col gap-y-6">
          <div class="space-y-4">
            <div class="skeleton h-10 rounded-xl"></div>
            <div class="skeleton h-10 rounded-xl"></div>
            <div class="skeleton h-24 rounded-xl"></div>
          </div>
          <div class="space-y-4">
            <div class="skeleton h-10 rounded-xl"></div>
            <div class="skeleton h-10 rounded-xl"></div>
          </div>
          <div class="space-y-4">
            <div class="skeleton h-10 rounded-xl"></div>
            <div class="skeleton h-24 rounded-xl"></div>
          </div>
        </div>
      </div>
      <form
        v-else
        autocomplete="off"
        @submit="onSubmit"
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10"
      >
        <div class="lg:col-span-5 flex flex-col gap-4">
          <label
            class="relative flex flex-col items-center justify-center w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-cyan-500/20 bg-[#1a1c23] hover:bg-white/5 transition-all cursor-pointer group overflow-hidden"
          >
            <template v-if="!previewUrl">
              <div class="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  class="w-16 h-16 mb-4 text-cyan-500/50 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM3 18V6h5v12H3zm16 0h-5V6h5v12z"
                  />
                </svg>
                <p class="text-lg font-medium text-cyan-500/70">Upload Cover Image</p>
              </div>
            </template>
            <img
              v-else
              :src="previewUrl"
              class="w-full h-full object-cover"
            />
            <input
              type="file"
              class="hidden"
              @change="handleImageUpload"
              name="image"
            />
          </label>
        </div>

        <div class="lg:col-span-7 flex flex-col gap-y-6">
          <IndentitySection
            v-model:title="title"
            v-model:content_type_id="content_type_id"
            v-model:segment_type="segment_type"
            v-model:segment_number="segment_number"
            v-model:advanced-segment-subtypes="advancedSegmentSubtypes"
            v-model:segment_subtype="segment_subtype"
            v-model:segment_subnumber="segment_subnumber"
            v-model:description="description"
            :titleAttrs="titleAttrs"
            :errors_title="errors.title"
            :type="data"
            :content_type_idAttrs="content_type_idAttrs"
            :errors_content_type="errors.content_type_id"
            :allowedSegmentType="allowedSegmentType"
            :segment_typeAttrs="segment_typeAttrs"
            :errors_type="errors.segment_type"
            :segment_numberAttrs="segment_numberAttrs"
            :errors_segment_number="errors.segment_number"
            :allowedSubsegmentType="allowedSubsegmentType"
            :segment_subtypeAttrs="segment_subtypeAttrs"
            :errors_segment_subtype="errors.segment_subtype"
            :segment_subnumberAttrs="segment_subnumberAttrs"
            :errors_segment_subnumber="errors.segment_subnumber"
            :descriptionAttrs="descriptionAttrs"
          />

          <div
            class="collapse collapse-arrow md:collapse-open border border-gray-700 bg-white/2 rounded-2xl"
          >
            <input
              type="checkbox"
              checked
            />
            <div
              class="collapse-title text-cyan-500 font-bold uppercase tracking-widest text-sm md:pointer-events-none"
            >
              Métricas de Progreso
            </div>
            <div class="collapse-content">
              <ProgressMetricsSection
                :progressStatuses="progressStatuses"
                :selectedProgressStatus="selectedProgressStatus"
                :progressPercent="progressPercent"
                :allowedUnits="allowedUnits"
                v-model:current_progress="current_progress"
                v-model:total_progress="total_progress"
                v-model:progress_unit="progress_unit"
                v-model:day_of_week="day_of_week"
                v-model:progress_status_id="progress_status_id"
                :current_progressAttrs="current_progressAttrs"
                :progress_status_idAttrs="progress_status_idAttrs"
                :total_progressAttrs="total_progressAttrs"
                :progress_unitAttrs="progress_unitAttrs"
                :day_of_weekAttrs="day_of_weekAttrs"
                :errors="errors"
                :crossFieldError="crossFieldError"
              />
            </div>
          </div>

          <div
            class="collapse collapse-arrow md:collapse-open border border-gray-700 bg-white/2 rounded-2xl"
          >
            <input
              type="checkbox"
              checked
            />
            <div
              class="collapse-title text-cyan-500 font-bold uppercase tracking-widest text-sm md:pointer-events-none"
            >
              Evaluación y Registro
            </div>
            <div class="collapse-content">
              <EvaluationSection
                v-model:viewing_started_at="viewing_started_at"
                v-model:viewing_finished_at="viewing_finished_at"
                v-model:aired_from="aired_from"
                v-model:aired_to="aired_to"
                v-model:rating="rating"
                v-model:notes="notes"
                v-model:tags="tags"
                :viewing_started_atAttrs="viewing_started_atAttrs"
                :viewing_finished_atAttrs="viewing_finished_atAttrs"
                :aired_fromAttrs="aired_fromAttrs"
                :aired_toAttrs="aired_toAttrs"
                :ratingAttrs="ratingAttrs"
                :notesAttrs="notesAttrs"
                :tagsAttrs="tagsAttrs"
                :errors="errors"
                :showAiredFields="showAiredFields"
                :data_tags="data_tags"
              />
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-info w-full text-lg shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] mb-10"
          >
            Guardar Hobby
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* En escritorio ocultamos la flecha del colapsable ya que forzamos que esté abierto */
@media (min-width: 768px) {
  .md\:collapse-open.collapse-arrow > .collapse-title:after {
    display: none;
  }
}
</style>
