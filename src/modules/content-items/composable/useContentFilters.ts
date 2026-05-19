import { ref, reactive, watch, onMounted, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDebounce } from '@/shared/composables/useDebounce'
import type { filterProps } from '../actions/get-content-items.action'
import type { Tag } from '../interfaces/TagResponse'
import type { Type } from '../interfaces/ContentTypeResponse'
import type { ProgressStatus } from '../interfaces/progressStatusResponse'

export function useContentFilters(
  tagsData: Ref<Tag[] | undefined>,
  typesData: Ref<Type[] | undefined>,
  progressesData: Ref<ProgressStatus[] | undefined>,
) {
  const router = useRouter()
  const route = useRoute()

  const currentPage = ref<number>(1)
  const per_page = ref<number>(5)
  const searchTerm = ref('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const filters = reactive({
    search: '',
    tags: [],
    content_type: [],
    progress: [],
  }) as filterProps

  const selectedTags = ref<Tag[]>([])
  const selectedTypes = ref<Type[]>([])
  const selectedProgresses = ref<ProgressStatus[]>([])

  onMounted(() => {
    if (route.query.search) {
      searchTerm.value = route.query.search as string
      filters.search = route.query.search as string
    }
    if (route.query.page) {
      currentPage.value = parseInt(route.query.page as string) || 1
    }
  })

  // Sincronizar desde la URL cuando los datos cargan
  watch(
    tagsData,
    (data) => {
      if (data && route.query.tags) {
        const tagSlugs = (route.query.tags as string).split(',')
        selectedTags.value = data.filter((t) => tagSlugs.includes(t.slug))
      }
    },
    { immediate: true },
  )

  watch(
    typesData,
    (data) => {
      if (data && route.query.content_type) {
        const typeSlugs = (route.query.content_type as string).split(',')
        selectedTypes.value = data.filter((t) => typeSlugs.includes(t.slug))
      }
    },
    { immediate: true },
  )

  watch(
    progressesData,
    (data) => {
      if (data && route.query.progress) {
        const progressSlugs = (route.query.progress as string).split(',')
        selectedProgresses.value = data.filter((t) => progressSlugs.includes(t.slug))
      }
    },
    { immediate: true },
  )

  // Mapear arrays de selección a slugs
  watch(debouncedSearch, (v) => {
    filters.search = v
  })

  watch(
    selectedTags,
    (v) => {
      filters.tags = v.map((t) => t.slug)
    },
    { deep: true },
  )

  watch(
    selectedTypes,
    (v) => {
      filters.content_type = v.map((t) => t.slug)
    },
    { deep: true },
  )

  watch(
    selectedProgresses,
    (v) => {
      filters.progress = v.map((t) => t.slug)
    },
    { deep: true },
  )

  // Actualizar URL cuando los filtros cambian
  watch(
    [
      () => filters.search,
      () => filters.tags,
      () => filters.content_type,
      () => filters.progress,
      currentPage,
    ],
    () => {
      const query: Record<string, any> = {}
      if (filters.search) query.search = filters.search
      if (filters.tags.length) query.tags = filters.tags.join(',')
      if (filters.content_type.length) query.content_type = filters.content_type.join(',')
      if (filters.progress.length) query.progress = filters.progress.join(',')
      if (currentPage.value > 1) query.page = currentPage.value

      router.replace({ query })
    },
    { deep: true },
  )

  return {
    currentPage,
    per_page,
    searchTerm,
    filters,
    selectedTags,
    selectedTypes,
    selectedProgresses,
  }
}
