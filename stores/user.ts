import { defineStore } from 'pinia'
import type { User } from '~/types/user'

export const useUserStore = defineStore('user', () => {
  const username = useCookie('username')
  const token = useCookie('authorization')
  const info = ref<User>()
  const isLogin = computed(() => !!token.value)

  function getUserInfo() {
    useFetch("/api/user/info", { method: "GET" }).then(({ data, error }) => {
      if (error.value) {
        token.value = ''
        info.value = undefined
        return
      }

      if (data.value) {
        info.value = data.value
        username.value = username.value != info.value.username ? info.value.username : username.value
      }
    })
  }
  return {
    username,
    info,
    token,
    isLogin,
    getUserInfo
  }
})
