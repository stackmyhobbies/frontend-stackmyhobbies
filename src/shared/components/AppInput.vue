<template>
  <div class="form-control w-full">
    <label v-if="label" :for="props.labelFor" class="label">
      <span class="label-text text-base-content/70 font-medium" :class="labelClass">{{ label }}</span>
    </label>

    <div class="relative">
      <input :id="props.labelFor" v-model="model" v-bind="$attrs" :class="twMerge(
        'block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-base-content outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6',
        inputClass,
        error ? 'input-error' : ''
      )" class="" />
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ getErrorMessage(error) }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';


// Define el v-model principal
//** Es la forma moderna (Vue 3.4+) de manejar la reactividad bidireccional.
const model = defineModel<string | number>();

type ErrorType = { message: string } | string;

interface Props {
  label?: string;
  error?: ErrorType;
  labelClass?: string | string[];
  inputClass?: string | string[];
  labelFor?: string;
}

const props = defineProps<Props>();


function getErrorMessage(error: ErrorType | undefined): string {
  if (!error) return '';
  if (typeof error === 'string') return error;
  return error.message; // TypeScript sabe que aquí es { message: string }
}


// Deshabilitamos la herencia de atributos en el root <div>
// para que caigan directamente en el <input>
defineOptions({
  inheritAttrs: false
});
</script>
