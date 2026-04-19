<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed, nextTick } from "vue"
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  TransitionRoot
} from "@headlessui/vue"
import { useElementBounding } from "@vueuse/core"
import AppBadge from "@shared-components/AppBagde.vue"
import { getBadgeColor } from "../../utils/badgeColor"

/* ------------------------------------------------------------------
   🔵 1. defineModel → ahora recibe T[]
-------------------------------------------------------------------*/
const model = defineModel<T[]>({
  type: Array as () => T[],
  default: () => []
})

/* ------------------------------------------------------------------
   🔵 2. Props tipadas
-------------------------------------------------------------------*/
const props = defineProps<{
  items: T[]
  placeholder?: string
  displayKey?: keyof T
  valueKey?: keyof T
  badgeVariant?: string
  badgeClass?: string
  containerClass?: string
  activeOptionClass?: string
  selectedTextClass?: string
  focusRingClass?: string

  errorMessage?: string
  onBlur?: () => void
  onChange?: (value: T[]) => void
}>()

/* Valores por defecto */
const {
  displayKey = "name",
  valueKey = "id",
  placeholder = "Seleccionar...",
  badgeVariant = "soft",
  badgeClass = "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
  containerClass = "border-gray-700 bg-[#1a1c23] focus-within:border-cyan-500/60"
} = props

const resolvedActiveOptionClass = computed(() => props.activeOptionClass ?? 'bg-cyan-500/10 text-cyan-400')
const resolvedSelectedTextClass = computed(() => props.selectedTextClass ?? 'text-cyan-400')
const resolvedFocusRingClass = computed(() => props.focusRingClass ?? 'border border-gray-700')

/* ------------------------------------------------------------------
   🔵 3. Refs y estado
-------------------------------------------------------------------*/
const query = ref("")
const inputRef = ref<any>(null)
const containerRef = ref(null)
const toggleBtnRef = ref<any>(null)

const { x, y, width, height } = useElementBounding(containerRef)

/* ------------------------------------------------------------------
   🔵 4. selectedItems usando defineModel<T[]>
-------------------------------------------------------------------*/
const selectedItems = computed<T[]>({
  get: () => model.value,
  set: async (val) => {
    const unique = Array.from(
      new Map(val.map(item => [item[valueKey], item])).values()
    )

    model.value = unique
    props.onChange?.(unique)

    query.value = ""
    await nextTick()
    if (inputRef.value?.$el) inputRef.value.$el.value = ""
  }
})

/* ------------------------------------------------------------------
   🔵 5. Filtrado tipado
-------------------------------------------------------------------*/
const filteredItems = computed<T[]>(() =>
  query.value === ""
    ? props.items
    : props.items.filter((i) =>
      String(i[displayKey]).toLowerCase().includes(query.value.toLowerCase())
    )
)

/* ------------------------------------------------------------------
   🔵 6. Eventos
-------------------------------------------------------------------*/
const handleContainerClick = () => {
  toggleBtnRef.value?.$el.click()
}

const removeItem = (item: T) => {
  const newVal = model.value.filter(
    (p) => p[valueKey] !== item[valueKey]
  )
  model.value = newVal
  props.onChange?.(newVal)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Backspace" && query.value === "" && selectedItems.value.length > 0) {
    const newVal = selectedItems.value.slice(0, -1)
    model.value = newVal
    props.onChange?.(newVal)
    inputRef.value?.$el?.focus()
  }
}

/* ------------------------------------------------------------------
   🔵 7. Disable inheritAttrs
-------------------------------------------------------------------*/
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="w-full">
    <Combobox v-model="selectedItems" multiple v-slot="{ open }" :by="valueKey.toString()">
      <div class="relative" ref="containerRef">

        <!-- WRAPPER -->
        <div @click="handleContainerClick"
          class="group relative w-full flex flex-wrap gap-2 p-2 pr-10 min-h-[44px] rounded-lg transition-all cursor-text"
          :class="[containerClass, resolvedFocusRingClass]">
          <!-- BADGES -->
          <TransitionGroup name="badge" tag="div" class="flex flex-wrap gap-2">
            <AppBadge v-for="(item, index) in selectedItems" :key="item[valueKey]"
              :color="getBadgeColor(item, index, valueKey.toString())" :variant="badgeVariant">
              {{ item[displayKey] }}
              <button @click.stop="removeItem(item)">×</button>
            </AppBadge>
          </TransitionGroup>

          <!-- INPUT -->
          <ComboboxInput ref="inputRef"
            class="flex-1 border-none text-sm text-neutral-200 bg-transparent focus:outline-none placeholder:text-gray-600 w-full"
            :placeholder="placeholder" @input="query = $event.target.value" :display-value="() => ''" @blur="onBlur?.()"
            @keydown="handleKeydown" />

          <!-- TOGGLE BUTTON -->
          <ComboboxButton ref="toggleBtnRef" class="absolute inset-y-0 right-0 flex items-center pr-2" @click.stop>
            <svg class="h-5 w-5 text-gray-400 transition-colors" :class="{ [resolvedSelectedTextClass]: true }" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd" />
            </svg>
          </ComboboxButton>
        </div>

        <!-- ERROR -->
        <p v-if="errorMessage" class="text-sm text-red-400 mt-1 pl-1">
          {{ errorMessage }}
        </p>

        <!-- OPTIONS -->
        <Teleport to="body">
          <TransitionRoot :show="open">
            <ComboboxOptions static
              :style="{ position: 'fixed', top: `${y + height + 4}px`, left: `${x}px`, width: `${width}px` }"
              class="z-[9999] max-h-48 overflow-auto rounded-xl bg-[#1a1c23] border border-gray-700 py-1 shadow-2xl sm:text-sm">
              <div v-if="filteredItems.length === 0" class="p-4 text-sm text-gray-500">
                No hay resultados.
              </div>

              <ComboboxOption v-for="item in filteredItems" :key="item[valueKey]" :value="item"
                v-slot="{ selected, active }">
                <li :class="[
                  'cursor-pointer select-none py-2.5 pl-10 pr-4 text-sm flex justify-between',
                  active ? resolvedActiveOptionClass : 'text-gray-300'
                ]">
                  <span :class="selected ? ['font-bold', resolvedSelectedTextClass] : 'font-normal'">
                    {{ item[displayKey] }}
                  </span>

                  <span v-if="selected" :class="resolvedSelectedTextClass">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      stroke-width="2" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
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
