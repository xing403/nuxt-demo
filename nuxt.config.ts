// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // 是否开启服务端渲染 `SSR` | `SPA` 
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    // '@logto/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  css: [
    '~/assets/css/global.postcss',
    '~/assets/css/post.theme.postcss',
    'mavon-editor/dist/css/index.css',
  ],
  plugins: [
    { src: '~/plugins/mavon-editor', mode: 'client' }
  ]
})
