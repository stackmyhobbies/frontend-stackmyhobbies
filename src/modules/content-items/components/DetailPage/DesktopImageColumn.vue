<template>
  <div class="hidden lg:flex lg:col-span-5 flex-col gap-4">
    <div class="w-full aspect-[3/4] bg-base-200 rounded-2xl overflow-hidden">
      <img
        v-image-fallback="contentItem?.detail_url"
        :alt="contentItem?.title"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover border-transparent transition-opacity duration-300"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { vImageFallback } from '../../directives/v-image-fallback'

defineProps<{
  contentItem: {
    title: string
    detail_url?: string
    thumbnail_url?: string
  } | undefined
}>()
</script>
