<script setup lang="ts">
import FormContentItemCustom from '@/modules/content-items/components/FormContentItemCustom.vue'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hobbySlug = computed(() => {
  return route.params.slug?.toString()
})
</script>

<template>
  <form-content-item-custom
    action="update"
    :idOrSlug="hobbySlug"
  />
</template>
