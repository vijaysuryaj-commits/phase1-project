import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import https from "node:https";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://www.freetogame.com",
        changeOrigin: true,
        secure: true,
        agent: new https.Agent({ keepAlive: false }),
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
