<script setup>
const props = defineProps({
  color: String,
  variant: { default: "soft" }
})
console.log({ props })
const getClass = () => {
  if (props.variant === "solid") return `badge-${props.color}`
  if (props.variant === "outline") return `badge-outline badge-${props.color}`
  if (props.variant === "soft") return `badge-soft badge-${props.color}`
  return `badge badge-${props.color}`
}
</script>

<template>
  <span class="badge gap-1 pr-1 transition-all duration-100" :class="getClass()">
    <slot />
  </span>
</template>
