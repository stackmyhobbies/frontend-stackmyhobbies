<template>
  <tr
    class="group"
    :class="activeId === hobby.id ? 'ring-1 ring-inset ring-base-content/10' : ''"
  >
    <td
      class="transition-colors duration-150 group-hover:bg-base-content/5"
      :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
    >
      <div class="flex flex-row gap-4 items-center w-full min-w-0">
        <div
          class="w-14 h-14 bg-base-200 border border-transparent rounded-lg hover:border-2 hover:border-accent hover:rounded-lg transition-all overflow-hidden"
        >
          <RouterLink
            :to="{ name: 'content-item-show', params: { slug: hobby.slug } }"
            class="flex items-center gap-3 rounded-lg"
          >
            <img
              v-image-fallback="hobby.thumbnail_url"
              alt="not_found"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover border-transparent transition-opacity duration-300"
            />
          </RouterLink>
        </div>
        <div class="flex flex-col min-w-0 flex-1">
          <div>
            <RouterLink
              :to="{ name: 'content-item-show', params: { slug: hobby.slug } }"
              class="flex items-center gap-3 rounded-xl"
            >
              <span
                class="inline-block font-bold text-base-content mb-1 hover:text-accent hover:underline hover:underline-offset-2"
              >
                {{
                  hobby.title +
                  (hobby.segment_type && hobby.segment_number
                    ? ' ' +
                      t('contentItem.segmentType.' + hobby.segment_type) +
                      ' ' +
                      hobby.segment_number
                    : '')
                }}
              </span>
            </RouterLink>
          </div>
          <div>
            <div class="flex flex-wrap gap-1 items-center mt-1">
              <AppBadge
                v-for="(tag, index) in hobby.tags.slice(0, 2)"
                :key="tag.id"
                :color="getBadgeColor(tag, index, 'id')"
                variant="soft"
              >
                {{ t('contentItem.tag.' + slugifyKey(tag.name)) }}
              </AppBadge>
              <span
                v-if="hobby.tags.length > 2"
                class="inline-flex items-center rounded-md bg-base-200 px-2 py-1 text-xs font-medium text-base-content/60 inset-ring inset-ring-base-content/10"
              >
                +{{ hobby.tags.length - 2 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </td>
    <td
      v-if="showStatus"
      class="transition-colors duration-150 group-hover:bg-base-content/5"
      :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
    >
      <div
        v-if="hobby.progress_status?.name"
        v-status-badge="hobby.progress_status.name"
      >
        {{ t('contentItem.status.' + slugifyKey(hobby.progress_status.name)) }}
      </div>
      <div v-else>
        <span>No status</span>
      </div>
    </td>
    <td
      v-if="showDayOfWeek"
      class="transition-colors duration-150 group-hover:bg-base-content/5"
      :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
    >
      <span>
        {{ hobby.day_of_week ? $t(`common.days.${hobby.day_of_week}`) : '' }}
      </span>
    </td>
    <td
      v-if="showType"
      class="transition-colors duration-150 group-hover:bg-base-content/5"
      :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
    >
      {{ t('contentItem.type.' + slugifyKey(hobby.type.name)) }}
    </td>
    <td
      v-if="showProgress"
      class="transition-colors duration-150 group-hover:bg-base-content/5"
      :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
    >
      <div class="flex items-center gap-2 flex-col">
        <div class="self-start">
          <span class="text-sm font-bold me-2">{{ hobby.progress_percent }}%</span>
          <span>
            {{ hobby.current_progress }}/{{ hobby.total_progress }}
            {{ t('contentItem.unit.' + hobby.progress_unit) }}
          </span>
        </div>
        <progress
          class="progress progress-success w-full"
          :value="hobby.current_progress"
          :max="hobby.total_progress"
        ></progress>
      </div>
    </td>
    <td
      class="transition-colors duration-150 group-hover:bg-base-content/5"
      :class="activeId === hobby.id ? 'bg-base-content/10' : ''"
    >
      <DropdownActionContentItem
        :hobby="hobby"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur')"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { slugifyKey } from '@/shared/utils/slugifyKey'
import { getBadgeColor } from '@/utils/badgeColor'
import AppBadge from '@/shared/components/AppBadge.vue'
import { vImageFallback } from '../../directives/v-image-fallback'
import { vStatusBadge } from '../../directives/v-status-badge'
import DropdownActionContentItem from '../DropdownActionContentItem.vue'
import type { Hobby } from '../../interfaces/contentItemListResponse'

defineProps<{
  hobby: Hobby
  showStatus: boolean
  showType: boolean
  showProgress: boolean
  showDayOfWeek: boolean
  activeId: number | null
}>()

defineEmits<{
  focus: [id: number]
  blur: []
}>()

const { t } = useI18n({ useScope: 'global' })
</script>
