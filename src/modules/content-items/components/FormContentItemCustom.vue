<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod'

//** Queries **//
import { useGetContentTypesQuery } from '@content-queries/useGetContentTypesQuery'
import { useProgressStatusesQuery } from '@content-queries/useGetProgressStatusesQuery';
import { useGetTagsQuery } from '@content-queries/useGetTagsQuery'

/** components */
import AppDatePicker from '@shared-components/AppDatePicker.vue';
import AppInput from '@shared-components/AppInput.vue';
import AppSelect from '@shared-components/AppSelect.vue';
import AppRating from '@shared-components/AppRating.vue';

/** schema */
import { CreateContentItem } from '../schemas/content-item.schema';

/** Composables  */
import { useContentTypeCalculations } from '../composable/useContentTypeCalculations';
import { useTagsManager } from '../composable/useTagsManager';
import { useImagePreview } from '../composable/useImagePreview';
import AppSelectComboBox from '@/shared/components/AppSelectComboBox.vue';

/** Enum */
import { DayOfWeekValues, DayOfWeek } from "@/modules/content-items/enum/dayOfWeek.enum"
import type { ProgressStatus } from '../interfaces/contentItemListResponse';



const { data } = useGetContentTypesQuery()
const { data: progressStatuses } = useProgressStatusesQuery()
const { data: data_tags } = useGetTagsQuery();

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
  segment_type: null,
  segment_subtype: null,
  tags: [],
  total_progress: 0,
}

const progress_statuses_object = {
  airing: 'en emisión',
  finished: 'terminado',
}


