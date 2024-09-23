import { LanguageEnum } from '@/types/enums/LanguageEnum'
import { WritableComputedRef } from 'vue'

export function changeLocale(
  locale: WritableComputedRef<string>,
  language: LanguageEnum
) {
  locale.value = language
  setLanguageStorage(language)
}

const setLanguageStorage = (language: LanguageEnum) => {
  localStorage.setItem(LanguageEnum.LABEL, language)
}

export function setStoredLanguage(locale: WritableComputedRef<string>) {
  const language = getLanguageStorage()

  locale.value = language
}

export const getLanguageStorage = (): LanguageEnum => {
  const language = localStorage.getItem(LanguageEnum.LABEL) as LanguageEnum

  if (!language) {
    return LanguageEnum.PT
  }

  return localStorage.getItem(LanguageEnum.LABEL) as LanguageEnum
}
