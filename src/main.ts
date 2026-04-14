import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification'
import { useThemeStore } from './stores/theme'

import './assets/main.css'
import 'vue-toastification/dist/index.css'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

const options = {
  // You can set your default options here
}

app.use(Toast, options)

app.mount('#app')

const { currentTheme } = useThemeStore()
document.documentElement.setAttribute('data-theme', currentTheme)
