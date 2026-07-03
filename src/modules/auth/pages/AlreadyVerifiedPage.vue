<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <header-form
      :url="alreadyVerifiedImage"
      alt="icon_already_verified"
      :text_title="$t('auth.already-verified.title')"
    />

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-center">
      <p class="text-base text-base-content">
        {{ $t('auth.already-verified.message') }}
      </p>

      <p class="mt-10 text-center text-sm/6 text-base-content">
        <router-link
          :to="{ name: 'signIn' }"
          class="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          {{ $t('auth.already-verified.sign-in') }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderForm from '../components/HeaderForm.vue'
import alreadyVerifiedImage from '../../../assets/images/sign-in.webp'
</script>
