<template>
  <div class="drawer-side">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>

    <div class="flex min-h-full flex-col items-start bg-base-200 relative" :style="{
      width: width + 'px',
      transition: animating && !isDragging ? 'width 0.15s ease-out' : 'none',
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
          <button class="flex items-center gap-3 tooltip tooltip-right" :data-tip="width <= MIN + 10 ? 'Settings' : ''">
            <span class="w-6 h-6 flex items-center justify-center">⚙️</span>
            <span v-if="width > MIN + 10">Settings</span>
          </button>
        </li>
      </ul>

      <button type="button" class="btn btn-outline-primary" @click="onSignOut">salir</button>

      <!-- BOTÓN MANUAL -->
      <button class="btn btn-sm m-2" @click="toggleCollapsed">
        {{ width === MIN ? 'Expandir' : 'Colapsar' }}
      </button>

      <!-- HANDLE DRAG DESKTOP -->
      <div class="absolute top-0 right-0 h-full bg-base-300 cursor-col-resize" style="width: 6px"
        @mousedown="handleMouseDown"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { useRouter } from 'vue-router'
const props = defineProps<{
  width: number
  animating: boolean
  isDragging: boolean
  min: number
}>()

const emits = defineEmits<{
  (e: 'toggleCollapsed'): void
  (e: 'mouseDown', event: MouseEvent): void
}>()
const MIN = props.min

const toggleCollapsed = () => {
  emits('toggleCollapsed')
}

const handleMouseDown = (event: MouseEvent) => {
  emits('mouseDown', event)
}

const router = useRouter()
const authStore = useAuthStore()

const onSignOut = () => {
  authStore.signOut()
  router.push({ name: 'signIn' })
}
</script>

<style scoped></style>
