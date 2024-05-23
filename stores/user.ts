import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  return {
    username
  }
})
