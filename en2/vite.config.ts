import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => ({
  plugins: [
    createVuePlugin(),
    federation({
      name: "host-app",
      remotes: {
        remote_app: "http://localhost:3000/remoteEntry.js",
      },
      shared: {
        vue: {
          packagePath: "./node_modules/vue/dist/vue.esm.js",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
