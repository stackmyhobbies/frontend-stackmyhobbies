<template>
  <div class="drawer-content">
    <div class="grid grid-cols-1 grid-rows-[auto_1fr_auto] min-h-screen">
      <nav class="navbar w-full bg-base-300 flex flex-row items-center justify-between p-3">
        <!-- Botón móvil -->
        <menu-mobile />
        <menu-desktop @toggle-collapsed="$emit('toggleCollapsed')" />

        <router-link
          v-if="is_content_item_list"
          :to="{ name: 'content-item-create' }"
          class="btn btn-soft btn-info"
        >
          <add-icon class="size-[1.5em]" />
          Add Hobby
        </router-link>

        <router-link
          v-else-if="is_content_item_create || is_content_item_edit"
          :to="{ name: 'content-item-list' }"
          class="btn btn-soft btn-primary"
        >
          <back-icon class="size-[1.5em]" />
          List of Hobbies
        </router-link>

        <!-- <button-custom @click="toggleStore.open()" custom-class="btn-soft btn-info self-end-safe">
          <template #icon>
            <add-icon class="size-[1.2em]" />
          </template>
Add icon
</button-custom> -->
      </nav>

      <div class="p-4 px-0">
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
import ButtonCustom from '../ButtonCustom.vue'
import AddIcon from '@/shared/icons/svg/AddIcon.vue'

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useToggleStore } from '@/stores/toggle'
import { RouterLink } from 'vue-router'
import BackIcon from '@/shared/icons/svg/BackIcon.vue'

const emits = defineEmits<{ (e: 'toggleCollapsed'): void }>()
const toggleStore = useToggleStore()
const route = useRoute()
const is_content_item_create = computed(() => route.name === 'content-item-create')
const is_content_item_edit = computed(() => route.name === 'content-item-edit')
const is_content_item_list = computed(() => route.name === 'content-item-list')

console.log(is_content_item_create, is_content_item_edit)
</script>

<style scoped></style>
