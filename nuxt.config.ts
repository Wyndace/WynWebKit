// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["nuxt-seo-kit"],
  modules: ["@nuxtjs/tailwindcss", "nuxt-purgecss", "nuxt-svgo", "@nuxt/image-edge"],
  runtimeConfig: {
    trailingSlash: true,
    indexable: false,
    public: {
      siteUrl: "http:/localhost:3000",
      siteName: "Nuxt Site",
      siteDescription: "Site base on Nuxt.",
      language: "en-US",
      titleSeparator: "|",
      trailingSlash: false,
    },
  },
  postcss: {
    preset: {
      autoprefixer: {
        grid: true,
        flexbox: true,
      },
    },
  },
})
