import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const LIGHT_THEMES = ['pastel', 'light', 'light-purple']
export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref(localStorage.getItem('theme') || 'night')

  const setTheme = (theme: string) => {
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  const isLightTheme = computed(() => {
    return LIGHT_THEMES.includes(currentTheme.value)
  })
  const isDarkTheme = computed(() => {
    return !isLightTheme.value
  })

  return { currentTheme, isDarkTheme, isLightTheme, setTheme }
})
