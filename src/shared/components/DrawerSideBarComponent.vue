<template>
  <div class="drawer lg:drawer-open select-none" @mousemove="handleMouseMove" @mouseup="handleMouseUp">
    <input id="drawer" type="checkbox" class="drawer-toggle" />

    <!-- MAIN CONTENT -->
    <div class="drawer-content">
      <nav class="navbar w-full bg-base-300">
        <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
          MENU
        </label>
        <div class="px-4">Navbar Title</div>
      </nav>

      <div class="p-4">Page Content</div>
    </div>

    <!-- SIDEBAR -->
    <div class="drawer-side">
      <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>

      <div class="flex min-h-full flex-col items-start bg-base-200 relative" :style="{
        width: width + 'px',
        transition: (animating && !isDragging) ? 'width 0.15s ease-out' : 'none'
      }">
        <!-- MENU -->
        <ul class="menu w-full grow">

          <!-- HOME -->
          <li>
            <button class="flex items-center gap-3 tooltip tooltip-right" :data-tip="width <= MIN + 10 ? 'Home' : ''">
              <span class="w-6 h-6 flex items-center justify-center">🏠</span>
              <span v-if="width > MIN + 10">Home</span>
            </button>
          </li>

          <!-- SETTINGS -->
          <li>
            <button class="flex items-center gap-3 tooltip tooltip-right"
              :data-tip="width <= MIN + 10 ? 'Settings' : ''">
              <span class="w-6 h-6 flex items-center justify-center">⚙️</span>
              <span v-if="width > MIN + 10">Settings</span>
            </button>
          </li>

        </ul>

        <!-- BOTÓN MANUAL -->
        <button class="btn btn-sm m-2" @click="toggleCollapsed">
          {{ width === MIN ? "Expandir" : "Colapsar" }}
        </button>

        <!-- HANDLE DRAG DESKTOP -->
        <div class="absolute top-0 right-0 h-full bg-base-300 cursor-col-resize" style="width: 6px"
          @mousedown="handleMouseDown"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const MIN = 64;
const MAX = 256;
const SNAP = 30;

// estado del ancho
const width = ref<number>(MIN);

// animación
const animating = ref<boolean>(false);

// drag desktop
const isDragging = ref<boolean>(false);
const startX = ref<number>(0);
const startWidth = ref<number>(MIN);

// móvil
const isMobileSidebarOpen = ref(false);
const mobileDragging = ref(false);
const mobileStartX = ref(0);
const mobileStartWidth = ref(0);

const isMobile = () => window.innerWidth <= 768;

//
// -------------------------------
// DRAG DESKTOP
// -------------------------------
const handleMouseDown = (e: MouseEvent) => {
  if (isMobile()) return;

  isDragging.value = true;
  animating.value = false;
  startX.value = e.clientX;
  startWidth.value = width.value;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || isMobile()) return;

  const movement = e.clientX - startX.value;
  const nextWidth = startWidth.value + movement;

  if (nextWidth >= MIN && nextWidth <= MAX) {
    width.value = nextWidth;
  }
};

const handleMouseUp = () => {
  if (!isDragging.value || isMobile()) return;

  isDragging.value = false;
  animating.value = true;

  if (Math.abs(width.value - MIN) < SNAP) {
    width.value = MIN;
    return;
  }

  if (Math.abs(width.value - MAX) < SNAP) {
    width.value = MAX;
    return;
  }
};

//
// -------------------------------
// DRAG MÓVIL (DESDE EL BORDE)
// -------------------------------
const handleTouchStart = (e: TouchEvent) => {
  if (!isMobile()) return;

  const x = e.touches[0].clientX;

  // Si está cerrado, solo permitir arrastre desde borde
  if (!isMobileSidebarOpen.value && x > 20) return;

  mobileDragging.value = true;
  mobileStartX.value = x;
  mobileStartWidth.value = isMobileSidebarOpen.value ? MAX : 0;
};

const handleTouchMove = (e: TouchEvent) => {
  if (!mobileDragging.value || !isMobile()) return;

  const x = e.touches[0].clientX;
  const delta = x - mobileStartX.value;
  let newWidth = mobileStartWidth.value + delta;

  newWidth = Math.max(0, Math.min(MAX, newWidth));
  width.value = newWidth;
};

const handleTouchEnd = () => {
  if (!mobileDragging.value || !isMobile()) return;

  mobileDragging.value = false;
  animating.value = true;

  // abrir si supera el umbral
  if (width.value > 80) {
    width.value = MAX;
    isMobileSidebarOpen.value = true;
  } else {
    width.value = 0;
    isMobileSidebarOpen.value = false;
  }
};

//
// -------------------------------
// BOTÓN MANUAL
// -------------------------------
const toggleCollapsed = () => {
  animating.value = true;

  if (!isMobile()) {
    width.value = width.value === MIN ? MAX : MIN;
    return;
  }

  // móvil
  if (isMobileSidebarOpen.value) {
    width.value = 0;
    isMobileSidebarOpen.value = false;
  } else {
    width.value = MAX;
    isMobileSidebarOpen.value = true;
  }
};

//
// -------------------------------
// EVENTOS TOUCH (GLOBAL)
// -------------------------------
onMounted(() => {
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", handleTouchMove);
  window.addEventListener("touchend", handleTouchEnd);
});

onUnmounted(() => {
  window.removeEventListener("touchstart", handleTouchStart);
  window.removeEventListener("touchmove", handleTouchMove);
  window.removeEventListener("touchend", handleTouchEnd);
});
</script>

<style scoped>
div[style*="cursor-col-resize"]:hover {
  background-color: #bfbfbf;
}
</style>
