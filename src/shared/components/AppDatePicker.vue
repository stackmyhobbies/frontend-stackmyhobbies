<template>
  <div class="form-control w-full">
    <label v-if="label" :for="id" class="label">
      <span class="label-text text-base-content/70 font-medium" :class="labelClass">{{ label }}</span>
    </label>

    <button type="button" :id="id" :popovertarget="id + '-popover'"
      class="input input-bordered bg-white/5 text-left flex items-center justify-between w-full"
      :style="({ '--anchor-name': `--${id}` } as any)">
      <span :class="{ 'text-gray-500': !dateValue }">
        {{ dateValue || placeholder || 'Seleccionar fecha' }}
      </span>
      <CalendarIcon class="size-5 opacity-50" />
    </button>

    <div popover="auto" :id="id + '-popover'" class="bg-base-100 rounded-box shadow-2xl p-2 border border-base-200"
      :style="({ '--position-anchor': `--${id}` } as any)">
      <calendar-date class="cally" @change="handleDateChange" :value="dateValue">
        <calendar-month></calendar-month>
      </calendar-date>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'cally';
import CalendarIcon from '../icons/svg/CalendarIcon.vue';
// Asegúrate de tener este componente de icono o cámbialo por un SVG manual
// import CalendarIcon from './icons/CalendarIcon.vue';

const dateValue = defineModel<string>();

interface Props {
  id: string;
  label?: string;
  placeholder?: string;
  labelClass?: string;
}

defineProps<Props>();

const handleDateChange = (event: any) => {
  dateValue.value = event.target.value;
};
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
