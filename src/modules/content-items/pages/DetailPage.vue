<template>
  <div class="min-h-screen p-4 md:p-6 flex justify-center items-start text-base-content">
    <div class="w-full rounded-3xl p-1">
      <MobileHeroBanner
        v-if="contentItem"
        :content-item="contentItem"
        :is-bookmarked="isBookmarked"
        :on-back="goBack"
        :on-share="shareContent"
        :on-bookmark="toggleBookmark"
      />

      <DesktopTopBar
        :is-bookmarked="isBookmarked"
        :on-back="goBack"
        :on-share="shareContent"
        :on-bookmark="toggleBookmark"
      />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
        <DesktopImageColumn :content-item="contentItem" />

        <div class="lg:col-span-7 flex flex-col gap-y-6">
          <ContentInformation :content-item="contentItem" />

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <TrackingCard
              :content-item="contentItem"
              :can-increment="canIncrement"
              :can-decrement="canDecrement"
              :is-loading="isUpdatingProgress"
              @increment="adjustProgress(1)"
              @decrement="adjustProgress(-1)"
            />
            <SpecsCard :content-item="contentItem" />
            <ReviewCard
              :content-item="contentItem"
              :slug="slug"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useContentItemActions } from '../composable/useContentItemActions'
import MobileHeroBanner from '../components/DetailPage/MobileHeroBanner.vue'
import DesktopTopBar from '../components/DetailPage/DesktopTopBar.vue'
import DesktopImageColumn from '../components/DetailPage/DesktopImageColumn.vue'
import ContentInformation from '../components/DetailPage/ContentInformation.vue'
import TrackingCard from '../components/DetailPage/TrackingCard.vue'
import SpecsCard from '../components/DetailPage/SpecsCard.vue'
import ReviewCard from '../components/DetailPage/ReviewCard.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const {
  contentItem,
  isBookmarked,
  isUpdatingProgress,
  canIncrement,
  canDecrement,
  goBack,
  shareContent,
  toggleBookmark,
  adjustProgress,
} = useContentItemActions(slug)
</script>

<style scoped></style>
