// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt3 UI sync",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css",
          rel: "stylesheet",
          type: "text/css",
          integrity: "sds",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  imports: {
    dirs: [
      "stores",
      "composable",
      // ... or scan modules nested one level deep with a specific name and file extension
      "composable/*/index.{ts,js,mjs,mts}",
      // ... or scan all modules within given directory
      "composable/**",
    ],
  },
  css: ["~/assets/style/main.scss", "bootstrap/dist/css/bootstrap.min.css"],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate", "storeToRefs"],
      },
    ],
  ],
  plugins: ["/plugins/server.ts"],
  vite: {
    server: {
      proxy: {
        options: {
          target: process.env.API_URL,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/_colors.scss" as *;',
        },
      },
    },
  },

  runtimeConfig: {
    defaultTheme: "light",
    public: {
      apiUrl: "",
    },
  },
});
