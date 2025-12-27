<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">


    <header-form :url="forgotPasswordImage" alt="icon_forgot_password" text_title="Sign in to your account" />

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" class="space-y-6" @submit.prevent="onForgotPassword">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-base-content">Email</label>
          <div class="mt-2">
            <input id="email" v-model="forgotPasswordForm.email" placeholder="johndoe@gmail.com" ref="emailInputRef"
              type="text" name="email" :class="[
                'block w-full rounded-md  bg-white/5 px-3 py-1.5 text-base text-base-content outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6',
                { 'border-2 border-red-500': emailError }
              ]" />
          </div>
          <p v-if="emailError" class="mt-2 text-sm text-red-500">
            The email field is required.
          </p>
        </div>

        <div>
          <button type="submit"
            :class="[
              'flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all']">Reset
            Password
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


<script lang="ts" setup>
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useRoute, useRouter } from 'vue-router';
import { POSITION, useToast } from 'vue-toastification'
import HeaderForm from '../components/HeaderForm.vue';
import forgotPasswordImage from "../../../assets/images/forgot_password.webp"



interface ForgotPasswordFormInterface {
  email: string,
}

const router = useRouter();
const route = useRoute();


const toast = useToast();

const authStore = useAuthStore();
const forgotPasswordForm: ForgotPasswordFormInterface = reactive({
  email: '',
})

const emailInputRef = ref<HTMLInputElement | null>(null);
const emailError = ref(false);

const isFormValid = computed(() => forgotPasswordForm.email !== "");

const onForgotPassword = async () => {

  console.log(forgotPasswordForm.email, 'deberia hacer focus')

  if (forgotPasswordForm.email === '') {
    console.log('Aqui')
    emailError.value = true
    emailInputRef.value?.focus();
    return
  }

  console.log(forgotPasswordForm.email)

  const forgotPasswordResponse = await authStore.forgotPassword(forgotPasswordForm.email);


  if (!forgotPasswordResponse?.success) {
    const errorMessage = forgotPasswordResponse.errors?.email?.[0] || forgotPasswordResponse.message || 'Error al enviar email de recuperación'
    toast(errorMessage, {
      position: POSITION.BOTTOM_RIGHT,
      toastClassName: "custom-error-toast",
      bodyClassName: ["custom-class-1"]
    })
    return
  };



  // router.push({ name: 'content-items' })


}


watch(() => forgotPasswordForm.email, (newEmail) => {
  if (newEmail! == '') {
    emailError.value = false
  }
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
