<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
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

/** schema */
import { CreateContentItem } from '../schemas/content-item.schema'

/** Composables  */
import { useContentTypeCalculations } from '../composable/useContentTypeCalculations'
import { useTagsManager } from '../composable/useTagsManager'
import { useImagePreview } from '../composable/useImagePreview'
import AppSelectComboBox from '@/shared/components/AppSelectComboBox.vue'

/** Enum */
import { DayOfWeekValues, DayOfWeek } from '@/modules/content-items/enum/dayOfWeek.enum'
import type { ProgressStatus } from '../interfaces/contentItemListResponse'
import IndentitySection from './SectionsForm/IndentitySection.vue'
import { usePostContentItemMutation } from '../mutations/usePostContentItemMutation'

import { useToast } from '@/shared/composables/useToast'
import { useThemeStore } from '@/stores/theme'

const { data } = useGetContentTypesQuery()
const { data: progressStatuses } = useProgressStatusesQuery()
const { data: data_tags } = useGetTagsQuery()
const { mutate } = usePostContentItemMutation()
const { isLightTheme } = useThemeStore()
const { t } = useI18n({ useScope: 'global' })

console.log({ isLightTheme })

console.log({ progressStatuses: data_tags })

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

const toast = useToast()

const AIRED_STATUSES = ['en emisión', 'finalizado', 'abandonado']
const CONTENT_TYPE_HOBBY = ['anime', 'serie']

const { handleSubmit, errors, values, defineField, setFieldValue, resetForm, setErrors } = useForm({
  validationSchema: toTypedSchema(CreateContentItem),
  validateOnMount: false,
  initialValues: formHobby,
})

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

const showAiredFields = computed(
  () =>
    AIRED_STATUSES.includes(selectedProgressStatus.value?.name ?? '') &&
    CONTENT_TYPE_HOBBY.includes(selectedTypeData.value?.name ?? ''),
)
// const { tagInput, addTag, removeTag } = useTagsManager(tags, setFieldValue as (field: string, value: unknown) => void)

const { previewUrl, handleImageUpload } = useImagePreview(
  computed(() => values.image),
  setFieldValue as (field: string, value: unknown) => void,
)

const advancedSegmentSubtypes = ref<boolean>(false)
console.log({ advancedSegmentSubtypes })
watch(content_type_id, () => {
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

const formatBackendErrors = (backendErrors: Record<string, string>) => {
  const formatted: Record<string, string> = {}

  for (const key in backendErrors) {
    const message = backendErrors[key]

    // Si el mensaje es el específico de duplicado, usamos nuestra traducción
    if (message.includes('Ya existe un contenido')) {
      formatted[key] = 'Este contenido ya existe'
    } else {
      formatted[key] = message // Dejamos el error original para otros casos
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
          setErrors(cleanErrors) // Vee-Validate ahora recibe tu versión corta/traducida
          toast.error('Error al crear el hobby')
          return
        }

        // Si todo salió bien
        toast.success('hobby creado exitosamente')
        // resetForm()
      },
      onError: () => {
        toast.error('Error al crear el hobby')
      },
    },
  )
})
</script>

