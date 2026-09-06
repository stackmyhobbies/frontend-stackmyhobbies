<template>
  <div ref="triggerRef" class="inline-block" @keydown.escape="close">
    <slot name="trigger" :toggle="toggle" :isOpen="isOpen" />
  </div>

  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="floatingRef"
      :style="floatingStyles"
      class="z-[9999]"
      @keydown.escape="close"
    >
      <slot name="content" :close="close" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const floatingRef = ref<HTMLElement | null>(null)

const { floatingStyles } = useFloating(triggerRef, floatingRef, {
  placement: 'bottom-end',
  whileElementsMounted: autoUpdate,
  middleware: [offset(4), flip(), shift({ padding: 8 })],
})

const toggle = () => (isOpen.value = !isOpen.value)
const close = () => (isOpen.value = false)

onClickOutside(floatingRef, (event) => {
  if (triggerRef.value?.contains(event.target as Node)) return
  close()
})

const router = useRouter()
watch(() => router.currentRoute.value.fullPath, close)
</script>
