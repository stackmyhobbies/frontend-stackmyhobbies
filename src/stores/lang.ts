import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import i18n from '@/i18n'

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref(localStorage.getItem('lang') || 'es')

  const setLang = (lang: string) => {
    currentLang.value = lang
    localStorage.setItem('lang', lang)
    ;(i18n.global.locale as { value: string }).value = lang
  }

  const isLangEs = computed(() => {
    return currentLang.value === 'es'
  })

  const isLangEn = computed(() => {
    return currentLang.value === 'en'
  })

  return {
    isLangEn,
    isLangEs,
    currentLang,
    setLang,
  }
})
