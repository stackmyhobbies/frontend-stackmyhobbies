import { toast, type ToastOptions, type ToastTheme } from 'vue3-toastify'
import { useThemeStore } from '@/stores/theme'

export const useToast = () => {
  const themeStore = useThemeStore()

  const getTheme = (): ToastTheme => {
    const darkThemes = ['night', 'sunset']
    return darkThemes.includes(themeStore.currentTheme) ? 'dark' : 'light'
  }

  const baseOptions = (): ToastOptions => ({
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: getTheme(),
    style: {
      maxWidth: '600px',
      width: 'auto',
      minWidth: '300px',
    },
  })

  const success = (message: string) => toast.success(message, baseOptions())
  const error = (message: string) => toast.error(message, baseOptions())
  const info = (message: string) => toast.info(message, baseOptions())
  const warning = (message: string) => toast.warning(message, baseOptions())

  return { success, error, info, warning }
}
