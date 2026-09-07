<template>
  <div class="lg:col-span-5 card bg-base-200/50 border border-base-content/10 rounded-xl p-6">
    <h2
      class="text-xs font-bold uppercase tracking-widest text-accent mb-4 flex items-center gap-2"
    >
      <Icon icon="solar:info-circle-outline" />
      {{ t('contentItem.specs.title') }}
    </h2>
    <dl class="space-y-3 text-sm">
      <div class="flex justify-between">
        <dt class="text-base-content/60">{{ t('contentItem.specs.aired') }}</dt>
        <dd class="font-medium">
          {{ formatDateToYYYYMMDD(contentItem?.aired_from) || '-' }}
        </dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-base-content/60">{{ t('contentItem.specs.broadcast') }}</dt>
        <dd class="font-medium">
          {{
            contentItem?.day_of_week
              ? t('contentItem.dayOfWeek.' + contentItem.day_of_week.toLowerCase())
              : '-'
          }}
        </dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-base-content/60">{{ t('contentItem.specs.format') }}</dt>
        <dd class="font-medium">{{ contentItem?.type?.name }}</dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-base-content/60">{{ t('contentItem.specs.status') }}</dt>
        <dd class="font-medium text-accent">
          {{
            t(
              'contentItem.status.' +
                slugifyKey(contentItem?.progress_status?.name || ''),
            )
          }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { slugifyKey } from '@/shared/utils/slugifyKey'
import { formatDateToYYYYMMDD } from '@/shared/utils/formatDateToYYYYMMDD'

const { t } = useI18n({ useScope: 'global' })

defineProps<{
  contentItem: {
    aired_from: string | null
    day_of_week: string | null
    type?: { name: string }
    progress_status?: { name: string }
  } | undefined
}>()
</script>
