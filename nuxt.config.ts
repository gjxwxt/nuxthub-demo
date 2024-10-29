import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  components: {
    dirs: ["~/components"],
  },

  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET,

    public: {
      apiBase: process.env.API_PREFIX || "/api",
      apiVersion: process.env.API_VERSION || "v1",
    },
  },

  css: ["~/assets/styles/global.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/variables.scss" as *;',
          api: "modern-compiler",
        },
      },
    },
  },

  devtools: { enabled: true },

  plugins: ["~/plugins/auth"],
});
