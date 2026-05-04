<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <header-form
      :url="resetPasswordImage"
      alt="icon_reset_password"
      text_title="Reset your password"
    />

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        @submit.prevent="onResetPassword"
      >
        <div>
          <label
            for="password"
            class="block text-sm/6 font-medium text-base-content"
            >New Password</label
          >
          <div class="mt-2">
            <input
              id="password"
              v-model="resetForm.password"
              ref="passwordInputRef"
              type="password"
              name="password"
              :class="[
                'block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-base-content outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6',
                { 'border-2 border-red-500': passwordError },
              ]"
            />
          </div>
          <p
            v-if="passwordError"
            class="mt-2 text-sm text-red-500"
          >
            Password is required and must be at least 6 characters.
          </p>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block text-sm/6 font-medium text-base-content"
            >Confirm Password</label
          >
          <div class="mt-2">
            <input
              id="confirmPassword"
              v-model="resetForm.confirmPassword"
              type="password"
              name="confirmPassword"
              :class="[
                'block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-base-content outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6',
                { 'border-2 border-red-500': confirmPasswordError },
              ]"
            />
          </div>
          <p
            v-if="confirmPasswordError"
            class="mt-2 text-sm text-red-500"
          >
            Passwords do not match.
          </p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all disabled:opacity-50"
          >
            {{ isLoading ? 'Resetting...' : 'Reset Password' }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-base-content">
        Remember your password?
        <router-link
          :to="{ name: 'signIn' }"
          class="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import HeaderForm from '../components/HeaderForm.vue'
import resetPasswordImage from '../../../assets/images/forgot_password.webp'
import { ResetPasswordAction } from '../actions/reset-password.action'

interface ResetPasswordForm {
  password: string
  confirmPassword: string
}

const router = useRouter()
const route = useRoute()

const resetForm: ResetPasswordForm = reactive({
  password: '',
  confirmPassword: '',
})

const passwordInputRef = ref<HTMLInputElement | null>(null)
const passwordError = ref(false)
const confirmPasswordError = ref(false)
const isLoading = ref(false)

const token = ref('')
const email = ref('')

onMounted(() => {
  token.value = (route.query.token as string) || ''
  email.value = (route.query.email as string) || ''

  console.log(token.value, email.value)

  if (!token.value || !email.value) {
    toast.error('Invalid reset link', {
      position: toast.POSITION.BOTTOM_RIGHT,
      toastClassName: 'custom-error-toast',
    })
    router.push({ name: 'signIn' })
  }
})

const validateForm = (): boolean => {
  passwordError.value = resetForm.password.length < 6
  confirmPasswordError.value = resetForm.password !== resetForm.confirmPassword

  return !passwordError.value && !confirmPasswordError.value
}

const onResetPassword = async () => {
  if (!validateForm()) {
    passwordInputRef.value?.focus()
    return
  }

  isLoading.value = true

  try {
    const result = await ResetPasswordAction(
      token.value,
      email.value,
      resetForm.password,
      resetForm.confirmPassword,
    )
    console.log(result, 'Aqui deberia estar llegar')
    if (result.success) {
      toast.success('Password reset successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastClassName: 'custom-success-toast',
      })
      router.push({ name: 'signIn' })
    } else {
      toast.error(result.message || 'Error resetting password', {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastClassName: 'custom-error-toast',
      })
    }
  } catch (error) {
    toast.error('Error resetting password', {
      position: toast.POSITION.BOTTOM_RIGHT,
      toastClassName: 'custom-error-toast',
    })
  } finally {
    isLoading.value = false
  }
}

watch(
  () => resetForm.password,
  () => {
    if (passwordError.value) passwordError.value = false
  },
)

watch(
  () => resetForm.confirmPassword,
  () => {
    if (confirmPasswordError.value) confirmPasswordError.value = false
  },
)
</script>

<style>
.Vue-Toastification__toast--default.custom-error-toast {
  background-color: rgb(158, 50, 50);
}

.Vue-Toastification__toast--default.custom-success-toast {
  background-color: rgb(34, 197, 94);
}
</style>
