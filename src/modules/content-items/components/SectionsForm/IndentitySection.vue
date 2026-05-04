<template>
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
      Identidad y Ubicación
    </div>
    <div class="collapse-content">
      <div class="grid grid-cols-12 gap-4 pt-2">
        <div class="col-span-12 md:col-span-6">
          <AppInput
            input-class="bg-base-100 focus:outline-cyan-500"
            label="Title"
            placeholder="Ej: Naruto"
            labelFor="title"
            v-model="title"
            v-bind="titleAttrs"
            :error="errors_title"
          />
        </div>
        <div class="col-span-12 md:col-span-6">
          <AppSelect
            select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
            select-container-option-class="bg-cyan-500/10 text-cyan-400"
            selected-text="text-cyan-500"
            label="Content Type"
            display-key="name"
            :items="type || []"
            labelFor="content_type_id"
            value-key="id"
            v-model="content_type_id"
            v-bind="content_type_idAttrs"
            :error="errors_content_type"
            placeholder="Selecciona un tipo de hobby"
          >
          </AppSelect>
        </div>

        <template v-if="allowedSegmentType.length">
          <div class="col-span-12 md:col-span-6">
            <AppSelect
              select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
              select-container-option-class="bg-cyan-500/10 text-cyan-400"
              selected-text="text-cyan-500"
              label="Segment Type"
              :items="allowedSegmentType"
              labelFor="segment_type"
              v-model="segment_type"
              v-bind="segment_typeAttrs"
              :error="errors_type"
            >
            </AppSelect>
          </div>
          <div class="col-span-12 md:col-span-6">
            <AppInput
              input-class="bg-base-100 focus:outline-cyan-500"
              label="Number"
              type="number"
              labelFor="segment_number"
              v-model="segment_number!"
              v-bind="segment_numberAttrs"
              placeholder="0"
              :error="errors_segment_number"
            />
          </div>

          <div class="col-span-12 md:col-span-12">
            <label class="label cursor-pointer gap-2">
              <input
                type="checkbox"
                v-model="advancedSegmentSubtypes"
                class="checkbox"
              />
              Opciones avanzadas
            </label>
          </div>
        </template>

        <template v-if="advancedSegmentSubtypes && allowedSubsegmentType?.length">
          <div class="col-span-12 md:col-span-6">
            <AppSelect
              select-class="bg-base-100 focus-within:ring-cyan-500/50 focus-within:border-cyan-500"
              select-container-option-class="bg-cyan-500/10 text-cyan-400"
              selected-text="text-cyan-500"
              label="Subtype"
              labelFor="segment_subtype"
              :items="allowedSubsegmentType"
              v-model="segment_subtype"
              v-bind="segment_subtypeAttrs"
              :error="errors_segment_subtype"
            >
            </AppSelect>
          </div>
          <div class="col-span-12 md:col-span-6">
            <AppInput
              input-class="bg-base-100 focus:outline-cyan-500"
              label="Number"
              type="number"
              labelFor="segment_subnumber"
              v-model="segment_subnumber!"
              v-bind="segment_subnumberAttrs"
              placeholder="0"
              :error="errors_segment_subnumber"
            />
          </div>
        </template>

         <div class="col-span-12">
           <label class="label"><span class="label-text text-base-content/60">Description</span></label>
           <textarea
             v-model="description"
             v-bind="descriptionAttrs"
             class="textarea textarea-bordered w-full bg-base-100 focus-within:border-cyan-500 focus:border-cyan-500 focus:outline-none rounded-btn h-[60px] min-h-0 resize-none"
           ></textarea>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseFieldProps, GenericObject } from 'vee-validate'
import type { Type } from '../../interfaces/ContentTypeResponse'
import type { SegmentType } from '../../enum/segmentType.enum'
import type { SubSegmentType } from '../../enum/subSegmentType.enum'

import AppInput from '@/shared/components/AppInput.vue'
import AppSelect from '@/shared/components/AppSelect.vue'

// 1. Definimos los modelos (reemplazan a las props de valor)
const title = defineModel<string>('title')
const content_type_id = defineModel<number | null | undefined>('content_type_id')
const segment_type = defineModel<SegmentType | null>('segment_type') // Ajusta el tipo según tu enum
const segment_number = defineModel<number>('segment_number')
const advancedSegmentSubtypes = defineModel<boolean>('advancedSegmentSubtypes')
const segment_subtype = defineModel<SubSegmentType | null>('segment_subtype')
const segment_subnumber = defineModel<number | null>('segment_subnumber')
const description = defineModel<string>('description')

// 2. Las demás propiedades (las que no cambian) se quedan como props
defineProps<{
  titleAttrs: BaseFieldProps & GenericObject
  errors_title?: string

  type?: Type[]
  content_type_idAttrs: BaseFieldProps & GenericObject
  errors_content_type?: string

  allowedSegmentType: { id: string; name: string }[]
  segment_typeAttrs: BaseFieldProps & GenericObject
  errors_type?: string

  segment_numberAttrs: BaseFieldProps & GenericObject
  errors_segment_number?: string

  allowedSubsegmentType?: { id: string; name: string }[]
  segment_subtypeAttrs: BaseFieldProps & GenericObject
  errors_segment_subtype?: string

  segment_subnumberAttrs: BaseFieldProps & GenericObject
  errors_segment_subnumber?: string

  descriptionAttrs: BaseFieldProps & GenericObject
}>()
</script>

<style scoped></style>
