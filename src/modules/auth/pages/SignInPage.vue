<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <header-form
      :url="signInImage"
      alt="icon_forgot_password"
      text_title="Sign in to your account"
    />

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        action="#"
        method="POST"
        class="space-y-6"
        @submit.prevent="onSignIn"
      >
        <div>
          <label
            for="login"
            class="block text-sm/6 font-medium text-base-content"
            >Usuario</label
          >
          <div class="mt-2">
            <input
              id="login"
              v-model="signInForm.login"
              placeholder="johndoe o johndoe@gmail.com"
              ref="emailInputRef"
              type="text"
              name="login"
              class="block w-full rounded-md bg-base-100/50 px-3 py-1.5 text-base text-base-content outline-1 -outline-offset-1 outline-base-content/10 placeholder:text-base-content/50 focus:outline-2 focus:-outline-offset-2 focus:outline-accent sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-base-content"
              >Password</label
            >
            <div class="text-sm">
              <router-link
                :to="{ name: 'forgotPassword' }"
                class="font-semibold text-accent hover:text-accent/80"
                >Forgot password?</router-link
              >
            </div>
          </div>
          <div class="mt-2 relative">
            <input
              id="password"
              v-model="signInForm.password"
              ref="passwordInputRef"
              :type="!showPassword ? 'password' : 'text'"
              name="password"
              autocomplete="current-password"
              class="block w-full rounded-md bg-base-100/50 px-3 py-1.5 text-base text-base-content outline-1 -outline-offset-1 outline-base-content/10 placeholder:text-base-content/50 focus:outline-2 focus:-outline-offset-2 focus:outline-accent sm:text-sm/6"
            />

            <button
              type="button"
              class="btn absolute right-0.5 top-0 bg-transparent border-transparent"
              @click="handleShowPassword"
            >
              <Icon
                v-if="!showPassword"
                icon="mingcute:eye-close-fill"
                :inline="true"
              />
              <Icon
                v-else
                icon="mingcute:eye-fill"
                :inline="true"
              />
            </button>
          </div>
        </div>

        <div class="mb-4 flex items-center">
          <input
            class="checkbox checkbox-sm checkbox-neutral"
            v-model="signInForm.rememberMe"
            type="checkbox"
            id="remember"
            name="remember"
          />
          <label
            for="remember"
            class="ml-2 block text-sm/6 font-medium text-base-content"
            >Recuerdame</label
          >
        </div>

        <div>
          <button
            type="submit"
            :disabled="!isFormValid"
            :class="[
              'flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-accent-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all',
              isFormValid
                ? 'bg-accent/85 hover:bg-accent/95'
                : 'bg-base-content/20 text-base-content/40 cursor-not-allowed',
            ]"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-base-content">
        Not a member?
        <router-link
          :to="{ name: 'signUp' }"
          class="font-semibold text-accent hover:text-accent/80"
        >
          Registrar
        </router-link>
      </p>
      <p class="text-center text-sm/6 text-base-content">
        ¿No recibiste el correo?
        <router-link
          :to="{ name: 'resendEmail', query: { email: signInForm.login } }"
          class="font-semibold text-accent hover:text-accent/80"
        >
          Reenviar verificación
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watchEffect } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

import HeaderForm from '../components/HeaderForm.vue'
import signInImage from '../../../assets/images/sign-in.webp'
import { useToast } from '@/shared/composables/useToast'
const toast = useToast()
interface SignInFormInterface {
  login: string
  password: string
  rememberMe: boolean
}

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()
const signInForm: SignInFormInterface = reactive({
  login: '',
  password: '',
  rememberMe: false,
})

const loginInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)

const isFormValid = computed(() => signInForm.login !== '' && signInForm.password !== '')

const showPassword = ref(false)

const handleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const onSignIn = async () => {
  console.log(signInForm.password, 'deberia hacer focus')

  if (signInForm.login === '') {
    loginInputRef.value?.focus()
  }

  if (signInForm.password === '') {
    passwordInputRef.value?.focus()
  }

  if (signInForm.rememberMe) {
    localStorage.setItem('email', signInForm.login)
  } else {
    localStorage.removeItem('email')
  }

  const response = await authStore.signIn(signInForm.login, signInForm.password)

  console.log(response)

  if (!response.success) {
    if ('emailPending' in response && response.emailPending) {
      toast.error(response.message)
      router.push({ name: 'resendEmail', query: { email: signInForm.login } })
      return
    } else {
      const error_message = response.errors ? (response.errors as string) : response.message
      toast.error(error_message)
      return
    }
  }

  toast.success(response.message)
  router.push({ name: 'content-item-list' })
}

watchEffect(() => {
  if (route.query.from === 'resend-email') {
    authStore.signOut()
  }
})

watchEffect(() => {
  const emailParams = route.query?.email

  if (emailParams) {
    signInForm.login = emailParams as string
  }

  const email = localStorage.getItem('email')

  if (email && !emailParams) {
    signInForm.login = email
    signInForm.rememberMe = true
  }
})
</script>

<style>
/* When setting CSS, remember that priority increases with specificity, so don't forget to select the existing classes as well */
</style>
