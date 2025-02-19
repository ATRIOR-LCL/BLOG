// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/style/base.less'],

  vite:{
    css:{
      preprocessorOptions:{
        less:{
          additionalData: '@import "~/assets/style/base.less";'
        }
      }
    }
  },

  modules: ['@pinia/nuxt']
})