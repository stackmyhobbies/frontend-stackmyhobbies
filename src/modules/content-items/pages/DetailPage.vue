<template>
  <div class="min-h-screen p-4 md:p-6 flex justify-center items-start text-base-content">
    <div class="w-full rounded-3xl p-1">
      <!-- Mobile hero banner -->
      <div
        class="lg:hidden relative h-[50vh] min-h-[360px] rounded-2xl overflow-hidden -mb-6"
        :style="{
          backgroundImage: `url(${contentItem?.detail_url || contentItem?.thumbnail_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }"
      >
        <div class="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-base-100/70 via-transparent to-transparent" />
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

      <!-- Desktop grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
        <!-- Desktop image column -->
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

        <!-- Content column -->
        <div class="lg:col-span-7 flex flex-col gap-y-6">
          <div
            class="flex-col hidden lg:flex"
            id="information-general"
          >
            <div class="flex flex-wrap gap-2 w-full">
              <div
                v-if="contentItem?.progress_status?.name"
                v-status-badge="contentItem?.progress_status.name"
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

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div
              class="lg:col-span-12 card bg-base-200/50 border border-base-content/10 rounded-xl p-6"
            >
              <div class="flex justify-between items-start mb-4">
                <h2 class="text-xs font-bold uppercase tracking-widest text-accent">
                  {{ t('contentItem.tracking.title') }}
                </h2>
                <AppThemedBadge
                  color="accent"
                  variant="outline"
                >
                  {{ contentItem?.progress_percent }}% {{ t('contentItem.tracking.completed') }}
                </AppThemedBadge>
              </div>

              <div class="mb-4">
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

            <div
              class="lg:col-span-5 card bg-base-200/50 border border-base-content/10 rounded-xl p-6"
            >
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
                  <dd class="font-medium">{{ contentItem?.type.name }}</dd>
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

            <div
              class="lg:col-span-7 card bg-base-200/50 border border-base-content/10 rounded-xl p-6 flex flex-col"
            >
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useGetContentItemQuery } from '../queries/useGetContentItemQuery'
import { slugifyKey } from '@/shared/utils/slugifyKey'
import { useI18n } from 'vue-i18n'
import { vStatusBadge } from '../directives/v-status-badge'
import { vImageFallback } from '../directives/v-image-fallback'
import { Icon } from '@iconify/vue'
import AppThemedBadge from '@/shared/components/AppThemedBadge.vue'
import AppRating from '@/shared/components/AppRating.vue'
import { formatDateToYYYYMMDD } from '@/shared/utils/formatDateToYYYYMMDD'
import { formatRelativeTime } from '@/shared/utils/formatRelativeTime'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const {
  data: contentItem,
  isLoading,
  isError,
} = useGetContentItemQuery(slug, {
  enabled: true,
})

console.log(contentItem?.value)
</script>

<style scoped></style>
