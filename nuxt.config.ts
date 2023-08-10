// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/google-fonts",
    "nuxt-vue3-google-signin",
    "nuxt-icon",
    "@vueuse/nuxt",
  ],
  googleFonts: {
    families: {
      "Work+Sans": true,
    },
  },
  googleSignIn: {
    clientId:
      "360045236817-vme7u9rhrf1pves0cpslb4jj5aia1m3k.apps.googleusercontent.com",
  },
});
