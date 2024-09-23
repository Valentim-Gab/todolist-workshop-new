<template>
  <q-layout>
    <MainHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <MainFooter />
  </q-layout>
</template>

<script setup lang="ts">
import MainFooter from '@/components/Main/MainFooter.vue'
import MainHeader from '@/components/Main/MainHeader.vue'

defineOptions({ name: 'MainLayout' })
</script>
