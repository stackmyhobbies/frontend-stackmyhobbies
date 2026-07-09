<template>
  <div class="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
    <div class="text-center">
      <div class="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-accent"></div>
      <p class="text-base text-base-content">Verificando tu correo electrónico...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const API_PATH_PREFIX = '/api/email/verify/'

onMounted(() => {
  const verifyUrl = route.query.url as string | undefined

  if (!verifyUrl) {
    router.push({ name: 'signIn' })
    return
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(verifyUrl)
  } catch {
    router.push({ name: 'signIn' })
    return
  }

  if (!parsedUrl.pathname.startsWith(API_PATH_PREFIX)) {
    router.push({ name: 'signIn' })
    return
  }

  window.location.href = verifyUrl
})
</script>
