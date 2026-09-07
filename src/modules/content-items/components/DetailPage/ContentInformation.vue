<template>
  <div>
    <div
      class="flex-col hidden lg:flex"
      id="information-general"
    >
      <div class="flex flex-wrap gap-2 w-full">
        <div
          v-if="contentItem?.progress_status?.name"
          v-status-badge="contentItem.progress_status.name"
          class="uppercase"
        >
          {{ t('contentItem.status.' + slugifyKey(contentItem.progress_status.name)) }}
        </div>
        <div v-else>
          <span>No status</span>
        </div>
        <div class="badge badge-soft badge-light uppercase">
          {{ contentItem?.segment_type }} {{ contentItem?.segment_number }}
        </div>
      </div>

      <p class="text-6xl font-bold my-4">
        {{ contentItem?.title }}
      </p>

      <div class="flex flex-wrap gap-2">
        <AppThemedBadge
          v-for="item in contentItem?.tags"
          :key="item.id"
          color="accent"
          variant="outline"
        >
          {{ item.name }}
        </AppThemedBadge>
      </div>

      <p class="mt-5 text-pretty text-base-content/75">
        {{ contentItem?.description }}
      </p>
    </div>

    <p class="lg:hidden text-pretty text-base-content/75">
      {{ contentItem?.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { vStatusBadge } from '../../directives/v-status-badge'
import AppThemedBadge from '@/shared/components/AppThemedBadge.vue'
import { slugifyKey } from '@/shared/utils/slugifyKey'

const { t } = useI18n({ useScope: 'global' })

defineProps<{
  contentItem: {
    title: string
    description?: string
    segment_type: string
    segment_number: number
    progress_status?: { name: string }
    tags: { id: number; name: string }[]
  } | undefined
}>()
</script>
