<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  TransitionRoot,
} from '@headlessui/vue'
import { useElementBounding } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'

/* ------------------------------------------------------------------
   🔵 1. Props y Modelo
-------------------------------------------------------------------*/
const model = defineModel<T | null | undefined | number | string>()

interface Props {
  items: T[]
  label?: string
  error?: { message: string } | string
  labelClass?: string | string[]
  selectClass?: string | string[]
  selectContainerOptionClass?: string | string[]
  selectedText?: string | string[]
  labelFor?: string
  placeholder?: string
  displayKey?: keyof T
  valueKey?: keyof T
}

const props = withDefaults(defineProps<Props>(), {
  displayKey: 'name' as any,
  valueKey: 'id' as any,
  placeholder: 'Seleccionar...',
})

console.log(props.items)
const toggleBtnRef = ref<any>(null)

/* ------------------------------------------------------------------
   🔵 2. Estado y Posicionamiento
-------------------------------------------------------------------*/
const query = ref('')

// Objeto seleccionado internamente (HeadlessUI necesita el objeto completo)
const selectedItem = computed({
  get: () => props.items.find((item) => item[props.valueKey] === model.value) ?? null,
  set: (item: T | null) => {
    model.value = item ? item[props.valueKey] : null
  },
})
const containerRef = ref(null)
const { x, y, width, height } = useElementBounding(containerRef)

const filteredItems = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter((item) =>
        String(item[props.displayKey]).toLowerCase().includes(query.value.toLowerCase()),
      ),
)

function getErrorMessage(error: Props['error']): string {
  if (!error) return ''
  return typeof error === 'string' ? error : error.message
}

const handleContainerClick = () => {
  toggleBtnRef.value?.$el.click()
}

const activeOptionClass = computed(
  () => props.selectContainerOptionClass ?? 'bg-primary/10 text-primary',
)

const selectedIconClass = computed(() => props.selectedText ?? 'text-primary')

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="form-control w-full">
    <label
      v-if="label"
      :for="labelFor"
      class="label"
    >
      <span
        class="label-text text-base-content/70 font-medium"
        :class="labelClass"
        >{{ label }}</span
      >
    </label>

    <Combobox
      v-model="selectedItem"
      v-slot="{ open }"
    >
      <div
        class="relative"
        ref="containerRef"
      >
        <div @click="handleContainerClick">
          <div
            :class="
              twMerge(
                'relative w-full flex items-center rounded-lg border border-base-content/20 bg-base-100 transition-all',
                'focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500',
                error ? 'border-error' : '',
                selectClass,
              )
            "
          >
            <ComboboxInput
              class="w-full bg-base-100 py-2.5 pl-4 pr-10 text-sm text-base-content focus:outline-none placeholder:text-base-content/50"
              :display-value="(item: any) => item?.[displayKey] ?? ''"
              @change="query = $event.target.value"
              :placeholder="placeholder"
            />

            <ComboboxButton
              ref="toggleBtnRef"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
              @click.stop
            >
            </ComboboxButton>
          </div>
        </div>

        <Teleport to="body">
          <TransitionRoot
            :show="open"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              static
              :style="{
                position: 'fixed',
                top: `${y + height + 4}px`,
                left: `${x}px`,
                width: `${width}px`,
              }"
              class="z-[9999] max-h-60 overflow-auto rounded-xl bg-base-100 border border-base-content/20 py-1 shadow-2xl focus:outline-none sm:text-sm"
            >
              <div
                v-if="filteredItems.length === 0"
                class="p-4 text-sm text-base-content/50 text-center"
              >
                No hay resultados.
              </div>

              <div
                :class="
                  twMerge(
                    'relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors text-base-content/80',
                  )
                "
              >
                <slot name="option_prepend" />
              </div>
              <ComboboxOption
                v-for="item in filteredItems"
                :key="item[valueKey]"
                :value="item"
                v-slot="{ selected, active }"
              >
                <li
                  :class="
                    twMerge(
                      'relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors',
                      active ? activeOptionClass : 'text-base-content/80',
                    )
                  "
                >
                  <span :class="selected ? twMerge('font-bold', selectedIconClass) : 'font-normal'">
                    {{ item[displayKey] }}
                  </span>

                  <span
                    v-if="selected"
                    :class="
                      twMerge('absolute inset-y-0 left-0 flex items-center pl-3', selectedIconClass)
                    "
                  >
                    <svg
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </Teleport>
      </div>
    </Combobox>

    <label
      v-if="error"
      class="label"
    >
      <span class="label-text-alt text-error">{{ getErrorMessage(error) }}</span>
    </label>
  </div>
</template>
