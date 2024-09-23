import { Notify } from 'quasar'

export function notifyNegative(message: string) {
  Notify.create({
    color: 'negative',
    message: message,
  })
}
