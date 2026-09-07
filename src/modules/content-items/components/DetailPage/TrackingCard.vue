<template>
  <div class="lg:col-span-12 card bg-base-200/50 border border-base-content/10 rounded-xl p-6">
    <div class="flex justify-between items-start mb-4 gap-2">
      <h2 class="text-xs font-bold uppercase tracking-widest text-accent">
        {{ t('contentItem.tracking.title') }}
      </h2>
      <AppThemedBadge
        color="accent"
        variant="outline"
        class="hidden lg:inline-flex"
      >
        {{ contentItem?.progress_percent }}% {{ t('contentItem.tracking.completed') }}
      </AppThemedBadge>
      <ProgressControls
        v-if="contentItem"
        :can-increment="canIncrement"
        :can-decrement="canDecrement"
        :is-loading="isLoading"
        :increment-label="t('contentItem.tracking.increment')"
        :decrement-label="t('contentItem.tracking.decrement')"
        class="lg:hidden"
        @increment="$emit('increment')"
        @decrement="$emit('decrement')"
      />
    </div>

    <div class="mb-4 flex justify-between items-center gap-3">
      <div class="flex items-baseline gap-3">
        <span class="text-4xl font-bold">{{ contentItem?.current_progress }}</span>
        <span class="text-base-content/60 text-lg">
          / {{ contentItem?.total_progress }}
          {{
            contentItem?.progress_unit
              ? t('contentItem.unit.' + contentItem.progress_unit)
              : ''
          }}
          {{ t('contentItem.tracking.seen') }}
        </span>
      </div>
      <ProgressControls
        v-if="contentItem"
        :can-increment="canIncrement"
        :can-decrement="canDecrement"
        :is-loading="isLoading"
        :increment-label="t('contentItem.tracking.increment')"
        :decrement-label="t('contentItem.tracking.decrement')"
        class="hidden lg:flex"
        @increment="$emit('increment')"
        @decrement="$emit('decrement')"
      />
    </div>

    <progress
      class="progress progress-accent w-full h-3 mb-6"
      :value="contentItem?.current_progress"
      :max="contentItem?.total_progress"
    ></progress>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div class="flex items-center gap-3">
        <Icon
          icon="solar:calendar-outline"
          class="text-accent text-xl shrink-0"
        />
        <div>
          <p class="text-xs uppercase text-base-content/50">
            {{ t('contentItem.tracking.start') }}
          </p>
          <p class="font-medium">
            {{ formatDateToYYYYMMDD(contentItem?.viewing_started_at) || '-' }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <Icon
          icon="solar:clock-circle-outline"
          class="text-accent text-xl shrink-0"
        />
        <div>
          <p class="text-xs uppercase text-base-content/50">
            {{ t('contentItem.tracking.lastUpdate') }}
          </p>
          <p class="font-medium">{{ formatRelativeTime(contentItem?.updated_at) }}</p>
          <p class="text-xs text-base-content/50">
            {{ formatDateToYYYYMMDD(contentItem?.updated_at) || '-' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import AppThemedBadge from '@/shared/components/AppThemedBadge.vue'
import ProgressControls from './ProgressControls.vue'
import { formatDateToYYYYMMDD } from '@/shared/utils/formatDateToYYYYMMDD'
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime'

const { t } = useI18n({ useScope: 'global' })

defineProps<{
  contentItem: {
    current_progress: number
    total_progress: number
    progress_percent: number
    progress_unit: string
    viewing_started_at: string | null
    updated_at: string
  } | undefined
  canIncrement: boolean
  canDecrement: boolean
  isLoading: boolean
}>()

defineEmits<{
  increment: []
  decrement: []
}>()
</script>
