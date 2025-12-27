<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">


    <header-form :url="reSendEmailImage" alt="icon_resend_email" text_title="ResendEmail" />

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" class="space-y-6" @submit.prevent="onResendEmailVerification">
        <div>
          <button type="submit"
            :class="[
              'flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all']">Reset
            Resend email
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-base-content">
        Do you have an account?
        <router-link :to="{ name: 'signIn' }" class="font-semibold text-indigo-400 hover:text-indigo-300">
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useToast, POSITION } from 'vue-toastification';
import { useAuthStore } from '../stores/auth.store';
import HeaderForm from '../components/HeaderForm.vue';
import reSendEmailImage from '../../../assets/images/resend_email.webp';
import { useRouter } from 'vue-router';


const authStore = useAuthStore();
const router = useRouter()
const toast = useToast();

const email = computed(() => authStore.user?.email)
const isVerified = computed(() => authStore.user?.email_verified_at)

const onResendEmailVerification = async () => {
  const response = await authStore.resendEmail(email.value!)

  if (!response.success) {
    toast('Error al reenviar el correo de validación', {
      position: POSITION.BOTTOM_RIGHT,
      toastClassName: "custom-error-toast",
      bodyClassName: ["custom-class-1"]
    })
    return
  }

  toast('Correo de verificación reenviado', {
    position: POSITION.BOTTOM_RIGHT,
  })

  router.push({ name: 'signIn', query: { from: 'resend-email' } })

}

// Redirigir a signIn si el usuario se desautentica (ej: actualizar página)
watch(() => authStore.isUnAuthenticated, (isUnAuth) => {
  if (isUnAuth) router.push({ name: 'signIn', query: { from: 'resend-email' } })
}, { immediate: true })

watch(isVerified, (value) => {
  if (value) router.push({ name: 'signIn', query: { from: 'resend-email' } })
})

const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  e.preventDefault()
  return ''
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})



</script>


<style>
/* When setting CSS, remember that priority increases with specificity, so don't forget to select the existing classes as well */

.Vue-Toastification__toast--default.custom-error-toast {
  background-color: rgb(158, 50, 50);
}

.Vue-Toastification__toast-body.custom-class-1 {
  font-size: 16px;
}
</style>
