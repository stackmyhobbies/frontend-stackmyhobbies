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

// estado del ancho
const width = ref<number>(MIN)

// animación
const animating = ref<boolean>(false)

// drag desktop
const isDragging = ref<boolean>(false)
const startX = ref<number>(0)
const startWidth = ref<number>(MIN)

// móvil
const isMobileSidebarOpen = ref(false)
const mobileDragging = ref(false)
const mobileStartX = ref(0)
const mobileStartWidth = ref(0)

const isMobile = () => window.innerWidth <= 768

// Sincronizar apertura con ancho (para cuando se abre por botón o backdrop)
watch(isMobileSidebarOpen, (isOpen) => {
  if (mobileDragging.value) return // Si estamos arrastrando, no interferir

  if (isOpen) {
    width.value = MAX
  }
  // No restablecer a 0 al cerrar: dejar que DaisyUI haga el slide-out transición con el ancho completo.
  // Si reducimos el ancho a 0 mientras sale, causa parpadeo visual.
})

//
// -------------------------------
// DRAG DESKTOP
// -------------------------------
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

//
// -------------------------------
// DRAG MÓVIL
// -------------------------------
const handleTouchStart = (e: TouchEvent) => {
  if (!isMobile()) return

  const x = e.touches[0].clientX

  // Si está cerrado, solo permitir arrastre desde borde izquierdo (zona de 30px)
  if (!isMobileSidebarOpen.value && x > 30) return

  mobileDragging.value = true
  animating.value = false // Desactivar transición mientras arrastramos
  mobileStartX.value = x

  // Si abrimos desde 0, el ancho inicial es lo que tenga (0 o MIN).
  // Si ya está abierto, será MAX.
  mobileStartWidth.value = isMobileSidebarOpen.value ? width.value : 0

  // IMPORTANTE: Al empezar a arrastrar desde el borde, "abrimos" lógicamente el drawer
  // para que se vea el backdrop y el contenido, pero controlamos el ancho manualmente.
  if (!isMobileSidebarOpen.value) {
    isMobileSidebarOpen.value = true
    width.value = 0 // Empezamos visualmente desde 0
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (!mobileDragging.value || !isMobile()) return

  const x = e.touches[0].clientX
  const delta = x - mobileStartX.value

  // Calculamos nuevo ancho
  let newWidth = mobileStartWidth.value + delta

  // Limitar entre 0 y MAX
  newWidth = Math.max(0, Math.min(MAX, newWidth))
  width.value = newWidth
}

const handleTouchEnd = () => {
  if (!mobileDragging.value || !isMobile()) return

  mobileDragging.value = false
  animating.value = true // Reactivar transición para el snap

  const threshold = MAX / 3 // Umbral para decidir si abrir o cerrar (un tercio)

  if (width.value > threshold) {
    // Abrir completo
    width.value = MAX
    isMobileSidebarOpen.value = true // Asegurar que quede marcado como abierto
  } else {
    // Cerrar
    width.value = 0
    isMobileSidebarOpen.value = false // Esto ocultará el backdrop también tras la animación
  }
}

//
// -------------------------------
// BOTÓN MANUAL
// -------------------------------
const toggleCollapsed = () => {
  animating.value = true

  if (!isMobile()) {
    width.value = width.value === MIN ? MAX : MIN
    return
  }

  // móvil: simple toggle de la variable reactiva
  // el watcher se encargará del ancho
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

//
// -------------------------------
// EVENTOS TOUCH (GLOBAL)
// -------------------------------
onMounted(() => {
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchmove', handleTouchMove, { passive: false }) // passive false por si quisiéramos preventDefault
  window.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<style></style>
