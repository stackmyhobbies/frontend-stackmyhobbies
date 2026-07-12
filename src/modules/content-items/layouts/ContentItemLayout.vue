<template>
  <div
    class="drawer lg:drawer-open select-none"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
  >
    <input
      id="drawer"
      type="checkbox"
      class="drawer-toggle"
      v-model="isMobileSidebarOpen"
    />
    <side-bar-component
      :width="width"
      :is-dragging="isDragging"
      :animating="animating"
      :min="MIN"
      @mouse-down="handleMouseDown"
      @toggle-collapsed="toggleCollapsed"
    />
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
const mobileDragging = ref(false)
const mobileStartX = ref(0)
const mobileStartWidth = ref(0)

const isMobile = () => window.innerWidth < 1024

watch(isMobileSidebarOpen, (isOpen) => {
  if (mobileDragging.value) return

  if (isMobile()) {
    animating.value = false
  }

  width.value = isOpen ? MAX : 0
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
  if (!isMobile()) {
    animating.value = true
    width.value = width.value === MIN ? MAX : MIN
    return
  }

  animating.value = false
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const handleTouchStart = (e: TouchEvent) => {
  if (!isMobile()) return

  const x = e.touches[0].clientX

  if (!isMobileSidebarOpen.value && x > 30) return

  mobileDragging.value = true
  animating.value = false
  mobileStartX.value = x

  mobileStartWidth.value = isMobileSidebarOpen.value ? width.value : 0

  if (!isMobileSidebarOpen.value) {
    isMobileSidebarOpen.value = true
    width.value = 0
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (!mobileDragging.value || !isMobile()) return

  e.preventDefault()

  const x = e.touches[0].clientX
  const delta = x - mobileStartX.value

  let newWidth = mobileStartWidth.value + delta

  newWidth = Math.max(0, Math.min(MAX, newWidth))
  width.value = newWidth
}

const handleTouchEnd = () => {
  if (!mobileDragging.value || !isMobile()) return

  mobileDragging.value = false
  animating.value = false

  const threshold = MAX / 3

  if (width.value > threshold) {
    width.value = MAX
    isMobileSidebarOpen.value = true
  } else {
    width.value = 0
    isMobileSidebarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  window.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>
