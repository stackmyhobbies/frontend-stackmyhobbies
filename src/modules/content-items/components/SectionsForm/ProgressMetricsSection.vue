<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppSelect from '@shared-components/AppSelect.vue'
import AppInput from '@shared-components/AppInput.vue'
import AppDatePicker from '@shared-components/AppDatePicker.vue'
import { DayOfWeekValues } from '@/modules/content-items/enum/dayOfWeek.enum'
import type { ProgressStatus } from '../../interfaces/contentItemListResponse'
import type { ProgressUnit } from '../../enum/progressUnit.enum'
import type { BaseFieldProps, GenericObject } from 'vee-validate'
import type { DayOfWeek } from '@/modules/content-items/enum/dayOfWeek.enum'

const progress_status_id = defineModel<number | null | undefined>('progress_status_id')
const current_progress = defineModel<number | undefined>('current_progress')
const total_progress = defineModel<number | undefined>('total_progress')
const progress_unit = defineModel<ProgressUnit | string | undefined>('progress_unit')
const day_of_week = defineModel<DayOfWeek | string | null | undefined>('day_of_week')
const aired_from = defineModel<string | null | unknown>('aired_from')
const aired_to = defineModel<string | null | unknown>('aired_to')

const props = defineProps<{
  progressStatuses: ProgressStatus[] | null | undefined
  selectedProgressStatus: ProgressStatus | null
  progressPercent: number
  allowedUnits: { id: string; name: string }[]
  progress_status_idAttrs: BaseFieldProps & GenericObject
  current_progressAttrs: BaseFieldProps & GenericObject
  total_progressAttrs: BaseFieldProps & GenericObject
  progress_unitAttrs: BaseFieldProps & GenericObject
  day_of_weekAttrs: BaseFieldProps & GenericObject
  aired_fromAttrs: BaseFieldProps & GenericObject
  aired_toAttrs: BaseFieldProps & GenericObject
  errors?: Partial<Record<string, string | undefined>>
  crossFieldError: string | undefined
  showAiredFields: boolean
}>()

const { t } = useI18n({ useScope: 'global' })

const showDayOfWeek = computed(() => {
  return (
    props.selectedProgressStatus?.name?.toLowerCase() === 'en emisión' ||
    props.selectedProgressStatus?.name?.toLowerCase() === 'viendo'
  )
})

const isCurrentlyAiring = computed(() => {
  return props.selectedProgressStatus?.name?.toLowerCase() === 'en emisión'
})
</script>

<template>
  <div class="grid grid-cols-12 gap-4 pt-2">
    <!-- Fila 1: Estado y Día de emisión -->
    <div class="col-span-12 md:col-span-6">
      <AppSelect
        select-class="bg-base-100 focus-within:ring-accent/50 focus-within:border-accent"
        select-container-option-class="bg-accent/10 text-accent"
        selected-text="text-accent"
        label="Estado actual"
        :items="progressStatuses || []"
        labelFor="progress_status_id"
        v-model="progress_status_id"
        v-bind="progress_status_idAttrs"
        :error="errors?.progress_status_id"
      >
      </AppSelect>
    </div>
    <div
      v-if="showDayOfWeek"
      class="col-span-12 md:col-span-6"
    >
      <AppSelect
        select-class="bg-base-100 focus-within:ring-accent/50 focus-within:border-accent"
        select-container-option-class="bg-accent/10 text-accent"
        selected-text="text-accent"
        label="Día de emisión"
        :items="
          Object.entries(DayOfWeekValues).map(([key, value]) => ({
            id: value,
            name: t(`common.days.${value}`),
          }))
        "
        labelFor="day_of_week_id"
        v-model="day_of_week"
        v-bind="day_of_weekAttrs"
        :error="errors?.day_of_week"
        :placeholder="t('contentItem.form_content_item.select_placeholder_release_date')"
      ></AppSelect>
    </div>

    <!-- Fila 2: Fechas de emisión (metadatos de la obra) -->
    <div
      v-if="showAiredFields"
      class="col-span-12 md:col-span-6"
    >
      <AppDatePicker
        id="aired_from"
        label="Fecha de estreno"
        v-model="aired_from"
        v-bind="aired_fromAttrs"
        :error="errors?.aired_from"
      />
    </div>
    <div
      v-if="showAiredFields && !isCurrentlyAiring"
      class="col-span-12 md:col-span-6"
    >
      <AppDatePicker
        id="aired_to"
        label="Fin de emisión"
        v-model="aired_to"
        v-bind="aired_toAttrs"
        :error="errors?.aired_to"
      />
    </div>
    <div
      v-if="showAiredFields && isCurrentlyAiring"
      class="col-span-12 md:col-span-6 flex items-center"
    >
      <span class="badge badge-info badge-soft">En emisión</span>
    </div>

    <!-- Fila 3: Progreso actual y Total -->
    <div class="col-span-12 md:col-span-6">
      <AppInput
        input-class="bg-base-100 focus:outline-accent"
        label="Progreso actual"
        type="number"
        labelFor="current_progress"
        v-model="current_progress"
        v-bind="current_progressAttrs"
        :error="errors?.current_progress || crossFieldError"
      />
    </div>
    <div class="col-span-12 md:col-span-6">
      <AppInput
        input-class="bg-base-100 focus:outline-accent"
        label="Total de la unidad"
        type="number"
        labelFor="total_progress"
        v-model="total_progress"
        v-bind="total_progressAttrs"
        :error="errors?.total_progress"
      />
    </div>

    <!-- Fila 4: Unidad de medida -->
    <div class="col-span-12 md:col-span-6">
      <AppSelect
        label="Unidad de medida"
        select-class="bg-base-100 focus-within:ring-accent/50 focus-within:border-accent"
        select-container-option-class="bg-accent/10 text-accent"
        selected-text="text-accent"
        :items="allowedUnits"
        labelFor="progress_unit"
        v-model="progress_unit"
        v-bind="progress_unitAttrs"
        :error="errors?.progress_unit"
      >
        <option
          v-for="unit in allowedUnits"
          :key="unit.id"
          :value="unit.id"
        >
          {{ unit.name }}
        </option>
      </AppSelect>
    </div>

    <!-- Fila 5: Barra de progreso -->
    <div class="col-span-12 flex items-center gap-3 mt-2">
      <progress
        class="progress progress-accent flex-1 h-2"
        :value="progressPercent"
        max="100"
      ></progress>
      <span class="text-accent font-mono font-bold text-sm whitespace-nowrap">
        {{ progressPercent }}% Complete
      </span>
    </div>
  </div>
</template>
