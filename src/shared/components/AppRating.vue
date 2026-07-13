<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const model = defineModel<number | string>({ default: '0.0' })

interface Props {
  label?: string
  labelFor?: string
  name: string
  readonly?: boolean
}

defineProps<Props>()

function starFill(star: number): number {
  const rating = Number(model.value)
  if (star <= rating) return 100
  if (star - rating >= 1) return 0
  return Math.round((rating - (star - 1)) * 100)
}
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
      <template v-if="readonly">
        <div class="flex gap-1">
          <div
            v-for="i in 5"
            :key="i"
            class="relative size-6"
          >
            <div class="absolute inset-0 bg-base-content/15 mask mask-star-2" />
            <div
              class="absolute inset-0 bg-accent mask mask-star-2"
              :style="{ clipPath: `inset(0 ${100 - starFill(i)}% 0 0)` }"
            />
          </div>
        </div>
      </template>
      <template v-else>
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
      </template>

      <div
        v-if="!readonly"
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
