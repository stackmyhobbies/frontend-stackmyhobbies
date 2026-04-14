<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none"
    :class="props.class">
    <g :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <slot />
    </g>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
  color?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor' // Permite que el icono herede el color del texto
});
</script>
