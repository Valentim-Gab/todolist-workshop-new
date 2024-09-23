<template>
  <q-dialog :class="dialogStyle" :persistent="persistent">
    <div :class="containerStyle">
      <div :class="headerStyle">
        <p class="text-bold text-white text-base mr-8 sm:text-2xl">
          {{ headerTitle }}
        </p>
        <p v-if="headerDescription" class="mr-8 text-sm text-white">
          {{ headerDescription }}
        </p>
        <span
          class="absolute top-2 right-2 sm:top-3 sm:right-3 cursor-pointer"
          @click="handleCloseModal"
        >
          <q-icon
            :name="mdiCloseCircleOutline"
            color="white"
            class="text-3xl sm:text-4xl"
          />
        </span>
      </div>
      <div class="overflow-auto">
        <slot></slot>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { mdiCloseCircleOutline } from '@quasar/extras/mdi-v7'
import { twMerge } from 'tailwind-merge'
import { computed } from 'vue'

defineOptions({ name: 'ModalGenerico' })

interface ModalGenericoProps {
  headerTitle?: string
  headerDescription?: string
  headerClass?: string
  class?: string
  containerClass?: string
  persistent?: boolean
  handleCloseModal: () => void
}

const props = defineProps<ModalGenericoProps>()

const dialogStyle = computed(() => {
  return twMerge('modal', props.class)
})

const containerStyle = computed(() => {
  return twMerge('bg-card w-full', props.containerClass)
})

const headerStyle = computed(() => {
  return twMerge(
    'flex flex-col flex-nowrap p-4 bg-primary relative sm:p-8',
    props.headerClass
  )
})
</script>

<style lang="scss">
.modal .q-dialog__inner > div {
  @apply rounded-xl;
}
</style>
