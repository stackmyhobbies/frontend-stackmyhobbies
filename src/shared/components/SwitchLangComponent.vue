<template>
  <BaseDropdown>
    <template #trigger="{ toggle }">
      <button
        class="btn m-1 btn-ghost"
        @click="toggle"
        aria-haspopup="true"
      >
        {{ showFlag() }} {{ currentLang.toUpperCase() }}
      </button>
    </template>

    <template #content="{ close }">
      <ul class="menu bg-base-100 rounded-box w-24 p-2 shadow-sm">
        <li><a @click="changeLang('es', close)">🇨🇴 ES</a></li>
        <li><a @click="changeLang('en', close)">🏴󠁧󠁢󠁥󠁮󠁧󠁿 EN</a></li>
      </ul>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
import { useLangStore } from '@/stores/lang'
import { storeToRefs } from 'pinia'
import BaseDropdown from '@/shared/components/BaseDropdown.vue'

const langStore = useLangStore()
const { currentLang } = storeToRefs(useLangStore())

const showFlag = () => (currentLang.value === 'es' ? '🇨🇴' : '🏴󠁧󠁢󠁥󠁮󠁧󠁿')

function changeLang(lang: string, close: () => void) {
  langStore.setLang(lang)
  close()
}
</script>
