import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useThemeStore } from './stores/theme'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import './assets/main.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import i18n from './i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(i18n)

const { currentTheme } = useThemeStore()

app.use(Vue3Toastify, {
  autoClose: 3000,
} satisfies ToastContainerOptions)

app.mount('#app')

document.documentElement.setAttribute('data-theme', currentTheme)
