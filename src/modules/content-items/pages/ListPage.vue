<template>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->

  <div v-else-if="data">
    <div class="min-h-dvh overflow-x-auto">
      <table class="table table-pin-rows bg-base-200">
        <thead>
          <tr class="text-white capitalize">
            <th>Title</th>
            <th>Status</th>
            <th>Type</th>
            <th>progress</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="hobby in hobbies"
            :key="hobby.id"
            :class="
              activeId === hobby.id
                ? 'bg-base-content/10 ring-1 ring-inset ring-white/10'
                : 'hover:bg-base-content/5'
            "
            class="transition-colors duration-150"
          >
            <td>
              <div class="flex flex-row gap-4">
                <div>
                  <img
                    v-image-fallback="hobby.thumbnail_url"
                    alt="not_found"
                    class="mx-auto w-14 h-14 object-fill rounded-lg border-transparent"
                  />
                </div>
                <div class="flex flex-col">
                  <div>
                    <span class="inline-block font-bold text-white mb-1">
                      {{ `${hobby.title} ${hobby.segment_label}` }}
                    </span>
                  </div>
                  <div>
                    <span
                      class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-white inset-ring inset-ring-gray-400/20"
                    >
                      {{
                        hobby.tags
                          .slice(0, 2)
                          .map((h) => h.name)
                          .join('/')
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div
                v-if="hobby.progress_status?.name"
                v-status-badge="hobby.progress_status.name"
              >
                {{ hobby.progress_status.name }}
              </div>
              <div v-else>
                <span>No status</span>
              </div>
            </td>
            <td>{{ hobby.type.name }}</td>
            <td>
              <div class="flex items-center gap-2 flex-col">
                <div class="self-start">
                  <span class="text-sm font-bold me-2">{{ hobby.progress_percent }}%</span>
                  <span>
                    {{ hobby.current_progress }}/{{ hobby.total_progress }}
                    {{ hobby.progress_unit }}
                  </span>
                </div>
                <progress
                  class="progress progress-success w-full"
                  :value="hobby.current_progress"
                  :max="hobby.total_progress"
                ></progress>
              </div>
            </td>

            <!--Actions-->
            <td>
              <DropdownActionContentItem
                :hobby="hobby"
                @focus="activeId = $event"
                @blur="activeId = null"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useGetContentItemsQuery } from '../queries/useGetContentItemsQuery'
import { computed, ref } from 'vue'
import { vStatusBadge } from '../directives/v-status-badge'
import { vImageFallback } from '../directives/v-image-fallback'
import type { Hobby } from '../interfaces/contentItemListResponse'
import DropdownActionContentItem from '../components/DropdownActionContentItem.vue'

const { data, isPending, isError, error } = useGetContentItemsQuery()

const hobbies = computed<Hobby[]>(() => data.value || [])
const activeId = ref<number | null>(null)
</script>
<style lang="css" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.15s ease-out;
}
</style>
