import type { DirectiveBinding } from 'vue'
import notFoundImage from '../../../assets/images/no_found_media.png'

const OBSERVER_KEY = '__lazyObserver__'

function loadImage(el: HTMLImageElement, src: string) {
  const img = new Image()
  img.src = src
  img.onload = () => { el.src = src }
  img.onerror = () => { el.src = notFoundImage }
}

function observe(el: HTMLImageElement, src: string) {
  el.src = notFoundImage

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      loadImage(el, src)
      observer.disconnect()
      delete (el as any)[OBSERVER_KEY]
    },
    { rootMargin: '100px' },
  )

  observer.observe(el)
  ;(el as any)[OBSERVER_KEY] = observer
}

export const vImageFallback = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    if (binding.value) observe(el, binding.value)
    else el.src = notFoundImage
  },

  updated(el: HTMLImageElement, binding: DirectiveBinding) {
    if (binding.value === binding.oldValue) return
    ;(el as any)[OBSERVER_KEY]?.disconnect()
    if (binding.value) observe(el, binding.value)
    else el.src = notFoundImage
  },

  unmounted(el: HTMLImageElement) {
    ;(el as any)[OBSERVER_KEY]?.disconnect()
  },
}

