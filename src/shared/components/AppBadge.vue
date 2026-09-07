<script setup lang="ts">
interface Props {
  color?: string
  variant?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'soft',
  size: 'sm',
})

const getClass = () => {
  const base = `badge-${props.size}`
  const color = `badge-${props.color}`
  if (props.variant === 'solid') return `${base} ${color}`
  if (props.variant === 'outline') return `${base} badge-outline ${color}`
  if (props.variant === 'soft') return `${base} badge-soft ${color}`
  return `${base} ${color}`
}
</script>

<template>
  <span
    class="badge gap-1 pr-1 transition-all duration-100"
    :class="getClass()"
  >
    <slot />
  </span>
</template>