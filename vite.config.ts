import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('calendar-'),
        },
      },
    }),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content-queries': fileURLToPath(
        new URL('./src/modules/content-items/queries', import.meta.url),
      ),
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '@shared-components': fileURLToPath(new URL('./src/shared/components', import.meta.url)),
    },
  },
})
