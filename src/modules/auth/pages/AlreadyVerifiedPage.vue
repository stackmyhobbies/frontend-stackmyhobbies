<template>
  <div class="flex min-h-full flex-col px-6 pt-12 pb-4 lg:px-8">
    <div class="my-auto w-full">
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
          class="font-semibold text-accent hover:text-accent/80"
        >
          {{ $t('auth.already-verified.sign-in') }}
        </router-link>
      </p>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderForm from '../components/HeaderForm.vue'
import alreadyVerifiedImage from '../../../assets/images/sign-in.webp'
</script>