<template>
  <div class="min-h-screen p-4 md:p-6 flex justify-center items-start text-gray-300">
    <div class="w-full rounded-3xl p-1">
      <form
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
              <div class="grid grid-cols-12 gap-4 pt-2">
                <div class="col-span-12 md:col-span-6">
                  <AppSelect
                    select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
                    select-container-option-class="bg-cyan-500/10 text-cyan-400"
                    selected-text="text-cyan-500"
                    label="Progress Status"
                    :items="progressStatuses || []"
                    labelFor="progress_status_id"
                    v-model="progress_status_id"
                    v-bind="progress_status_idAttrs"
                    :error="errors.progress_status_id"
                  >
                  </AppSelect>
                </div>
                <!-- Day of the week for emission-->
                <div
                  v-if="
                    selectedProgressStatus?.name === 'en emisión' ||
                    selectedProgressStatus?.name === 'viendo'
                  "
                  class="col-span-12 md:col-span-6"
                >
                  <AppSelect
                    select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
                    select-container-option-class="bg-cyan-500/10 text-cyan-400"
                    selected-text="text-cyan-500"
                    :label="t('contentItem.form_content_item.release_date')"
                    :items="
                      Object.entries(DayOfWeekValues).map(([key, value]) => ({
                        id: value,
                        name: t(`common.days.${value}`),
                      }))
                    "
                    labelFor="day_of_week_id"
                    v-model="day_of_week"
                    v-bind="day_of_weekAttrs"
                    :error="errors.day_of_week"
                    :placeholder="
                      t('contentItem.form_content_item.select_placeholder_release_date')
                    "
                  ></AppSelect>
                </div>

                <!-- Current progress of the project -->
                <div class="col-span-12 md:col-span-6">
                  <AppInput
                    input-class="bg-base-100 focus:outline-cyan-500"
                    label="Current Progress"
                    type="number"
                    labelFor="current_progress"
                    v-model="current_progress"
                    v-bind="current_progressAttrs"
                    :error="errors.current_progress || crossFieldError"
                  />
                </div>
                <div class="col-span-12 md:col-span-6">
                  <AppInput
                    input-class="bg-base-100 focus:outline-cyan-500"
                    label="Total Progress"
                    type="number"
                    labelFor="total_progress"
                    v-model="total_progress"
                    v-bind="total_progressAttrs"
                    :error="errors.total_progress"
                  />
                </div>
                <div class="col-span-12 md:col-span-6">
                  <AppSelect
                    label="Progress Unit"
                    select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
                    select-container-option-class="bg-cyan-500/10 text-cyan-400"
                    selected-text="text-cyan-500"
                    :items="allowedUnits"
                    labelFor="progress_unit"
                    v-model="progress_unit"
                    v-bind="progress_unitAttrs"
                    :error="errors.progress_unit"
                  >
                    <option
                      v-for="unit in allowedUnits"
                      :key="unit.id"
                      :value="unit"
                    >
                      {{ unit }}
                    </option>
                  </AppSelect>
                </div>
                <div class="col-span-12 flex items-center gap-3 mt-2">
                  <progress
                    class="progress progress-info flex-1 h-2"
                    :value="progressPercent"
                    max="100"
                  ></progress>
                  <span class="text-cyan-500 font-mono font-bold text-sm whitespace-nowrap">
                    {{ progressPercent }}% Complete
                  </span>
                </div>
              </div>
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
              <div class="grid grid-cols-12 gap-4 pt-2">
                <div class="col-span-12 md:col-span-6">
                  <AppDatePicker
                    id="viewing_started_at"
                    label="Fecha inicio visionado"
                    v-model="viewing_started_at"
                    v-bind="viewing_started_atAttrs"
                    :error="errors.viewing_started_at"
                  />
                </div>
                <div class="col-span-12 md:col-span-6">
                  <AppDatePicker
                    id="viewing_finished_at"
                    label="Fecha fin visionado"
                    v-model="viewing_finished_at"
                    v-bind="viewing_finished_atAttrs"
                    :error="errors.viewing_finished_at"
                  />
                </div>
                <div
                  v-if="showAiredFields"
                  class="col-span-12 grid grid-cols-2 gap-4"
                >
                  <AppDatePicker
                    id="aired_from"
                    label="Emisión desde"
                    v-model="aired_from"
                    v-bind="aired_fromAttrs"
                    :error="errors.aired_from"
                  />
                  <AppDatePicker
                    id="aired_to"
                    label="Emisión hasta"
                    v-model="aired_to"
                    v-bind="aired_toAttrs"
                    :error="errors.aired_to"
                  />
                </div>
                <div class="col-span-12 md:col-span-4">
                  <AppRating
                    id="rating"
                    label="Rating"
                    v-model="rating"
                    v-bind="ratingAttrs"
                    name="rating"
                  />
                </div>
                <div class="col-span-12">
                  <label class="label"
                    ><span class="label-text text-base-content/60">Notes</span></label
                  >
                  <textarea
                    v-model="notes"
                    v-bind="notesAttrs"
                    class="textarea textarea-bordered w-full bg-base-100 rounded-btn h-[60px] min-h-0 resize-none focus-within:border-cyan-500 focus:border-cyan-500 focus:outline-none"
                  ></textarea>
                </div>

                <div class="col-span-12">
                  <AppSelectComboBox
                    :badgeVariant="isLightTheme ? '' : 'soft'"
                    v-bind="tagsAttrs"
                    v-model="tags"
                    :items="data_tags || []"
                    placeholder="Selecciona tags..."
                    containerClass="border-zinc-800 bg-base-100 focus-within:border-cyan-500"
                    :error-message="errors.tags"
                  />
                </div>
              </div>
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
