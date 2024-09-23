<template>
  <q-footer
    class="bg-card shadow py-3 px-4 flex flex-col flex-nowrap items-center justify-between sm:flex-row"
  >
    <p class="text-foreground text-xs whitespace-nowrap h-fit">
      {{ $t('footer.textPart1') }}
      <a
        :href="authorConstant.GIT_URL"
        target="_blank"
        class="text-accent text-xs"
      >
        {{ $t('footer.textPart2') }}
      </a>
      {{ $t('footer.textPart3') }}
    </p>
    <p class="text-foreground text-xs whitespace-nowrap">
      Copyright &copy; {{ authorConstant.COPYRIGHT_YEAR }}
      <a
        :href="authorConstant.SITE_URL"
        target="_blank"
        class="text-accent uppercase text-xs"
      >
        Valentim-Gab.
      </a>
    </p>
  </q-footer>
</template>

<script setup lang="ts">
import { authorConstant } from '@/constants/AuthorConstant'
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'MainFooter' })

const { t: $t } = useI18n()
</script>
