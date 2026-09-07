<template>
  <div class="drawer-content">
    <div class="grid grid-cols-1 grid-rows-[auto_1fr_auto] h-[100dvh] bg-base-200">
      <nav class="navbar w-full bg-base-300 flex flex-row items-center justify-between p-3">
        <!-- Botón móvil -->
        <menu-mobile />
        <menu-desktop @toggle-collapsed="$emit('toggleCollapsed')" />

        <router-link
          v-if="is_content_item_list"
          :to="{ name: 'content-item-create' }"
          class="btn btn-soft btn-accent"
        >
          <add-icon class="size-[1.5em]" />
          {{ t('contentDrawer.add_hobby') }}
        </router-link>

        <router-link
          v-else-if="is_content_item_create || is_content_item_edit || is_content_item_show"
          :to="{ name: 'content-item-list' }"
          class="btn btn-soft btn-accent"
        >
          <back-icon class="size-[1.5em]" />
          {{ t('navigation.listOfHobbies') }}
        </router-link>

        <!-- <button-custom @click="toggleStore.open()" custom-class="btn-soft btn-info self-end-safe">
          <template #icon>
            <add-icon class="size-[1.2em]" />
          </template>
Add icon
</button-custom> -->
      </nav>

      <div
        :class="
          twMerge('p-4 px-0 h-full overflow-y-auto', is_content_item_list ? 'overflow-hidden' : '')
        "
      >
        <router-view />
      </div>

      <dialog
        id="my_modal_5"
        class="modal modal-bottom sm:modal-middle"
        :open="toggleStore.isOpen"
      >
        <div class="modal-box">
          <h3 class="text-lg font-bold">Hello!</h3>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action">
            <button
              class="btn"
              @click="toggleStore.close()"
            >
              Close
            </button>
          </div>
        </div>
        <div
          class="modal-backdrop"
          @click="toggleStore.close()"
        />
      </dialog>
      <footer-component />
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuDesktop from '@/modules/content-items/components/DrawerContent/MenuDesktop.vue'
import MenuMobile from '@/modules/content-items/components/DrawerContent/MenuMobile.vue'
import FooterComponent from '../FooterComponent.vue'
import AddIcon from '@/shared/icons/svg/AddIcon.vue'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useToggleStore } from '@/stores/toggle'
import { RouterLink } from 'vue-router'
import BackIcon from '@/shared/icons/svg/BackIcon.vue'

import { twMerge } from 'tailwind-merge'

defineEmits<{ (e: 'toggleCollapsed'): void }>()
const toggleStore = useToggleStore()
const route = useRoute()
const { t } = useI18n({ useScope: 'global' })
const is_content_item_create = computed(() => route.name === 'content-item-create')
const is_content_item_edit = computed(() => route.name === 'content-item-edit')
const is_content_item_list = computed(() => route.name === 'content-item-list')
const is_content_item_show = computed(() => route.name === 'content-item-show')

console.log(is_content_item_create, is_content_item_edit)
</script>

<style scoped></style>
