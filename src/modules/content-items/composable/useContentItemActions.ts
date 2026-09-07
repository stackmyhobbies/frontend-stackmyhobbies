import { computed, ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useGetContentItemQuery } from '../queries/useGetContentItemQuery'
import { usePatchContentItemProgressMutation } from '../mutations/usePatchContentItemProgressMutation'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/shared/composables/useToast'
import { ApiError } from '@/utils/handleApiError'

export const useContentItemActions = (slug: ComputedRef<string>) => {
  const { t } = useI18n({ useScope: 'global' })
  const router = useRouter()
  const toast = useToast()

  const {
    data: contentItem,
    isLoading,
    isError,
  } = useGetContentItemQuery(slug, {
    enabled: true,
  })

  const { mutate: patchProgress, isPending: isUpdatingProgress } =
    usePatchContentItemProgressMutation()

  const isBookmarked = ref(false)

  const canDecrement = computed(() => (contentItem.value?.current_progress ?? 0) > 0)
  const canIncrement = computed(() => {
    const current = contentItem.value?.current_progress ?? 0
    const total = contentItem.value?.total_progress ?? 0
    return current < total
  })

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push({ name: 'content-item-list' })
    }
  }

  const shareContent = async () => {
    const item = contentItem.value
    if (!item) return

    const shareData = {
      title: item.title,
      text: item.description ?? item.title,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url)
      toast.success(t('contentItem.actions.shared'))
    } catch {
      toast.error(t('contentItem.actions.shareUnavailable'))
    }
  }

  const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value
    // TODO: wire to backend when bookmark endpoint is available.
  }

  const adjustProgress = (delta: number) => {
    const item = contentItem.value
    if (!item) return

    const current = item.current_progress ?? 0
    const total = item.total_progress ?? 0
    const next = current + delta

    if (next < 0) {
      toast.info(t('contentItem.tracking.minReached'))
      return
    }
    if (next > total) {
      toast.info(t('contentItem.tracking.maxReached'))
      return
    }

    patchProgress(
      {
        payload: { current_progress: next },
        id: item.id,
      },
      {
        onSuccess: () => {
          toast.success(t('contentItem.tracking.updateSuccess'))
        },
        onError: (error) => {
          const specificMessage =
            error instanceof ApiError && error.errors?.current_progress?.[0]
          toast.error(specificMessage || t('contentItem.tracking.updateError'))
        },
      },
    )
  }

  return {
    contentItem,
    isLoading,
    isError,
    isBookmarked,
    isUpdatingProgress,
    canIncrement,
    canDecrement,
    goBack,
    shareContent,
    toggleBookmark,
    adjustProgress,
    slug,
  }
}
