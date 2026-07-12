<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <header-form
      :url="signUpImage"
      alt="icon_sign_up"
      text_title="Sign in to your account"
    />

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        @submit.prevent="onSignUp"
        class="space-y-6"
        autocomplete="off"
      >
        <!-- Username -->
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-base-content"
            >Usuario</label
          >
          <div class="mt-2">
            <input
              id="username"
              v-model.trim="signUpForm.username"
              @blur="touched.username = true"
              ref="usernameInputRef"
              placeholder="Ej: johndoe019"
              type="text"
              class="block w-full rounded-md bg-base-100/50 px-3 py-1.5 text-base text-base-content outline-1 outline-base-content/10 placeholder:text-base-content/50 focus:outline-2 focus:outline-accent sm:text-sm"
            />
            <span
              v-if="showError('username')"
              class="text-error text-sm"
            >
              El usuario debe tener al menos 3 caracteres
            </span>
          </div>
        </div>

        <!-- First Name -->
        <div>
          <label
            for="first_name"
            class="block text-sm font-medium text-base-content"
            >Nombres</label
          >
          <div class="mt-2">
            <input
              id="first_name"
              v-model.trim="signUpForm.first_name"
              @blur="touched.first_name = true"
              placeholder="Ej: John"
              type="text"
              class="block w-full rounded-md bg-base-100/50 px-3 py-1.5 text-base text-base-content outline-1 outline-base-content/10 placeholder:text-base-content/50 focus:outline-2 focus:outline-accent sm:text-sm"
            />
            <span
              v-if="showError('first_name')"
              class="text-error text-sm"
            >
              El nombre es obligatorio
            </span>
          </div>
        </div>

        <!-- Last Name -->
        <div>
          <label
            for="last_name"
            class="block text-sm font-medium text-base-content"
            >Apellidos</label
          >
          <div class="mt-2">
            <input
              id="last_name"
              v-model.trim="signUpForm.last_name"
              @blur="touched.last_name = true"
              placeholder="Ej: Doe"
              type="text"
              class="block w-full rounded-md bg-base-100/50 px-3 py-1.5 text-base text-base-content outline-1 outline-base-content/10 placeholder:text-base-content/50 focus:outline-2 focus:outline-accent sm:text-sm"
            />
            <span
              v-if="showError('last_name')"
              class="text-error text-sm"
            >
              El apellido es obligatorio
            </span>
          </div>
        </div>

        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-base-content"
            >Correo Electrónico</label
          >
          <div class="mt-2">
            <input
              id="email"
              v-model.trim="signUpForm.email"
              @blur="touched.email = true"
              placeholder="Ej: johndoe@example.com"
              type="text"
              class="block w-full rounded-md bg-base-100/50 px-3 py-1.5 text-base text-base-content outline-1 outline-base-content/10 placeholder:text-base-content/50 focus:outline-2 focus:outline-accent sm:text-sm"
            />
            <span
              v-if="showError('email')"
              class="text-error text-sm"
            >
              El correo electrónico no es válido
            </span>
          </div>
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-base-content"
            >Contraseña</label
          >
          <div class="mt-2 relative">
            <input
              id="password"
              v-model="signUpForm.password"
              @blur="touched.password = true"
              type="password"
              class="block w-full rounded-md bg-base-100/50 px-3 py-1.5 text-base text-base-content outline-1 outline-base-content/10 placeholder:text-base-content/50 focus:outline-2 focus:outline-accent sm:text-sm"
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
            <span
              v-if="showError('password')"
              class="text-error text-sm"
            >
              La contraseña debe tener al menos 6 caracteres
            </span>
          </div>
        </div>

        <!-- Submit -->
        <div>
          <button
            type="submit"
            :disabled="!isFormValid || isSubmitting"
            :class="[
              'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-accent-content transition-all',
              isFormValid && !isSubmitting
                ? 'bg-accent hover:bg-accent/90 focus-visible:outline-accent'
                : 'bg-base-content/20 text-base-content/40 cursor-not-allowed',
            ]"
          >
            <template v-if="isSubmitting">
              <svg
                class="animate-spin h-5 w-5 mr-2 text-accent-content"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Creando cuenta...
            </template>
            <template v-else> Registrarme </template>
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
        ¿No recibiste el correo?
        <router-link
          :to="{ name: 'resendEmail', query: { email: signUpForm.email } }"
          class="font-semibold text-accent hover:text-accent/80"
        >
          Reenviar verificación
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'

import { useRouter } from 'vue-router'
import HeaderForm from '../components/HeaderForm.vue'

import signUpImage from '@/assets/images/sign-up.webp'
import { useToast } from '@/shared/composables/useToast'
import { Icon } from '@iconify/vue'

interface SignUpFormInterface {
  username: string
  password: string
  first_name: string
  last_name: string
  email: string
}

const toast = useToast()
const showPassword = ref(false)

const handleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const signUpForm = reactive<SignUpFormInterface>({
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  email: '',
})

// Estado para saber qué campos han sido tocados
const touched = reactive<Record<keyof SignUpFormInterface, boolean>>({
  username: false,
  password: false,
  first_name: false,
  last_name: false,
  email: false,
})

const router = useRouter()
const isSubmitting = ref(false)

// Validaciones reactivas
const isUsernameValid = computed(() => signUpForm.username.trim().length >= 3)
const isPasswordValid = computed(() => signUpForm.password.length >= 6)
const isEmailValid = computed(() => /\S+@\S+\.\S+/.test(signUpForm.email))
const isFirstNameValid = computed(() => signUpForm.first_name.trim() !== '')
const isLastNameValid = computed(() => signUpForm.last_name.trim() !== '')

const isFormValid = computed(
  () =>
    isUsernameValid.value &&
    isPasswordValid.value &&
    isEmailValid.value &&
    isFirstNameValid.value &&
    isLastNameValid.value,
)

const usernameInputRef = ref<HTMLInputElement | null>(null)
const formSubmitted = ref(false)

// Mostrar error solo si fue tocado o el formulario fue enviado
const showError = (field: keyof SignUpFormInterface) => {
  if (!formSubmitted.value && !touched[field]) return false
  switch (field) {
    case 'username':
      return !isUsernameValid.value
    case 'password':
      return !isPasswordValid.value
    case 'email':
      return !isEmailValid.value
    case 'first_name':
      return !isFirstNameValid.value
    case 'last_name':
      return !isLastNameValid.value
  }
}
const authStore = useAuthStore()
const onSignUp = async () => {
  formSubmitted.value = true

  if (!isFormValid.value) {
    usernameInputRef.value?.focus()
    console.warn('Formulario inválido ❌')
    return
  }
  isSubmitting.value = true // ⏳ Inicia carga
  const { success, errors, data } = await authStore.signUp({ ...signUpForm })

  isSubmitting.value = false

  if (!success) {
    const fieldErrors = errors as Record<string, any> | undefined
    if (fieldErrors?.username) {
      toast.error('El usuario ya ha sido registro')

      return
    }

    if (fieldErrors?.email) {
      toast.error('El correo electronico ya han sido registrado')
      return
    }

    return
  }

  toast.success('¡Registro exitoso!\nConfirma tu cuenta desde el correo que te enviamos.')

  router.push({ name: 'signIn', query: { email: data?.email } })
  console.log('Formulario válido ✅', { ...signUpForm })
}
</script>

<style>
/* When setting CSS, remember that priority increases with specificity, so don't forget to select the existing classes as well */
</style>
