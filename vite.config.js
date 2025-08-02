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
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },

  // Configurações de preview
  preview: {
    port: 4173,
    open: true,
  },

  // Configurações de assets
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.gif'],
});
