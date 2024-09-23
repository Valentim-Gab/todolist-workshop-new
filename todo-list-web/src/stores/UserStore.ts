import { UserStore } from '@/types/interfaces/User'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserStore>({
    name: '',
    year_birth: 0,
    active: true,
    wishes: [],
    banks: [],
    id: 0,
  })

  const getUser = computed(() => user.value)
  const getUserId = computed(() => user.value.id)
  const getWishes = computed(() => user.value.wishes ?? [])

  const setUser = (newUser: UserStore) => {
    user.value = newUser
  }

  const setUserId = (id: number) => {
    user.value.id = id
  }

  const setWishes = (wishes: string[]) => {
    user.value.wishes = wishes
  }

  const addDesire = (desire: string) => {
    if (!user.value || !user.value.wishes) {
      return null
    }

    user.value.wishes.push(desire)
  }

  const clearUser = () => {
    user.value = {
      name: '',
      year_birth: 0,
      active: true,
      wishes: [],
      banks: [],
      id: 0,
    }
  }

  return {
    getUser,
    getUserId,
    getWishes,
    setUser,
    setUserId,
    setWishes,
    addDesire,
    clearUser,
  }
})
