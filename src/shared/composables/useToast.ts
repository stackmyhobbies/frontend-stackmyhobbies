import { toast, type ToastOptions, type ToastPosition, type ToastTheme } from 'vue3-toastify'
import { useThemeStore } from '@/stores/theme'

interface StylesProps {
  maxWidth: string
  width: string
  minWidth: string
}

export const useToast = () => {
  const themeStore = useThemeStore()

  const getTheme = (): ToastTheme => {
    return themeStore.isDarkTheme ? 'dark' : 'light'
  }

  const baseOptions = (position?: ToastPosition, styles?: StylesProps): ToastOptions => {
    const opts: ToastOptions = { theme: getTheme() }

    if (position) {
      opts.position = position
    }

    if (styles) {
      opts.style = {
        maxWidth: styles.maxWidth || '600px',
        width: styles.width || 'auto',
        minWidth: styles.minWidth || '300px',
      }
    }

    return opts
  }

  const success = (message: string, position?: ToastPosition, styles?: StylesProps) =>
    toast.success(message, baseOptions(position, styles))

  const error = (message: string, position?: ToastPosition, styles?: StylesProps) =>
    toast.error(message, baseOptions(position, styles))

  const info = (message: string, position?: ToastPosition, styles?: StylesProps) =>
    toast.info(message, baseOptions(position, styles))

  const warning = (message: string, position?: ToastPosition, styles?: StylesProps) =>
    toast.warning(message, baseOptions(position, styles))

  return { success, error, info, warning, toastOptions: toast }
}
