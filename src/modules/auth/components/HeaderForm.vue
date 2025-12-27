<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center flex-col">

    <img :src="url" :alt="alt" class="mx-auto w-24 sm:w-28 md:w-32 lg:w-36" />
    <h2 class="mt-2 text-center text-2xl/9 font-bold tracking-tight text-base-content">{{ text_title }}</h2>
  </div>
</template>

<script setup lang="ts">
interface Props {
  url: string
  alt: string
  text_title: string
}

const { url, alt, text_title } = defineProps<Props>()
</script>
