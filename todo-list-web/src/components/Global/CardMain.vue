<template>
  <q-card class="border-l-4 border-primary rounded-lg">
    <slot />
  </q-card>
</template>

<script setup lang="ts">
import { QCardProps } from 'quasar'

defineOptions({ name: 'CardMain' })
defineProps<QCardProps>()
</script>
