import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";

import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    crx({ manifest }),
  ],
});
