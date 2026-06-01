<template>
  <div class="drawer lg:drawer-open select-none" @mousemove="handleMouseMove" @mouseup="handleMouseUp">
    <input id="drawer" type="checkbox" class="drawer-toggle" v-model="isMobileSidebarOpen" />
    <side-bar-component :width="width" :is-dragging="isDragging" :animating="animating" :min="MIN"
      @mouse-down="handleMouseDown" @toggle-collapsed="toggleCollapsed" />
    <drawer-content-component @toggle-collapsed="toggleCollapsed" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import SideBarComponent from '@/shared/components/DrawerSideBarComponents/SideBarComponent.vue'
import DrawerContentComponent from '@/shared/components/DrawerSideBarComponents/DrawerContentComponent.vue'

const MIN = 64
const MAX = 256
const SNAP = 30

const width = ref<number>(MIN)

const animating = ref<boolean>(false)

const isDragging = ref<boolean>(false)
const startX = ref<number>(0)
const startWidth = ref<number>(MIN)

const isMobileSidebarOpen = ref(false)

const isMobile = () => window.innerWidth < 1024

watch(isMobileSidebarOpen, (isOpen) => {
  if (isOpen) {
    width.value = MAX
  }
})

const handleMouseDown = (e: MouseEvent) => {
  if (isMobile()) return

  isDragging.value = true
  animating.value = false
  startX.value = e.clientX
  startWidth.value = width.value
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || isMobile()) return

  const movement = e.clientX - startX.value
  const nextWidth = startWidth.value + movement

  if (nextWidth >= MIN && nextWidth <= MAX) {
    width.value = nextWidth
  }
}

const handleMouseUp = () => {
  if (!isDragging.value || isMobile()) return

  isDragging.value = false
  animating.value = true

  if (Math.abs(width.value - MIN) < SNAP) {
    width.value = MIN
    return
  }

  if (Math.abs(width.value - MAX) < SNAP) {
    width.value = MAX
    return
  }
}

const toggleCollapsed = () => {
  animating.value = true

  if (!isMobile()) {
    width.value = width.value === MIN ? MAX : MIN
    return
  }

  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}
</script>
