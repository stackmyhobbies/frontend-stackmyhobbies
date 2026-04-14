import type { DirectiveBinding } from 'vue'
import notFoundImage from '../../../assets/images/no_found_media.png'
export const vImageFallback = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    const defaultImage = notFoundImage

    if (!binding.value) {
      el.src = defaultImage
    } else {
      el.src = binding.value
    }

    el.onerror = () => {
      if (el.src !== defaultImage) {
        el.src = defaultImage
      }
    }
  },

  updated(el: HTMLImageElement, binding: DirectiveBinding) {
    if (binding.value !== binding.oldValue) {
      el.src = binding.value || notFoundImage
    }
  },
}
