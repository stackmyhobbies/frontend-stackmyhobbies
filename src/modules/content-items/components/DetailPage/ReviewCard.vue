<template>
  <div class="lg:col-span-7 card bg-base-200/50 border border-base-content/10 rounded-xl p-6 flex flex-col">
    <div class="flex justify-between items-start mb-4">
      <h2
        class="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2"
      >
        <Icon icon="solar:chat-square-text-outline" />
        {{ t('contentItem.review.title') }}
      </h2>
      <div class="flex items-center gap-3">
        <AppRating
          :model-value="contentItem?.rating ?? 0"
          name="detail-rating"
          readonly
        />
        <AppThemedBadge
          color="accent"
          variant="outline"
        >
          {{ Number(contentItem?.rating ?? 0).toFixed(1) }}
        </AppThemedBadge>
      </div>
    </div>

    <p class="italic text-base-content/80 flex-1 mb-4">
      "{{ contentItem?.notes || t('contentItem.review.empty') }}"
    </p>

    <div class="flex justify-between items-center text-xs text-base-content/50 mt-auto">
      <span>
        {{ t('contentItem.review.lastEdited') }}:
        {{ formatDateToYYYYMMDD(contentItem?.updated_at) || '-' }}
      </span>
      <RouterLink
        :to="{ name: 'content-item-edit', params: { slug } }"
        class="text-accent hover:underline flex items-center gap-1"
      >
        <Icon icon="solar:pen-outline" /> {{ t('contentItem.review.edit') }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import AppThemedBadge from '@/shared/components/AppThemedBadge.vue'
import AppRating from '@/shared/components/AppRating.vue'
import { formatDateToYYYYMMDD } from '@/shared/utils/formatDateToYYYYMMDD'

const { t } = useI18n({ useScope: 'global' })

defineProps<{
  contentItem: {
    rating: number
    notes: string
    updated_at: string
  } | undefined
  slug: string
}>()
</script>
