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
    const darkThemes = ['night', 'sunset']
    return darkThemes.includes(themeStore.currentTheme) ? 'dark' : 'light'
  }

  const baseOptions = (position?: ToastPosition, styles?: StylesProps): ToastOptions => ({
    position: position,
    theme: getTheme(),
    style: {
      maxWidth: styles?.maxWidth || '600px',
      width: styles?.width || 'auto',
      minWidth: styles?.minWidth || '300px',
    },
  })

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
