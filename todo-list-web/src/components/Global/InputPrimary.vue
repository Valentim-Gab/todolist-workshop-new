<template>
  <q-input
    v-bind="props"
    clearable
    outlined
    dense
    :dark="Dark.isActive"
    :class="base({ dark: Dark.isActive })"
    :input-class="mergedInputClass"
    @update:modelValue="updateValue"
  >
    <template v-slot:prepend>
      <slot name="prepend">
        {{ props.prepend }}
      </slot>
    </template>
    <template v-slot:label>
      <slot name="label">
        {{ props.label }}
      </slot>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { Dark, QInputProps } from 'quasar'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

interface InputPrimary extends QInputProps {
  placeholder?: string
  class?: string
  label?: string
  prepend?: string
}

defineOptions({ name: 'InputPrimary' })
const props = defineProps<InputPrimary>()
const emit = defineEmits(['update:modelValue'])

const inputStyle = tv({
  slots: {
    base: twMerge(
      'input-primary w-full md:text-sm md:placeholder:text-sm',
      props.inputClass?.toString() ?? ''
    ),
  },
  variants: {
    dark: {
      true: {
        base: 'dark',
      },
    },
  },
})

const { base } = inputStyle()
const mergedInputClass = twMerge('', props.inputClass?.toString() ?? '')

const updateValue = (val: string | number | null) => {
  emit('update:modelValue', val)
}
</script>

<style lang="scss">
.input-primary {
  &.q-field--error .q-field__bottom {
    @apply pl-0 max-w-[128px] sm:max-w-[400px];

    .q-field__messages {
      & > * {
        @apply text-xs lg:text-sm;
      }
    }
  }
}
</style>