const { handleSubmit, errors, values, defineField, setFieldValue } = useForm({
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
const [start_date, start_dateAttrs] = defineField('start_date')
const [end_date, end_dateAttrs] = defineField('end_date')
const [rating, ratingAttrs] = defineField('rating')
const [tags, tagsAttrs] = defineField('tags')
const [day_of_week, day_of_weekAttrs] = defineField('day_of_week')
const [image, imageAttrs] = defineField('image')

const { progressPercent, allowedSegmentType, allowedSubsegmentType, allowedUnits } = useContentTypeCalculations(data, values)

const selectedProgressStatus = computed<ProgressStatus | null>(() => {
  if (!progressStatuses.value || !values.progress_status_id) return null
  return progressStatuses.value.find((t) => t.id === Number(values.progress_status_id)) ?? null
})

watch(selectedProgressStatus, (newVal) => {
  console.log('El estado cambió a:', newVal);
  console.log(selectedProgressStatus.value?.name === progress_statuses_object.airing)
});
// const { tagInput, addTag, removeTag } = useTagsManager(tags, setFieldValue as (field: string, value: unknown) => void)

const { previewUrl, handleImageUpload } = useImagePreview(computed(() => values.image), setFieldValue as (field: string, value: unknown) => void)

const advancedSegmentSubtypes = ref<boolean>(false);
console.log({ advancedSegmentSubtypes })
watch(content_type_id, () => {
  setFieldValue('segment_type', null)
  setFieldValue('segment_subtype', null)
})


const crossFieldError = computed(() => {
  const c = Number(current_progress.value)
  const t = Number(total_progress.value)
  return (!isNaN(c) && !isNaN(t) && c > t)
    ? 'El progreso actual no puede ser mayor al total'
    : undefined
})


const onSubmit = handleSubmit((formValues) => {
  console.log('Formulario válido:', formValues)
  console.log("Deberia enviar un submit")
})
</script>

<template>
  <div class="min-h-screen p-4 md:p-6 flex justify-center items-start text-gray-300">
    <div class="w-full rounded-3xl p-1">
      <form @submit="onSubmit" class="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">

        <div class="lg:col-span-5 flex flex-col gap-4">
          <label
            class="relative flex flex-col items-center justify-center w-full
            aspect-[3/4] rounded-2xl border-2 border-dashed border-cyan-500/20 bg-[#1a1c23] hover:bg-white/5 transition-all cursor-pointer group overflow-hidden">
            <template v-if="!previewUrl">
              <div class="flex flex-col items-center justify-center pb-6 pt-5">
                <svg class="w-16 h-16 mb-4 text-cyan-500/50 group-hover:scale-110 transition-transform"
                  fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM3 18V6h5v12H3zm16 0h-5V6h5v12z" />
                </svg>
                <p class="text-lg font-medium text-cyan-500/70">Upload Cover Image</p>
              </div>
            </template>
            <img v-else :src="previewUrl" class="w-full h-full object-cover" />
            <input type="file" class="hidden" @change="handleImageUpload" name="image" />
          </label>
        </div>

        <div class="lg:col-span-7 flex flex-col gap-y-6">

          <div class="collapse collapse-arrow md:collapse-open border border-gray-700 bg-white/2 rounded-2xl">
            <input type="checkbox" checked />
            <div
              class="collapse-title text-cyan-500 font-bold uppercase tracking-widest text-sm md:pointer-events-none">
              Identidad y Ubicación
            </div>
            <div class="collapse-content">
              <div class="grid grid-cols-12 gap-4 pt-2">
                <div class="col-span-12 md:col-span-6">
                  <AppInput input-class="bg-base-100 focus:outline-cyan-500" label="Title" placeholder="Ej: Naruto"
                    labelFor="title" v-model="title" v-bind="titleAttrs" :error="errors.title" />
                </div>
                <div class="col-span-12 md:col-span-6">
                  <AppSelect select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
                    select-container-option-class="bg-cyan-500/10 text-cyan-400" selected-text="text-cyan-500"
                    label="Content Type" display-key="name" :items="data || []" labelFor="content_type_id"
                    value-key="id" v-model="content_type_id" v-bind="content_type_idAttrs"
                    :error="errors.content_type_id" placeholder="Selecciona un tipo de hobby">


                  </AppSelect>
                </div>

                <template v-if="allowedSegmentType.length">
                  <div class="col-span-12 md:col-span-6">
                    <AppSelect select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
                      select-container-option-class="bg-cyan-500/10 text-cyan-400" selected-text="text-cyan-500"
                      label="Segment Type" :items="allowedSegmentType" labelFor="segment_type" v-model="segment_type"
                      v-bind="segment_typeAttrs" :error="errors.segment_type">
                      <option :value="null" disabled>Selecciona tipo de segmento</option>
                      <option v-for="seg in allowedSegmentType" :key="seg.id" :value="seg.name">{{ seg.name }}</option>
                    </AppSelect>
                  </div>
                  <div class="col-span-12 md:col-span-6">
                    <AppInput input-class="bg-base-100 focus:outline-cyan-500" label="Number" type="number"
                      labelFor="segment_number" v-model="segment_number!" v-bind="segment_numberAttrs" placeholder="0"
                      :error="errors.segment_number" />
                  </div>

                  <div class="col-span-12 md:col-span-12">
                    <label class="label cursor-pointer gap-2">
                      <input type="checkbox" v-model="advancedSegmentSubtypes" class="checkbox" />
                      Opciones avanzadas
                    </label>
                  </div>



                </template>

                <template v-if="advancedSegmentSubtypes && allowedSubsegmentType?.length">
                  <div class="col-span-12 md:col-span-6">
                    <AppSelect select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
                      select-container-option-class="bg-cyan-500/10 text-cyan-400" selected-text="text-cyan-500"
                      label="Subtype" labelFor="segment_subtype" :items="allowedSubsegmentType"
                      v-model="segment_subtype" v-bind="segment_subtypeAttrs" :error="errors.segment_subtype">
                      <!-- <option v-for="sub in allowedSubsegmentType" :key="sub.id" :value="sub.name">{{ sub.name }}
                      </option> -->
                    </AppSelect>
                  </div>
                  <div class="col-span-12 md:col-span-6">
                    <AppInput input-class="bg-base-100 focus:outline-cyan-500" label="Number" type="number"
                      labelFor="segment_subnumber" v-model="segment_subnumber!" v-bind="segment_subnumberAttrs"
                      placeholder="0" :error="errors.segment_subnumber" />
                  </div>
                </template>

                <div class="col-span-12">
                  <label class="label"><span class="label-text text-gray-400">Description</span></label>
                  <textarea v-model="description" v-bind="descriptionAttrs"
                    class="textarea textarea-bordered w-full bg-base-100 focus-within:border-cyan-500  focus:border-cyan-500 focus:outline-none border-gray-700 h-[60px] min-h-0 resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="collapse collapse-arrow md:collapse-open border border-gray-700 bg-white/2 rounded-2xl">
            <input type="checkbox" checked />
            <div
              class="collapse-title text-cyan-500 font-bold uppercase tracking-widest text-sm md:pointer-events-none">
              Métricas de Progreso
            </div>
            <div class="collapse-content">
              <div class="grid grid-cols-12 gap-4 pt-2">
                <div class="col-span-12 md:col-span-6">
                  <AppSelect select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
                    select-container-option-class="bg-cyan-500/10 text-cyan-400" selected-text="text-cyan-500"
                    label="Progress Status" :items="progressStatuses || []" labelFor="progress_status_id"
                    v-model="progress_status_id" v-bind="progress_status_idAttrs" :error="errors.progress_status_id">
                  </AppSelect>
                </div>
                <!-- Day of the week for emission-->
                <div v-if="selectedProgressStatus?.name === progress_statuses_object.airing"
                  class="col-span-12 md:col-span-6">
                  <AppSelect select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
                    select-container-option-class="bg-cyan-500/10 text-cyan-400" selected-text="text-cyan-500"
                    label="dia de emision"
                    :items="Object.entries(DayOfWeekValues).map(([key, value]) => ({ id: value, name: value }))"
                    labelFor="day_of_week_id" v-model="day_of_week" v-bind="day_of_weekAttrs"
                    :error="errors.day_of_week" placeholder="Seleccionar un dia de emision">
                  </AppSelect>
                </div>

                <!-- Current progress of the project -->
                <div class="col-span-12 md:col-span-6">
                  <AppInput input-class="bg-base-100 focus:outline-cyan-500" label="Current Progress" type="number"
                    labelFor="current_progress" v-model="current_progress" v-bind="current_progressAttrs"
                    :error="errors.current_progress || crossFieldError" />
                </div>
                <div class="col-span-12 md:col-span-6">
                  <AppInput input-class="bg-base-100 focus:outline-cyan-500" label="Total Progress" type="number"
                    labelFor="total_progress" v-model="total_progress" v-bind="total_progressAttrs"
                    :error="errors.total_progress" />
                </div>
                <div class="col-span-12 md:col-span-6">
                  <AppSelect label="Progress Unit"
                    select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
                    select-container-option-class="bg-cyan-500/10 text-cyan-400" selected-text="text-cyan-500"
                    :items="allowedUnits" labelFor="progress_unit" v-model="progress_unit" v-bind="progress_unitAttrs"
                    :error="errors.progress_unit">
                    <option v-for="unit in allowedUnits" :key="unit.id" :value="unit">{{ unit }}</option>
                  </AppSelect>
                </div>
                <div class="col-span-12 flex items-center gap-3 mt-2">
                  <progress class="progress progress-info flex-1 h-2" :value="progressPercent" max="100"></progress>
                  <span class="text-cyan-500 font-mono font-bold text-sm whitespace-nowrap">{{ progressPercent }}%
                    Complete</span>
                </div>
              </div>
            </div>
          </div>

          <div class="collapse collapse-arrow md:collapse-open border border-gray-700 bg-white/2 rounded-2xl">
            <input type="checkbox" checked />
            <div
              class="collapse-title text-cyan-500 font-bold uppercase tracking-widest text-sm md:pointer-events-none">
              Evaluación y Registro
            </div>
            <div class="collapse-content">
              <div class="grid grid-cols-12 gap-4 pt-2">
                <div class="col-span-12 md:col-span-4">
                  <AppDatePicker id="start" label="Start Date" v-model="start_date" v-bind="start_dateAttrs" />
                </div>
                <div class="col-span-12 md:col-span-4">
                  <AppDatePicker id="end" label="End Date" v-model="end_date" v-bind="end_dateAttrs" />
                </div>
                <div class="col-span-12 md:col-span-4">
                  <AppRating id="rating" label="Rating" v-model="rating" v-bind="ratingAttrs" name="rating" />
                </div>
                <div class="col-span-12">
                  <label class="label"><span class="label-text text-gray-400">Notes</span></label>
                  <textarea v-model="notes" v-bind="notesAttrs"
                    class="textarea textarea-bordered w-full bg-base-100 border-gray-700 h-[60px] min-h-0 resize-none focus-within:border-cyan-500  focus:border-cyan-500 focus:outline-none"></textarea>
                </div>
                <!-- <div class="col-span-12">
                  <label class="label"><span class="label-text text-gray-400">Tags</span></label>
                  <div class="flex flex-wrap gap-2 mb-2">
                    <span v-for="tag in (tags ?? [])" :key="tag"
                      class="badge badge-outline border-cyan-500/40 text-cyan-400 gap-1">
                      {{ tag }}
                      <button type="button" @click="removeTag(tag)"
                        class="text-gray-400 hover:text-red-400">&times;</button>
                    </span>
                  </div>
                  <input v-model="tagInput" @keydown="addTag"
                    class="input input-bordered w-full border-gray-700 bg-base-100"
                    placeholder="Escribe un tag y presiona Enter" />
                </div> -->

                <div class="col-span-12">
                  <AppSelectComboBox badgeVariant="soft" v-bind="tagsAttrs" v-model="tags" :items="data_tags || []"
                    placeholder="Selecciona tags..."
                    containerClass="border-zinc-800 bg-base-100 focus-within:border-cyan-500" />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-info w-full text-lg shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] mb-10">
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
  .md\:collapse-open.collapse-arrow>.collapse-title:after {
    display: none;
  }
}
</style>
