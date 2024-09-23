import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

import messages from 'src/i18n'
import supportedLocales from 'src/i18n/supported-locales'

export type MessageLanguages = keyof typeof messages
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en']

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

const getBrowserLocale = (options = {}) => {
  const defaultOptions = { countryCodeOnly: false }

  const opt = { ...defaultOptions, ...options }

  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language

  if (!navigatorLocale) {
    return undefined
  }

  const trimmedLocale = opt.countryCodeOnly
    ? navigatorLocale.trim().split(/-|_/)[0]
    : navigatorLocale.trim()

  return trimmedLocale
}

export const supportedLocalesInclude = (locale: string) => {
  return Object.keys(supportedLocales).includes(locale)
}

export const getStartingLocale = () => {
  const browserLocale = getBrowserLocale({ countryCodeOnly: true }) as string

  if (supportedLocalesInclude(browserLocale)) {
    return browserLocale
  } else {
    return import.meta.env.VITE_I18N_LOCALE || 'en'
  }
}

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: getStartingLocale(),
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
    legacy: false,
    globalInjection: true,
    warnHtmlInMessage: 'off',
    messages,
  })

  // Set i18n instance on app
  app.use(i18n)
})
