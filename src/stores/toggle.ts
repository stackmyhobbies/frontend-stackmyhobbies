import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useToggleStore = defineStore('toggle', () => {
  const isOpen = ref<boolean>(false)
  function open() {
    isOpen.value = true
  }
  function close() {
    isOpen.value = false
  }
  function switchToggle() {
    isOpen.value = !isOpen.value
  }
  return { isOpen, switchToggle, open, close }
})
