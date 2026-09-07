<template>
  <div class="drawer-side max-lg:z-50">
    <label
      for="drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>

    <div
      class="flex min-h-full flex-col items-stretch bg-base-200 relative lg:overflow-hidden max-lg:transition-none will-change-[width]"
      :style="{
        width: width + 'px',
        transition: animating && !isDragging ? 'width 0.15s ease-out' : 'none',
      }"
    >
      <!-- HEADER -->
      <header class="px-5 pt-6 pb-4">
        <h1
          class="text-lg font-bold tracking-widest uppercase text-base-content whitespace-nowrap"
          :class="isNarrow ? 'hidden' : ''"
        >
          StackMyHobbies
        </h1>
        <p
          class="text-xs text-base-content/60 whitespace-nowrap"
          :class="isNarrow ? 'hidden' : ''"
        >
          Hobbies Management
        </p>
      </header>

      <!-- MAIN MENU -->
      <ul class="menu w-full grow px-2 gap-1">
        <li
          v-for="item in listItem"
          :key="item.name_path"
        >
          <RouterLink
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2.5 whitespace-nowrap"
            :class="{
              'bg-indigo-500/20 border-l-4 border-cyan-400 text-cyan-400 font-medium': isActive(
                item.name_path,
              ),
            }"
          >
            <Icon
              :icon="item.icon"
              class="w-5 h-5 shrink-0"
            />
            <span
              class="text-sm"
              :class="isNarrow ? 'hidden' : ''"
              >{{ t(`nav.main.${item.label}`) }}</span
            >
          </RouterLink>
        </li>
      </ul>

      <!-- COLLAPSE TOGGLE (only visible when collapsed) -->
      <div
        v-if="isNarrow"
        class="flex items-center justify-center py-2"
      >
        <button
          type="button"
          class="btn btn-square btn-sm btn-ghost"
          :aria-label="t('navigation.expandSidebar')"
          @click="toggleCollapsed"
        >
          <Icon
            icon="lucide:chevron-right"
            class="w-5 h-5"
          />
        </button>
      </div>

      <!-- ADD NEW TITLE -->
      <div
        class="px-3 py-2"
        :class="isNarrow ? 'flex justify-center' : ''"
      >
        <RouterLink
          v-if="isNarrow"
          :to="{ name: 'content-item-create' }"
          class="btn btn-soft btn-accent btn-square"
          :aria-label="t('navigation.addNewTitle')"
        >
          <Icon
            icon="lucide:plus"
            class="w-5 h-5"
          />
        </RouterLink>
        <RouterLink
          v-else
          :to="{ name: 'content-item-create' }"
          class="btn btn-soft btn-accent w-full"
        >
          <Icon
            icon="lucide:plus"
            class="w-5 h-5 shrink-0"
          />
          {{ t('nav.footer.add_hobby') }}
        </RouterLink>
      </div>

      <!-- FOOTER MENU -->
      <ul class="menu w-full px-2 py-3 gap-1">
        <li>
          <button
            type="button"
            @click="onSignOut"
            class="flex items-center gap-3 px-3 py-2 rounded-lg whitespace-nowrap w-full"
          >
            <Icon
              icon="lucide:log-out"
              class="w-5 h-5 shrink-0"
            />
            <span
              class="text-sm"
              :class="isNarrow ? 'hidden' : ''"
              >{{ t('nav.footer.logout') }}</span
            >
          </button>
        </li>
      </ul>

      <!-- HANDLE DRAG DESKTOP -->
      <div
        class="absolute top-0 right-0 h-full bg-base-300 cursor-col-resize"
        style="width: 6px"
        @mousedown="handleMouseDown"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps<{
  width: number
  animating: boolean
  isDragging: boolean
  min: number
}>()

interface itemLinks {
  label: string
  icon: string
  path: string
  name_path: string
}

const listItem: itemLinks[] = [
  {
    label: 'home',
    icon: 'lucide:layout-grid',
    path: '/content-items/list',
    name_path: 'content-item-list',
  },
]

const emits = defineEmits<{
  (e: 'toggleCollapsed'): void
  (e: 'mouseDown', event: MouseEvent): void
}>()

const isNarrow = computed(() => props.width <= props.min + 10)

const toggleCollapsed = () => {
  emits('toggleCollapsed')
}

const handleMouseDown = (event: MouseEvent) => {
  emits('mouseDown', event)
}

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n({ useScope: 'global' })

const isActive = (name: string) => route.name === name

const onSignOut = () => {
  authStore.signOut()
  router.push({ name: 'signIn' })
}
</script>
