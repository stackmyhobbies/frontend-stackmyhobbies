<template>
  <div class="hidden lg:flex justify-between items-center px-6 md:px-10 pt-6 mb-2">
    <button
      type="button"
      class="btn btn-outline btn-sm rounded-full gap-2"
      :aria-label="t('contentItem.actions.back')"
      :title="t('contentItem.actions.back')"
      @click="onBack"
    >
      <Icon
        icon="solar:alt-arrow-left-linear"
        class="text-base"
      />
      {{ t('contentItem.actions.back') }}
    </button>
    <div class="flex gap-2">
      <button
        type="button"
        class="btn btn-ghost btn-circle btn-sm"
        :aria-label="t('contentItem.actions.share')"
        :title="t('contentItem.actions.share')"
        @click="onShare"
      >
        <Icon
          icon="solar:share-linear"
          class="text-lg"
        />
      </button>
      <button
        type="button"
        class="btn btn-ghost btn-circle btn-sm"
        :aria-label="t('contentItem.actions.bookmark')"
        :title="t('contentItem.actions.bookmark')"
        @click="onBookmark"
      >
        <Icon
          :icon="isBookmarked ? 'solar:bookmark-bold' : 'solar:bookmark-linear'"
          class="text-lg"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

defineProps<{
  isBookmarked: boolean
  onBack: () => void
  onShare: () => void
  onBookmark: () => void
}>()
</script>
