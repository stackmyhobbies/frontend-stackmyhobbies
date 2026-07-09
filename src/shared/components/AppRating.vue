<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const model = defineModel<number | string>({ default: '0.0' })

interface Props {
  label?: string
  labelFor?: string
  name: string
}

defineProps<Props>()
</script>

<template>
  <div class="form-control w-full">
    <label
      :for="labelFor"
      v-if="label"
      class="label"
    >
      <span class="label-text font-medium text-base-content/60">{{ label }}</span>
    </label>

    <div class="flex items-center gap-4">
      <div class="rating rating-lg rating-half">
        <input
          type="radio"
          :name="name"
          class="rating-hidden"
          :value="0"
          v-model="model"
        />

        <template
          v-for="n in 10"
          :key="n"
        >
          <input
            type="radio"
            :name="name"
            v-model="model"
            :value="n / 2"
            :class="
              twMerge(
                'mask mask-star-2 transition-transform hover:scale-110',
                'bg-accent',
                n % 2 !== 0 ? 'mask-half-1' : 'mask-half-2',
              )
            "
            :aria-label="n / 2 + ' estrellas'"
          />
        </template>
      </div>

      <div
        class="flex items-center justify-center bg-accent/10 border border-accent/20 rounded-lg px-3 py-1"
      >
        <span class="text-lg font-bold font-mono text-accent">
          {{ Number(model).toFixed(1) }}
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
  filter: drop-shadow(0 0 8px color-mix(in oklch, var(--a) 60%, transparent));
}
</style>
