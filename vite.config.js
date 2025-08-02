import { defineConfig } from "vite";

export default defineConfig({
  // Configurações do servidor de desenvolvimento
  server: {
    port: 5173,
    open: true,
    host: true,
  },

  // Configurações de build
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },

  // Configurações de preview
  preview: {
    port: 4173,
    open: true,
  },
});
