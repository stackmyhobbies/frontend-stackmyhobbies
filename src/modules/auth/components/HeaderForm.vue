<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center flex-col">
    <div
      class="relative mx-auto w-24 sm:w-28 md:w-32 lg:w-36 aspect-square rounded-lg overflow-hidden"
    >
      <img
        ref="imgRef"
        :src="url"
        :alt="alt"
        loading="eager"
        class="h-full w-full object-contain transition-opacity duration-300"
        :class="loaded ? 'opacity-100' : 'opacity-0'"
        @load="loaded = true"
      />
    </div>
    <h2 class="mt-2 text-center text-2xl/9 font-bold tracking-tight text-base-content">
      {{ text_title }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  url: string
  alt: string
  text_title: string
}

defineProps<Props>()

const loaded = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (imgRef.value?.complete) {
    loaded.value = true
  }
})
</script>
