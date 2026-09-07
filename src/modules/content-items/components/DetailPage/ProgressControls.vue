<template>
  <div class="flex gap-2">
    <button
      type="button"
      class="btn btn-circle btn-sm bg-base-100/60 border-base-content/10"
      :disabled="!canDecrement || isLoading"
      :aria-label="decrementLabel"
      :title="decrementLabel"
      @click="$emit('decrement')"
    >
      <Icon
        icon="lucide:minus"
        class="text-base"
      />
    </button>
    <button
      type="button"
      class="btn btn-circle btn-sm btn-accent text-accent-content border-accent/50"
      :disabled="!canIncrement || isLoading"
      :aria-label="incrementLabel"
      :title="incrementLabel"
      @click="$emit('increment')"
    >
      <span
        v-if="isLoading"
        class="loading loading-spinner loading-xs"
      />
      <Icon
        v-else
        icon="lucide:plus"
        class="text-base"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  canIncrement: boolean
  canDecrement: boolean
  isLoading: boolean
  incrementLabel?: string
  decrementLabel?: string
}>()

defineEmits<{
  increment: []
  decrement: []
}>()
</script>
