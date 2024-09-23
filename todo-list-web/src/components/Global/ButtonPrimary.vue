<template>
  <q-btn
    v-bind="props"
    :color="color ?? 'primary'"
    :data-onlyIcon="!label && icon"
    :class="base({ round: round })"
  />
</template>

<script setup lang="ts">
import { QBtnProps } from 'quasar'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

interface ButtonPrimaryProps extends QBtnProps {
  class?: string
}

defineOptions({ name: 'ButtonPrimary' })
const props = defineProps<ButtonPrimaryProps>()

const buttonStyle = tv({
  slots: {
    base: twMerge(
      'tracking-wider text-bold rounded-lg max-h-10 w-fit sm:min-w-[116px] sm:text-base',
      props.class
    ),
  },
  variants: {
    round: {
      true: {
        base: 'rounded-full w-auto max-h-auto sm:w-auto',
      },
    },
  },
})

const { base } = buttonStyle()
</script>

<style lang="scss">
[data-onlyIcon='false'] .q-btn__content .q-icon {
  @apply mr-1;
}

.q-btn__content span {
  @apply lowercase first-letter:uppercase;
}
</style>
