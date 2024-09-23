<template>
  <q-header
    class="flex flex-nowrap flex-col h-fit justify-between gap-2 p-4 bg-card shadow sm:h-24 sm:flex-row sm:items-center md:px-8"
  >
    <div class="flex-initial flex flex-nowrap items-center gap-4 h-full">
      <img
        src="/imgs/logos/logo.png"
        class="justify-center h-full object-contain w-10 sm:w-14"
      />
      <h2
        class="text-foreground text-lg text-bold leading-4 sm:text-2xl sm:leading-6"
      >
        Workshop Vue.js
        <br />
        <span class="text-xs text-primary sm:text-base lg:text-lg">
          Todolist
        </span>
      </h2>
    </div>
    <nav class="flex flex-nowrap gap-4 place-self-end sm:place-self-auto">
      <button @click="handleLogout">
        <q-icon :name="ionLogOut" class="text-primary text-2xl" />
      </button>
    </nav>
  </q-header>
</template>

<script setup lang="ts">
import { signOut } from '@/services/AuthService'
import { ionLogOut } from '@quasar/extras/ionicons-v7'
import { useRouter } from 'vue-router'

defineOptions({ name: 'MainHeader' })

const $router = useRouter()

const handleLogout = () => {
  signOut()
  $router.push('/')
}
</script>
