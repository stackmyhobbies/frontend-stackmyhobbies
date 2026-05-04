<template>
  <div class="form-control w-full">
    <label
      v-if="label"
      :for="id"
      class="label"
    >
      <span
        class="label-text text-base-content/70 font-medium"
        :class="labelClass"
        >{{ label }}</span
      >
    </label>

    <button
      type="button"
      :id="id"
      :popovertarget="id + '-popover'"
      :class="
        twMerge(
          'input input-bordered bg-white/5 text-left flex items-center justify-between w-full',
          error ? 'input-error' : '',
        )
      "
      :style="{ '--anchor-name': `--${id}` } as any"
    >
      <span :class="{ 'text-base-content/50': !dateValue }">
        {{ dateValue || placeholder || 'Seleccionar fecha' }}
      </span>
      <CalendarIcon class="size-5 opacity-50" />
    </button>

    <div
      popover="auto"
      :id="id + '-popover'"
      class="bg-base-100 rounded-box shadow-2xl p-2 border border-base-200"
      :style="{ '--position-anchor': `--${id}` } as any"
    >
      <calendar-date
        class="cally"
        @change="handleDateChange"
        :value="dateValue"
      >
        <calendar-month></calendar-month>
      </calendar-date>
    </div>

    <label
      v-if="error"
      class="label"
    >
      <span class="label-text-alt text-error text-wrap">{{ getErrorMessage(error) }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import 'cally'
import CalendarIcon from '../icons/svg/CalendarIcon.vue'
import { twMerge } from 'tailwind-merge'

// Asegúrate de tener este componente de icono o cámbialo por un SVG manual
// import CalendarIcon from './icons/CalendarIcon.vue';
type ErrorType = { message: string } | string

const dateValue = defineModel<string | null | undefined | unknown>()

interface Props {
  id: string
  label?: string
  error?: ErrorType
  placeholder?: string
  labelClass?: string
}

const props = defineProps<Props>()

const handleDateChange = (event: any) => {
  dateValue.value = event.target.value
}

function getErrorMessage(error: ErrorType | undefined): string {
  if (!error) return ''
  if (typeof error === 'string') return error
  return error.message // TypeScript sabe que aquí es { message: string }
}

console.log(props.error, 'error appdatepicker')
</script>

<style scoped>
.cally {
  --color-accent: var(--p);
  --color-text: var(--bc);
  --color-bg: var(--b1);
}

[popover] {
  margin: 0;
  inset: auto;
  position-area: bottom;
  /* Ajustado para mejor compatibilidad */
}
</style>
