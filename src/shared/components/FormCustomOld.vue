<script setup lang="ts">
import { reactive, computed } from 'vue';
import AppDatePicker from './AppDatePicker.vue';
import AppInput from './AppInput.vue';

const hobbyForm = reactive({
  title: '',
  description: '',
  notes: '',
  content_type_id: null,
  progress_status_id: 1,
  current_progress: 37,
  total_progress: 37,
  progress_unit: 'episodes',
  segment_type: 'season',
  segment_number: 1,
  start_date: '',
  end_date: '',
  rating: 4.5,
  image: null as string | null
});

// Campos calculados
const progressPercent = computed(() => {
  if (!hobbyForm.total_progress) return 0;
  return Math.round((hobbyForm.current_progress / hobbyForm.total_progress) * 100);
});

const handleImageUpload = (e: any) => {
  const file = e.target.files[0];
  if (file) hobbyForm.image = URL.createObjectURL(file);
};
</script>

<template>
  <div class="min-h-screen bg-[#1a1c23] p-4 md:p-8 flex justify-center items-start text-gray-300">

    <div
      class="w-full max-w-6xl bg-[#111318] rounded-3xl p-1 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] border border-cyan-500/30">

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">

        <div class="lg:col-span-5 flex flex-col gap-4">
          <label
            class="relative flex flex-col items-center justify-center w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-cyan-500/20 bg-[#1a1c23] hover:bg-[#1e2129] transition-all cursor-pointer group overflow-hidden">
            <template v-if="!hobbyForm.image">
              <div class="flex flex-col items-center justify-center pb-6 pt-5">
                <svg class="w-16 h-16 mb-4 text-cyan-500/50 group-hover:scale-110 transition-transform"
                  fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM3 18V6h5v12H3zm16 0h-5V6h5v12z" />
                </svg>
                <p class="text-lg font-medium text-cyan-500/70">Upload Cover Image</p>
              </div>
            </template>
            <img v-else :src="hobbyForm.image" class="w-full h-full object-cover" />
            <input type="file" class="hidden" @change="handleImageUpload" />
          </label>
        </div>

        <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

          <div class="md:col-span-1">
            <AppInput label="Hobby Title" placeholder="Hobby Title" id="title" v-model="hobbyForm.title" />
          </div>
          <div class="md:col-span-1">
            <label class="label"><span class="label-text text-gray-400">Hobby Type</span></label>
            <select v-model="hobbyForm.content_type_id"
              class="select select-bordered w-full bg-[#1a1c23] border-gray-700 focus:border-cyan-500">
              <option :value="null">Anime, Manga, Movie...</option>
              <option :value="5">Anime</option>
              <option :value="1">Manga</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="label"><span class="label-text text-gray-400">Hobby Status</span></label>
            <select v-model="hobbyForm.progress_status_id"
              class="select select-bordered w-full bg-[#1a1c23] border-gray-700">
              <option :value="1">🔵 Reading/Watching</option>
              <option :value="2">🟢 Completed</option>
              <option :value="3">🟡 On Hold</option>
            </select>
          </div>

          <div class="md:col-span-1">
            <div class="grid grid-cols-2 gap-2">
              <AppInput label="Current" type="number" v-model="hobbyForm.current_progress" />
              <AppInput label="Total" type="number" v-model="hobbyForm.total_progress" />
            </div>
          </div>
          <div class="md:col-span-1">
            <label class="label"><span class="label-text text-gray-400">Units</span></label>
            <select v-model="hobbyForm.progress_unit"
              class="select select-bordered w-full bg-[#1a1c23] border-gray-700">
              <option value="episodes">Pages, Chapters, Minutes...</option>
              <option value="episodes">Episodes</option>
              <option value="pages">Pages</option>
            </select>
          </div>

          <div class="md:col-span-1">
            <AppDatePicker id="start" label="Start Date" v-model="hobbyForm.start_date" />
          </div>
          <div class="md:col-span-1">
            <AppDatePicker id="end" label="End Date" v-model="hobbyForm.end_date" />
          </div>

          <div class="md:col-span-1">
            <label class="label"><span class="label-text text-gray-400">Short Description</span></label>
            <textarea v-model="hobbyForm.description"
              class="textarea textarea-bordered w-full bg-[#1a1c23] border-gray-700 h-24"
              placeholder="Short Description"></textarea>
          </div>
          <div class="md:col-span-1">
            <label class="label"><span class="label-text text-gray-400">Personal Notes</span></label>
            <textarea v-model="hobbyForm.notes"
              class="textarea textarea-bordered w-full bg-[#1a1c23] border-gray-700 h-24"
              placeholder="Personal Notes"></textarea>
          </div>

          <div class="md:col-span-1">
            <label class="label"><span class="label-text text-gray-400">Rating</span></label>
            <div class="rating rating-md">
              <input v-for="i in 5" :key="i" type="radio" class="mask mask-star-2 bg-cyan-400" :value="i"
                v-model="hobbyForm.rating" />
            </div>
          </div>
          <div class="md:col-span-1">
            <label class="label"><span class="label-text text-gray-400">Completion Percentage (Auto)</span></label>
            <progress class="progress progress-info w-full" :value="progressPercent" max="100"></progress>
            <span class="text-xs text-cyan-500 font-mono">{{ progressPercent }}% progressPercent</span>
          </div>

          <div class="md:col-span-2 mt-4">
            <button class="btn btn-info w-full text-lg normal-case shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]">
              Save Hobby
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
