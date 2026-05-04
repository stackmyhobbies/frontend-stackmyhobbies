<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppSelect from '@shared-components/AppSelect.vue'
import AppInput from '@shared-components/AppInput.vue'
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
  errors?: Partial<Record<string, string | undefined>>
  crossFieldError: string | undefined
}>()

const { t } = useI18n({ useScope: 'global' })

const showDayOfWeek = computed(() => {
  return (
    props.selectedProgressStatus?.name === 'en emisión' ||
    props.selectedProgressStatus?.name === 'viendo'
  )
})
</script>

<template>
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
        :error="errors?.progress_status_id"
      >
      </AppSelect>
    </div>
    <!-- Day of the week for emission-->
    <div
      v-if="showDayOfWeek"
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
        :error="errors?.day_of_week"
        :placeholder="t('contentItem.form_content_item.select_placeholder_release_date')"
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
        :error="errors?.current_progress || crossFieldError"
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
        :error="errors?.total_progress"
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
</template>
