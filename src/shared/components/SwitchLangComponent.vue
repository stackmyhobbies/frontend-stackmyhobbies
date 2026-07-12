<template>
  <div class="dropdown dropdown-end">
    <div
      ref="button"
      tabindex="0"
      role="button"
      class="btn m-1 btn-ghost"
    >
      {{ showFlag() }} {{ currentLang.toUpperCase() }}
    </div>
    <ul
      tabindex="-1"
      class="dropdown-content menu bg-base-100 rounded-box z-1 w-24 p-2 shadow-sm"
    >
      <li><a @click="changeLang('es')">🇨🇴 ES</a></li>
      <li><a @click="changeLang('en')">🏴󠁧󠁢󠁥󠁮󠁧󠁿 EN</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useLangStore } from '@/stores/lang'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'

const langStore = useLangStore()
const { currentLang } = storeToRefs(useLangStore())
const button = ref()

const showFlag = () => {
  return currentLang.value === 'es' ? '🇨🇴' : '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
}

function changeLang(lang: string) {
  langStore.setLang(lang)
  nextTick(() => {
    ;(document.activeElement as HTMLElement)?.blur()
  })
  console.log('idiom:', lang)
}
</script>

<style scoped></style>
