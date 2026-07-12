<script setup lang="ts">
import AppDatePicker from '@shared-components/AppDatePicker.vue'
import AppRating from '@shared-components/AppRating.vue'
import AppSelectComboBox from '@/shared/components/AppSelectComboBox.vue'
import { useThemeStore } from '@/stores/theme'
import type { BaseFieldProps, GenericObject } from 'vee-validate'

const viewing_started_at = defineModel<string>('viewing_started_at')
const viewing_finished_at = defineModel<string | unknown>('viewing_finished_at')
const rating = defineModel<number | undefined>('rating')
const notes = defineModel<string>('notes')
const tags = defineModel<{ id: number; name: string }[]>('tags')

defineProps<{
  viewing_started_atAttrs: BaseFieldProps & GenericObject
  viewing_finished_atAttrs: BaseFieldProps & GenericObject
  ratingAttrs: BaseFieldProps & GenericObject
  notesAttrs: BaseFieldProps & GenericObject
  tagsAttrs: BaseFieldProps & GenericObject
  errors: Partial<Record<string, string | undefined>>
  data_tags: { id: number; name: string }[] | null | undefined
}>()

const { isLightTheme } = useThemeStore()
</script>

<template>
  <div class="grid grid-cols-12 gap-4 pt-2">
    <div class="col-span-12 md:col-span-6">
      <AppDatePicker
        id="viewing_started_at"
        label="¿Cuándo lo empezaste?"
        v-model="viewing_started_at"
        v-bind="viewing_started_atAttrs"
        :error="errors.viewing_started_at"
      />
    </div>
    <div class="col-span-12 md:col-span-6">
      <AppDatePicker
        id="viewing_finished_at"
        label="¿Cuándo lo terminaste?"
        v-model="viewing_finished_at"
        v-bind="viewing_finished_atAttrs"
        :error="errors.viewing_finished_at"
      />
    </div>
    <div class="col-span-12 md:col-span-4">
      <AppRating
        id="rating"
        labelFor="rating"
        label="Tu Puntuación"
        v-model="rating"
        v-bind="ratingAttrs"
        name="rating"
      />
    </div>
    <div class="col-span-12">
      <label
        class="label"
        for="your_review"
        ><span class="label-text text-base-content/60">Tu comentario</span></label
      >
      <textarea
        id="your_review"
        v-model="notes"
        v-bind="notesAttrs"
        class="textarea textarea-bordered w-full bg-base-100 rounded-btn h-[60px] min-h-0 resize-none focus-within:border-accent focus:border-accent focus:outline-none"
      ></textarea>
    </div>

    <div class="col-span-12">
      <AppSelectComboBox
        label="Etiquetas"
        :badgeVariant="isLightTheme ? '' : 'soft'"
        v-bind="tagsAttrs"
        v-model="tags"
        :items="data_tags || []"
        placeholder="Selecciona tags..."
        containerClass="border-base-300 bg-base-100 focus-within:border-accent"
        :error-message="errors.tags"
      />
    </div>
  </div>
</template>
