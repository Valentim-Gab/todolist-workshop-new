<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { setStoredTheme } from './helpers/ThemeHelper'
import { useI18n } from 'vue-i18n'
import { setStoredLanguage } from './helpers/LanguageHelper'

defineOptions({ name: 'App' })

const { locale } = useI18n()

onBeforeMount(() => {
  setStoredTheme()
  setStoredLanguage(locale)
})
</script>
