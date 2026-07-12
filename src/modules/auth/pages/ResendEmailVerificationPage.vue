<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <header-form
      :url="reSendEmailImage"
      alt="icon_resend_email"
      text_title="Reenviar verificación"
    />

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        action="#"
        method="POST"
        class="space-y-6"
        @submit.prevent="onResendEmailVerification"
      >
        <div>
          <label
            for="email"
            class="block text-sm/6 font-medium text-base-content"
            >Correo electrónico</label
          >
          <div class="mt-2">
            <input
              id="email"
              v-model="emailInput"
              type="email"
              name="email"
              autocomplete="email"
              required
              :placeholder="emailInput ? '' : 'tu@correo.com'"
              class="block w-full rounded-md bg-base-100/50 px-3 py-1.5 text-base text-base-content outline-1 -outline-offset-1 outline-base-content/10 placeholder:text-base-content/50 focus:outline-2 focus:-outline-offset-2 focus:outline-accent sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="!emailInput"
            :class="[
              'flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-accent-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all',
              emailInput
                ? 'bg-accent hover:bg-accent/90'
                : 'bg-base-content/20 text-base-content/40 cursor-not-allowed',
            ]"
          >
            Reenviar correo de verificación
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-base-content">
        ¿Ya tienes cuenta?
        <router-link
          :to="{ name: 'signIn' }"
          class="font-semibold text-accent hover:text-accent/80"
        >
          Iniciar sesión
        </router-link>
      </p>
      <p class="text-center text-sm/6 text-base-content">
        Not a member?
        <router-link
          :to="{ name: 'signUp' }"
          class="font-semibold text-accent hover:text-accent/80"
        >
          Registrar
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import HeaderForm from '../components/HeaderForm.vue'
import reSendEmailImage from '../../../assets/images/resend_email.webp'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/shared/composables/useToast'

const toast = useToast()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const emailInput = ref('')

const emailFromStore = computed(() => authStore.user?.email ?? '')

const isValidEmail = (value: unknown): value is string => {
  if (typeof value !== 'string' || !value.trim()) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

watchEffect(() => {
  if (isValidEmail(route.query?.email)) {
    emailInput.value = route.query.email
  } else if (emailFromStore.value) {
    emailInput.value = emailFromStore.value
  }
})

const onResendEmailVerification = async () => {
  if (!emailInput.value) return

  const response = await authStore.resendEmail(emailInput.value)

  if (!response.success) {
    toast.error('Error al reenviar el correo de verificación')
    return
  }

  toast.success('Correo de verificación reenviado. Revisa tu bandeja de entrada.')

  router.push({ name: 'signIn', query: { from: 'resend-email', email: emailInput.value } })
}
</script>

<style>
/* When setting CSS, remember that priority increases with specificity, so don't forget to select the existing classes as well */
</style>
