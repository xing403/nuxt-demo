// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // 是否开启服务端渲染 `SSR` | `SPA` 
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@pinia/nuxt',
  ]
})
