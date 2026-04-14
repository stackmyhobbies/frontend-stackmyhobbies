<template>
  <button :class="['btn', customClass]" @click="emit('click', $event)">
    <slot name="icon" />
    <slot>Boton</slot>
    <slot name="icon2" />
  </button>
</template>


<script lang="ts" setup>
defineProps<{ customClass?: string }>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>
