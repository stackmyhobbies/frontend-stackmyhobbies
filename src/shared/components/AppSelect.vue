<template>
  <div class="form-control w-full">
    <label v-if="label" :for="props.labelFor" class="label">
      <span class="label-text text-base-content/70 font-medium" :class="labelClass">{{ label }}</span>
    </label>

    <div class="relative">
      <select :id="props.labelFor" v-model="model" v-bind="$attrs" :class="twMerge(
        'select select-bordered w-full border-gray-700 bg-base-100 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500',
        selectClass,
        error ? 'select-error' : ''
      )">
        <slot></slot>
      </select>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ getErrorMessage(error) }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const model = defineModel<string | number | null | undefined>();

type ErrorType = { message: string } | string;

interface Props {
  label?: string;
  error?: ErrorType;
  labelClass?: string | string[];
  selectClass?: string | string[];
  labelFor?: string;
}

const props = defineProps<Props>();

function getErrorMessage(error: ErrorType | undefined): string {
  if (!error) return '';
  if (typeof error === 'string') return error;
  return error.message; 
}

defineOptions({
  inheritAttrs: false
});
</script>
