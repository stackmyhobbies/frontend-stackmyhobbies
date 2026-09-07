<template>
  <div
    class="lg:hidden relative h-[50vh] min-h-[360px] rounded-2xl overflow-hidden -mb-6"
    :style="{
      backgroundImage: `url(${contentItem?.detail_url || contentItem?.thumbnail_url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 30%',
    }"
  >
    <div class="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent" />
    <div
      class="absolute inset-0 bg-gradient-to-r from-base-100/70 via-transparent to-transparent"
    />

    <!-- Mobile top action bar -->
    <div class="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4">
      <button
        type="button"
        class="btn btn-circle btn-sm bg-base-100/40 backdrop-blur-md border-base-content/10 hover:bg-base-100/60"
        :aria-label="t('contentItem.actions.back')"
        :title="t('contentItem.actions.back')"
        @click="onBack"
      >
        <Icon
          icon="solar:alt-arrow-left-linear"
          class="text-lg"
        />
      </button>
      <div class="flex gap-2">
        <button
          type="button"
          class="btn btn-circle btn-sm bg-base-100/40 backdrop-blur-md border-base-content/10 hover:bg-base-100/60"
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
          class="btn btn-circle btn-sm bg-base-100/40 backdrop-blur-md border-base-content/10 hover:bg-base-100/60"
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

    <div class="relative z-10 h-full flex flex-col justify-end p-6">
      <div class="flex flex-wrap gap-2 mb-3">
        <div
          v-if="contentItem?.progress_status?.name"
          v-status-badge="contentItem.progress_status.name"
          class="uppercase"
        >
          {{ t('contentItem.status.' + slugifyKey(contentItem.progress_status.name)) }}
        </div>
        <div class="badge badge-soft badge-light uppercase">
          {{ contentItem?.segment_type }} {{ contentItem?.segment_number }}
        </div>
      </div>
      <h1 class="text-2xl font-bold mb-2">{{ contentItem?.title }}</h1>
      <div class="flex flex-wrap gap-1.5">
        <AppThemedBadge
          v-for="item in contentItem?.tags"
          :key="item.id"
          color="accent"
          variant="outline"
        >
          {{ item.name }}
        </AppThemedBadge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import AppThemedBadge from '@/shared/components/AppThemedBadge.vue'
import { vStatusBadge } from '../../directives/v-status-badge'
import { slugifyKey } from '@/shared/utils/slugifyKey'

const { t } = useI18n({ useScope: 'global' })

defineProps<{
  contentItem?: {
    title: string
    detail_url?: string
    thumbnail_url?: string
    segment_type: string
    segment_number: number
    progress_status?: { name: string }
    tags: { id: number; name: string }[]
  }
  isBookmarked: boolean
  onBack: () => void
  onShare: () => void
  onBookmark: () => void
}>()
</script>

<style scoped></style>
