import { defineStore } from 'pinia'
import type { User } from '~/types/user'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const token = useLocalStorage('token', '', { deep: true })
  const info = ref<User>()
  const isLogin = computed(() => !!token.value)

  function getUserInfo() {
    useFetch("/api/user/info", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token.value}`
      }
    }).then(({ data, error: _ }) => {
      if (data.value) {
        info.value = data.value
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
