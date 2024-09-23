import { ThemeEnum } from '@/types/enums/ThemeEnum'
import { Dark } from 'quasar'

export function setLightMode() {
  Dark.set(false)
  setThemeStorage(ThemeEnum.LIGHT)
  document.body.classList.remove('body--high-contrast')
}

export function setDarkMode() {
  Dark.set(true)
  setThemeStorage(ThemeEnum.DARK)
  document.body.classList.remove('body--high-contrast')
}

export function setHighContrast() {
  Dark.set(true)
  setThemeStorage(ThemeEnum.HIGH_CONTRAST)
  document.body.classList.toggle('body--high-contrast')
}

export function setStoredTheme() {
  const theme = getThemeStorage()

  if (theme === ThemeEnum.DARK) {
    setDarkMode()
  } else if (theme === ThemeEnum.HIGH_CONTRAST) {
    setHighContrast()
  } else {
    setLightMode()
  }
}

export const getThemeStorage = (): ThemeEnum => {
  return localStorage.getItem(ThemeEnum.LABEL) as ThemeEnum
}

const setThemeStorage = (theme: ThemeEnum) => {
  localStorage.setItem(ThemeEnum.LABEL, theme)
}
