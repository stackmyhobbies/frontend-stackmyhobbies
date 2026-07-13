<script setup lang="ts">
interface Props {
  color?: 'accent' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  variant?: 'outline' | 'soft' | 'solid'
}

withDefaults(defineProps<Props>(), {
  color: 'accent',
  variant: 'outline',
})

const colorVar = (color: string) => `var(--color-${color})`
</script>

<template>
  <span
    class="badge uppercase tracking-widest font-medium px-3 py-0.5 rounded-md text-xs border"
    :style="{
      color: colorVar(color),
      backgroundColor: `color-mix(in oklch, ${colorVar(color)} 12%, transparent)`,
      borderColor: `color-mix(in oklch, ${colorVar(color)} 30%, transparent)`,
    }"
  >
    <slot />
  </span>
</template>
