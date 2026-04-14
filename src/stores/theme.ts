import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref(localStorage.getItem('theme') || 'night')

  const setTheme = (theme: string) => {
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return { currentTheme, setTheme }
})
