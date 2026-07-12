import type { DirectiveBinding } from 'vue'

export const vStatusBadge = {
  mounted(el: HTMLSpanElement, binding: DirectiveBinding) {
    applyStatusStyles(el, binding.value)
  },
  updated(el: HTMLSpanElement, binding: DirectiveBinding) {
    applyStatusStyles(el, binding.value)
  },
}

const applyStatusStyles = (el: HTMLSpanElement, status: string) => {
  const badgeClasses = [
    'badge-primary',
    'badge-secondary',
    'badge-accent',
    'badge-success',
    'badge-warning',
    'badge-error',
    'badge-info',
    'badge-ghost',
    'badge-outline',
    'text-slate-400',
    'text-white',
    'text-black',
  ]
  el.classList.remove(...badgeClasses)

  // Removido badge-outline y añadido badge por defecto
  el.classList.add('badge', 'font-medium', 'border-none', 'badge-soft')

  switch (status?.toLowerCase()) {
    case 'finished':
      el.classList.add('badge-secondary')
      break
    case 'watching':
      el.classList.add('badge-success')
      break
    case 'airing':
      el.classList.add('badge-warning')
      break
    case 'dropped':
      el.classList.add('badge-error')
      break
    case 'plan to watch':
    case 'upcoming':
      el.classList.add('badge-info')
      break
    default:
      el.classList.add('badge-primary')
  }
}
