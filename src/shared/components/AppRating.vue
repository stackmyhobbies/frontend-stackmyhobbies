<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const model = defineModel<number>({ default: 0 });

interface Props {
  label?: string;
  name: string;
}

defineProps<Props>();
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text font-medium text-gray-400">{{ label }}</span>
    </label>

    <div class="flex items-center gap-4">
      <div class="rating rating-lg rating-half">
        <input type="radio" :name="name" class="rating-hidden" :value="0" v-model="model" />

        <template v-for="n in 10" :key="n">
          <input type="radio" :name="name" v-model="model" :value="n / 2" :class="twMerge(
            'mask mask-star-2 transition-transform hover:scale-110',
            '[--rating-color:theme(colors.cyan.400)] bg-[--rating-color]',
            n % 2 !== 0 ? 'mask-half-1' : 'mask-half-2'
          )" :aria-label="(n / 2) + ' estrellas'" />
        </template>
      </div>

      <div class="flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-3 py-1">
        <span class="text-lg font-bold font-mono text-cyan-400">
          {{ model.toFixed(1) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rating input.mask {
  appearance: none;
  -webkit-appearance: none;
}

.mask-star-2:checked,
.mask-star-2:hover {
  filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.6));
}
</style>
