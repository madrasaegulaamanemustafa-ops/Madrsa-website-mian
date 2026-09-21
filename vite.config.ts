import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsConfigPaths({ projects: ["./tsconfig.json"] })],
  server: {
    host: true,
    port: 5174,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["@tanstack/react-router"],
          "vendor-icons": ["lucide-react"],
          "vendor-supabase": ["@supabase/supabase-js"],
        },
      },
    },
  },
});
