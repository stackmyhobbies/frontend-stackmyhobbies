<script setup>
import { ref, computed } from "vue"
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  TransitionRoot
} from "@headlessui/vue"
import { useElementBounding } from '@vueuse/core'

// Los items que ya tenías
const items = [
  { id: 1, name: "Naruto Uzumaki" },
  { id: 2, name: "Guts" },
  { id: 3, name: "Monkey D. Luffy" },
  { id: 4, name: "Saitama" },
  { id: 5, name: "Ichigo Kurosaki" },
  { id: 6, name: "Ichigo Kurosaki" },
  { id: 7, name: "Ichigo Kurosaki" },
]

const selectedPeople = ref([])
const query = ref("")
const inputRef = ref(null)
const containerRef = ref(null)
const toggleBtnRef = ref(null)
const { x, y, width, height } = useElementBounding(containerRef)

const handleContainerClick = (open) => {
  if (!open && toggleBtnRef.value) {
    toggleBtnRef.value.$el.click()
  }
}

const onSelect = () => {
  query.value = ""
  if (inputRef.value && inputRef.value.$el) {
    inputRef.value.$el.value = ""
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Backspace' && query.value === '' && selectedPeople.value.length > 0) {
    selectedPeople.value = selectedPeople.value.slice(0, -1)
  }
}

const filteredItems = computed(() =>
  query.value === ""
    ? items
    : items.filter((item) =>
      item.name.toLowerCase().includes(query.value.toLowerCase())
    )
)

const removePerson = (person) => {
  selectedPeople.value = selectedPeople.value.filter(p => p.id !== person.id)
}
</script>

<template>
  <div class="w-full">
    <Combobox v-model="selectedPeople" multiple @update:modelValue="onSelect" v-slot="{ open }">
      <div class="relative" ref="containerRef">

        <div @click="handleContainerClick(open)"
          class="group relative w-full flex flex-wrap gap-2 p-2 pr-10 min-h-[44px] rounded-lg border border-gray-700 bg-[#1a1c23] focus-within:border-cyan-500/60 transition-all cursor-text">
          <span v-for="person in selectedPeople" :key="person.id"
            class="badge badge-outline border-cyan-500/40 text-cyan-400 gap-1 pr-1">
            {{ person.name }}
            <button type="button" @click.stop="removePerson(person)" class="hover:text-white">&times;</button>
          </span>

          <ComboboxInput ref="inputRef"
            class="flex-1 border-none min-w-[100px] text-sm text-neutral-200 bg-transparent focus:outline-none placeholder:text-gray-600 w-full"
            placeholder="Escribe un tag..." @change="query = $event.target.value" :display-value="() => ''" 
            @keydown="handleKeydown" />

          <ComboboxButton ref="toggleBtnRef" class="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg class="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd" />
            </svg>
          </ComboboxButton>
        </div>

        <Teleport to="body">
          <TransitionRoot :show="open" as="template" leave="transition ease-in duration-100" leaveFrom="opacity-100"
            leaveTo="opacity-0" @after-leave="query = ''">
            <ComboboxOptions static
              :style="{ position: 'fixed', top: `${y + height + 4}px`, left: `${x}px`, width: `${width}px` }"
              class="z-[9999] max-h-48 overflow-auto rounded-xl bg-[#1a1c23] border border-gray-700 py-1 shadow-2xl focus:outline-none sm:text-sm">
              <div v-if="filteredItems.length === 0" class="p-4 text-sm text-gray-500">
                No hay resultados.
              </div>

              <ComboboxOption v-for="person in filteredItems" :key="person.id" :value="person"
                v-slot="{ selected, active }">
                <li
                  :class="['relative cursor-pointer select-none py-2.5 pl-10 pr-4 text-sm transition-colors', active ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-300']">
                  <span :class="[selected ? 'font-bold text-cyan-500' : 'font-normal']">
                    {{ person.name }}
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </Teleport>
      </div>
    </Combobox>
  </div>
</template>
