<template>
  <main
    class="main-container justify-center gap-2 p-2 sm:p-4 md:gap-4 lg:gap-8"
  >
    <h1
      class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
    >
      404
    </h1>
    <p class="text-center text-sm text-muted sm:text-base lg:text-2x">
      {{ $t('errorPage.message') }}
    </p>
    <ButtonPrimary
      :aria-label="$t('errorPage.btnHomeAction')"
      :label="$t('homePage')"
      @click="handleClick"
    />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonPrimary from '@/components/Global/ButtonPrimary.vue'
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'ErrorNotFound' })

const { t: $t } = useI18n()
const $router = useRouter()

const handleClick = () => {
  $router.push({ path: '/' })
}
</script>
