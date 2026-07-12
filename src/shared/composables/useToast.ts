import { toast, type ToastOptions, type ToastTheme } from 'vue3-toastify'
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

  const baseOptions = (styles?: StylesProps): ToastOptions => {
    const opts: ToastOptions = { theme: getTheme() }

    if (styles) {
      opts.style = {
        maxWidth: styles.maxWidth || '600px',
        width: styles.width || 'auto',
        minWidth: styles.minWidth || '300px',
      }
    }

    return opts
  }

  const success = (message: string, styles?: StylesProps) =>
    toast.success(message, { ...baseOptions(styles), position: 'top-center' })

  const error = (message: string, styles?: StylesProps) =>
    toast.error(message, { ...baseOptions(styles), position: 'top-right' })

  const info = (message: string, styles?: StylesProps) =>
    toast.info(message, { ...baseOptions(styles), position: 'top-right' })

  const warning = (message: string, styles?: StylesProps) =>
    toast.warning(message, { ...baseOptions(styles), position: 'top-right' })

  return { success, error, info, warning, toastOptions: toast }
}
