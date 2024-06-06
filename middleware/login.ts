// check if user login or not
export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  if (!userStore.isLogin && /^\/admin/.test(to.path)) {

    return navigateTo({
      path: '/login',
      query: {
        redirect: to.path,
        ...to.query,
      },
    })
  }
})
