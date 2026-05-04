<script setup lang="ts">
import AppDatePicker from '@shared-components/AppDatePicker.vue'
import AppRating from '@shared-components/AppRating.vue'
import AppSelectComboBox from '@/shared/components/AppSelectComboBox.vue'
import { useThemeStore } from '@/stores/theme'
import type { BaseFieldProps, GenericObject } from 'vee-validate'

const viewing_started_at = defineModel<string>('viewing_started_at')
const viewing_finished_at = defineModel<string | unknown>('viewing_finished_at')
const aired_from = defineModel<string | null | unknown>('aired_from')
const aired_to = defineModel<string | null | unknown>('aired_to')
const rating = defineModel<number | undefined>('rating')
const notes = defineModel<string>('notes')
const tags = defineModel<{ id: number; name: string }[]>('tags')

defineProps<{
  viewing_started_atAttrs: BaseFieldProps & GenericObject
  viewing_finished_atAttrs: BaseFieldProps & GenericObject
  aired_fromAttrs: BaseFieldProps & GenericObject
  aired_toAttrs: BaseFieldProps & GenericObject
  ratingAttrs: BaseFieldProps & GenericObject
  notesAttrs: BaseFieldProps & GenericObject
  tagsAttrs: BaseFieldProps & GenericObject
  errors: Partial<Record<string, string | undefined>>
  showAiredFields: boolean
  data_tags: { id: number; name: string }[] | null | undefined
}>()

const { isLightTheme } = useThemeStore()
</script>

<template>
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
      <label class="label"><span class="label-text text-base-content/60">Notes</span></label>
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
</template>
